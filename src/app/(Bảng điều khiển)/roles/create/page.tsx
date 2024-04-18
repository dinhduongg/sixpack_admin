import BreadCrumb from '@/components/common/BreadCrumb'
import CreateForm from './_components/CreateForm'

export default function CreateRole() {
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
      name: 'Thêm mới',
      isLink: false,
      isCopy: false,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
      <CreateForm />
    </div>
  )
}
