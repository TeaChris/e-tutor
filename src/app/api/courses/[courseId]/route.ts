import Mux from '@mux/mux-node'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { isInstructor } from '@/lib/instructor'

import { db } from '@/lib/db'

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
)

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId || !isInstructor(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
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
      return new NextResponse('Not found', { status: 404 })
    }

    for (const section of course.sections) {
      if (section.muxData?.assetId) {
        await Video.Assets.del(section.muxData.assetId)
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    })

    return NextResponse.json(deletedCourse)
  } catch (error) {
    console.log('[COURSE_ID_DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId } = params
    const values = await req.json()

    if (!userId || !isInstructor(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
