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
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}
