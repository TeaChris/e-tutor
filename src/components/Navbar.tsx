import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { Button } from './ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import { PlusCircle } from 'lucide-react'

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
export default function Navbar() {
  const { userId } = auth()
  return (
    <nav className="w-full bg-transparent flex flex-col items-start gap-0">
      {/* top nav */}
      <div className="w-full h-[52px] bg-[#1D2026] flex items-center justify-center">
        <MaxWidthWrapper className="md:px-2.5 flex items-center justify-between">
          <div className="hidden lg:flex w-[29rem] p-0 h-full items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[14px] text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-between w-48">
            <Select>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ng">NGN</SelectItem>
                <SelectItem value="eu">EUR</SelectItem>
                <SelectItem value="us">USD</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ng">English</SelectItem>
                <SelectItem value="eu">French</SelectItem>
                <SelectItem value="us">Espanol</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* bottom nav */}
      <div
        className={`w-full h-[96px] bg-transparent lg:flex items-center justify-center`}
      >
        <MaxWidthWrapper className="md:px-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 w-fit h-full">
            <Link href="/" className="">
              <Image
                src="/icons/logo.svg"
                alt="e-tutor logo"
                width={120}
                height={120}
              />
            </Link>
            <Link href="/instructor/create">
              <Button variant={'default'} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                create
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 w-fit">
            <div className="w-fit flex items-center gap-3">
              <Button variant={'ghost'}>
                <Image
                  src="/icons/bell.svg"
                  alt="notification logo"
                  width={20}
                  height={20}
                />
              </Button>
              <Button variant={'ghost'}>
                <Image
                  src="/icons/heart.svg"
                  alt="notification logo"
                  width={20}
                  height={20}
                />
              </Button>
              <Button variant={'ghost'}>
                <Image
                  src="/icons/cart.svg"
                  alt="notification logo"
                  width={20}
                  height={20}
                />
              </Button>
            </div>

            <div className="w-fit flex items-center gap-3">
              {userId ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <>
                  <Link href="/sign-up">
                    <Button className="bg-[#FFEEE8] text-[#FF6636] hover:bg-[#FFEEE8]">
                      Create account
                    </Button>
                  </Link>
                  <Link href="/sign-in">
                    <Button variant={'default'}>Sign in</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </nav>
  )
}
