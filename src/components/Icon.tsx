import { LucideIcon } from 'lucide-react'

interface IconProps {
  icon: LucideIcon
  size: number
  className: string
}

export default function Icon({ icon, size, className }: IconProps) {
  return <Icon icon={icon} size={size} className={className} />
}
