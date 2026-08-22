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

  let body: { name?: unknown; participantIds?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const participantIds = Array.isArray(body.participantIds)
    ? body.participantIds.filter(
        (id): id is string => typeof id === "string" && id.trim().length > 0,
      )
    : [];

  if (!name || participantIds.length === 0) {
    return NextResponse.json(
      { message: "Group name and at least one other member are required." },
      { status: 400 },
    );
  }

  try {
    const res = await chatApi.post(
      "/conversations/group",
      { name, participantIds },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return NextResponse.json(res.data);
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status ?? 502;
      const message =
        err.response?.data?.error?.message ??
        err.response?.data?.message ??
        "Chat service is unreachable right now. Please try again.";
      return NextResponse.json({ message }, { status });
    }
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
