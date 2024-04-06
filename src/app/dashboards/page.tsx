import Link from 'next/link'
import { Metadata } from 'next'

import Header from '@/components/common/Header'
import dashboardApiRequest from '@/http-request/fetch/dashboards'
import SearchInput from '@/components/common/SearchInput'
import { Button } from '@/components/ui/button'
import BreadCrumb from '@/components/common/BreadCrumb'

interface DashboardsProps {
  searchParams: Query
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Danh sách dashboard',
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
            <tr key={item.id}>
              <td className="w-[5%]">{index + 1}</td>
              <td>
                <Link className="text-link-text hover:underline" href={`/dashboards?parent_id=${item.id}`}>
                  {item.name}
                </Link>
              </td>
              <td>{item.sorted}</td>
              <td className="w-[10%]">
                <div className="flex justify-center gap-1">
                  <Button variant="default">
                    <Link href={`/dashboards/${item.id}/edit`}>Sửa</Link>
                  </Button>
                  <Button variant="destructive">Xóa</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
