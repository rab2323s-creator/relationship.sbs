# relationship.sbs (Vanilla JS)

Static, SEO-friendly, clean-URL site deployed via GitHub Pages.

## Structure
- `/` home
- `/tests/<slug>/` micro-tests (each is an `index.html`)
- `/tools/text-decoder/` simple rule-based helper
- `/blog/<slug>/` short guides
- `/assets/` shared CSS + JS
- `sitemap.xml` + `robots.txt`

## Add a new test
1. Append a new test object in `/assets/tests.js` with a unique `slug`.
2. Create a folder: `/tests/<slug>/index.html` (copy an existing test page and update title/description).

## Deploy
GitHub Pages: Deploy from branch → main → /(root).
