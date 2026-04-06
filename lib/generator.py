@'
def generate_seo_page(zona: str, servicio: str, dominio: str, phone: str) -> str:
    zona = zona.title().replace("-", " ")
    servicio = servicio.title().replace("-", " ")
    
    title = f"{servicio} en {zona} | {dominio}"
    desc = f"Servicio profesional de {servicio.lower()} en {zona}. Atención rápida y garantizada. 📞 {phone}"
    
    schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": dominio,
        "areaServed": zona,
        "telephone": phone,
        "url": f"https://{dominio}/z/{zona.lower().replace(' ','-')}/{servicio.lower().replace(' ','-')}"
    }

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <script type="application/ld+json">{json.dumps(schema)}</script>
  <style>body{{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}}</style>
</head>
<body>
  <main>
    <h1>{servicio} en {zona}</h1>
    <p><strong>{desc}</strong></p>
    <p>✅ Presupuesto sin cargo &nbsp;|&nbsp; ⚡ Respuesta en 24hs &nbsp;|&nbsp; 🛡️ Garantía escrita</p>
    <p>📞 <a href="tel:{phone.replace('-','')}">{phone}</a></p>
    <hr>
    <p><em>Generado dinámicamente para SEO local. Última actualización: {__import__('datetime').date.today()}</em></p>
  </main>
</body>
</html>"""
    return html
'@ | Out-File -FilePath "lib/generator.py" -Encoding utf8