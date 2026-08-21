import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import chatApi from "@/lib/chatApi";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON in request body." },
      { status: 400 },
    );
  }

  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!phone) {
    return NextResponse.json(
      { message: "Phone number is required." },
      { status: 400 },
    );
  }
  if (!name) {
    return NextResponse.json({ message: "Name is required." }, { status: 400 });
  }

  try {
    const res = await chatApi.post("/auth/login", { phone, name });
    const token = res.data?.token;
    if (!token) {
      return NextResponse.json(
        { message: "Login failed. Please try again." },
        { status: 502 },
      );
    }

    const response = NextResponse.json({ user: res.data.user ?? null });
    response.cookies.set("chat_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? 502;
      const message =
        err.response?.data?.error?.message ??
        "Chat service is unreachable right now. Please try again.";
      return NextResponse.json({ message }, { status });
    }
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
