import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dict, fmtDate, isLocale, pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">{t.heroTitle}</h1>
        <p className="mt-2 text-slate-500">{t.heroSub}</p>
      </section>
      {posts.length === 0 && <p className="text-center text-slate-500">{t.empty}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((raw) => {
          const p = pick(raw, lang);
          return (
            <Link key={raw.id} href={`/${lang}/posts/${raw.id}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={p.image} alt={p.title} className="aspect-video w-full object-cover transition group-hover:scale-105" />
              <div className="p-5">
                <time className="text-xs text-slate-400">{fmtDate(raw.createdAt, lang)}</time>
                <h2 className="mt-1 line-clamp-2 text-lg font-bold">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.content}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-indigo-600">{t.readMore} {lang === "ar" ? "←" : "→"}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
