import BreadCrumb from '@/components/common/BreadCrumb'
import roleApiRequest from '@/http-request/roles'
import EditForm from './_components/EditForm'

type EditRoleProps = {
  params: { id: string }
}

export default async function EditRole({ params: { id } }: EditRoleProps) {
  const role = await roleApiRequest.getOne(id)

  const segments = [
    {
      name: 'Trang chủ',
      isLink: true,
      isCopy: false,
      href: '/',
    },
    {
      name: 'Phân quyền',
      isLink: true,
      isCopy: false,
      href: `/roles`,
    },
    {
      name: 'Chỉnh sửa',
      isLink: false,
      isCopy: false,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
      <EditForm role={role.role} />
    </div>
  )
}
