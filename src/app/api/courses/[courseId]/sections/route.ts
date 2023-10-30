import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { title } = await req.json()

    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('unauthorized', { status: 401 })
    }

    const lastSection = await db.section.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: 'desc',
      },
    })

    const newPosition = lastSection ? lastSection.position + 1 : 1

    const section = await db.section.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    })
    return NextResponse.json(section)
  } catch (error) {
    console.log('SECTIONS', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
