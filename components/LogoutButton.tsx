"use client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await signOut(auth);
    await fetch("/api/session", { method: "DELETE" });
    router.replace("/login");
  }
  return <button onClick={logout} className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white hover:bg-slate-700">تسجيل الخروج</button>;
}
