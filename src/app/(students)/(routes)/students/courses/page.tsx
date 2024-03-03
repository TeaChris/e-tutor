import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { getPurchased } from '@/actions/get-purchansed-courses'
import CoursesLists from '@/components/CourseLists'
import { auth, currentUser } from '@clerk/nextjs'

export default async function Page() {
  const { userId } = auth()
  const user = await currentUser()

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    // @ts-expect-error
    userId
  )

  let total = completedCourses.length + coursesInProgress.length

  // @ts-expect-error
  const courses = await getPurchased({ userId })
  return (
    <div className="w-full space-y-4 px-2">
      <h4 className="text-xl text-black font-medium">Your Courses ({total})</h4>

      <CoursesLists items={courses} />
    </div>
  )
}
