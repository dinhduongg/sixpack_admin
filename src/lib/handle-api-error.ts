import { EntityError } from '@/config/http'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

const handleApiError = (error: any, setError?: UseFormSetError<any>, content?: string) => {
  if (error instanceof EntityError && setError) {
    for (const [key, value] of Object.entries(error)) {
      setError(key, { message: value })
    }
  } else {
    toast.error(content ?? error.payload?.message)
  }
}

export default handleApiError
