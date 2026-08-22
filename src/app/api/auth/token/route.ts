import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("chat_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "You must be signed in to do that." },
      { status: 401 },
    );
  }
  return NextResponse.json({ token });
}
