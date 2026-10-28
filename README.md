# Aventuras entre páginas (Sprint 1)
Sitio estático: HTML + CSS + JavaScript (ES Modules). Sin backend ni dependencias.

## Probar localmente (los módulos requieren servidor, no abrir con doble clic)
    python -m http.server 8000
Abre http://localhost:8000 (añade `?debug` para ver el botón de pruebas de estrellas: http://localhost:8000/?debug).
Desde el celular, en la misma red Wi-Fi: http://IP-DE-TU-PC:8000

## Publicar
GitHub → Settings → Pages → rama `main`, carpeta `/ (root)`.

## QR
Cuando la URL pública esté verificada: `pip install "qrcode[pil]"` y `python tools/generar_qr.py <URL>`.

## Estado
Menú, navegación, progreso y diploma listos. Las 5 aventuras son pantallas provisionales.

## Publicación en GitHub Pages
URL esperada: https://TU-USUARIO.github.io/aventuras-entre-paginas/
Flujo de trabajo: `main` siempre funcional; una rama por tarea (ej. `feature/hu03-leo`) y Pull Request antes de fusionar.
