import { LogoutButton } from '@/components/auth/logout-button'
import { Button } from '@/components/ui/button'
import { Nav } from '@/components/ds'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.svg'

import { withAuth } from '@workos-inc/authkit-nextjs'

export const Header = async () => {
  // Get WorkOS user (optional authentication check)
  const { user } = await withAuth({ ensureSignedIn: false })

  return (
    <Nav
      className="border-b sticky top-0 bg-accent/30 backdrop-blur-md"
      containerClassName="flex justify-between items-center gap-4"
    >
      <Link href="/" className="flex gap-3 items-center">
        <Image src={Logo} width={14} alt="Payload SaaS Starter" className="invert dark:invert-0" />
        <h3 className="sm:text-lg">Payload Starter</h3>
      </Link>

      <div className="flex gap-2">
        {user ? (
          <>
            <LogoutButton />
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </Nav>
  )
}
