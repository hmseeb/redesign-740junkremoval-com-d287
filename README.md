# 740 Junk Removal LLC — Website

A complete redesign of the 740 Junk Removal website. Junk removal and trailer
rentals serving Circleville, Ohio and the surrounding communities.

## Stack

Vanilla HTML, CSS and JavaScript. No build step, no dependencies, no
environment variables. Open `index.html` or serve the folder statically.

```bash
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Single-page site with semantic sections and JSON-LD structured data |
| `styles.css` | Design system (tokens, layout, components) and responsive rules |
| `script.js` | Sticky header, mobile nav, FAQ accordion, gallery lightbox, scroll reveal, form validation |
| `favicon.svg` | Site icon |
| `robots.txt` / `sitemap.xml` | Basic SEO files |

## Sections

Hero · About · Services · How It Works · Why Us · Gallery · Service Areas ·
FAQs · Contact · Closing CTA · Footer

## Business details

- **Phone / text:** (740) 248-2127
- **Location:** Circleville, OH, USA
- **Services:** Full-service junk removal, trailer rentals, property and estate
  cleanouts, eco-friendly disposal (recycling and donation)

## Images

Authentic photos of the business's own trailers, dumpsters and before/after
cleanouts are reused from the original site. One generic stock image on the
original site (the "Eco-Friendly Disposal" tile) was replaced with a
contextually relevant recycling drop-off photo from Pexels.

The quote form has no backend: it validates input and hands off to the
business's SMS line so leads still reach the owner.
