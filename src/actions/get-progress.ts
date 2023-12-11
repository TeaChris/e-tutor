import { db } from '@/lib/db'

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedSections = await db.section.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    })
    const publishedSectionIds = publishedSections.map((section) => section.id)

    const validCompletedSections = await db.userProgress.count({
      where: {
        userId: userId,
        sectionId: {
          in: publishedSectionIds,
        },
        isCompleted: true,
      },
    })

    const progressPercentage =
      (validCompletedSections / publishedSectionIds.length) * 100

    return progressPercentage
  } catch (error) {
    console.log('[GET_PROGRESS]', error)
    return 0
  }
}
