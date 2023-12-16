'use client'

import Editor from '@/components/Editor'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Loader2, Pencil, PlusCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface DescriptionFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(10, {
    message: 'Course description is required',
  }),
})

export default function DescriptionForm({
  initialData,
  courseId,
}: DescriptionFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      router.refresh()
      toast({
        title: 'Success',
        description: 'Your course description was successfully added`',
        variant: 'default',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Course image was unsuccessfully added, please try again',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 h-full">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              {!initialData.description && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add description
                </>
              )}
              {initialData.description && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit description
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {initialData.description ? (
                  <>Edit course description</>
                ) : (
                  <>Add course description</>
                )}
              </DialogTitle>
              <DialogDescription>
                Make changes to your course description here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                className="w-full h-fit"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2 mt-2">
                  <Button
                    className="w-full flex"
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <p
        className={cn(
          'text-sm mt-12 truncate line-clamp-2 font-semibold',
          !initialData.description && 'text-slate-500 italic'
        )}
      >
        {initialData.description || 'No description'}
      </p>
    </div>
  )
}
