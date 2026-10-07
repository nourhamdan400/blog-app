import Link from "next/link";
import { notFound } from "next/navigation";
import LangSwitch from "@/components/LangSwitch";
import { dict, isLocale } from "@/lib/i18n";
import { getAdmin } from "@/lib/auth";

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const admin = await getAdmin();
  return (
    <div lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href={`/${lang}`} className="text-xl font-extrabold text-indigo-600">{t.brand}</Link>
          <nav className="flex items-center gap-3">
            <LangSwitch lang={lang} />
            <Link href={admin ? "/admin" : "/login"} className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">
              {admin ? t.dashboard : t.login}
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} {t.brand} — {t.footer}</footer>
    </div>
  );
}
