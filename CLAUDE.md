# CLAUDE.md — BlogSpark AI Agent Instructions

> **BlogSpark** is a statically-generated, SEO-first personal engineering blog built for minimal server footprint and maximum performance. Target audience: developers, SREs, and platform engineers.

---

## 1. Project Identity

| Key | Value |
|-----|-------|
| **Name** | BlogSpark |
| **Type** | Static personal blog (SSG) |
| **Framework** | Next.js 16 (App Router, React 19, Turbopack) |
| **Styling** | Tailwind CSS v4 (PostCSS plugin) |
| **Language** | TypeScript 5 (strict mode) |
| **Font** | Recursive (Google Fonts, variable) |
| **Icons** | lucide-react |
| **Markdown** | remark + rehype pipeline (GFM, pretty-code via Shiki, slug, autolink-headings) |
| **Deploy** | Docker multi-stage → `node server.js` (standalone output, ~50 MB image) |
| **Content** | File-based: `public/static/<slug>/_config.yaml` + `_main.md` |

---

## 2. Architecture Overview

```
blogspark/
├── app/                        # Next.js App Router (all routes)
│   ├── layout.tsx              # Root layout (font, html lang, global CSS)
│   ├── page.tsx                # Homepage (SSG, force-static)
│   ├── post/[id]/page.tsx      # Post detail (SSG via generateStaticParams)
│   ├── tag/[tagName]/page.tsx  # Tag filter page (SSG via generateStaticParams)
│   ├── search/                 # Client-side search (fetches /api/posts at runtime)
│   │   ├── page.tsx            # Suspense wrapper
│   │   └── SearchPage.tsx      # "use client" — search UI
│   ├── pages/                  # Shared page-level server components
│   │   ├── Home.tsx            # Homepage content (posts grid + sidebar)
│   │   └── PostDetail.tsx      # Post renderer (markdown → HTML)
│   └── api/posts/route.ts      # GET /api/posts — static JSON (s-maxage=1yr)
├── components/                 # Server components (no "use client")
│   ├── BlogCard.tsx            # Post card with deterministic tag colors
│   ├── Footer.tsx              # Site footer (reads siteConfig)
│   ├── Navbar.tsx              # "use client" — nav + search input
│   └── Sidebar.tsx             # Tag cloud sidebar
├── components_client/          # Explicit client components
│   └── BlogScrollEffect.tsx    # Scroll-to-top on post navigation
├── libs/
│   └── cache.tsx               # React cache() data layer — reads filesystem once per build
├── types/
│   └── types.ts                # PostMetadata, Post, SiteConfig interfaces
├── public/
│   ├── about.me.json           # Site author config (name, bio, socials)
│   ├── assets/                 # Static assets (images)
│   └── static/                 # Blog content directory
│       └── <slug>/
│           ├── _config.yaml    # Post metadata (title, dates, summary, tags, catalog)
│           └── _main.md        # Post body (Markdown + optional frontmatter)
├── Dockerfile                  # Multi-stage: deps → build → standalone runner
├── next.config.ts              # standalone output, .md page extensions, Turbopack raw-loader
├── tsconfig.json               # strict, bundler resolution, @/* path alias
└── package.json                # yarn-based, no lock committed (use yarn.lock)
```

---

## 3. Content Model

### Adding a new post

1. Create `public/static/<slug>/` directory (slug = kebab-case, URL-safe)
2. Add `_config.yaml`:
   ```yaml
   title: "Human-readable title"
   createdAt: "2026-01-26T00:00:00Z"    # ISO 8601
   modifiedAt: "2026-01-26T00:00:00Z"
   summary: |
     One-paragraph summary for cards and SEO meta description.
   tags:
     - "Kubernetes"
     - "Platform Engineering"
   catalog: "blog"                       # category grouping
   ```
3. Add `_main.md` — standard Markdown (GFM supported). Optional gray-matter frontmatter is stripped before rendering.

### Content loading

`libs/cache.tsx` uses React `cache()` to read all posts from disk **once per build**. All downstream functions (`getAllPosts`, `getPostInfo`, `getPostContent`, `getSortedTags`, `getSiteConfig`) derive from this single cached load. **Never bypass this layer** — always import from `@/libs/cache`.

---

## 4. Rendering Strategy

| Route | Strategy | Reason |
|-------|----------|--------|
| `/` | `force-static` (SSG) | Zero runtime cost, CDN-cacheable |
| `/post/[id]` | `force-static` + `generateStaticParams` | Pre-rendered at build time |
| `/tag/[tagName]` | `force-static` + `generateStaticParams` | Pre-rendered per tag |
| `/search` | Client-side (CSR) | Fetches `/api/posts` then filters in-browser |
| `/api/posts` | `force-static` | Returns JSON with `s-maxage=31536000` |

**Rule:** Every new page MUST be `force-static` unless it requires user-specific runtime data. Never use `force-dynamic` or ISR — this blog has no database and runs on minimal infra.

---

## 5. SEO Requirements (Non-Negotiable)

### Every page MUST have:
- Unique `<title>` tag (≤60 chars) — use Next.js `metadata` export or `generateMetadata()`
- `<meta name="description">` (≤155 chars, derived from post summary)
- Canonical URL via `metadataBase` + `alternates.canonical`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:image`, `og:url`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- `<html lang="en">` (already set in root layout)

### Every post page (`/post/[id]`) MUST include:
- JSON-LD structured data (`BlogPosting` schema):
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "<title>",
    "datePublished": "<createdAt>",
    "dateModified": "<modifiedAt>",
    "author": { "@type": "Person", "name": "<author>" },
    "description": "<summary>",
    "url": "<canonical URL>",
    "keywords": ["<tag1>", "<tag2>"]
  }
  ```

### Site-level SEO artifacts:
- `sitemap.xml` — auto-generated via Next.js `app/sitemap.ts` (list all posts + tag pages)
- `robots.txt` — via `app/robots.ts` (allow all, reference sitemap)
- Descriptive kebab-case URLs (already using slug-based `[id]`)

### Image SEO:
- All `<img>` tags MUST have meaningful `alt` attributes
- Prefer Next.js `<Image>` component for automatic WebP/AVIF, srcset, lazy loading
- Avatar and post images should specify `width` and `height` to prevent CLS

---

## 6. Performance Optimization Rules

### Core Web Vitals targets:
- **LCP** < 2.0s (static pages should hit < 1.0s)
- **FID / INP** < 100ms
- **CLS** < 0.05

### Build & bundle:
- `output: 'standalone'` — produces self-contained server (~15 MB node_modules)
- Tree-shake unused lucide icons (import individually: `import { Github } from 'lucide-react'` ✓)
- Never import entire libraries when only a few functions are needed
- Keep client components (`"use client"`) to an absolute minimum — only for interactivity
- Current client components: `Navbar.tsx`, `SearchPage.tsx`, `BlogScrollEffect.tsx`

### Caching:
- React `cache()` in `libs/cache.tsx` — deduplicates filesystem reads within a single render pass
- `/api/posts` returns `Cache-Control: s-maxage=31536000, stale-while-revalidate`
- Static assets in `public/` are served with immutable cache headers by Next.js

### CSS:
- Tailwind v4 with PostCSS plugin — purges unused styles at build time
- Prefer Tailwind utility classes over custom CSS
- Use CSS animations over JS animations (already using `transition-all`, `hover:` states)
- Avoid `will-change` unless measured and necessary

### Fonts:
- `next/font/google` with `Recursive` — self-hosted, no external requests, `font-display: swap` by default
- Single font family with variable weight — no additional font files

### Docker (small server optimization):
- Base image: `node:20-alpine` (~50 MB)
- Multi-stage build: `deps` → `builder` → `runner`
- Runner stage copies ONLY: `.next/standalone`, `.next/static`, `public/`
- Final image should be < 150 MB
- `ENV NODE_ENV=production` — enables Next.js production optimizations
- Expose port 3000, run `node server.js`

---

## 7. Code Conventions

### TypeScript:
- Strict mode enabled — never use `any` (replace `any` with proper types)
- Use interfaces for data shapes (see `types/types.ts`)
- Path alias: `@/*` maps to project root — always use `@/` imports
- Prefer `async/await` over `.then()` chains

### Components:
- **Server components by default** — place in `components/`
- **Client components only when needed** — place in `components_client/`, must have `"use client"` directive
- Use `React.FC<Props>` for typed function components
- Async server components can directly `await` data fetching functions

### File naming:
- Components: `PascalCase.tsx`
- Utilities/libs: `camelCase.tsx`
- Route files: `page.tsx`, `layout.tsx`, `route.ts` (Next.js conventions)
- Types: `types.ts` in `types/` directory

### Styling:
- Tailwind utility-first — no `styled-components`, no CSS modules
- Design tokens via CSS custom properties in `globals.css` (`:root`)
- Rounded corners: use `rounded-2xl` or `rounded-[2rem]` for card-like elements
- Color palette: zinc-based neutrals (`zinc-900` for text, `zinc-400` for muted, `zinc-100` for borders)
- Tag colors: deterministic hash-based from `BlogCard.tsx` `getTagStyles()` — do not randomize

### Error handling:
- Wrap filesystem operations in try/catch (see `cache.tsx`)
- Log errors with emoji prefix for visibility: `console.error("❌ Failed to...")`
- Return graceful fallbacks (empty arrays, "Post Not Found" UI)

---

## 8. UI/UX Principles

### Target user: Developer / SRE / Platform Engineer
- Clean, minimal, content-focused design — no visual clutter
- Fast-loading, text-heavy layout — respect reader's time
- Monospace/variable font (Recursive) for technical feel
- High contrast text (`zinc-900` on `#fcfcfc` background)
- Card-based post layout with clear hierarchy (title → summary → tags → date)

### Layout structure:
- Homepage: full-width header → stats bar → 9/3 grid (posts + sidebar)
- Post detail: centered narrow column (`max-w-3xl`), article semantics
- Search: full-width input + results list
- Tag pages: same layout as homepage, filtered

### Interaction patterns:
- Hover effects on cards: `hover:shadow-xl`, scale on tags (`hover:scale-[1.02]`)
- Smooth transitions: `transition-all duration-500 ease-out`
- Back navigation arrow with hover animation (`group-hover:-translate-x-1`)
- Scroll-to-top on post navigation (via `BlogScrollEffect`)
- Search: client-side filtering with immediate feedback (no debounce needed for small datasets)

### Accessibility:
- Semantic HTML: `<article>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<header>`
- All interactive elements must be keyboard-accessible
- Color contrast ratios must meet WCAG 2.1 AA
- Images must have `alt` attributes
- Form inputs must have associated labels or `placeholder` text

---

## 9. Markdown Rendering Pipeline

PostDetail uses this pipeline (order matters):

```
raw markdown → gray-matter (strip frontmatter)
             → remark()
               .use(remarkGfm)          # tables, strikethrough, task lists
               .use(html)               # convert to HTML string
               .use(rehypePrettyCode)   # syntax highlighting via Shiki
               .use(rehypeSlug)         # add id to headings
               .use(rehypeAutolinkHeadings)  # clickable heading anchors
             → HTML string → dangerouslySetInnerHTML
```

Rendered HTML is styled via `.markdown` class in `globals.css` with Tailwind `@apply` directives.

**Rules:**
- Never change the plugin order without testing rendering output
- All new markdown features must be styled in `globals.css` under `.markdown`
- Code blocks use Shiki (server-side highlighted) — no client-side syntax highlighter
- Tables, images, lists, headings all have explicit styles

---

## 10. Adding New Features — Checklist

Before implementing any new feature:

- [ ] Is it statically renderable? → Use `force-static` + `generateStaticParams`
- [ ] Does it need client interactivity? → Create in `components_client/` with `"use client"`
- [ ] Does it fetch data? → Go through `libs/cache.tsx`, never read filesystem directly
- [ ] Does it add a new route? → Add SEO metadata (`generateMetadata` or `metadata` export)
- [ ] Does it add a new dependency? → Check bundle size impact, prefer tree-shakeable packages
- [ ] Does it affect Docker image? → Ensure standalone output still works, test `docker build`
- [ ] Does it change the content model? → Update `PostMetadata` interface in `types/types.ts`
- [ ] Does it add images? → Use Next.js `<Image>`, add `alt`, specify dimensions

---

## 11. Infrastructure & Deployment

### Docker build:
```bash
docker build -t blogspark .
docker run -p 3000:3000 blogspark
```

### Local development:
```bash
yarn install
yarn dev          # Turbopack dev server on http://localhost:3000
yarn build        # Production build (SSG)
yarn start        # Serve production build
yarn lint         # ESLint
```

### Resource expectations (standalone mode):
- **Memory:** < 64 MB RSS at idle (Node.js serves pre-rendered HTML)
- **CPU:** Negligible (no SSR at runtime, all pages pre-built)
- **Disk:** < 150 MB Docker image
- **Startup:** < 2s cold start
- Suitable for: single-core VPS, ARM instances, fly.io free tier, Railway, Render

### Health & observability:
- Monitor `/api/posts` as a basic health check (returns 200 + JSON)
- Log format: plain text to stdout (container-friendly)
- No external runtime dependencies (no database, no Redis, no external APIs)

---

## 12. Absolute Rules (Never Break These)

1. **Never use `force-dynamic`** — this is a static blog, every page is pre-rendered
2. **Never add a database** — content lives in `public/static/` as flat files
3. **Never add authentication** — this is a public read-only blog
4. **Never use `getServerSideProps`** — App Router only, use `generateStaticParams`
5. **Never import from `fs` outside `libs/cache.tsx`** — single data access layer
6. **Never add client-side state management libraries** (Redux, Zustand) — unnecessary for a blog
7. **Never use `useEffect` for data that can be fetched server-side** — prefer RSC
8. **Never skip SEO metadata** on any public-facing page
9. **Never use inline styles** except for one-off overrides that Tailwind cannot express
10. **Keep the Docker image under 200 MB** — if a dependency pushes it over, find an alternative
11. **Every page must score 90+ on Lighthouse** (Performance, SEO, Accessibility, Best Practices)
12. **Zero JavaScript shipped to client** for pages that don't need interactivity