  import { getToken } from "next-auth/jwt";
  import { NextResponse } from "next/server";

  export default async function middleware(req) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const path = req.nextUrl.pathname;

    if(!token){
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/admin") && token?.rol !== "ROLE_ADMINISTRADOR") {
      return NextResponse.redirect(new URL("/usuario/inicio", req.url));
    }

    if (path.startsWith("/usuario") && token?.rol !== "ROLE_CLIENTE") {
      return NextResponse.redirect(new URL("/admin/inicio", req.url));
    }

    return NextResponse.next()
  }

  export const config = {
    matcher: ["/admin/:path*", "/usuario/:path*"],
  };
