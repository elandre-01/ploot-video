---
workflow: general-video
flow: automation
storyboard: no
message: "Ploot detecta las señales de compra que ya existen y convierte a tu equipo en tu mejor canal de ventas"
destination: landing-hero
aspect: 1920x1080
language: es
length: 80.549091s
angle: storyboard-driven product demo, Spanish voice on the English V15 edit (identical picture, SFX and music)
---

## V21 · el vídeo se acorta 0,59 s para matar la pausa de las tarjetas · 19 septiembre 2026

Las dos pasadas anteriores movieron el hueco de sitio pero no lo quitaron: la duración del tramo la
fijaba la locución, que deja 1,3 s de silencio entre «Son señales de compra» y «y nadie las ve», y
0,5 s más antes de «Por eso hemos creado Ploot». Esta vez se recorta de verdad.

- **La frase «y nadie las ve» se adelanta 0,59 s** (47,89 → 47,30) y con ella el anclaje
  `nadie-las-ve` (48,091 → 47,50), que arrastra el retroceso de cámara, la apertura de las tarjetas y
  su salida.
- **Todo lo posterior se adelanta 0,59 s**: 32 anclas de pulso, 12 clips de voz y los segmentos de
  música. La composición pasa de **81,139 s a 80,549 s**.
- Resultado en el tramo: campo 3D a 46,22 · retroceso 47,50 · las tarjetas empiezan a salir 48,12 ·
  negro 48,84 · bloque 06 a 49,41. La voz española ocupa 47,30 → 48,82, así que **las tarjetas están
  en movimiento durante toda la frase y el negro entra justo al acabarla**: no queda hold.
- Copia previa completa: `review/v21-tarjetas/before.tgz`.
- Export sin música (voz + efectos): `renders/ploot-es-v21-sinmusica-1080p60.mp4`.

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

Export sin música (voz + efectos): `renders/ploot-es-v20-sinmusica-1080p60.mp4`.

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
- Export sin música (voz + efectos): `renders/ploot-es-v19-sinmusica-1080p60.mp4`.

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

Ver README (cabecera). Composición 81,139 s, misma imagen/efectos/música que `ploot-video-en` V15, voz española de WhatsApp en `src/voice-es.json`. No exportado.

## Revisión anterior · banner definitivo y música V1 inglesa · 17 septiembre 2026

**Exportación cancelada por la usuaria.** Cambios aplicados y mezcla de revisión preparada; no exportar ni preparar entregas nuevas hasta que lo solicite. Los nombres de entrega que aparecen debajo son previstos, no entregas terminadas.

- Nuevo banner landing aportado por la usuaria; sin logos de clientes, con franja de cifras conservada según el archivo definitivo. Español usa la imagen exacta; inglés mantiene su marca y reconstruye los textos traducidos con tipografía nativa.
- Tagline aprobado y descripción completa de Sobre Ploot, dividida en párrafos y tres beneficios. Inglés traducido.
- Se conservan las correcciones V3: nitidez de tarjetas / Following, chat enviado y leído, calendarios sin año, métricas y Marc Jardí.
- Audio español intacto: la entrega copia sin recodificar la pista de la V3. Los cambios son únicamente banner y textos del perfil.

Entrega: `renders/ploot-es-client-v4-1080p60.mp4`. Evidencias y copia previa: `review/client-v4/`.


## Revisión visual anterior · feedback cliente · 16 septiembre 2026

**Verificado:** MP4 1920×1080 a 60 fps, decodificación completa correcta, audio AAC idéntico (SHA-256 y tiempos de paquetes). Capturas finales revisadas: tarjeta, chat leído, banner, botón, métricas y logo de cierre.

**Solo imagen.** Música, locución, efectos y su temporización se mantienen sin cambios respecto a Groove / glitches V2. Se exporta la imagen a 1080p60 y se copia el AAC de la versión aprobada sin recodificar.

- Tarjetas iniciales y botón Siguiendo / Following: texto y avatar conservan capas 3D independientes para evitar magnificar una textura aplanada de baja resolución.
- Chat frío: el mensaje enviado permanece visible; confirmación Enviado → doble check Leído. Deriva visual continua hasta la salida, sin tocar el reloj global.
- Calendarios sin el año 2026.
- Banner reconstruido con texto nativo, logo naranja de alta resolución, sin logotipos de clientes ni cifras de casos de éxito, titular más bajo.
- Visitan tu perfil / They visit your profile. Descripción provisional: Ploot detecta señales de compra en LinkedIn y las convierte en conversaciones y reuniones comerciales (traducida al inglés).
- Dashboard: aprobar verde / descartar rojo con SVG; pipeline 24 y +7 esta semana; impresiones 460.965 y +303%; engagement +53%; Marc Jardí.
- Cierre sonoro y notas de música aplazados expresamente por petición de la usuaria.

Entrega: `renders/ploot-es-visual-v3-1080p60.mp4`. Evidencias y copia previa: `review/visual-client-v3/`. Las revisiones siguientes son históricas.


## Revisión anterior · Groove y glitches V2 · 16 septiembre 2026

**Verificado:** música -31.3 LUFS (6.8 LU más que V1), mezcla -22.6 LUFS / -3.4 dBTP; MP4 completo decodificado, 1080p60 y fotogramas idénticos.

Se responde a la escucha de la usuaria: glitches más agudos y fluidos, música más presente y recuperación de sus cambios originales.

- Cinco cortes de música conservan la introducción original completa, el cambio de arreglo antes de la pausa y la vuelta del ritmo. Se elimina el bucle repetido de introducción.
- Música ajustada contra la relación voz/música estimada de la referencia; menor fuerza de carve (0,35) para conservar más timbre y dinámica. Voz aprobada intacta.
- Seis nuevos efectos `glitch-air-*`: fragmentos continuos elevados de tono y fundidos suaves; se retira la modulación periódica que daba a los anteriores un sonido entrecortado.
- Los acentos siguen el reloj visual existente. Silencios narrativos y cierre sobre el logo.

**Prueba actual:** `renders/ploot-es-groove-glitch-v2-preview.mp4`. Fuentes en `src/groove-music.json`, `src/reference-sound.mjs`, `src/reference-palette.json` y `src/carve/music-groove-v2-*.json`. Evidencias: `review/groove-glitch-v2/`. Preparación reproducible: `../audio-reference/groove-glitch-v2/`. Los apartados siguientes son históricos.



## Revisión anterior · Groove Theory (2) y glitches · 16 septiembre 2026

**Prueba actual:** `renders/ploot-es-groove-glitch-preview.mp4` · 1920×1080 · 60 fps. Sustituye la prueba anterior con Bonkers.

- Música elegida por la usuaria: `Groove_Theory_2026-09-16T070005 (2).wav`, generada en ElevenLabs. Introducción suave desde 00:00; entrada de la base completa en «¿Y qué hacemos?».
- Siete clips de música con cortes lossless, fundidos nativos, silencio en «Cero reuniones» y antes del reveal de Ploot, y resolución sobre el logo final. Se evita la pausa original de la canción en 44–47 s.
- Carve dinámico de cada clip recalculado contra la locución montada; fuente de análisis `voiceover`, fuerza 0,5. Nivel de fondo discreto.
- 33 acentos glitch breves y variados dentro de 165 clips de efectos: ráfagas, barridos digitales, apagados y bloqueos, sincronizados por sus picos a las acciones existentes. Se conservan los contactos, mensajes y mecanismo de tragaperras.
- Mezcla nativa: -22.7 LUFS / -3.4 dBTP. Voz y código visual idénticos a la versión aprobada.

Fuentes: `src/groove-music.json`, `src/audio.mjs`, `src/reference-sound.mjs`, `src/reference-palette.json` y `src/carve/music-groove-*.json`. `node src/build.mjs` reconstruye el HTML. Preparación reproducible y procedencia: `../audio-reference/groove-glitch/`. Copias previas, comprobaciones y mezcla en `review/groove-glitch/`. Los apartados siguientes son históricos.




## Revisión anterior de sonido · referencia Gojiberry · 16 septiembre 2026

Nueva paleta de efectos en ambas versiones: contactos de interfaz, apoyos de panel, deslizamientos cortos, señales, mensajes, confirmaciones y mecanismo de tragaperras. La versión ES utiliza 167 clips de efectos tras agrupar duplicados próximos; el resto del montaje conserva sus tiempos y contenido.

**Prueba anterior:** `renders/ploot-es-sfx-reference-preview.mp4`. Incluye los efectos nuevos y **mantiene provisionalmente la música Bonkers anterior**. La nueva música está pendiente de generación por la usuaria con `../audio-reference/gojiberry/music-prompt.txt` y el audio adjunto allí. No sustituir la música hasta recibir esa pista; entonces habrá que ajustar entrada, niveles y carve a cada voz.

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

## Prueba vigente · Música P1 V2

Se sustituye la primera canción por `assets/music/parte-1-v2.mp3`, copia de «Musica P1 V2.mp3» aportada por la usuaria.
Se usan los primeros 50,70 s a velocidad original, con entrada de 0,25 s y salida de 0,35 s hasta el reveal.
Ganancia 0,339: compensa los 1,44 LU de diferencia respecto al fragmento anterior. Se recalcula el carve contra
el grupo de voz a fuerza 0,45. La segunda canción, la voz, los efectos V6 y la animación conservan sus ajustes.
La nueva pista indica 107 BPM en sus metadatos; los cortes visuales existentes no se han retemporizado.
Las referencias a 168 BPM y al drop de la primera canción en el historial describen la versión anterior.
Evidencias y preescucha: `review/music-p1-v2/`. Backup reversible: `review/music-p1-v2/before.tgz`.

## Estado actual · 15 septiembre 2026

La composición actual dura 90,45 s e incluye voz en off, las dos canciones del cliente y efectos sonoros.
La petición vigente es recuperar los efectos del render V6 y rehacer «Más herramientas / Más ruido».
Se restauran sus 155 entradas sonoras y se mantiene la voz 2 dB más baja. La nueva escena acumula ventanas
desde los bordes alrededor del titular central y las retira hacia arriba para descubrir el calendario vacío.
El reveal principal ocurre a 50,70 s. El mapa actualizado está en README.md; los tiempos y el requisito
«sin sonido» del planteamiento inicial que sigue son históricos y quedan sustituidos por este estado.

## Intent inicial

Vídeo de motion graphics para el hero de la nueva landing de Ploot. Debe seguir
frame a frame el storyboard cliente v4 («Vídeo para la nueva landing · 3 pasos,
cierre directo»): 8 bloques, 107 frames, ≈64 s, 16:9, hero sin sonido. Frame 1
ya en movimiento, sin fundido de entrada ni logo inicial. Cada línea de locución
entra exactamente con su elemento visual. Tono: tensión creciente en el hook y
el dolor (mundo negro / naranja / degradado claro), giro en el insight, reveal
«encendido» del logo en 0:37 y bloque épico de los 3 pasos hasta el CTA.

Motion: muy fluido y orgánico, principios de animación clásicos (anticipación,
overshoot contenido, follow-through, staging), curvas de animación cuidadas y
transiciones dinámicas que mantengan la unidad y continuidad del vídeo.

## Assets

- ../Logo_Ploot10.png — logotipo completo blanco (isotipo + «Ploot»); cierre 8.6 y cabecera.
- ../Logo_Ploot10_1.png — isotipo naranja #e73e11 (se usa como #f43600 de marca en el reveal 6.x).
- ../Logo_Ploot11_1.png — isotipo blanco.
- ../Gemini_Generated_Image_gggbxegggbxegggb.jpeg — rejilla de 28 retratos; avatares de cards, equipo y perfiles.
- ../Storyboard motion graphics Ploot.pdf — storyboard cliente v4, fuente de verdad de cada frame.

## Customizations

- Cursores oversized (macOS negro y cursores de visitante tipo multiplayer con etiqueta) como portadores del ojo.
- Paneles UI flotando en 3D con oscilación lenta (lenguaje del storyboard).
- Contador mecánico (1.14), monedas € (1.12–1.13), tragaperras (2.14–2.15), split-flap de tiempo (2.2–2.4).
- Reveal del logo a trazo (Trim Paths) con ondas de luz y reencendido de señales (6.x).

## Notes

- Sin audio: el hero se reproduce en silencio. Los cambios de música (0:37) y
  silencios (0:18,5 · 0:36,5) del storyboard se respetan como cortes a negro y
  ritmo visual, no como pistas.
- Paleta: naranja #f43600 · naranja claro #f97848 · flash #fdece7 · tinta #171516 ·
  degradado claro 160° #ffffff → #d5d3ff · negro #0b0b0d · verde leído #1fa463 · dorado Top Voice #e0a832.
- Tipografía: Manrope (titulares y UI) + IBM Plex Mono (etiquetas técnicas), embebidas localmente.
- Maquetas propias sin marca de LinkedIn («red profesional»).
- 30 fps; los frames «f» del storyboard (AE a 24 fps) se convierten a segundos.
