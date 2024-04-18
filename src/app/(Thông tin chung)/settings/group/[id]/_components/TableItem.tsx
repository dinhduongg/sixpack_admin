'use client'

import Link from 'next/link'

import DeleteButton from '@/components/common/DeleteButton'
import { Button } from '@/components/ui/button'
import { BasicDto } from '@/schema/basics'
import basicApiRequest from '@/http-request/basics'

type TableItemProps = {
  basic: BasicDto
  index: number
}

export default function TableItem({ basic, index }: TableItemProps) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{basic.shell}</td>
      <td>{basic.value}</td>
      <td>{basic.value_en}</td>
      <td className="w-[10%]">
        <div className="flex justify-center gap-1">
          <Button size="sm">
            <Link href={`/settings/${basic.id}/edit`}>Sửa</Link>
          </Button>
          <DeleteButton roles={['basics']} onConfirm={() => basicApiRequest.delete(basic.id!)} />
        </div>
      </td>
    </tr>
  )
}
