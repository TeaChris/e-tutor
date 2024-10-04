import Image from 'next/image'
import { MaxWidthWrapper } from '@/components'

export default function Footer() {
  return (
    <footer className="mt-0 w-full h-28">
      <MaxWidthWrapper className="lg:px-52 border-t-2 border-[#FD8E1F] flex items-center py-4 justify-between mt-4">
        <Image src="/icons/logo.svg" alt="logo" width={120} height={120} />
        <h2 className="text-2xl font-bold">Bermuda</h2>
      </MaxWidthWrapper>
    </footer>
  )
}
