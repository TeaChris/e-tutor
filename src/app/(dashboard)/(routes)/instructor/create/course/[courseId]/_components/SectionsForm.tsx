import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course, Section } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast({
        title: 'Success',
        description: 'Course title edited successfully',
        variant: 'default',
      })
      toggleCreating()
      router.refresh()
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to edit title',
        variant: 'destructive',
      })
    }
  }
  return <div></div>
}
