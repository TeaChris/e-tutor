'use client'

import { FC, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Dashboard } from './dashboard'
import { Courses } from './courses'
import Settings from './Settings'

interface BoardsProps {}

const Boards: FC<BoardsProps> = () => {
  const [active, setActive] = useState<string>('dashboard')
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (link: string) => {
    setActive(link)
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('tab', link)
    router.push(`${window.location.pathname}?${searchParams.toString()}`)
  }

  return (
    <section className="w-full space-y-12">
      <div className="flex items-center gap-x-6 w-full">
        {['dashboard', 'courses', 'settings'].map((link) => (
          <button
            key={link}
            className={cn(
              'text-base font-medium px-4 py-2 text-neutral-500 capitalize',
              {
                'text-black border-b-2 border-orange-600 transition duration-100':
                  link === active,
              }
            )}
            onClick={() => onClick(link)}
          >
            {link}
          </button>
        ))}
      </div>
      <div className="w-full">
        {active === 'dashboard' && <Dashboard />}
        {active === 'courses' && <Courses />}
        {active === 'settings' && <Settings />}
      </div>
    </section>
  )
}

export default Boards
