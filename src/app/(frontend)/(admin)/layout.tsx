/**
 * Admin Layout
 *
 * Protected layout that requires WorkOS authentication
 * Syncs WorkOS users to Payload on each visit
 */

import { AppNav } from '@/components/app/nav'
import { withAuth } from '@workos-inc/authkit-nextjs'
import { syncWorkOSUserToPayload } from '@/lib/workos-sync'

export const dynamic = 'force-dynamic'

type AuthLayoutProps = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  // Ensure user is signed in with WorkOS
  const { user: workosUser } = await withAuth({ ensureSignedIn: true })

  // Sync WorkOS user to Payload
  try {
    await syncWorkOSUserToPayload({
      id: workosUser.id,
      email: workosUser.email,
      firstName: workosUser.firstName,
      lastName: workosUser.lastName,
      emailVerified: workosUser.emailVerified,
      profilePictureUrl: workosUser.profilePictureUrl,
    })
  } catch (error) {
    console.error('Error syncing user to Payload:', error)
    // Continue rendering even if sync fails
  }

  return (
    <main className="flex flex-col min-h-screen">
      <AppNav />
      <section className="flex-1">{children}</section>
    </main>
  )
}
