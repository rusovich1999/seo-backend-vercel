export function generateSeoPage(zona, servicio, dominio, phone) {
  // Formatear texto (ej: "olivos" -> "Olivos", "zona-norte" -> "Zona Norte")
  const format = (txt) => txt ? txt.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "";
  
  const z = format(zona);
  const s = format(servicio);
  
  const title = `${s} en ${z} | ${dominio}`;
  const desc = `Servicio profesional de ${s} en ${z}. Atención rápida y garantizada. 📞 ${phone}`;
  
  // Schema JSON-LD para SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": dominio,
    "areaServed": z,
    "telephone": phone,
    "url": `https://${dominio}/z/${zona.toLowerCase()}/${servicio.toLowerCase()}`
  };

  const today = new Date().toLocaleDateString("es-AR");

  // Retornar HTML completo
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<meta name="description" content="${desc}">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>body{font-family:system-ui;background:#0f0f1a;color:#fff;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}</style>
</head>
<body>
<main>
  <h1 style="color:#d4af37">${title}</h1>
  <p style="font-size:1.1rem">${desc}</p>
  <p>✅ Presupuesto sin cargo | ⚡ Respuesta en 24hs | 🛡️ Garantía escrita</p>
  <p>📞 <a href="tel:${phone.replace(/[^0-9+]/g, '')}" style="color:#d4af37">${phone}</a></p>
  <hr style="border-color:#333;margin:2rem 0">
  <p style="font-size:0.9rem;opacity:0.7">Generado dinámicamente para SEO local. Última actualización: ${today}</p>
</main>
</body>
</html>`;
}