'use client'

import { usePathname } from 'next/navigation'

import Link from 'next/link'

const NAV_MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Logs',
    href: '#',
  },
  {
    label: 'Settings',
    href: '#',
  },
]

export const NavMenu = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-center gap-4">
      {NAV_MENU_ITEMS.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`transition-all text-sm flex items-center gap-1 ${
              isActive
                ? 'text-foreground cursor-default'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {isActive ? <div className="flex rounded-full w-1.5 h-1.5 bg-primary" /> : ''}
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
