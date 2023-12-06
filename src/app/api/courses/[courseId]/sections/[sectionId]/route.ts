import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { userId } = auth()
    const values = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const section = await db.section.update({
      where: {
        id: params.sectionId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(section)
  } catch (error) {
    console.log('[COURSES_SECTION_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
