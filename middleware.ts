import { NextRequest, NextResponse } from "next/server";

// فحص سريع فقط؛ التحقق الحقيقي من الجلسة بيصير في السيرفر (requireAdmin)
export function middleware(req: NextRequest) {
  if (!req.cookies.get("session")) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
