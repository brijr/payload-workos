import { Section, Container } from '@/components/ds'
import { RegisterForm } from '@/components/auth/register-form'
import { AuthBox } from '@/components/auth/auth-box'

import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

import Link from 'next/link'

import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  const user: User | null = await getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <Section>
      <Container>
        <AuthBox>
          <h1>Sign Up</h1>
          <RegisterForm />
          <p className="text-muted-foreground text-xs">
            Already have an account?{' '}
            <Link className="text-foreground" href="/login">
              Login Now
            </Link>
          </p>
        </AuthBox>
      </Container>
    </Section>
  )
}
