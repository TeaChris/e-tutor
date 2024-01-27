'use client'

import { Category } from '@prisma/client'

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcAcceptDatabase,
  FcAdvertising,
  FcAndroidOs,
  FcAnswers,
  FcAlphabeticalSortingZa,
} from 'react-icons/fc'

import { IconType } from 'react-icons'
import { CategoryItem } from './category-item'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  'Computer Science': FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Business: FcAcceptDatabase,
  'Health & Fitness': FcAdvertising,
  Marketing: FcAndroidOs,
  'Life Style': FcAnswers,
  Design: FcAlphabeticalSortingZa,
}

export function Categories({ items }: CategoriesProps) {
  return (
    <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-y-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}
