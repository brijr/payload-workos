/**
 * Logout Form Component
 *
 * Server action based logout form using WorkOS signOut
 * Works without JavaScript enabled
 */

import { Button } from '@/components/ui/button'
import { signOut } from '@workos-inc/authkit-nextjs'

export function LogoutForm() {
  async function handleSignOut() {
    'use server'
    await signOut()
  }

  return (
    <form action={handleSignOut}>
      <Button variant="outline" type="submit">
        Logout
      </Button>
    </form>
  )
}
