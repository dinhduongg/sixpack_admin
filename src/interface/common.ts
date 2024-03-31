type Query = string | string[][] | Record<string, string> | URLSearchParams | undefined | any

interface BreadcrumbMap {
  [key: string]: string
}

interface PaginationLink {
  url?: string
  label: string
  active: boolean
}

interface Pagination {
  current_page: number
  per_page: number
  total: number
  total_page: number
}

type ReturnStatus = {
  status: 'success' | 'error'
  message?: string
  error?: any
}
