import { redirect } from 'next/navigation'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { auth } from '@clerk/nextjs'

export default function Create() {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white shadow-sm shadow-neutral-200 rounded-[4px] w-[90%] h-[90%] flex flex-col items-start">
        <div className="w-full h-14 border-b border-neutral-300">wrapper</div>
      </div>
    </div>
  )
}
