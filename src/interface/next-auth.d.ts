import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  export interface Session {
    user: {
      id?: string
      name?: string
      email?: string
    }
    roles: string[]
    token: string
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id?: string
      name?: string
      email?: string
    }
    roles: string[]
    token: string
  }
}
