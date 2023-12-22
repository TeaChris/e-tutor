import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { bestCourses } from '@/data'
import Image from 'next/image'
import Link from 'next/link'

export default function BestCourses() {
  return (
    <section className="w-full h-fit py-2 bg-transparent">
      <MaxWidthWrapper className="lg:px-52 flex flex-col items-center gap-8">
        <h3 className="text-4xl lg:text-3xl font-semibold ">
          Best selling course
        </h3>
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start px-12 md:px-0">
          {bestCourses.map((courses) => (
            <Link
              key={courses.id}
              href={`/courses/courses`}
              className="w-full h-fit pb-2 lg:pb-0 lg:w-[244px] lg:h-[333px] flex flex-col items-start gap-3 bg-neutral-100 rounded-[2px]"
            >
              <Image
                src={courses.image}
                alt={courses.title}
                width={700}
                height={700}
                className="w-full h-96 lg:w-[244px] lg:h-[183px] object-cover"
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
                  <span className="text-xs uppercase">{courses.category}</span>
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
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
