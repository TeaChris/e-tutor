'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course, Section } from '@prisma/client'
import axios from 'axios'
import { Loader2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ChaptersList from './SectionsList'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ChaptersFormProps {
  initialData: Course & { sections: Section[] }
  courseId: string
}

const formSchema = z.object({
  title: z
    .string()
    .min(4)
    .refine((title) => title.trim() !== '', {
      message: 'Title is required',
    }),
})

export default function SectionsForm({
  initialData,
  courseId,
}: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/sections`, values)
      toast({
        title: 'Success',
        description: 'Course section edited successfully',
        variant: 'default',
      })
      toggleCreating()
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to edit section title',
        variant: 'destructive',
      })
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)

      await axios.put(`/api/courses/${courseId}/sections/reorder`, {
        list: updateData,
      })
      toast({
        title: 'Success',
        description: 'Your course sections reordered successfully',
        variant: 'default',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Your course section reorder failed',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const onEdit = (id: string) => {
    router.push(`/instructor/courses/${courseId}/sections/${id}`)
  }

  return (
    <div className="relative mt-6 border bg-white rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                {(initialData.sections && 'Add more section') ||
                  'Create your first section'}
              </>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {(initialData.sections && 'Add more section') ||
                  'Create your first section'}
              </DialogTitle>
              <DialogDescription>
                Divide your course into section
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'Introduction to the course'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Create
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* {!isCreating && ( */}
      <div
        className={cn(
          'text-sm mt-2',
          !initialData.sections.length && 'text-slate-500 italic'
        )}
      >
        {!initialData.sections.length && 'No section'}
        <ChaptersList
          onEdit={onEdit}
          onReorder={onReorder}
          items={initialData.sections || []}
        />
      </div>
      {/* )} */}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  )
}
