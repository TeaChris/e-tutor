import Link from 'next/link'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'
import { isInstructor } from '@/lib/instructor'

type Nav = {
  label: string
  href: string
}[]

const nav: Nav = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Become an Instructor', href: '/instructor' },
]

interface MobileNavProps {
  userId: string | null
}

export default function MobileNav({ userId }: MobileNavProps) {
  return (
    <div className="w-full h-full flex flex-col items-center pt-32 px-2">
      <div className="w-full h-1/2 flex flex-col items-center gap-4">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[14px] text-black font-semibold"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {isInstructor(userId) && (
        <Link href="/instructor/create" className="hidden lg:block">
          <Button
            variant={'default'}
            size={'lg'}
            className="w-full flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            create
          </Button>
        </Link>
      )}

      <div className="w-full flex flex-col items-center gap-3">
        {userId ? (
          <div></div>
        ) : (
          <>
            <Link href="/sign-up" className="w-full">
              <Button className="w-full bg-[#FFEEE8] text-[#FF6636] hover:bg-[#FFEEE8]">
                Create account
              </Button>
            </Link>
            <Link href="/sign-in" className="w-full">
              <Button variant={'default'} className="w-full">
                Sign in
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
