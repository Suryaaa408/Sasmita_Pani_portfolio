import { NextResponse } from "next/server";
import { createAdminSessionCookie, verifyAdminPassword } from "@/lib/adminAuth";

type LoginPayload = {
  password?: string;
};

const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();
const maxAttempts = 5;
const lockoutMs = 15 * 60 * 1000;

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  const key = clientKey(request);
  const attempt = failedAttempts.get(key);

  if (attempt?.lockedUntil && attempt.lockedUntil > Date.now()) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as LoginPayload;
    const password = body.password ?? "";

    if (!password || !verifyAdminPassword(password)) {
      const nextCount = (attempt?.count ?? 0) + 1;
      failedAttempts.set(key, {
        count: nextCount,
        lockedUntil: nextCount >= maxAttempts ? Date.now() + lockoutMs : 0,
      });

      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    failedAttempts.delete(key);

    const response = NextResponse.json({ success: true });
    const session = createAdminSessionCookie();
    response.cookies.set(session.name, session.value, session.options);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not log in.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
