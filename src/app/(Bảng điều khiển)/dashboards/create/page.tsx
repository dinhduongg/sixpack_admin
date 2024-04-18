import BreadCrumb from '@/components/common/BreadCrumb'
import dashboardApiRequest from '@/http-request/dashboards'
import CreateForm from './_components/CreateForm'

export default async function CreateDashboards() {
  const dashboards = await dashboardApiRequest.getAll()

  const segments = [
    {
      name: 'Trang chủ',
      isLink: true,
      isCopy: false,
      href: '/',
    },
    {
      name: 'Menu',
      isLink: true,
      isCopy: false,
      href: `/dashboards`,
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
      <CreateForm dashboards={dashboards.dashboards} />
    </div>
  )
}
