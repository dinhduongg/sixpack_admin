'use client'

import { useRouter } from 'next/navigation'

import authRequestApi from '@/http-request/auth'
import handleApiError from '@/lib/handle-api-error'
import { removeFromStorage } from './useLocalStorage'

export default function useLogout(force: boolean = false) {
  const router = useRouter()

  const logout = async () => {
    try {
      await authRequestApi.logoutFromNextClientToNextServer(force)
      removeFromStorage('user')
      router.refresh()
    } catch (error) {
      handleApiError({ error })
    }
  }

  return logout
}
