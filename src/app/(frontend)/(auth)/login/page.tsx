import { withAuth, getSignInUrl } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  // Check if user is already authenticated
  const { user } = await withAuth({ ensureSignedIn: false })

  // Redirect to dashboard if already logged in
  if (user) {
    redirect('/dashboard')
  }

  // Get WorkOS sign-in URL and redirect
  const signInUrl = await getSignInUrl()
  redirect(signInUrl)
}
