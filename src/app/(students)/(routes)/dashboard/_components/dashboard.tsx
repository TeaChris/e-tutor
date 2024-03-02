import { auth } from '@clerk/nextjs'
import { InfoCard } from './info-card'

import { PlayCircle, BookAudio } from 'lucide-react'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'

export async function Dashboard() {
  const { userId } = auth()

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    // @ts-expect-error
    userId
  )

  let total = completedCourses.length + coursesInProgress.length
  return (
    <div className="w-full space-y-4 px-2">
      <h4 className="text-lg text-black font-medium">Dashboard</h4>
      <div className="w-full flex items-center space-x-8 h-[110px]">
        <InfoCard
          bg="#FFEEE8"
          icon={PlayCircle}
          label="Enrolled Courses"
          numberOfItems={total}
        />
        <InfoCard
          bg="#EBEBFF"
          icon={BookAudio}
          label="Active Courses"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          bg="#E1F7E3"
          icon={BookAudio}
          label="Completed Courses"
          numberOfItems={completedCourses.length}
        />
      </div>
    </div>
  )
}
