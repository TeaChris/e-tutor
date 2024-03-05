import { Metadata } from 'next'

export function constructMetadata({
  title = ' E-Tutor- Your Ultimate Gateway yo Lifelong Learning',
  description = 'The ultimate online learning.platform that empowers you to unlock your full potential through interactive and engaging learning experiences.',
  image = '',
  icons = '/icons/logo.svg',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/graph.png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@d_cipherer',
    },
    icons,
    metadataBase: new URL('https://webetutor.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
