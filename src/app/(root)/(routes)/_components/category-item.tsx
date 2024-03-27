'use client'

import { cn } from '@/lib/utils'
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IconType } from 'react-icons'
import Link from 'next/link'

interface CategoryItemProps {
  label: string
  icon?: IconType
  value?: string
}

export function CategoryItem({ label, icon: Icon, value }: CategoryItemProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get('categoryId')
  const currentTitle = searchParams.get('title')

  const isSelected = currentCategoryId === value

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(`/courses/${url}`)
  }
  return (
    <button
      onClick={onClick}
      className="w-full lg:w-60 bg-neutral-200 h-[4.5rem] flex items-start gap-x-5 p-2 rounded-sm"
    >
      {Icon && <Icon size={50} />}
      <div className="space-y-3 w-4/6 flex flex-col items-start">
        <h5 className="truncate font-semibold">{label}</h5>
        <p className="text-sm">532 courses</p>
      </div>
    </button>
  )
}
