import { withAuth, getSignUpUrl } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  // Check if user is already authenticated
  const { user } = await withAuth({ ensureSignedIn: false })

  // Redirect to dashboard if already logged in
  if (user) {
    redirect('/dashboard')
  }

  // Get WorkOS sign-up URL and redirect
  const signUpUrl = await getSignUpUrl()
  redirect(signUpUrl)
}
