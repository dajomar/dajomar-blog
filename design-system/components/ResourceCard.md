# ResourceCard

La tarjeta de un recurso en la grilla de inicio y en /recursos: icono, etiqueta, título, descripción, tags y acceso al PDF.

- Toda la tarjeta es un enlace a la página del recurso; el `PDF ↓` es un atajo secundario.
- **Icono:** el logo de la tecnología en una sola tinta (`ink`) sobre `surface-muted`. Nunca a color dentro de la tarjeta: la grilla tiene que verse uniforme.
- **Etiqueta:** tipo y dato útil (“Cheat sheet · 3 páginas”, “Artículo · 6 min”).
- **Descripción:** una frase, máximo dos líneas. Dice qué cubre, no lo que “aprenderás”.
- 2 a 3 tags como máximo.
- En reposo solo lleva el borde `line`; la sombra `shadow-card` aparece en hover.
- Grilla `dj-grid`: columnas de 260px mínimo con gap `space-6`.
