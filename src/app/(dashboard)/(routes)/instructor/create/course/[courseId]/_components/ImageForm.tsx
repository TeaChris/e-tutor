'use client'

import * as z from 'zod'
import axios from 'axios'
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import FileUpload from '@/components/FileUpload'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [editing, setEditing] = useState<boolean>(false)

  const toggleEdit = () => setEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 border bg-[#FFEEE8] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <>
                <Pencil className="h-4 w-4 mr-2" />
                {(initialData.imageUrl && 'Change image') || 'Upload image'}
              </>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {(initialData.imageUrl && 'Change image') || 'Upload image'}
              </DialogTitle>
              <DialogDescription>
                choose an image that best fit your course
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 border bg-slate-100 rounded-md p-4">
              <div className="font-medium flex items-center justify-between">
                Course image
                <Button onClick={toggleEdit} variant="ghost">
                  {editing && <>Cancel</>}
                  {!editing && !initialData.imageUrl && (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add an image
                    </>
                  )}
                  {!editing && initialData.imageUrl && (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit image
                    </>
                  )}
                </Button>
              </div>
              {!editing &&
                (!initialData.imageUrl ? (
                  <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon className="h-10 w-10 text-slate-500" />
                  </div>
                ) : (
                  <div className="relative aspect-video mt-2">
                    <Image
                      alt="Upload"
                      fill
                      className="object-cover rounded-md"
                      src={initialData.imageUrl}
                    />
                  </div>
                ))}
              {editing && (
                <div>
                  <FileUpload
                    endpoint="courseImage"
                    onChange={(url) => {
                      if (url) {
                        onSubmit({ imageUrl: url })
                      }
                    }}
                  />
                  <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio recommended
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative aspect-video mt-2">
        <Image
          alt="Upload"
          fill
          className="object-cover rounded-md"
          // @ts-ignore
          src={initialData.imageUrl}
        />
      </div>
    </div>
  )
}
