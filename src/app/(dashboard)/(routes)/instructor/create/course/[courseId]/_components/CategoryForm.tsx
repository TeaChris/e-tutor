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

interface CategoryFormProps {
  initialData: Course
  courseId: string
  options: { label: string; value: string }[]
}

const formSchema = z.object({
  categoryId: z
    .string()
    .min(1)
    .refine((title) => title.trim() !== '', {
      message: 'Category is required',
    }),
})

export default function CategoryForm({
  initialData,
  courseId,
  options,
}: CategoryFormProps) {
  const [editing, setEditing] = useState<boolean>(false)

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast({
        title: 'Success',
        description: 'Course language edited successfully',
        variant: 'default',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to edit course language',
        variant: 'destructive',
      })
    }
  }

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  )

  return (
    <div className="mt-6 border bg-[#FFEEE8] rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <>
                <Pencil className="h-4 w-4 mr-2" />
                {(initialData.categoryId && 'Edit category') ||
                  'Create category'}
              </>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {(initialData.categoryId && 'Edit category') ||
                  'Create category'}
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
                  name="categoryId"
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
            !initialData.categoryId && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'No category'}
        </p>
      )}
    </div>
  )
}
