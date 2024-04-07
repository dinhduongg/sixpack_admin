'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import employeeApiRequest from '@/http-request/fetch/employees'
import { Employee } from '@/schema/employee'
import { Role, RoleEmployeeDto, roleEmployeeDto } from '@/schema/roles'

type RoleUpdateProps = {
  roles: Role[]
  employee: Employee
}

export default function RoleUpdate({ roles, employee }: RoleUpdateProps) {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const form = useForm<RoleEmployeeDto>({
    resolver: zodResolver(roleEmployeeDto),
    defaultValues: {
      roles: employee.roles,
    },
  })

  const onSubmit = async (data: RoleEmployeeDto) => {
    setLoading(true)
    let createRolePromises
    let deleteRolePromises

    /*
     kiểm tra phải dữ liệu mới không để thêm vào
     Xử lý thêm role
     */
    const createRole = data.roles.filter((role) => !employee.roles.some((item) => item === role))

    if (createRole.length !== 0) {
      createRolePromises = createRole.map(async (r) => {
        const role = roles.find((i) => i.role_code === r)
        await employeeApiRequest.createRole({ employee_id: employee.id, role_id: role?.id! })
      })
    }

    /*
     kiểm tra phải dữ liệu tồn tại không để xóa đi
     Xử lý xóa role
     */
    const deleteRole = employee.roles.filter((role) => !data.roles.some((item) => item === role)) ?? []
    if (deleteRole.length !== 0) {
      deleteRolePromises = deleteRole!.map(async (r) => {
        const role = roles.find((i) => i.role_code === r)
        await employeeApiRequest.deleteRole(employee.id, role?.id!)
      })
    }

    await Promise.all([...(createRolePromises ?? []), ...(deleteRolePromises ?? [])])
    toast.success('Thành công')
    router.refresh()
    setLoading(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Quản lý quyền</FormLabel>
                <FormDescription>Chọn quyền bạn muốn gán cho nhân viên này.</FormDescription>
              </div>
              {roles.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="roles"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.role_code)}
                            onCheckedChange={(checked) => {
                              return checked ? field.onChange([...field.value, item.role_code]) : field.onChange(field.value?.filter((value) => value !== item.role_code))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}
