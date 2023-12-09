'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Loader2, Trash } from 'lucide-react'
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
          `/api/courses/${courseId}/sections/${sectionId}/unpublish`
        )
        toast({
          title: 'Success',
          description: 'Your course section was unpublished',
          variant: 'default',
        })
      } else {
        await axios.patch(
          `/api/courses/${courseId}/sections/${sectionId}/publish`
        )
        toast({
          title: 'Success',
          description: 'Your course section was published successfully',
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

      await axios.delete(`/api/courses/${courseId}/sections/${sectionId}`)

      toast({
        title: 'Success',
        description: 'Your course section was deleted successfully',
        variant: 'default',
      })
      router.refresh()
      router.push(`/instructor/courses/${courseId}`)
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
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </ConfirmModal>
    </div>
  )
}
