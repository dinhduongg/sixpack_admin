'use client'

import { useRouter } from 'next/navigation'

import authRequestApi from '@/http-request/actions/auth'
import handleApiError from '@/lib/handle-api-error'

export default function useLogout(force: boolean = false) {
  const router = useRouter()

  const logout = async () => {
    try {
      await authRequestApi.logoutFromNextClientToNextServer(force)
      localStorage.removeItem('user')
      router.refresh()
    } catch (error) {
      handleApiError({ error })
    }
  }

  return logout
}
