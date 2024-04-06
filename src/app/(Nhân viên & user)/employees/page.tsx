import employeeApiRequest from '@/http-request/fetch/employees'
import TableItem from './_components/TableItem'

interface EmployeesProps {
  searchParams: Query
}

export default async function Employees({ searchParams }: EmployeesProps) {
  const employees = await employeeApiRequest.getAll(searchParams)

  return (
    <div className="space-y-2">
      <div>crumbs</div>
      <table className="c-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Ngày đăng ký</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.employees.map((data, index) => (
            <TableItem key={data.id} data={data} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
