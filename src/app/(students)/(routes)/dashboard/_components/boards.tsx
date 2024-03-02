'use client'

import { FC, useEffect, useState, Suspense } from 'react'

import { useRouter } from 'next/navigation'

import { SubNav } from '@/components/sub-nav'

type PageMapType = Record<string, React.ComponentType>

interface BoardsProps {
  links: string[]
  PageMap: PageMapType
}

const Boards: FC<BoardsProps> = ({ links, PageMap }) => {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState<string>('dashboard') // Set the default active link

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const activeLinkParam = urlParams.get('activeLink')
    if (
      activeLinkParam !== null &&
      Object.keys(PageMap).includes(activeLinkParam)
    ) {
      setActiveLink(activeLinkParam)
    }
  }, [PageMap])

  const onClick = (link: string) => {
    setActiveLink(link)

    // Update the URL with the active link
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('activeLink', link)
    router.push(`${window.location.pathname}?${urlParams}`)
  }

  const ActivePage = PageMap[activeLink]
  return (
    <section className="w-full space-y-12">
      <SubNav links={links} activeLink={activeLink} onClick={onClick} />
      <Suspense fallback="loading...">
        <ActivePage />
      </Suspense>
    </section>
  )
}

export default Boards
