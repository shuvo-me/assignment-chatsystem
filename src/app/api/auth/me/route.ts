import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import chatApi from "@/lib/chatApi";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("chat_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "You must be signed in to do that." },
      { status: 401 },
    );
  }

  try {
    const res = await chatApi.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(res.data);
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
