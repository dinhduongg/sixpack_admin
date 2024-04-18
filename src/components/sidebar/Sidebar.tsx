'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { cn, generateRandomId } from '@/lib/utils'
import { Dashboard } from '@/schema/dashboards'
import SidebarItem from './SidebarItem'
import { loadFromStorage, saveToStorage } from '@/hooks/useLocalStorage'
import { useAuthContext } from '@/context/AuthProvider'

interface SidebarProps {
  dashboards: Dashboard[]
}

export default function Sidebar({ dashboards }: SidebarProps) {
  const [isMounted, setIsMounted] = useState(false)

  const large = loadFromStorage('isOpen')
  const [isLarge, setIsLarge] = useState(large)
  const { user } = useAuthContext()

  const handleIsLarge = (value: boolean) => {
    setIsLarge(value)
    saveToStorage(value, 'isOpen')
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div
      className={cn('h-screen bg-white shadow-box duration-100', {
        'w-64': isLarge,
        'w-20': !isLarge,
      })}
    >
      <div
        className={cn('flex items-center p-2 bg-sidebar-primary', {
          'justify-between': isLarge,
          'justify-center py-4': !isLarge,
        })}
      >
        {isLarge ? (
          <>
            <div className="flex items-center gap-2">
              <Image src="/logo.jpg" width={50} height={50} alt="logo" />
              <p className="text-xl text-white font-bold">Sixpack</p>
            </div>
            <div
              className="cursor-pointer text-black bg-white rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white duration-100"
              onClick={() => handleIsLarge(false)}
            >
              <ChevronLeft width={30} height={30} />
            </div>
          </>
        ) : (
          <div
            className="cursor-pointer text-black bg-white rounded-full flex items-center justify-center hover:bg-orange-400 hover:text-white duration-100"
            onClick={() => handleIsLarge(true)}
          >
            <ChevronRight width={30} height={30} />
          </div>
        )}
      </div>
      <div className={cn(isLarge ? 'mt-1' : 'mt-0')}>
        {dashboards.map((dashboard) => {
          if (user) {
            if (user.roles.includes('admin')) {
              return <SidebarItem key={generateRandomId(12)} dashboard={dashboard} />
            } else if (dashboard.childrens.some((child) => !child.role_code || user.roles.includes(child.role_code!))) {
              return <SidebarItem key={generateRandomId(12)} dashboard={dashboard} />
            }
          }
        })}
      </div>
    </div>
  )
}
