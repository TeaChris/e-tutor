import { Button } from '@/components/ui/button'
import { Check, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface HoverCardProps {
  price: string
  title: string
  category: string
}

export default function HoverCard({ price, title, category }: HoverCardProps) {
  return (
    <div className="hidden group-hover:flex -top-14 -left-8 absolute z-50 w-[300px] h-[490px] bg-white shadow-sm shadow-neutral-300 rounded-[4px] flex-col items-start gap-0 p-2 transition-all ease-in delay-150">
      <div className="w-full h-fit flex flex-col items-start gap-2">
        <div
          className={`w-fit h-fit px-1.5 py-[0.065rem] font-bold ${
            category === 'Design'
              ? 'bg-[#FFEEE8] text-[#993D20]'
              : category === 'Developments'
              ? 'bg-[#EBEBFF] text-[#342F98]'
              : category === 'Business'
              ? 'bg-[#E1F7E3] text-[#15711F]'
              : category === 'Marketing'
              ? 'bg-[#EBEBFF] text-[#342F98]'
              : 'bg-[#FFF0F0] text-[#882929]'
          }`}
        >
          <span className="text-xs uppercase">{category}</span>
        </div>
        <div className="font-semibold text-sm">
          <h5
            className="capitalize"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h5>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="w-fit flex items-center gap-2">
            <Image src="/icons/tutor.svg" alt="" width={30} height={30} />
            <h5 className="font-semibold text-[#4E5566] text-sm">
              Kelvin Gilbert
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
              <h6 className="font-semibold text-[#4E5566] text-xs">5.0</h6>
              <h6 className="font-semibold text-[#8C94A3] text-xs">
                (357,914)
              </h6>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center pt-2">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/user-icon.svg"
              alt="user icon"
              width={20}
              height={20}
            />
            <div className="w-fit flex items-center gap-1">
              <h6 className="font-semibold text-[#4E5566] text-sm">265.7k</h6>
              <span className="text-xs font-bold text-[#8C94A3]">students</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/bar-chart.svg"
              alt="user icon"
              width={20}
              height={20}
            />
            <h6 className="font-semibold text-[#4E5566] text-sm">Beginner</h6>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/Clock.svg"
              alt="user icon"
              width={20}
              height={20}
            />
            <h6 className="font-semibold text-[#4E5566] text-sm">6 hours</h6>
          </div>
        </div>
        <div className="w-full h-fit items-center justify-between flex">
          <div className="flex items-center gap-2">
            <h5 className="text-base font-semibold">
              $57.00{' '}
              <span className="line-through text-xs text-[#8C94A3]">
                $26.00
              </span>
            </h5>
            <div className="w-fit h-fit py-1 px-2 bg-[#FFEEE8] text-[#FF6636]">
              <span className="text-sm font-medium">56% OFF</span>
            </div>
          </div>

          <div className="w-fit h-fit py-2 px-2 bg-[#FFEEE8] text-[#FF6636]">
            <Heart className="h-4 w-4 text-[#FF6636]" />
          </div>
        </div>
      </div>

      {/* what you will learn */}
      <div className="w-full flex flex-col items-start gap-2 border-t border-neutral-300 mt-2 p-2">
        <h5 className="uppercase font-semibold text-sm">
          what you&apos;ll learn
        </h5>
        <div className=" flex flex-col items-start gap-2">
          <div className="w-full flex gap-2 items-start h-fit">
            <Check className="w-8 h-8 text-[#23BD33]" />
            <p className="text-xs text-[#8C94A3]">
              Learn to use Python professionally, learning both Python 2 and
              Python 3!
            </p>
          </div>
          <div className="w-full flex gap-2 items-start h-fit">
            <Check className="w-8 h-8 text-[#23BD33]" />
            <p className="text-xs text-[#8C94A3]">
              Learn to use Python professionally, learning both Python 2 and
              Python 3!
            </p>
          </div>
          <div className="w-full flex gap-2 items-start h-fit">
            <Check className="w-8 h-8 text-[#23BD33]" />
            <p className="text-xs text-[#8C94A3]">
              Learn to use Python professionally, learning both Python 2 and
              Python 3!
            </p>
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="w-full flex flex-col items-start gap-2 mt-2 pt-2 border-t border-neutral-300">
        <Button className="flex gap-2 items-center w-full">
          <ShoppingCart className="h-6 w-6" /> Add To Cart
        </Button>
        <Link href="/course" className="w-full">
          <Button className="w-full bg-[#FFEEE8] hover:bg-[#FFEEE8] text-[#FF6636] hover:text-[#FF6636">
            Course Details
          </Button>
        </Link>
      </div>
    </div>
  )
}
