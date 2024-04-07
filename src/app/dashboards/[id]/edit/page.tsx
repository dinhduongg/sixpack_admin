import BreadCrumb from '@/components/common/BreadCrumb'
import dashboardApiRequest from '@/http-request/fetch/dashboards'
import roleApiRequest from '@/http-request/fetch/roles'
import EditForm from './_components/EditForm'

type EditDashboardProps = {
  params: { id: string }
}

export default async function EditDashboard({ params: { id } }: EditDashboardProps) {
  const dashboard = await dashboardApiRequest.getOne(id)
  const dashboards = await dashboardApiRequest.getAll()
  const roles = await roleApiRequest.getAll()

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
      name: 'Chỉnh sửa',
      isLink: false,
      isCopy: false,
    },
  ]

  return (
    <div className="space-y-2">
      <BreadCrumb segments={segments} />
      <EditForm dashboard={dashboard.dashboard} dashboards={dashboards.dashboards} roles={roles.roles} />
    </div>
  )
}
