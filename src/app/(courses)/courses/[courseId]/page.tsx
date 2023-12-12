import { getProgress } from '@/actions/get-progress'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CourseSidebar from './_components/CourseSidebar'
import CourseNavbar from './_components/CourseNavbar'

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  const progressCount = await getProgress(userId, course.id)

  return (
    <div className="h-[27rem] w-full border-t border-orange-400 flex items-start">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>

      <main className="md:pl-80 h-full pt-[80px]">CourseIdPage</main>
    </div>
  )
}
