import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DataTable } from './__components/DataTable'
import { columns } from './__components/Columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export default async function CoursesPage() {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  )
}