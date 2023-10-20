import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'

export default function BecomeInstructor() {
  return (
    <div className="w-full h-72 mt-8">
      <MaxWidthWrapper className="px-25 h-full py-8 flex items-start justify-between">
        <div className="w-[48%] h-full bg-[#FF6636]">
          <div className="w-[60%] flex flex-col items-start gap-3 p-2">
            <h4 className="text-2xl text-white font-semibold">
              Become an instructor
            </h4>
            <p className="text-sm text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias asperiores tempora ullam odio? Cupiditate ipsa earum
              doloremque eaque dolores accusamus sapiente autem optio eum illum!
            </p>
            <Button className="bg-white hover:bg-white text-[#FF6636] hover:text-[#FF6636] flex gap-2 items-center">
              Start teaching <MoveRight className="" />
            </Button>
          </div>
        </div>
        <div className="w-[48%] bg-white h-full flex flex-col items-start gap-4">
          <h4 className="text-2xl font-semibold p-4">
            Your teaching and earning steps
          </h4>
          <div className="w-full items-start grid grid-cols-2 gap-1 px-2">
            <div className="flex items-center gap-2 w-fit">
              <div className="w-[52px] aspect-square rounded-full bg-[#EBEBFF] text-[#564FFD] flex items-center justify-center">
                <span className="text-xl font-semibold">1</span>
              </div>
              <p className="text-sm">Apply to become instructor</p>
            </div>
            <div className="flex items-center gap-2 w-fit">
              <div className="w-[52px] aspect-square rounded-full bg-[#FFF0F0] text-[#E34444] flex items-center justify-center">
                <span className="text-xl font-semibold">2</span>
              </div>
              <p className="text-sm">Build & edit your profile</p>
            </div>
            <div className="flex items-center gap-2 w-fit">
              <div className="w-[52px] aspect-square rounded-full bg-[#FFF0F0] text-[#E34444] flex items-center justify-center">
                <span className="text-xl font-semibold">3</span>
              </div>
              <p className="text-sm">Create your new course</p>
            </div>
            <div className="flex items-center gap-2 w-fit">
              <div className="w-[52px] aspect-square rounded-full bg-[#E1F7E3] text-[#23BD33] flex items-center justify-center">
                <span className="text-xl font-semibold">4</span>
              </div>
              <p className="text-sm">Start teaching and earning</p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
