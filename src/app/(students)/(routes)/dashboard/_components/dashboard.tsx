import { auth, currentUser } from '@clerk/nextjs'
import { InfoCard } from './info-card'

import { PlayCircle, BookAudio } from 'lucide-react'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { getCourses } from '@/actions/get-courses'
import CoursesList from '@/components/CoursesList'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export async function Dashboard() {
  const { userId } = auth()
  const user = await currentUser()

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    // @ts-expect-error
    userId
  )

  const courses = await getCourses({
    // @ts-ignore
    userId,
  })

  let total = completedCourses.length + coursesInProgress.length
  return (
    <div className="w-full space-y-4 px-2">
      <h4 className="text-xl text-black font-medium">Dashboard</h4>
      <div className="w-full flex items-center justify-between h-[100px]">
        <InfoCard
          bg="#FFEEE8"
          icon={PlayCircle}
          label="Enrolled Course(s)"
          numberOfItems={total}
        />
        <InfoCard
          bg="#EBEBFF"
          icon={BookAudio}
          label="Active Course(s)"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          bg="#E1F7E3"
          icon={BookAudio}
          label="Completed Course(s)"
          numberOfItems={completedCourses.length}
        />
      </div>

      <div className="w-full mt-4 space-y-3">
        <h4 className="text-xl text-black font-medium">
          Let&apos;s start learning{' '}
          <span className="capitalize">{user?.firstName}</span>
        </h4>
        <CoursesList items={courses} />
        <div className="w-full flex justify-center items-center">
          <Link
            href={'/courses'}
            className={buttonVariants({ variant: 'ghost' })}
          >
            Browse more courses &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
