import BreadCrumb from '@/components/common/BreadCrumb'
import dashboardApiRequest from '@/http-request/fetch/dashboards'
import TableItem from './_components/TableItem'

interface DashboardsProps {
  searchParams: Query
}

export default async function Dashboards({ searchParams }: DashboardsProps) {
  const dashboards = await dashboardApiRequest.getAll(searchParams)

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
  ]

  return (
    <div>
      <BreadCrumb segments={segments} />
      <table className="c-table mt-2">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên menu</th>
            <th>Vị trí</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dashboards.dashboards.map((item, index) => (
            <TableItem key={item.id} dashboard={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
