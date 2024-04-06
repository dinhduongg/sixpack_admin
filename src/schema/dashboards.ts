import * as z from 'zod'

export const dashboardDto = z.object({
  name: z.string({ required_error: 'Không được để trống' }),
  parent_id: z.string().optional(),
  url: z.string().optional(),
  icon: z.string().optional(),
  sorted: z.number().optional().default(1),
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
