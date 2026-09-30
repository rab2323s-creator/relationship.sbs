# SEO maintenance

This directory keeps search-indexing decisions explicit and reviewable.

## Result-page policy

`indexable-result-paths.txt` is the allowlist for quiz result pages that may appear in `sitemap.xml`.

A result page belongs on the allowlist only when it has standalone search value: a distinct search intent, substantial explanatory content, a self-contained canonical URL, and useful internal links. Thin share/result variants should not be added just because they exist.

The sitemap generator never expands result-page indexing automatically.

## Commands

- `python scripts/seo_audit.py` — validates indexable HTML, canonicals, JSON-LD, sitemap/indexability alignment, and reports link/title issues.
- `python scripts/generate_sitemap.py --write` — rebuilds `sitemap.xml` from indexable non-result pages plus the explicit result-page allowlist, using each file's latest Git commit date for `lastmod`.
- `python scripts/generate_sitemap.py --check` — exits non-zero when the committed sitemap differs from the generated version.

The GitHub workflow runs the audit on pull requests. After HTML changes reach `main`, the sitemap regeneration workflow updates `sitemap.xml` automatically when repository permissions allow it.
