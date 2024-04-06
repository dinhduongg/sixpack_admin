export const handleError = (error: any) => {
  console.error('An error occurred:', error)
}

export const saveToStorage = (value: any, name: any) => {
  if (typeof window == 'undefined') {
    return null
  }
  try {
    const serializedState = JSON.stringify(value)
    localStorage.setItem(name, serializedState)
  } catch (err: any) {
    handleError(err)
  }
}

export const loadFromStorage = (name: string) => {
  if (typeof window == 'undefined') {
    return null
  }
  try {
    const serializedState = localStorage.getItem(name)
    if (serializedState === null) {
      return null
    }
    return JSON.parse(serializedState)
  } catch (err: any) {
    handleError(err)
    return ''
  }
}
export const removeFromStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    return
  }
  try {
    localStorage.removeItem(name)
  } catch (err: any) {
    handleError(err)
  }
}
