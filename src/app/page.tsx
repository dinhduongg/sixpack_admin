import { Metadata } from 'next'

import Header from '@/components/common/Header'

export const metadata: Metadata = {
  title: 'Trang chủ',
}

export default function Home() {
  return (
    <div>
      <Header />
      <br />
      Home page
    </div>
  )
}
