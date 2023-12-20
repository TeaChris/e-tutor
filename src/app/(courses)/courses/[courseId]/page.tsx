import { db } from '@/lib/db'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getSection } from '@/actions/get-section'
import { auth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import CourseEnrollButton from '@/components/CourseEnrollButton'

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = auth()

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })

  if (!course) {
    return redirect('/')
  }

  const { purchase } = await getSection({
    // @ts-expect-error
    userId,
    courseId: params.courseId,
  })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96 h-96 flex flex-col items-center gap-3">
        <Image
          // @ts-ignore
          src={course.imageUrl}
          alt={course.title}
          width={600}
          height={600}
          className="object-cover rounded-md w-full h-52"
        />
        <p className="text-slate-500 text-2xl font-bold hover:text-orange-700 text-start">
          {course.title}
        </p>
        {purchase ? (
          <Button disabled>Already Enrolled</Button>
        ) : (
          <CourseEnrollButton
            courseId={params.courseId}
            price={course.price!}
          />
        )}
      </div>
    </div>
  )
}
