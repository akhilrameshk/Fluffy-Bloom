# Fluffy Bloom

Next.js 14 (App Router) + TypeScript + MUI 5 + MongoDB (Mongoose) + Cloudinary.

## Run

    npm install
    cp .env.example .env.local     # fill in the values
    npm run hash -- "your-password"   # paste the output into ADMIN_PASSWORD_HASH
    npm run dev

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- In admin: add Categories, then Products (image upload to Cloudinary), then Settings and SEO.

## SEO included
- `app/sitemap.ts` -> /sitemap.xml (home, products, vision, about, contact, every product; always fresh from MongoDB)
- `app/robots.ts` -> /robots.txt (blocks /admin and /api, links the sitemap)
- Per-page metadata, canonical URLs, Open Graph and Twitter cards (`lib/seo.ts`)
- JSON-LD: store with both branches (all pages), Product + Breadcrumb (product pages) (`lib/schema.ts`)
- Product URLs are slugged (`/products/<name>-<id>`); admin pages are noindex
- Cloudinary images are served with f_auto,q_auto and 4:3 crops
- Set NEXT_PUBLIC_SITE_URL to the live domain, then submit /sitemap.xml in Google Search Console

## Pages
Home, Products (category chips, sort, search, pagination), Product detail, Vision, About Us, Contact Us (inquiry form opens WhatsApp).
Static copy for Vision and About is in `lib/content.ts` (confirm the wording with the client). Opening hours, email, social links, Google Maps links,
founding year and the Vision/About banner images are set in Admin > Settings & SEO; anything left blank is hidden on the site.
No ratings or reviews are shown (the draft design had sample ratings; add real ones only if you collect them).

## Structure
- `components/` reusable UI: PillButton, WhatsAppButton, CallButton, Section, Breadcrumb, HeroSplit, InfoCard, ProductImage, ProductCard, CardRow, ProductRow, BranchCard, InquiryForm, JsonLd
- `components/admin/` AdminPage, FormPanel, ItemRow, ImageUpload; `hooks/useCrud.ts` powers every admin list
- `lib/crud.ts` generic REST handlers used by the categories and products API routes
- Logo: text logo in `components/Logo.tsx`; swap for your logo image if you like
