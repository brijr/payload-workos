import { Section, Container } from '@/components/ds'

import { withAuth } from '@workos-inc/authkit-nextjs'
import { getPayloadUserByWorkOSId } from '@/lib/workos-sync'

import type { User } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  // Get WorkOS user (ensureSignedIn handled by layout)
  const { user: workosUser } = await withAuth({ ensureSignedIn: true })

  // Get Payload user data for additional info (role, createdAt, etc.)
  const payloadUser = await getPayloadUserByWorkOSId(workosUser.id)

  return <ToDelete workosUser={workosUser} payloadUser={payloadUser} />
}

const ToDelete = ({
  workosUser,
  payloadUser,
}: {
  workosUser: any
  payloadUser: User | null
}) => {
  const createdAt = payloadUser?.createdAt ? new Date(payloadUser.createdAt) : new Date()
  const now = new Date()
  const accountAgeDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Section>
      <Container className="font-mono space-y-2">
        <h1 className="mb-4">Payload Starter Dashboard</h1>
        <p>
          &gt; You&apos;re email is <span className="text-primary">{workosUser.email}</span>
        </p>
        <p>
          &gt; Email verified: <span className="text-primary">{workosUser.emailVerified ? 'Yes' : 'No'}</span>
        </p>
        <p>
          &gt; Your created your account at{' '}
          <span className="text-primary">{createdAt.toLocaleString()}</span>
        </p>
        <p>
          &gt; Your account is <span className="text-primary">{accountAgeDays}</span> days old
        </p>
        <p>
          &gt; You have the role of <span className="text-primary">{payloadUser?.role || 'user'}</span>
        </p>
        <p>
          &gt; Auth provider: <span className="text-primary">WorkOS</span>
        </p>
      </Container>
    </Section>
  )
}
