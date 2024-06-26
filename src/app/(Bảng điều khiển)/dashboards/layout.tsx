import Link from 'next/link'
import React from 'react'
import { Metadata } from 'next'

import Header from '@/components/common/Header'
import SearchInput from '@/components/common/SearchInput'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Danh sách dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header>
        <div className="flex items-center gap-2">
          <SearchInput placeholder="Tìm kiếm" />
          <Button>
            <Link href="/dashboards/create">Thêm mới</Link>
          </Button>
        </div>
      </Header>
      {children}
    </div>
  )
}
