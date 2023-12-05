import { ScrollArea } from '@/components/ui/scroll-area'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import ImageForm from '../_components/ImageForm'
import DescriptionForm from '../_components/DecriptionForm'
import CourseCurriculum from '../_components/CourseCurriculum'

export default async function CourseId({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      sections: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[85%] h-[95%] bg-white rounded-sm flex flex-col items-start gap-0">
        <div className="w-full h-full p-2 flex flex-col items-start gap-0">
          <div className="w-full h-[9%] flex items-center justify-between">
            <h4 className="text-xl text-black font-semibold">
              Advanced Information
            </h4>
          </div>

          <ScrollArea className="w-full h-[99%]">
            <div className="h-[91%] w-full flex flex-col items-start gap-3">
              <div className="w-full h-60 border-b p-2 border-neutral-200 flex items-start gap-[2%]">
                <div className="w-[48%] h-full p-3">
                  <ImageForm initialData={course} courseId={course.id} />
                </div>
              </div>

              {/* bottom */}
              <div className="w-full h-fit flex flex-col items-start gap-3">
                <DescriptionForm initialData={course} courseId={course.id} />
              </div>
              <div className="w-full h-fit flex flex-col items-start gap-3">
                {/* @ts-ignore */}
                <CourseCurriculum initialData={course} courseId={course.id} />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
