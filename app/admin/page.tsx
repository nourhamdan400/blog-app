import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";
import { deletePost } from "./actions";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">المقالات ({posts.length})</h1>
        <Link href="/admin/new" className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700">+ مقال جديد</Link>
      </div>
      <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {posts.length === 0 && <p className="p-6 text-slate-500">ما في مقالات بعد</p>}
        {posts.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <img src={p.imageAr} alt="" className="h-14 w-20 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{p.titleAr}</p>
              <p dir="ltr" className="truncate text-start text-sm text-slate-500">{p.titleEn}</p>
            </div>
            <Link href={`/admin/${p.id}/edit`} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium hover:bg-slate-200">تعديل</Link>
            <DeleteButton action={deletePost.bind(null, p.id)} />
          </div>
        ))}
      </div>
    </>
  );
}
