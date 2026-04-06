# api/generar-seo.py
import json
import os
from http import HTTPStatus
from lib.generator import generate_seo_page

def handler(request):
    """
    Vercel Python Serverless Function entry point.
    Request: VercelRequest object
    Returns: tuple (body_dict, status_code) o Response object
    """
    
    # 1. Solo permitir POST
    if request.method != "POST":
        return {"error": "Method Not Allowed"}, HTTPStatus.METHOD_NOT_ALLOWED.value

    # 2. Validar API Secret
    api_secret = os.environ.get("API_SECRET")
    header_secret = request.headers.get("x-proxy-secret")
    
    if not api_secret or header_secret != api_secret:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED.value

    # 3. Parsear body JSON
    try:
        data = request.json() if hasattr(request, 'json') else {}
    except Exception:
        data = {}

    # 4. Extraer parámetros (soporta ambos formatos)
    zona = data.get("zona") or data.get("valor", "zona")
    servicio = data.get("servicio") or data.get("subvalor", "servicio")
    dominio = data.get("dominio", "ejemplo.com")
    phone = data.get("phone") or os.environ.get("DEFAULT_PHONE", "11-5865-8595")

    # 5. Generar HTML con tu lógica secreta
    try:
        html = generate_seo_page(zona, servicio, dominio, phone)
        
        return {
            "html": html,
            "title": f"{servicio} en {zona}",
            "cacheable": True
        }, HTTPStatus.OK.value
        
    except Exception as e:
        return {"error": f"Generation failed: {str(e)}"}, HTTPStatus.INTERNAL_SERVER_ERROR.value