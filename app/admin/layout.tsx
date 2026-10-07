import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <div dir="rtl">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/admin" className="text-lg font-extrabold text-indigo-600">لوحة التحكم</Link>
          <div className="flex items-center gap-3">
            <span dir="ltr" className="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
            <Link href="/ar" className="text-sm text-slate-600 hover:underline">الموقع</Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
