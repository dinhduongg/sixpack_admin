'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthProvider'
import handleApiError from '@/lib/handle-api-error'

type DeleteButtonProps = {
  roles?: string[] | undefined
  title?: string | undefined
  description?: string | undefined
  onConfirm: () => Promise<any>
}

export default function DeleteButton({ roles = [], title, description, onConfirm }: DeleteButtonProps) {
  const [mounted, setMounted] = useState(false)

  const { user } = useAuthContext()
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const data = await onConfirm()
      toast.success(data.message)
      router.refresh()
    } catch (error) {
      handleApiError(error)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AlertDialog>
      {[...roles, 'admin'].some((role) => user?.roles.some((item) => item === role)) && (
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            Xóa
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? 'Bạn chắc muốn xóa chứ?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? 'Hành động này không thể được hoàn tác. Điều này sẽ xóa vĩnh viễn tài khoản này và xóa dữ liệu khỏi máy chủ.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
