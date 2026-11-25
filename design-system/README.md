# dajomar

El sistema visual de dajomar: apuntes de TI, cheat sheets y laboratorio. Nace de los cheat sheets en PDF (página blanca, código en negro, verde terminal, títulos en azul) y los lleva a la web sin cambiar su carácter.

## Para qué es

Un sitio de estudio personal que puede abrirse al público sin rediseñarse. Todo lo que define la marca vive en tokens y en un logotipo tipográfico, no en el dominio: si el sitio cambia de dominio o de nombre, solo cambia la configuración.

## Voz

- Español latinoamericano neutro, con tuteo (“puedes”, “revisa”), nunca voseo.
- Directo y práctico: primero el comando, después la explicación.
- Frases cortas. Sin signos de exclamación, sin “¡Aprende ya!”, sin emojis decorativos. El único símbolo frecuente es ⚠ para comandos destructivos.
- Los títulos dicen qué hay: “Puertos y conexiones”, no “Domina los puertos”.
- Comandos, rutas y flags siempre en código (`ss -tulpn`, `/etc/fstab`), nunca en negrita.

## Fundamentos visuales

- **Página blanca, código oscuro.** `surface` es blanco en el tema principal. Los bloques de código usan `code-bg` en ambos temas: son la firma de la marca y lo primero que se reconoce.
- **Verde terminal = acción y código.** `accent` para la línea del bloque de código, el cursor y el foco; `accent-strong` para el botón primario y el texto verde. Nunca uses `accent` como texto pequeño sobre blanco (3,5:1).
- **Azul = estructura.** `heading` para los h2, los enlaces y la cabecera de tablas.
- **Tipografía:** Inter para leer, JetBrains Mono para todo lo que se escribe en una terminal. Los h2 van en peso 300 y azul, como en los PDFs.
- **Bordes, no sombras.** Tarjetas y tablas se separan con `line`. La única sombra es `shadow-card`, en hover.
- **Espaciado** en múltiplos de 4 px (`space-1` a `space-16`). El texto largo no pasa de `content-width` (760 px).
- **Radios pequeños:** `radius-sm` en código, `radius-md` en botones y callouts, `radius-lg` en tarjetas.
- **Modo oscuro** disponible, pero el claro es el principal: así se leen e imprimen mejor los recursos.

## Reglas de uso

- Una sola acción primaria (`dj-btn--primary`) por vista.
- La franja izquierda verde es exclusiva del bloque de código; los callouts llevan borde completo.
- Máximo dos callouts por sección.
- Un `TerminalPrompt` por vista como máximo.
- Los iconos de tecnologías (Linux, Docker, Kubernetes, Terraform…) van en una sola tinta (`ink`) dentro de las tarjetas.
- Contraste: todo el texto cumple 4,5:1 en ambos temas; `line-strong` y `accent` cumplen 3:1 como bordes y foco.

## Logotipo

No hay archivo de logo: el logotipo es `dajomar_` en JetBrains Mono 700 con el guion bajo en `accent-strong`. En los PDFs, el pie lleva el dominio como texto enlazado.

## Componentes

| Componente | Para qué |
| --- | --- |
| CodeBlock | Comandos con comentarios y botón Copiar |
| TerminalPrompt | El guiño `david@dajomar:~$` |
| Callout | Pro Tip, advertencia y seguridad |
| CommandTable | Tablas de referencia |
| SectionHeading | h2 azul y h3 |
| ResourceCard | Grilla de cheat sheets y artículos |
| Button | Primario, secundario, fantasma |
| Tag | Temas y flags de comandos |
| SiteHeader | Logotipo, navegación, búsqueda y tema |

Los componentes son clases CSS (`components/bundle.css`, prefijo `dj-`) sobre los tokens. En el sitio real (Astro) se convierten en componentes `.astro` con el mismo marcado.
