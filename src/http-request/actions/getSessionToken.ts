'use server'

import { cookies } from 'next/headers'

import { clientSessionToken } from '@/config/http'

const getSessionToken = async () => {
  let token

  if (typeof window === 'undefined') {
    token = cookies().get('sessionToken')?.value
  } else {
    token = clientSessionToken.value
  }

  return token
}

export default getSessionToken
