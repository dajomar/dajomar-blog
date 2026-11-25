#!/usr/bin/env python3
"""Genera los cheat sheets en PDF con la plantilla de dajomar.

Uso:
  python3 build.py                 # todos
  python3 build.py linux docker    # solo algunos
Variables de entorno:
  DOMAIN   dominio del pie (por defecto dajomar.com). Cambiarlo regenera los PDFs para otro dominio.
  CHROME   ejecutable de Chrome/Chromium (por defecto: google-chrome, chromium o chromium-browser)
  OUT_DIR  carpeta de salida (por defecto ../../public/pdfs)
Requisitos: Chrome o Chromium, poppler-utils (pdftotext) y `pip install pypdf`.
"""
import html, json, os, re, shutil, subprocess, sys
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.annotations import Link

HERE = Path(__file__).resolve().parent
DOMAIN = os.environ.get("DOMAIN", "dajomar.com")
OUT = Path(os.environ.get("OUT_DIR", HERE / "../../public/pdfs")).resolve()
CHROME = os.environ.get("CHROME") or next((c for c in ("google-chrome", "chromium", "chromium-browser") if shutil.which(c)), None)
if not CHROME:
    sys.exit("No encuentro Chrome/Chromium. Define CHROME=/ruta/al/ejecutable")

W = 50  # caracteres por línea de código antes de mover el comentario arriba
L = lambda x: len(html.unescape(re.sub(r"<[^>]+>", "", x)))

def reflow(m):
    rows = []
    for l in m.group(1).split("\n"):
        mm = re.match(r'(.*?)\s*<span class="c"># (.*?)</span>\s*$', l)
        rows.append((mm.group(1), mm.group(2)) if mm and mm.group(1).strip() else (l, None))
    fits = [r for r in rows if r[1] and L(r[0]) + 4 + L(r[1]) <= W]
    col = max([L(r[0]) for r in fits], default=0) + 2
    out = []
    for cmd, c in rows:
        if c is None:
            if L(cmd) > W + 3:
                print("  ⚠ línea larga:", html.unescape(re.sub(r"<[^>]+>", "", cmd)))
            out.append(cmd); continue
        if L(cmd) + 4 + L(c) <= W:
            pad = col if col + 2 + L(c) <= W else L(cmd) + 2
            out.append(cmd + " " * (pad - L(cmd)) + '<span class="c"># ' + c + "</span>")
        else:
            out.append('<span class="c"># ' + c + "</span>"); out.append(cmd)
    return "<pre>" + "\n".join(out) + "</pre>"

def build(item):
    head = (HERE / "template-head.html").read_text()
    head = head.replace("Linux - Guía de atajos", f"{item['name']} - Guía de atajos")
    head = head.replace('"Linux · Guía de atajos  —  "', f'"{item["name"]} · Guía de atajos  —  "')
    head = head.replace("dajomar.com", DOMAIN)
    if "header .prompt { white-space:nowrap;" not in head:
        head = head.replace("header .prompt {", "header .prompt { white-space:nowrap;")
    body = (HERE / "bodies" / f"{item['slug']}.html").read_text()
    if item.get("icon"):
        svg = (HERE / item["icon"]).read_text().replace("<svg ", f'<svg class="tux" fill="{item["color"]}" ', 1)
        body = body.replace("%%ICON%%", svg)
    body = re.sub(r"<pre>(.*?)</pre>", reflow, body, flags=re.S)
    tmp = OUT / f".{item['slug']}.html"
    tmp.write_text(head + "\n" + body + "\n</body>\n</html>\n")
    pdf = OUT / item["pdf"]
    subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={pdf}", tmp.as_uri()], check=True, capture_output=True)
    tmp.unlink()
    # enlace clicable sobre el dominio del pie en cada página
    bb = subprocess.run(["pdftotext", "-bbox", str(pdf), "-"], capture_output=True, text=True, check=True).stdout
    w = PdfWriter(); w.append(PdfReader(str(pdf)))
    for i, pg in enumerate(bb.split("<page ")[1:]):
        H = float(re.search(r'height="([\d.]+)"', pg).group(1))
        words = re.findall(r'xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<', pg)
        hits = [x for x in words if DOMAIN in x[4] and float(x[1]) > H - 60]
        if not hits:
            continue
        y0, y1, x1 = float(hits[-1][1]), float(hits[-1][3]), float(hits[-1][2])
        x0 = min(float(x[0]) for x in words if abs(float(x[1]) - y0) < 2 and float(x[0]) > 300)
        w.add_annotation(page_number=i, annotation=Link(rect=(x0 - 2, H - y1 - 2, x1 + 2, H - y0 + 2),
                                                        url=f"https://{DOMAIN}", border=[0, 0, 0]))
    w.write(str(pdf))
    print(f"✓ {pdf.name} ({len(w.pages)} págs)")

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    items = json.loads((HERE / "cheatsheets.json").read_text())
    wanted = set(sys.argv[1:])
    for it in items:
        if not wanted or it["slug"] in wanted:
            build(it)
