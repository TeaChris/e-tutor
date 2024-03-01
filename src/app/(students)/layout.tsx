import Navbar from '@/components/Navbar'
import { auth } from '@clerk/nextjs'

import { redirect } from 'next/navigation'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  return (
    <div className="h-full">
      <Navbar />

      <main className="">{children}</main>
    </div>
  )
}
