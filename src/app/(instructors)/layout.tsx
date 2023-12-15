import { auth } from '@clerk/nextjs'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'
import { isInstructor } from '@/lib/instructor'
import { redirect } from 'next/navigation'

export default function InstructorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!isInstructor(userId)) {
    return redirect('/')
  }

  
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  )
}
