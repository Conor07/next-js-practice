import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

const protectedRoutes = ["/user-info"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const currentPathName = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPathName.startsWith(route)
  );

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL("/api/auth/sigin", request.url));
  }

  return NextResponse.next();
}

export function kindeMiddleware(req: any) {
  return withAuth(req);
}

export const kindeConfig = {
  matcher: ["/dashboard"],
};
