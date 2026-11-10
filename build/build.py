#!/usr/bin/env python3
"""
Cellaris static site builder — single orchestrator.

    python build/build.py

Reads
  build/content/base.json     products, nav, footer, family labels
  templates/src/<lang>/*.html page bodies (extracted once from the previous build)
Writes
  index.html, *.html, products/*.html, ru/, es/
  sitemap.xml, robots.txt, llms.txt, .htaccess, 404.html
  assets/css/site.<hash>.css
  assets/img/*-480.webp / *-960.webp
Never hand-edit generated files: change the data or this script, then rebuild.
"""
import hashlib
import html as H
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / "build"
CONTENT = BUILD / "content"
TPL = ROOT / "templates" / "src"
JS_FILE = "assets/js/app.js"
MODELS_CACHE = []

SITE = {
    "name": "Cellaris Instruments",
    "url": "https://sienna-turtle-284445.hostingersite.com",
    "legal": "Cellaris Instruments",
    "email": "info@cellaris-instruments.com",
    "manufacturer": "Neware Technology",
    "founded": "1998",
}

# ---------------------------------------------------------------- page copy
PAGE_META = {
    "en": {
        "index": ("Cellaris Instruments — Research-grade battery test systems",
                  "Four-range battery test systems at ±0.02% F.S., 150 µs current response and open data. Built for laboratories that publish.", "", "home"),
        "products": ("Instruments — Cellaris",
                     "Battery test systems from microamp cell cycling to 1500 V pack testing: ranges, channel counts, accuracy and energy recovery.", "products.html", "products"),
        "compare": ("Compare — Cellaris",
                    "An application-based mapping from Arbin, Maccor, BioLogic and Chroma platforms to Cellaris configurations, plus eight questions for any vendor.", "compare.html", "compare"),
        "applications": ("Applications — Cellaris",
                         "Test configurations for materials research, solid-state and pressure work, DCIR/HPPC characterisation, and formation and grading.", "applications.html", "applications"),
        "science": ("Science — Cellaris",
                    "Application notes and method notes on battery measurement: range architecture, coulombic efficiency, DCIR and data provenance.", "science.html", "science"),
        "software": ("Software & data — Cellaris",
                     "BTS control software with open data: CSV, XLSX, SQL Server, PostgreSQL, REST API and a Python client. No per-seat licence.", "software.html", "software"),
        "support": ("Support & downloads — Cellaris",
                    "Datasheets, manuals, calibration intervals, spare fixtures and service information for Cellaris battery test systems.", "support.html", "support"),
        "about": ("Company — Cellaris",
                  "Cellaris Instruments: research-grade battery test systems engineered and manufactured by Neware Technology. Offices in Fremont, Aachen and Hong Kong.", "about.html", "about"),
        "contact": ("Contact — Cellaris",
                    "Contact Cellaris in Fremont, Aachen or Hong Kong. Send a test protocol and receive a configuration and delivered price.", "contact.html", "contact"),
    },
    "ru": {
        "index": ("Cellaris Instruments — испытательные системы для аккумуляторов",
                  "Четырёхдиапазонные испытательные системы: ±0,02 % от шкалы, отклик по току 150 мкс, открытые данные. Для лабораторий, которые публикуются.", "", "home"),
        "products": ("Приборы — Cellaris",
                     "Испытательные системы от микроамперных ячеек до сборок 1500 В: диапазоны, число каналов, точность и рекуперация энергии.", "products.html", "products"),
        "compare": ("Сравнение — Cellaris",
                    "Сопоставление платформ Arbin, Maccor, BioLogic и Chroma с конфигурациями Cellaris и восемь вопросов любому поставщику.", "compare.html", "compare"),
    },
    "es": {
        "index": ("Cellaris Instruments — sistemas de ensayo de baterías de precisión",
                  "Sistemas de cuatro rangos con ±0,02 % de escala, respuesta de corriente de 150 µs y datos abiertos. Para laboratorios que publican.", "", "home"),
        "products": ("Instrumentos — Cellaris",
                     "Sistemas de ensayo desde celdas de microamperios hasta packs de 1500 V: rangos, canales, precisión y recuperación de energía.", "products.html", "products"),
        "compare": ("Comparativa — Cellaris",
                    "Mapeo por aplicación desde Arbin, Maccor, BioLogic y Chroma hacia configuraciones Cellaris, y ocho preguntas para cualquier proveedor.", "compare.html", "compare"),
    },
}

NAV_EXTRA = {
    "en": [("Contact", "contact.html")],
    "ru": [("Контакты", "../contact.html")],
    "es": [("Contacto", "../contact.html")],
}

PRODUCT_LABELS = {
    "en": {"dut": "DUT", "volt": "Voltage", "curr": "Current", "ranges": "Ranges", "channels": "Channels",
           "acc": "Accuracy", "resp": "Current response", "log": "Data logging", "regen": "Energy recovery",
           "quote": "Request a quote", "docs": "Datasheet & manuals", "specs": "Full specification",
           "note": "Full specifications, calibration certificates and configuration options are provided with the quotation.",
           "series": "series", "back": "All instruments", "related": "Related instruments",
           "price": "Price on request", "lead": "Typical delivery 4–8 weeks"},
    "ru": {"dut": "Объект испытаний", "volt": "Напряжение", "curr": "Ток", "ranges": "Диапазоны", "channels": "Каналы",
           "acc": "Точность", "resp": "Отклик по току", "log": "Регистрация", "regen": "Рекуперация",
           "quote": "Запросить цену", "docs": "Datasheet и руководства", "specs": "Полная спецификация",
           "note": "Полные характеристики, свидетельства о поверке и опции конфигурации предоставляются с коммерческим предложением.",
           "series": "серия", "back": "Все приборы", "related": "Похожие приборы",
           "price": "Цена по запросу", "lead": "Поставка 4–8 недель"},
    "es": {"dut": "Objeto de ensayo", "volt": "Voltaje", "curr": "Corriente", "ranges": "Rangos", "canales": "Canales", "channels": "Canales",
           "acc": "Precisión", "resp": "Respuesta de corriente", "log": "Registro", "regen": "Recuperación",
           "quote": "Solicitar precio", "docs": "Ficha técnica y manuales", "specs": "Especificación completa",
           "note": "La especificación completa, los certificados de calibración y las opciones de configuración se entregan con la oferta.",
           "series": "serie", "back": "Todos los instrumentos", "related": "Instrumentos relacionados",
           "price": "Precio a consultar", "lead": "Entrega habitual 4–8 semanas"},
}

FAMILY_LEADS = {
    "en": {},
    "ru": {
        "cell": "Ячейки: монетные, мягкие, цилиндрические и призматические — от микроампер до 300 А.",
        "module": "Модули и небольшие сборки: 48–96 В с вспомогательными каналами.",
        "pack": "Сборки: рекуперативные каналы до 1500 В и 3000 В.",
        "chamber": "Климатические камеры и универсальные установки для испытаний при контролируемой температуре.",
        "fixture": "Оснастка и вспомогательные каналы: ток до 600 А, давление, температура.",
    },
    "es": {
        "cell": "Celdas: moneda, bolsa, cilíndricas y prismáticas, desde microamperios hasta 300 A.",
        "module": "Módulos y packs pequeños: 48–96 V con canales auxiliares.",
        "pack": "Packs: canales regenerativos hasta 1500 V y 3000 V.",
        "chamber": "Cámaras climáticas y sistemas todo en uno para ensayo a temperatura controlada.",
        "fixture": "Utillaje y canales auxiliares: hasta 600 A, presión y temperatura.",
    },
}

FAMILY_NAME = {"cell": "Cell testers", "module": "Module testers", "pack": "Pack testers",
               "chamber": "Chambers", "fixture": "Fixtures & auxiliary"}

# ---------------------------------------------------------------- helpers
def esc(s):
    return H.escape(str(s), quote=True)

def load_base():
    return json.loads((CONTENT / "base.json").read_text(encoding="utf-8"))

def css_hash():
    data = (ROOT / "assets" / "css" / "site.css").read_bytes()
    return hashlib.md5(data).hexdigest()[:10]

def out_path(lang, rel):
    base = ROOT if lang == "en" else ROOT / lang
    return base / rel if rel else base / "index.html"

def prefix(lang, deep=False):
    if lang == "en":
        return "../" if deep else ""
    return "../../" if deep else "../"


def fix(href, p):
    if href.startswith(("http", "#", "mailto:", "tel:", "data:")):
        return href
    if href.startswith("../"):
        href = href[3:]
    return p + href

def url_for(lang, rel):
    p = "" if lang == "en" else f"/{lang}/"
    return SITE["url"] + p + rel

SCHEMA_ORG = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE["name"],
    "url": SITE["url"],
    "logo": SITE["url"] + "/assets/img/logo_comcn.png",
    "email": SITE["email"],
    "foundingDate": SITE["founded"],
    "manufacturer": {"@type": "Organization", "name": SITE["manufacturer"]},
    "address": [
        {"@type": "PostalAddress", "addressLocality": "Fremont", "addressRegion": "CA", "addressCountry": "US"},
        {"@type": "PostalAddress", "addressLocality": "Aachen", "addressCountry": "DE"},
        {"@type": "PostalAddress", "addressLocality": "Hong Kong", "addressCountry": "HK"},
    ],
}

def jld(obj):
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False) + "</script>"

def head(lang, meta, schema_blocks, hreflang, cssfile, p=""):
    title, desc, rel, nav = meta
    canonical = url_for(lang, rel)
    alts = "".join(
        f'<link rel="alternate" hreflang="{l}" href="{url_for(l, rel)}">' for l in hreflang
    )
    if hreflang:
        alts += f'<link rel="alternate" hreflang="x-default" href="{url_for("en", rel)}">'
    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{canonical}">
{alts}
<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(SITE['name'])}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE['url']}/assets/img/hero.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{p}{cssfile}">
{''.join(schema_blocks)}
</head>"""

def header(lang, base, active, p=""):
    nav = base["nav"][lang]
    items = []
    for label, href in nav["items"]:
        cls = ' aria-current="page"' if href.replace(".html", "").split("/")[-1] == active else ""
        items.append(f'<a href="{fix(href, p)}"{cls}>{esc(label)}</a>')
    for label, href in NAV_EXTRA.get(lang, []):
        cls = ' aria-current="page"' if href.endswith(active + ".html") else ""
        items.append(f'<a href="{fix(href, p)}"{cls}>{esc(label)}</a>')
    langs = [("EN", "index.html" if lang == "en" else "../index.html"),
             ("RU", "index.html" if lang == "ru" else ("ru/index.html" if lang == "en" else "../ru/index.html")),
             ("ES", "index.html" if lang == "es" else ("es/index.html" if lang == "en" else "../es/index.html"))]
    langlinks = "".join(
        f'<a href="{fix(h, p)}"{" class=\"on\"" if c == lang.upper() else ""}>{c}</a>' for c, h in langs
    )
    return f"""<div id="site-header">
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{p}index.html"><span class="mark"></span>CELLARIS</a>
    <nav class="nav">{''.join(items)}</nav>
    <div class="lang">{langlinks}</div>
    <button class="burger" aria-label="Menu" id="burger"><span></span><span></span><span></span></button>
  </div>
</header>
</div>"""


def footer(lang, base, p=""):
    f = base["footer"][lang]
    cols = "".join(
        f'<div><h4>{esc(t)}</h4>' + "".join(f'<a href="{fix(h, p)}">{esc(a)}</a>' for a, h in links) + "</div>"
        for t, links in f["cols"]
    )
    return f"""<div id="site-footer">
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="{p}index.html" style="margin-bottom:18px"><span class="mark"></span>CELLARIS</a>
        <p style="max-width:38ch;line-height:1.7">{esc(f['tag'])}</p>
      </div>
      {cols}
    </div>
    <div class="foot-note">
      <span>{esc(f['legal'])}</span>
      <span>Cellaris Instruments · Fremont · Aachen · Hong Kong</span>
    </div>
  </div>
</footer>
</div>"""


def scripts(lang, p=""):
    return f'<script src="{p}{JS_FILE}" defer></script>'

# ---------------------------------------------------------------- body sources
def extract_body(path):
    txt = path.read_text(encoding="utf-8")
    start = txt.find('<div id="site-header"></div>')
    end = txt.find('<div id="site-footer"></div>')
    if start == -1 or end == -1:
        raise SystemExit(f"markers not found in {path}")
    body = txt[start + len('<div id="site-header"></div>'):end]
    return body.strip()

def migrate_templates():
    """One-time: freeze the current page bodies as build templates."""
    if TPL.exists():
        return
    for lang in ("en", "ru", "es"):
        (TPL / lang).mkdir(parents=True, exist_ok=True)
    mapping = {
        "en": ["index", "products", "product", "compare", "applications", "science", "software", "support", "about", "contact"],
        "ru": ["index", "products", "compare"],
        "es": ["index", "products", "compare"],
    }
    for lang, pages in mapping.items():
        base = ROOT if lang == "en" else ROOT / lang
        for pg in pages:
            src = base / (pg + ".html")
            if not src.exists():
                continue
            body = extract_body(src)
            (TPL / lang / (pg + ".html")).write_text(body, encoding="utf-8")
            print(f"  template  {lang}/{pg}.html")

# ---------------------------------------------------------------- product pages
def product_schema(lang, m):
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": m["model"],
        "description": m["blurb"],
        "brand": {"@type": "Brand", "name": SITE["name"]},
        "manufacturer": {"@type": "Organization", "name": SITE["manufacturer"]},
        "category": "Battery test system",
        "additionalProperty": [
            {"@type": "PropertyValue", "name": k, "value": v} for k, v in [
                ("Voltage", m["volt"]), ("Current", m["curr"]), ("Ranges", m["ranges"]),
                ("Channels", m["channels"]), ("Accuracy", m["accuracy"]),
                ("Current response", m["response"]), ("Logging", m["dataRate"]),
            ]
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {"@type": "PriceSpecification", "priceCurrency": "USD",
                                   "valueAddedTaxIncluded": False},
            "url": url_for(lang, f"products/{m['id']}.html"),
        },
    }

def img_path(name):
    for ext in (".webp", ".jpg", ".jpeg", ".png"):
        if (ROOT / "assets" / "img" / f"{name}{ext}").exists():
            return f"assets/img/{name}{ext}"
    return f"assets/img/{name}.webp"


def product_body(lang, m, base, p="../../"):
    L = PRODUCT_LABELS[lang]
    lead = FAMILY_LEADS.get(lang, {}).get(m["family"], "")
    rows = [
        (L["dut"], m["dut"]), (L["volt"], m["volt"]), (L["curr"], m["curr"]),
        (L["ranges"], m["ranges"]), (L["channels"], m["channels"]),
        (L["acc"], m["accuracy"]), (L["resp"], m["response"]),
        (L["log"], m["dataRate"]), (L["regen"], m["regen"]),
    ]
    trs = "".join(f'<tr><th>{esc(k)}</th><td class="num">{esc(v)}</td></tr>' for k, v in rows)
    related = [x for x in base["models"] if x["family"] == m["family"] and x["id"] != m["id"]][:3]
    rel_html = "".join(
        f'<a href="{x["id"]}.html" style="display:block;padding:14px 0;border-top:1px solid var(--line)">'
        f'<span class="mono" style="font-size:11px;color:var(--muted)">{esc(x["series"])} {L["series"]}</span>'
        f'<div style="font-size:16px;margin-top:4px">{esc(x["model"])}</div></a>' for x in related
    )
    return f"""
<div class="page-head">
  <div class="wrap">
    <div class="kicker">{esc(FAMILY_NAME.get(m['family'], ''))} · {esc(m['series'])} {L['series']}</div>
    <h1>{esc(m['model'])}</h1>
    <p>{esc(m['blurb'])}</p>
  </div>
</div>
<section class="sec tight">
  <div class="wrap">
    <div class="pd">
      <div class="pd-media"><img src="{p}{img_path(m['image'])}" alt="{esc(m['model'])}"></div>
      <div>
        <p style="color:var(--muted);font-size:15px">{esc(lead)}</p>
        <table class="tbl pd-specs"><tbody>{trs}</tbody></table>
        <p class="note-line" style="margin-top:22px">{esc(L['note'])}</p>
        <div class="pd-cta">
          <a class="btn primary" href="{p}contact.html">{esc(L['quote'])} <span class="arw">→</span></a>
          <a class="btn" style="border-color:var(--line);color:var(--ink)" href="{p}support.html">{esc(L['docs'])}</a>
        </div>
        <p class="mono" style="font-size:11.5px;color:var(--muted);margin-top:16px">{esc(L['lead'])}</p>
      </div>
    </div>
    <div style="border-top:1px solid var(--line);padding-top:34px;margin-top:20px">
      <div class="sec-idx">{esc(L['related'])}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0 40px">{rel_html}</div>
    </div>
    <a class="inst-link" href="{p}products.html" style="margin-top:34px">{esc(L['back'])} <span class="arw">→</span></a>
  </div>
</section>"""

# ---------------------------------------------------------------- images
def optimize_images():
    from PIL import Image
    img_dir = ROOT / "assets" / "img"
    made = 0
    for f in sorted(img_dir.iterdir()):
        if f.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        if re.search(r"-(480|960)\.webp$", f.name):
            continue
        try:
            im = Image.open(f)
        except Exception:
            continue
        im = im.convert("RGB")
        for w in (480, 960):
            if im.width <= w:
                continue
            target = img_dir / f"{f.stem}-{w}.webp"
            if target.exists() and target.stat().st_mtime >= f.stat().st_mtime:
                continue
            h = round(im.height * w / im.width)
            im.resize((w, h), Image.LANCZOS).save(target, "WEBP", quality=82, method=4)
            made += 1
    print(f"  images    {made} variants")

def picture_wrap(html):
    def repl(m):
        tag, src = m.group(0), m.group(1)
        if "-480" in src or "-960" in src or src.endswith(".svg") or src.startswith("data:"):
            return tag
        if src.startswith("../"):
            rel, pfx = src[3:], "../"
        elif src.startswith("/"):
            rel, pfx = src[1:], "/"
        else:
            rel, pfx = src, ""
        if not (ROOT / rel).exists():
            return tag
        stem = rel.rsplit(".", 1)[0]
        if not (ROOT / f"{stem}-960.webp").exists():
            return tag
        alt = re.search(r'alt="([^"]*)"', tag)
        alt_attr = f' alt="{alt.group(1)}"' if alt else ' alt=""'
        return (f'<picture><source type="image/webp" sizes="(max-width:760px) 100vw, 50vw" '
                f'srcset="{pfx}{stem}-480.webp 480w, {pfx}{stem}-960.webp 960w">'
                f'<img src="{pfx}{stem}-960.webp"{alt_attr} loading="lazy" decoding="async"></picture>')
    return re.sub(r'<img[^>]+src="([^"]+)"[^>]*>', repl, html)

# ---------------------------------------------------------------- writers
def write_page(lang, rel, body, meta, schema_blocks, hreflang, cssfile, p=""):
    html = "\n".join([
        head(lang, meta, schema_blocks, hreflang, cssfile, p),
        "<body data-lang=\"" + lang + "\" data-page=\"" + meta[3] + "\">",
        body,
        scripts(lang, p),
        "</body></html>",
    ])
    path = out_path(lang, rel)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")

def render_products_index(html, lang, base):
    labels = base["famLabels"][lang]
    fams = base["families"]
    chips = "".join(
        f'<button class="chip{" on" if i == 0 else ""}" data-fam="{f["id"]}">{esc(labels[i])}</button>'
        for i, f in enumerate(fams))
    rows = "".join(
        f'<tr data-family="{m["family"]}"><td class="model"><a href="products/{m["id"]}.html">{esc(m["model"])}'
        f'<span>{esc(m["series"])} series</span></a></td>'
        f'<td>{esc(m["familyLabel"])}</td><td class="num">{esc(m["volt"])}</td>'
        f'<td class="num">{esc(m["curr"])}</td><td class="num">{esc(m["ranges"])}</td>'
        f'<td class="num">{esc(m["accuracy"])}</td><td class="num">{esc(m["response"])}</td>'
        f'<td class="num">{esc(m["regen"])}</td></tr>'
        for m in base["models"])
    html = html.replace('<div class="filters" id="filters"></div>',
                        f'<div class="filters" id="filters">{chips}</div>')
    html = re.sub(r"<tbody id=\"product-rows\">\s*</tbody>",
                  f'<tbody id="product-rows">{rows}</tbody>', html)
    return html

def build_pages(base, cssfile):
    cluster = ["en", "ru", "es"]
    for lang, pages in PAGE_META.items():
        for pg, meta in pages.items():
            tpl = TPL / lang / (pg + ".html")
            if not tpl.exists():
                continue
            body = tpl.read_text(encoding="utf-8")
            if pg == "products":
                body = render_products_index(body, lang, base)
            body = re.sub(r"product\.html\?model=([a-z0-9\-]+)", r"products/\1.html", body)
            p = prefix(lang)
            body = header(lang, base, meta[3], p) + "\n<main>" + body + "</main>\n" + footer(lang, base, p)
            body = picture_wrap(body)
            schema = []
            if pg == "index":
                schema = [jld(SCHEMA_ORG), jld({
                    "@context": "https://schema.org", "@type": "WebSite",
                    "name": SITE["name"], "url": SITE["url"],
                }), jld({
                    "@context": "https://schema.org", "@type": "ItemList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": i + 1,
                         "url": url_for(lang, f"products/{m['id']}.html"), "name": m["model"]}
                        for i, m in enumerate(base["models"][:8])
                    ],
                })]
            else:
                schema = [jld({
                    "@context": "https://schema.org", "@type": "WebPage",
                    "name": meta[0], "description": meta[1], "url": url_for(lang, meta[2]),
                    "isPartOf": {"@type": "WebSite", "name": SITE["name"], "url": SITE["url"]},
                }), jld({
                    "@context": "https://schema.org", "@type": "BreadcrumbList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": 1, "name": "Home", "item": url_for(lang, "")},
                        {"@type": "ListItem", "position": 2, "name": meta[0].split(" — ")[0], "item": url_for(lang, meta[2])},
                    ],
                })]
            hl = cluster if pg in PAGE_META["ru"] and pg in PAGE_META["es"] else []
            write_page(lang, meta[2], body, meta, schema, hl, cssfile, p)
            print(f"  page      {lang}/{meta[2] or 'index.html'}")

def build_products(base, cssfile):
    for lang in ("en", "ru", "es"):
        L = PRODUCT_LABELS[lang]
        p = prefix(lang, deep=True)
        for m in base["models"]:
            meta = (f"{m['model']} — {SITE['name']}",
                    m["blurb"][:155], f"products/{m['id']}.html", "products")
            body = header(lang, base, "products", p) + "\n<main>" + product_body(lang, m, base, p) + "</main>\n" + footer(lang, base, p)
            body = picture_wrap(body)
            hl = cluster_hreflang("products/" + m["id"] + ".html")
            write_page(lang, meta[2], body, meta, [jld(product_schema(lang, m)),
                        jld({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
                            {"@type": "ListItem", "position": 1, "name": "Home", "item": url_for(lang, "")},
                            {"@type": "ListItem", "position": 2, "name": "Instruments", "item": url_for(lang, "products.html")},
                            {"@type": "ListItem", "position": 3, "name": m["model"], "item": url_for(lang, meta[2])},
                        ]})], hl, cssfile, p)
            print(f"  product   {lang}/products/{m['id']}.html")

def cluster_hreflang(rel):
    return ["en", "ru", "es"]

def build_sitemap():
    urls = []
    for lang, pages in PAGE_META.items():
        for pg, meta in pages.items():
            urls.append((lang, meta[2]))
    for lang in ("en", "ru", "es"):
        for m in MODELS_CACHE:
            urls.append((lang, f"products/{m['id']}.html"))
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    seen = set()
    for lang, rel in urls:
        if (lang, rel) in seen:
            continue
        seen.add((lang, rel))
        lines.append(f"<url><loc>{url_for(lang, rel)}</loc>")
        if rel == "" or rel == "products.html" or rel == "compare.html" or rel.startswith("products/"):
            for l in ("en", "ru", "es"):
                lines.append(f'<xhtml:link rel="alternate" hreflang="{l}" href="{url_for(l, rel)}"/>')
        lines.append("</url>")
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines), encoding="utf-8")
    print(f"  sitemap   {len(seen)} urls")

def build_static_files():
    (ROOT / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\n"
        "Content-Signal: search=yes, ai-train=no\n\n"
        f"Sitemap: {SITE['url']}/sitemap.xml\n", encoding="utf-8")
    llms = [f"# {SITE['name']}", "",
            "> Research-grade battery test systems: four-range precision, ±0.02% F.S., 150 µs current response, open data.",
            "", "Manufactured by Neware Technology (est. 1998).", "", "## Instruments", ""]
    for m in MODELS_CACHE:
        llms.append(f"- {m['model']} — {m['familyLabel']}, {m['volt']}, {m['curr']}, {m['ranges']}, {m['accuracy']} — "
                    f"{SITE['url']}/products/{m['id']}.html")
    llms += ["", "## Pages", "",
             f"- Instruments: {SITE['url']}/products.html",
             f"- Compare: {SITE['url']}/compare.html",
             f"- Science: {SITE['url']}/science.html",
             f"- Support: {SITE['url']}/support.html",
             f"- Company: {SITE['url']}/about.html"]
    (ROOT / "llms.txt").write_text("\n".join(llms) + "\n", encoding="utf-8")

    (ROOT / ".htaccess").write_text("""# Generated by build/build.py
ErrorDocument 404 /404.html
DirectoryIndex index.html

# build sources must never be served
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^(templates|build)/ - [R=404,L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml text/plain application/xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/xml "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
""", encoding="utf-8")

    (ROOT / "404.html").write_text(f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found — {SITE['name']}</title>
<meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/css/site.css"></head><body style="background:#0a0d10;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui">
<div style="max-width:520px;padding:32px">
<div class="mono" style="color:#c9a227;letter-spacing:.2em;font-size:11px">404</div>
<h1 style="font-size:44px;margin:14px 0 12px;letter-spacing:-.03em">This page moved.</h1>
<p style="color:rgba(255,255,255,.6);line-height:1.7">The instrument pages now live under /products/. Start from the catalogue.</p>
<a href="/products.html" style="display:inline-block;margin-top:24px;padding:13px 22px;background:#1f6f5c;color:#fff;text-decoration:none;font-size:13px">Instruments →</a>
</div></body></html>""", encoding="utf-8")

def main():
    base = load_base()
    global MODELS_CACHE, JS_FILE
    MODELS_CACHE = base["models"]
    print("Cellaris build")
    migrate_templates()
    optimize_images()

    h = css_hash()
    cssfile = f"assets/css/site.{h}.css"
    (ROOT / cssfile).write_text((ROOT / "assets" / "css" / "site.css").read_text(encoding="utf-8"), encoding="utf-8")

    jh = hashlib.md5((ROOT / "assets" / "js" / "app.js").read_bytes()).hexdigest()[:10]
    JS_FILE = f"assets/js/app.{jh}.js"
    (ROOT / JS_FILE).write_text((ROOT / "assets" / "js" / "app.js").read_text(encoding="utf-8"), encoding="utf-8")

    build_pages(base, cssfile)
    build_products(base, cssfile)
    build_sitemap()
    build_static_files()
    print(f"done · css {cssfile}")

if __name__ == "__main__":
    main()
