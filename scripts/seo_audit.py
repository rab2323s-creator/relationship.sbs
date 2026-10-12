#!/usr/bin/env python3
"""Static SEO checks for relationship.sbs."""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://relationship.sbs"
SITEMAP = ROOT / "sitemap.xml"

TITLE_RE = re.compile(r"<title\b[^>]*>(.*?)</title>", re.I | re.S)
H1_RE = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.I | re.S)
CANONICAL_RE = re.compile(
    r'<link\b[^>]*\brel=["\']canonical["\'][^>]*\bhref=["\']([^"\']+)["\']',
    re.I,
)
ROBOTS_RE = re.compile(
    r'<meta\b[^>]*\bname=["\']robots["\'][^>]*\bcontent=["\']([^"\']*)["\']',
    re.I,
)
JSONLD_RE = re.compile(
    r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.I | re.S,
)
HREF_RE = re.compile(r'<a\b[^>]*\bhref=["\']([^"\']+)["\']', re.I)
LOC_RE = re.compile(r"<loc>([^<]+)</loc>", re.I)
TAG_RE = re.compile(r"<[^>]+>")


def route_for(path: Path) -> str | None:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if not rel.endswith("/index.html"):
        return None
    return "/" + rel[: -len("index.html")]


def clean_text(value: str) -> str:
    return " ".join(html.unescape(TAG_RE.sub("", value)).split())


def get_one(regex: re.Pattern[str], content: str) -> str | None:
    match = regex.search(content)
    return html.unescape(match.group(1)).strip() if match else None


def is_noindex(content: str) -> bool:
    value = get_one(ROBOTS_RE, content) or ""
    return "noindex" in {token.strip().lower() for token in value.split(",")}


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    title_to_paths: dict[str, list[str]] = {}
    canonical_to_path: dict[str, str] = {}
    existing_routes: set[str] = set()
    indexable_routes: set[str] = set()

    html_files = sorted(ROOT.rglob("index.html"))
    for path in html_files:
        route = route_for(path)
        if route is None:
            continue
        rel = path.relative_to(ROOT).as_posix()
        existing_routes.add(route)
        content = path.read_text(encoding="utf-8")

        title = get_one(TITLE_RE, content)
        h1s = [clean_text(x) for x in H1_RE.findall(content)]
        canonical = get_one(CANONICAL_RE, content)
        noindex = is_noindex(content)
        if "/results/" in route and not noindex:
            errors.append(f"{rel}: all quiz result pages must be noindex")

        if not title:
            errors.append(f"{rel}: missing <title>")
        else:
            title_to_paths.setdefault(clean_text(title), []).append(rel)
            if len(clean_text(title)) > 70:
                warnings.append(f"{rel}: title is long ({len(clean_text(title))} chars)")

        if len(h1s) != 1:
            if "/results/" in route and len(h1s) == 0:
                # Some legacy result templates inject their primary result heading
                # at runtime. Keep that visible as technical debt without blocking
                # unrelated SEO changes.
                warnings.append(f"{rel}: no static H1 (legacy dynamic result template)")
            else:
                errors.append(f"{rel}: expected exactly one static H1, found {len(h1s)}")

        expected_canonical = BASE_URL + route
        if canonical != expected_canonical:
            errors.append(
                f"{rel}: canonical mismatch; expected {expected_canonical}, got {canonical}"
            )
        elif canonical in canonical_to_path:
            errors.append(
                f"{rel}: canonical duplicates {canonical_to_path[canonical]} ({canonical})"
            )
        else:
            canonical_to_path[canonical] = rel

        for block in JSONLD_RE.findall(content):
            try:
                json.loads(html.unescape(block).strip())
            except json.JSONDecodeError as exc:
                errors.append(f"{rel}: invalid JSON-LD ({exc.msg} at line {exc.lineno})")

        if not noindex:
            indexable_routes.add(route)

        for href in HREF_RE.findall(content):
            if not href.startswith("/") or href.startswith("//"):
                continue
            parsed = urlparse(href)
            target = parsed.path
            if not target or target.startswith("/assets/"):
                continue
            if "." in Path(target).name:
                candidate = ROOT / target.lstrip("/")
                if not candidate.exists():
                    errors.append(f"{rel}: broken internal link {href}")
                continue
            normalized = target if target.endswith("/") else target + "/"
            candidate = ROOT / normalized.lstrip("/") / "index.html"
            if normalized == "/":
                candidate = ROOT / "index.html"
            if not candidate.exists():
                errors.append(f"{rel}: broken internal route {href}")

    for title, paths in title_to_paths.items():
        if len(paths) > 1:
            errors.append(f"Duplicate title {title!r}: {', '.join(paths)}")

    sitemap_urls = {
        html.unescape(loc).replace(BASE_URL, "", 1) or "/"
        for loc in LOC_RE.findall(SITEMAP.read_text(encoding="utf-8"))
        if html.unescape(loc).startswith(BASE_URL)
    }

    for route in sorted(sitemap_urls):
        if route not in existing_routes:
            errors.append(f"sitemap: route has no index.html: {route}")
        if route not in indexable_routes:
            errors.append(f"sitemap: route is not indexable: {route}")
        if "/results/" in route:
            errors.append(f"sitemap: result page must be excluded: {route}")

    # Non-result indexable pages should be discoverable through the sitemap.
    for route in sorted(indexable_routes):
        if "/results/" not in route and route not in sitemap_urls:
            warnings.append(f"indexable non-result route missing from sitemap: {route}")

    # Keep the public content registries aligned with their existing routes.
    blog_registry = re.findall(
        r'^\\s*slug:\\s*"([^"]+)"',
        (ROOT / "assets/blog-data.js").read_text(encoding="utf-8"),
        re.M,
    )
    test_registry = re.findall(
        r'^\\s*"slug":\\s*"([^"]+)"',
        (ROOT / "assets/tests-index.js").read_text(encoding="utf-8"),
        re.M,
    )
    blog_routes = {p.parent.name for p in (ROOT / "blog").glob("*/index.html")}
    test_routes = {p.parent.name for p in (ROOT / "tests").glob("*/index.html")}
    for label, registered, actual in (
        ("blog", blog_registry, blog_routes),
        ("tests", test_registry, test_routes),
    ):
        duplicates = sorted({slug for slug in registered if registered.count(slug) > 1})
        for slug in duplicates:
            errors.append(f"{label} registry: duplicate slug {slug}")
        for slug in sorted(actual - set(registered)):
            errors.append(f"{label} registry: missing existing page {slug}")
        for slug in sorted(set(registered) - actual):
            errors.append(f"{label} registry: no page exists for {slug}")

    listed_tests = set(re.findall(
        r'href=["\\\']?/tests/([a-z0-9-]+)/',
        (ROOT / "tests/index.html").read_text(encoding="utf-8"),
    ))
    for slug in sorted(test_routes - listed_tests):
        errors.append(f"tests landing page: missing test link {slug}")

    print(
        f"SEO audit: {len(html_files)} index pages, "
        f"{len(sitemap_urls)} sitemap URLs, "
        f"{len(errors)} errors, {len(warnings)} warnings"
    )
    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}", file=sys.stderr)

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
