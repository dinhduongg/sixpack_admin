import employeeApiRequest from '@/http-request/fetch/employees'
import roleApiRequest from '@/http-request/fetch/roles'
import EditForm from './_components/EditForm'
import RoleUpdate from './_components/RoleUpdate'
import BreadCrumb from '@/components/common/BreadCrumb'

interface EditEmployeeProps {
  params: { id: string }
}

export default async function EditEmployee({ params: { id } }: EditEmployeeProps) {
  const roles = await roleApiRequest.getAll()
  const employee = await employeeApiRequest.getDetail(id)

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
    {
      name: 'Đổi mật khẩu',
      isLink: false,
      isCopy: false,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <EditForm employee={employee.employee} />
        </div>
        <div className="col-span-1">
          <RoleUpdate employee={employee.employee} roles={roles.roles} />
        </div>
      </div>
    </div>
  )
}
