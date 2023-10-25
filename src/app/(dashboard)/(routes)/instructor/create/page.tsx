import { redirect } from 'next/navigation'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { auth } from '@clerk/nextjs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BasicForm from './_component/BasicForm'
import { Button } from '@/components/ui/button'

export default function Create() {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white shadow-sm shadow-neutral-200 rounded-[4px] w-[90%] h-[90%] flex flex-col items-start">
        <div className="w-full h-10 flex items-start justify-between">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="flex items-start justify-between w-full">
              <TabsTrigger value="basic">Basic information</TabsTrigger>
              <TabsTrigger value="advanced">Advanced information</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="publish">Publish course</TabsTrigger>
            </TabsList>
            <TabsContent
              value="basic"
              className="w-full flex flex-col items-start"
            >
              <div className="w-full h-12 border-b border-neutral-300">
                <MaxWidthWrapper className="flex flex-col items-start h-full">
                  <div className="w-full h-14 flex items-center justify-between">
                    <h4 className="text-lg first-letter:capitalize text-black">
                      Basic information
                    </h4>

                    <div className="w-fit flex items-start gap-4">
                      <Button className="bg-[#FFEEE8] text-[#FF6636] hover:bg-[#ffeee8] hover:text-[#ff6636]">
                        save
                      </Button>
                      <Button
                        variant={'ghost'}
                        className="text-[#FF6636] hover:bg-[#ffeee8] hover:text-[#ff6636]"
                      >
                        save & preview
                      </Button>
                    </div>
                  </div>
                </MaxWidthWrapper>
              </div>
              <MaxWidthWrapper className="px">
                <BasicForm />
              </MaxWidthWrapper>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
