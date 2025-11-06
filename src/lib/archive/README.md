# Archive - Old Authentication System

This folder contains the original authentication system files before migrating to WorkOS AuthKit.

## Files Archived

- **auth.ts** - Original Payload authentication utilities (loginUser, registerUser, forgotPassword, etc.)
- **email.ts** - Email templates and Resend integration for auth emails
- **validation.ts** - Form validation functions for email and password

## Why Archived?

These files have been replaced by WorkOS AuthKit, which provides:
- Hosted authentication UI
- Email/password and OAuth authentication
- Email verification and password reset
- Enterprise SSO support
- Multi-factor authentication

## New Authentication System

The new authentication system uses:
- **WorkOS AuthKit** (`@workos-inc/authkit-nextjs`)
- **User Sync** (`/src/lib/workos-sync.ts`) - Syncs WorkOS users to Payload
- **Middleware** (`/src/middleware.ts`) - Route protection with WorkOS
- **Callback Handler** (`/src/app/callback/route.ts`) - OAuth callback processing

## Reference

Keep these files for reference in case you need to:
- Migrate data from old auth system
- Reference old validation logic
- Understand previous authentication flow

## Removal

These files can be safely deleted once:
- All users have migrated to WorkOS
- No dependencies on these utilities exist
- Migration is confirmed successful

---

Archived on: 2025-01-06
