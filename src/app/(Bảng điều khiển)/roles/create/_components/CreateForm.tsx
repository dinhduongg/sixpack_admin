'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import roleApiRequest from '@/http-request/roles'
import handleApiError from '@/lib/handle-api-error'
import { RoleDto, roleDto } from '@/schema/roles'

export default function CreateForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RoleDto>({
    resolver: zodResolver(roleDto),
    defaultValues: {
      name: undefined,
      role_code: undefined,
    },
  })

  const onSubmit = async (data: RoleDto) => {
    try {
      setLoading(true)

      const res = await roleApiRequest.create(data)
      toast.success(res.message)
      router.push('/roles')
    } catch (error) {
      handleApiError(error, form.setError)
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div className="grid grid-cols-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Code<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full">
            Thêm mới
          </Button>
        </form>
      </Form>
    </div>
  )
}
