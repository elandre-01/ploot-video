## Revisión actual · ES sobre el montaje inglés · 17 septiembre 2026 (tarde)

**Sin exportar** (no se ha pedido). Revisar en Studio · main: http://127.0.0.1:3004/#project/ploot-video

- El vídeo español es ahora **idéntico al inglés V15** en movimientos, efectos y música: mismas escenas y timelines (`src/tl/`, `src/styles.css`), mismo reloj de pulso (`src/beat-sync.json`, copiado del inglés), mismos ~165 efectos (`src/audio.mjs`, `reference-sound.mjs`, paletas v6–v11) y el mismo montaje de Groove Theory (2) V7 (`src/groove-music-v7.json`; los cinco cortes .wav del inglés copiados como `.media/audio/bgm/bgm_en7_*.wav`). Duración **81,139 s · 60 fps**.
- Sólo cambia la voz: la toma en español recibida por WhatsApp (`.media/audio/voice/voice-whatsapp-es.mp3`, 72,05 s), cortada en 27 frases (`src/voice-es.json`) y colocada sobre los mismos anclajes visuales que la voz de Luke. Cada corte cae en un silencio real de la toma; la palabra clave de cada frase aterriza a ±0,4 s del mismo momento visual que en inglés («sin enterarte» en el naranja, «Ploot» en el burst, «al lead / momento justo / agendarte» sobre chat y calendario, «Agenda una demo» sobre el botón). Cierre con el mismo sting hablado «Ploot.» del inglés.
- Nivel de voz igualado al de Luke (la toma española es 4,6 dB más fuerte: `voice-match` −6,8 dB). Carve de la música recalculado frase a frase contra la voz española (fuerza 0,35, igual que en inglés; `src/carve/music-groove-v2-*.json`).
- Textos en español ya presentes en `src/scenes/` y `src/lib.mjs` (banner español `.media/images/image_002.png`); números con formato español (`helpers.js`).
- `client-v4-picture.html` (copia de la exportación sólo-imagen de la mañana) renombrado a `.disabled`: como segunda composición raíz hacía fallar el lint. Copia previa completa de este cambio: `review/es-from-en-v1/before.tgz`.
- Validación: lint 0 errores, `hyperframes check` pasa; 15 frames comparados con los mismos instantes del inglés, idénticos salvo el idioma.
- Pendiente: música nueva (el cliente rechaza Groove Theory). Cuando llegue la pista, se sustituye en los dos proyectos con el mismo esquema de tres etapas (0–27 s · 29–48 s · 51–79 s) y se repite el carve.

# Lenguaje de movimiento — Ploot

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

## Revisión vigente · efectos V6 y ventanas desde los bordes

Petición: recuperar el carácter de los efectos del render V6 y proponer otra animación para «Más herramientas / Más ruido».

- **Sonido:** recuperadas las 155 entradas originales del V6, con los mismos archivos, tiempos, recortes y ganancias por clip, desde `review/motion-polish/source-before.tgz`.
- **Mezcla:** voz a −2 dB; música y carve conservados. Bus SFX a 0,9 con EQ y limitador de V6 y ajuste de salida a −10 dB para mantener margen. Se recuperan los efectos, con un balance de salida distinto al MP4 V6.
- **21,35–24,1 s:** seis ventanas de herramientas entran desde los bordes; treinta mensajes se acumulan con cadencia acelerada alrededor del titular central. «Más ruido» aparece en naranja. Las ventanas salen juntas hacia arriba y descubren el calendario vacío.
- **Fluidez general:** se mantienen las mejoras de cámaras, texto, cursores y transiciones de las revisiones anteriores.

Duración **90,45 s**. Preescucha `review/v6-return/audio-preview.m4a`; evidencia `review/v6-return/REVIEW.md`.
La versión actual está en Studio. No hay un nuevo MP4 exportado.

## Historial de revisiones

Los apartados siguientes documentan pasadas anteriores; el estado vigente es el descrito arriba.

## Revisión sonora posterior al feedback · 15 septiembre 2026

La usuaria percibió los efectos demasiado altos y el uso de whooshes repetitivo. Esta revisión sustituye el
apartado de sonido de la pasada anterior; los movimientos, imágenes y duración permanecen iguales.

- 155 → 68 entradas; 67 → 5 whooshes. Se retiran los 43 pops y las colas cinematográficas, el riser largo y los sparkles acumulados.
- Paleta de sonidos cortos: contacto, apoyo de panel, grupo de tarjetas, señal, confirmación, mensaje, monedas y marca del logo.
- SFX 0,9 → 0,45 (−6,02 dB respecto a voz/música); menor peso grave y hueco suave para la locución.
- Salida común −7 → −1 dB tras rehacer el equilibrio. Voz, música y carve mantienen sus ajustes relativos y sus tiempos.
- El giro de tragaperras mantiene el reloj de `motion-cues.mjs`; los glitches son puntuales y más discretos.
- Documentación y medidas vigentes: `review/sound-refinement/REVIEW.md`.

## Primera revisión de movimiento · 15 septiembre 2026

Esta primera revisión sustituyó las indicaciones históricas incompatibles que siguen,
en especial el antiguo criterio «sólo graves». Se revisó la grabación de referencia del cliente y los ocho bloques.

- **Continuidad:** separación entre la pose de entrada de texto y su contenedor de salida; crecimiento
  tipográfico continuo, menor inclinación y rebotes más contenidos. Cada movimiento termina antes de que
  otra animación tome la misma propiedad. Se revisaron 2197 tweens; la auditoría no detecta conflictos.
- **Cámaras y UI:** retirada de vaivenes cortos, trayectorias de entrada/deriva/salida encadenadas y aterrizajes
  más suaves. Cursores llegan a los controles con la pose final medida. Convergencia del reveal y cierre del
  logo completan su recorrido antes del siguiente movimiento.
- **Tragaperras (18,40–19,98 s):** aceleración, giro y frenada progresiva por rodillo; paradas a 19,420,
  19,628 y 19,837 s. Imagen y foley comparten `MOTION.slot` y `reelProgress` en `src/motion-cues.mjs`.
  Cuarenta dientes mecánicos y tres topes siguen esa curva. Se sustituyen los tirones globales y el premio sonoro.
- **Glitches:** rebobinado a 13,40 s; saturación de herramientas a 22,65 s; pérdida de señales a 48,61 s.
  Fragmentos cortos, filtrados y con fundidos para puntuación precisa.
- **Sonido de transiciones:** whooshes ajustados a la aceleración de la salida, impactos a la llegada del color,
  checks a la posición real del recorrido de relación; riser moderado y fundidos cortos para evitar cortes secos.
- **Mezcla:** ganancia común de salida −7 dB tras los tres limitadores para mantener margen en la suma.
  Medida del mezclador HyperFrames: −17,84 LUFS / −3,61 dBTP. Tiempos, recortes y ajustes de los 26 clips
  de voz/música permanecen iguales, incluido el carve. Duración total 90,45 s.
- **Lectura:** velo de fondo detrás de «Más herramientas / Más ruido» y ajustes de contraste en etiquetas pequeñas.

HyperFrames 0.8.40. `check`: cero errores; ocho avisos estructurales que ya estaban presentes; cero avisos
runtime, layout o contraste. La comprobación de avance y retroceso no encuentra diferencias visuales en los
puntos auditados. Evidencias y límites de la revisión: `review/motion-polish/REVIEW.md`.

Derivado fotograma a fotograma de la referencia «Grabación de pantalla 2026-09-14 a las 20.34.35.mov»
(vídeo de producto de 70 s, 30 fps) y aplicado a los 8 bloques del storyboard sin tocar su contenido.
Todas las primitivas viven en `src/tl/helpers.js`; cada escena las combina en `src/tl/sN.js`.

## Reglas
1. **Nada se queda quieto.** Todo elemento que aguanta en pantalla deriva despacio (`drift`: +3° rotY,
   −14 px, +2,5 % escala, `sine.out`) o sigue creciendo (`tiltWords` → `grow`).
2. **Entradas que frenan, salidas que aceleran.** Entrar: 0,8–0,9 s `expo.out`/`power4.out`.
   Salir: 0,25–0,45 s `power3.in` con desenfoque. La salida solapa ~0,2 s con la entrada siguiente.
3. **Curvas cortadas.** Ninguna animación vuelve a su origen (sin yoyo ni oscilación); una sola dirección.
4. **Cadencia de texto.** Palabras cada 4 f (0,17 s), cada una sube 46 px en 0,45 s. Letras cada 2 f.
5. **Una frase ≈ 3–4 s:** 0,3 s entra el visual → arranca la línea → ~1,2 s frase completa →
   hold con deriva → 0,3 s salida.

## Primitivas
| Helper | Referencia | Qué hace |
| --- | --- | --- |
| `tiltWords` | todas las líneas | La línea nace inclinada −6° y al 88 %, se endereza en 0,9 s (`power3.out`) mientras las palabras suben una a una; después sigue creciendo hasta 1,05 durante `hold`. |
| `textOut` `up` | cambio de línea | Sube 48 px con desenfoque en 0,26 s; la opacidad cae antes de que aterrice la siguiente. |
| `textOut` `zoom` | «It's time to change» | La frase atraviesa la cámara: escala ×4,6 + blur 18 px en 0,42 s. Bisagra entre bloques. |
| `riseIn` | tabla verde, dashboard | Plano UI que sube 420–520 px desde fuera del frame con rotación X extra, blur 8→0, `expo.out` 0,85–0,9 s. |
| `fallOut` | salida de tarjetas | Cae 240 px, se inclina y desenfoca en 0,3–0,4 s `power3.in`. |
| `drift` | holds | Deriva monótona mientras el elemento aguanta. |
| `popIn` | avatares del radar | Escala 0,6→1 con overshoot `back.out(1.5)`, sube 40 px. |
| `whipOut` | «engages them…» | Todo el grupo se va por la lente (`zoom`) o barre lateral con skew (`pan`). |
| `burstAt` | clic «Try now», logo | Anillo de 16 arcos que vuela hacia fuera y se disuelve en 0,55 s. Va montado en la punta de cada cursor: cualquier `click()` lo dispara donde cae el clic. |
| `speedLines` | «3-5x more» | Ráfagas horizontales cruzando el frame tras un elemento que entra lateral. Disponible; sin uso desde que se quitó el contador. |
| `depth` + `tilt3D` + `orbit3D` | «hoping volume will fix the problem» | Cada card vive a su propia profundidad (translateZ dentro de un `.stage` con perspectiva) y la cámara del plano gira unos grados y avanza en una sola dirección durante el hold: las cards cercanas se desplazan contra las lejanas (paralaje). Aplicado a 1.8–1.10, 2.8–2.13, 3.2–3.5, 5.13–5.14 y 6.6. |
| `wordsPush` | — | Frase que se forma desde el centro: la línea entera se desliza a la izquierda en un solo movimiento continuo (`power2.inOut`) mientras cada palabra sube a su sitio (petición explícita para «Hay personas decidiendo comprar»). |
| `magnetic` | — | «Ahora mismo» y «Porque sigues vendiendo»: palabra a palabra desde la derecha con desenfoque (petición explícita). |

## Bisagras entre bloques (todas `textOut zoom`)
«Justo lo que tú vendes» → cards · «Sin enterarte» → 02 · «Porque sigues vendiendo» → curva ·
«Eventos carísimos sin retorno» → tragaperras · «¿Y qué hacemos?» → herramientas · «Más ruido» → calendario ·
«La gente compra a quien ya conoce» → línea de relación · «Y justo antes de comprar» → torre de control ·
«Son señales de compra» → paneo · «Un nuevo sistema go-to-market» → equipo · «Uno» / «Dos» / «Tres» → sus pasos ·
«El sistema funciona» → 08 · «Deja de perseguir clientes fríos» → web.

## Dónde se dispara el anillo
Send (2.7) · tarjeta (2.9) · palanca (2.14) · icono in (5.6) · Seguir (5.8) · Ver post (7.7) · autor (7.10) ·
Agenda una demo (8.5) · isotipo al cerrar el trazo (6.3) · logo final (8.6).

## Secuencia del mensaje en frío (2.5–2.7, 0:20)
La red profesional (storyboard 2.5: ventana centrada y baja, barra superior, tres columnas) sube desde abajo en
0,5 s (`expo.out`, blur 10→0) con el chat cerrado: solo un botón de chat flotante abajo a la derecha · «Mensajes en
frío» tecleado letra a letra · el cursor entra y va directo al botón de chat; desde que se mueve, la cámara (con el
cursor dentro) pivota sobre el botón, lo lleva al centro y hace zoom ×1,7 en 1,2 s · clic (anillo) y el chat se abre desde el botón hasta el centro exacto del plano
(×1,5, storyboard 2.6) mientras la ventana se funde detrás con blur ·
lectura con crecimiento lento · cursor a Send, clic, la burbuja sale y el cursor se va · el chat sube 200 px y se
asienta algo más pequeño mientras «Que nadie abre» se forma debajo · salida y facturas. (La ráfaga de mensajes
2.8–2.10 se ha eliminado.)

## Storyboard v2 (22:36) · dos visuales nuevos
- **2.2–2.4 «Como hace 5 años»**: chat cálido en el centro (3D −9°/6° con deriva) y seis señales entrando por los
  bordes en cascada de 3 f; iconos de rebobinar con pop + parpadeo de 2 f; las señales pierden foco y vuelven a sus
  bordes (su entrada, invertida); solo queda el chat y el kinetic completo; el chat cae al entrar la red (2.5).
- **6.8–6.12 «Que convierte a tu equipo… en tu mejor canal de ventas»**: el mercado es un plano 3D inclinado
  (`rotationX` 56° → 42° dentro de un `.stage` con perspectiva) y todo lo que vive sobre él se ve en escorzo: blips,
  ondas (elipses) y líneas curvas. Los avatares son esferas de pie (contrarrotadas para mirar siempre a la lente, con
  sombra elíptica) que entran por el borde delantero y van directas a su sitio (una curva suave, `power3.out` 1,0 s)
  encogiendo a nodo con anillo; su centro cae sobre el punto del mapa, así las ondas quedan concéntricas con la cara.
  Dos ondas por avatar mientras «En tu mejor canal de ventas» se compone en el centro, entre los avatares, sobre un
  halo claro; una curva por avatar converge en ese centro, bajo la frase. La cámara hace un único dolly-out lento y
  continuo (sin push-in) y, en cuanto las líneas se han unido, todo se va hacia el fondo en Z (plano `z` −1500) con
  opacidad a 0, la frase con ello, y el recule aterriza justo en el corte a «Uno».

## Eventos carísimos (2.11–2.13) y Más herramientas · listas · mensajes · ruido (3.2–3.5) · referencia 23.19
Ventanas cuadradas (420 px) / altas (440×600) que vienen desde delante en el eje Z: cada card nace justo delante del objetivo (z +720,
grande y fuera de foco) y viaja hacia atrás hasta su profundidad propia (cerca, media, lejos) frenando en seco
(`expo.out` 0,9 s) mientras enfoca; las de los bordes entran barriendo desde fuera del frame por la perspectiva.
Es un flujo continuo: una card nueva cada ~30 ms durante todo el beat (110 en el bloque 03, 80 facturas), con el
centro también cubierto; tras posarse (`power3.out` 1,1 s desde z +900) cada card sigue derivando hacia el fondo a
ritmo constante (−320 px en z) hasta la salida, así el campo fluye de delante hacia atrás sin tandas; profundidad
de −1100 a +200 px; el tipo sigue a la línea en pantalla (herramientas, listas, mensajes, luego los chips).
Las últimas en llegar se asientan más cerca. Todas desordenadas (inclinación, tamaño y profundidad propios).
La cámara solo deriva (×1,1 → ×0,95).
Salida: todo el campo y la línea se van por arriba (−460 px, `power2.in` 0,45 s, opacidad 0) y el siguiente
elemento sube desde abajo (calendario / tragaperras).

## Cero reuniones (3.6–3.8)
El calendario sube cerca del objetivo (escala 1,5 → 1,32, rotación X 23° → 7°, `expo.out` 0,9 s). Sin fases: la
rotación Y arranca mientras aún frena y recorre −8° → −32° en una sola curva `sine.inOut` hasta el negro; la X va de
7° a 12° igual; la escala hace una sola curva con punto de giro suave (se acerca a 1,38 y se aleja a 0,78,
`power2.inOut`). El fundido a negro es rápido: 0,35 s `power2.in` justo al final, calendario, rótulo y velos a la vez.

## Nadie compra a un desconocido (4.1–4.2)
Un solo gesto: la bandeja vertical (1060 px, seis filas, cortada por el borde inferior) sube desde fuera del frame
en perspectiva (`expo.out` 1,1 s, blur 8→0) y empuja la línea hacia arriba con la misma curva y la misma frenada
(la línea sube y se encoge con `expo.out` 1,1 s, 2 f después). El giro arranca mientras aún frena y la deriva toma el
relevo al aterrizar, sin tweens solapados, hasta que cae al entrar el naranja. Los «Leído» se encienden en cascada de 2,5 f.

## La línea de la relación (4.4–4.8, 0:40)
Un solo travelling continuo y uniforme a lo largo de las cinco cards (`power1.inOut` 3,8 s), sin frenar en los
nodos; la línea naranja se dibuja con la misma curva y la cámara gira en perspectiva de +16° a −14° en Y mientras
avanza y cierra el zoom sobre COMPRA. Al llegar a COMPRA, un latido y flash a blanco inmediato. Los rótulos «A quien ya
siguen» y «En quien ya confían» se forman inclinados sobre las cards de seguir y de confiar.

## Lo demuestran (5.2–5.3)

Panel grande (1380 px, se corta por el borde inferior) que sube desde abajo con `riseIn` (520 px, rotación X 16°).
Dentro, la lista de señales es una caja gris con `overflow: hidden`: las siete filas visibles aterrizan en cascada
(2,5 f) y después la lista hace scroll interno (`power1.inOut` 1,2 s) revelando las siete restantes mientras la barra
de scroll baja y el TOTAL corre de 128 a 312. El scroll sigue en marcha cuando el panel atraviesa la lente.
Salida hacia «Entran a tu web»: paneo de cámara hacia abajo (`power3.inOut` 0,55 s). La rejilla oscura sube
(`backgroundPositionY` −1080), el panel y el rótulo se van por arriba más rápido que la rejilla (paralaje, −1400 con un
poco de blur), el fondo cambia de color al degradado claro con cuadrícula (fundido de 0,3 s, no una placa que sube) y la
web sube desde abajo en una sola curva orgánica (`expo.out` 1,0 s): llega desde un poco más cerca de la lente (escala
1,14 → 1) mientras gira a su sitio (Y −18° → −10°, X 22° → 6°), con la línea «Entran a tu web» subiendo con ella.

Zoom al botón de LinkedIn (5.5): el botón «in» se mide en espacio de escena con la pose que tiene la web al final de su
deriva; la cámara pivota sobre él y lo lleva hacia arriba a la derecha del centro mientras cierra a ×1,6 (0,6 s
`power2.inOut`), y el cursor (60 px) llega a su punta con `power3.out`. Contorno naranja, clic con anillo, la web
atraviesa la lente y el perfil sube desde abajo.

Clic en «Seguir» (5.8–5.9): la cámara sigue pivotando sobre el botón (sin salto de origen) y hace un zoom grande (×3,4,
`power3.inOut` 0,7 s) panorámico hasta dejarlo centrado en el frame, mientras el perfil se endereza para que el botón
mire a la lente. El botón pasa a naranja y a «Siguiendo» (dos etiquetas superpuestas en cross-fade) y todo lo demás
desaparece: el resto del perfil se funde y la propia tarjeta pierde el blanco y la sombra, así solo queda el botón. La
onda de píldoras se mide con el tamaño real del botón ampliado y sale de él; la cámara sigue cerrando muy despacio.

## Un solo movimiento (5.4 → 5.12, 0:45 → 0:55)

Toda la tira va encadenada sin que la cámara se pare nunca:
- el zoom al botón «in» arranca mientras la web aún está aterrizando (el cursor sale antes);
- el clic manda la web a través de la lente y la cámara respira hacia fuera (0,6 s) mientras el perfil ya está subiendo;
- en el instante en que termina la respiración empieza el push-in hacia «Seguir» (`sine.in`, 1,5 s): acelera hacia el clic;
- el clic lanza el zoom grande (`power3.out`), que toma el relevo a velocidad, y el botón queda centrado y naranja;
- la cámara sigue cerrando muy despacio sobre el botón y, sin pararse, inclina hacia abajo: botón y onda salen por
  arriba mientras las tres webs suben desde abajo (el bloque 5.10 es transparente y comparte el plano claro de 5.4);
- las tres webs llevan un push lento continuo (`sine.inOut`, 1 → 1,08) que desemboca directamente en la salida a
  través de la lente del cuadro naranja (`power3.in`).
El tramo dura 1,3 s menos (bloque 05: 16,8 s).

## De «Son señales de compra» a «Y nadie las ve» (5.12 → 5.13)

El naranja no sale deslizándose ni se barre: su color se transforma en el degradado claro. El plano claro ya está
debajo; el color del plano naranja deriva hasta el tono medio del degradado (0,7 s, `power1.inOut`) y, cuando ya está
cerca, el plano se disuelve por opacidad (0,55 s) sobre el degradado con cuadrícula. La frase se va por la izquierda y
las cards de señal llegan por la derecha mientras el color cambia.

## Y nadie las ve (5.13 → 5.15) · referencia 19.32, fotograma a fotograma

La referencia hace esto: campo en primerísimo plano y quieto (0,4 s) → el fondo se vuelve blanco y la cámara recula
fuerte en 0,5 s mientras las cards vuelan a los bordes con motion blur y la frase se compone palabra a palabra →
hold corto con las cards pequeñas y opacas alrededor de la frase → las cards se funden a blanco en 0,4 s → la frase
sola. Aquí: dos disposiciones para las mismas ocho cards (CL en primer plano a ×3 con las cards empujadas a esquinas y bordes, solo una esquina o una franja de cada una dentro del frame, ya colocadas bajo el naranja opaco, sin ninguna entrada: la transformación de color las revela, como en la referencia, que abre directamente sobre el primer plano;
SP repartidas por los bordes a ×0,95), la cámara pasa de una a otra en 0,5 s (`power2.inOut`) y cada card vuela de su
sitio CL a su sitio SP en ese mismo tiempo con un pulso de blur; velo plano a blanco en 0,35 s por debajo de las cards (el fondo se blanquea, las cards siguen nítidas y opacas hasta su fundido); `tiltWords` arranca
0,08 s después del inicio del recule; hold de 0,4 s con las cards; fundido a blanco de 0,4 s; 0,3 s de frase sola y
salida violenta en Z (cámara y línea) + velo oscuro. La línea vive fuera de la cámara y no cambia de tamaño.

## Logo Ploot (6.1 → 6.3)

Sin línea horizontal: del punto de luz se pasa directamente al trazo. El punto se desliza en 0,15 s hasta el inicio
del contorno y recorre el camino como la punta de la pluma (`motionPath` alineado al path, misma curva y duración que
el `draw`, 0,8 s `power2.inOut`); se disuelve en el anillo cuando el trazo cierra. El bloque 06 dura 0,5 s menos.

## Del logo a «Un nuevo sistema go-to-market» (6.5 → 6.7)

Sin el paso de las señales reencendidas: desde el logo sobre negro, el isotipo y el nombre se van (8 f `power2.in`) y
en ese mismo instante el fondo se transforma al degradado claro con cuadrícula (0,45 s `power1.inOut`) mientras la
frase se compone con `tiltWords`. El bloque 06 dura 1,2 s menos (9,7 s).

## Colisiones de clase (todas las escenas comparten una hoja de estilos)

`.post` → `.fpost`, `.cal` → `.mcal`, `.chip` → `.nchip` y `.ph` (cards de la línea de relación, bloque 04) → `.rlc`:
esta última pisaba el placeholder «Escribe aquí…» del chat de Ploot y lo dibujaba como un bloque de 240 px sobre las
burbujas. Antes de crear una clase nueva, comprobar que no existe ya en otra escena.

## El chat de Ploot (7.2 → 7.7)

Ventana alta y estrecha (480 px de ancho, ×1,65 en pantalla → 792 px) anclada por su borde superior (`transform-origin:
50% 0%`), con el cuerpo pegado abajo (`justify-content: flex-end`) y altura automática: crece hacia abajo con cada
mensaje, así nunca se queda quieta. Tipografía y burbujas a escala de la ventana (texto 20 px, audio 03:00, «Ploot está
pensando…» con el isotipo girando, card «Post publicado» a ancho completo con «Ver post» y «Editar»). La cámara del
plano hace un único push lento y continuo durante toda la conversación, pivotado sobre el botón «Ver post», que se
acelera en 7.7 hasta ×1,38 (storyboard: Scale 100 → 165 con origen en el botón) y desemboca en la salida por la lente.

## La ventana del post (7.8 → 7.12)

Reconstruida según los frames 7.8–7.10 del storyboard: ventana de 840×1010 cortada por el borde inferior, con barra de
chrome y tres puntos, insignia «in» azul en la esquina, cabecera (avatar, nombre, cargo, «2 min · público»), texto con
hashtags, bloque de imagen con el chip «Las 4 objeciones que oímos cada semana», línea de reacciones, barra de acciones
con cuadros de color y «COMENTARIOS MÁS RELEVANTES» con cargo y «Recomendar · N — Responder». Fuera de la ventana, tres
píldoras de métricas flotando a la derecha (roja, verde, azul) que entran en cascada y cuyos contadores corren a 2.480 /
310 / 96 a la vez que los de la línea de reacciones. Un push lento y continuo recorre todo el paso.

## Panel de Ploot → chat (7.0 → 7.2)

«Uno» entra como plano propio (mismo recurso que «Dos» y «Tres») y sale por zoom hacia el panel. El panel es más
grande (1320×820) y sube en 3D; el cursor (48 px, dentro de la cámara) va al botón de chat y la cámara pivota sobre el
botón y lo lleva al centro mientras cierra a ×1,85 (`power2.inOut` 0,85 s), así el icono nunca se escapa; clic con
anillo, el chat crece desde el botón hasta su pose centrada (`power3.out` 0,55 s) mientras el panel desaparece detrás
con blur. Sin rótulo «UNO» arriba: ese plano ya ha ido antes. En «Ver post», el chat atraviesa la lente (0,3 s
`power3.in`) y el post sube justo después del corte.

## Bloque 07 más ligero y encadenado (paso 1, 2 y 3)

- **Paso 1 (7.0 → 7.12)**: la frase se forma palabra a palabra mientras sube el panel; el cursor va al botón de chat
  con la cámara siguiéndolo, se abre el chat, se graba y se envía el audio y, **en cuanto aparece «Ploot está
  pensando…», no se espera la respuesta**: el chat atraviesa la lente y entra la ventana del post con las métricas
  subiendo, el scroll a los comentarios y «En audiencia». El paso pasa de 13,3 s a 9,5 s.
- **Paso 2 (7.13 → 7.16)**: la lista vive en un plano con mucha más perspectiva (X 32°, Y −10°, Z −4° y una órbita
  continua) y cada fila a su propia profundidad (las calientes más cerca de la lente). Una cámara propia trabaja
  cerca del plano (×1,05 → ×1,16 durante el reorden) y **cierra a ×1,24 sobre las tres que quedan**.
- **Paso 3 (7.17 → 7.21)**: los dos mensajes se han rehecho según los frames 7.18–7.20: tarjetas de 800×700 lado a
  lado y ligeramente desencajadas, insignia «in» azul / sobre verde, título, avatar, texto justificado con tokens
  naranjas, «Enviar» a la izquierda y «redactando…» a la derecha; al enviar, el pie cambia a «● Enviado 10:24» y
  entra la respuesta de Marta con su hora. Una cámara propia hace un push lento durante todo el paso, incluida la
  semana del calendario.
- **La prueba y el cierre**: el plano de la prueba respira en un solo movimiento, la rejilla de 100 puntos entra con
  perspectiva y el bloque 08 lleva un push continuo de principio a fin (siempre desde ×1, nunca por debajo, para no
  descubrir el fondo).

## Bloque 07 reconstruido frame a frame desde el storyboard

- **7.1 panel de Ploot**: barra lateral (logo, «Inicio» activo, secciones PIPELINE y CONTENIDO), cabecera con la fecha,
  card «157 leads esperan tu decisión» con Xavier Oliver (insignia «in», etiquetas «Comentó perfil de referencia» y
  «Recursos Humanos», puntuación 82 y dos botones circulares), card «TAREAS DE HOY» con tres acciones, fila de cuatro
  métricas (leads generados, pipeline activo, impresiones, engagement) y abajo RANKING (con la fila destacada en
  naranja) y RETOS SEMANALES 0/3.
- **7.14–7.16 lista de leads**: panel oscuro a la izquierda y filas blancas con casilla, avatar, nombre en naranja,
  cargo y empresa con punto, barras de esqueleto, tres fueguitos, píldora lavanda, píldora naranja y dos segmentos
  verde y ámbar; al quedarse las tres calientes, «Momento ideal» y «En contacto».
- **7.23 la rejilla**: los tres puntos encendidos son los tres primeros, arriba a la izquierda, sobre el pie
  «100 MENSAJES EN FRÍO · 3 RESPUESTAS».
- **7.24 la comparación**: EN FRÍO con una burbuja gris y «1 respuesta», «×12» subrayado en naranja y CON PLOOT con
  doce burbujas naranjas y «12 respuestas», todo dentro del beat.
- **7.21 la semana**: calendario más grande y las reuniones entran antes, de modo que la semana se llena dentro del beat.

## Paso 1 directo al perfil · paso 2 sin trompicones · mensajes modernos

- **Paso 1**: el clic en el botón de la esquina inferior derecha del panel de Ploot lleva **directamente** al perfil de
  LinkedIn. El panel atraviesa la lente, el perfil sube desde abajo, los seguidores corren de 1.240 a 12.480 y el
  anillo dorado Top Voice cierra el paso con «En audiencia». Fuera el chat, el audio, el estado de carga y la ventana
  del post: el paso pasa de 9,5 s a 4,7 s.
- **Paso 2**: sin el rectángulo oscuro de la izquierda. Las tres fases se solapan: las filas aún están aterrizando
  cuando empieza el reorden (cada fila sale según su propia distancia, `power2.inOut`), el cierre de cámara se
  adelanta al descarte y las frías se van más lejos en Z. Una sola curva de perspectiva recorre todo el paso.
- **Paso 3**: tarjetas más modernas — 30 px de radio, sin borde, sombra suave y amplia, chip de canal con tinte
  (azul para la red, verde para el email), avatar con anillo, texto a 21/1,62 con los tokens como chips de fondo
  melocotón, botón «Enviar» en píldora con sombra, «Enviado 10:24» como píldora verde y la respuesta en una burbuja
  con esquina de cola.

## Hilo de chat, calendario en 3D, prueba legible y cierre según 8.2–8.3

- **Paso 3 como chat**: cada panel es un hilo. Nuestro mensaje es una burbuja gris a la derecha (se escribe dentro,
  con los tokens naranjas), al terminar late un 1,5 % y aparece «● Enviado · 10:24»; debajo entra la burbuja de Marta
  con su avatar («Sí, cuéntame. ¿Te encaja el jueves a las 11:00?» · 10:33). Sin botón «Enviar» ni «redactando…».
- **7.21 la semana** hereda el movimiento del calendario de «Cero reuniones»: aterriza cerca e inclinada (y 560 → 30,
  X 23° → 7°, escala 1,45 → 1,28, `expo.out` 0,8 s), gira en Y hasta −26° sin parar y cierra la escala en una curva
  de dos tramos; va dentro de un `.stage` propio para tener perspectiva.
- **La prueba** (15,0 → 21,0): cada elemento se va del todo antes de que entre el siguiente (la línea sube y sale
  antes de la rejilla; la rejilla y su rótulo se van antes de la comparación). La comparación va a ×1,22, con
  burbujas de 110×74, cifras de 84 px, «×12» de 170 px y titular de 70 px; las doce burbujas entran una a una cada
  1,3 f. El bloque 07 gana 2 s (21,8 s).
- **Bloque 08 según 8.2–8.3**: vuelve la web de Nordika como ventana horizontal (barra, navegación, «Envíos B2B sin
  sorpresas» con «Pedir tarifa» / «Ver cómo funciona», card «ENVÍOS · HOY» con tres envíos y las tres cifras). Los
  visitantes son punteros de color con píldora blanca: avatar, nombre y cargo. El clic en Javier abre su perfil como
  en 8.3: portada azul, avatar grande, «Brand Strategist · Luce Innovative», tres fueguitos + 92, la alerta «Contactar
  ahora» con «Escribir» y las tres últimas señales con su hora; la píldora se retira y el cursor descansa sobre el
  avatar.

## «×12» (7.24), en tres tiempos

Primero el lado frío a la izquierda (el «1» y su burbuja gris). Después «×12» entra en grande desde la derecha
(`power3.out` 0,5 s, escala 2), se queda en el centro del frame respirando 0,3 s y viaja a su sitio encogiendo a su
tamaño (`power2.inOut` 0,5 s). Solo entonces entra el lado Ploot y las doce burbujas naranjas caen una a una cada
1,3 f. El beat pasa de 2,3 s a 3,1 s (bloque 07: 22,6 s).

## 8.3 · zoom que se queda sobre «Contactar»

El perfil de Javier entra con más perspectiva (Y −13°, X 8°, deriva de 4°/2°). En cuanto aterriza, la cámara arranca
con el cursor: push-in ×1,42 pivotado sobre el botón «Contactar» (blanco sobre naranja, antes «Escribir») que lo lleva
hacia el centro del frame (1260, 540) con la misma curva y duración que el viaje del cursor (`power2.inOut` 1,05 s),
así cursor y botón se encuentran justo en el clic con anillo; después el zoom se queda respirando. El push se completa (×1,7) al irse la card
hacia el CTA. El bloque 08 gana 0,6 s (10,1 s).

## 8.4 · de «Contactar» al CTA

Tras el clic, la card del perfil se va hacia arriba perdiendo opacidad (y −260, blur, 0,42 s `power2.in`) mientras el
push se completa y la web desenfocada desaparece del todo: el CTA vive sobre el plano limpio. En el centro del frame se dibuja el trazo del botón (rect redondeado 600×108, `draw` 0,6 s
`power2.inOut`) y, cuando el trazo cierra, el botón «Agenda una demo» se rellena (40 px, un tamaño por encima del
anterior); el trazo se funde, entra la subline (30 px), el cursor llega y hace clic con las dos ondas en píldora. Después,
corte a naranja y logo de Ploot.

## Acompasado a la voz en off (89,9 s)

La locución grabada (`assets/vo-ploot.mp3`, 77,7 s) se transcribió palabra a palabra (whisper large-v3) y se
midieron sus silencios reales (`silencedetect −38 dB`). El vídeo se adaptó a ella y ella al vídeo:

- **La voz se trocea por frases** (22 clips, `src/audio.mjs`) y cada clip se coloca donde su beat visual lo pide;
  las pausas entre frases crecen sólo donde la imagen necesita respirar (abrir el chat, la tragaperras, el zoom
  al perfil, el pull-back, el logo). Los cortes caen siempre dentro de un silencio de la toma, con fundidos de
  40/60 ms; una transcripción del montaje sólo-voz devuelve las 197 palabras intactas.
- **La imagen se acorta donde la voz no dice nada**: fuera «eventos carísimos» (2.11–2.13), los rótulos «Más
  listas»/«Más mensajes» (3.3–3.4; la nube de cards sigue entrando, comprimida con `K3 = 0,6`), «A quien ya
  siguen» (4.5) y «Y actuamos en minutos» (7.16). El travelling de la línea de la relación pasa de 3,8 a 2,0 s,
  la zona de las tres webs y el paso 2 se aprietan, y el bloque 01 acelera el push-in de la web (1,3 s).
- **Regla de sincronía**: el rótulo aparece entre 0 y 0,4 s después de la palabra («el texto sigue a la voz»);
  los números «Uno/Dos/Tres» y «Ploot» caen exactos (el burst del logo a 50,73 s coincide con la palabra). La voz
  arranca sobre el negro en dos bisagras («Porque en B2B…», «Por eso hemos creado…») para que el corte a imagen
  caiga en «nadie compra» y en «Ploot».

Nuevo mapa: 01 0 → 12,0 · 02 → 20,35 · 03 → 27,05 · 04 → 33,95 · 05 → 49,55 · 06 → 57,75 · 07 → 79,7 · 08 → 89,9.

## Sound design (biblioteca de HyperFrames, sólo graves)

Se midió el brillo de cada archivo de la biblioteca (energía > 3 kHz frente a < 400 Hz): `click`, `click-soft`,
`glitch-*`, `ping`, `sparkle`, `chime` y `notification` son agudos y quedan fuera; `whoosh`, `whoosh-cinematic`,
`impact-bass-1/2`, `pop` y `riser` son graves y son los que suenan (`typing` sólo bajo el low-pass del bus).

- Cada clip arranca en `momento visual − pico del archivo`, así el golpe cae en el frame (whoosh 0,15 s;
  impact-bass-1 0,125 s; impact-bass-2 2,025 s de swell antes del golpe; pop 0,10 s; whoosh-cinematic 2,175 s
  hasta que entra el cuerpo).
- Whoosh (0,3) en cada bisagra `textOut zoom`, subida de ventana y movimiento de cámara; impacto de bajo (0,22–0,28)
  en los cortes a naranja/negro/blanco y en «Uno/Dos/Tres»; pop (0,3–0,45) en clics, rodillos de la tragaperras,
  badges, píldoras, burbujas del ×12; typing bajo los dos canales; riser de 10 s desde 40,7 hasta el burst de
  Ploot; impact-bass-2 en el burst y en el naranja final; whoosh-cinematic bajo la lluvia de cards del hook, el
  paneo 5.4 y como cola del cierre.
- Buses: `voiceover` (high-pass 90 Hz → +5 dB → compresor → limitador −1,5) y `sfx` (low-pass 3,2 kHz → low-shelf
  +2 dB → limitador −3). Los SFX que se solapan van a carriles de Studio distintos (asignación automática).
- Música pendiente (dos temas, cambio a 50,73 s) con carve contra el bus de voz: ver README «Audio».

## «Que nadie abre» sobre la voz (2.5 → 2.7)

La secuencia ventana → clic en el chat → el chat se abre → clic en Enviar → el chat sube → «Que nadie abre» se
adelanta y se aprieta para que el rótulo entre con la voz («que» 15,42 · «nadie» 15,74 → rótulo 15,73): la
ventana sube a 14,0 (el chat del rebobinado cae 0,3 s antes), el cursor tarda 0,35 s, el zoom 0,7 s, el chat se abre
en 0,28 s, el relevo de cursor se hace en cuanto el chat lo cubre y el cursor va al botón en 0,28 s. «Mensajes en frío»
ya no se va al abrir el chat: se queda hasta el clic de Enviar, así está en pantalla mientras la voz lo dice. El rótulo
«Como hace 5 años» entra más rápido (`gap fr(2,5)`, 0,35 s) porque su escena dura 0,95 s.

## Música y pulso

- **Parte 1** (168 BPM): el archivo tiene su drop en 11,45 s y un segundo golpe 40,0 s después (51,45). El vídeo
  ya tenía 40,0 s entre el corte a naranja «Sin enterarte» (10,70) y el burst de Ploot (50,70), así que la canción
  empieza en su segundo 0,75 y ambos golpes caen solos: el drop en el primer naranja, y el segundo golpe es el
  punto exacto en que la parte 1 se corta (0,02 s antes de su golpe) y entra la parte 2 con el suyo.
- **Parte 2** (121,85 BPM, compás 1,97 s): drop en 7,90 s del archivo, cuerpo de 8 compases, golpe final en 23,65 s
  y cola de fundido. Tres clips encadenados en primer tiempo de compás (7,90 → 8 compases · 9,87 → 7 compases ·
  15,78 → hasta el final) para que el golpe final del archivo caiga en el naranja del cierre (88,12) y la cola muera
  con el logo.
- **Cortes al pulso**: cada corte de bloque y cada golpe fuerte se movió ≤ 0,2 s (con su voz y sus SFX, que son
  relativos al bloque) al pulso de la canción que suena: blanco «Nadie compra» 27,18 · negro 33,96 · naranja «Son
  señales» 43,96 · «Y nadie las ve» 47,16 · pull-back 48,61 · burst 50,70 · «Uno» 57,59 · «Dos» 62,03 · «Tres» 65,96 ·
  prueba 71,38 · rejilla 73,35 (un compás después) · «1» 75,81 y aterrizaje del ×12 76,81 · «El sistema funciona» 79,26
  · «Deja» 80,74 · web 82,71 · clic visitante 84,19 · clic Contactar 85,66 · botón 86,64 · clic 87,63 · naranja final
  88,12 (primer tiempo). Los que no tienen golpe (bisagras con whoosh) se dejan donde la voz los pide.
- **Cama, no protagonista**: música a −22 LUFS en las pausas y carve dinámico contra la voz (≈ −11 dB de hueco +
  muescas en 250 Hz – 2,5 kHz que siguen a la locución). Los impactos de bajo y los clics del sound design caen en
  pulsos de la música; los pops de elementos que entran siguen la cadencia visual.
