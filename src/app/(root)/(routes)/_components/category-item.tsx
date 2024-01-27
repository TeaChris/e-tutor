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

export function CategoryItem({ label, icon, value }: CategoryItemProps) {
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
    router.push(url)
  }
  return <Link href={``} className="w-52 bg-black"></Link>
}
