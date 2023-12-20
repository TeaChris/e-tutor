import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function WatchIdPage({
  params,
}: {
  params: { watchId: string }
}) {
  const watch = await db.course.findUnique({
    where: {
      id: params.watchId,
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

  if (!watch) {
    return redirect('/')
  }

  return redirect(`/watch/${watch.id}/sections/${watch.sections[0].id}`)
}
