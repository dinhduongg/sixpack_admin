'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAuthContext } from '@/context/AuthProvider'
import { Role, RoleEmployeeDto, roleEmployeeDto } from '@/schema/roles'

type RoleUpdateProps = {
  roles: Role[]
}

export default function RoleUpdate({ roles }: RoleUpdateProps) {
  const { user } = useAuthContext()

  const form = useForm<RoleEmployeeDto>({
    resolver: zodResolver(roleEmployeeDto),
    defaultValues: {
      roles: user?.roles,
    },
  })

  const onSubmit = async (data: RoleEmployeeDto) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  )
}
