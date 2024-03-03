import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { auth, currentUser } from '@clerk/nextjs'

export default async function Page() {
  const { userId } = auth()
  const user = await currentUser()

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    // @ts-expect-error
    userId
  )

  let total = completedCourses.length + coursesInProgress.length
  return (
    <div className="w-full space-y-4 px-2">
      <h4 className="text-xl text-black font-medium">Your Courses ({total})</h4>
      <div className="w-full flex items-center justify-between h-[100px]"></div>
    </div>
  )
}
