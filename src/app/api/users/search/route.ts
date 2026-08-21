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

  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  // upstream search crashes on "+" in the query (regex injection on their side)
  const safeQ = q.replaceAll("+", "");
  if (!safeQ) {
    return NextResponse.json([]);
  }

  try {
    const res = await chatApi.get("/users/search", {
      params: { q: safeQ },
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
