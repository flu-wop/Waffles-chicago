# Chicago Waffles — Prospect Demo Scope

**Concept lock:** This site should feel like *the first forkful at a loud, sunny Sunday table* — warm, close, a little syrup on your hands.

## What the scan found (chicagowaffles.com, scanned Oct 17 2026)
- 18 real pages + **201 blog posts** (local-SEO pages like `/blog/broadview-restaurants-chicago/`). Redesign must preserve or 301 these URLs.
- 5 locations, each with its own page + menu page. **4 locations share one menu; Willowbrook has a different menu with different prices (92 price differences, 150 vs 158 items).**
- Menus ship as schema.org JSON-LD → scraped with code: **23 sections, 158 items, real prices, descriptions, photos.**
- Hours/addresses/phones per location (Willowbrook closed Tuesdays). Hours in structured data match the contact page.
- 51 real gallery photos (studio dish shots + interiors for West Loop, South Loop, Oak Park, Willowbrook). No Lincoln Square interior photo exists.
- Real gift card art (orange, cream syrup-drip, script wordmark) — strongest brand motif on the whole site, currently buried.
- Facts available on their own site: 14+ years, 1,000,000+ customers, Breakfast Deals Tue/Wed/Thu at all locations, new Southern Grits Bowls, catering serves 15 / pickup 7 days.
- Their site is Next.js built by Web100Now; fonts Readex Pro; palette orange `#FA7D23` / brown `#4D2B24`.

## Build
**Stack:** Next.js 16 App Router · TypeScript · Tailwind v3 · Framer Motion · Lenis (same stack as Fire on the Bayou).
**Mechanics borrowed from Fire on the Bayou:** Lenis smooth scroll, scroll-linked parallax ("antigravity" floating dishes), pinned horizontal rail, magnetic CTAs, film grain, word-reveal headlines.
**Theme:** their palette (cream / brown / orange) + cocoa-dark cinematic sections; Readex Pro + Fraunces italic accent word.

### Routes
| Route | What it does |
|---|---|
| `/` | Floating-dish hero, marquee, pinned signature rail, deals band, order-ahead vignette, locations showcase (live open-now), catering + gift card teasers, parallax gallery, stats |
| `/menu` | Full scraped menu, location switcher (Willowbrook variant), sticky category chips, search, add-to-order |
| `/order` | Mock cart → mock checkout → mock confirmation |
| `/locations`, `/locations/[slug]` | Hours table, open-now, address, phone, directions, map, photos, order-from-here |
| `/catering` | Real copy, how-it-works, mock quote form |
| `/gallery` | 51-photo masonry, filter, lightbox |
| `/gift-cards` | Real card art, amount picker, mock purchase |

### Mocked (not wired)
Ordering, checkout, gift card purchase, reservations, catering quote. Nothing hits Stripe/Toast.

### Not in demo
- 201 blog posts (SEO migration plan needed before launch)
- Catering package prices (loaded from their API, which robots.txt disallows — not scraped)
- Merchandise / Careers (merch page is empty on their site)

## Rules applied
`noindex` on every page · footer line `Designed by IN-FLU-ENTIAL` · client contact details only · no James phone/email · client facts only (no invented awards or deals).

## Ask your sister
1. What exactly does the owner hate about the layout?
2. Lincoln Square interior photo?
3. Who owns the menu redesign, and when is it done?
4. Does ordering run through Toast or their own system?
