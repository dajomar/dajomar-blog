# CodeBlock

El bloque de código: fondo oscuro, línea verde a la izquierda y comentarios en verde claro, en ambos temas.

Es la pieza más reconocible de la marca, igual que en los cheat sheets impresos. Siempre usa `code-bg`, `code-ink` y `code-comment`; nunca un fondo claro para bloques de varias líneas.

- **Barra superior:** lenguaje a la izquierda (`bash`, `yaml`, `hcl`) y botón **Copiar** a la derecha. El botón copia solo los comandos, sin los comentarios.
- **Comentarios:** alineados en columna dentro del bloque. Si no caben junto al comando (más de ~50 caracteres en total), van en la línea de arriba. Nunca se parte un comando a la mitad: usa `\` para continuar.
- **Cadenas y rutas** en `code-path` (clase `dj-s`) solo cuando ayudan a leer; no es un resaltador completo de sintaxis.
- El consumidor provee el texto ya escapado; en la web real el resaltado lo hace el generador del sitio (Astro/Shiki) con estos colores.
