'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

interface SectionActionsProps {
  disabled: boolean
  courseId: string
  sectionId: string
  isPublished: boolean
}

export default function SectionActions({
  disabled,
  courseId,
  sectionId,
  isPublished,
}: SectionActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { toast } = useToast()

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${sectionId}/unpublish`
        )
        toast({
          title: 'Success',
          description: 'Your course section was updated successfully',
          variant: 'default',
        })
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${sectionId}/publish`
        )
        toast({
          title: 'Success',
          description: 'Your course section was updated successfully',
          variant: 'default',
        })
      }

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

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}/chapters/${sectionId}`)

      toast({
        title: 'Success',
        description: 'Your course section was updated successfully',
        variant: 'default',
      })
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
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
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'Unpublished' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
