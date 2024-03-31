'use client'

// import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'

export default function ToastProvider() {
  // return <Toaster position="top-right" />
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  )
}
