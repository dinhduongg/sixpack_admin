import { z } from 'zod'

export const roleEmployeeDto = z.object({
  roles: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: 'You have to select at least one item.',
  // }),
})

export type Role = {
  id: string
  name: string
  role_code: string
  created_at: string
  updated_at: string
}

export type RoleEmployeeDto = z.infer<typeof roleEmployeeDto>
