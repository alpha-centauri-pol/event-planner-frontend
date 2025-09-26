import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE_URL = 'https://event-tracker-v2.onrender.com';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('connect.sid');

  const isProtectedRoute = pathname === '/' || pathname.startsWith('/home') || pathname.startsWith('/interests');
  const isLoginPage = pathname.startsWith('/login');

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/profile`, {
        headers: {
          'Cookie': `${sessionCookie.name}=${sessionCookie.value}`,
        },
      });

      if (!response.ok) {
        throw new Error('Session is not valid');
      }

      const profile = await response.json();
      const isNewUser = (!profile.interests || profile.interests.length === 0) && 
                        (!profile.custom_interests || profile.custom_interests.length === 0);

      const destinationUrl = isNewUser ? '/interests' : '/home';

      if (pathname === '/' || isLoginPage) {
        return NextResponse.redirect(new URL(destinationUrl, request.url));
      }
      
      if (isNewUser && pathname.startsWith('/home')) {
        return NextResponse.redirect(new URL('/interests', request.url));
      }

      if (!isNewUser && pathname.startsWith('/interests')) {
        return NextResponse.redirect(new URL('/home', request.url));
      }

    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('connect.sid');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home', '/interests', '/login'],
};

