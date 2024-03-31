import { Metadata } from 'next'

import Header from '@/components/common/Header'
import dashboardApiRequest from '@/http-request/fetch/dashboards'

interface DashboardsProps {
  searchParams: Query
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Danh sách dashboard',
}

export default async function Dashboards({ searchParams }: DashboardsProps) {
  const dashboards = await dashboardApiRequest.getAll(searchParams)

  return (
    <div>
      <Header />
      <pre>{JSON.stringify(dashboards, null, 2)}</pre>
    </div>
  )
}
