import Link from 'next/link'
import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'

import Header from '@/components/common/Header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Nhân viên',
}

export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header>
        <div className="flex items-center">
          <Button>
            <PlusIcon />
            <Link href="/employees/create">Thêm mới</Link>
          </Button>
        </div>
      </Header>
      {children}
    </div>
  )
}
