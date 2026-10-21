"""Serve dist/ and take screenshots + collect console errors."""
import sys, threading, functools, http.server, socketserver, pathlib, json
from playwright.sync_api import sync_playwright
root = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
widths = [int(w) for w in (sys.argv[3] if len(sys.argv) > 3 else "1440,390").split(",")]
reduced = "--reduced" in sys.argv
class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=str(root), **k)
    def log_message(self, *a): pass
srv = socketserver.TCPServer(("127.0.0.1", 0), Q); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch()
    for w in widths:
        ctx = b.new_context(viewport={"width": w, "height": 900 if w > 600 else 844}, device_scale_factor=1 if w > 600 else 2,
                            reduced_motion="reduce" if reduced else "no-preference")
        pg = ctx.new_page()
        logs = []
        pg.on("console", lambda m: logs.append(f"{m.type}: {m.text}"[:300]))
        pg.on("pageerror", lambda e: logs.append(f"pageerror: {e}"[:300]))
        pg.route("**/*", lambda r: r.abort() if not r.request.url.startswith(f"http://127.0.0.1:{port}") else r.continue_())
        pg.goto(f"http://127.0.0.1:{port}/index.html", wait_until="networkidle")
        pg.wait_for_timeout(9000)
        pg.screenshot(path=str(out / f"top-{w}.png"))
        # scroll through to trigger in-view animations
        h = pg.evaluate("document.documentElement.scrollHeight")
        y = 0
        while y < h:
            pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(250); y += 500
        pg.wait_for_timeout(2500)
        pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(300)
        pg.screenshot(path=str(out / f"full-{w}.png"), full_page=True)
        ov = pg.evaluate("({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth})")
        print(w, "overflow:", ov, "height:", h)
        for l in logs: print("  ", l)
        ctx.close()
    b.close()
srv.shutdown()
