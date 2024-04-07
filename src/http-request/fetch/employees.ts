import http from '@/config/http'
import { ChangePasswordDto, Employee, EmployeeUpdateDto } from '@/schema/employee'

const employeeApiRequest = {
  getAll: (query: Query) => http.get<{ employees: Employee[] }>('/v1/admin/employees', { query: query }),
  getDetail: (id: string) => http.get<{ employee: Employee }>(`/v1/admin/employees/${id}`),
  update: (id: string, body: Partial<EmployeeUpdateDto>) => http.put<{ message: string }>(`/v1/admin/employees/${id}`, { employee: body }),
  changePassword: (id: string, body: ChangePasswordDto) => http.put<{ message: string }>(`/v1/admin/employees/password/${id}`, { employee: body }),
  delete: (id: string) => http.delele<{ message: string }>(`/v1/admin/employees/${id}`, {}),
  createRole: (body: { employee_id: string; role_id: string }) => http.post<{ message: string }>('/v1/admin/employees/role', body),
  deleteRole: (employee_id: string, role_id: string) => http.delele<{ message: string }>(`/v1/admin/employees/role/${employee_id}/${role_id}`, {}),
}

export default employeeApiRequest
