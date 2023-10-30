'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
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

interface SectionTitleFormProps {
  initialData: {
    title: string
  }
  courseId: string
  sectionId: string
}

const formSchema = z.object({
  title: z
    .string()
    .min(4)
    .refine((title) => title.trim() !== '', {
      message: 'Title is required',
    }),
})

export default function SectionTitleForm({
  initialData,
  courseId,
  sectionId,
}: SectionTitleFormProps) {
  const [editing, setEditing] = useState<boolean>(false)

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/course/${courseId}/sections/${sectionId}`, values)
      toast({
        title: 'Success',
        description: 'Course title edited successfully',
        variant: 'default',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to edit title',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="mt-6 border bg-white rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Section title
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit title
              </>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Title</DialogTitle>
              <DialogDescription>
                Now, you can edit your title!
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
                          placeholder="e.g. 'Advanced web development'"
                          {...field}
                        />
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
      {!editing && <p className="text-sm mt-2">{initialData.title}</p>}
    </div>
  )
}
