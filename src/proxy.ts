import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const hasSession = request.cookies.has("chat_token");

    const { pathname } = request.nextUrl;

    if (hasSession && pathname === "/login") {
        const chatUrl = new URL("/chat", request.url);
        const res = NextResponse.redirect(chatUrl);
        res.headers.set("Cache-Control", "no-store");
        return res;
    }

    if (!hasSession && pathname.startsWith("/chat")) {
        const loginUrl = new URL("/login", request.url);
        const res = NextResponse.redirect(loginUrl);
        res.headers.set("Cache-Control", "no-store");
        return res;
    }

    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    return res;
}

export const config = {
    matcher: [

        "/((?!api|_next/static|_next/image|favicon.ico|manifest|sw\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
    ],
};