'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import employeeApiRequest from '@/http-request/fetch/employees'
import handleApiError from '@/lib/handle-api-error'
import { ChangePasswordDto, changePasswordDto } from '@/schema/employee'

export default function EditForm() {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<ChangePasswordDto>({
    resolver: zodResolver(changePasswordDto),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit = async (body: ChangePasswordDto) => {
    try {
      setLoading(true)
      const id = params.id as string

      await employeeApiRequest.changePassword(id, body)
      router.push('/employees')
    } catch (error) {
      handleApiError(error, form.setError)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Đổi mật khẩu
        </Button>
      </form>
    </Form>
  )
}
