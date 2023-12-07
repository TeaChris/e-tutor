import Mux from '@mux/mux-node'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
)

export async function DELETE(
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

    if (!section) {
      return new NextResponse('Not Found', { status: 404 })
    }

    if (section.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          sectionId: params.sectionId,
        },
      })

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }
    }

    const deletedSection = await db.section.delete({
      where: {
        id: params.sectionId,
      },
    })

    const publishedSectionsInCourse = await db.section.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    })

    if (!publishedSectionsInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      })
    }

    return NextResponse.json(deletedSection)
  } catch (error) {
    console.log('[SECTION_ID_DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

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

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          sectionId: params.sectionId,
        },
      })

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        })
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: 'public',
        test: false,
      })

      await db.muxData.create({
        data: {
          sectionId: params.sectionId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      })
    }

    return NextResponse.json(section)
  } catch (error) {
    console.log('[COURSES_SECTION_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
