import { Section, Container } from '@/components/ds'
import { LoginForm } from '@/components/auth/login-form'
import { AuthBox } from '@/components/auth/auth-box'
import { LoginPageToast } from '@/components/auth/login-page-toast'

import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

import Link from 'next/link'

import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const user: User | null = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  const params = await searchParams

  return (
    <Section>
      <Container>
        <AuthBox>
          <h1>Login</h1>
          {(params.success || params.error) && (
            <LoginPageToast success={params.success} error={params.error} />
          )}
          <LoginForm />
          <p className="text-muted-foreground text-xs">
            Don&apos;t have an account?{' '}
            <Link className="text-foreground" href="/register">
              Sign Up Now
            </Link>
          </p>
        </AuthBox>
      </Container>
    </Section>
  )
}
