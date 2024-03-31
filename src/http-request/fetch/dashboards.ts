import http from '@/config/http'

const dashboardApiRequest = {
  getAll: (query: Query) => http.get('/v1/admin/dashboards', { query: query }),
}

export default dashboardApiRequest
