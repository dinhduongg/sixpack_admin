import http from '@/config/http'
import { Role } from '@/schema/roles'

const roleApiRequest = {
  getAll: () => http.get<{ roles: Role[] }>('/v1/admin/roles', { next: { tags: ['roles'] } }),
  getOne: (id: string) => http.get<{ role: Role }>(`/v1/admin/roles/${id}`, { next: { tags: ['roles'] } }),
  update: (id: string, body: Partial<Role>) => http.put<{ message: string }>(`/v1/admin/roles/${id}`, { role: body }),
  create: (body: Partial<Role>) => http.post<{ message: string }>('/v1/admin/roles', { role: body }),
  delete: (id: string) => http.delele<{ message: string }>(`/v1/admin/roles/${id}`, {}),
}

export default roleApiRequest
