'use client'

import Editor from '@/components/Editor'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

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
    <div className="w-full h-fit flex flex-col items-start gap-2 border-b border-neutral-200 pb-4">
      <Label htmlFor="description" className="text-sm text-black font-semibold">
        Course description
      </Label>
      <Form {...form}>
        <form className="w-full h-fit" onSubmit={form.handleSubmit(onSubmit)}>
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
              // @ts-ignore
              disabled={!isValid || isSubmitting}
              type="submit"
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
    </div>
  )
}
