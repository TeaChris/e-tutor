import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { userId } = auth()
    const { isCompleted } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_sectionId: {
          userId,
          sectionId: params.sectionId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        sectionId: params.sectionId,
        isCompleted,
      },
    })

    return NextResponse.json(userProgress)
  } catch (error) {
    console.log('[SECTION_ID_PROGRESS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
