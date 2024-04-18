import * as z from 'zod'

export const basicDto = z.object({
  id: z.string().optional(),
  shell: z.string().trim().min(1, { message: 'Không được để trống' }),
  value: z.string().trim().min(1, { message: 'Không được để trống' }),
  value_en: z.string(),
  group: z.string().optional(),
})

export type BasicDto = z.infer<typeof basicDto>
