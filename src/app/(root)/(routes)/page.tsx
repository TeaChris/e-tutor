import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BestCourses from './_components/BestCourses'

import { db } from '@/lib/db'
import { Categories } from './_components/categories'

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <main className="w-full h-fit flex flex-col items-start gap-20 px-2">
      <header className="w-full items-start lg:items-center flex justify-between h-fit py-2 lg:py-0 lg:h-[548px] lg:border-t border-neutral-300">
        <div className="w-full lg:w-[45%] h-fit flex flex-col items-center lg:items-start gap-5">
          <h2 className="text-[50px] text-center lg:text-start lg:text-[60px] font-semibold lg:leading-[4rem] leading-snug">
            Learn with expert anytime anywhere
          </h2>
          <p className="text-center lg:text-start text-base text-[#4E5566] leading-7">
            Our mission is to help people to find the best course online and
            learn with expert anytime, anywhere.
          </p>
          <Link href={`/sign-up`}>
            <Button variant={'default'}>Create account</Button>
          </Link>
        </div>

        {/* right --- image */}

        <div className="hidden lg:block w-full lg:w-[50%] lg:h-full">
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
        <MaxWidthWrapper className="lg:px-52 flex flex-col items-center gap-8 mt-4">
          <h3 className="text-4xl lg:text-3xl font-semibold ">
            Browse top category
          </h3>
          <div className="w-full">
            <Categories items={categories} />
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
      <BestCourses />
      {/* <RecentCourses />
      <BecomeInstructor />
      <Instructor /> */}
    </main>
  )
}
