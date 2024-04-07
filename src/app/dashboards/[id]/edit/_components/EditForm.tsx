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
import { Switch } from '@/components/ui/switch'
import dashboardApiRequest from '@/http-request/fetch/dashboards'
import handleApiError from '@/lib/handle-api-error'
import { Dashboard, DashboardDto, dashboardDto } from '@/schema/dashboards'
import { Role } from '@/schema/roles'

type EditFormProps = {
  dashboard: Dashboard
  dashboards: Dashboard[]
  roles: Role[]
}

export default function EditForm({ dashboard, dashboards, roles }: EditFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<DashboardDto>({
    resolver: zodResolver(dashboardDto),
    defaultValues: {
      name: dashboard.name,
      icon: dashboard.icon ?? '',
      parent_id: dashboard.parent_id ?? 'undefined',
      url: dashboard.url ?? '',
      check_role: dashboard.check_role,
      enabled: dashboard.enabled,
      role_code: dashboard.role_code ?? '',
      sorted: dashboard.sorted ?? 1,
    },
  })

  const onSubmit = async (data: DashboardDto) => {
    try {
      setLoading(true)
      const res = await dashboardApiRequest.update(dashboard.id, data)
      toast.success(res.mesage)
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
            name="role_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quyền</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Không" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'undefined'}>Không</SelectItem>
                    {roles.map((item) => (
                      <SelectItem key={item.id} value={item.role_code}>
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
          <FormField
            control={form.control}
            name="check_role"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2">
                <FormLabel className="text-base">Kiểm tra quyền</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex items-end gap-2">
                <FormLabel className="text-base">Ẩn / hiện</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full">
            Chỉnh sửa
          </Button>
        </form>
      </Form>
    </div>
  )
}
