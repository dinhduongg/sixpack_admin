export interface Dashboard {
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
  childrens: Dashboard[]
}
