import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isLoginPage = nextUrl.pathname === "/login";
  const isAdminPage = nextUrl.pathname.startsWith("/admin");
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

  // 🔥 kalau sudah login tapi buka /login → redirect sesuai role
  if (isLoginPage && isLoggedIn) {
    if (req.auth?.user?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // 🔒 belum login tapi akses dashboard/admin
  if (!isLoggedIn && (isAdminPage || isDashboardPage)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 🔒 user biasa masuk admin
  if (isAdminPage && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/admin/:path*", "/dashboard/:path*"],
};