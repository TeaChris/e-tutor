import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { File } from 'lucide-react'
import { getSection } from '@/actions/get-section'
import Banner from '@/components/Banner'
import VideoPlayer from './_components/VideoPlayer'


export default async function SectionIdPage({
  params,
}: {
  params: { courseId: string; sectionId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
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
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            sectionId={params.sectionId}
            title={section.title}
            courseId={params.courseId}
            nextSectionId={nextSection?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        </div>
    </div>
  )
}
