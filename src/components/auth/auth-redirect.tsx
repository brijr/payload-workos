'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { User } from '@/payload-types'

interface AuthRedirectProps {
  user: User | null
  redirectTo?: string
  message?: string
}

export function AuthRedirect({ 
  user, 
  redirectTo = '/dashboard', 
  message = 'You are already signed in. Redirecting to dashboard...' 
}: AuthRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      toast.info('Already Signed In', {
        description: message,
      })
      router.push(redirectTo)
    }
  }, [user, redirectTo, message, router])

  return null
}