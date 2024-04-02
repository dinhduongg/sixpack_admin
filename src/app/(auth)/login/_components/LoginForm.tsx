'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HttpError } from '@/config/http'
import authRequestApi from '@/http-request/actions/auth'
import { LoginSchema, loginSchema } from '@/schema/login'
import { useAuthContext } from '@/context/AuthProvider'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useAuthContext()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'nguyenvana@sixpack.com',
      password: '123456',
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true)
    setError('')

    try {
      const res = await authRequestApi.login(data)
      await authRequestApi.setSessionToken({ token: res.token, expired_time: res.expired_time })
      router.push('/')
      router.refresh()

      const user = {
        ...res.user,
        roles: res.roles,
      }

      // Set thông tin user vào local để lấy
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      if (error instanceof HttpError) {
        setError(error.payload.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Mật khẩu" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
        <Button disabled={loading} type="submit" className="w-full">
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
