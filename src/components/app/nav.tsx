import { LogoutIconButton } from '@/components/auth/logout-button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { NavMenu } from '@/components/app/nav-menu'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { Nav } from '@/components/ds'

import Link from 'next/link'

export const AppNav = async () => {
  // User authentication is already handled by the admin layout

  return (
    <Nav
      className="border-b sticky top-0 bg-accent/30 backdrop-blur-md"
      containerClassName="flex justify-between items-center gap-4"
    >
      <Button variant="outline" size="icon" asChild>
        <Link href="/dashboard">
          <Home />
        </Link>
      </Button>

      <NavMenu />

      <div className="flex gap-2 items-center justify-end">
        <LogoutIconButton />
        <ThemeToggle />
      </div>
    </Nav>
  )
}
