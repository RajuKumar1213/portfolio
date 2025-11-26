import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // If user hits the root route `/`
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/portfolio", request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
