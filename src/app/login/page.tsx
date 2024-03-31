import { Metadata } from 'next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './_components/LoginForm'

export const metadata: Metadata = {
  title: 'Đăng nhập',
}

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-1/5">
        <CardHeader>
          <CardTitle>Xin chào</CardTitle>
          <CardDescription>Đăng nhập để tiếp tục</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
