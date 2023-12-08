import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        sections: {
          include: {
            muxData: true,
          },
        },
      },
    })

    if (!course) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const hasPublishedSection = course.sections.some(
      (section) => section.isPublished
    )

    if (
      !course.title ||
      !course.categoryId ||
      !course.description ||
      !course.imageUrl ||
      !course.price ||
      !course.topic ||
      !hasPublishedSection
    ) {
      return new NextResponse('Missing required fields', { status: 401 })
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishedCourse)
  } catch (error) {
    console.log('[COURSE_ID_PUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
