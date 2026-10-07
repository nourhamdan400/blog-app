"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const fields = ["titleAr", "titleEn", "contentAr", "contentEn", "imageAr", "imageEn"] as const;
const parse = (fd: FormData) =>
  Object.fromEntries(fields.map((k) => [k, String(fd.get(k) ?? "").trim()])) as Record<(typeof fields)[number], string>;

export async function createPost(fd: FormData) {
  await requireAdmin();
  await prisma.post.create({ data: parse(fd) });
  revalidatePath("/", "layout");
  redirect("/admin");
}
export async function updatePost(id: number, fd: FormData) {
  await requireAdmin();
  await prisma.post.update({ where: { id }, data: parse(fd) });
  revalidatePath("/", "layout");
  redirect("/admin");
}
export async function deletePost(id: number) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin");
}
