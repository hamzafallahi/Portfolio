import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify JWT token using jose (Edge Runtime compatible)
    try {
      const secret = process.env.JWT_SECRET;
      
      if (!secret) {
        console.error('JWT_SECRET is not defined');
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Convert secret to Uint8Array for jose
      const secretKey = new TextEncoder().encode(secret);
      
      // Verify the token
      await jwtVerify(token, secretKey);
      
      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      console.error('JWT verification failed:', error instanceof Error ? error.message : 'Unknown error');
      
      // Clear invalid cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};