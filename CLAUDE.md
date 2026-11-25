# dajomar — sitio de apuntes de TI

Instrucciones para construir el sitio. Léelas completas antes de empezar.

## Objetivo

Un sitio estático en español para los apuntes de estudio de David: cheat sheets, artículos y notas del homelab. Hoy es para uso personal, pero tiene que quedar listo para recibir público **cambiando solo el dominio**. Prioridades, en este orden: encontrar un comando rápido, leer cómodo, verse como el design system.

Idioma del sitio y de los textos: español latinoamericano neutro con tuteo (puedes, revisa), nunca voseo. Sin signos de exclamación ni emojis decorativos.

## Qué hay en esta carpeta

| Ruta | Qué es |
| --- | --- |
| `design-system/README.md` | Guía de marca: voz, colores, tipografía, reglas. **Léela primero.** |
| `design-system/tokens.json` / `tokens.css` | Tokens (tema claro y oscuro). `tokens.css` ya está generado. |
| `design-system/components.css` | Estilos de referencia de los componentes (prefijo `dj-`). |
| `design-system/components/*.md` | Pautas de cada componente. |
| `design-system/mockups/inicio.html` | Mockup aprobado de la página de inicio. |
| `design-system/mockups/recurso-linux.html` | Mockup aprobado de la página de un recurso. |
| `content-sources/cheatsheets/*.html` | Contenido de los 8 cheat sheets (HTML) para convertir a MDX. |
| `public/pdfs/*.pdf` | Los 8 PDFs ya generados. |
| `tools/pdf/` | Script que regenera los PDFs (`build.py`) con su plantilla, cuerpos e iconos. |

Los mockups usan estilos en línea solo para mostrar el resultado. En el proyecto, **no copies estilos en línea**: usa `tokens.css`, `components.css` y componentes `.astro`.

## Stack

- **Astro**, última versión estable, con TypeScript, salida estática (`output: 'static'`).
- **Content collections** + **MDX** para cheat sheets y artículos.
- **Pagefind** para la búsqueda (se indexa en el build).
- `@astrojs/sitemap` y `@astrojs/rss`.
- Fuentes **autoalojadas** con `@fontsource` (Inter 300/400/500/600/700/800 y JetBrains Mono 400/500/700). Nada de Google Fonts en producción.
- Resaltado de código con Shiki (o Expressive Code) usando un tema propio con los colores `code-*` de los tokens. El bloque de código es **oscuro en ambos temas**.
- Sin Tailwind ni frameworks de UI. CSS global = `tokens.css` + `components.css`; estilos propios dentro de cada componente.
- Despliegue en **Cloudflare Pages**.

## Regla clave: nada de dominio fijo

- La URL del sitio sale de `PUBLIC_SITE_URL` (en `astro.config`, con `https://dajomar.com` como valor por defecto). Úsala para `site`, canonical, sitemap, RSS y Open Graph.
- La ruta de los PDFs sale de `PUBLIC_PDF_BASE_URL` (por defecto `/pdfs`). Ningún componente escribe `/pdfs/` a mano.
- Enlaces internos siempre relativos.
- Antes de terminar: `grep -rn "dajomar.com" src/` solo debe aparecer en `astro.config` o en un archivo de configuración central.

El logotipo es **texto** (`dajomar_` en JetBrains Mono 700, guion bajo en `accent-strong`) y su texto también vive en la configuración central (`src/config.ts`), junto con el nombre del autor, la ciudad y los enlaces sociales.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Igual que `mockups/inicio.html`: portada con prompt y bloque de terminal, grilla de cheat sheets con filtros por categoría, "Lo que estoy estudiando", últimos artículos. |
| `/recursos/` | Grilla completa de cheat sheets con filtros (Todos, Fundamentos, DevSecOps, Soporte TI). Los filtros funcionan sin JavaScript como enlaces o con un poco de JS progresivo. |
| `/recursos/[slug]/` | Igual que `mockups/recurso-linux.html`: cabecera con icono, etiqueta, título, descripción, tags, botones "Descargar PDF" y "Ver en GitHub"; índice lateral ("En esta página") generado desde los h2; contenido MDX. |
| `/articulos/` y `/articulos/[slug]/` | Lista por fecha y artículo con ancho `content-width`. |
| `/homelab/` | Página con un texto de marcador `[DESCRIBIR EL HOMELAB]`. No inventes datos. |
| `/sobre-mi/` | Página con un texto de marcador `[ESCRIBIR]` y enlace a davidmaza.co desde la configuración. |
| `/404` | Prompt `david@dajomar:~$ cd /ruta` + `bash: cd: /ruta: No existe el archivo o el directorio` y enlace al inicio. |
| `/rss.xml`, sitemap | Generados. |

## Content collections

**cheatsheets** (`src/content/cheatsheets/<slug>.mdx`):

```ts
{
  title: string,            // "Linux"
  description: string,      // una frase, la de la tarjeta
  label: string,            // "Cheat sheet · 3 págs" o "Cheat sheet · DevSecOps"
  category: 'fundamentos' | 'devsecops' | 'soporte-ti',
  tags: string[],           // 2 o 3, en minúscula
  icon: string,             // nombre del icono (ver abajo)
  pdf: string,              // nombre del archivo en public/pdfs
  updated: Date,
  order: number,
}
```

Categorías: fundamentos = linux, redes, bash, git · devsecops = docker, kubernetes, terraform · soporte-ti = jamf.

Textos de las tarjetas: usa las descripciones, etiquetas y tags del mockup de inicio.

Iconos: los logos vienen de Simple Icons (paquete `simple-icons`, licencia CC0): linux, gnubash, git, docker, kubernetes, terraform. Redes y Jamf usan iconos genéricos de Material Design Icons (`lan`, `devices`); los SVG están en `tools/pdf/icons/`. En las tarjetas, siempre en una sola tinta (`ink`).

**articulos** (`src/content/articulos/<slug>.mdx`): `title`, `description`, `date`, `tags`, `draft` (boolean). Crea los tres del mockup como `draft: true` con el cuerpo `[ESCRIBIR]`. Los borradores no aparecen en producción.

## Convertir los cheat sheets a MDX

Fuente: `content-sources/cheatsheets/<slug>.html`. Conserva el texto **tal cual**; solo cambia el formato.

| En el HTML | En MDX |
| --- | --- |
| `<header>` | Va al frontmatter (título y descripción); no al cuerpo. |
| `<h2>` | `##` (genera un ancla y una entrada del índice lateral) |
| `<div class="item"><p>Texto</p>` antes de un bloque | `###` o un párrafo corto según el caso |
| `<pre>` con `<span class="c"># …</span>` | Bloque de código con lenguaje (`bash`, `yaml`, `hcl`, `ini`…). Los comentarios quedan como `# …` normales. |
| `<div class="tip">` | `<Callout type="tip">`; si empieza por "Seguridad", `type="security"` |
| Frases con ⚠ sobre comandos destructivos | `<Callout type="warning">` cuando están en un recuadro; si es solo un comentario de código, se queda en el código |
| `<table>` | Tabla Markdown o `<CommandTable>` si la primera columna son comandos |
| `<span class="flag">-t</span>` | `<Flag>-t</Flag>` |
| `<code>` | código en línea |
| `%%ICON%%` | Ignóralo: el icono va en la cabecera de la página. |

## Componentes (`src/components/`)

Sigue cada pauta de `design-system/components/*.md`.

- `SiteHeader` (logotipo, nav con `aria-current`, buscador, botón de tema; en móvil la nav pasa a un menú) y `SiteFooter`.
- `TerminalPrompt` (props: `path`, `command`, `cursor`).
- `CodeBlock`: barra con lenguaje y botón **Copiar**, que copia los comandos **sin los comentarios** (`# …` al final de línea).
- `Callout` (`tip` | `warning` | `security`), `CommandTable`, `Flag`, `SectionHeading` (anclas), `ResourceCard`, `Button` (`primary` | `secondary` | `ghost`), `Tag`.
- `ThemeToggle`: claro por defecto. Respeta `prefers-color-scheme` la primera vez y guarda la elección en `localStorage` (con `try/catch`). Pon `data-theme` en `<html>` con un script en línea en el `<head>` para evitar el parpadeo.
- `SearchBox` con Pagefind: se abre con `/` (si no estás escribiendo en un campo) y busca en cheat sheets y artículos.

## Calidad y seguridad

- Accesibilidad: `lang="es"`, enlace "Saltar al contenido", foco visible con el token `focus`, objetivos táctiles de 44 px o más, SVG decorativos con `aria-hidden`. El contraste de los tokens ya está validado (4,5:1 en ambos temas); no inventes colores.
- Responsive: probar a 375 px. Las tablas y los bloques de código hacen scroll horizontal dentro de su caja; nunca se parte un comando.
- `public/_headers` para Cloudflare Pages con cabeceras de seguridad: `Content-Security-Policy` (solo `self`, más lo que exija Cloudflare Web Analytics si está activo), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiva y `X-Frame-Options: DENY`.
- Analítica: Cloudflare Web Analytics solo si existe `PUBLIC_CF_ANALYTICS_TOKEN`.
- SEO: título y descripción por página, canonical, Open Graph. La imagen OG por defecto queda como `[PENDIENTE]` si no la puedes generar.
- Nada de secretos en el repo. `.gitignore` para `node_modules`, `dist`, `.astro`, `.env*`.

## PDFs

- Los PDFs publicados están en `public/pdfs/`.
- `tools/pdf/build.py` los regenera (necesita Chrome o Chromium, `poppler-utils` y `pypdf`). Agrega el script `"pdfs": "python3 tools/pdf/build.py"` a `package.json`.
- `DOMAIN=otro.com npm run pdfs` regenera los PDFs con otro dominio en el pie. Si el sitio cambia de dominio, se corre esto y listo.
- Si se agrega un cheat sheet nuevo: cuerpo en `tools/pdf/bodies/`, entrada en `tools/pdf/cheatsheets.json` y su `.mdx`.

## Antes de dar el trabajo por terminado

- [ ] `npm run build` sin errores ni advertencias de contenido.
- [ ] Inicio y recurso de Linux se ven como los mockups, en claro y en oscuro.
- [ ] La búsqueda encuentra `tcpdump` y `kubectl` en el sitio construido (`npm run preview`).
- [ ] El botón Copiar copia sin comentarios.
- [ ] Los 8 cheat sheets tienen página y su PDF descarga.
- [ ] `grep` del dominio solo lo encuentra en la configuración central.
- [ ] Se ve bien a 375 px.
- [ ] Un `README.md` del proyecto explica cómo correrlo, regenerar PDFs y desplegar en Cloudflare Pages (comando `npm run build`, salida `dist`, variables `PUBLIC_SITE_URL`, `PUBLIC_PDF_BASE_URL`, `PUBLIC_CF_ANALYTICS_TOKEN`).

Si algo de estas instrucciones choca con el design system, gana el design system. Si algo no está definido, elige la opción más simple y anótala en el README del proyecto.
