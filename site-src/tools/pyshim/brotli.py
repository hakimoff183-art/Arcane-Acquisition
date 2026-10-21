"""Minimal brotli shim for fontTools' WOFF2 writer: delegates to Node's zlib (no pip access here)."""
import subprocess
MODE_GENERIC, MODE_TEXT, MODE_FONT = 0, 1, 2
_JS_C = ("const z=require('zlib');const c=[];process.stdin.on('data',d=>c.push(d)).on('end',()=>{"
         "const b=Buffer.concat(c);process.stdout.write(z.brotliCompressSync(b,{params:{"
         "[z.constants.BROTLI_PARAM_MODE]:+process.argv[1],[z.constants.BROTLI_PARAM_QUALITY]:11,"
         "[z.constants.BROTLI_PARAM_SIZE_HINT]:b.length}}))})")
_JS_D = ("const z=require('zlib');const c=[];process.stdin.on('data',d=>c.push(d)).on('end',()=>"
         "process.stdout.write(z.brotliDecompressSync(Buffer.concat(c))))")
def compress(data, mode=MODE_GENERIC, quality=11, lgwin=22, lgblock=0):
    return subprocess.run(["node", "-e", _JS_C, str(mode)], input=bytes(data), capture_output=True, check=True).stdout
def decompress(data):
    return subprocess.run(["node", "-e", _JS_D], input=bytes(data), capture_output=True, check=True).stdout
