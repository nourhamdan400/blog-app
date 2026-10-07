# Bilingual Blog Pro — Next.js 15 + Tailwind 4 + Prisma + Neon + Firebase Auth

## Setup
1. `npm install`
2. `cp .env.example .env` وعبّي القيم (Neon + Firebase + ADMIN_EMAILS)
3. Firebase Console → Authentication → Sign-in method → فعّل Email/Password، وأضف مستخدم (Add user)
4. `npx prisma migrate dev --name init`
5. `npm run dev`

الموقع: /ar و /en — تسجيل الدخول: /login — لوحة التحكم: /admin
