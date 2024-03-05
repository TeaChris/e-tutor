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
    include: {
      sections: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  return redirect(`/courses/${course.id}/sections/${course.sections[0].id}`)
}
{
  /*  */
}
