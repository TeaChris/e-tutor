'use client'

import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface CourseProgressButtonProps {
  sectionId: string
  courseId: string
  isCompleted?: boolean
  nextSectionId?: string
}

export default function CourseProgressButton({
  sectionId,
  courseId,
  isCompleted,
  nextSectionId,
}: CourseProgressButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.put(
        `/api/courses/${courseId}/sections/${sectionId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      )

      if (!isCompleted && !nextSectionId) {
        confetti.onOpen()
      }

      if (!isCompleted && nextSectionId) {
        router.push(`/watch/${courseId}/sections/${nextSectionId}`)
      }

      toast({
        title: 'Success',
        description: 'Progress updated',
        variant: 'default',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? 'outline' : 'success'}
      className="w-full md:w-auto"
    >
      {isCompleted ? 'Not completed' : 'Mark as complete'}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}
