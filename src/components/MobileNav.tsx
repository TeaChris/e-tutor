'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'
import { isInstructor } from '@/lib/instructor'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type Nav = {
  label: string
  href: string
}[]

const nav: Nav = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Become an Instructor', href: '/instructor' },
]

interface MobileNavProps {
  userId: string | null
}

export default function MobileNav({ userId }: MobileNavProps) {
  const pathname = usePathname()
  return (
    <aside className="h-full border-r flex flex-col overflow-y-auto bg-black  shadow-sm">
      <div className="p-6 flex items-center gap-2 h-[80px] border-b border-b-neutral-500">
        <Link href="/">
          <Image
            src="/icons/logo2.svg"
            alt="e-tutor logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      {/* navigation links */}
      <div className="flex flex-col w-full">
        {nav.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={cn(
              'h-12 flex items-center gap-x-2 text-[#8C94A3] text-sm font-[500] pl-6 transition-all hover:text-neutral-600 hover:bg-slate-300/20',
              pathname === item.href &&
                'bg-[#FF6636] text-white hover:bg-orange-700 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
