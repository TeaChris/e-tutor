'use client'

import { useToast } from '@/components/ui/use-toast'
import { Attachment, Course } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as z from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { File, Loader2, Pencil, PlusCircle, X } from 'lucide-react'
import FileUpload from '@/components/FileUpload'

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

export default function AttachmentForm({
  initialData,
  courseId,
}: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => setIsEditing((current) => !current)

  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast({
        title: 'Success',
        description: 'Course attachment uploaded successfully',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast({
        title: 'Success',
        description: 'Course attachment deleted successfully',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              {!initialData.attachments && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add an attachment
                </>
              )}
              {initialData.attachments && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit attachment
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {initialData.attachments ? (
                  <>Edit course image</>
                ) : (
                  <>Add course image</>
                )}
              </DialogTitle>
              <DialogDescription>
                Make changes to your course attachments here.
              </DialogDescription>
            </DialogHeader>
            {isEditing && (
              <div>
                <FileUpload
                  endpoint="courseAttachment"
                  onChange={(url) => {
                    if (url) {
                      onSubmit({ url: url })
                    }
                  }}
                />
                <div className="text-xs text-muted-foreground mt-4">
                  Add anything your students might need to complete the course.
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={toggleEdit} size="lg" className="w-full">
                Add attachment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <>
        {initialData.attachments.length === 0 && (
          <p className="text-sm mt-2 text-slate-500 italic">
            No attachments yet
          </p>
        )}
        {initialData.attachments.length > 0 && (
          <div className="space-y-2">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center p-3 w-full bg-orange-100 border-orange-200 border text-orange-700 rounded-md"
              >
                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="text-xs line-clamp-1">{attachment.name}</p>
                {deletingId === attachment.id && (
                  <div>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {deletingId !== attachment.id && (
                  <button
                    onClick={() => onDelete(attachment.id)}
                    className="ml-auto hover:opacity-75 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  )
}
