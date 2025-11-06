'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

interface LoginPageToastProps {
  success?: string
  error?: string
}

export function LoginPageToast({ success, error }: LoginPageToastProps) {
  useEffect(() => {
    if (success) {
      switch (success) {
        case 'email-verified':
          toast.success('Email Verified!', {
            description: 'Your email has been verified successfully. You can now sign in.',
          })
          break
        default:
          toast.success('Success!', {
            description: 'Operation completed successfully.',
          })
      }
    }

    if (error) {
      switch (error) {
        case 'invalid-verification-link':
          toast.error('Invalid Verification Link', {
            description: 'The verification link is invalid. Please try again.',
          })
          break
        case 'verification-link-expired':
          toast.error('Verification Link Expired', {
            description: 'The verification link has expired. Please request a new one.',
          })
          break
        case 'verification-failed':
          toast.error('Verification Failed', {
            description: 'Email verification failed. Please try again.',
          })
          break
        default:
          toast.error('Error', {
            description: 'An error occurred. Please try again.',
          })
      }
    }
  }, [success, error])

  return null
}