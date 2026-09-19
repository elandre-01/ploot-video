---
format: 1920x1080
duration: 80.549091s
message: "Ploot detecta las señales de compra que ya existen y convierte a tu equipo en tu mejor canal de ventas"
arc: Hook (pérdida) → Dolor → Falsa solución → Insight → Señales → Reveal → 3 pasos → CTA
audience: equipos comerciales y fundadores B2B que llegan a la landing de Ploot
mode: autonomous
---

## Montaje vigente · ES sobre el inglés V15 · voz WhatsApp (17-09-2026)

Duración **81,14 s**. Imagen, efectos y música idénticos a `ploot-video-en` V15 (Groove Theory (2) V7, reloj de pulso de Luke). Voz: toma en español por WhatsApp, 27 frases en `src/voice-es.json` sobre los anclajes del inglés. Sin exportar.

| Bloque | Inicio | Duración |
| --- | ---: | ---: |
| Hook | 0,000 | 13,400 |
| Dolor | 13,400 | 9,600 |
| Falsa solución | 23,000 | 7,364 |
| Insight | 30,364 | 6,000 |
| Señales | 36,364 | 13,636 |
| Reveal | 50,000 | 7,364 |
| Tres pasos y calendario | 57,364 | 13,909 |
| Cierre | 71,273 | 9,866 |

Los apartados siguientes son históricos (V14 y anteriores, reloj de Dani).

## Montaje anterior · V14 · Dani

Duración **84,70 s**. Voz: Dani, toma ElevenLabs aportada por la usuaria. Música: «High Energy Bad Attitude» — Bonkers Beat Club, entrada a **21,65 s** y acentos a **110 BPM**. **MP4 V14 exportado:** `renders/ploot-v14-secuencia-1080p60.mp4` · 1080p60 · 55,72 MB.

| Bloque | Inicio | Duración |
| --- | ---: | ---: |
| Hook | 0,000 | 13,300 |
| Dolor | 13,300 | 8,350 |
| Falsa solución | 21,650 | 6,818 |
| Insight | 28,468 | 6,818 |
| Señales | 35,286 | 14,727 |
| Reveal | 50,014 | 9,273 |
| Tres pasos y calendario | 59,286 | 15,818 |
| Cierre | 75,105 | 9,594 |

La voz se coloca por frases con `src/voice-dani.json`, conservando palabras y velocidad original. V14 elimina 6,272728 s de espera después del contacto al lead y adelanta juntas las dos frases del cierre con su animación. No cambia el montaje de los bloques anteriores.

El mensaje aparece a 70,741 s y termina de salir a 73,195 s. Entonces entra el calendario, sin coexistir ambas interfaces. Doce demos completas a 74,314 s. «Reunión» termina a 74,924 s, la siguiente locución empieza a 74,995 s y el cierre visual a 75,105 s. Se conserva la perspectiva y flotación suave de cada interfaz.

Se mantienen las correcciones de contenido: sin estadísticas, un único chat en párrafos, perfiles variados y puentes visuales sin negro vacío. También la sincronización adelantada de V13, el botón «Siguiendo» nítido y la desaparición completa de descartes. La música es continua y se recalcula su atenuación para la duración nueva.

Los frames históricos siguientes conservan los relojes de autoría V10. La tabla de arriba y las secciones generadas de `index.html` son los tiempos finales de V14. `s7Contact(tl)` utiliza segundos finales y se añade después del remapeo general. Revisión: `review/v14-secuencia/REVIEW.md`.

## Frame 1 — Hook · la pérdida («tu web en 3D»)

- scene: Reloj que gira, web 3D con cursores ajenos, cards de señal, comparativa, monedas y corte a naranja «Sin enterarte»
- duration: 12.0s
- transition_in: cut
- status: animated
- voiceover: "Ahora mismo hay personas decidiendo comprar justo lo que tú vendes. Entran a tu web, leen tu contenido y te comparan. Y tú estás perdiendo mucho dinero sin enterarte,"
- src: index.html#s1
- blueprint: camera-journey + cursor-ui-demo
- rules: waterfall-entry, multi-cursor-choreography, depth-of-field-blur, orbit-3d-entry, particle-burst, vertical-spring-ticker, motion-blur-streak

1.1–1.2 negro: «Ahora mismo» centrado con entrada magnética; dos trazos naranjas planos salen de las esquinas inferiores en curva, se unen en una sola línea bajo el texto y siguen subiendo sin detenerse; al llegar a la altura del texto se lo llevan hacia arriba y la web entra por abajo (sin reloj, cambio del cliente). 1.3–1.5 web sube desde abajo en 3D, tres cursores de visitante entran, push-in 100→150 y desenfoque. 1.6–1.7 corte a naranja: «Justo lo que tú vendes» palabra a palabra. 1.8 lienzo claro lleno de cards con cursores Send. 1.9 zoom a card Marta Rubio («Entran a tu web»). 1.10 órbita 3D a Daniel Sáez («Leen tu contenido»). 1.11 tres webs, cursores con estela naranja («Te comparan»). 1.12–1.13 cursores estallan en monedas €, caída con paralaje, «Estás perdiendo mucho dinero». 1.14 naranja, contador mecánico 12.400 €. 1.15 «Sin enterarte».

## Frame 2 — El dolor («panel split-flap»)

- scene: Chat abierto con señales alrededor, iconos de rebobinar y las señales se van (v2), red profesional con el chat que se abre, se lee y se envía, «Que nadie abre» bajo el chat, campo 3D de facturas que se multiplica (ref. 23.19), un tick gris, facturas de eventos, tragaperras de referidos
- duration: 8.35s
- transition_in: cut
- status: animated
- voiceover: "porque sigues vendiendo como hace 5 años. Mensajes en frío que nadie abre y rezar para que lleguen referidos."
- nota_locución: Sin 2.11–2.13 («eventos carísimos»): la locución no lo dice; el chat pasa directo a la tragaperras.
- src: index.html#s2
- blueprint: zoom-out-workspace-reveal + cursor-ui-demo
- rules: svg-path-draw, waterfall-entry, motion-blur-streak, depth-of-field-blur, press-release-spring, vertical-spring-ticker, spring-pop-entrance

2.1 degradado claro, «Porque sigues vendiendo». 2.2 plano cerrado en Actualidad, zoom out revelando la curva (Trim Paths). 2.3–2.4 el nodo retrocede a −5 años, la línea se apaga en gris, «Como hace 5 años». 2.5–2.7 red profesional en 3D con chat abierto, zoom al chat, clic en Send. 2.8–2.10 ráfaga diagonal de «Nuevo mensaje enviado», cursor a contramano hace clic, se abre con un solo tick gris («Que nadie abre»). 2.11–2.13 facturas entran desde abajo con overshoot, «Eventos carísimos sin retorno», todo se aleja en Z. 2.14–2.16 tragaperras: Tirar, rodillos giran, paran referido · nada · nada, «Y rezar para que lleguen referidos».

## Frame 3 — La falsa solución («pestañas infinitas»)

- scene: Naranja «¿Y qué hacemos?», cards de herramientas/listas/mensajes hasta el ruido, calendario vacío y puente claro «Porque en B2B»
- duration: 6.83s
- transition_in: cut
- status: animated
- voiceover: "¿Y qué hacemos? Más herramientas, más ruido y cero reuniones."
- nota_locución: Sin los rótulos «Más listas» / «Más mensajes» (la nube de cards se mantiene, comprimida). La voz de «Porque en B2B…» acompaña el nuevo puente claro con esa frase.
- src: index.html#s3
- blueprint: overwhelm-surround
- rules: waterfall-entry, depth-scatter-assemble, depth-of-field-blur, scale-swap-transition

3.1 naranja pleno, pregunta palabra a palabra. 3.2–3.5 tres capas de cards en profundidad, la frase cambia a corte, velo claro y «Más ruido». 3.6 salida por arriba + calendario desde abajo en los mismos 14f. 3.7 «Cero reuniones», retícula vacía. 3.8–3.9 calendario se aleja y el fondo permanece claro con «Porque en B2B», sin negro vacío.

## Frame 4 — El insight («la línea de tiempo de la relación»)

- scene: Paleta invertida, bandeja con «Leído», naranja «La gente compra a quien ya conoce», cinco cards-fase con checks, card COMPRA brillando
- duration: 6.78s
- transition_in: cut
- status: animated
- voiceover: "Porque en B2B nadie compra a un desconocido. La gente compra a quien ya conoce y a quien ya confía."
- nota_locución: Sin «A quien ya siguen»: la locución dice «…y a quien ya confía»; el travelling dura 2,0 s.
- src: index.html#s4
- blueprint: spatial-pan-stations
- rules: waterfall-entry, nudge-curve, multi-phase-camera, depth-of-field-blur, ambient-glow-bloom, spring-pop-entrance

4.1 «Nadie compra a un desconocido» magnético desde la derecha, negro sobre blanco. 4.2 el texto sube, bandeja 3D con doble tick verde en cascada. 4.3 naranja pleno. 4.4–4.8 travelling lateral por la línea: Visitó tu web → Te siguió → Ronda de inversión → Guardó tu caso → COMPRA con anillos en pulso que saturan a blanco.

## Frame 5 — Las señales · «feed en directo»

- scene: Panel torre de control, web 3D, clic al perfil, Seguir → Siguiendo con onda, tres webs, zoom a naranja, paneo, pantalla llena, colapso a negro
- duration: 14.74s
- transition_in: cut
- status: animated
- voiceover: "Y justo antes de comprar, lo demuestran. Entran a tu web, visitan tu perfil, te siguen y analizan a tu competencia. Son señales de compra. Y nadie las ve."
- src: index.html#s5
- blueprint: cursor-ui-demo + camera-journey
- rules: waterfall-entry, counting-dynamic-scale, coordinate-target-zoom, cursor-click-ripple, press-release-spring, multi-cursor-choreography, svg-path-draw, depth-of-field-blur, motion-blur-streak

5.1 negro, frase bisagra. 5.2–5.3 panel grande de señales (cortado por abajo) con lista de scroll interno: 14 filas, barra de scroll, contador a 312. 5.4 paneo de cámara hacia abajo: panel y rótulo se van por arriba, el fondo cambia al degradado claro y la web 3D sube desde abajo («Entran a tu web»). 5.5–5.6 zoom al icono, clic, perfil entra desde abajo. 5.7–5.9 «Entran a tu perfil», zoom y clic en Seguir; zoom grande dejando el botón centrado, que pasa a naranja «Siguiendo» mientras el resto desaparece, y onda de píldoras. 5.10–5.11 tres webs, cursores con estela, convergen. 5.12 el contorno llena el cuadro → naranja, «Son señales de compra». 5.13 el naranja transforma su color en el degradado claro y revela el campo de señales ya colocado en primerísimo plano (sin entrada). 5.14 plano cerrado del campo de cards con cursores; «Y nadie las ve» se compone inclinada palabra a palabra mientras el frame se aclara y las cards se apagan a fantasmas desenfocados (ref. 19.32). 5.15–5.16 transformación rápida a negro y entrada del reveal con «Por eso hemos creado», sin la espera anterior.

## Frame 6 — Reveal · «encendido»

- scene: Punto → logo a trazo → nombre → ondas → sistema go-to-market → equipo en círculo
- duration: 8.07s
- transition_in: cut
- status: animated
- voiceover: "Por eso hemos creado Ploot, un nuevo sistema de go-to-market que convierte a tu equipo en tu mejor canal de ventas."
- src: index.html#s6
- blueprint: logo-assemble-lockup + constellation-hub
- rules: svg-path-draw, ambient-glow-bloom, waterfall-entry, avatar-cloud-network, theme-crossfade-morph

6.1–6.5 punto de luz que se desliza al inicio del contorno y dibuja el isotipo como una pluma (sin línea horizontal), «Ploot» letra a letra, dos anillos. 6.6–6.7 del logo sobre negro se pasa directamente a «Un nuevo sistema go-to-market»: el logo se va y el fondo se transforma al degradado claro mientras se forma la frase (sin reencender las señales). 6.8–6.9 el mercado es un plano 3D inclinado: las esferas del equipo asoman grandes por el borde delantero y, sin pararse, suben en arco hasta su sitio como nodos de pie con anillo naranja. 6.10–6.12 ondas elípticas sobre el plano y «En tu mejor canal de ventas» compuesta en el centro entre los avatares; las líneas curvas de todos los avatares convergen bajo la frase mientras la cámara cierra en un zoom in continuo (sin card «Meeting booked»).

## Frame 7 — Tres pasos · resultado visible

- scene: Dashboard, perfil de audiencia, lista de leads, una conversación, calendario con doce demos.
- duration: 22.10s
- transition_in: cut
- status: animated
- voiceover: "Uno. Convertimos el conocimiento de tu equipo en audiencia. Dos. Detectamos cada señal de compra. Tres. Contactamos al lead en el momento justo para agendarte reuniones."
- nota_locución: Provisional. Se han separado los tres pasos para acompañar un montaje con mayor tiempo de lectura; el calendario resuelve visualmente la frase al terminar el intercambio de mensajes.
- src: index.html#s7
- rules: control-target-sync, press-release-spring

1. **56,77–62,57:** UNO, dashboard, acción del botón y perfil con seguidores/Top Voice. Entradas suaves de 850 ms; salida corta sin atravesar la cámara.
2. **62,57–67,57:** DOS, lista más frontal, reorden en 950 ms, selección de leads y estado «Momento ideal». El resultado se lee antes de la salida.
3. **67,57–74,02:** TRES. Una conversación de LinkedIn con Noemí Herrero: tres párrafos, una pulsación de envío y una respuesta. No hay duplicado en correo.
4. **74,02–78,87:** Semana con doce demos distribuidas entre lunes y viernes. Nombres variados inspirados en los ejemplos de [Ploot](https://www.ploot.ai/), contador hasta 12 y lectura del conjunto completo durante unos 2,5 s. Salida al cierre.

Se retiran por completo la rejilla 1–5 %, la comparativa ×12 y «El sistema funciona», con sus cortes de voz y sonidos correspondientes.

## Frame 8 — Cierre + CTA («se cierra el círculo»)

- scene: Texto, la web del hook con visitantes identificados, perfil Javier Durán, botón Agenda una demo, clic con onda, logo sobre naranja
- duration: 9.71s
- transition_in: cut
- status: animated
- voiceover: "deja de perseguir clientes fríos y aparece cuando ya quieren comprarte. Agenda una demo y analizaremos tu caso en concreto."
- src: index.html#s8
- blueprint: cta-morph-press
- rules: waterfall-entry, multi-cursor-choreography, cursor-click-ripple, press-release-spring, depth-of-field-blur

8.1 solo texto. 8.2 vuelve la web del hook con nombres. 8.3 clic → perfil con tres fueguitos, 92, Contactar ahora. 8.4 cae el botón con subline, cursor entra. 8.5 clic + onda en dos naranjas. 8.6 corte a naranja, logotipo quieto hasta el final.
