import type { CollectionConfig } from 'payload'
import type { User } from '@/payload-types'
import type { PayloadRequest } from 'payload'

const isAdmin = ({ req }: { req: PayloadRequest }): boolean => {
  const user = req.user as User | null
  return user?.role === 'admin'
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
    {
      name: 'workosId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'WorkOS user ID for authentication',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'authProvider',
      type: 'select',
      options: [
        { label: 'WorkOS', value: 'workos' },
        { label: 'Payload', value: 'payload' },
        { label: 'Both', value: 'both' },
      ],
      defaultValue: 'payload',
      admin: {
        description: 'Authentication provider for this user',
        position: 'sidebar',
      },
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Has the user verified their email address',
      },
    },
    {
      name: 'emailVerificationToken',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'emailVerificationExpires',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'passwordResetToken',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'passwordResetExpires',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    // If you want to add a username field, uncomment the following lines
    // {
    //   name: 'username',
    //   type: 'text',
    //   required: true,
    //   unique: true,
    // },
  ],
}
