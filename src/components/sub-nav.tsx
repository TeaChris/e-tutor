import { cn } from '@/lib/utils'

interface Props {
  links: string[]
  activeLink?: string
  onClick: (link: string) => void
}

export function SubNav(props: Props) {
  const { links, activeLink, onClick } = props
  return (
    <div className="flex items-center gap-x-6 w-full">
      {links.map((link) => (
        <button
          key={link}
          className={cn(
            'text-base font-medium px-4 py-2 text-neutral-500 capitalize',
            {
              'text-black border-b-2 border-orange-600 transition duration-100':
                link === activeLink,
            }
          )}
          onClick={() => onClick(link)}
        >
          {link}
        </button>
      ))}
    </div>
  )
}
