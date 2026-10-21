"""Image de partage 1200x630 (LinkedIn, WhatsApp, Slack...)."""
import pathlib, base64, re
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
fonts = ROOT / "public/fonts"
ff = lambda f: "data:font/woff2;base64," + base64.b64encode((fonts / f).read_bytes()).decode()
logo = (pathlib.Path("/home/claude/logo/kit/arcane-acquisition-logo/svg/arcane-logo-horizontal-couleur.svg")).read_text()
logo = re.sub(r' width="[^"]+" height="[^"]+"', ' style="height:54px;width:auto;display:block"', logo, count=1)
cells = []
lit = {(4, 1), (1, 3), (5, 5), (2, 7)}
for r in range(9):
    for c in range(6):
        on = (c, r) in lit
        cells.append(f'<span class="{ "sq" if on else "dot"}"></span>')
html = f"""<!doctype html><html><head><meta charset=utf-8><style>
@font-face{{font-family:I;font-weight:500;src:url({ff('inter-500.woff2')})}}
@font-face{{font-family:D;font-weight:800;src:url({ff('inter-display-800.woff2')})}}
*{{box-sizing:border-box;margin:0}}
body{{width:1200px;height:630px;background:#F9F6F0;font-family:I;color:#1A1A1A;position:relative;overflow:hidden}}
.wrap{{position:absolute;inset:64px 72px}}
h1{{font-family:D;font-weight:800;font-size:88px;line-height:.93;letter-spacing:-.052em;margin-top:58px}}
p{{position:absolute;left:0;bottom:8px;font-size:25px;color:#4A463F}}
p b{{color:#1A1A1A;font-weight:500}}
.grid{{position:absolute;right:56px;top:64px;display:grid;grid-template-columns:repeat(6,26px);gap:22px 22px}}
.dot,.sq{{width:26px;height:26px;display:flex}}
.dot::after{{content:"";width:8px;height:8px;border-radius:50%;background:#D6CEBF;margin:auto}}
.sq{{background:#FF6600;border-radius:6px}}
.fade{{position:absolute;inset:0;background:linear-gradient(90deg,#F9F6F0 46%,rgba(249,246,240,.0) 80%)}}
.url{{position:absolute;left:0;bottom:-36px;font-size:20px;color:#6B655B}}
</style></head><body>
<div class=grid>{''.join(cells)}</div>
<div class=wrap>{logo}
<h1>10 prospects chauds.<br>Livrés en 72&nbsp;h.</h1>
<p>Pour les agences B2B qui vivent du bouche-à-oreille. <b>Offert.</b></p>
<span class=url>arcane-acquisition.site</span></div>
</body></html>"""
tmp = ROOT / ".build/og.html"; tmp.write_text(html)
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.goto(tmp.as_uri()); pg.wait_for_timeout(400)
    pg.screenshot(path=str(ROOT / "public/og-image.png")); b.close()
print("ok", (ROOT / "public/og-image.png").stat().st_size)
