## V21 · el vídeo se acorta 0,59 s para matar la pausa de las tarjetas · 19 septiembre 2026

Las dos pasadas anteriores movieron el hueco de sitio pero no lo quitaron: la duración del tramo la
fijaba la locución, que deja 1,3 s de silencio entre «Son señales de compra» y «y nadie las ve», y
0,5 s más antes de «Por eso hemos creado Ploot». Esta vez se recorta de verdad.

- **La frase «y nadie las ve» se adelanta 0,59 s** (47,97 → 47,38) y con ella el anclaje
  `nadie-las-ve` (48,091 → 47,50), que arrastra el retroceso de cámara, la apertura de las tarjetas y
  su salida.
- **Todo lo posterior se adelanta 0,59 s**: 32 anclas de pulso, 8 clips de voz y los segmentos de
  música. La composición pasa de **81,139 s a 80,549 s**.
- Resultado en el tramo: campo 3D a 46,22 · retroceso 47,50 · las tarjetas empiezan a salir 48,12 ·
  negro 48,84 · bloque 06 a 49,41. La voz española ocupa 47,30 → 48,82, así que **las tarjetas están
  en movimiento durante toda la frase y el negro entra justo al acabarla**: no queda hold.
- Copia previa completa: `review/v21-tarjetas/before.tgz`.
- Export sin música (voz + efectos): `renders/ploot-en-v21-sinmusica-1080p60.mp4`.

**Pendiente**: la música quedó desplazada 0,59 s en el tramo final (sólo se actualizó su duración para
que el build no fallara). Hay que recolocarla cuando se apruebe una pista.

## V20 · segunda pasada sobre la pausa del 0:47 · 19 septiembre 2026

Se midió el movimiento real del render (diferencia de píxeles entre fotogramas consecutivos, en
tramos de 0,2 s) para localizar los huecos en vez de estimarlos a ojo. Salían dos:

- **48,7 → 49,5 s · las tarjetas**: se quedaban quietas mientras aguantaba «Y nadie las ve». Ahora no
  hay hold: en cuanto llegan a su sitio empiezan a **salir escalonadas** (una cada 0,04 s), cada una
  acelerando hacia su borde y cayendo en profundidad (`power2.in`, 0,3 s). El plano se vacía con
  movimiento y el corte a negro entra 0,2 s antes (`t15` T+14,45 → T+14,28), justo al terminar la
  locución española (49,41 s).
- **45,5 → 46,5 s · la plancha naranja**: el rótulo «Son señales de compra» quedaba clavado y después
  el naranja se quedaba vacío. Ahora el rótulo crece durante todo su hold, el plano empuja despacio
  (escala 1 → 1,05) y **el cambio de color encadena con la salida del texto** (`t13` T+11,95 → T+11,52,
  salida del rótulo T+11,60 → T+11,40): de 1,0 s inmóvil a ~0,6 s.

Export sin música (voz + efectos): `renders/ploot-en-v20-sinmusica-1080p60.mp4`.

**Nota sobre el límite**: el hueco que queda viene de la propia toma de voz, que deja 1,3 s de
silencio entre «Son señales de compra» y «y nadie las ve», y 0,5 s más antes de «Por eso hemos
creado Ploot». Acortar más obliga o a mover esas frases de la locución o a adelantar el bloque 06
completo, lo que desplaza todo el tramo final del vídeo.

## V19 · caras sin repetir y 0:47 más dinámico · 18 septiembre 2026

- **0:32 · bandeja de entrada**: Sofía Marín y Lucía Ferrer compartían retrato (`av23`). Lucía pasa a
  `av29`, un retrato nuevo generado en el mismo estilo de estudio. Las seis filas son ya seis caras
  distintas.
- **0:35 · línea de la relación**: deja de usar a Lucía Ferrer y pasa a **Adrián Vega** (Director de
  Ventas · Talia), nombre y retrato (`av30`) que no aparecen en ningún otro punto del vídeo.
- **0:47 · «Y nadie las ve»**: las tarjetas se quedaban clavadas ~1,3 s y el plano se sentía en pausa.
  Ahora, tras el retroceso, siguen abriéndose **alejándose del centro del frame** y cayendo en
  profundidad hasta el corte, la cámara sigue retrocediendo (0,95 → 0,86, `ease: none`) y la
  disolución empieza antes y dura más (0,5 s), encadenando con el negro. El corte a negro se queda
  donde estaba porque la locución dice «y nadie las ve» hasta 49,41 s.
- **Extra en el mismo plano**: Nuria Vidal aparecía dos veces en el campo de tarjetas; la segunda
  pasa a Marta Rubio. Las ocho tarjetas son ocho personas distintas.
- Export sin música (voz + efectos): `renders/ploot-en-v19-sinmusica-1080p60.mp4`.

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
