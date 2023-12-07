import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { userId } = auth()

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

    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
        courseId: params.courseId,
      },
    })

    const muxData = await db.muxData.findUnique({
      where: {
        sectionId: params.sectionId,
      },
    })

    if (
      !section ||
      !muxData ||
      !section.title ||
      !section.description ||
      !section.videoUrl
    ) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const publishedSection = await db.section.update({
      where: {
        id: params.sectionId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishedSection)
  } catch (error) {
    console.log('SECTION_PUBLISH', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
