import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a quick check before a protected page loads: if no session cookie, redirect to /login.
// The real check (valid session + role) is `requireRole` in lib/auth.ts.
export function proxy(request: NextRequest) {
  if (!request.cookies.has('session')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/clock/:path*', '/timesheet/:path*', '/account/:path*', '/qr/:path*'],
}
