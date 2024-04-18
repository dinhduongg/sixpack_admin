import http from '@/config/http'
import { BasicDto } from '@/schema/basics'

const basicApiRequest = {
  getAll: (query?: Query) => http.get<{ basics: BasicDto[] }>('/v1/admin/basics', { query }),
  getByShell: (shell: string) => http.get<{ basic: BasicDto }>(`/v1/admin/basics/shell/${shell}`),
  getOne: (id: string) => http.get<{ basic: BasicDto }>(`/v1/admin/basics/${id}`),
  create: (body: Partial<BasicDto>) => http.post<{ message: string }>('/v1/admin/basics', { basic: body }),
  update: (id: string, body: Partial<BasicDto>) => http.put<{ message: string }>(`/v1/admin/basics/${id}`, { basic: body }),
  delete: (id: string) => http.delele<{ message: string }>(`/v1/admin/delete/${id}`, {}),
}

export default basicApiRequest
