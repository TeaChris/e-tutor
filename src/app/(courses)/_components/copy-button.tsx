'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Copy } from 'lucide-react'

export function CopyButton() {
  const { toast } = useToast()
  const handleCopyLinkClick = () => {
    const url = window.location.href
    toast({
      title: 'Success',
      description: 'Link copied',
      variant: 'default',
    })
    navigator.clipboard
      .writeText(url)
      .then(() => {})
      .catch((error) => {
        toast({
          title: 'Error',
          description: 'Failed to copy link',
          variant: 'destructive',
        })
      })
  }
  return (
    <Button className="w-full flex gap-x-3" onClick={handleCopyLinkClick}>
      <Copy className="w-4 h-4" />
      Copy link
    </Button>
  )
}
