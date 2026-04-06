export default function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Validar API Secret desde header
  const apiSecret = process.env.API_SECRET;
  const headerSecret = req.headers['x-proxy-secret'];
  
  if (!apiSecret || headerSecret !== apiSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Parsear body (Vercel ya parsea JSON automáticamente)
  const body = req.body || {};
  const zona = body.zona || body.valor || 'zona';
  const servicio = body.servicio || body.subvalor || 'servicio';
  const dominio = body.dominio || 'ejemplo.com';
  const phone = body.phone || process.env.DEFAULT_PHONE || '11-5865-8595';

  // Capitalizar para títulos
  const zonaTitle = zona.charAt(0).toUpperCase() + zona.slice(1);
  const servicioTitle = servicio.charAt(0).toUpperCase() + servicio.slice(1);
  const title = `${servicioTitle} en ${zonaTitle}`;

  // Generar HTML SEO válido (server-side, Google lo ve)
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${dominio}</title>
  <meta name="description" content="${servicioTitle} profesional en ${zonaTitle}. Retiro a domicilio. 📞 ${phone}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "${dominio}",
    "areaServed": "${zonaTitle}",
    "telephone": "${phone}",
    "url": "https://${dominio}/z/${zona}/${servicio}"
  }
  </script>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <p><strong>${servicioTitle} profesional en ${zonaTitle}.</strong> Retiro y entrega a domicilio.</p>
    <p>✅ Presupuesto sin cargo &nbsp;|&nbsp; ⚡ Respuesta en 24hs &nbsp;|&nbsp; 🛡️ Garantía escrita</p>
    <p>📞 <a href="tel:${phone.replace('-','')}">${phone}</a></p>
    <hr>
    <p><em>Generado dinámicamente para SEO local.</em></p>
  </main>
</body>
</html>`;

  return res.status(200).json({ 
    html: html, 
    title: title, 
    cacheable: true 
  });
}