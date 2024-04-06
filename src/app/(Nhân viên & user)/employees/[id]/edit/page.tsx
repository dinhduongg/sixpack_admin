import employeeApiRequest from '@/http-request/fetch/employees'
import roleApiRequest from '@/http-request/fetch/roles'
import EditForm from './_components/EditForm'
import RoleUpdate from './_components/RoleUpdate'

interface EditEmployeeProps {
  params: { id: string }
}

export default async function EditEmployee({ params: { id } }: EditEmployeeProps) {
  const roles = await roleApiRequest.getAll()
  const employee = await employeeApiRequest.getDetail(id)

  return (
    <div className="space-y-2">
      <div>Crumbs</div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <EditForm employee={employee.employee} />
        </div>
        <div className="col-span-1">
          <RoleUpdate roles={roles.roles} />
        </div>
      </div>
    </div>
  )
}
