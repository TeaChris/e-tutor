import FileUpload from '@/components/FileUpload'
import axios from 'axios'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'

interface AdvancedInfoProps {
  courseId: string | null
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
})

export default function AdvancedInfo({ courseId }: AdvancedInfoProps) {
  const { toast } = useToast()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast({
        title: 'Success',
        description: 'Image upload was successful',
        variant: 'default',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Image upload was unsuccessful',
        variant: 'destructive',
      })
    }
  }
  return (
    <div className="w-full h-full p-2 flex flex-col items-start gap-0">
      <div className="w-full h-[9%] flex items-center justify-start border-b border-neutral-200">
        <h4 className="text-xl text-black font-semibold">
          Advanced Information
        </h4>
      </div>

      <div className="h-[91%] w-full flex flex-col items-start gap-0">
        <div className="w-full h-[240px] py-2 border-b border-neutral-200 flex items-start justify-between">
          <div className="flex flex-col items-start gap-2 w-[44%] h-fit">
            <h4 className="text-black text-base font-semibold">
              Course Thumbnail
            </h4>
            <div className="w-full h-fit">
              <FileUpload
                endpoint="courseImage"
                onChange={(url) => {
                  if (url) {
                    onSubmit({ imageUrl: url })
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
