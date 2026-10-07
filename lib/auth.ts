import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "./firebase-admin";

export const SESSION_COOKIE = "session";

export const isAllowedEmail = (email?: string) =>
  !!email &&
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());

export async function getAdmin() {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const decoded = await adminAuth.verifySessionCookie(value, true);
    return isAllowedEmail(decoded.email) ? decoded : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdmin();
  if (!user) redirect("/login");
  return user;
}
