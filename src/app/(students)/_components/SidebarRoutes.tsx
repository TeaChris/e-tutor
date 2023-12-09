'use client'

import { usePathname } from 'next/navigation'
import {
  AppWindow,
  BarChart,
  BringToFront,
  Compass,
  MessageCircle,
  PlusCircle,
  Settings,
} from 'lucide-react'
import SidebarItem from './SidebarItem'

const guestRoute = [
  {
    icon: BarChart,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/browse',
  },
]

const instructorRoute = [
  {
    icon: BarChart,
    label: 'Dashboard',
    href: '/instructor/dashboard',
  },
  {
    icon: PlusCircle,
    label: 'Create new course',
    href: '/instructor/create',
  },
  {
    icon: BringToFront,
    label: 'My courses',
    href: '/instructor/courses',
  },
  {
    icon: AppWindow,
    label: 'Earning',
    href: '/instructor/earning',
  },
  {
    icon: MessageCircle,
    label: 'Messages',
    href: '/instructor/messages',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/instructor/settings',
  },
]
export default function SidebarRoutes() {
  const pathname = usePathname()

  const isInstructorPage = pathname?.includes('/instructor')
  const routes = isInstructorPage ? instructorRoute : guestRoute

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
