import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'

import { db } from '@/lib/db'
import Banner from '@/components/Banner'

import { IconBadge } from '@/components/IconBadge'
import SectionAccessForm from './_components/SectionAccessForm'
import SectionActions from './_components/SectionActions'
import SectionTitleForm from './_components/SectionTitleForm'
import SectionDescriptionForm from './_components/SectionDescriptionForm'
import { SectionVideoForm } from './_components/SectionVideoForm'

export default async function Page({
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
      {!section.isPublished && (
        <Banner
          variant="warning"
          label="This section is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/instructor/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">section Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <SectionActions
                disabled={!isComplete}
                courseId={params.courseId}
                sectionId={params.sectionId}
                isPublished={section.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your section</h2>
              </div>
              <SectionTitleForm
                initialData={section}
                courseId={params.courseId}
                sectionId={params.sectionId}
              />
              <SectionDescriptionForm
                initialData={section}
                courseId={params.courseId}
                sectionId={params.sectionId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <SectionAccessForm
                initialData={section}
                courseId={params.courseId}
                sectionId={params.sectionId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <SectionVideoForm
              initialData={section}
              sectionId={params.sectionId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  )
}
