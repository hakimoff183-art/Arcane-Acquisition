"""Behaviour checks: hero sequence frames, beams, video dialog, keyboard focus, reduced motion."""
import sys, threading, http.server, socketserver, pathlib
from playwright.sync_api import sync_playwright
root = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=str(root), **k)
    def log_message(self, *a): pass
srv = socketserver.TCPServer(("127.0.0.1", 0), Q); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
url = f"http://127.0.0.1:{port}/index.html"
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page(); logs = []
    pg.on("console", lambda m: logs.append(f"{m.type}: {m.text}"[:300])); pg.on("pageerror", lambda e: logs.append(f"pageerror: {e}"))
    pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(f"http://127.0.0.1:{port}") else r.continue_())
    pg.goto(url)
    card = pg.locator("[data-radar]")
    for t in (200, 1200, 2600, 4200, 9000):
        pg.wait_for_timeout(t - (0 if t == 200 else prev)); prev = t
        card.screenshot(path=str(out / f"seq-{t}.png"))
        print(t, "items:", pg.locator("[data-animated-list] > [data-list-item]").count(), "ready:", pg.evaluate("document.querySelector('[data-radar]').hasAttribute('data-ready')"),
              "lit:", pg.locator("[data-cell][data-lit]").count())
    # beams
    pg.locator("#etapes").scroll_into_view_if_needed(); pg.wait_for_timeout(1800)
    print("beam paths:", pg.locator("#etapes svg path").count(), "animates:", pg.locator("#etapes svg animate").count())
    pg.locator("#etapes figure").screenshot(path=str(out / "beams.png"))
    # tickers final values
    pg.wait_for_timeout(2000)
    print("tickers:", pg.locator("#etapes ol .tabular-nums").all_inner_texts())
    # video dialog
    pg.locator("button[aria-label^='Lancer la vidéo']").click(); pg.wait_for_timeout(600)
    print("dialog open:", pg.evaluate("document.querySelector('dialog[data-video-dialog]').open"), "iframe:", pg.locator("dialog iframe").count(),
          "src:", pg.locator("dialog iframe").get_attribute("src")[:40] if pg.locator("dialog iframe").count() else None)
    pg.screenshot(path=str(out / "dialog.png"))
    pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
    print("dialog after Esc:", pg.evaluate("document.querySelector('dialog[data-video-dialog]').open"), "iframe:", pg.locator("dialog iframe").count())
    # keyboard: first tabs
    pg.evaluate("window.scrollTo(0,0)"); pg.locator("body").click(position={"x": 5, "y": 400})
    seq = []
    for i in range(6):
        pg.keyboard.press("Tab"); seq.append(pg.evaluate("(document.activeElement.innerText||document.activeElement.getAttribute('aria-label')||'').slice(0,40)"))
    print("tab order:", seq)
    pg.keyboard.press("Shift+Tab"); pg.screenshot(path=str(out / "focus.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 120})
    # tally iframe attributes
    print("tally:", pg.locator("iframe[title='Demande de Radar']").get_attribute("data-tally-src"))
    for l in logs: print("  ", l)
    ctx.close()
    # reduced motion
    ctx = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce", device_scale_factor=2)
    pg = ctx.new_page(); pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(f"http://127.0.0.1:{port}") else r.continue_())
    pg.goto(url); pg.wait_for_timeout(1500)
    print("reduced: items", pg.locator("[data-animated-list] > [data-list-item]").count(), "lit", pg.locator("[data-cell][data-lit]").count(),
          "armed blur-fades:", pg.locator("[data-blur-fade='armed']").count())
    pg.locator("[data-radar]").screenshot(path=str(out / "reduced-radar.png"))
    ctx.close()
    # no JS
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, java_script_enabled=False)
    pg = ctx.new_page(); pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(f"http://127.0.0.1:{port}") else r.continue_())
    pg.goto(url); pg.wait_for_timeout(800)
    pg.screenshot(path=str(out / "nojs.png"), full_page=False)
    print("nojs visible h2s:", pg.locator("h2").count())
    ctx.close(); b.close()
srv.shutdown()
