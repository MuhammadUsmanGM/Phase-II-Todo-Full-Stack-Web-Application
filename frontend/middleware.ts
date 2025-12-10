import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Get token from cookies
  const { pathname } = request.nextUrl;

  // Define protected routes (dashboard, any task-related pages)
  // Any path not /login or /register, but not API routes or static assets
  const protectedPaths = ['/']; // All paths starting with / are protected by default unless explicitly public

  // Define public routes that do not require authentication
  const publicPaths = ['/login', '/register'];

  // Redirect authenticated users from login/register pages to dashboard
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users from protected pages to login
  if (!token && protectedPaths.some(path => pathname.startsWith(path))) {
    // Only redirect if not already on a public path
    if (!publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if no redirect needed
  return NextResponse.next();
}

export const config = {
  // Matcher for paths where this middleware should run.
  // This will apply to all routes except API routes, static files, and _next/assets.
  // Make sure to exclude Next.js internal paths, static files, and API routes.
  matcher: [
    '/',
    '/login',
    '/register',
    // Match all other paths that are not static files or API routes
    // '/((?!api|_next/static|_next/image|favicon.ico).*)', // More generic approach if needed
  ],
};
