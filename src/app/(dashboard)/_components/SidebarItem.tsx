'use client'

import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive =
    (pathname === '/instructor/dashboard' &&
      href === '/instructor/dashboard') ||
    pathname === href ||
    pathname?.startsWith(`${href}/instructor/dashboard`)

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex items-center gap-x-2 text-[#8C94A3] text-sm font-[500] pl-6 transition-all hover:text-neutral-600 hover:bg-slate-300/20',
        isActive &&
          'bg-[#FF6636] text-white hover:bg-orange-700 hover:text-white'
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn('text-[#8C94A3]', isActive && 'text-white')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-[#FF6636] h-full transition-all',
          isActive && 'opacity-100'
        )}
      />
    </button>
  )
}
