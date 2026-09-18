---
workflow: general-video
flow: automation
storyboard: no
message: "Ploot detects buying signals and turns your team into your best sales channel"
destination: landing-hero
aspect: 1920x1080
language: en
length: 81.139091s
angle: English localization of the approved Spanish V14
---

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

## Revisión actual · automatización corregida V15 · 17 septiembre 2026

La usuaria vuelve a pedir bajar mucho más ambos efectos. Se identifica y corrige la causa que anulaba los ajustes anteriores: la automatización `volume` es absoluta en HyperFrames y sus puntos llegaban a 1; `data-volume` no multiplica esa envolvente. Las anteriores reducciones documentadas eran del fader, no del nivel real exportado cuando el fundido estaba activo.

- **Corrección localizada:** solo para `tape-rewind-short` y `calendar-air-long`, todos los puntos de su fundido incorporan ahora la ganancia deseada. Fader y envolvente máximos: .006 y .011, respectivamente. Fuentes, EQ, reloj y duración intactos. No se modifica la música aprobada ni los demás clips.
- **Comprobación real:** render aislado antes/después con el mismo motor nativo. Rebobinado −31,88 → −76,31 dB RMS (−44,43 dB efectivos); calendario −35,86 → −75,02 dB RMS (−39,16 dB efectivos). Ambos quedan casi imperceptibles. Medición en `review/client-v15/measured-levels.json`; aislados de comparación guardados al lado.
- **Alcance:** cambian únicamente `data-volume` y `data-automation` en `sfx-16` y `sfx-901`; auditoría guardada. Imagen y resto de fuentes intactos. Solo inglés.
- **Validación:** HyperFrames sin errores. Exportado `renders/ploot-en-client-v15-1080p60.mp4`, 1080p60, 81,15 s. Vídeo idéntico bit a bit a V14, AAC idéntico a la mezcla nativa, tiempos de paquetes preservados y decodificación completa correcta.


## Revisión actual · volumen mínimo V14 · 17 septiembre 2026

La usuaria solicita bajar mucho más ambos efectos.

- Rebobinado: .108 → .034, −10,04 dB adicionales respecto a V13.
- Calendario: .20 → .063, −10,03 dB adicionales respecto a V13.
- Solo cambian los atributos `data-volume` de `sfx-16` y `sfx-901`. Fuentes, tiempos, EQ, fundidos, música aprobada, voz y resto de efectos intactos. Evidencia en `review/client-v14/scope-audit.json`.
- Solo versión inglesa; imagen V13 copiada sin recodificar. Exportado `renders/ploot-en-client-v14-1080p60.mp4`, 1080p60, 81,15 s, 61,3 MB. HyperFrames sin errores; decodificación completa correcta. Vídeo idéntico bit a bit a V13, AAC idéntico a la mezcla nativa y tiempos de paquetes preservados.


## Revisión actual · efectos de fondo V13 · 17 septiembre 2026

La usuaria pide que «5 años atrás» quede mucho más bajo y recuperar un sonido de calendario como el anterior al actual, también discreto.

- **Rebobinado aprobado:** misma fuente, EQ, duración y sincronía. Ganancia .34 → .108: −9,96 dB adicionales respecto a V12 (−12,96 dB frente a V11).
- **Calendario:** recuperado `calendar-air-long.wav`, usado en V10, con su EQ a 4200 Hz, ganancia local +18 dB y fundidos 80/180 ms. Volumen .50 → .20: −7,96 dB respecto a aquella versión. Conserva el intervalo sincronizado 27,252–29,273 s.
- **Alcance:** únicamente `sfx-16` y `sfx-901` cambian; auditoría en `review/client-v13/scope-audit.json`. Música aprobada, voz y demás efectos intactos. Imagen preservada copiando el flujo V12. Solo inglés.
- **Validación:** HyperFrames sin errores. Exportado `renders/ploot-en-client-v13-1080p60.mp4`, 1080p60, 81,15 s, 61,3 MB. Vídeo idéntico bit a bit a V12, audio idéntico a la mezcla nativa, tiempos de paquetes preservados y decodificación completa correcta.


## Revisión actual · volumen V12 · 17 septiembre 2026

La usuaria aprueba música y nuevo rebobinado; solicita bajar rebobinado y desaparición del calendario.

- Rebobinado: volumen .48 → .34 (−3,00 dB).
- Calendario: volumen .50 → .354 (−3,00 dB).
- Solo cambian los atributos `data-volume` de `sfx-16` y `sfx-901`, comprobado en `review/client-v12/scope-audit.json`. Fuentes, EQ, tiempos, fundidos, música, voz y todos los demás efectos intactos.
- Imagen aprobada V11 preservada mediante copia del flujo de vídeo. Solo inglés. Exportado `renders/ploot-en-client-v12-1080p60.mp4`: 1080p60, 81,15 s, 61,3 MB. HyperFrames sin errores, decodificación completa correcta, vídeo idéntico bit a bit a V11 y audio idéntico a la mezcla nativa; tiempos de paquetes preservados.


## Revisión actual · audio V11 · 17 septiembre 2026

La usuaria rechaza el rebobinado V10 y pide afinar aún el whoosh del calendario. Aprueba el resto y plantea más intensidad musical después de B2B.

- **Dos fuentes nuevas CC0:** Rewind Short.wav de LuKaiX (Freesound 700527) y Whoosh stereo light (transition) de xkeril (701104). Páginas, descargas y hashes guardados en `review/client-v11/sources/`; derivados registrados en el inventario de medios.
- **Rebobinado:** efecto diseñado de cinta, ajustado con tempo sin cambio de tono a 1,50 s, comienzo 14,416 s. Ganancia .48, filtro 2400 Hz de cuatro polos, corte suave −3 dB a 1350 Hz, fundidos 55/160 ms. Reemplaza completamente la grabación anterior.
- **Calendario:** aire natural invertido y ajustado a 2,021 s para que su subida acompañe la aceleración. Comienzo 27,252, final 29,273; filtro 3200 Hz, ganancia local +4 dB y volumen .50, fundidos 90/130 ms. Reemplaza la fuente anterior.
- **Música tras B2B:** subida progresiva de 1,8 dB entre 30,473 y 31,973 s; apertura simultánea del filtro de 4200 a 6500 Hz. Resto de cortes, silencio 48,091–51,091 y presentación de Ploot preservados. Medición del tramo 32–40: −28,77 → −26,98 dB RMS; Ploot 52–60 idéntico −25,25 dB RMS.
- **Alcance:** solo tres nodos de audio modificados. Imagen V10, voz y demás efectos intactos. Español intacto.
- **Verificación:** HyperFrames sin errores. Mezcla nativa −21,69 LUFS / −5,50 dBTP, sin normalización posterior. Exportación `renders/ploot-en-client-v11-1080p60.mp4`, 1080p60, 81,15 s, 61,3 MB. Vídeo idéntico bit a bit a V10, AAC idéntico a la mezcla, tiempos de paquetes preservados, decodificación completa correcta. Revisión objetiva de tiempos, envolventes, espectro y niveles; valoración auditiva final pendiente de la usuaria.


## Revisión actual · ajustes V10 · 17 septiembre 2026

Cuatro ajustes solicitados, solo versión inglesa:

- **Silencio en «And nobody sees them»:** la música alcanza cero en 48,090909 s, sobre el ancla existente de la frase; microfundido de 65 ms para evitar clic. Reentrada conservada en 51,090909 s. Resto de música e intensidades aprobadas intactas. Configuración y automatización persistida de carve actualizadas conjuntamente.
- **VHS menos estridente:** misma grabación real y reloj 14,416–15,916 s; ganancia .95 → .67 (−3,03 dB), corte amplio de −5 dB a 3250 Hz y filtro de agudos a 3000 Hz de cuatro polos. Procesamiento local nativo, sin tocar el bus de efectos.
- **Paso 2 más ágil:** las tres tarjetas seleccionadas comparten una aproximación continua con curva de salida cuártica y un 6% de deriva lineal. Adelanta la mayor parte del desplazamiento al primer segundo y mantiene movimiento hasta la salida. Conserva profundidad común, planos nítidos, reloj de confirmaciones y duración de escena.
- **Calendario:** whoosh desde el primer retroceso, 27,252 s, hasta su desaparición, 29,273 s. Duración 2,021 s, fundido final 180 ms y ganancia .85 → .50 (−4,61 dB). Misma fuente sonora V9.
- **Alcance verificado:** solo tres nodos de audio modificados: música de desarrollo, VHS y calendario. Locución y todos los demás efectos idénticos a V9. Único archivo visual editado: `src/tl/s7.js`. Español intacto.
- **Validación:** HyperFrames sin errores; capturas del paso 2 revisadas. Mezcla nativa −21,77 LUFS / −5,49 dBTP. Silencio musical aislado comprobado entre 48,12 y 51,06 s. Evidencias y respaldo en `review/client-v10/`. Exportación final: `renders/ploot-en-client-v10-1080p60.mp4`, 1920×1080, 60 fps, 81,15 s, 61,3 MB. Decodificación completa correcta y AAC idéntico a la mezcla nativa, con tiempos de paquetes preservados.


## Revisión actual · solo sonido V9 · 17 septiembre 2026

La usuaria aprueba completamente la imagen V8 y la música. Solicita rebobinado de cinta VHS, recuperar un efecto de palabras, sincronizar el paso 2 y un barrido más largo para la desaparición del calendario. Aclara que el efecto de palabras es el de **«People are deciding to buy»**.

- **Imagen V8 preservada:** fuentes visuales intactas; el MP4 V9 copia su flujo de vídeo sin recodificar. Música, locución, silencios y buses globales sin cambios.
- **VHS real:** grabación de BigSoundBank / LaSonotheque n.º 2693 (CC0), recorte 43,35–44,85 s. Entra a 14,416 s y dura 1,50 s, sobre los iconos de rebobinado y la retirada de señales. Reemplaza el anterior aire invertido; EQ y fundidos nativos locales.
- **Efecto de palabras recuperado:** `sfx-02`, `whoosh.mp3`, entrada 0,650 s, ganancia .28, duración .575 s. Comparado con la primera versión inglesa: fuente, recorte, ganancia y tiempo idénticos. Se mantienen como estaban «Right now» y el texto naranja del 0:33, tras la aclaración de la usuaria.
- **Paso 2:** sustituidos los tiempos obsoletos por eventos ligados a la animación aprobada: entrada 62,818; apoyo de la lista ~63,35; selección 63,909; descarte 63,953; confirmación conjunta 65,262; salida 66,103. Se elimina la sucesión de tres confirmaciones tardías porque las etiquetas aparecen simultáneamente.
- **Calendario:** barrido continuo nuevo de DJT4NN3R (Freesound 449989, CC0), 2,60 s desde 27,252 hasta 29,852. Primeros 2,60 s invertidos para que el crescendo coincida con la aceleración de salida; cola suave tras desaparecer. Reemplaza el whoosh V8.
- **Verificación:** auditoría de alcance en `review/client-v9/scope-audit.json`; fuentes, licencias, recetas y copia previa en la misma carpeta. HyperFrames sin errores. Exportación: `renders/ploot-en-client-v9-1080p60.mp4`, 1080p60. Contenedor validado: 81,15 s, 61,3 MB, decodificación completa correcta. SHA-256 y tiempos de paquetes de vídeo idénticos a V8; AAC idéntico a la mezcla final. Nivel -21.75 LUFS / -5.48 dBTP, sin normalización posterior.


## Revisión actual · efectos restaurados y continuidad V8 · 17 septiembre 2026

La usuaria aprueba la música y solicita recuperar los efectos que no debían cambiarse, buscar reemplazos menos agudos para los rechazados, mejorar continuidad del paso 2, alargar el whoosh del calendario desde el inicio del retroceso, eliminar la pixelación cerca de 0:07 y recuperar un efecto claro de rebobinado. Solo inglés.

- **Música aprobada preservada exactamente:** configuración V7, cinco tramos, cambios de intensidad y silencios intactos. La mezcla musical aislada V8 coincide byte por byte con la V7 guardada antes de editar. Locución y buses globales idénticos.
- **126 efectos originales preservados:** mismo archivo, ganancia, tiempos y procesamiento que en V6; se recuperan los clics, confirmaciones y movimientos que V7 había sustituido de forma demasiado amplia. Auditoría explícita en `review/client-v8/sound-audit.json`.
- **37 cambios delimitados:** 33 acentos rechazados V6 sustituidos por golpes suaves y madera de Kenney Impact Sounds y aire de Kenney Foley Sounds (CC0); una salida del chat a ~0:16, las dos señales eléctricas de ~0:45 y el acento de palabras ~0:33 previamente solicitado. Los nuevos efectos llevan filtro nativo de agudos a 2,5 kHz y fundidos propios; se conserva el bus original.
- **Retroceso:** aire invertido de 0,77 s con ataque/final suaves, ganancia local .80. **Calendario:** whoosh de 2,014 s desde 27,252 hasta 29,266, cubriendo el primer movimiento hacia atrás y la desaparición; sustituye al acento corto V7.
- **Nitidez ~0:07:** la salida del primer campo ya no aplica filtro/opacity a toda la cámara 3D; se desplaza manteniendo planos de texto y avatar nítidos. Las tres webs entran sin desenfoque. Prueba visual a 6,65 s confirma la corrección.
- **Paso 2:** una trayectoria por lead seleccionado hasta el centro, aproximación de cámara continua, descartados retroceden y desaparecen mientras los elegidos avanzan. Cada fila mantiene una superficie opaca para evitar intersecciones entre textos de tarjetas distintas. Sin cambios en el reloj de voz ni en la duración.
- **Validación:** HyperFrames 0.8.46 sin errores; capturas y diagnóstico de movimiento revisados. Mezcla nativa −21,74 LUFS / −5,23 dBTP; no normalizada posteriormente. Fuentes, licencias, respaldo y pruebas en `review/client-v8/`.

**Entrega validada:** `renders/ploot-en-client-v8-1080p60.mp4` · 1920×1080 · 60 fps · 81,15 s · 61,3 MB. Decodificación completa correcta; audio AAC y tiempos de paquetes idénticos a la mezcla final nativa. Capturas del MP4 revisadas para nitidez y etiquetas del paso 2.

Las revisiones inferiores son históricas. V7 recibió comentarios antes de entregarse su última actualización musical; su MP4 puede contener la mezcla preliminar. La fuente actual y la nueva V8 conservan la música aprobada.

## Prueba actual · Groove Theory y efectos suaves V6 · 17 septiembre 2026

La usuaria pide recuperar la música de IA seleccionada ayer y sustituir los glitches agresivos. Se restaura **Groove Theory (2)**, con sus cinco cortes de desarrollo originales, introducción, pausas y resolución. `src/groove-music.json` vuelve a ser la fuente activa; carve .35 recalculado contra la voz actual, incluido el cierre aportado `ploot en.mp3`.

Los **33 glitches** se sustituyen por siete sonidos de **Kenney Interface Sounds (CC0)**: contactos, pulsos, cambios y deslizamientos cortos, con energía alta reducida en las fuentes elegidas y fundidos nativos. No quedan clips glitch activos. 163 efectos en total; voces y acciones visuales sin cambios. Nuevas fuentes y procedencia en `src/soft-palette-v6.json` y `assets/sfx/KENNEY-INTERFACE-LICENSE.txt`.

**Prueba entregada:** `renders/ploot-en-groove-soft-v6-1080p60.mp4` · 1920×1080 · 60 fps · 81,15 s · 58,8 MB. Vídeo copiado sin recodificar de la V5 y verificado por SHA-256; mezcla nativa nueva. Nivel medido −22,02 LUFS / −5,64 dBTP (sin normalización adicional). Decodificación completa correcta y comprobación HyperFrames sin errores. Evidencias, respaldo y scripts en `review/groove-soft-v6/`. Solo se modifica inglés.

## Exportación inglesa autorizada · 17 septiembre 2026

La usuaria solicita exportar exclusivamente la versión inglesa con el audio de marca definitivo. Esta autorización sustituye la pausa de exportación anterior solo para inglés. Entrega completada: `renders/ploot-en-v5-1080p60.mp4` (1920×1080, 60 fps, 81,15 s, 58,7 MB). Decodificación completa correcta; audio AAC y tiempos de paquetes idénticos a la mezcla actualizada con el nuevo «Ploot». HyperFrames actualizado de 0.8.41 a 0.8.46 y validado sin errores. Evidencias en `review/export-en-v5/`.

## Audio de marca definitivo · 17 septiembre 2026

El usuario aporta `../ploot en.mp3`. Se sustituye exclusivamente `vo-brand-end` por `.media/audio/voice/voice_002.mp3`, conservando la entrada de 79,159091 s. Recorte no destructivo 0,10–0,66 s para retirar silencio sobrante y conservar la palabra completa; fundidos 10/40 ms. Se usa el mismo bus de voz. Se recalcula solamente el carve musical de cierre. No exportar vídeo: sigue vigente la petición del usuario. Evidencias: `review/brand-audio-v5/`. El archivo de mezcla de `review/client-v4/` es anterior a esta sustitución y no debe usarse para una futura entrega; regenerar el audio desde el HTML actual cuando se autorice exportar.


## Revisión actual · banner definitivo y música V1 inglesa · 17 septiembre 2026

**Exportación cancelada por la usuaria.** Cambios aplicados y mezcla de revisión preparada; no exportar ni preparar entregas nuevas hasta que lo solicite. Los nombres de entrega que aparecen debajo son previstos, no entregas terminadas.

- Nuevo banner landing aportado por la usuaria; sin logos de clientes, con franja de cifras conservada según el archivo definitivo. Español usa la imagen exacta; inglés mantiene su marca y reconstruye los textos traducidos con tipografía nativa.
- Tagline aprobado y descripción completa de Sobre Ploot, dividida en párrafos y tres beneficios. Inglés traducido.
- Se conservan las correcciones V3: nitidez de tarjetas / Following, chat enviado y leído, calendarios sin año, métricas y Marc Jardí.
- Música principal restaurada: High Energy Bad Attitude (Bonkers Beat Club), la V1 inglesa. Tramo desde 29,232727 s con offset fuente 6,232727 s: mantiene exactamente el origen de beats original de 23 s.
- Fondo tranquilo In the Gloom, ya aportado por la usuaria, de 12,95 a 27,219124 s. Se retira la entrada temprana de Bonkers a los 23 s; la entrada fuerte corresponde a «because in B2B» (voz a 29,2 s).
- Golpe musical de resolución: final real de Bonkers (fuente 174,545454 s) sobre logo a 78,909091 s, con cola y fundido.
- Nuevo «Ploot» final de Luke a 79,159091 s: reutilizado de su propia toma (50,995–51,545 s), comprobado mediante transcripción local de ese recorte; no TTS nuevo.
- Los 26 clips de locución previos y 163 efectos permanecen idénticos. Carve dinámico .35 recalculado contra la voz montada, incluido el cierre. Mezcla: -22,1 LUFS, -5,9 dBTP; voz -22,2, música -31,0 LUFS.
- Fuentes nuevas: src/client-music-v4.json y src/carve/music-v4-*.json. Música renderizada nativamente en HyperFrames.

Entrega: `renders/ploot-en-client-v4-1080p60.mp4`. Evidencias y copia previa: `review/client-v4/`.


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

Entrega: `renders/ploot-en-visual-v3-1080p60.mp4`. Evidencias y copia previa: `review/visual-client-v3/`. Las revisiones siguientes son históricas.


## Revisión anterior · Groove y glitches V2 · 16 septiembre 2026

**Verificado:** música -31.2 LUFS (7.1 LU más que V1), mezcla -22.1 LUFS / -5.6 dBTP; MP4 completo decodificado, 1080p60 y fotogramas idénticos.

Se responde a la escucha de la usuaria: glitches más agudos y fluidos, música más presente y recuperación de sus cambios originales.

- Cinco cortes de música conservan la introducción original completa, el cambio de arreglo antes de la pausa y la vuelta del ritmo. Se elimina el bucle repetido de introducción.
- Música ajustada contra la relación voz/música estimada de la referencia; menor fuerza de carve (0,35) para conservar más timbre y dinámica. Voz aprobada intacta.
- Seis nuevos efectos `glitch-air-*`: fragmentos continuos elevados de tono y fundidos suaves; se retira la modulación periódica que daba a los anteriores un sonido entrecortado.
- Los acentos siguen el reloj visual existente. Silencios narrativos y cierre sobre el logo.

**Prueba actual:** `renders/ploot-en-groove-glitch-v2-preview.mp4`. Fuentes en `src/groove-music.json`, `src/reference-sound.mjs`, `src/reference-palette.json` y `src/carve/music-groove-v2-*.json`. Evidencias: `review/groove-glitch-v2/`. Preparación reproducible: `../audio-reference/groove-glitch-v2/`. Los apartados siguientes son históricos.



## Revisión anterior · Groove Theory (2) y glitches · 16 septiembre 2026

**Prueba actual:** `renders/ploot-en-groove-glitch-preview.mp4` · 1920×1080 · 60 fps. Sustituye la prueba anterior con Bonkers.

- Música elegida por la usuaria: `Groove_Theory_2026-09-16T070005 (2).wav`, generada en ElevenLabs. Introducción suave desde 00:00; entrada de la base completa en «¿Y qué hacemos?».
- Siete clips de música con cortes lossless, fundidos nativos, silencio en «Cero reuniones» y antes del reveal de Ploot, y resolución sobre el logo final. Se evita la pausa original de la canción en 44–47 s.
- Carve dinámico de cada clip recalculado contra la locución montada; fuente de análisis `voiceover`, fuerza 0,5. Nivel de fondo discreto.
- 33 acentos glitch breves y variados dentro de 163 clips de efectos: ráfagas, barridos digitales, apagados y bloqueos, sincronizados por sus picos a las acciones existentes. Se conservan los contactos, mensajes y mecanismo de tragaperras.
- Mezcla nativa: -22.3 LUFS / -6.1 dBTP. Voz y código visual idénticos a la versión aprobada.

Fuentes: `src/groove-music.json`, `src/audio.mjs`, `src/reference-sound.mjs`, `src/reference-palette.json` y `src/carve/music-groove-*.json`. `node src/build.mjs` reconstruye el HTML. Preparación reproducible y procedencia: `../audio-reference/groove-glitch/`. Copias previas, comprobaciones y mezcla en `review/groove-glitch/`. Los apartados siguientes son históricos.




## Revisión anterior de sonido · referencia Gojiberry · 16 septiembre 2026

Nueva paleta de efectos en ambas versiones: contactos de interfaz, apoyos de panel, deslizamientos cortos, señales, mensajes, confirmaciones y mecanismo de tragaperras. La versión EN utiliza 165 clips de efectos tras agrupar duplicados próximos; el resto del montaje conserva sus tiempos y contenido.

**Prueba anterior:** `renders/ploot-en-sfx-reference-preview.mp4`. Incluye los efectos nuevos y **mantiene provisionalmente la música Bonkers anterior**. La nueva música está pendiente de generación por la usuaria con `../audio-reference/gojiberry/music-prompt.txt` y el audio adjunto allí. No sustituir la música hasta recibir esa pista; entonces habrá que ajustar entrada, niveles y carve a cada voz.

Fuente de efectos: `src/reference-sound.mjs` + `src/reference-palette.json`; los acentos se alinean por sus picos al reloj visual existente. Copia previa y pruebas en `review/reference-sound/`. HyperFrames actualizado de 0.8.40 a 0.8.41 y validado en ambos proyectos.

# Ploot · English sequence

Create a separate sequence with the V14 design and animation, every visible text in English, and the supplied Luke C voiceover. Spanish source: `../ploot-video`.

- Preserve the eight scenes, colors, typography, brand assets, interfaces, 3D floating movement and sequential message/calendar ending.
- Translate headlines, website and LinkedIn mockups, dashboard, messages, dates, buttons and banner copy. Personal and company names retain their original names.
- Use the supplied Luke C MP3, imported unchanged as `.media/audio/voice/voice_001.mp3`. Keep original playback speed; place 26 segments using cuts in measured silence.
- Keep Bonkers music and V6 sound palette gains. Align actions and effects to the English delivery and 110 BPM grid; carve music against the assembled English voice.
- Finish the calendar at the end of the narrated phrase and move directly into the CTA.
- Deliver a separate 1080p60 MP4 and editable Studio project, following the established export workflow.

## Sources

Run `node src/build.mjs` to rebuild. Audio ranges: `src/voice-luke.json`. Animation timing: `src/beat-sync.json`. English copy: `src/scenes/` and `src/lib.mjs`.

## Validation

Evidence under `review/en-v1/`. Export verification will be recorded after rendering.
