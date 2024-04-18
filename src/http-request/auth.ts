import http from '@/config/http'
import envConfig from '@/lib/env-config'
import { LoginSchema, UserResponse } from '@/schema/login'

const authRequestApi = {
  login: (body: LoginSchema) => http.post<UserResponse>('/v1/admin/auth/sign-in', body),
  logoutFromNextServerToServer: () => http.post('/v1/admin/auth/sign-out', {}),
  setSessionToken: (data: { token: string; expired_time: string }) => http.post('/api/auth/login', data, { baseUrl: envConfig.pageUrl }),
  logoutFromNextClientToNextServer: (force?: boolean | undefined, signal?: AbortSignal | undefined) =>
    http.post('/api/auth/logout', { force }, { baseUrl: envConfig.pageUrl, signal }),
}

export default authRequestApi
