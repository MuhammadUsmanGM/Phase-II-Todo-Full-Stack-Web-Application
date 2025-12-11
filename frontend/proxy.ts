import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Get token from cookies
  const { pathname } = request.nextUrl;

  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.includes(pathname);

  // If the user is authenticated
  if (token) {
    // And trying to access a public-only path, redirect to the dashboard
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } 
  // If the user is not authenticated
  else {
    // And trying to access a protected path, redirect to login
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if no redirect needed
  return NextResponse.next();
}

export const config = {
  // Matcher to run on all paths except for API routes, static files, and image optimization.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

