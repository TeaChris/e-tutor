import Image from 'next/image'
import Link from 'next/link'
import { IconBadge, CourseProgress } from '@/components'
import { BookOpen } from 'lucide-react'
import { formatPrice } from '@/lib'

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  sectionsLength: number
  price: number
  progress: number | null
  category: string
}

const CourseCards = ({
  id,
  title,
  imageUrl,
  sectionsLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-orange-700 transition line-clamp-2">
            {title}
          </div>
          <div
            className={`w-fit h-fit px-2 py-[0.012rem] rounded-sm ${
              category === 'Music'
                ? 'bg-purple-100 text-purple-900'
                : category === 'Photography'
                ? 'bg-emerald-100 text-emerald-900'
                : category === 'Fitness'
                ? 'bg-sky-100 text-sky-900'
                : category === 'Accounting'
                ? 'bg-slate-50 text-slate-700'
                : category === 'Computer Science'
                ? 'bg-red-100 text-red-900'
                : category === 'Filming'
                ? 'bg-orange-100 text-orange-900'
                : category === 'Engineering'
                ? 'bg-yellow-100 text-yellow-900'
                : category === 'Business'
                ? 'text-lime-900 bg-lime-100'
                : category === 'Health & Fitness'
                ? 'bg-green-100 text-green-900'
                : category === 'Marketing'
                ? 'bg-teal-100 text-teal-900'
                : category === 'Life Style'
                ? 'text-cyan-900 bg-cyan-100'
                : 'text-pink-900 bg-pink-100'
            }`}
          >
            <p className="text-xs">{category}</p>
          </div>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size={'sm'} icon={BookOpen} />
              <span>
                {sectionsLength} {sectionsLength === 1 ? 'Section' : 'Sections'}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? 'success' : 'default'}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export { CourseCards }
