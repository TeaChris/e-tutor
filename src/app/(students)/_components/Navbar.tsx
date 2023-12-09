'use client'

import { usePathname } from 'next/navigation'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import MobileSidebar from './MobileSidebar'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import SearchInput from './SearchInput'

type Route = {
  [key: string]: string
}

const route: Route = {
  '/instructor/dashboard': 'Your dashboard',
  '/instructor/create': 'Create new course',
  '/instructor/courses': 'Your courses',
  '/instructor/earnings': 'Your earnings',
  '/instructor/messages': 'Your messages',
  '/instructor/settings': 'Setup your profile',
}

export default function Navbar() {
  const pathname = usePathname()

  // send greetings based on the current time
  const getGreeting = () => {
    const currentHour = new Date().getHours()

    if (currentHour >= 0 && currentHour < 12) {
      return 'Hi, good morning'
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Hi, good afternoon'
    } else {
      return 'Hi, good evening'
    }
  }

  // display heading based on the active route
  const title = route[pathname]
  const isBrowsePage = pathname === '/browse'

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <MaxWidthWrapper className="lg:px-44 flex w-full h-full items-center justify-between py-1">
        <div className="hidden h-full lg:flex flex-col w-fit items-start gap-1 pb-2">
          <h6 className="capitalize text-[#6E7485] text-[14px] font-[500]">
            {getGreeting()}
          </h6>
          <h4 className="first-letter:capitalize text-[#1D2026] font-semibold text-base">
            {title}
          </h4>
        </div>
        <div className="w-fit flex items-center gap-4">
          <div className="w-fit h-8">
            {isBrowsePage && (
              <div className="hidden md:block">
                <SearchInput />
              </div>
            )}
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
