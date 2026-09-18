## V18 · efectos +6 dB sobre V17 · 18 septiembre 2026

- Bus `sfx`: `sfx-delivery` −21,5 → −15,5 dB (8 dB por debajo del nivel V9 original). Voz e imagen sin cambios.
- Export sin música (voz + efectos): `renders/ploot-es-v18-sinmusica-1080p60.mp4`.

## V17 · efectos 10 dB más bajos · 18 septiembre 2026

- Bus `sfx`: `sfx-delivery` −11,5 → −21,5 dB (14 dB por debajo del nivel V9 original). Voz e imagen sin cambios.
- Export sin música (voz + efectos): `renders/ploot-es-v17-sinmusica-1080p60.mp4`.

## V16 · salto de las cards corregido y efectos −4 dB · 18 septiembre 2026

- **Bug del 1:05 (66,10 s)**: al salir la lista de leads, el plano `#s7-leads` (preserve-3d, filas con translateZ 88) se desvanecía con `opacity`; el primer frame con opacidad < 1 aplana el contexto 3D y las cards saltaban a una proyección más pequeña. Ahora el plano sólo se desplaza (`y: −65`) y el fundido lo llevan las filas (`.lrow`). Verificado frame a frame (66,08 → 66,30) y con diferencia de píxeles entre frames consecutivos del MP4.
- **Efectos**: bus `sfx` 4 dB más bajo (`sfx-delivery` −7,5 → −11,5 dB).
- **Export sin música (voz + efectos)**: `renders/ploot-es-v16-sinmusica-1080p60.mp4`. El sting final es el español (\`voice_brand_ploot_es.mp3\`).

## Exportaciones sin música + música V2 con acentos · 17 septiembre 2026 (noche)

- **Sting final en español**: `.media/audio/voice/voice_brand_ploot_es.mp3` (aportado el 17-09) sustituye al «Ploot.» inglés en `src/voice-es.json` (clip `vo-brand-end`, palabra alineada al mismo instante, nivel igualado con `volume: 0.62`). Export sin música actualizado: `renders/ploot-es-v15b-sinmusica-1080p60.mp4`.
- **Sin música, con voz y efectos** (referencia para valorar la música aparte): `renders/ploot-es-v15-sinmusica-1080p60.mp4` y `../ploot-video-en/renders/ploot-en-v15-sinmusica-1080p60.mp4` (81,15 s · 1080p60). Se generan con `PLOOT_NO_MUSIC=1 node src/build.mjs` (interruptor en `src/audio.mjs` de los dos proyectos) y después se reconstruye sin la variable.
- **Música V2 (Ready for Action, stems)**: `renders/ploot-es-readyforaction-v2-preview-1080p60.mp4`. Cada etapa arranca en un primer tiempo del tema justo en su anclaje: chill = piano desde su primer tiempo con el vídeo (canción 0,22); medio = el drop B (52,58) al salir del silencio de «Cero reuniones»; fuerte = el drop final/clímax (124,58) en el burst de Ploot; resolución = golpe final (160,05) sobre el logo. Más energía: +2 dB de fondo, +2/+3 dB por etapa, carve más suave (0,25). Nueva capa de 11 acentos musicales sacados de los stems (stabs de orquesta, impactos, golpe de batería) en los cortes y rótulos fuertes (blanco, naranjas, negro, Seguir, «Y nadie las ve», Uno/Dos/Tres, web del cierre, clic CTA), con el pico de cada archivo sobre el frame. Tabla: `src/squad-music-v2.json`; mezclas `.media/audio/bgm/squad2-*.wav` y golpes `hit-*.wav`. Inglés todavía con Groove V7.

## Prueba de música · «Ready for Action» (Grisly Brill, Artlist, stems) · 17 septiembre 2026 (noche)

**MP4 de prueba:** `renders/ploot-es-readyforaction-preview-1080p60.mp4`. Sustituye la prueba de Blooming (descartada por la usuaria).

- 110 BPM exactos, sin estirar. La canción corre en su propio reloj desplazado 1,473 s (canción = vídeo + 1,473): sus pulsos caen en la rejilla de la animación y su segundo drop (52,58 s de la canción) en el burst de Ploot (51,09). El primer golpe (35,13) cae en el travelling de la línea de relación; la sección pesada (70,02) entra con el clic de «enviar» (68,55); el golpe final del tema (160,05) se coloca sobre el logo (78,91).
- Tres intensidades construidas con los stems, sin la pista de voces de apoyo (instrumental): chill = piano solo y subida con sintes suaves, guitarras y orquesta contenidas; medio = todos los stems con batería, guitarras y bajos algo bajados; fuerte = todos a nivel. Los silencios del vídeo (27,22–29,27 y 48,09–51,09) se respetan. Mezclas por etapa en `.media/audio/bgm/squad-*.wav` (con 4 dB de margen), tabla en `src/squad-music-v1.json`; los stems originales siguen en `../stems-zip-Grisly Brill - Squad Kill-wav/`.
- Niveles por etapa calibrados a los del montaje Groove V7 aprobado; carve por etapa contra la voz española (fuerza 0,35, `src/carve/squad-*.json`). Para volver atrás: en `src/audio.mjs` cambiar `squad-music-v1.json` por `groove-music-v7.json` y reconstruir.
- Validación: lint 0 errores, check pasa.

## Prueba de música · Blooming (Artlist) a 110 BPM · 17 septiembre 2026 (noche)

**MP4 de prueba:** `renders/ploot-es-blooming-preview-1080p60.mp4` (sólo para valorar la música; el montaje es el ES sobre el inglés V15 de esta tarde).

- «Silly Putty · Blooming (instrumental)», 114 BPM, ralentizada un 3,5 % a 110 BPM para que sus compases pisen la rejilla de la animación (todos los acentos visuales están en corcheas de 110 BPM desde 23,0 s).
- Siete cortes en primer tiempo de compás (`src/blooming-music-v1.json`, archivos `.media/audio/bgm/blooming-*.wav`): chill 0–27,22 (cuatro fragmentos sin batería del propio tema) · silencio de «Cero reuniones» · medio 29,27–48,09 (su intro con batería) · silencio antes del reveal · fuerte 51,09–78,91 (su drop cae en el burst de Ploot) · resolución 78,91–81,14 (el final propio del tema sobre el logo).
- Niveles por etapa calibrados a los del montaje Groove V7 aprobado (−27 / −20,6 / −12,9 LUFS efectivos antes del bus); carve contra la voz española por segmento (fuerza 0,35, `src/carve/blooming-*.json`). Para volver a Groove: en `src/audio.mjs` cambiar `blooming-music-v1.json` por `groove-music-v7.json` y reconstruir.
- Validación: lint 0 errores, check pasa. Maquetas de escucha de las tres candidatas en `../Musica/candidatas/` (`planes.json`, `plan-C-110bpm.json`).

## Revisión actual · ES sobre el montaje inglés · 17 septiembre 2026 (tarde)

**Sin exportar** (no se ha pedido). Revisar en Studio · main: http://127.0.0.1:3004/#project/ploot-video

- El vídeo español es ahora **idéntico al inglés V15** en movimientos, efectos y música: mismas escenas y timelines (`src/tl/`, `src/styles.css`), mismo reloj de pulso (`src/beat-sync.json`, copiado del inglés), mismos ~165 efectos (`src/audio.mjs`, `reference-sound.mjs`, paletas v6–v11) y el mismo montaje de Groove Theory (2) V7 (`src/groove-music-v7.json`; los cinco cortes .wav del inglés copiados como `.media/audio/bgm/bgm_en7_*.wav`). Duración **81,139 s · 60 fps**.
- Sólo cambia la voz: la toma en español recibida por WhatsApp (`.media/audio/voice/voice-whatsapp-es.mp3`, 72,05 s), cortada en 27 frases (`src/voice-es.json`) y colocada sobre los mismos anclajes visuales que la voz de Luke. Cada corte cae en un silencio real de la toma; la palabra clave de cada frase aterriza a ±0,4 s del mismo momento visual que en inglés («sin enterarte» en el naranja, «Ploot» en el burst, «al lead / momento justo / agendarte» sobre chat y calendario, «Agenda una demo» sobre el botón). Cierre con el mismo sting hablado «Ploot.» del inglés.
- Nivel de voz igualado al de Luke (la toma española es 4,6 dB más fuerte: `voice-match` −6,8 dB). Carve de la música recalculado frase a frase contra la voz española (fuerza 0,35, igual que en inglés; `src/carve/music-groove-v2-*.json`).
- Textos en español ya presentes en `src/scenes/` y `src/lib.mjs` (banner español `.media/images/image_002.png`); números con formato español (`helpers.js`).
- `client-v4-picture.html` (copia de la exportación sólo-imagen de la mañana) renombrado a `.disabled`: como segunda composición raíz hacía fallar el lint. Copia previa completa de este cambio: `review/es-from-en-v1/before.tgz`.
- Validación: lint 0 errores, `hyperframes check` pasa; 15 frames comparados con los mismos instantes del inglés, idénticos salvo el idioma.
- Pendiente: música nueva (el cliente rechaza Groove Theory). Cuando llegue la pista, se sustituye en los dos proyectos con el mismo esquema de tres etapas (0–27 s · 29–48 s · 51–79 s) y se repite el carve.

## Entrega actual · 17 septiembre 2026

`renders/ploot-es-client-v4-1080p60.mp4` — banner y descripción definitivos. Español: audio intacto. Ver `BRIEF.md` y `review/client-v4/`.

# Ploot · vídeo de motion graphics para la landing

## Revisión de sonido · referencia Gojiberry · 16 septiembre 2026

Nueva paleta de efectos en ambas versiones: contactos de interfaz, apoyos de panel, deslizamientos cortos, señales, mensajes, confirmaciones y mecanismo de tragaperras. La versión ES utiliza 167 clips de efectos tras agrupar duplicados próximos; el resto del montaje conserva sus tiempos y contenido.

**Prueba actual:** `renders/ploot-es-sfx-reference-preview.mp4`. Incluye los efectos nuevos y **mantiene provisionalmente la música Bonkers anterior**. La nueva música está pendiente de generación por la usuaria con `../audio-reference/gojiberry/music-prompt.txt` y el audio adjunto allí. No sustituir la música hasta recibir esa pista; entonces habrá que ajustar entrada, niveles y carve a cada voz.

Fuente de efectos: `src/reference-sound.mjs` + `src/reference-palette.json`; los acentos se alinean por sus picos al reloj visual existente. Copia previa y pruebas en `review/reference-sound/`. HyperFrames actualizado de 0.8.40 a 0.8.41 y validado en ambos proyectos.


## Revisión actual · V14 · mensaje, calendario y cierre sin espera

**MP4:** `renders/ploot-v14-secuencia-1080p60.mp4` · **1920×1080 · 60 fps · 84,7 s · 55,72 MB**. H.264 + AAC con inicio rápido, exportado y verificado.

- Primero aparece el mensaje. Sale por completo a 73,195 s y entonces entra el calendario; ambas interfaces conservan el movimiento flotante 3D.
- Las doce demos se completan antes de terminar «para agendarte reunión». El calendario sale y se pasa al cierre al terminar la frase.
- Se eliminan 6,272728 s de espera. La voz del cierre se adelanta junto con su animación; la siguiente frase empieza 71 ms después de «reunión».
- Música Bonkers continua, con atenuación recalculada para la nueva locución montada. Mezcla exportada: **−22,11 LUFS / −4,03 dBTP**.

Composición `main`, duración fuente **84,698181 s**. Se conservan los ajustes de sincronización, nitidez de «Siguiendo» y desaparición de señales de V13. Validación: 0 errores, 0 conflictos de movimiento y 0 diferencias de seek inverso; muestreo a 120 Hz sin coexistencia del chat/calendario; 5.082 fotogramas del MP4 decodificados sin errores. Evidencias: `review/v14-secuencia/REVIEW.md`. Los apartados siguientes son históricos.

## Revisión anterior · V13 · sincronización y pestañas flotantes

**MP4:** `renders/ploot-v13-ajustes-1080p60.mp4` · **1920×1080 · 60 fps · 90,983 s · 61,90 MB**. H.264 + AAC con inicio rápido, exportado y verificado.

- Se adelantan las imágenes de web, contenido, perfil, seguimiento y competencia para acompañar a la voz; las transiciones muestran el visual antes de completar el aterrizaje.
- «Siguiendo» se dibuja a tamaño nativo al terminar el zoom, con la misma posición y ondas. Texto y bordes nítidos en el MP4.
- Las señales descartadas del paso 2 llegan a opacidad cero, sin dejar restos ni desplazar las seleccionadas.
- Chat y calendario se sincronizan con «Contactamos al lead / en el momento justo / para agendarte reunión». El calendario entra a 73,195 s. Ambas interfaces flotan en perspectiva, conviven brevemente y después el calendario ocupa el plano.
- Voz Dani, música Bonkers y ganancias conservadas. Efectos ajustados a las nuevas acciones. Mezcla exportada: **−22,30 LUFS / −4,08 dBTP**.

Composición `main`, duración fuente 90,970909 s. `node src/build.mjs` reconstruye el HTML. `s7Contact(tl)` usa tiempos finales y se añade después del remapeo general. Validación: 0 errores, 0 conflictos de movimiento, 0 diferencias de seek inverso; MP4 completo decodificado sin errores. Evidencias y decisiones: `review/v13-sync/REVIEW.md`. Los apartados siguientes conservan el historial anterior.

## Revisión anterior · V12 · voz de Dani

Composición `main`: **90,97 s · 1920×1080 · 60 fps**. Se sustituye la voz anterior por el archivo de **Dani — Hurried, Dynamic and Engaging**, aportado por la usuaria. La propuesta de Javier queda descartada antes de incorporarse a la composición.

- La toma de Dani se divide en **26 clips**, con cortes dentro de silencios medidos. Se conserva todo el contenido hablado y la velocidad original del archivo.
- El bloque de «Estás perdiendo mucho dinero / Sin enterarte» gana 1,30 s y la presentación del sistema gana dos pulsos (1,091 s). El resto conserva la continuidad, los acentos y los tiempos de lectura de V11.
- **Bonkers Beat Club** continúa como música de fondo a **110 BPM**. Entra ahora a **21,65 s**, en «¿Y qué hacemos?». La música se vuelve a ajustar contra la voz de Dani ya montada; los efectos conservan su nivel y acompañan los nuevos tiempos.
- La locución se compensa 2,2 dB tras su procesamiento para mantener el nivel de voz anterior. El subtítulo del cierre pasa a «y analizamos tu caso», como dice esta toma.

**MP4 V12 exportado por petición de la usuaria:** `renders/ploot-v12-dani-1080p60.mp4` · **1920×1080 · 60 fps · 90,983 s · 54,93 MB**. H.264 + AAC, con inicio rápido. Archivo completo decodificado sin errores y fotogramas revisados. [Studio · main](http://127.0.0.1:3004/#project/ploot-video). Evidencias: `review/v12-dani/REVIEW.md`.

Tiempos de voz y cortes de fuente: `src/voice-dani.json`. Anclas de movimiento y volumen de música: `src/beat-sync.json`. `node src/build.mjs` reconstruye `index.html`. Los apartados siguientes son el historial y sus estados quedan subordinados a V12.

## Revisión anterior · V11 · música elegida y acentos al pulso

Composición `main` de `ploot-video`: **88,58 s · 1920×1080 · 60 fps**. La música elegida por el cliente es **«High Energy Bad Attitude» — Bonkers Beat Club**, archivo aportado por la usuaria. La locución actual sigue pendiente de sustitución.

- **Entrada a 20,35 s**, en «¿Y qué hacemos?»: fundido suave sobre la introducción de la canción. Desde ahí una sola pista continua hasta el cierre, con un pequeño refuerzo al aparecer Ploot, a 49,80 s.
- **110 BPM**, confirmado con los metadatos y el pulso de la fuente. Se recolocan 42 acentos principales: entradas, clics, señales, logo y los tres pasos. Los párrafos y las demos siguen subdivisiones del pulso; se conservan las pausas de lectura.
- **Música de fondo**, con control adicional de nivel después del bus y atenuación bajo la voz. Durante la pausa del chat/calendario se contiene su recuperación de volumen para que destaquen los efectos. Voz y paleta de efectos V6 mantienen sus ganancias anteriores.
- La atenuación se calcula contra la locución ya montada, con sus cortes y silencios reales. El grupo de referencia sigue siendo `voiceover`.
- Las correcciones de contenido de V10 se conservan: sin estadísticas, un mensaje dividido en párrafos, perfiles variados, doce demos y puentes visuales sin negro vacío.

**Exportación en pausa por petición de la usuaria. No hay MP4 de V11.** Revisar en [Studio · main](http://127.0.0.1:3004/#project/ploot-video). Evidencias: `review/v11-bonkers/REVIEW.md`.

La fuente de tiempos se mantiene legible en `src/tl/` con los relojes de V10. `src/beat-sync.json` define las anclas y `src/beat-clock.mjs` aplica el mismo ajuste a la timeline, a la visibilidad de escenas y a las entradas de voz/efectos. El audio se reproduce siempre a velocidad original. `node src/build.mjs` regenera `index.html`.

## Revisión anterior · V10 · contenido y ritmo

Composición `main` en `ploot-video`: **88,58 s · 1920×1080 · 60 fps**. Esta revisión sustituye los cambios afectados de V9 y del historial.

- El negro vacío posterior a «Cero reuniones» se convierte en el puente claro «Porque en B2B». Se recorta la espera antes del reveal y se añade «Por eso hemos creado» mientras aparece Ploot.
- «Como hace 5 años» tiene más tiempo en pantalla; «Que nadie abre» enlaza antes con la tragaperras. Entradas tipográficas más suaves y con menos inclinación y escala.
- Los tres pasos tienen entradas de 850–900 ms, acciones completas y tiempo para ver su resultado. Se elimina el bloque de estadísticas completo: 1–5 %, comparativa ×12 y sello «El sistema funciona», incluida su locución y efectos.
- Un único mensaje de LinkedIn a Noemí Herrero, dividido en tres párrafos, con un envío y una respuesta. Se retira la repetición en correo.
- Perfiles variados: Pablo, Lucía, Sofía, Alfred, Nuria, Noemí, Javier e Irene según el plano, manteniendo la identidad dentro de cada interacción.
- Calendario con **12 demos y nombres variados**, siguiendo los ejemplos públicos de la web de Ploot. La semana completa permanece visible unos 2,5 s antes de salir al cierre.
- **Música y locución provisionales**: la usuaria está buscando sustitutas. Se reutilizan las pistas existentes, se recolocan los cortes y efectos afectados y se recalcula la atenuación de música bajo la voz. No se considera aprobada la mezcla definitiva.

Revisión y evidencias: `review/v10-content/REVIEW.md`. V9 se conserva como entrega anterior. Los tiempos históricos siguientes no describen la V10.


Referencia anterior: composición HyperFrames basada en el storyboard del cliente: 90,45 s, lienzo de 1920×1080 y ocho bloques, con locución grabada, música y efectos sonoros. Los tiempos visuales siguen la locución; la mezcla musical vigente se describe debajo.

## Entrega web · V9 comprimida

`renders/ploot-landing-v9-web-1080p60.mp4` · **1920×1080 · 60 fps · 26.75 MB** · 85.5 % menos peso que el máster 4K.
Mantiene los 5.427 fotogramas y el AAC original. MP4 con `faststart` para reproducción durante la descarga. H.264 CRF 20; calidad verificada con fotogramas y VMAF medio 96.17 respecto al máster reducido a 1080p.
Evidencias: `review/v9-web/REVIEW.md`.

## Entrega anterior · V9, acabado y exportación 4K

Composición `main` del proyecto `ploot-video`, duración 90,45 s. Lienzo lógico de 1920×1080; exportación directa desde HTML con DPR 2 a **3840×2160 y 60 fps**, H.264 CRF 14 y AAC estéreo.

MP4 verificado: `renders/ploot-landing-v9-4k60.mp4` · **3840×2160 · 60 fps** · 90,45 s · 175.9 MiB. H.264 CRF 14 y AAC estéreo. Mezcla exportada: **-20.82 LUFS / -3.53 dBTP**, sin normalización adicional. Se han revisado fotogramas extraídos del MP4.

- Efectos **2,5 dB más presentes** que en V8. Música y voz conservan su nivel.
- La música del reveal llega a su último acorde a 70,389 s y termina a **71,28 s**; SLIDA vuelve en ese mismo instante desde su introducción, con una entrada suave de 650 ms.
- Se retiran desenfoques persistentes de tarjetas y textos, se reduce el blur de salida y se limpian los filtros cuando terminan entradas y frenadas. Los avatares y el banner mantienen el detalle de las fuentes originales.
- Lista de leads más frontal; respuesta del chat 100 ms antes con un desplazamiento corto; fondo claro bajo el titular del paso 1 para mantenerlo legible durante el zoom.
- Se mantiene la continuidad y el ritmo de V8, el banner aportado, las cards que suben y se desvanecen hacia naranja, los chats actuales y la trayectoria continua del ×12.

`npm run check`: 0 errores. Auditoría de 2.314 tweens/sets: 0 conflictos y 0 diferencias de estado al recorrer la composición en sentido inverso con `window.__hf.seek`.
Detalles y evidencias: `review/v9-finish/REVIEW.md`. Fuente congelada: `review/v9-finish/render-source.tgz`.

## Historial de versiones

Los apartados siguientes describen revisiones anteriores. La V9 de arriba sustituye sus ajustes afectados y su estado de exportación.

## Exportación anterior · V8, mezcla y fluidez

MP4: `renders/ploot-landing-v8-slida.mp4` · 1920×1080 · 30 fps · H.264 + AAC estéreo · 90.467 s · 46.0 MiB.
Composición `main` del proyecto `ploot-video`.

- Música 3 dB más baja. Fundido de 1,2 s hacia el reveal y regreso a SLIDA entre 70,38 y 71,28 s, antes de «La media de tasa de respuesta».
- Salida de tragaperras continua hacia naranja; calendario se aleja con aceleración en 380 ms; bandeja entra 580 ms antes; confianza enlaza a negro con la siguiente frase.
- El scroll ya está en marcha cuando entra «Lo demuestran». Fondo uniforme a negro en 240 ms después de «Y nadie las ve».
- Rótulos pequeños DOS/TRES retirados; sus planos de título se conservan. Chats rediseñados con menor inclinación y escritura estable. ×12 sigue una única trayectoria curva.
- Se conservan el banner de LinkedIn, la transición acordada a «Son señales de compra» y los 208 efectos; se realinean los acentos afectados. Voz a −2 dB.
- Mezcla exportada: -20.94 LUFS / -3.28 dBTP. Verificación de formato y fotogramas desde el MP4 final.

`npm run check`: 0 errores; 8 advertencias estructurales y 3 de contraste anteriores. Auditoría de movimiento: 0 conflictos y 0 diferencias al recorrer la timeline en sentido inverso.
Detalles y evidencias: `review/v8-flow/REVIEW.md`. Fuentes del render: `review/v8-flow/render-source.tgz`.

## Exportación anterior · V7 con SLIDA

MP4 exportado: `renders/ploot-landing-v7-slida.mp4` · 1920×1080 · 30 fps · H.264 + AAC estéreo · 90,467 s · 45,8 MB.
Incluye todos los últimos cambios de animación, banner y sonido. Verificado con FFprobe y fotogramas extraídos del MP4.
Render local HyperFrames 0.8.40: captura screenshot con GPU hardware; 2 min 11 s.
Las menciones a exportación pendiente en el historial quedan sustituidas por este archivo.

## Prueba vigente · SLIDA, Jiggz

Primera parte con `assets/music/parte-1-slida.mp3`, instrumental aportado por la usuaria.
Se usan 0–50,70 s a velocidad original; entrada 0,25 s y salida 0,35 s al reveal de Ploot.
Ganancia 0,218 para compensar sus −9,63 LUFS frente a −13,45 LUFS de Música P1 V2.
Carve recalculado contra `voiceover`, fuerza 0,45. Los 208 efectos, la voz, la segunda canción y las animaciones se conservan.
Metadatos de la fuente: 148 BPM; la prueba usa el montaje visual existente.
Evidencias y preescucha: `review/music-slida/`. Versión anterior recuperable desde `before.tgz` en esa carpeta.

## Revisión vigente · transición, banner, detalle sonoro y ritmo

- **43,96–45,05 s:** las tres webs salen hacia arriba y se desvanecen; el fondo claro se transforma a naranja. «Son señales de compra» entra palabra a palabra desde 44,36 s. Sustituye la prueba de desplazamiento lateral.
- **39,3–40,7 s:** banner adjunto en el perfil de Ploot, conservando su proporción 4:1. El rótulo sale antes de acercarnos a Seguir para evitar que se cruce con el texto del banner.
- **Primera parte:** 53 acentos añadidos a las 155 entradas V6 (208 en total): contactos, tarjetas, monedas, señales, mensajes, mecanismo de tragaperras y dos glitches breves. `src/sound-detail.mjs` mantiene el detalle separado de la base V6. Ningún whoosh adicional.
- **Ritmo:** titulares con intervalos de hasta 120 ms y entradas de 360 ms por defecto; asentamientos más breves en webs, bandeja, dashboard, perfiles, mensajes y equipo. Relevos de propiedades ajustados para conservar continuidad.
- **Mezcla:** −21,06 LUFS / −2,77 dBTP. Música P1 V2, segunda canción y voz −2 dB conservadas. Duración **90,45 s**.

Evidencias y preescucha: `review/rhythm-banner/REVIEW.md`. Composición `main` en Studio; no hay nuevo MP4.
Los apartados siguientes son el historial de pruebas y quedan subordinados a esta revisión.

## Último ajuste · entrada a «Son señales de compra»

A los 43,86–44,50 s, las webs se desplazan hacia la izquierda mientras un plano naranja entra desde la derecha.
El titular viaja con el plano y termina de asentarse a los 44,56 s. Se retira el antiguo bloque que crecía desde
«Tu web». Adaptación del componente `directional-wipe`, con una curva compartida `power3.inOut` de 0,64 s.
Música P1 V2, voz, efectos y tiempos de las escenas conservados. Evidencias: `review/signals-transition/`.

## Prueba vigente · Música P1 V2

Se sustituye la primera canción por `assets/music/parte-1-v2.mp3`, copia de «Musica P1 V2.mp3» aportada por la usuaria.
Se usan los primeros 50,70 s a velocidad original, con entrada de 0,25 s y salida de 0,35 s hasta el reveal.
Ganancia 0,339: compensa los 1,44 LU de diferencia respecto al fragmento anterior. Se recalcula el carve contra
el grupo de voz a fuerza 0,45. La segunda canción, la voz, los efectos V6 y la animación conservan sus ajustes.
La nueva pista indica 107 BPM en sus metadatos; los cortes visuales existentes no se han retemporizado.
Las referencias a 168 BPM y al drop de la primera canción en el historial describen la versión anterior.
Evidencias y preescucha: `review/music-p1-v2/`. Backup reversible: `review/music-p1-v2/before.tgz`.

## Base conservada · efectos V6 y ventanas desde los bordes

Petición: recuperar el carácter de los efectos del render V6 y proponer otra animación para «Más herramientas / Más ruido».

- **Sonido:** recuperadas las 155 entradas originales del V6, con los mismos archivos, tiempos, recortes y ganancias por clip, desde `review/motion-polish/source-before.tgz`.
- **Mezcla:** voz a −2 dB; música y carve conservados. Bus SFX a 0,9 con EQ y limitador de V6 y ajuste de salida a −10 dB para mantener margen. Se recuperan los efectos, con un balance de salida distinto al MP4 V6.
- **21,35–24,1 s:** seis ventanas de herramientas entran desde los bordes; treinta mensajes se acumulan con cadencia acelerada alrededor del titular central. «Más ruido» aparece en naranja. Las ventanas salen juntas hacia arriba y descubren el calendario vacío.
- **Fluidez general:** se mantienen las mejoras de cámaras, texto, cursores y transiciones de las revisiones anteriores.

Duración **90,45 s**. Preescucha `review/v6-return/audio-preview.m4a`; evidencia `review/v6-return/REVIEW.md`.
La versión actual está en Studio. No hay un nuevo MP4 exportado.

## Cómo se construye

`index.html` **se genera**: no lo edites a mano. El código fuente vive en `src/`:

| Ruta | Qué es |
| --- | --- |
| `src/styles.css` | Sistema de diseño: paleta, tipografía, cards, cursores, mocks de UI |
| `src/lib.mjs` | Componentes HTML (cards de señal, webs, chats, cursores, isotipo vectorial) |
| `src/scenes/s1..s8.mjs` | Markup + CSS de cada bloque del storyboard |
| `src/tl/helpers.js` | Helpers de animación (palabra a palabra, máscara izq→der, clic, contador, trazo…) |
| `src/tl/s1..s8.js` | Timeline GSAP de cada bloque (tiempos absolutos = inicio de escena + offset) |
| `src/motion-cues.mjs` | Relojes compartidos entre rodillos, oleadas de mensajes y sonidos |
| `src/sound-design.mjs` | Genera mecanismo y glitches a partir de los SFX locales; requiere FFmpeg |
| `src/sound-palette.mjs` / `.json` | Edita once sonidos cortos de la biblioteca y mide sus picos para colocarlos |
| `src/audio.mjs` | Voz en off por frases, SFX con su momento visual (tiempos relativos a cada bloque) y colocación de la música |
| `src/carve/*.json` | Carve de cada clip de música contra la voz (lo escribe `carve.mjs`, el build lo reinyecta) |
| `src/build.mjs` | Ensambla todo en `index.html` |

```bash
node src/sound-design.mjs     # sólo si cambian las curvas/tiempos de rodillos o el diseño sonoro
node src/sound-palette.mjs    # sólo si cambia la paleta sonora; escribe también sound-palette.json
node src/build.mjs            # regenera index.html
npm run check                # lint + runtime + layout + contraste
npm run dev -- --background   # Studio para revisar en el navegador
npm run render -- . --quality looks --output renders/ploot-landing-v7.mp4   # exportación de la revisión cuando se necesite
```

## Mapa de tiempos (segundos)

| Bloque | Inicio → fin | Frames del storyboard |
| --- | --- | --- |
| 01 Hook · la pérdida | 0 → 12,0 | 1.1 – 1.15 (sin el contador 1.14: las monedas cortan a «Sin enterarte» = drop de la música, 10,70) |
| 02 El dolor | 12,0 → 20,35 | 2.1 – 2.10 y 2.14 – 2.16 (2.11 – 2.13 «eventos carísimos» fuera: la locución no lo dice) · «Que nadie abre» entra con la voz (15,73) |
| 03 La falsa solución | 20,35 → 27,18 | 3.1 – 3.9 sin los rótulos «Más listas» / «Más mensajes» (negro 25,9 → 27,18, la voz arranca sobre el negro) |
| 04 El insight | 27,18 → 33,96 | 4.1 – 4.8 sin «A quien ya siguen» (la locución dice «…y a quien ya confía») |
| 05 Las señales | 33,96 → 49,52 | 5.1 – 5.16 (negro 49,2) |
| 06 Reveal | 49,52 → 57,59 | 6.1 – 6.12 · «Ploot» cae sobre el burst del logo (50,70) = cambio de canción |
| 07 Pasos 1–3 + prueba | 57,59 → 80,74 | 7.0 – 7.25 sin «Y actuamos en minutos» · «Uno/Dos/Tres», rejilla, ×12 y naranja en tiempos de la parte 2 |
| 08 Cierre + CTA | 80,74 → 90,45 | 8.1 – 8.6 · clics en tiempo, naranja final en el último golpe de la canción (88,12) |

El vídeo pasó de 99,65 s a 90,45 s al acompasarlo a la locución (77,7 s de voz): cada rótulo aparece entre 0 y 0,4 s
después de que la voz diga su frase, los beats sin texto en la locución se acortaron o se quitaron, y los cortes y golpes
fuertes se ajustaron (±0,2 s) al pulso de la música.

El lenguaje de movimiento (curvas, duraciones, cadencias, transiciones) está documentado en
`MOTION.md`; se derivó de la referencia en vídeo del cliente y lo aplican los helpers de `src/tl/helpers.js`.

Los tiempos de cada frame están comentados en `src/tl/sN.js` con su número de
storyboard (por ejemplo `// ---------- 5.9 (31.4 → 32.2) …`). Los valores en
frames del storyboard (AE a 24 fps) se convierten con `fr(n)`.

## Assets

- `assets/brand/` — logotipo e isotipo (blanco, naranja y tinta) y el wordmark
  troceado por letras para el reveal 6.4.
- `assets/avatars/` — 28 retratos recortados de la rejilla original.
- `assets/fonts/` — Manrope (variable) e IBM Plex Mono, embebidas localmente.
- `assets/vo-ploot.mp3` — voz en off (ElevenLabs · Pablo, 77,7 s) y `assets/transcript.json`
  (whisper large-v3, palabra a palabra) con la que se alineó el vídeo.
- `assets/sfx/` — efectos de la biblioteca de HyperFrames y tres WAV derivados locales; procedencia en `CREDITS.md`.
- `assets/music/parte-1.mp3` y `parte-2.mp3` — «Canción parte 1» (168 BPM, 120 s) y «Canción parte 2»
  (121,85 BPM, 30 s) del cliente.

## Audio

- **Voz en off**: 22 clips de `assets/vo-ploot.mp3` (uno por frase; `data-media-start` marca el punto de la
  toma). Cada corte cae dentro de un silencio real de la grabación y lleva fundido de 40/60 ms. Los clips
  viven en el bus `voiceover` (`<hf-audio-group>`): high-pass 90 Hz → +5 dB → compresor 3:1 → limitador
  −1,5 dB. La tabla de frases (relativa a cada bloque) está en `src/audio.mjs`.
- **Música**: «Canción parte 1» va de 0 a 50,70 s (archivo desde 0,75 s): su drop (11,45 s del archivo) cae en
  el corte a naranja «Sin enterarte» (10,70) y su segundo golpe, 40 s después, coincide exactamente con el
  burst de Ploot; ahí se corta y entra «Canción parte 2» con su propio drop (7,90 s del archivo). La parte 2
  dura 30 s, así que su cuerpo (8 compases de 1,97 s) se encadena en tres clips unidos en el primer tiempo del
  compás (compases 1–8, 2–8 y 5–8 + golpe final); el tercero está elegido para que el último golpe del archivo
  caiga en el naranja del cierre (88,12) y su cola muera con la imagen. Volumen de cama: 0,40 / 0,44
  (≈ −22 LUFS en las pausas) y **carve** contra el bus de voz (fuerza 0,45: cinco muescas espectrales donde
  vive la voz y hasta 11 dB de hueco que siguen a la locución). El carve se escribe con
  `node ~/.claude/skills/hyperframes-audio/scripts/carve.mjs --comp index.html --bed <id> --strength 0.45 --core <dir con @hyperframes/core>`
  y se guarda en `src/carve/<id>.json`; `build.mjs` lo reinyecta. Si cambias el volumen de la música, repite el carve.
- **Sound design**: 155 entradas originales del V6: whooshes, impactos, pops, clics, chimes,
  notificaciones, glitch, sparkle, riser y typing, con sus archivos y tiempos originales.
  El bus SFX vuelve a 0,9, low-shelf +1,5 dB a 160 Hz, high-shelf −2 dB a 6 kHz y limitador −3 dB;
  después lleva una ganancia de salida de −10 dB. Las paletas derivadas de revisiones anteriores siguen
  en disco como material de trabajo, pero no forman parte de la mezcla vigente.
- **Ritmo**: parte 1 = 168 BPM (pulso 0,357 s), parte 2 = 121,85 BPM (0,492 s) anclada al burst de Ploot. Los
  cortes de bloque, los cortes a color, «Uno/Dos/Tres», la rejilla, la entrada y aterrizaje del ×12, «El sistema
  funciona», los clics del cierre, el botón y el naranja final están en un pulso de la canción que suena en ese
  momento (ver `src/build.mjs` y los comentarios «on a beat» en `src/tl/s7.js` y `s8.js`), así los impactos y
  clics del sound design caen con la música.
- Comprobación hecha: un mixdown sólo-voz de los 22 clips transcrito con whisper devuelve las 197 palabras de
  la toma original, sin ninguna cortada.

Voz y música mantienen una salida de −1 dB después de sus limitadores. Los 22 clips de voz y cuatro
clips de música conservan tiempos, recortes, ganancias por clip y automatizaciones; la voz tiene además
un fader de bus a −2 dB. Los SFX usan la salida independiente descrita arriba.
Medida de la mezcla: **−21,30 LUFS / −3,88 dBTP**, en `review/v6-return/audio-loudness.txt`.

## Notas de diseño

- Paleta: naranja #f43600 · naranja claro #f97848 · flash #fdece7 · tinta
  #171516 · degradado claro 160° #ffffff → #d5d3ff · negro #0b0b0d.
- Los silencios del storyboard se respetan como cortes a negro; la voz arranca dos veces sobre
  el negro («Porque en B2B…» y «Por eso hemos creado…») para que el corte a imagen caiga en la
  palabra clave.
- Todas las transiciones son transform/opacity/filter seek-safe; nada depende
  de relojes ni de aleatoriedad en tiempo de render (las posiciones aleatorias
  se calculan en el build con semilla fija).
