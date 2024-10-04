import { cn } from '@/lib/utils'
import { Progress } from '@/components'

interface CourseProgressProps {
  value: number
  variant?: 'default' | 'success'
  size?: 'default' | 'sm'
}

const colorByVariant = {
  default: 'text-orange-700',
  success: 'text-emerald-700',
}

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs',
}

const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          'font-medium mt-2 text-orange-700',
          colorByVariant[variant || 'default'],
          sizeByVariant[size || 'default']
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  )
}

export { CourseProgress }
