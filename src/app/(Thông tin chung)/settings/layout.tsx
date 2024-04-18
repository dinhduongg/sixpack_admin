import Link from 'next/link'
import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Metadata } from 'next'

import Header from '@/components/common/Header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Thông tin chung',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header>
        <div className="flex items-center">
          <Button>
            <PlusIcon />
            <Link href="/settings/create">Thêm mới</Link>
          </Button>
        </div>
      </Header>
      {children}
    </div>
  )
}
