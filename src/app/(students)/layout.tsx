import Navbar from '@/components/Navbar'
import { auth, currentUser } from '@clerk/nextjs'
import Image from 'next/image'

import { redirect } from 'next/navigation'
import { StudentNav } from '@/components/student-nav'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  const user = await currentUser()
  if (!userId) return redirect('/sign-in')

  return (
    <div className="h-full">
      <Navbar />

      <main className="w-full space-y-12">
        <div className="w-full h-[280px] bg-[#FFEEE8] relative">
          <div className="w-full flex items-center justify-center top-20 absolute h-max">
            <div className="w-full lg:w-3/4 py-2 h-max bg-white space-y-12">
              <div className="w-full px-8 space-y-4">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      // @ts-ignore
                      src={user?.imageUrl}
                      // @ts-ignore
                      alt={user?.fullName}
                      width={300}
                      height={300}
                      className="w-[80px] aspect-square rounded-full object-cover"
                    />
                    <div className="space-y-1">
                      <h4 className="text-2xl text-black font-semibold">
                        {user?.firstName} <span>{user?.lastName}</span>
                      </h4>
                      <div className="flex space-x-4">
                        {user?.emailAddresses.map((email, i) => (
                          <p className="text-sm text-neutral-400" key={i}>
                            {email.emailAddress}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* TODO: add instructor button later */}
                </div>
              </div>

              <StudentNav />

              <div>{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
