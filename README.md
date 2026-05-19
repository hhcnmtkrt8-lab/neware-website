# NEWARE Website

A modern, full-stack B2B corporate website for Shenzhen Neware Electronics Co., Ltd. — battery testing equipment manufacturer since 1998.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **shadcn/ui**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | SQLite + Drizzle ORM |
| i18n | next-intl (zh/en) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Initialize database

```bash
npx tsx scripts/init-db.ts
```

Default admin credentials: `admin` / `neware2026`

### 3. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n routing (en/zh)
│   │   ├── page.tsx       # Homepage
│   │   ├── products/      # Product catalog
│   │   ├── about/         # About page
│   │   ├── solutions/     # Solutions page
│   │   ├── contact/       # Contact form
│   │   └── admin/         # Admin dashboard
│   └── api/               # API routes
│       ├── contact/       # Contact form handler
│       └── admin/          # Admin API
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/            # Navbar, Footer
│   └── home/             # Homepage sections
├── data/
│   └── neware.ts         # Product & company data
├── i18n/
│   └── messages/          # Translation files (en.json, zh.json)
└── lib/
    ├── db.ts             # SQLite connection
    ├── schema.ts         # Drizzle schema
    └── utils.ts          # Utilities
```

## Features

- Full bilingual support (Chinese / English)
- Product catalog with filtering and search
- Contact form with database persistence
- Admin dashboard for inquiry management
- Responsive design for all devices
- SEO optimized
- Framer Motion animations

## Admin Dashboard

Visit `/en/admin` (or `/zh/admin`) and login with:

- Username: `admin`
- Password: `neware2026`

## Products

- CT-4000 Series — Classic battery testing system
- CT-9000 Series — High-precision flagship (0.02%, 1000Hz)
- CE-6000 / IGBT Series — Energy feedback cyclers
- CT-8000 Series — Driving simulation testers
- CT-3000n Series — Entry-level testers
- Environmental Test Chambers
- Formation & Grading Systems
- LIMS Smart Lab Management
