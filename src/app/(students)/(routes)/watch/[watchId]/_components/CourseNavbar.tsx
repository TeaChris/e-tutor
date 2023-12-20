import { Course, Section, UserProgress } from '@prisma/client'
import CourseMobileSidebar from './CourseMobileSidebar'
import { NavbarRoutes } from '@/components/NavRoutes'

interface CourseNavbarProps {
  course: Course & {
    sections: (Section & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

export default function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  return (
    <div className="p-4 border-b border-slate-200 h-full flex items-center shadow-sm bg-neutral-200">
      {/* @ts-ignore */}
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}
