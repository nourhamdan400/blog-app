import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dict, fmtDate, isLocale, pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const raw = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!raw) notFound();
  const p = pick(raw, lang);
  return (
    <article className="mx-auto max-w-3xl">
      <Link href={`/${lang}`} className="text-sm font-medium text-indigo-600 hover:underline">{lang === "ar" ? "→" : "←"} {dict[lang].back}</Link>
      <h1 className="mt-4 text-4xl font-extrabold leading-tight">{p.title}</h1>
      <time className="mt-2 block text-sm text-slate-400">{fmtDate(raw.createdAt, lang)}</time>
      <img src={p.image} alt={p.title} className="my-6 aspect-video w-full rounded-2xl object-cover shadow" />
      <p className="whitespace-pre-wrap text-lg leading-9 text-slate-700">{p.content}</p>
    </article>
  );
}
