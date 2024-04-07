import http from '@/config/http'
import { Dashboard, DashboardDto } from '@/schema/dashboards'

const dashboardApiRequest = {
  getAll: (query?: Query) => http.get<{ dashboards: Dashboard[] }>('/v1/admin/dashboards', { query: query }),
  getOne: (id: string) => http.get<{ dashboard: Dashboard }>(`/v1/admin/dashboards/${id}`),
  update: (id: string, body: Partial<DashboardDto>) => http.put<{ mesage: string }>(`/v1/admin/dashboards/${id}`, { dashboard: body }),
  create: (body: Partial<DashboardDto>) => http.post<{ message: string }>('/v1/admin/dashboards', { dashboard: body }),
  delete: (id: string) => http.delele<{ message: string }>(`/v1/admin/dashboards/${id}`, {}),
}

export default dashboardApiRequest
