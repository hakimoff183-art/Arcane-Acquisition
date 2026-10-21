"""Subset Inter / Inter Display (OFL) to Latin + French punctuation and write WOFF2."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent / "pyshim"))
from fontTools import subset
from fontTools.ttLib import TTFont
SRC = pathlib.Path("/usr/share/fonts/opentype/inter")
OUT = pathlib.Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
FACES = {"inter-400": "Inter-Regular.otf", "inter-500": "Inter-Medium.otf", "inter-600": "Inter-SemiBold.otf",
         "inter-display-700": "InterDisplay-Bold.otf", "inter-display-800": "InterDisplay-ExtraBold.otf"}
unicodes = "U+0020-007E,U+00A0-00FF,U+0152-0153,U+0178,U+02C6,U+02DC,U+2009,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+202F,U+2039-203A,U+20AC,U+2192,U+2197,U+2190,U+2212,U+00D7,U+2713"
for name, fn in FACES.items():
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "tnum", "case", "ss01", "cv11", "locl"]
    opts.name_IDs = ["*"]; opts.notdef_outline = True; opts.hinting = False; opts.desubroutinize = True
    font = TTFont(SRC / fn)
    s = subset.Subsetter(opts)
    s.populate(unicodes=subset.parse_unicodes(unicodes))
    s.subset(font)
    p = OUT / f"{name}.woff2"
    font.flavor = "woff2"
    font.save(p)
    print(p.name, p.stat().st_size)
