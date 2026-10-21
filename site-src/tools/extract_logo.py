"""Pull path data from the logo kit SVGs into a TS module (light + dark lockups, symbol cuts)."""
import re, json, pathlib
K = pathlib.Path("/home/claude/logo/kit/arcane-acquisition-logo/svg")
def paths(fn):
    s = (K / fn).read_text()
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    return vb, re.findall(r'<path fill="([^"]+)" d="([^"]+)"', s)
out = {}
for key, fn in {"horizontalLight": "arcane-logo-horizontal-couleur.svg",
                "horizontalDark": "arcane-logo-horizontal-fond-sombre.svg",
                "symbolLight": "arcane-symbole-couleur.svg",
                "symbolDark": "arcane-symbole-fond-sombre.svg",
                "symbolSmallLight": "arcane-symbole-petit-couleur.svg",
                "symbolSmallDark": "arcane-symbole-petit-fond-sombre.svg"}.items():
    vb, ps = paths(fn)
    out[key] = {"viewBox": vb, "paths": [{"fill": f, "d": d} for f, d in ps]}
ts = "// Généré depuis le kit logo (tools/extract_logo.py). Ne pas éditer à la main.\n"
ts += "export const LOGO = " + json.dumps(out) + " as const;\n"
pathlib.Path("src/components/logo-paths.ts").write_text(ts)
print({k: (v["viewBox"], [p["fill"] for p in v["paths"]]) for k, v in out.items()})
