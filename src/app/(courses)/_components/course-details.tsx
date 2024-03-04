import { IconNode } from 'lucide-react'

interface Props {
  item: any
  icon: any
  label: any
}

export function CourseDetails({ item, icon: Icon, label }: Props) {
  return (
    <article className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Icon className="text-neutral-500 w-4 h-4" />
        <h4 className="text-base">{label}</h4>
      </div>
      <h4 className="text-base text-neutral-500">{item}</h4>
    </article>
  )
}
