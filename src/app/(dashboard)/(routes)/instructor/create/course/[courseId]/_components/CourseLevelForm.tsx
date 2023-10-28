'use client'

import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Combobox } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

interface CourseLevelFormProps {
  initialData: Course
  courseId: string
  options: { label: string; value: string }[]
}

const formSchema = z.object({
  courseLevelId: z
    .string()
    .min(1)
    .refine((title) => title.trim() !== '', {
      message: 'Level is required',
    }),
})

export default function CourseLevelForm({
  initialData,
  courseId,
  options,
}: CourseLevelFormProps) {
  const [editing, setEditing] = useState<boolean>(false)

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseLevelId: initialData?.categoryId || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast({
        title: 'Success',
        description: 'Course level edited successfully',
        variant: 'default',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to edit course level',
        variant: 'destructive',
      })
    }
  }

  const selectedOption = options.find(
    (option) => option.value === initialData.courseLevelId
  )

  return (
    <div className="mt-6 border bg-[#FFEEE8] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course level
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <>
                <Pencil className="h-4 w-4 mr-2" />
                {(initialData.courseLevelId && 'Edit level') || 'Choose level'}
              </>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {(initialData.courseLevelId && 'Edit level') || 'Choose level'}
              </DialogTitle>
              <DialogDescription>
                choose a category that best fit your course
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="courseLevelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox options={...options} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {!editing && (
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.courseLevelId && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'No level'}
        </p>
      )}
    </div>
  )
}
