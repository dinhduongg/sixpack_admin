'use client'

import Link from 'next/link'

import DeleteButton from '@/components/common/DeleteButton'
import { Button } from '@/components/ui/button'
import dashboardApiRequest from '@/http-request/fetch/dashboards'
import { Dashboard } from '@/schema/dashboards'

interface TableItemProps {
  dashboard: Dashboard
  index: number
}

export default function TableItem({ dashboard, index }: TableItemProps) {
  return (
    <tr>
      <td className="w-[5%]">{index + 1}</td>
      <td>
        <Link className="text-link-text hover:underline" href={`/dashboards?parent_id=${dashboard.id}`}>
          {dashboard.name}
        </Link>
      </td>
      <td>{dashboard.sorted}</td>
      <td className="w-[10%]">
        <div className="flex justify-center gap-1">
          <Button size="sm">
            <Link href={`/dashboards/${dashboard.id}/edit`}>Sửa</Link>
          </Button>
          <DeleteButton roles={['dashboards']} onConfirm={() => dashboardApiRequest.delete(dashboard.id)} />
        </div>
      </td>
    </tr>
  )
}
