"use client";
export default function DeleteButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm("متأكد من الحذف؟ / Delete this post?")) e.preventDefault(); }}>
      <button className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100">حذف</button>
    </form>
  );
}
