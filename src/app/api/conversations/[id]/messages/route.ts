import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import chatApi from "@/lib/chatApi";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const token = request.cookies.get("chat_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "You must be signed in to do that." },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json(
      { message: "Conversation id is required." },
      { status: 400 },
    );
  }

  try {
    const res = await chatApi.get(`/conversations/${id}/messages`, {
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
