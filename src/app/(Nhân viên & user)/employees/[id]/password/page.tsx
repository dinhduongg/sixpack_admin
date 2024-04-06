import employeeApiRequest from '@/http-request/fetch/employees'
import EditForm from './_components/EditForm'

type ChangPasswordProps = {
  params: { id: string }
}

export default async function ChangPassword({ params: { id } }: ChangPasswordProps) {
  const employee = await employeeApiRequest.getDetail(id)

  return (
    <div className="space-y-2">
      <div>Crumbs</div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 space-y-4">
          <div>
            <p>
              <b>{employee.employee.name}</b>
            </p>
            <p>
              <b>{employee.employee.email}</b>
            </p>
          </div>
          <EditForm />
        </div>
      </div>
    </div>
  )
}
