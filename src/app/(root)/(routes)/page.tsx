import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { categories } from '@/data'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-full h-fit flex flex-col items-start gap-20">
      <header className="w-full items-start lg:items-center flex flex-col lg:flex-row justify-between h-[548px] pl-52">
        <div className="w-full lg:w-[45%] h-fit flex flex-col items-start gap-5">
          <h2 className="text-[60px] font-semibold leading-[4rem]">
            Learn with expert anytime anywhere
          </h2>
          <p className="text-start text-base text-[#4E5566] leading-7">
            Our mission is to help people to find the best course online and
            learn with expert anytime, anywhere.
          </p>

          <Button variant={'default'}>Create account</Button>
        </div>

        {/* right --- image */}

        <div className="w-full lg:w-[50%] lg:h-full">
          <Image
            src="/images/header-image.png"
            alt="header image"
            width={900}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* top category */}
      <section className="w-full h-fit lg:h-[490px] bg-neutral-100">
        <MaxWidthWrapper className="px-52 flex flex-col items-center gap-8">
          <h3 className="text-[40px] font-semibold ">Browse top category</h3>
          <div className="w-full h-fit flex flex-wrap justify-between items-start gap-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                style={{ backgroundColor: category.bgColor }}
                className={`w-[260px] h-[90px] p-2 flex items-center gap-3`}
              >
                <div
                  className="w-[64px] aspect-square flex items-center justify-center"
                  style={{ backgroundColor: category.imgColor }}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={30}
                    height={30}
                  />
                </div>

                <div className="flex flex-col items-start gap-1">
                  <h5 className="text-[16px] font-semibold">
                    {category.title}
                  </h5>
                  <p className="text-[#6E7485] text-[14px]">
                    {category.nc} courses
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <h6 className="text-xs text-[#4E5566]">
              We have more category & subcategory.
            </h6>
            <Button
              variant={'ghost'}
              className="text-orange-500 hover:text-orange-500 gap-1 text-xs"
            >
              Browse <MoveRight className="" />
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  )
}
