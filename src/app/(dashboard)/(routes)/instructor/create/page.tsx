import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import BasicInfo from './_component/BasicInfo'

interface CreateProps {}

export default async function Create({}: CreateProps) {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courseLevels = await db.courseLevel.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courseLanguage = await db.language.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courseDuration = await db.courseDuration.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[85%] h-[85%] bg-white rounded-sm flex flex-col items-start gap-0">
        <BasicInfo
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          levels={courseLevels.map((level) => ({
            label: level.name,
            value: level.id,
          }))}
          languages={courseLanguage.map((language) => ({
            label: language.name,
            value: language.id,
          }))}
          durations={courseDuration.map((duration) => ({
            label: duration.name,
            value: duration.id,
          }))}
        />
      </div>
    </div>
  )
}

{
  /* <CourseTabs
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          levels={courseLevels.map((level) => ({
            label: level.name,
            value: level.id,
          }))}
          languages={courseLanguage.map((language) => ({
            label: language.name,
            value: language.id,
          }))}
          durations={courseDuration.map((duration) => ({
            label: duration.name,
            value: duration.id,
          }))}
        /> */
}
