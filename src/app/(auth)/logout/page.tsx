'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { clientSessionToken } from '@/config/http'
import authRequestApi from '@/http-request/auth'

export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (sessionToken === clientSessionToken.value) {
      authRequestApi.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`)
      })
    }
  }, [sessionToken, pathname, router])

  return <div>Logout</div>
}
