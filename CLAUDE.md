# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Payload App Starter with WorkOS AuthKit - AI Assistant Guide

## Project Overview

This is a modern SaaS starter kit built with Next.js 15, Payload CMS, and WorkOS AuthKit authentication. The project uses TypeScript, PostgreSQL, and includes an enterprise-grade authentication system with OAuth, email/password, and optional SSO support.

## Tech Stack

- **Framework**: Next.js 16.0.0 with App Router
- **CMS**: Payload CMS 3.61.1
- **Authentication**: WorkOS AuthKit 1.4.1
- **Database**: PostgreSQL with Payload adapter
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS v4 with Shadcn UI components
- **Storage**: Vercel Blob Storage (with optional Cloudflare R2/AWS S3 support)
- **Node**: v18.20.2+ or v20.9.0+
- **Package Manager**: pnpm

## Architecture Overview

### Core Architecture Patterns
- **App Router Architecture**: Uses Next.js 16 App Router with clear separation between frontend and Payload admin routes
- **Server-First Approach**: Defaults to Server Components, using Client Components only when necessary for interactivity
- **Type Safety**: Leverages Payload's automatic type generation for end-to-end type safety
- **Dual Authentication**: WorkOS AuthKit for frontend, Payload auth for CMS admin
- **User Sync Strategy**: WorkOS as source of truth, syncs to Payload for relationships
- **Storage Abstraction**: Configurable storage backend (Vercel Blob/S3/R2) through Payload plugins

### Authentication Architecture

**Frontend Routes (WorkOS AuthKit)**:
- Hosted authentication UI on WorkOS platform
- Email/password + OAuth providers (Google, GitHub, Microsoft, etc.)
- Automatic email verification and password reset
- Enterprise SSO support (SAML/OIDC)
- Multi-factor authentication (MFA)

**Admin Routes (Payload CMS)**:
- Traditional Payload authentication for CMS admin
- Separate user management for content editors
- Role-based access control

**User Sync Flow**:
1. User authenticates via WorkOS hosted UI
2. WorkOS redirects to `/callback` with auth code
3. Callback handler syncs WorkOS user to Payload
4. User data stored in Payload with `workosId` reference
5. Subsequent logins update Payload user record

### Route Organization
- Public routes: `/(site)/*` - Accessible to all users
- Auth routes: `/(auth)/*` - Login, register (redirects to WorkOS hosted UI)
- Protected routes: `/(admin)/*` - Requires WorkOS authentication
- Payload admin: `/admin/*` - CMS admin interface (uses Payload auth)
- API routes: `/api/*` - REST endpoints, Payload API at `/api`, GraphQL at `/api/graphql`
- Callback route: `/callback` - OAuth callback handler for WorkOS

## Project Structure

```
/src
  /app                 # Next.js App Router
    /(frontend)        # Frontend routes
      /(admin)         # Protected admin routes (requires WorkOS auth)
      /(auth)          # Authentication routes (redirect to WorkOS)
      /(site)          # Public site routes
    /(payload)         # Payload CMS routes (uses Payload auth)
    /api               # API routes
      /auth            # Auth-related API routes
        /signout       # WorkOS sign-out endpoint
    /callback          # WorkOS OAuth callback handler
  /collections         # Payload collections (Users, Media)
  /components          # React components
    /auth              # Authentication components (WorkOS redirects)
    /dashboard         # Dashboard components
    /ds.tsx            # Design system exports
    /site              # Site components (header, footer)
    /theme             # Theme components (dark/light mode)
    /ui                # Shadcn UI components
  /lib                 # Utility functions
    /workos-sync.ts    # WorkOS user sync utilities
    /archive/          # Archived old auth system files
      /auth.ts         # (Archived) Old Payload auth utilities
      /email.ts        # (Archived) Old email templates
      /validation.ts   # (Archived) Old validation functions
  /middleware.ts       # WorkOS AuthKit middleware for route protection
  /payload.config.ts   # Payload CMS configuration
  /payload-types.ts    # Auto-generated Payload types
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Safe development (clears .next cache)
pnpm devsafe

# Build for production
pnpm build

# Start production server
pnpm start

# Generate Payload import map
pnpm generate:importmap

# Generate TypeScript types
pnpm generate:types

# Run linter
pnpm lint

# Access Payload CLI
pnpm payload

# Testing
# Note: No test framework is currently configured.
# To run tests, first install a test framework (e.g., Jest, Vitest)
```

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Database
DATABASE_URI=postgres://postgres:<password>@127.0.0.1:5432/your-database-name

# Payload secret key
PAYLOAD_SECRET=YOUR_SECRET_HERE

# WorkOS AuthKit Configuration
WORKOS_CLIENT_ID=client_xxx # Get from WorkOS Dashboard
WORKOS_API_KEY=sk_xxx # Secret API Key from WorkOS Dashboard
WORKOS_COOKIE_PASSWORD=your-32-char-min-password # Generate: openssl rand -base64 24
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/callback # Callback URL

# Storage
BLOB_READ_WRITE_TOKEN=YOUR_READ_WRITE_TOKEN_HERE

# Email Configuration (Optional - WorkOS handles auth emails)
RESEND_API_KEY=re_xxxxxxxx # For app-specific emails (not auth)
EMAIL_FROM=noreply@yourdomain.com # From address for app emails
```

**Important Notes**:
- **WORKOS_CLIENT_ID** and **WORKOS_API_KEY**: Get these from [WorkOS Dashboard](https://dashboard.workos.com)
- **WORKOS_COOKIE_PASSWORD**: Must be at least 32 characters. Generate with `openssl rand -base64 24`
- **NEXT_PUBLIC_WORKOS_REDIRECT_URI**: Use `NEXT_PUBLIC_` prefix for edge function compatibility
- WorkOS handles all authentication emails (verification, password reset)
- Resend is now optional, only needed for application-specific emails

## Important Files

### Configuration
- `/src/payload.config.ts` - Payload CMS configuration
- `/next.config.mjs` - Next.js configuration with security headers
- `/tsconfig.json` - TypeScript configuration with path aliases
- `/postcss.config.mjs` - PostCSS configuration for Tailwind CSS v4
- `/Dockerfile` - Docker configuration for containerized deployment

### Collections
- `/src/collections/Users.ts` - User collection with `workosId` and `authProvider` fields
- `/src/collections/Media.ts` - Media/file upload collection

### WorkOS Authentication System
- `/src/middleware.ts` - WorkOS AuthKit middleware for route protection
- `/src/app/callback/route.ts` - OAuth callback handler with user sync
- `/src/lib/workos-sync.ts` - User synchronization utilities
- `/src/app/api/auth/signout/route.ts` - WorkOS sign-out endpoint
- `/src/components/auth/login-form.tsx` - Redirects to WorkOS sign-in
- `/src/components/auth/register-form.tsx` - Redirects to WorkOS sign-up
- `/src/components/auth/logout-button.tsx` - Client-side logout
- `/src/components/auth/logout-form.tsx` - Server action logout
- `/src/app/(frontend)/(admin)/layout.tsx` - Protected layout with user sync

### Archived Files (Old Auth System)
- `/src/lib/archive/auth.ts` - Original Payload authentication utilities
- `/src/lib/archive/email.ts` - Original email templates
- `/src/lib/archive/validation.ts` - Original validation functions
- `/src/lib/archive/README.md` - Documentation for archived files

### Layouts
- `/src/app/(frontend)/layout.tsx` - Main frontend layout with AuthKitProvider
- `/src/app/(frontend)/(admin)/layout.tsx` - Admin area layout with WorkOS auth
- `/src/app/(payload)/layout.tsx` - Payload CMS layout

### Components
- `/src/components/ds.tsx` - Design system component exports
- `/src/components/ui/` - Shadcn UI components (button, card, form, etc.)
- `/src/components/theme/` - Theme provider and toggle components
- `/src/components/app/` - App-specific components (navigation)
- `/src/lib/utils.ts` - Utility functions including `cn()` for className merging

## Coding Guidelines

### General Rules
1. Use TypeScript for all new files
2. Follow the existing project structure
3. Use server components by default, client components only when necessary
4. Utilize Payload's type generation for type safety
5. Use the design system components from `/src/components/ui/`

### WorkOS Authentication

**Frontend Authentication (WorkOS)**:
- Use `withAuth()` from `@workos-inc/authkit-nextjs` in Server Components
- Use `useAuth()` hook in Client Components
- Always redirect to WorkOS hosted UI for login/signup
- Never build custom auth forms - WorkOS handles all auth UI
- Use `getSignInUrl()` and `getSignUpUrl()` for auth redirects
- User data comes from WorkOS, synced to Payload automatically

**Example Server Component**:
```typescript
import { withAuth } from '@workos-inc/authkit-nextjs'

export default async function ProtectedPage() {
  const { user } = await withAuth({ ensureSignedIn: true })
  return <div>Welcome {user.email}</div>
}
```

**Example Client Component**:
```typescript
'use client'
import { useAuth } from '@workos-inc/authkit-nextjs/components'

export default function UserProfile() {
  const { user, loading } = useAuth({ ensureSignedIn: true })
  if (loading) return <div>Loading...</div>
  return <div>Email: {user?.email}</div>
}
```

**Logout Pattern**:
- Client-side: Use `LogoutButton` component (fetches `/api/auth/signout`)
- Server-side: Use `LogoutForm` component with `signOut()` server action
- Both methods clear WorkOS session cookies

**Route Protection**:
- Middleware automatically protects all routes except public paths
- Protected routes under `/(admin)/*` require WorkOS authentication
- Payload admin routes `/admin/*` excluded from WorkOS middleware
- Use `withAuth({ ensureSignedIn: true })` for page-level protection

### User Sync Pattern

When accessing WorkOS-authenticated users in protected routes:

```typescript
import { withAuth } from '@workos-inc/authkit-nextjs'
import { syncWorkOSUserToPayload } from '@/lib/workos-sync'

export default async function Page() {
  const { user: workosUser } = await withAuth({ ensureSignedIn: true })

  // Sync to Payload (optional, automatic in admin layout)
  await syncWorkOSUserToPayload({
    id: workosUser.id,
    email: workosUser.email,
    firstName: workosUser.firstName,
    lastName: workosUser.lastName,
    emailVerified: workosUser.emailVerified,
    profilePictureUrl: workosUser.profilePictureUrl,
  })

  // Now you can use workosUser or fetch from Payload
}
```

### Payload Admin Authentication
- Payload admin uses separate authentication system
- Admin users managed independently in Payload
- To access Payload admin: navigate to `/admin` and use Payload credentials
- Admin authentication does NOT use WorkOS
- Keep Payload auth for content management only

### Styling
- Use Tailwind CSS v4 classes
- Follow the existing theme system for dark/light mode support
- Use Shadcn UI components when available
- Custom components should go in `/src/components/`
- Use the `cn()` utility from `/src/lib/utils.ts` for conditional classes

### Database & CMS
- Define collections in `/src/collections/`
- Run `pnpm generate:types` after modifying collections
- Users collection includes `workosId` and `authProvider` fields
- `workosId` is unique identifier for WorkOS users
- `authProvider` can be: 'workos', 'payload', or 'both'
- Media uploads are configured to use Vercel Blob Storage by default

### API Routes
- Place custom API routes in `/src/app/api/`
- Payload API routes are automatically handled at `/api/`
- GraphQL endpoint is available at `/api/graphql`
- Use Payload's REST API for collection operations
- Protect API routes with `withAuth()` if needed

### Best Practices
1. Keep components small and focused
2. Use proper TypeScript types (generated from Payload)
3. Handle errors gracefully with try-catch blocks
4. Follow Next.js 16 best practices (App Router, Server Components)
5. Use environment variables for sensitive data
6. Never expose WorkOS API key to client
7. Always sync WorkOS users to Payload in protected routes
8. Use `cross-env` for cross-platform compatibility in scripts

## Deployment

The project is configured for Vercel deployment:
1. Set up WorkOS environment in [WorkOS Dashboard](https://dashboard.workos.com)
2. Configure redirect URIs for production domain
3. Set all environment variables in Vercel
4. Ensure WORKOS_COOKIE_PASSWORD is at least 32 characters
5. Update NEXT_PUBLIC_WORKOS_REDIRECT_URI for production
6. The project uses Vercel Blob Storage for media uploads
7. PostgreSQL database connection is required
8. Docker deployment is also supported with the included Dockerfile

## Common Tasks

### Adding a New Collection
1. Create a new file in `/src/collections/`
2. Add the collection to `/src/payload.config.ts`
3. Run `pnpm generate:types` to update TypeScript types
4. Create UI components if needed for the collection

### Creating Protected Pages
1. Add pages under `/src/app/(frontend)/(admin)/`
2. WorkOS middleware will automatically protect these routes
3. Use `withAuth({ ensureSignedIn: true })` in page component
4. User data available from WorkOS, automatically synced to Payload

### Working with WorkOS Users

**Get authenticated user in Server Component**:
```typescript
import { withAuth } from '@workos-inc/authkit-nextjs'

const { user } = await withAuth({ ensureSignedIn: true })
// user.id, user.email, user.emailVerified, etc.
```

**Get authenticated user in Client Component**:
```typescript
'use client'
import { useAuth } from '@workos-inc/authkit-nextjs/components'

const { user, loading } = useAuth({ ensureSignedIn: true })
```

**Get Payload user data**:
```typescript
import { getPayloadUserByWorkOSId } from '@/lib/workos-sync'

const payloadUser = await getPayloadUserByWorkOSId(workosUser.id)
```

### Customizing the Theme
1. Modify theme components in `/src/components/theme/`
2. Update Tailwind configuration if needed
3. Ensure dark mode compatibility

### WorkOS Dashboard Configuration

To configure authentication in WorkOS Dashboard:

1. **Sign in** to [dashboard.workos.com](https://dashboard.workos.com)
2. **Navigate to Authentication** → AuthKit
3. **Configure auth methods**:
   - Email + Password (enabled by default)
   - Google OAuth (add Client ID and Secret)
   - GitHub OAuth (add Client ID and Secret)
   - Microsoft OAuth (add Client ID and Secret)
4. **Add redirect URIs**:
   - Development: `http://localhost:3000/callback`
   - Production: `https://yourdomain.com/callback`
5. **Customize branding** (optional):
   - Upload logo
   - Set brand colors
   - Customize email templates
6. **Copy credentials** to `.env`:
   - Client ID
   - API Key

### Storage Configuration
1. Default: Vercel Blob Storage (configured in payload.config.ts)
2. Alternative: Uncomment S3/R2 configuration in payload.config.ts
3. Update environment variables accordingly
4. Media collection handles all file uploads

### Development Workflow
1. Use `pnpm devsafe` if you encounter Next.js caching issues
2. Always run `pnpm generate:types` after modifying Payload collections
3. Check `pnpm lint` before committing code
4. Test WorkOS authentication flow in local development
5. Use WorkOS Dashboard to test auth methods
6. Implement loading states for better UX
7. Handle errors with appropriate user feedback

## Testing Strategy

Currently, no test framework is configured. When implementing tests:
1. Choose a test framework (Jest, Vitest, or Playwright for E2E)
2. Focus on testing:
   - WorkOS authentication callback flow
   - User sync to Payload
   - Protected route access
   - Payload admin authentication
   - API endpoints
   - User data synchronization

## Performance Considerations

1. **Image Optimization**: Media uploads are automatically optimized via Sharp
2. **Server Components**: Default to Server Components for better performance
3. **Code Splitting**: Automatic with Next.js App Router
4. **Database Queries**: Use Payload's built-in query optimization
5. **Caching**: Leverage Next.js caching strategies for static content
6. **WorkOS Auth**: Minimal impact, authentication handled by WorkOS edge infrastructure

## Security Best Practices

1. **Authentication**:
   - WorkOS manages all auth security (passwords, tokens, OAuth)
   - HTTP-only cookies with secure flags
   - Sessions encrypted with WORKOS_COOKIE_PASSWORD
2. **Dual Auth System**:
   - WorkOS for frontend (public-facing)
   - Payload for CMS admin (internal)
   - Clear separation prevents admin access via WorkOS
3. **Environment Variables**:
   - Never commit sensitive data
   - Keep WORKOS_API_KEY secret (never expose to client)
   - Use NEXT_PUBLIC_ prefix only for redirect URI
4. **Security Headers**: Configured in `next.config.mjs`
5. **User Data**:
   - WorkOS user IDs stored in Payload
   - Email is primary identifier
   - Payload password field optional for WorkOS users
6. **Database Security**: Use connection pooling and prepared statements

## WorkOS AuthKit Features

Available features (configure in WorkOS Dashboard):

- **Email/Password**: Traditional authentication with password requirements
- **OAuth Providers**: Google, Microsoft, GitHub, GitLab, Apple, etc.
- **Magic Links**: Passwordless email authentication
- **Email Verification**: Automatic verification emails
- **Password Reset**: Hosted password reset flow
- **Multi-Factor Authentication (MFA)**: TOTP, SMS, authenticator apps
- **Enterprise SSO**: SAML and OIDC connections
- **Organizations**: Multi-tenant support with team management
- **User Impersonation**: Admin can impersonate users
- **Audit Logs**: Track authentication events
- **Roles & Permissions**: Role-based access control

## Troubleshooting

### WorkOS Authentication Issues

**Problem**: Redirect loop after login
- **Solution**: Check middleware configuration, ensure `/callback` is in `unauthenticatedPaths`

**Problem**: Session not persisting
- **Solution**: Verify `WORKOS_COOKIE_PASSWORD` is at least 32 characters

**Problem**: "Invalid redirect URI" error
- **Solution**: Ensure redirect URI in `.env` matches WorkOS Dashboard configuration

**Problem**: Users not syncing to Payload
- **Solution**: Check `/callback/route.ts` logs, verify Payload database connection

**Problem**: Type generation fails
- **Solution**: Check environment variables, ensure valid BLOB_READ_WRITE_TOKEN

### Getting Help

- WorkOS Documentation: https://workos.com/docs
- WorkOS Support: support@workos.com
- Payload Documentation: https://payloadcms.com/docs
- Project Issues: Check GitHub repository issues

---

## Migration Notes

This project has been migrated from custom Payload authentication to WorkOS AuthKit.

**What Changed**:
- Frontend authentication now uses WorkOS hosted UI
- Email verification and password reset handled by WorkOS
- OAuth providers available out-of-the-box
- Payload admin authentication unchanged
- Old auth utilities archived in `/src/lib/archive/`

**Benefits**:
- Enterprise-grade security managed by WorkOS
- No maintenance burden for auth infrastructure
- Built-in OAuth, MFA, and SSO support
- Professional authentication UI
- Faster implementation and updates

**For Existing Users**:
- Old authentication system preserved in archive
- Users need to re-register with WorkOS
- Email-based migration possible (link accounts by email)
- Payload admin users unaffected
