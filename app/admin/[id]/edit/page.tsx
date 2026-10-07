import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import { prisma } from "@/lib/prisma";
import { updatePost } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) notFound();
  return (<><h1 className="mb-6 text-2xl font-extrabold">تعديل المقال</h1><PostForm action={updatePost.bind(null, post.id)} post={post} /></>);
}
