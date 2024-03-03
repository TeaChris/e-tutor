import { Course, Category } from '@prisma/client'
import { db } from '@/lib/db'
import { getProgress } from './get-progress'

type CourseWithCategory = Course & {
  category: Category | null
  sections: { id: string }[]
}

type GetCourses = {
  userId: string
  title?: string
  categoryId?: string
}

export const getCourse = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        userId,
        categoryId,
      },
      include: {
        category: true,
        sections: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
    })

    return courses
  } catch (error) {
    console.log('[GET_COURSES', error)
    return []
  }
}
