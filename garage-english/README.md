# Garage English — Inglés A1 para mecánica

La URL pública abre la versión con fotos reales:

`https://rickhazur.github.io/portafolio/garage-english/`

Esa pantalla de inicio lleva a Aprender, Mi taller, Jugar y Clientes.

## Dónde está cada cosa

- `index.html`: inicio (fotos, estilo v12).
- `aprender.html`, `taller.html`, `jugar.html`, `clientes.html`: las cuatro secciones. El motor sigue siendo `app.js` + `data.js`; las fotos, el estilo y las pantallas nuevas están en `preview/`.
- `audio/` y `img/`: voces e iconos. Las fotos del taller están en `preview/img/`.
- `preview/*.html`: atajos que redirigen a las páginas de arriba (los enlaces viejos de la vista previa siguen abriendo).
- `v3/`: la app anterior, sin fotos. Usa los mismos `app.js`, `data.js`, `audio/` e `img/` mediante `<base href="../">`.
- `demo/`: el demo cerrado, separado. No cambió.
- `sw.js`: ya no guarda la app. Solo borra la caché v3 de quien vuelve y se desregistra, para que no siga abriendo la versión vieja.

## Para el profe

Cada estudiante: Progreso → "Descargar reporte (CSV)". Incluye prueba inicial/final, cada respuesta, estrellas y palabras aprendidas. Nada sale del celular sin que el estudiante lo descargue.

El progreso de la versión con fotos y el de `v3/` se guardan en la misma clave del celular (`garageEnglish.v3`), así que las estrellas se conservan al pasar de una a la otra.
