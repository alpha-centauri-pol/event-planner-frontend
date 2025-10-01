import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_BASE_URL, SESSION_COOKIE_NAME } from "./app/config/constants";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  const isProtectedRoute =
    pathname.startsWith("/home") || pathname.startsWith("/interests");
  const isLoginPage = pathname.startsWith("/login");

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/profile`, {
        headers: {
          Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (isProtectedRoute) {
          const redirectResponse = NextResponse.redirect(
            new URL("/login", request.url)
          );
          redirectResponse.cookies.delete(SESSION_COOKIE_NAME);
          return redirectResponse;
        }
        throw new Error("Session is not valid");
      }

      const profile = await response.json();
      const isNewUser =
        (!profile.interests || profile.interests.length === 0) &&
        (!profile.custom_interests || profile.custom_interests.length === 0);

      if (pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
      }

      if (isLoginPage) {
        return NextResponse.redirect(new URL("/home", request.url));
      }

      if (isNewUser && pathname.startsWith("/home")) {
        return NextResponse.redirect(new URL("/interests", request.url));
      }

      if (!isNewUser && pathname.startsWith("/interests")) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    } catch (error) {
      console.error("Error validating session:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/interests", "/login"],
};
