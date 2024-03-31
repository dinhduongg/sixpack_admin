import http from '@/config/http'
import envConfig from '@/lib/env-config'
import { LoginSchema } from '@/schema/login'

const authRequestApi = {
  login: (body: LoginSchema) => http.post('/v1/admin/auth/sign-in', body),
  logoutFromNextServerToServer: () => http.post('/v1/admin/auth/sign-out', {}),
  setSessionToken: (token: string) => http.post('/api/auth/login', { token }, { baseUrl: envConfig.pageUrl }),
  logoutFromNextClientToNextServer: (force: boolean) => http.post('/api/auth/logout', { force }, { baseUrl: envConfig.pageUrl }),
}

export default authRequestApi
