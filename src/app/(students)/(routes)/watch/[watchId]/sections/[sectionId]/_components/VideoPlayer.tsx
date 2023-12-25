'use client'

import axios from 'axios'
import MuxPlayer from '@mux/mux-player-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import { useToast } from '@/components/ui/use-toast'

interface VideoPlayerProps {
  playbackId: string
  courseId: string
  sectionId: string
  nextSectionId?: string
  isLocked: boolean
  completeOnEnd: boolean
  title: string
}

export default function VideoPlayer({
  playbackId,
  courseId,
  sectionId,
  nextSectionId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState<boolean>(false)
  const router = useRouter()
  const confetti = useConfettiStore()
  const{toast}=useToast()

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/sections/${sectionId}/progress`,
          {
            isCompleted: true,
          }
        )

        if (!nextSectionId) {
          confetti.onOpen()
        }

        toast({
          title:'Success',
          description:'Progress Updated'
        })
        router.refresh()

        if (nextSectionId) {
          router.push(`/watch/${courseId}/sections/${nextSectionId}`)
        }
      }
    } catch {
      toast({
        title: 'Success',
        description: 'Something went wrong, please try again',
        variant:'destructive'
      })
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && 'hidden')}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  )
}
