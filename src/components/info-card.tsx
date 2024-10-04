import { IconBadge } from '@/components'
import { LucideIcon } from 'lucide-react'

interface Props {
  numberOfItems: number
  variant?: 'default' | 'success'
  label: string
  icon: LucideIcon
  bg?: string
}

const InfoCard = ({ variant, icon: Icon, numberOfItems, label, bg }: Props) => {
  return (
    <div
      className={`w-full lg:w-[312px] h-[100px] lg:h-full px-8 flex items-center py-3 space-x-4 bg-[${bg}]`}
    >
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{numberOfItems}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  )
}

export { InfoCard }
