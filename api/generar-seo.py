@'
import json
import os
from lib.generator import generate_seo_page

def handler(request):
    if request.method != "POST":
        return {"error": "Method Not Allowed"}, 405

    api_secret = os.environ.get("API_SECRET")
    if request.headers.get("x-proxy-secret") != api_secret:
        return {"error": "Unauthorized"}, 401

    try:
        data = request.json()
    except Exception:
        data = {}

    zona = data.get("zona") or data.get("valor", "zona")
    servicio = data.get("servicio") or data.get("subvalor", "servicio")
    dominio = data.get("dominio", "ejemplo.com")
    phone = data.get("phone") or os.environ.get("DEFAULT_PHONE", "11-5865-8595")

    html = generate_seo_page(zona, servicio, dominio, phone)
    return {"html": html}, 200
'@ | Out-File -FilePath "api/generar-seo.py" -Encoding utf8