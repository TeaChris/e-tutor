'use client'

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Boards from './_components/boards'

export default function Page() {
  const { user } = useUser()

  const PageMapping: Record<string, React.ComponentType> = {
    dashboard: Dashboard,
    courses: Courses,
    settings: Settings,
  }

  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full h-[280px] bg-[#FFEEE8]"></div>
      <div className="w-full flex items-center justify-center flex-1 top-7 absolute h-96">
        <div className="w-3/4 py-2 h-max bg-white space-y-12">
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
                <div className="space-y-2">
                  <h4 className="text-lg text-black font-medium">
                    {user?.fullName}
                  </h4>
                  <p className="text-neutral-400 text-xs">{user?.lastName}</p>
                </div>
              </div>
              {/* TODO: add instructor button later */}
            </div>
          </div>

          <Boards
            links={['dashboard', 'courses', 'settings']}
            PageMap={PageMapping}
          />
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  return <div>Feeds</div>
}

function Courses() {
  return <div>Challenges</div>
}
function Settings() {
  return <div>network</div>
}
