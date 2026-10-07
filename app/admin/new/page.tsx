import PostForm from "@/components/PostForm";
import { createPost } from "../actions";

export default function NewPost() {
  return (<><h1 className="mb-6 text-2xl font-extrabold">مقال جديد</h1><PostForm action={createPost} /></>);
}
