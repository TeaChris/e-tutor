import { ConfettiProvider } from '@/providers/ConfettiProvider'
import { constructMetadata } from '@/lib/matadata'

import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

import '@/styles/globals.css'
import localFont from 'next/font/local'

const nun = localFont({
  src: '../../public/fonts/nunito.ttf',
  weight: '400',
  variable: '--font-comfort',
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`antialiased light`}>
        <body
          className={`w-screen bg-neutral-200 overflow-x-hidden ${nun.className}`}
        >
          <div className="w-full h-full">
            <ConfettiProvider />
            {children}
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
