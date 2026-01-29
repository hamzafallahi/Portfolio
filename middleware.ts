import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Temporarily disable middleware for debugging
  // Protect /admin routes
  // if (pathname.startsWith('/admin')) {
  //   const token = request.cookies.get('token')?.value;

  //   if (!token) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }

  //   // For now, just check if token exists (client-side verification handles the rest)
  //   // TODO: Re-enable server-side JWT verification when .env loading is fixed
  //   // try {
  //   //   jwt.verify(token, process.env.JWT_SECRET!);
  //   // } catch (error) {
  //   //   return NextResponse.redirect(new URL('/login', request.url));
  //   // }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};