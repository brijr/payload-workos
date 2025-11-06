/**
 * Register Form Component
 *
 * Redirects users to WorkOS hosted authentication UI for registration
 * WorkOS handles email/password registration, validation, and OAuth providers
 */

import { getSignUpUrl } from '@workos-inc/authkit-nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function RegisterForm() {
  // Get the WorkOS sign-up URL
  const signUpUrl = await getSignUpUrl()

  return (
    <div className="my-6 space-y-4">
      <Link href={signUpUrl} className="block">
        <Button type="button" className="w-full" size="lg">
          Create Account with WorkOS
        </Button>
      </Link>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="underline hover:text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  )
}
