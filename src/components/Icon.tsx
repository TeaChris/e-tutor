import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size: number
  className: string
}

const Icon = ({ icon, size, className }: IconProps) => {
  return <Icon icon={icon} size={size} className={className} />
}

export { Icon }
