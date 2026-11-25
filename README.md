# dajomar

Sitio estático de apuntes de TI: cheat sheets, artículos y notas del homelab. Construido con Astro, MDX y el design system propio.

## Requisitos

- Node.js >= 22.x
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

El sitio se levanta en `http://localhost:4321`.

## Build

```bash
npm run build
```

La salida queda en `dist/`.

## Regenerar PDFs

Los PDFs publicados están en `public/pdfs/`. Para regenerarlos:

```bash
npm run pdfs
```

Necesita Chrome o Chromium, `poppler-utils` y `pypdf` instalados.

Para cambiar el dominio en el pie de los PDFs:

```bash
DOMAIN=otro.com npm run pdfs
```

## Despliegue en Cloudflare Pages

| Configuración | Valor |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |

### Variables de entorno

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | URL del sitio (canonical, sitemap, RSS) | `https://dajomar.com` |
| `PUBLIC_PDF_BASE_URL` | Ruta base de los PDFs | `/pdfs` |
| `PUBLIC_CF_ANALYTICS_TOKEN` | Token de Cloudflare Web Analytics (opcional) | — |

## Stack

- **Astro** con TypeScript y salida estática
- **Content collections** + **MDX** para cheat sheets y artículos
- **Pagefind** para búsqueda (se indexa en el build)
- **Shiki** con tema propio (bloques de código oscuros en ambos temas)
- Fuentes autoalojadas: Inter y JetBrains Mono via `@fontsource`
- Sin Tailwind ni frameworks de UI: CSS con tokens + componentes

## Decisiones de diseño

- **Nada de dominio fijo.** La URL del sitio sale de `PUBLIC_SITE_URL`. El dominio solo aparece en la configuración central (`src/config.ts`).
- **Código siempre oscuro.** Los bloques de código usan `code-bg` en ambos temas, igual que los PDFs.
- **Fuentes autoalojadas.** Nada de Google Fonts en producción.
- **El botón Copiar** copia comandos sin los comentarios (`# …`).
