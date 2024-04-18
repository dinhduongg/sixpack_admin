import Link from 'next/link'
import React from 'react'
import { Metadata } from 'next'

import Header from '@/components/common/Header'
import SearchInput from '@/components/common/SearchInput'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Phân quyền',
  description: 'Danh sách quyền',
}

export default function RoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header>
        <div className="flex items-center gap-2">
          <Button>
            <Link href="/roles/create">Thêm mới</Link>
          </Button>
        </div>
      </Header>
      {children}
    </div>
  )
}
