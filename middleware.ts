import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for route handling.
 * Note: localStorage auth checks must happen on the client.
 * Server-side middleware cannot access localStorage.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
