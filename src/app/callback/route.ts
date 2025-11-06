/**
 * WorkOS AuthKit Callback Handler
 *
 * Handles the OAuth callback from WorkOS after authentication
 * Syncs the WorkOS user to Payload and redirects to dashboard
 */

import { handleAuth } from '@workos-inc/authkit-nextjs'
import { syncWorkOSUserToPayload } from '@/lib/workos-sync'

export const GET = handleAuth({
  // Redirect to dashboard after successful authentication
  returnPathname: '/dashboard',

  // Custom post-authentication logic
  async onSuccess({ user }) {
    try {
      // Sync WorkOS user to Payload
      await syncWorkOSUserToPayload({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        profilePictureUrl: user.profilePictureUrl,
      })

      console.log('User authenticated and synced:', user.email)
    } catch (error) {
      console.error('Error syncing user to Payload:', error)
      // Continue with authentication even if sync fails
      // The sync will be retried on next login
    }
  },

  // Custom error handler
  async onError(error) {
    console.error('Authentication error:', error)
    // Error handling - WorkOS will redirect to error page
  },
})
