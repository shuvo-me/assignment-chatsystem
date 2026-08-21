import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const hasSession = request.cookies.has("chat_token");
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");


    if (!hasSession && !isAuthPage) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (hasSession && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [

        "/((?!api|_next/static|_next/image|favicon.ico|manifest|sw\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
    ],
};