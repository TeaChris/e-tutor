import { getSection } from '@/actions/get-section'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { courseId: string; sectionId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const {
    section,
    course,
    muxData,
    attachments,
    nextSection,
    userProgress,
    purchase,
  } = await getSection({
    userId,
    sectionId: params.sectionId,
    courseId: params.courseId,
  })

  if (!section || !course) {
    return redirect('/')
  }

  const isLocked = !section.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted
}
