#!/usr/bin/env python3
"""Keep quiz result pages accessible but non-indexable."""
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESULTS = ROOT / "tests"
META = re.compile(r'<meta\b[^>]*\bname=["\']robots["\'][^>]*>', re.I)
HEAD = re.compile(r'<head(?:\s[^>]*)?>', re.I)
CONTENT = re.compile(r'\bcontent\s*=\s*(["\'])(.*?)\1', re.I | re.S)
NOINDEX = '<meta name="robots" content="noindex,follow" />'


def desired(text: str) -> str:
    match = META.search(text)
    if match:
        existing = match.group(0)
        attr = CONTENT.search(existing)
        if not attr:
            raise ValueError("robots meta tag is missing a content attribute")
        directives = [x.strip() for x in attr.group(2).split(",") if x.strip()]
        directives = [x for x in directives if x.lower() not in {"index", "noindex"}]
        directives.insert(0, "noindex")
        if not any(x.lower() == "follow" for x in directives):
            directives.append("follow")
        replacement = CONTENT.sub('content="' + ",".join(directives) + '"', existing, count=1)
        return text[:match.start()] + replacement + text[match.end():]
    if not HEAD.search(text):
        raise ValueError("missing HTML head")
    return HEAD.sub(lambda m: m.group(0) + "\n  " + NOINDEX, text, count=1)


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--write", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()
    pages = sorted(RESULTS.glob("*/results/**/index.html"))
    if not pages:
        raise SystemExit("No result pages found")
    changed = 0
    for path in pages:
        original = path.read_text(encoding="utf-8")
        updated = desired(original)
        if updated != original:
            changed += 1
            if args.write:
                path.write_text(updated, encoding="utf-8")
            else:
                print(f"Needs noindex: {path.relative_to(ROOT)}")
    print(f"Result pages: {len(pages)}, changes needed/applied: {changed}")
    return 1 if changed and args.check else 0


if __name__ == "__main__":
    raise SystemExit(main())
