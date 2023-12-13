import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
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

  return redirect(`/courses/${course.id}/sections/${course.sections[0].id}`)
}
