import Image from 'next/image'
import SidebarRoutes from './SidebarRoutes'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="h-full border-r flex flex-col overflow-y-auto bg-black  shadow-sm">
      <div className="p-6 flex items-center gap-2 h-[80px] border-b border-b-neutral-500">
        <Link href="/">
          <Image
            src="/icons/logo2.svg"
            alt="e-tutor logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </aside>
  )
}
