import { auth, currentUser } from '@clerk/nextjs'

import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { getCourse } from '@/actions/get-course'

import { PlayCircle, BookAudio } from 'lucide-react'

import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

import { InfoCard } from '@/components/info-card'
import CoursesList from '@/components/CoursesList'

export default async function Dashboard() {
  const { userId } = auth()
  const user = await currentUser()

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    // @ts-expect-error
    userId
  )

  // @ts-expect-error
  const courses = await getCourse({ userId })

  let total = completedCourses.length + coursesInProgress.length
  return (
    <div className="w-full space-y-4 px-2">
      <h4 className="text-xl text-black font-medium">Dashboard</h4>
      <div className="w-full flex flex-col space-y-2 lg:space-y-0 lg:flex-row items-center justify-between h-max lg:h-[100px]">
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
