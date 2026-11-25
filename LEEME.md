# Cómo usar este paquete

1. Crea una carpeta para el proyecto en roma (por ejemplo `~/proyectos/dajomar-site`) y descomprime aquí todo el contenido del zip.
2. Inicia el repo: `git init && git add . && git commit -m "Kit inicial del sitio"`.
3. Abre Claude Code en esa carpeta y pídele:

   > Lee CLAUDE.md y construye el proyecto. Empieza por la estructura y la página de inicio, muéstrame el resultado y luego sigue con las páginas de recursos.

4. Crea el repositorio en GitHub y súbelo.
5. En Cloudflare: **Workers & Pages → Create → Pages → conectar el repo**. Comando de build `npm run build`, carpeta de salida `dist`. Agrega la variable `PUBLIC_SITE_URL=https://dajomar.com`.
6. Conecta el dominio en **Custom domains**. Antes revisa que el registro raíz de dajomar.com no lo esté usando otra cosa: tus servicios del homelab están en subdominios, así que no deberían chocar.

## Dónde vive cada cosa

- **El sitio** se publica desde Cloudflare Pages, no desde roma. Si roma se apaga, la web y los PDFs siguen funcionando.
- **El original** vive en el repo clonado en roma: el contenido, el design system y `tools/pdf/` para regenerar los PDFs. Si quieres, sincroniza esa carpeta con Nextcloud como respaldo.
- **Para regenerar un PDF en roma:** `sudo apt install chromium-browser poppler-utils && pip install pypdf`, luego `npm run pdfs`, y haces commit y push.

## Para cambiar de dominio algún día

1. Cambia `PUBLIC_SITE_URL` en Cloudflare Pages.
2. Corre `DOMAIN=nuevo.com npm run pdfs` y sube los PDFs.
3. Conecta el dominio nuevo y deja una redirección 301 desde dajomar.com.
