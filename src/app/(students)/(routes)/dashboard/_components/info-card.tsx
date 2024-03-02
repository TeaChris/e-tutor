import { IconBadge } from '@/components/IconBadge'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface Props {
  numberOfItems: number
  variant?: 'default' | 'success'
  label: string
  icon: LucideIcon
  bg?: string
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
  bg,
}: Props) => {
  return (
    <div
      className={`w-[312px] h-full px-8 flex items-center py-3 space-x-4 bg-[${bg}]`}
    >
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{numberOfItems}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  )
}
