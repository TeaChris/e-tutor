import { db } from '@/lib/db'
import { Attachment, Section } from '@prisma/client'

interface GetSectionProps {
  userId: string
  courseId: string
  sectionId: string
}

export const getSection = async ({
  userId,
  courseId,
  sectionId,
}: GetSectionProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    })

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        isPublished: true,
      },
    })

    if (!section || !course) {
      throw new Error('Section or course not found')
    }

    let muxData = null
    let attachments: Attachment[] = []
    let nextSection: Section | null = null

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      })
    }

    if (section.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          sectionId: sectionId,
        },
      })

      nextSection = await db.section.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: section?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      })
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_sectionId: {
          userId,
          sectionId,
        },
      },
    })

    return {
      section,
      course,
      muxData,
      attachments,
      nextSection,
      userProgress,
      purchase,
    }
  } catch (error) {
    console.log('[GET_SECTION]', error)
    return {
      section: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  }
}
