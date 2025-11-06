import { Section, Container } from '@/components/ds'
import { LoginForm } from '@/components/auth/login-form'
import { AuthBox } from '@/components/auth/auth-box'
import { withAuth } from '@workos-inc/authkit-nextjs'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  // Check if user is already authenticated
  const { user } = await withAuth({ ensureSignedIn: false })

  // Redirect to dashboard if already logged in
  if (user) {
    redirect('/dashboard')
  }

  return (
    <Section>
      <Container>
        <AuthBox>
          <h1>Login</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Sign in to access your dashboard
          </p>
          <LoginForm />
        </AuthBox>
      </Container>
    </Section>
  )
}
