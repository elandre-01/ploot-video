## V18 · efectos +6 dB sobre V17 · 18 septiembre 2026

- Bus `sfx`: `sfx-delivery` −21,5 → −15,5 dB (8 dB por debajo del nivel V9 original). Voz e imagen sin cambios.
- Export sin música (voz + efectos): `renders/ploot-en-v18-sinmusica-1080p60.mp4`.

## V17 · efectos 10 dB más bajos · 18 septiembre 2026

- Bus `sfx`: `sfx-delivery` −11,5 → −21,5 dB (14 dB por debajo del nivel V9 original). Voz e imagen sin cambios.
- Export sin música (voz + efectos): `renders/ploot-en-v17-sinmusica-1080p60.mp4`.

## V16 · salto de las cards corregido y efectos −4 dB · 18 septiembre 2026

- **Bug del 1:05 (66,10 s)**: al salir la lista de leads, el plano `#s7-leads` (preserve-3d, filas con translateZ 88) se desvanecía con `opacity`; el primer frame con opacidad < 1 aplana el contexto 3D y las cards saltaban a una proyección más pequeña. Ahora el plano sólo se desplaza (`y: −65`) y el fundido lo llevan las filas (`.lrow`). Verificado frame a frame (66,08 → 66,30) y con diferencia de píxeles entre frames consecutivos del MP4.
- **Efectos**: bus `sfx` 4 dB más bajo (`sfx-delivery` −7,5 → −11,5 dB).
- **Export sin música (voz + efectos)**: `renders/ploot-en-v16-sinmusica-1080p60.mp4`.

## Entrega actual · 17 septiembre 2026

`renders/ploot-en-client-v4-1080p60.mp4` — banner y descripción definitivos. Inglés: música Bonkers de V1, tramo chill y cierre hablado Ploot. Ver `BRIEF.md` y `review/client-v4/`.

# Ploot · English · Luke C

## Revisión de sonido · referencia Gojiberry · 16 septiembre 2026

Nueva paleta de efectos en ambas versiones: contactos de interfaz, apoyos de panel, deslizamientos cortos, señales, mensajes, confirmaciones y mecanismo de tragaperras. La versión EN utiliza 165 clips de efectos tras agrupar duplicados próximos; el resto del montaje conserva sus tiempos y contenido.

**Prueba actual:** `renders/ploot-en-sfx-reference-preview.mp4`. Incluye los efectos nuevos y **mantiene provisionalmente la música Bonkers anterior**. La nueva música está pendiente de generación por la usuaria con `../audio-reference/gojiberry/music-prompt.txt` y el audio adjunto allí. No sustituir la música hasta recibir esa pista; entonces habrá que ajustar entrada, niveles y carve a cada voz.

Fuente de efectos: `src/reference-sound.mjs` + `src/reference-palette.json`; los acentos se alinean por sus picos al reloj visual existente. Copia previa y pruebas en `review/reference-sound/`. HyperFrames actualizado de 0.8.40 a 0.8.41 y validado en ambos proyectos.


Separate English localization of the approved Spanish V14. The eight scenes retain the original design, animation, music and effects; English copy and the supplied Luke C voice have their own timing.

- Studio: http://localhost:3005/#project/ploot-video-en
- Export: `renders/ploot-en-v1-luke-1080p60.mp4`
- Composition: `index.html`, registered timeline `main`
- Canvas: 1920 × 1080, 60 fps
- Authored duration: 81.139091 seconds
- Verified MP4: 81.15 seconds, 52.26 MB, 4,869 frames, H.264/AAC with fast start

## Editing

Edit the modules in `src/`; `index.html` is generated.

```sh
node src/build.mjs
npm run check
npx --yes hyperframes@0.8.40 preview --background --port 3005
```

- English text and interfaces: `src/scenes/` and `src/lib.mjs`
- Voice segments: `src/voice-luke.json`
- Shared timing map and final contact sequence: `src/beat-sync.json`
- Motion: `src/tl/`
- Audio placement and mix: `src/audio.mjs`
- Music carve against Luke's assembled voice: `src/carve/music-bonkers.json`

The imported voice in `.media/audio/voice/voice_001.mp3` is an unchanged copy of the user-supplied Luke C recording. Its 26 segments play at original speed. If their timing changes, rebuild the assembled voice and music carve before exporting; the scripts used for this version are in `review/en-v1/`.

## Export

```sh
npm run render -- --quality looks --fps 60 --resolution landscape --workers 1 --strict --output renders/ploot-en-v1-luke-1080p60.mp4
python3 review/en-v1/verify-export.py
```

The CLI is pinned to 0.8.40. Quality `looks` uses CRF 16. The MP4 includes H.264 video and AAC audio.

## Review evidence

See `review/en-v1/REVIEW.md`, `check.json`, `motion-continuity.json`, `text-inventory.txt`, `final-frames/` and `export-verification.json`. The pre-render source archive and SHA-256 manifest are stored alongside them. `frames/` contains an earlier diagnostic pass; `final-frames/` and `export-frames/` are the reviewable outputs.

The approved Spanish project remains in `../ploot-video`.
