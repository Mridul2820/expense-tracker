import { NextResponse } from "next/server";

export default function middleware(req) {
  let loggedin = req.cookies.get("jwt");
  const { pathname } = req.nextUrl;

  if (loggedin) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname === "/signup") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!loggedin && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
