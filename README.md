# UYZN — Youth Opportunities in Ghana

A modern web app that helps young people in Ghana discover **Jobs**, **Scholarships**, **Graduate Trainee** programs, and **National Service (NSS)** placements. Includes role-based dashboards for applicants and employers/sponsors.

## ✨ Key features
- Search & filter verified opportunities
- Save & track applications
- Applicant profile (CV, education, skills)
- Employer/Sponsor portal (post/manage opportunities)
- Notifications (email/SMS/WhatsApp-ready)
- Admin tools (moderation, analytics-ready)
- SEO-ready pages and share images (OG)

## 🧱 Tech stack
- **Frontend:** React + Vite, React Router, Tailwind CSS, React Hook Form + Zod, TanStack Query (React Query)
- **API:** Works with any REST backend (set `VITE_API_BASE_URL`)
- **Auth:** Token-based (e.g., JWT) — plug in your backend
- **Charts (optional):** Recharts / Nivo
- **Deploy:** Vercel (recommended) or Netlify for the frontend

> If you’re using a Django, Node/Express, or Laravel API, just point the frontend to it via `VITE_API_BASE_URL`.

## ⚙️ Getting started

### 1) Prerequisites
- Node.js v18+ and npm (or pnpm/yarn)

### 2) Clone & install
```bash
git clone https://github.com/Leslie-wq39/uyzn.git
cd uyzn
npm install
