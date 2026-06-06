import { NextResponse } from "next/server";

const ADMIN_AUTH_COOKIE_NAME = "khoirunnada_admin_auth";

export function proxy(request) {
  const adminAuthCookie = request.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value;

  if (adminAuthCookie === "1") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", "login-required");

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};