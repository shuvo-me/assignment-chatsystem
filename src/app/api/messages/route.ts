import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import chatApi from "@/lib/chatApi";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("chat_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "You must be signed in to do that." },
      { status: 401 },
    );
  }

  let body: { conversationId?: unknown; text?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const conversationId =
    typeof body.conversationId === "string" ? body.conversationId.trim() : "";
  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!conversationId || !text) {
    return NextResponse.json(
      { message: "conversationId and text are required." },
      { status: 400 },
    );
  }

  try {
    const res = await chatApi.post(
      "/messages",
      { conversationId, text },
      { headers: { Authorization: `Bearer ${token}` } },
    );
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
