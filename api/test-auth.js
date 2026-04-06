# 1. Asegurar que existe la carpeta api
New-Item -ItemType Directory -Force -Path api -ErrorAction SilentlyContinue

# 2. Crear el archivo con encoding UTF-8 sin BOM
$code = @'
export default async function handler(req, res) {
  // Aceptar GET o POST para debug
  const secret = req.method === 'POST' 
    ? (req.body?.secret || new URLSearchParams(await req.text()).get('secret'))
    : new URL(req.url, 'http://localhost').searchParams.get('secret');
    
  const expected = process.env.API_SECRET;
  
  return res.status(200).json({
    match: secret === expected,
    received: secret ? secret.substring(0,10) + '...' : 'NOT_SENT',
    expected: expected ? expected.substring(0,10) + '...' : 'NOT_CONFIGURED',
    lengths: { received: secret?.length, expected: expected?.length },
    method: req.method
  });
}
'@

[System.IO.File]::WriteAllText(
  "$(Get-Location)\api\test-auth.js",
  $code,
  [System.Text.UTF8Encoding]::new($false)
)

# 3. Verificar que se creó
Test-Path api/test-auth.js  # Debe decir: True
Get-Content api/test-auth.js | Select-Object -First 3  # Debe mostrar el código