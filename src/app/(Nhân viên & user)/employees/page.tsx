import employeeApiRequest from '@/http-request/employees'
import TableItem from './_components/TableItem'
import BreadCrumb from '@/components/common/BreadCrumb'

interface EmployeesProps {
  searchParams: Query
}

export default async function Employees({ searchParams }: EmployeesProps) {
  const employees = await employeeApiRequest.getAll(searchParams)

  const segments = [
    {
      name: 'Trang chủ',
      isLink: true,
      isCopy: false,
      href: '/',
    },
    {
      name: 'Nhân viên',
      isLink: true,
      isCopy: false,
      href: `/employees`,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
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
