import getSessionToken from '@/http-request/getSessionToken'
import envConfig from '@/lib/env-config'
import { normalizePath } from '@/lib/utils'
import { redirect } from 'next/navigation'

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined
  query?: Query
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
  message: string
  error: { [key: string]: string }
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload
  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

class SessionToken {
  private token = ''
  get value() {
    return this.token
  }
  set value(token: string) {
    this.token = token
  }
}

export const clientSessionToken = new SessionToken()

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endPoint: string, options?: CustomOptions | undefined): Promise<Response> => {
  let body

  if (options?.body instanceof FormData) {
    body = options.body
  } else {
    body = JSON.stringify(options?.body)
  }

  const token = await getSessionToken()

  const baseHeaders: RequestInit['headers'] = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  }

  // if (typeof window !== undefined) {
  //   baseHeaders['Authorization'] = clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
  // }
  const baseUrl = options?.baseUrl === undefined ? envConfig.apiUrl : options.baseUrl
  const params = new URLSearchParams(options?.query ?? {})

  const fullUrl = endPoint.startsWith('/') ? `${baseUrl}${endPoint}?${params.toString()}` : `${baseUrl}/${endPoint}?${params.toString()}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload: (payload as any).data ?? (payload as any).error,
  }
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        },
      )
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== 'undefined') {
        await fetch('/api/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ force: true }),
          headers: {
            ...baseHeaders,
          },
        })
        clientSessionToken.value = ''
        location.href = '/login'
      } else {
        redirect(`/logout?sessionToken=${token}`)
      }
    } else {
      throw new HttpError(data)
    }
  }
  // Đảm bảo logic chỉ chạy ở client
  if (typeof window !== undefined) {
    if (['/v1/admin/auth/sign-in'].some((item) => item === normalizePath(endPoint))) {
      clientSessionToken.value = (payload as any).token
    } else if ('/auth/logout' === normalizePath(endPoint)) {
      clientSessionToken.value = ''
    }
  }

  return data.payload
}

const http = {
  get<Response>(endPoint: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', endPoint, options)
  },
  post<Response>(endPoint: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', endPoint, { ...options, body })
  },
  put<Response>(endPoint: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', endPoint, { ...options, body })
  },
  delele<Response>(endPoint: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', endPoint, { ...options, body })
  },
}

export default http
