import SubmitButton from "./SubmitButton";

type Post = { titleAr: string; titleEn: string; contentAr: string; contentEn: string; imageAr: string; imageEn: string };
const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";
const label = "mb-1 mt-4 block text-sm font-semibold";

export default function PostForm({ action, post }: { action: (fd: FormData) => Promise<void>; post?: Post }) {
  return (
    <form action={action}>
      <div className="grid gap-6 md:grid-cols-2">
        <section dir="rtl" className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold">🇵🇸 عربي</h3>
          <label className={label}>العنوان</label>
          <input name="titleAr" defaultValue={post?.titleAr} required className={input} />
          <label className={label}>المحتوى</label>
          <textarea name="contentAr" rows={9} defaultValue={post?.contentAr} required className={input} />
          <label className={label}>رابط الصورة</label>
          <input name="imageAr" type="url" dir="ltr" defaultValue={post?.imageAr} required className={input} />
        </section>
        <section dir="ltr" className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold">🇬🇧 English</h3>
          <label className={label}>Title</label>
          <input name="titleEn" defaultValue={post?.titleEn} required className={input} />
          <label className={label}>Content</label>
          <textarea name="contentEn" rows={9} defaultValue={post?.contentEn} required className={input} />
          <label className={label}>Image URL</label>
          <input name="imageEn" type="url" defaultValue={post?.imageEn} required className={input} />
        </section>
      </div>
      <div className="mt-6"><SubmitButton>حفظ / Save</SubmitButton></div>
    </form>
  );
}
