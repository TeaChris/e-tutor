'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { DialogTrigger } from '@radix-ui/react-dialog'
import axios from 'axios'
import { AlignJustify, Loader2, PencilLine, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SectionList from './SectionList'

interface CourseCurriculum {
  initialData: Course & { sections: Section[] }
  courseId: string
}
const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Section title is required',
  }),
})

export default function CourseCurriculum({
  initialData,
  courseId,
}: CourseCurriculum) {
  const [creating, setCreating] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)

  const toggleCreating = () => {
    setCreating((current) => !current)
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
        description: 'Your course section was successfully created`',
        variant: 'default',
      })
      toggleCreating()
      router.refresh()
    } catch {
      toast({
        title: 'error',
        description: 'Your course section was unsuccessfully created`',
        variant: 'destructive',
      })
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setUpdating(true)

      await axios.put(`/api/courses/${courseId}/sections/reorder`, {
        list: updateData,
      })
      toast({
        title: 'Success',
        description: 'Section reordered successfully',
        variant: 'default',
      })
      router.refresh()
    } catch {
      toast({
        title: 'Success',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    } finally {
      setUpdating(false)
    }
  }

  const onEdit = (id: string) => {
    router.push(`/instructor/courses/${courseId}/sections/${id}`)
  }

  return (
    <div className="w-full h-fit min-h-max flex flex-col items-start gap-2 pb-4 relative">
      <h3 className="text-sm text-black font-semibold">Course description</h3>
      {updating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-orange-600" />
        </div>
      )}
      <div className="w-full h-fit flex flex-col items-start gap-2 bg-slate-100 rounded-sm p-2">
        <div className="w-full h-8 flex items-center justify-between">
          <div className="h-full w-fit flex items-center gap-2">
            <AlignJustify className="w-4 h-4 text-black" />
            <h3 className="text-sm text-black font-bold">Section 1:</h3>
            <div className="w-fit h-full text-sm text-black font-semibold flex items-center justify-center">
              Section name
            </div>
          </div>

          <div className="w-fit h-full flex items-center gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Plus className="w-4 h-4 font-bold text-black" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add your Section title</DialogTitle>
                </DialogHeader>
                <div className="w-full h-full">
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
                      <Button
                        className="w-full"
                        disabled={!isValid || isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <>Create</>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant={'ghost'}>
              <PencilLine className="w-4 h-4 font-bold text-black" />
            </Button>
            <Button variant={'ghost'}>
              <Trash2 className="w-4 h-4 font-bold text-black" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        {!creating && (
          <div
            className={cn(
              'text-sm mt-2',
              !initialData.sections.length && 'text-neutral-500 italic w-full'
            )}
          >
            {!initialData.sections.length && 'No Sections'}
            <SectionList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.sections || []}
            />
          </div>
        )}
      </div>

      {!creating && (
        <div className="w-full px-2">
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the sections
          </p>
        </div>
      )}
    </div>
  )
}
