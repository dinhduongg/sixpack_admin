import * as z from 'zod'

export const changePasswordDto = z
  .object({
    password: z.string().nonempty({ message: 'Không được để trống' }),
    password_confirmation: z.string().nonempty({ message: 'Không được để trống' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Mật khẩu không khớp',
    path: ['password_confirmation'],
  })

export const employeeUpdateDto = z.object({
  name: z.string().nonempty({ message: 'Không được để trống' }).optional(),
  enabled: z.boolean().default(true).optional(),
})

export type Employee = {
  id: string
  name: string
  email: string
  enabled: boolean
  logined: boolean
  locked_at: string | null
  created_at: string
}

export type EmployeeUpdateDto = z.infer<typeof employeeUpdateDto>
export type ChangePasswordDto = z.infer<typeof changePasswordDto>
