'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

export default function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url)
      router.push('/browse')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>Enroll for {formatPrice(price)}</>
      )}
    </Button>
  )
}
