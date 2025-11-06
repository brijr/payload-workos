/**
 * Login Form Component
 *
 * Redirects users to WorkOS hosted authentication UI for login
 * WorkOS handles email/password authentication and OAuth providers
 */

import { getSignInUrl } from '@workos-inc/authkit-nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function LoginForm() {
  // Get the WorkOS sign-in URL
  const signInUrl = await getSignInUrl()

  return (
    <div className="my-6 space-y-4">
      <Link href={signInUrl} className="block">
        <Button type="button" className="w-full" size="lg">
          Sign In with WorkOS
        </Button>
      </Link>

      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/register" className="underline hover:text-foreground">
          Sign up
        </Link>
      </p>
    </div>
  )
}
