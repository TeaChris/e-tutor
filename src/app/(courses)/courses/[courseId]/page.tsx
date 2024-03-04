import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth, currentUser } from '@clerk/nextjs'

import { getSection } from '@/actions/get-section'
import CourseEnrollButton from '@/components/CourseEnrollButton'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  AlarmClock,
  MoveRight,
  Clock4,
  ListChecks,
  Users,
  LibraryBig,
} from 'lucide-react'

import VideoPlayer from '../../_components/VideoPlayer'
import { CourseDetails } from '../../_components/course-details'

import { db } from '@/lib/db'
import { includes, whoCourse } from '@/data'
import { formatPrice } from '@/lib/format'
import { CopyButton } from '../../_components/copy-button'

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

  const duration = await db.courseDuration.findUnique({
    where: {
      id: params.courseId,
    },
  })

  return (
    <div className="w-full lg:px-20 flex items-start justify-between pt-4 pb-20">
      <div className="w-[65%] space-y-4">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
          {course.title}
        </h1>
        <p className="text-base font-medium text-neutral-500 leading-4 tracking-wide">
          {course.description}
        </p>

        <div className="w-full flex items-center justify-between">
          <div className="flex space-x-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="creator image"
              />
              <AvatarFallback>BE</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h6 className="text-neutral-400 text-xs">Created by:</h6>
              <h4 className="text-base font-semibold">Bermuda</h4>
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            {[
              '/icons/star.svg',
              '/icons/star.svg',
              '/icons/star.svg',
              '/icons/star.svg',
              '/icons/star.svg',
            ].map((st, i) => (
              <Image
                key={i}
                src={st}
                alt="rating"
                width={20}
                height={20}
                className="object-cover"
              />
            ))}

            <h4 className="text-lg">
              4.8 <span className="text-neutral-400">(451,444 Rating)</span>
            </h4>
          </div>
        </div>
        {!purchase && (
          <VideoPlayer
            sectionId={course.id}
            title={course.title}
            courseId={course.id}
          />
        )}

        {!purchase && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Who this course is for:</h2>
            <div className="space-y-3">
              {whoCourse.map((wo, i) => (
                <article key={i} className="w-full flex gap-3 items-center">
                  <div className="w-[3%]">
                    <MoveRight className="text-orange-500 w-6 h-4" />
                  </div>
                  <p className="text-sm text-neutral-600">{wo}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-[33%] h-max py-2 bg-white shadow-md shadow-neutral-300">
        <div className="w-full border-b space-y-2 px-2 pb-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-x-2">
              <h4 className="text-xl">{formatPrice(course.price!)}</h4>
              <h5 className="text-base line-through text-neutral-400">
                $175.00
              </h5>
            </div>
            <div className="px-2 py-1 bg-orange-50 text-sm text-orange-500">
              56% OFF
            </div>
          </div>
          <div className="flex gap-x-2 items-center text-sm font-semibold text-[#E34444]">
            <AlarmClock className="w-5 h-5" />
            <h4>2 days left at this price!</h4>
          </div>
        </div>

        <div className="w-full border-b px-2 space-y-2 py-2">
          <CourseDetails
            icon={Clock4}
            item="6 Hours"
            label={'Course Duration'}
          />
          <CourseDetails
            icon={ListChecks}
            item="Intermediate"
            label={'Course Level'}
          />
          <CourseDetails
            icon={Users}
            item="234,754"
            label={'Students enrolled'}
          />
          <CourseDetails
            icon={LibraryBig}
            item={'English'}
            label={'Language'}
          />
        </div>

        <div className="w-full border-b px-2 space-y-2 py-2">
          {!purchase && (
            <div className="w-full space-y-3">
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
              <div className="flex items-center gap-x-1">
                <h4 className="text-base text-neutral-600">Note:</h4>
                <h4 className="text-base text-neutral-400">
                  all courses have 30-days money-back guarantee
                </h4>
              </div>
            </div>
          )}
        </div>

        <div className="w-full border-b px-2 space-y-4 py-2">
          <h3 className="text-lg font-medium">This course includes:</h3>
          <div className="w-full space-y-3">
            {includes.map((item, i) => (
              <article key={i} className="w-full flex items-center gap-x-2">
                <item.icon className="w-5 h-5 text-orange-600" />
                <h5 className="text-base text-neutral-500">{item.label}</h5>
              </article>
            ))}
          </div>
        </div>

        <div className="w-full border-b px-2 space-y-4 py-2">
          <h3 className="text-lg font-medium">Share this course:</h3>
          <CopyButton />
        </div>
      </div>
    </div>
  )
}
