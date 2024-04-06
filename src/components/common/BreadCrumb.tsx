'use client'

import Link from 'next/link'
import { Copy } from 'lucide-react'

import { cn, generateRandomId } from '@/lib/utils'

interface Segment {
  name: string
  isLink: boolean
  isCopy: boolean
  href?: string
}

interface BreadCrumbProps {
  segments?: Segment[]
}

export default function BreadCrumb({ segments }: BreadCrumbProps) {
  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="flex items-center gap-2 py-3 border-b border-b-gray-300">
      {segments &&
        segments.map((segment, index) => (
          <div key={generateRandomId(12)} className="flex items-center gap-2">
            {segment.isLink ? (
              <>
                <Link href={segment.href!} target={segment.href?.startsWith('/') ? '_self' : '_blank'} key={index} className="text-primary hover:text-red-500">
                  {segment.name}
                </Link>
                {segment.isCopy && (
                  <span className="cursor-pointer text-black hover:text-black/50" onClick={() => onCopy(segment.name)}>
                    <Copy size={20} />
                  </span>
                )}
              </>
            ) : (
              <span key={index}>{segment.name}</span>
            )}
            <span className={cn({ hidden: index === segments.length - 1 })}>&gt;</span>
          </div>
        ))}
    </div>
  )
}
