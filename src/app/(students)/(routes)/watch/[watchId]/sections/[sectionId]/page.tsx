import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { File } from 'lucide-react'
import { getSection } from '@/actions/get-section'
import Banner from '@/components/Banner'
import VideoPlayer from './_components/VideoPlayer'
import CourseEnrollButton from '@/components/CourseEnrollButton'
import { Separator } from '@/components/ui/separator'
import Preview from '@/components/Preview'
import CourseProgressButton from './_components/CourseProgressButton'

export default async function SectionIdPage({
  params,
}: {
  params: { watchId: string; sectionId: string }
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
    courseId: params.watchId,
  })

  if (!section || !course) {
    return redirect('/')
  }

  const isLocked = !section.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this section." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this section."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            sectionId={params.sectionId}
            title={section.title}
            courseId={params.watchId}
            nextSectionId={nextSection?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            {purchase ? (
              <CourseProgressButton
                sectionId={params.sectionId}
                courseId={params.watchId}
                nextSectionId={nextSection?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.watchId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={section.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
