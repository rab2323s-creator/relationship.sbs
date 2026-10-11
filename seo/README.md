# SEO maintenance

## Quiz result indexing

Every page under `/tests/*/results/`, including result profiles and results hubs, must be `noindex,follow`. Results remain publicly accessible and usable, but must never be included in `sitemap.xml`.

The GitHub Actions SEO workflow automatically runs `scripts/noindex_result_pages.py --write` on every push to main, regenerates the sitemap, validates the policy, and commits the generated changes. A pull request checks that result pages have noindex. Never block result pages in robots.txt because crawlers need access to see the noindex directive.

The old `seo/indexable-result-paths.txt` allowlist has been retired.

## Commands

- `python scripts/noindex_result_pages.py --write` — apply noindex to every quiz result page.
- `python scripts/noindex_result_pages.py --check` — fail if any result page could be indexed.
- `python scripts/generate_sitemap.py --write` — include only indexable non-result routes.
- `python scripts/seo_audit.py` — check titles, canonicals, JSON-LD, links, noindex, and sitemap.
