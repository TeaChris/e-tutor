import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { instructor } from '@/data'
import { Item } from '@radix-ui/react-select'
import Image from 'next/image'

export default function Instructor() {
  return (
    <div className="w-full h-[37rem]">
      <MaxWidthWrapper className="bg-white h-full flex flex-col items-center gap-8 border border-neutral-300 p-12">
        <h3 className="text-[40px] font-semibold ">
          Top instructor of the month
        </h3>
        <div className="w-full h-fit flex flex-wrap justify-between items-start gap-3">
          {instructor.map((item) => (
            <article
              key={item.name}
              className="w-48 h-fit flex flex-col items-center gap-2 border border-neutral-100"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={350}
                height={350}
                className="object-cover w-full"
              />

              <div className="w-full h-20 flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <h6 className="text-sm font-bold">{item.name}</h6>
                  <p className="text-xs text-[#8C94A3]">{item.position}</p>
                </div>
              </div>

              <div className="w-full h-fit p-2 flex items-center justify-between border-t border-neutral-300">
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/star.svg"
                    alt="rating"
                    width={15}
                    height={15}
                    className=""
                  />
                  <div className="w-fit h-fit pt-1">
                    <h6 className="font-semibold text-[#4E5566] text-sm">
                      {item.rating}.
                    </h6>
                  </div>
                </div>
                <div className="w-fit flex items-center gap-1 pt-1">
                  <h6 className="font-semibold text-[#4E5566] text-sm">
                    {item.studentNo}
                  </h6>
                  <span className="text-xs font-bold text-[#8C94A3]">
                    students
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
