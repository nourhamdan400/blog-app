"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const errors: Record<string, string> = {
  "auth/invalid-credential": "الإيميل أو كلمة المرور غير صحيحة",
  "auth/user-not-found": "المستخدم غير موجود",
  "auth/wrong-password": "كلمة المرور غير صحيحة",
  "auth/too-many-requests": "محاولات كثيرة، جرّب لاحقاً",
  "auth/invalid-email": "صيغة الإيميل غير صحيحة",
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(""); setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const cred = await signInWithEmailAndPassword(auth, String(fd.get("email")), String(fd.get("password")));
      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: await cred.user.getIdToken() }),
      });
      if (res.status === 403) throw { code: "forbidden" };
      if (!res.ok) throw new Error();
      router.replace("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err?.code === "forbidden" ? "هذا الحساب غير مصرّح له بدخول لوحة التحكم" : errors[err?.code] ?? "صار خطأ، حاول مرة ثانية");
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-slate-900 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-extrabold">تسجيل الدخول</h1>
        <p className="text-sm text-slate-500">ادخل للوحة التحكم بإيميلك</p>
        <input name="email" type="email" dir="ltr" required placeholder="Email" autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        <input name="password" type="password" dir="ltr" required placeholder="Password" autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "..." : "دخول"}
        </button>
      </form>
    </main>
  );
}
