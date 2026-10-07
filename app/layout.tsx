import "./globals.css";
import { Cairo } from "next/font/google";
import type { Metadata } from "next";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

export const metadata: Metadata = { title: "Bilingual Blog | مدونة", description: "Arabic / English blog" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={cairo.variable}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">{children}</body>
    </html>
  );
}
