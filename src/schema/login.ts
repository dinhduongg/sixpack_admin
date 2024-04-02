import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ required_error: 'Không được để trống' }),
  password: z.string({ required_error: 'Không được để trống' }),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type UserResponse = {
  user: {
    id: string
    name: string
    email: string
  }
  token: string
  roles: string[]
  expired_time: string
}
