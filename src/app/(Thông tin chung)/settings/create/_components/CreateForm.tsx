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
import { BasicDto, basicDto } from '@/schema/basics'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import basicApiRequest from '@/http-request/basics'

export default function CreateForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<BasicDto>({
    resolver: zodResolver(basicDto),
    defaultValues: {
      shell: '',
      value: '',
      value_en: '',
      group: undefined,
    },
  })

  const onSubmit = async (data: BasicDto) => {
    try {
      setLoading(true)

      const res = await basicApiRequest.create(data)
      toast.success(res.message)
      router.back()
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
            name="shell"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Giá trị tiếng Việt<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị tiếng Anh</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu cha</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Mạng xã hội</SelectItem>
                    <SelectItem value="2">Gì đó</SelectItem>
                  </SelectContent>
                </Select>
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
