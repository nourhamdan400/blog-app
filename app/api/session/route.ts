import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { isAllowedEmail, SESSION_COOKIE } from "@/lib/auth";

const EXPIRES = 60 * 60 * 24 * 5 * 1000; // 5 أيام

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!isAllowedEmail(decoded.email)) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn: EXPIRES });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, cookie, {
      maxAge: EXPIRES / 1000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
