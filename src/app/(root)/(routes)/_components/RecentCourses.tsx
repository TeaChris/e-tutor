import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import FeaturedCourses from './FeaturedCourses'
import Image from 'next/image'
import Link from 'next/link'
import { recentCourse } from '@/data'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import HoverCard from './HoverCard'

export default function RecentCourses() {
  return (
    <div className="mt-32 bg-white lg:h-[70rem] w-full relative pt-[30rem]">
      <FeaturedCourses />

      <div className="w-full lg:h-[40rem]">
        <MaxWidthWrapper className="px-52 flex flex-col items-center gap-8">
          <h3 className="text-[40px] font-semibold ">Recently added course</h3>
          <div className="w-full h-fit flex flex-wrap gap-8 items-start mt-4">
            {recentCourse.map((courses) => (
              <Link
                key={courses.id}
                href={`/courses/course${courses.id}`}
                className="w-[244px] h-[333px] flex flex-col items-start gap-3 bg-neutral-100 rounded-[2px] group relative"
              >
                <Image
                  src={courses.image}
                  alt={courses.title}
                  width={200}
                  height={200}
                  className="w-[244px] h-[183px] object-cover"
                />
                <div className="w-full flex items-center justify-between px-2">
                  <div
                    className={`w-fit h-fit px-1.5 py-[0.065rem] font-bold ${
                      courses.category === 'Design'
                        ? 'bg-[#FFEEE8] text-[#993D20]'
                        : courses.category === 'Developments'
                        ? 'bg-[#EBEBFF] text-[#342F98]'
                        : courses.category === 'Business'
                        ? 'bg-[#E1F7E3] text-[#15711F]'
                        : courses.category === 'Marketing'
                        ? 'bg-[#EBEBFF] text-[#342F98]'
                        : 'bg-[#FFF0F0] text-[#882929]'
                    }`}
                  >
                    <span className="text-xs uppercase">
                      {courses.category}
                    </span>
                  </div>
                  <h5 className="text-[#FF6636] text-base font-bold">
                    ${courses.price}
                  </h5>
                </div>

                <div className="font-semibold text-sm w-[70%] pl-2">
                  <h5
                    className="capitalize"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {courses.title}
                  </h5>
                </div>

                <div className="border-t border-neutral-200 px-2 flex items-center justify-between w-full pt-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/star.svg"
                      alt="rating"
                      width={20}
                      height={20}
                      className=""
                    />
                    <div className="w-fit h-fit pt-1">
                      <h6 className="font-semibold text-[#4E5566] text-sm">
                        5.0
                      </h6>
                    </div>
                  </div>

                  <div className="w-fit flex items-center gap-1">
                    <h6 className="font-semibold text-[#4E5566] text-sm">
                      265.7k
                    </h6>
                    <span className="text-xs font-bold text-[#8C94A3]">
                      students
                    </span>
                  </div>
                </div>
                <HoverCard
                  category={courses.category}
                  title={courses.title}
                  price={courses.price}
                />
              </Link>
            ))}
          </div>
          <Link href="/course" className="mt-20">
            <Button
              variant={'default'}
              className="text-xs bg-[#FFEEE8] hover:bg-[#FFEEE8] text-[#FF6636] hover:text-[#FF6636] gap-2 flex items-center"
            >
              Browse All Course <MoveRight className="" />
            </Button>
          </Link>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}
