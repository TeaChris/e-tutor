import { getProgress } from '@/actions/get-progress'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Course } from '@prisma/client'
import { redirect } from 'next/navigation'
import CourseSidebar from './CourseSidebar'

interface Props {
  cou: string | undefined
}

export async function Side({ cou }: Props) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: cou,
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
  return <CourseSidebar course={course} progressCount={progressCount} />
}
