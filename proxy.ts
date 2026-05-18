import { NextResponse, type NextRequest } from "next/server";

// Expose the current request path to server components via header so that
// auth guards can build a sensible ?callbackUrl when redirecting to /login.
// In Next 16, what used to be middleware.ts lives in proxy.ts.
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Run on app pages, skip Next internals, static files and the NextAuth handler.
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};
