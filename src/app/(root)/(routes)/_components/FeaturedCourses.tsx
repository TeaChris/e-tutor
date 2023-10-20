import { featuredCourse } from '@/data'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedCourses() {
  return (
    <div className="-top-40 left-0 absolute w-full h-[550px] flex items-center justify-center pr-8">
      <div className="w-[1200px] h-full bg-white border border-neutral-300 p-8 flex flex-col items-start justify-between">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-[40px] font-semibold ">Our featured course</h3>
          <div className="w-[424px]">
            <p className="text-[#4E5566] text-sm">
              Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec
              varius purus et eleifend porta.
            </p>
          </div>
        </div>
        {/* bottom */}
        <div className="w-full h-fit flex flex-wrap gap-4 items-start">
          {featuredCourse.map((course) => (
            <Link
              key={course.id}
              href={`/course/course${course.id}`}
              className="w-[34.6rem] h-44 border border-neutral-200 hover:shadow-md hover:shadow-neutral-400 hover:border-0 transition-all ease-in-out flex items-center justify-between"
            >
              <div className="w-[40%] h-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[57%] h-full flex flex-col items-start gap-4 pr-2 py-2">
                <div className="w-full flex items-center justify-between">
                  <div
                    className={`w-fit h-fit px-1.5 py-[0.065rem] font-bold ${
                      course.category === 'Development'
                        ? 'bg-[#FFEEE8] text-[#993D20]'
                        : course.category === 'Health & Fitness'
                        ? 'bg-[#EBEBFF] text-[#342F98]'
                        : course.category === 'Productivity'
                        ? 'bg-[#E1F7E3] text-[#15711F]'
                        : course.category === 'Music'
                        ? 'bg-[#EBEBFF] text-[#342F98]'
                        : 'bg-[#FFF0F0] text-[#882929]'
                    }`}
                  >
                    <span className="text-xs uppercase">{course.category}</span>
                  </div>
                  <div className="w-fit flex items-center gap-1">
                    <h5 className="font-semibold text-[#4E5566] text-sm">
                      ${course.price}
                    </h5>
                    <span className="text-xs font-bold text-[#8C94A3] line-through">
                      $26.00
                    </span>
                  </div>
                </div>

                <div className="w-[95%]">
                  <h5
                    className={`capitalize truncate font-semibold text-sm ${
                      course.category === 'Productivity' ? 'text-[#FF6636]' : ''
                    }`}
                  >
                    {course.title}
                  </h5>
                </div>

                <div className="w-full flex items-center justify-between">
                  <div className="w-fit flex items-center gap-2">
                    <Image
                      src="/icons/tutor.svg"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <h5 className="font-semibold text-[#4E5566] text-sm">
                      {course.tutor}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/star.svg"
                      alt="rating"
                      width={15}
                      height={15}
                      className=""
                    />
                    <div className="w-fit h-fit pt-1 flex items-center gap-1">
                      <h6 className="font-semibold text-[#4E5566] text-xs">
                        5.0
                      </h6>
                      <h6 className="font-semibold text-[#8C94A3] text-xs">
                        (357,914)
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center pt-3 border-t border-neutral-300">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/user-icon.svg"
                      alt="user icon"
                      width={20}
                      height={20}
                    />
                    <div className="w-fit flex items-center gap-1">
                      <h6 className="font-semibold text-[#4E5566] text-sm">
                        265.7k
                      </h6>
                      <span className="text-xs font-bold text-[#8C94A3]">
                        students
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/bar-chart.svg"
                      alt="user icon"
                      width={20}
                      height={20}
                    />
                    <h6 className="font-semibold text-[#4E5566] text-sm">
                      Beginner
                    </h6>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/icons/Clock.svg"
                      alt="user icon"
                      width={20}
                      height={20}
                    />
                    <h6 className="font-semibold text-[#4E5566] text-sm">
                      {course.time} hours
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
