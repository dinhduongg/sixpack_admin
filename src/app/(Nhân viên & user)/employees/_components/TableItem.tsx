'use client'

import { CircleUserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

import DeleteButton from '@/components/common/DeleteButton'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import employeeApiRequest from '@/http-request/fetch/employees'
import handleApiError from '@/lib/handle-api-error'
import { dateFormat } from '@/lib/utils'
import { Employee } from '@/schema/employee'

type TableItemProps = {
  data: Employee
  index: number
}

export default function TableItem({ data, index }: TableItemProps) {
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(data.enabled)
  const router = useRouter()

  const handleDisabled = async () => {
    if (loading) return

    try {
      setLoading(true)
      setEnabled(!enabled)

      const res = await employeeApiRequest.update(data.id, { enabled: !data.enabled })
      router.refresh()
      toast.success(res.message)
    } catch (error) {
      handleApiError(error, undefined, 'Có lỗi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{dateFormat(data.created_at).formattedDate}</td>
      <td>
        <div className="flex items-center justify-center">
          <CircleUserRound size={32} className={data.logined ? 'text-green-500' : 'text-black'} />
        </div>
      </td>
      <td className="w-[10%]">
        <div className="flex items-center gap-1">
          <Switch checked={enabled} onCheckedChange={handleDisabled} />
          <Button size="sm">
            <Link href={`/employees/${data.id}/password`}>Đổi MK</Link>
          </Button>
          <Button size="sm">
            <Link href={`/employees/${data.id}/edit`}>Sửa</Link>
          </Button>
          <DeleteButton onConfirm={() => employeeApiRequest.delete(data.id)} />
        </div>
      </td>
    </tr>
  )
}
