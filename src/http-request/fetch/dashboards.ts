import http from '@/config/http'
import { Dashboard } from '@/schema/dashboards'

const dashboardApiRequest = {
  getAll: (query?: Query) => http.get<{ dashboards: Dashboard[] }>('/v1/admin/dashboards', { query: query }),
}

export default dashboardApiRequest
