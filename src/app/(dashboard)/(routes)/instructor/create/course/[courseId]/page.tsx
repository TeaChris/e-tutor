import { IconBadge } from '@/components/IconBadge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation'
import EditTitleForm from './_components/EditTitleForm'
import TopicForm from './_components/TopicForm'
import CategoryForm from './_components/CategoryForm'
import ImageForm from './_components/ImageForm'
import LanguageForm from './_components/LanguageForm'
import CourseLevelForm from './_components/CourseLevelForm'
import DescriptionForm from './_components/DescriptionForm'

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      sections: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const languages = await db.language.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const levels = await db.courseLevel.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!course) {
    return redirect('/')
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.topic,
    course.categoryId,
    course.sections.some((section) => section.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Make necessary edit your course</h2>
          </div>
          <EditTitleForm initialData={course} courseId={course.id} />
          <TopicForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <ImageForm initialData={course} courseId={course.id} />
          <LanguageForm
            initialData={course}
            courseId={course.id}
            options={languages.map((language) => ({
              label: language.name,
              value: language.id,
            }))}
          />
          <CourseLevelForm
            initialData={course}
            courseId={course.id}
            options={levels.map((level) => ({
              label: level.name,
              value: level.id,
            }))}
          />
          <DescriptionForm initialData={course} courseId={course.id} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
