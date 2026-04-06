// api/generar-seo.js
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Validar API Secret
  const apiSecret = process.env.API_SECRET;
  if (req.headers['x-proxy-secret'] !== apiSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Parsear body
  const { 
    zona = 'zona', 
    servicio = 'servicio', 
    dominio = 'ejemplo.com',
    phone = process.env.DEFAULT_PHONE || '11-5865-8595'
  } = req.body || {};

  // Generar HTML (mismo formato que antes)
  const title = `${servicio.charAt(0).toUpperCase() + servicio.slice(1)} en ${zona.charAt(0).toUpperCase() + zona.slice(1)}`;
  const desc = `Servicio profesional de ${servicio} en ${zona}. 📞 ${phone}`;
  
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title} | ${dominio}</title>
  <meta name="description" content="${desc}">
</head>
<body>
  <main>
    <h1>${title}</h1>
    <p>${desc}</p>
    <p>✅ Presupuesto sin cargo &nbsp;|&nbsp; ⚡ Respuesta en 24hs</p>
    <p>📞 <a href="tel:${phone.replace('-','')}">${phone}</a></p>
  </main>
</body>
</html>`;

  return res.status(200).json({ html, title, cacheable: true });
}
