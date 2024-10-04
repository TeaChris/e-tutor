import { CourseCard } from '@/components'
import { Category, Course } from '@prisma/client'
import Link from 'next/link'

type CourseWithCategory = Course & {
  category: Category | null
  sections: { id: string }[]
}

interface CoursesListProps {
  items: CourseWithCategory[]
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            sectionsLength={item.sections.length}
            price={item.price!}
            // @ts-ignore
            category={item?.category?.name}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center tex-sm text-muted-foreground mt-10">
          You have no course in your dashboard visit the{' '}
          <Link href="/courses" className="underline">
            courses page
          </Link>{' '}
          to enroll a course of your choice
        </div>
      )}
    </div>
  )
}

export { CoursesList }
