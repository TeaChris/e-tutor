import { IconBadge } from '@/components/IconBadge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ArrowLeft, Eye, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SectionTitleForm from '../_components/SectionTitleForm'

export default async function SectionsIdPage({
  params,
}: {
  params: { courseId: string; sectionId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  })

  if (!section) {
    return redirect('/')
  }

  const requiredFields = [section.title, section.description, section.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/instructor/create/course/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Section Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <SectionTitleForm
                initialData={section}
                courseId={params.courseId}
                sectionId={params.sectionId}
              />
              {/* <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />  */}
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
