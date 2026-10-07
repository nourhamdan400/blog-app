export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const dict = {
  ar: { brand: "مدونتي", heroTitle: "أحدث المقالات", heroSub: "أفكار وقصص ومعرفة بلغتين", empty: "ما في مقالات بعد", readMore: "اقرأ المزيد", back: "رجوع", dashboard: "لوحة التحكم", login: "تسجيل الدخول", footer: "جميع الحقوق محفوظة" },
  en: { brand: "My Blog", heroTitle: "Latest Posts", heroSub: "Ideas, stories and knowledge in two languages", empty: "No posts yet", readMore: "Read more", back: "Back", dashboard: "Dashboard", login: "Sign in", footer: "All rights reserved" },
} as const;

type P = { titleAr: string; titleEn: string; contentAr: string; contentEn: string; imageAr: string; imageEn: string };
export function pick(p: P, l: Locale) {
  return l === "ar"
    ? { title: p.titleAr, content: p.contentAr, image: p.imageAr }
    : { title: p.titleEn, content: p.contentEn, image: p.imageEn };
}
export const fmtDate = (d: Date, l: Locale) =>
  new Intl.DateTimeFormat(l === "ar" ? "ar" : "en-US", { dateStyle: "long" }).format(d);
