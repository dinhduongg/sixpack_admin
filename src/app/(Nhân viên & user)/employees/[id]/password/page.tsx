import employeeApiRequest from '@/http-request/fetch/employees'
import EditForm from './_components/EditForm'
import BreadCrumb from '@/components/common/BreadCrumb'

type ChangPasswordProps = {
  params: { id: string }
}

export default async function ChangPassword({ params: { id } }: ChangPasswordProps) {
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
