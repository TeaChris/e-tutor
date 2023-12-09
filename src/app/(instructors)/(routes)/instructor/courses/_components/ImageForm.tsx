'use client'

import FileUpload from '@/components/FileUpload'
import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
import axios from 'axios'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toggleEdit()
      router.refresh()
      toast({
        title: 'Success',
        description: 'Your course image was successfully uploaded`',
        variant: 'default',
      })
    } catch {
      toast({
        title: 'Error',
        description:
          'Course image was unsuccessfully uploaded, please try again',
        variant: 'destructive',
      })
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-start gap-2">
      <div className="w-full h-fit flex items-center justify-between">
        <h3 className="text-sm text-black font-semibold">Course thumbnail</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              {!initialData.imageUrl && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add an image
                </>
              )}
              {initialData.imageUrl && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit image
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {initialData.imageUrl ? (
                  <>Edit course image</>
                ) : (
                  <>Add course image</>
                )}
              </DialogTitle>
              <DialogDescription>
                Make changes to your course image here.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-full">
              {!isEditing &&
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
              {isEditing && (
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
            <DialogFooter>
              <Button onClick={toggleEdit} className="w-full">
                Edit image
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-1/2 h-full">
        {initialData.imageUrl ? (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        )}
      </div>
    </div>
  )
}
