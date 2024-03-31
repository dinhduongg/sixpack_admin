'use client'

import { SquareUser } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context/AuthProvider'
import useLogout from '@/hooks/useLogout'

export default function Header({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(true)

  const { user } = useAuthContext()
  const logout = useLogout()

  useEffect(() => {
    setMounted(false)
  }, [])

  return (
    <div className="h-14 leading-[56px] border-b flex items-center justify-between px-4">
      <div>{children}</div>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <SquareUser />
          {!mounted && <span>{user?.name}</span>}
        </div>
        <div className="text-black/40">|</div>
        <div onClick={logout} className="cursor-pointer hover:text-destructive">
          Thoát
        </div>
      </div>
    </div>
  )
}
