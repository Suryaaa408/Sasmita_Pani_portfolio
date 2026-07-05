import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const adminSessionCookie = "sasmita_admin_session";
const sessionDurationMs = 12 * 60 * 60 * 1000;

function getAdminPasswordHash() {
  return process.env.ADMIN_PASSWORD_HASH;
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signSessionPayload(payload: string) {
  const secret = getAdminSessionSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const storedPassword = getAdminPassword();

  if (storedPassword) {
    return safeEqual(password, storedPassword);
  }

  const storedHash = getAdminPasswordHash();

  if (!storedHash) {
    throw new Error("ADMIN_PASSWORD or ADMIN_PASSWORD_HASH is not configured.");
  }

  const [algorithm, salt, hash] = storedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !hash) {
    throw new Error("ADMIN_PASSWORD_HASH must use the scrypt$salt$hash format.");
  }

  const candidate = scryptSync(password, salt, 64).toString("hex");
  return safeEqual(candidate, hash);
}

export function createAdminSessionCookie() {
  const expiresAt = Date.now() + sessionDurationMs;
  const payload = `admin:${expiresAt}`;
  const signature = signSessionPayload(payload);

  return {
    name: adminSessionCookie,
    value: `${expiresAt}.${signature}`,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.floor(sessionDurationMs / 1000),
    },
  };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(adminSessionCookie)?.value;

  if (!session) {
    return false;
  }

  const [expiresAt, signature] = session.split(".");
  const expiresAtNumber = Number(expiresAt);

  if (!expiresAt || !signature || Number.isNaN(expiresAtNumber) || expiresAtNumber < Date.now()) {
    return false;
  }

  const expectedSignature = signSessionPayload(`admin:${expiresAt}`);
  return safeEqual(signature, expectedSignature);
}

export async function requireAdminAuth() {
  if (await isAdminAuthenticated()) {
    return null;
  }

  return NextResponse.json({ error: "Admin login required." }, { status: 401 });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set(adminSessionCookie, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
