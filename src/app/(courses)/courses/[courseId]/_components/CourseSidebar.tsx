import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Course, Section, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation'
import CourseSidebarItem from './CourseSidebarItem'

interface CourseSidebarProps {
  course: Course & {
    sections: (Section & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

export default async function CourseSidebar({
  course,
  progressCount,
}: CourseSidebarProps) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  })
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <p className="font-semibold">{course.title}</p>
        {/* check purchase and add progress */}
      </div>
      <div className="flex flex-col w-full">
        {course.sections.map((section) => (
          <CourseSidebarItem
            key={section.id}
            id={section.id}
            label={section.title}
            isCompleted={!!section.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!section.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}
