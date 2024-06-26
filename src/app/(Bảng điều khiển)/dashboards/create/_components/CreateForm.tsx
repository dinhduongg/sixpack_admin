'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import dashboardApiRequest from '@/http-request/dashboards'
import handleApiError from '@/lib/handle-api-error'
import { Dashboard, DashboardDto, dashboardDto } from '@/schema/dashboards'

type CreateFormProps = {
  dashboards: Dashboard[]
}

export default function CreateForm({ dashboards }: CreateFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<DashboardDto>({
    resolver: zodResolver(dashboardDto),
    defaultValues: {
      name: '',
      icon: '',
      parent_id: 'undefined',
      url: '',
      sorted: 1,
    },
  })

  const onSubmit = async (data: DashboardDto) => {
    try {
      setLoading(true)
      const res = await dashboardApiRequest.create(data)
      toast.success(res.message)
      router.push('/dashboards')
    } catch (error) {
      handleApiError(error, form.setError)
    } finally {
      setLoading(false)
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
                  Tên menu<span className="text-red-500">*</span>
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
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu cha</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Đây là menu cha" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'undefined'}>Đây là menu cha</SelectItem>
                    {dashboards.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sorted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sắp xếp</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
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
