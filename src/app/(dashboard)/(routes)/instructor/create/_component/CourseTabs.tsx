'use client'

import { tabs } from '@/data'
import { Layers } from 'lucide-react'
import { useState } from 'react'
import BasicInfo from './BasicInfo'
import AdvancedInfo from './AdvancedInfo'
import Curriculum from './Curriculum'
import PublishCourse from './PublishCourse'
import { cn } from '@/lib/utils'

interface CourseTabsProps {
  options: { label: string; value: string }[]
  levels: { label: string; value: string }[]
  languages: { label: string; value: string }[]
  durations: { label: string; value: string }[]
}
export default function CourseTabs({
  options,
  levels,
  languages,
  durations,
}: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState<number | null>(tabs[0].id)
  const [iconIndex, setIconIndex] = useState<number>(0)

  const handleIconClick = (index: number) => {
    setIconIndex(index)
    setActiveTab(index)
  }
  return (
    <>
      {' '}
      <div className="w-full h-[10%] border-b border-neutral-200 rounded-t-sm flex items-start gap-0">
        {tabs.map((tab) => (
          <article
            key={tab.id}
            className={cn(
              'w-1/4 h-full flex items-center justify-between p-2 cursor-pointer',
              activeTab === tab.id && 'border-b-2 border-[#FF6636]'
            )}
            onClick={() => handleIconClick(tab.id)}
          >
            <div className="w-fit h-full items-center gap-1 flex">
              <Layers className="w-4 h-4 text-[#7d7d7d]" />
              <h5 className="text-black text-base">{tab.label}</h5>
            </div>
          </article>
        ))}
      </div>
      <div className="w-full h-[90%]">
        {activeTab === 1 && (
          <BasicInfo
            options={options}
            level={levels}
            languages={languages}
            durations={durations}
          />
        )}
        {activeTab === 2 && <AdvancedInfo />}
        {activeTab === 3 && <Curriculum />}
        {activeTab === 4 && <PublishCourse />}
      </div>
    </>
  )
}
