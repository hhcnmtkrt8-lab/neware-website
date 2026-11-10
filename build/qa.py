#!/usr/bin/env python3
"""Post-build QA gates. Exits non-zero on failure.

    python build/qa.py
"""
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {"templates", "build", ".git"}

pages = []
for p in ROOT.rglob("*.html"):
    if SKIP_DIRS & set(p.relative_to(ROOT).parts):
        continue
    pages.append(p)

fails = []
warns = []


def rel(p):
    return p.relative_to(ROOT).as_posix()


if len(pages) < 40:
    fails.append(f"only {len(pages)} generated pages")

for p in pages:
    html = p.read_text(encoding="utf-8")
    name = rel(p)
    is_404 = p.name == "404.html"

    # one h1 (404 is a utility page, not indexed)
    h1 = len(re.findall(r"<h1[\s>]", html))
    if h1 != 1 and not is_404:
        fails.append(f"{name}: {h1} h1 tags")

    # canonical
    if '<link rel="canonical"' not in html and not is_404:
        fails.append(f"{name}: no canonical")

    # malformed attributes (a class="..." immediately followed by text)
    if re.search(r'class="[^"]*"(?=[^\s>])', html):
        fails.append(f"{name}: malformed attribute after class=")

    # css hash reference
    if not re.search(r'assets/css/site\.[0-9a-f]{10}\.css', html):
        warns.append(f"{name}: unhashed stylesheet")

    # js hash reference
    if not re.search(r'assets/js/app\.[0-9a-f]{10}\.js', html) and not is_404:
        warns.append(f"{name}: unhashed script")

    # JSON-LD parses
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            json.loads(block)
        except Exception as e:
            fails.append(f"{name}: bad JSON-LD ({e})")

    # internal links exist
    for href in re.findall(r'(?:href|src)="([^"]+)"', html):
        if href.startswith(("http", "mailto:", "tel:", "#", "data:")):
            continue
        target = (p.parent / urlparse(href).path).resolve()
        if not str(target).startswith(str(ROOT)):
            continue
        if not target.exists():
            fails.append(f"{name}: broken link {href}")

# button style inventory
btn_patterns = set()
for p in pages:
    html = p.read_text(encoding="utf-8")
    for cls in re.findall(r'class="(btn[^"]*)"', html):
        btn_patterns.add(" ".join(sorted(cls.split())))
print("button classes:", sorted(btn_patterns))
if len(btn_patterns) > 2:
    warns.append(f"{len(btn_patterns)} button class variants: {sorted(btn_patterns)}")

# generated artefacts
for f in ("sitemap.xml", "robots.txt", "llms.txt", ".htaccess", "404.html"):
    if not (ROOT / f).exists():
        fails.append(f"missing {f}")

sm = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
loc_count = len(re.findall(r"<loc>", sm))
if loc_count < 40:
    fails.append(f"sitemap has only {loc_count} urls")

print(f"pages: {len(pages)}  sitemap urls: {loc_count}")
for w in warns:
    print("WARN ", w)
for f in fails:
    print("FAIL ", f)
print("QA:", "FAIL" if fails else "PASS")
sys.exit(1 if fails else 0)
