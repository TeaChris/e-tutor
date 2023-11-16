'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z
    .string()
    .min(1)
    .refine((title) => title.trim() !== '', {
      message: 'Title is required',
    }),
})

export default function Create() {
  return <div></div>
}
