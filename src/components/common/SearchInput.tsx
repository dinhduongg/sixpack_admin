'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder?: string
  query?: string
}

export default function SearchInput({ placeholder, query = 'q' }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState<string>('')

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)

    params.set(query, searchValue)
    router.push(`${pathname}?${params.toString()}`)
    setSearchValue('')
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center h-10 border border-bordercolor rounded">
      <input
        type="text"
        className="outline-none rounded text-base w-80 h-full pl-2"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="h-full flex items-center justify-center pr-2 text-black/80">
        <Search size={20} />
      </button>
    </form>
  )
}
