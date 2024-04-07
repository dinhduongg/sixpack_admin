import * as z from 'zod'

export const dashboardDto = z.object({
  name: z.string().nonempty({ message: 'Không được để trống' }),
  parent_id: z
    .string()
    .optional()
    .transform((val) => (val === 'undefined' ? undefined : val)),
  url: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  icon: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  role_code: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  check_role: z.boolean().optional(),
  enabled: z.boolean().optional(),
  sorted: z.coerce.number().default(1),
})

export type Dashboard = {
  id: string
  name: string
  icon: string
  parent_id: string | null
  url: string | null
  role_code: string | null
  enabled: boolean
  check_role: boolean
  created_at: string
  updated_at: string
  sorted: number
  childrens: Dashboard[]
}

export type DashboardDto = z.infer<typeof dashboardDto>
