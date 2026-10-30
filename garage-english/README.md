# Garage English v3 — Inglés A1 para mecánica (juego + aprendizaje)

Sube esta carpeta tal cual a `rickhazur/portafolio` (por ejemplo `garage-english/`). URL: `https://rickhazur.github.io/portafolio/garage-english/`

## Archivos
- `index.html`, `style.css`, `app.js`: la app (celular primero).
- `data.js`: todo el contenido (lo genera `v3_build.js` en la carpeta del proyecto).
- `img/*.webp`: imágenes (ya no van dentro del HTML).
- `audio/`: aquí van las MP3 (`audio/<id>.mp3`). `audio/available.js` dice cuáles hay:
  - `'all'` (por defecto): intenta cada MP3 y usa la voz del navegador si falta.
  - `[]`: solo voz del navegador (sin errores 404 mientras no haya MP3).
- `audio_manifest.csv`: id, filename, text, type para generar las MP3 en ElevenLabs.
- `manifest.webmanifest` + `sw.js`: app instalable y sin internet (solo funciona en https, no abriendo el archivo directo).
- `shots/`: capturas de prueba a 390×844.

## Para el profe
Cada estudiante: Progreso → "Descargar reporte (CSV)". Incluye prueba inicial/final, cada respuesta, estrellas y palabras aprendidas. Nada sale del celular sin que el estudiante lo descargue.
