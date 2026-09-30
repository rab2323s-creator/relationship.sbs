#!/usr/bin/env python3
"""Generate sitemap.xml from indexable static HTML pages.

Rules:
- Indexable non-result index.html pages are discovered automatically.
- Quiz result pages are included only when explicitly allowlisted in
  seo/indexable-result-paths.txt.
- <lastmod> comes from the latest Git commit touching the page file.
- changefreq/priority are intentionally omitted because Google ignores them.
"""

from __future__ import annotations

import argparse
import html
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://relationship.sbs"
ALLOWLIST = ROOT / "seo" / "indexable-result-paths.txt"
SITEMAP = ROOT / "sitemap.xml"

ROBOTS_RE = re.compile(
    r'<meta\b[^>]*\bname=["\']robots["\'][^>]*\bcontent=["\']([^"\']*)["\']',
    re.I,
)
CANONICAL_RE = re.compile(
    r'<link\b[^>]*\brel=["\']canonical["\'][^>]*\bhref=["\']([^"\']+)["\']',
    re.I,
)


def route_for(path: Path) -> str | None:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if not rel.endswith("/index.html"):
        return None
    return "/" + rel[: -len("index.html")]


def read_allowlist() -> set[str]:
    routes: set[str] = set()
    for raw in ALLOWLIST.read_text(encoding="utf-8").splitlines():
        value = raw.strip()
        if not value or value.startswith("#"):
            continue
        if not value.startswith("/") or not value.endswith("/"):
            raise SystemExit(f"Invalid result allowlist route: {value}")
        routes.add(value)
    return routes


def meta_robots(content: str) -> str:
    match = ROBOTS_RE.search(content)
    return match.group(1).lower() if match else ""


def canonical(content: str) -> str | None:
    match = CANONICAL_RE.search(content)
    return html.unescape(match.group(1)).strip() if match else None


def git_lastmod(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    try:
        value = subprocess.check_output(
            ["git", "log", "-1", "--format=%cs", "--", rel],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        value = ""
    if value:
        return value
    # New/uncommitted files should be rare in CI; fail rather than invent a date.
    raise SystemExit(f"Could not determine lastmod from Git history: {rel}")


def discover() -> list[tuple[str, Path]]:
    allowlisted_results = read_allowlist()
    found_results: set[str] = set()
    pages: list[tuple[str, Path]] = []

    for path in sorted(ROOT.rglob("index.html")):
        route = route_for(path)
        if route is None:
            continue

        content = path.read_text(encoding="utf-8")
        robots = meta_robots(content)
        if "noindex" in {token.strip() for token in robots.split(",")}:
            continue

        canon = canonical(content)
        expected = BASE_URL + route
        if canon != expected:
            raise SystemExit(
                f"Canonical mismatch in {path.relative_to(ROOT)}: "
                f"expected {expected!r}, found {canon!r}"
            )

        is_result = "/results/" in route
        if is_result:
            if route not in allowlisted_results:
                continue
            found_results.add(route)

        pages.append((route, path))

    missing = allowlisted_results - found_results
    if missing:
        formatted = "\n".join(f"  - {route}" for route in sorted(missing))
        raise SystemExit(
            "Allowlisted result routes are missing, noindex, or non-canonical:\n"
            + formatted
        )

    pages.sort(key=lambda item: (item[0] != "/", item[0]))
    return pages


def render() -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for route, path in discover():
        lines.extend(
            [
                "  <url>",
                f"    <loc>{html.escape(BASE_URL + route)}</loc>",
                f"    <lastmod>{git_lastmod(path)}</lastmod>",
                "  </url>",
            ]
        )
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()

    generated = render()

    if args.write:
        SITEMAP.write_text(generated, encoding="utf-8")
        print(f"Wrote {SITEMAP.relative_to(ROOT)}")
        return 0

    current = SITEMAP.read_text(encoding="utf-8")
    if current != generated:
        print(
            "sitemap.xml is not synchronized. Run: "
            "python scripts/generate_sitemap.py --write",
            file=sys.stderr,
        )
        return 1
    print("sitemap.xml is synchronized.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
