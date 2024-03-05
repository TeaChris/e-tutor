import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'

import { getSection } from '@/actions/get-section'

import { db } from '@/lib/db'
import { formatPrice } from '@/lib/format'
import { includes, whoCourse } from '@/data'

import Banner from '@/components/Banner'
import CourseEnrollButton from '@/components/CourseEnrollButton'

import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  AlarmClock,
  MoveRight,
  Clock4,
  ListChecks,
  Users,
  LibraryBig,
  File,
} from 'lucide-react'

import VideoPlayer from '@/app/(courses)/_components/VideoPlayer'
import { CopyButton } from '@/app/(courses)/_components/copy-button'
import { CourseDetails } from '@/app/(courses)/_components/course-details'
import CourseProgressButton from '@/app/(courses)/_components/CourseProgressButton'
import Preview from '@/components/Preview'
import CourseSidebar from '@/app/(courses)/_components/CourseSidebar'
import { getProgress } from '@/actions/get-progress'
import { Side } from '@/app/(courses)/_components/side'

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

  const cou = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })

  const isLocked = !section.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  const courses = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  const progressCount = await getProgress(userId, params.courseId)

  return (
    <>
      {userProgress?.isCompleted && (
        <Banner
          variant={'success'}
          label="You already completed this section"
        />
      )}
      {isLocked && (
        <Banner
          variant={'warning'}
          label="You need to purchase this course to watch this course"
        />
      )}
      <div className="w-full px-3 lg:px-20 flex flex-col space-y-6 lg:space-y-0 lg:flex-row items-start justify-between lg:gap-8 gap-0 pt-4 pb-20">
        <div className="w-full lg:w-[65%] space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
            {cou?.title}
          </h1>
          {!purchase && (
            <>
              {/* @ts-ignore */}
              <Preview value={cou?.description} />
            </>
          )}

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
                4.8{' '}
                <span className="text-neutral-400 hidden sm:block">
                  (451,444 Rating)
                </span>
              </h4>
            </div>
          </div>
          <VideoPlayer
            sectionId={params.sectionId}
            title={section.title}
            courseId={params.courseId}
            nextSectionId={nextSection?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />

          {!purchase ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Who this course is for:
              </h2>
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
          ) : (
            <div className="p-4 space-y-4">
              <div className=" flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                <CourseProgressButton
                  sectionId={params.sectionId}
                  courseId={params.courseId}
                  nextSectionId={nextSection?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              </div>
              <Separator />
              <div>
                <Preview value={section.description!} />
              </div>
              <Separator />
              {!!attachments.length && (
                <>
                  <Separator />
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a
                        href={attachment.url}
                        target="_blank"
                        key={attachment.id}
                        className="flex items-center p-3 w-full bg-orange-200 border text-orange-700 rounded-md hover:underline"
                      >
                        <File />
                        <p className="line-clamp-1">{attachment.name}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="w-full lg:w-[33%] h-max py-2 bg-white shadow-md shadow-neutral-300">
          {!purchase ? (
            <>
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
                    <article
                      key={i}
                      className="w-full flex items-center gap-x-2"
                    >
                      <item.icon className="w-5 h-5 text-orange-600" />
                      <h5 className="text-base text-neutral-500">
                        {item.label}
                      </h5>
                    </article>
                  ))}
                </div>
              </div>

              <div className="w-full border-b px-2 space-y-4 py-2">
                <h3 className="text-lg font-medium">Share this course:</h3>
                <CopyButton />
              </div>
            </>
          ) : (
            <Side cou={cou?.id} />
          )}
        </div>
      </div>
    </>
  )
}
