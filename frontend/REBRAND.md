# Royal Sumix — Rebrand Guide

This template is built to be rebranded for any hotel client in minutes. Almost
everything lives in data files, never in components.

## 1. Brand, contact & copy (one file)

Edit **`src/config/site.js`**:

- `name`, `monogram`, `tagline`, `description`, `established`
- `contact` — phone, WhatsApp number (digits only, for `wa.me`), email, address, map embed URL
- `hours`, `social` links
- `nav` / `footerNav` — labels and routes
- `languages` / `currencies` — the switcher options (UI-only demo)
- `hero`, `intro`, `quote`, `marquee`, `location`, `newsletter` — all home-page copy and images
- `seo` — title and Open Graph image

Components import from this file — the hotel name is never hard-coded.

## 2. Colors & fonts

- Colors: change the hex values in **`src/index.css`** under `@theme inline`
  (`--color-ivory`, `--color-charcoal`, `--color-ink`, `--color-cream`,
  `--color-gold`, …). The same values are mirrored in `site.js → colors` for reference.
- Fonts: swap the two `@fontsource-variable` imports at the top of `index.css`
  and update `--font-heading` / `--font-sans`. Only two families, per the design system.

## 3. Content data files (`src/data/`)

- `rooms.ts` — rooms & suites (slug, price, size, capacity, amenities, image)
- `offers.ts` — special offers / packages
- `testimonials.ts` — guest quotes
- `gallery.ts` — gallery items with categories (drive the filter tabs)
- `journal.ts` — blog posts

## 4. Images

Replace the Unsplash URLs in `site.js` and `src/data/*` with the client's own
photography (WebP/AVIF preferred, hero under ~400 KB). Keep `alt` text accurate.

## 5. Favicon & SEO

- `public/favicon.svg` — the monogram mark
- `index.html` — `<title>`, meta description, Open Graph tags, JSON-LD Hotel schema
- `public/robots.txt`, `public/sitemap.xml` — update the domain

## 6. Motion system

- Timings/easing: `src/lib/motion.ts` (`EASE`, `DURATION`, `STAGGER`)
- Smooth scroll: `src/lib/useLenis.ts` (Lenis + GSAP ScrollTrigger sync)
- `prefers-reduced-motion` is respected throughout.

## Stack

React 19 + Vite + TypeScript, Tailwind v4, Motion (framer-motion), GSAP
ScrollTrigger, Lenis, react-hook-form, lucide-react. Fully frontend-only:
booking, newsletter and forms are mocked client-side.
