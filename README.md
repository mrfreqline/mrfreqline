# ⚡ MRFREQLINE — Ultimate Tech, AI Prompts & Gaming Hub

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mrfreqline.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Live Website:** [https://mrfreqline.vercel.app](https://mrfreqline.vercel.app)

**MRFREQLINE** is a high-performance web platform built for creators, gamers, and tech enthusiasts. It aggregates the best free web tools, curated AI prompts, PC optimization software, scam alerts, and gaming resources — all powered by a modern Next.js 14 App Router stack with real-time Supabase integrations.

---

## 🌟 Key Features

- 🧠 **AI Prompts Vault (`/prompts`)**: High-converting, battle-tested prompt collection for ChatGPT, Midjourney, Claude, Gemini, and coding models. Features instant 1-click copy, tag filtering, search, and view/like tracking.
- ⚡ **PC Optimization Hub (`/tech/best-pc-optimization-tools`)**: Curated latency-reduction tools, FPS boosters, Windows debloaters, and diagnostic suites.
- 🌐 **Best Free Websites Directory (`/resources/best-free-websites`)**: Zero-cost, high-utility websites across design, development, productivity, and utilities.
- 🛠️ **Essentials Toolkit (`/resources/essentials-toolkit`)**: A curated survival kit for developers, students, and digital creators.
- 🎮 **Gaming Resources (`/gaming/free-resources`)**: Free game assets, crosshairs, audio optimizers, and esports performance tweaks.
- ⭐ **Community Reviews (`/reviews`)**: Real-time feedback and rating system (1 to 5 stars) with dynamic aggregate rating calculations and user testimonials.
- 🚨 **Tech News & Scam Alerts (`/news`)**: Practical cybersecurity advisories, phishing breakdowns, and safe computing advice.
- 🔒 **Secure Admin Control Panel (`/admin`)**: Password-protected dashboard to manage prompts, review submissions, and delete moderation items with direct WhatsApp quick-actions.
- 💰 **Configurable Monetization**: Modular Adsterra banner system with an instant global kill-switch (`NEXT_PUBLIC_SHOW_ADS`).
- 🚀 **SEO & Performance Optimized**: Full JSON-LD structured schema, dynamic OpenGraph metadata, `robots.txt`, and automated `sitemap.xml`.

---

## 🗺️ Route Directory

```text
mrfreqline/
├── app/
│   ├── page.tsx                           # Homepage (Hero + 3 Glowing Feature Portals)
│   ├── layout.tsx                         # Global layout, Fonts, Analytics & Metadata
│   ├── Header.tsx                         # Sticky Navbar with responsive drawer
│   ├── Footer.tsx                         # Global footer with navigation & socials
│   │
│   ├── prompts/page.tsx                   # AI Prompts Vault (Database Driven)
│   ├── tech/
│   │   └── best-pc-optimization-tools/    # Curated PC Tools & FPS Boosters
│   ├── resources/
│   │   ├── best-free-websites/            # Curated Free Web Tools Directory
│   │   └── essentials-toolkit/            # Essential Creator Toolkit
│   ├── gaming/
│   │   └── free-resources/                # Free Gaming Tweaks & Tools
│   ├── reviews/page.tsx                   # Community Reviews & Star Rating System
│   ├── news/page.tsx                      # Scam Alerts & Tech News
│   ├── contact/page.tsx                   # Contact Form & Social Links
│   ├── donate/page.tsx                    # Support & Donations (UPI / Crypto / Links)
│   ├── admin/page.tsx                     # Protected Admin Dashboard
│   │
│   ├── api/
│   │   ├── prompts/route.ts               # Prompts CRUD API
│   │   └── reviews/route.ts               # Reviews Public Submit & Admin Delete API
│   │
│   └── components/
│       └── AdsterraBanner.tsx             # Monetization Ad Container (Master Toggle)
└── public/
    ├── sitemap.xml                        # Search engine index mapping
    ├── robots.txt                         # Web crawler instructions
    └── favicon.ico                        # Site favicon
