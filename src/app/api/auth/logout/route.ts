import { cookies } from 'next/headers'

import authRequestApi from '@/http-request/actions/auth'
import handleApiError from '@/lib/handle-api-error'
import { HttpError } from '@/config/http'

export async function POST(request: Request) {
  const force = await request.json()

  if (force.force === true) {
    return Response.json(
      { message: 'Force logout' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
        },
      },
    )
  } else {
    const cookiesStore = cookies()
    const sessionToken = cookiesStore.get('sessionToken')

    if (!sessionToken) {
      return Response.json(
        { message: 'Không nhận được sessionToken' },
        {
          status: 400,
        },
      )
    }

    try {
      const result = await authRequestApi.logoutFromNextServerToServer()
      return Response.json(
        { result },
        {
          status: 200,
          headers: {
            'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
          },
        },
      )
    } catch (error) {
      console.log(error)
      if (error instanceof HttpError) {
        return Response.json(error, {
          status: error.status,
        })
      } else {
        return Response.json({ message: 'Lỗi không xác định' }, { status: 500 })
      }
    }
  }
}
