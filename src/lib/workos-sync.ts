/**
 * WorkOS User Sync Utilities
 *
 * Syncs WorkOS authenticated users to Payload CMS
 * WorkOS is the source of truth for auth, Payload stores user data for relationships
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'

export interface WorkOSUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  emailVerified: boolean
  profilePictureUrl?: string
}

/**
 * Sync a WorkOS user to Payload
 * Creates a new user if they don't exist, updates if they do
 *
 * @param workosUser - User object from WorkOS
 * @returns The synced Payload user
 */
export async function syncWorkOSUserToPayload(workosUser: WorkOSUser): Promise<User> {
  try {
    const payload = await getPayload({ config })

    // Check if user already exists by WorkOS ID
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        workosId: {
          equals: workosUser.id,
        },
      },
      limit: 1,
    })

    // Prepare user data
    const userData = {
      email: workosUser.email,
      workosId: workosUser.id,
      authProvider: 'workos' as const,
      emailVerified: workosUser.emailVerified,
      // Note: We don't set a password for WorkOS users
      // They authenticate through WorkOS only
    }

    if (existingUsers.docs.length > 0) {
      // Update existing user
      const existingUser = existingUsers.docs[0]

      const updatedUser = await payload.update({
        collection: 'users',
        id: existingUser.id,
        data: userData,
      })

      return updatedUser as User
    } else {
      // Check if a user with this email exists (potential migration scenario)
      const usersByEmail = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: workosUser.email,
          },
        },
        limit: 1,
      })

      if (usersByEmail.docs.length > 0) {
        // User exists with same email but no WorkOS ID - link accounts
        const existingUser = usersByEmail.docs[0]

        const updatedUser = await payload.update({
          collection: 'users',
          id: existingUser.id,
          data: {
            ...userData,
            authProvider: 'both' as const, // User can auth with both systems
          },
        })

        return updatedUser as User
      }

      // Create new user
      const newUser = await payload.create({
        collection: 'users',
        data: {
          ...userData,
          role: 'user', // Default role
        },
      })

      return newUser as User
    }
  } catch (error) {
    console.error('Error syncing WorkOS user to Payload:', error)
    throw error
  }
}

/**
 * Get a Payload user by WorkOS ID
 *
 * @param workosId - WorkOS user ID
 * @returns The Payload user or null if not found
 */
export async function getPayloadUserByWorkOSId(workosId: string): Promise<User | null> {
  try {
    const payload = await getPayload({ config })

    const users = await payload.find({
      collection: 'users',
      where: {
        workosId: {
          equals: workosId,
        },
      },
      limit: 1,
    })

    return users.docs.length > 0 ? (users.docs[0] as User) : null
  } catch (error) {
    console.error('Error fetching Payload user by WorkOS ID:', error)
    return null
  }
}

/**
 * Get a Payload user by email
 *
 * @param email - User email
 * @returns The Payload user or null if not found
 */
export async function getPayloadUserByEmail(email: string): Promise<User | null> {
  try {
    const payload = await getPayload({ config })

    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    return users.docs.length > 0 ? (users.docs[0] as User) : null
  } catch (error) {
    console.error('Error fetching Payload user by email:', error)
    return null
  }
}
