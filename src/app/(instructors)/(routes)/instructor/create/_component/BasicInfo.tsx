'use client'

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Combobox } from '@/components/ui/combobox'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BasicInfoProps {
  options: { label: string; value: string }[]
  levels: { label: string; value: string }[]
  languages: { label: string; value: string }[]
  durations: { label: string; value: string }[]
}

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title is required',
  }),
  subtitle: z.string().min(5, {
    message: 'Subtitle is required',
  }),
  categoryId: z.string().min(1, {
    message: 'Course category is required',
  }),
  topic: z.string().min(1, {
    message: 'Course topic is required',
  }),
  languageId: z.string().min(1, {
    message: 'Course language is required',
  }),
  courseLevelId: z.string().min(1, {
    message: 'Course level is required',
  }),
  courseDurationId: z.string().min(1, {
    message: 'course duration is required',
  }),
})

export default function BasicInfo({
  options,
  levels,
  languages,
  durations,
}: BasicInfoProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      categoryId: '',
      topic: '',
      languageId: '',
      courseLevelId: '',
      courseDurationId: '',
    },
  })

  const { isSubmitting, isValid } = form.formState
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/courses', values)
      toast({
        title: 'Success',
        description:
          "Your course was successfully created, you'll be redirected to thw 'Advanced Information page`",
        variant: 'default',
      })
      form.reset()
      router.push(`/instructor/courses/${response.data.id}`)
    } catch {
      toast({
        title: 'Error',
        description: 'Course creation was unsuccessful, please try again',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="w-full h-full p-2 flex flex-col items-start gap-0">
      <div className="w-full h-[9%] flex items-center justify-between">
        <h4 className="text-xl text-black font-semibold">Basic Information</h4>
      </div>

      <div className="h-[91%] w-full flex flex-col items-start gap-3">
        <ScrollArea className="w-full h-[99%] pt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full h-full flex flex-col items-center gap-4 mt-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full p-2">
                    <FormControl>
                      <div className="w-full h-fit flex flex-col items-start gap-1">
                        <FormLabel
                          className="text-sm text-black font-semibold tracking-wider"
                          htmlFor="title"
                        >
                          Title
                        </FormLabel>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'Advanced web development'"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem className="w-full p-2">
                    <FormControl>
                      <div className="w-full h-fit flex flex-col items-start gap-1">
                        <FormLabel
                          className="text-sm text-black font-semibold tracking-wider"
                          htmlFor="subtitle"
                        >
                          Subtitle
                        </FormLabel>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'Advanced web development'"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-start justify-between">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-[49%] p-2 h-12">
                      <FormControl>
                        <div className="w-full h-fit flex flex-col items-start gap-1">
                          <FormLabel
                            className="text-sm text-black font-semibold tracking-wider"
                            htmlFor="category"
                          >
                            Category
                          </FormLabel>
                          <Combobox options={...options} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem className="w-[49%] p-2">
                      <FormControl>
                        <div className="w-full h-fit flex flex-col items-start gap-1">
                          <FormLabel
                            className="text-sm text-black font-semibold tracking-wider"
                            htmlFor="topic"
                          >
                            Topic
                          </FormLabel>
                          <Input
                            disabled={isSubmitting}
                            placeholder="e.g. 'Advanced web development'"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*  */}
              <div className="w-full flex items-start justify-between">
                <FormField
                  control={form.control}
                  name="languageId"
                  render={({ field }) => (
                    <FormItem className="w-[32%] p-2 h-12">
                      <FormControl>
                        <div className="w-full h-fit flex flex-col items-start gap-1">
                          <FormLabel
                            className="text-sm text-black font-semibold tracking-wider"
                            htmlFor="language"
                          >
                            Language
                          </FormLabel>
                          <Combobox options={...languages} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseLevelId"
                  render={({ field }) => (
                    <FormItem className="w-[32%] p-2 h-12">
                      <FormControl>
                        <div className="w-full h-fit flex flex-col items-start gap-1">
                          <FormLabel
                            className="text-sm text-black font-semibold tracking-wider"
                            htmlFor="level"
                          >
                            Level
                          </FormLabel>
                          <Combobox options={...levels} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseDurationId"
                  render={({ field }) => (
                    <FormItem className="w-[32%] p-2 h-12">
                      <FormControl>
                        <div className="w-full h-fit flex flex-col items-start gap-1">
                          <FormLabel
                            className="text-sm text-black font-semibold tracking-wider"
                            htmlFor="duration"
                          >
                            Duration
                          </FormLabel>
                          <Combobox options={...durations} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full h-fit flex items-start justify-between mt-12">
                <Link href="/">
                  <Button variant={'destructive'} className="w-40">
                    Cancel
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  variant={'default'}
                  className="w-40"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </div>
    </div>
  )
}
