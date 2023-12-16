import { Menu } from 'lucide-react'
import { Section, Course, UserProgress } from '@prisma/client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import CourseSidebar from './CourseSidebar'

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Section & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

export default function CourseMobileSidebar({
  course,
  progressCount,
}: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        {/* @ts-ignore */}
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  )
}
