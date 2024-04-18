'use client'

import Link from 'next/link'

import DeleteButton from '@/components/common/DeleteButton'
import { Button } from '@/components/ui/button'
import roleApiRequest from '@/http-request/roles'
import { Role } from '@/schema/roles'

interface TableItemProps {
  role: Role
  index: number
}

export default function TableItem({ index, role }: TableItemProps) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{role.name}</td>
      <td>{role.role_code}</td>
      <td className="w-[10%]">
        <div className="flex justify-center gap-1">
          <Button size="sm">
            <Link href={`/roles/${role.id}/edit`}>Sửa</Link>
          </Button>
          <DeleteButton roles={['roles']} onConfirm={() => roleApiRequest.delete(role.id)} />
        </div>
      </td>
    </tr>
  )
}
