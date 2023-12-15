import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { isInstructor } from '@/lib/instructor'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const {
      title,
      subtitle,
      topic,
      categoryId,
      languageId,
      courseLevelId,
      courseDurationId,
    } = await req.json()

    if (!userId || !isInstructor(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        subtitle,
        topic,
        categoryId,
        languageId,
        courseLevelId,
        courseDurationId,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[CREATE_COURSES]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
