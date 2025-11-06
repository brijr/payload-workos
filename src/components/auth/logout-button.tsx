/**
 * Logout Button Components
 *
 * Client-side logout buttons that use WorkOS signOut functionality
 */

'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      // Call the WorkOS sign-out endpoint
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Logged out successfully', {
          description: 'You have been signed out of your account.',
        })
        router.push('/')
        router.refresh()
      } else {
        toast.error('Logout failed', {
          description: 'Please try again.',
        })
      }
    } catch (_error) {
      toast.error('Logout failed', {
        description: 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Signing out...' : 'Logout'}
    </Button>
  )
}

export const LogoutIconButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      }
    } catch (_error) {
      // Silent fail for icon button
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleLogout} disabled={isLoading}>
      <LogOut />
    </Button>
  )
}
