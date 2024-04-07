'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import employeeApiRequest from '@/http-request/fetch/employees'
import handleApiError from '@/lib/handle-api-error'
import { Employee, EmployeeUpdateDto, employeeUpdateDto } from '@/schema/employee'

type EditFormProps = {
  employee: Employee
}

export default function EditForm({ employee }: EditFormProps) {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<EmployeeUpdateDto>({
    resolver: zodResolver(employeeUpdateDto),
    defaultValues: {
      name: employee.name,
    },
  })

  const onSubmit = async (body: EmployeeUpdateDto) => {
    try {
      setLoading(true)
      const id = params.id as string
      await employeeApiRequest.update(id, body)
      router.push('/employees')
    } catch (error) {
      handleApiError(error, form.setError)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}
