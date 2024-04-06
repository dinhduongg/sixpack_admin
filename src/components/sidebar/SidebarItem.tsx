'use client'

import { ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useAuthContext } from '@/context/AuthProvider'
import { cn, generateRandomId } from '@/lib/utils'
import { Dashboard } from '@/schema/dashboards'
import { loadFromStorage } from '@/hooks/useLocalStorage'

interface SidebarItemProsp {
  dashboard: Dashboard
}

export default function SidebarItem({ dashboard }: SidebarItemProsp) {
  const [mounted, setMounted] = useState(true)
  const [expanded, setExpanded] = useState(true)

  const isOpen = loadFromStorage('isOpen')

  const ref = useRef<HTMLUListElement>(null)
  const pathname = usePathname()
  const { user } = useAuthContext()

  const contentStyle = {
    transition: 'max-height 0.2s ease',
    overflow: 'hidden',
  }

  useLayoutEffect(() => {
    const updateMaxHeight = () => {
      if (ref.current) {
        const containerHeight = ref.current.scrollHeight
        const newMaxHeight = expanded ? containerHeight : 0
        ref.current.style.maxHeight = `${newMaxHeight}px`
      }
    }

    updateMaxHeight()
    window.addEventListener('resize', updateMaxHeight)

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [expanded])

  useEffect(() => {
    const index = dashboard.childrens.findIndex((child) => `/${child?.url?.split('?')[0]}` === pathname)

    if (index !== -1) {
      ref.current?.children[index]?.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [pathname, dashboard.childrens])

  useEffect(() => {
    const index = dashboard.childrens.findIndex((child) => `/${child?.url?.split('?')[0]}` === pathname)

    if (index !== -1) {
      ref.current?.children[index]?.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [])

  useEffect(() => {
    setMounted(false)
  }, [])

  if (mounted) return null

  return (
    <div>
      <div
        className={cn(
          'p-2 font-medium text-base flex items-center cursor-pointer select-none',
          isOpen ? 'justify-between bg-[#012547] text-white ' : 'justify-center bg-[#f5f5f5]',
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-nowrap items-center gap-2">
          <i className={`text-2xl ${dashboard.icon}`} />
          {isOpen && <span>{dashboard.name}</span>}
        </div>
        {isOpen && (
          <ChevronUp
            className={cn('duration-200', {
              'rotate-0': expanded,
              'rotate-180': !expanded,
            })}
          />
        )}
      </div>
      {isOpen && (
        <ul ref={ref} style={contentStyle}>
          {dashboard.childrens.map((child) => {
            const regexPathname = [`/products/create`, `/orders/collection/waiting`]
            const shouldrender = !child.role_code || (user && user.roles.includes('admin')) || (user && user.roles.includes(child.role_code))
            const regex = regexPathname.includes(pathname) ? new RegExp(`^/${child.url}$`) : new RegExp(`^/${child.url?.split('?')[0]}(/.*)?$`)

            if (shouldrender) {
              return (
                <li
                  key={generateRandomId(12)}
                  className={cn(
                    'pr-2 flex items-center justify-between bg-[#f5f5f5] hover:bg-sidebar-hover hover:text-white text-[15px] font-medium text-gray-700 cursor-pointer border-b border-b-sidebar-border last:border-none',
                    {
                      'bg-sidebar-active text-white hover:bg-sidebar-active': regex.test(pathname),
                    },
                  )}
                >
                  <Link href={`/${child.url}`} className={cn('p-2 flex-1 flex items-center gap-2')}>
                    <i className={`text-2xl ${child.icon}`} />
                    <span>{child.name}</span>
                  </Link>
                </li>
              )
            }
          })}
        </ul>
      )}
    </div>
  )
}
