'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import Link from 'next/link'

const nav = [
  { label: 'dashboard', link: '/students/dashboard' },
  { label: 'courses', link: '/students/courses' },
  { label: 'settings', link: '/students/settings' },
]

export function StudentNav() {
  const pathname = usePathname()
  return (
    <div className="flex items-center gap-x-6 w-full">
      {nav.map((it, i) => (
        <Link
          href={it.link}
          key={i}
          className={cn(
            'text-base font-medium px-4 py-2 text-neutral-500 capitalize',
            {
              'text-black border-b-2 border-orange-600 transition duration-100':
                pathname === it.link,
            }
          )}
        >
          {it.label}
        </Link>
      ))}
    </div>
  )
}
