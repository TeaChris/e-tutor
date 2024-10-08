import { Category, Course } from '@prisma/client'
import { CourseCards } from '@/components'

type CourseWithProgressWithCategory = Course & {
  category: Category | null
  sections: { id: string }[]
  progress: number | null
}

interface CoursesListsProps {
  items: CourseWithProgressWithCategory[]
}

const CoursesLists = ({ items }: CoursesListsProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCards
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            sectionsLength={item.sections.length}
            price={item.price!}
            progress={item.progress!}
            // @ts-ignore
            category={item?.category?.name}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center tex-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}

export { CoursesLists }
