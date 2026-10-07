"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitch({ lang }: { lang: "ar" | "en" }) {
  const path = usePathname();
  const other = lang === "ar" ? "en" : "ar";
  return (
    <Link href={path.replace(/^\/(ar|en)/, `/${other}`)} className="rounded-full border border-slate-300 px-3 py-1 text-sm font-medium hover:bg-slate-100">
      {lang === "ar" ? "English" : "العربية"}
    </Link>
  );
}
