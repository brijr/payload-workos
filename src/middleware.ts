/**
 * Next.js Middleware with WorkOS AuthKit
 *
 * Handles:
 * - WorkOS authentication for frontend routes
 * - Excludes Payload admin routes (uses Payload auth)
 * - Excludes public routes
 */

import { authkitMiddleware } from '@workos-inc/authkit-nextjs'

export default authkitMiddleware({
  debug: false,

  middlewareAuth: {
    enabled: true,
    // Routes that don't require authentication
    unauthenticatedPaths: [
      '/',                    // Home page
      '/login',              // Login page
      '/register',           // Register page
      '/callback',           // OAuth callback
      '/api/*',              // API routes (handle auth separately)
      '/_next/*',            // Next.js internal routes
      '/favicon.ico',        // Favicon
      '/opengraph-image.jpg', // OpenGraph image
      '/twitter-image.jpg',  // Twitter image
    ],
  },

  // Specify signup paths for WorkOS to show signup UI
  signUpPaths: ['/register'],

  // Enable eager authentication (loads user data immediately)
  eagerAuth: false,
})

/**
 * Configure which routes the middleware runs on
 *
 * This matcher:
 * - Includes all routes
 * - Excludes Next.js static files
 * - Excludes Payload admin routes (they use Payload auth)
 * - Excludes Payload API routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, etc.)
     * - /admin/* (Payload CMS admin - uses Payload auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|admin).*)',
  ],
}
