/**
 * WorkOS Sign Out API Route
 *
 * Handles user logout using WorkOS signOut function
 */

import { signOut } from '@workos-inc/authkit-nextjs'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await signOut()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 })
  }
}
