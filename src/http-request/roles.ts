import http from '@/config/http'
import { Role } from '@/schema/roles'

const roleApiRequest = {
  getAll: () => http.get<{ roles: Role[] }>('/v1/admin/roles'),
}

export default roleApiRequest
