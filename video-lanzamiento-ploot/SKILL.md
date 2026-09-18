---
name: video-lanzamiento-ploot
description: >
  Crea vídeos de lanzamiento de producto en HyperFrames con el lenguaje de movimiento de Ploot:
  cámara continua que nunca se detiene, titulares cinéticos palabra a palabra, planos de interfaz
  que suben en perspectiva 3D y siguen derivando, cursor sobreescalado con anillo en cada clic,
  bisagras que atraviesan la lente entre bloques, y voz + efectos + música cuadrados al pulso.
  Úsala siempre que haya que hacer un vídeo de producto, promo, explicativo o de landing con este
  estilo, o cuando alguien diga "como el vídeo de Ploot", "con los mismos movimientos", "otro vídeo
  igual pero de X", "un vídeo de lanzamiento", "motion graphics para la landing", pida traducir o
  localizar uno existente, o pida retocar el ritmo, el sonido o la música de uno de estos vídeos.
  Úsala también aunque no nombren Ploot ni HyperFrames: si el encargo es un vídeo animado de
  producto con voz en off y planos de interfaz, esta skill es el punto de partida.
---

# Vídeo de lanzamiento · lenguaje Ploot

Esta skill contiene el motor completo con el que se hizo el vídeo de Ploot: las primitivas de
movimiento, el sistema de diseño, el contrato de audio y el ciclo de trabajo. Con ella se puede
levantar un vídeo nuevo de cero, localizar uno existente a otro idioma o retocar el ritmo de uno ya
montado, sin volver a deducir nada.

Lo que la hace funcionar no es la lista de helpers, sino **una idea**: el vídeo es **un solo
movimiento de cámara continuo**, no una sucesión de diapositivas animadas. Todo lo demás
(las curvas, los solapes, las bisagras) existe para sostener esa ilusión. Si en algún momento una
decisión te hace dudar, pregúntate si el espectador sentiría un corte o un frenazo: si la respuesta
es sí, está mal, por muy bonita que sea la animación.

## La ley de movimiento

Seis reglas. Vienen de comparar fotograma a fotograma con la referencia del cliente y de una docena
de iteraciones con notas del tipo «va a trompicones» o «parece amateur».

1. **Nada se queda quieto.** Cualquier elemento que aguanta en pantalla deriva despacio (`drift`:
   +3° rotY, −14 px, +2,5 % escala, `sine.out`) o sigue creciendo (`tiltWords` con `hold`). Un
   elemento congelado delata que el vídeo es una secuencia de estados y rompe la cámara continua.

2. **Entradas que frenan, salidas que aceleran.** Entrar: 0,8–0,9 s con `expo.out` / `power4.out`.
   Salir: 0,25–0,45 s con `power3.in` y desenfoque. La salida **solapa ~0,2 s** con la entrada
   siguiente: nunca hay un frame vacío entre dos ideas. Un corte limpio se nota; un solape, no.

3. **Curvas cortadas: una sola dirección.** Ninguna animación vuelve a su origen. Nada de `yoyo`,
   nada de oscilar, nada de «respirar» de ida y vuelta. Si algo gira, sigue girando hacia el mismo
   lado hasta que se va. El movimiento pendular es lo que hace que un motion graphic parezca una
   plantilla.

4. **La cámara acompaña, no salta.** Cuando el cursor va hacia un botón, la cámara sale con él, con
   **la misma curva y la misma duración**, pivotando sobre el botón (`transform-origin` en su centro)
   y llevándolo al centro del frame. Cursor y botón se encuentran justo en el clic. Un zoom que
   empieza después del clic se siente reactivo y barato.

5. **El texto sigue a la voz.** Cada rótulo entra entre 0 y 0,4 s después de que la voz diga su
   palabra clave, nunca antes. Las palabras suben de una en una cada 4 f (0,17 s), 46 px en 0,45 s.
   Una frase ocupa unos 3–4 s: 0,3 s entra el visual → arranca la línea → ~1,2 s frase completa →
   hold con deriva → 0,3 s de salida.

6. **Los golpes caen en el frame.** Un impacto de audio se coloca por su pico, no por su inicio, y
   los cortes fuertes se ajustan (±0,2 s) al pulso de la música. Si la imagen golpea y el sonido
   llega dos frames después, el espectador percibe dos películas distintas.

## Arranque rápido

```bash
node <ruta-skill>/scripts/nuevo-proyecto.mjs ~/ruta/mi-video --titulo "Mi vídeo" --bloques 6
cd ~/ruta/mi-video && node src/build.mjs && npx hyperframes check
```

Eso deja un proyecto que ya construye y pasa el check, con un bloque de ejemplo que contiene el
vocabulario entero (frase cinética, plano que sube, cámara que sigue al cursor, clic con anillo,
bisagra). Faltan por copiar las fuentes (`assets/fonts`) y los recursos de marca.

Antes de escribir el primer bloque, lee `references/arquitectura.md`: explica cómo se reparte el
trabajo entre `src/scenes/sN.mjs` (markup) y `src/tl/sN.js` (movimiento), y por qué las medidas se
toman en el build y no en tiempo de reproducción.

## Cómo se escribe un bloque

Un bloque es una idea del guion. Su forma canónica está en la plantilla, comentada línea a línea:

- `assets/plantilla/scenes/s1.mjs` — markup, CSS y datos medidos en el build.
- `assets/plantilla/tl/s1.js` — el movimiento, con `T` como segundo de inicio del bloque.

Léelos antes de escribir el tuyo; copiar esa forma ahorra la mayoría de los errores. El patrón es
siempre el mismo:

```js
function s3(tl, T) {
  show(tl, "#s3-p1", T);                       // enciende la fase
  tiltWords(tl, "#s3-t1", T, { hold: 1.2 });   // la frase entra palabra a palabra
  riseIn(tl, "#s3-panel", T + 0.4);            // el visual sube mientras la frase aún se compone
  drift(tl, "#s3-panel", T + 1.25, 2.0);       // y no se queda quieto
  textOut(tl, "#s3-t1", T + 2.6, { mode: "zoom" });   // bisagra hacia el bloque siguiente
  fallOut(tl, "#s3-panel", T + 2.7);           // la salida solapa con la entrada del siguiente
}
```

El catálogo completo de primitivas, con cuándo usar cada una y los valores que funcionan, está en
`references/lenguaje-movimiento.md`. Úsalo como vocabulario cerrado: inventar una animación nueva
cuando ya hay una primitiva para eso es lo que rompe la coherencia de la pieza.

## El reloj: autoría primero, música después

Los tiempos se escriben cómodos (segundos redondos por bloque, sin pensar en el pulso) y después
`src/beat-sync.json` los remapea de una vez a los anclajes reales. Cada ancla dice «este instante de
autoría pasa a ser este instante final»; `retimeBeatTimeline` arrastra a la vez la timeline, la
visibilidad de las escenas, la voz y los efectos.

Esto importa porque permite cambiar de canción sin reescribir ningún bloque: se mueven los `new` de
las anclas al pulso de la nueva pista y todo el vídeo se recoloca. Detalles y ejemplo de anclas en
`references/arquitectura.md` § El reloj de pulso.

## Audio

La voz manda, los efectos acompañan, la música es cama. Tres buses (`voiceover`, `sfx`, `music`) y
tres reglas que evitan casi todos los problemas:

- La voz se trocea **por frases**, cortando siempre dentro de un silencio real de la toma.
- Un efecto se coloca por su **pico**: el clip empieza en (momento visual − peak).
- La música se **carvea** contra la voz en vez de bajarla entera, y sus cambios de intensidad caen en
  los silencios del guion.

El contrato entero (tablas, niveles medidos que funcionaron, carve, música con stems, exportar sin
música) está en `references/audio-y-musica.md`.

## Ciclo de trabajo

Cada iteración, sin saltarse pasos:

```bash
node src/build.mjs                 # regenera index.html (nunca se edita a mano)
npx hyperframes lint               # 0 errores antes de seguir
npx hyperframes snapshot . -o <scratch> --at 1.2,3.4,...   # frames de los instantes que tocas
npx hyperframes check              # lint + runtime + layout + contraste
```

Mirar los frames **no es opcional**: el check no ve que una card salte, que dos textos se pisen o
que un rótulo entre antes que la voz. Captura los instantes concretos que has tocado y mira la hoja
de contactos que genera el snapshot.

Renderizar sólo cuando la persona lo pida. `references/control-calidad.md` tiene el detalle del
ciclo, cómo diagnosticar con frames y medidas, y una lista de trampas que ya nos costaron horas:
colisiones de clases entre escenas, `const` redeclaradas que dejan el vídeo en negro, planos 3D que
saltan al desvanecerse, y el cursor cuya punta no está donde parece.

## Estructura narrativa

El guion del vídeo de Ploot sigue un arco de ocho bloques que funciona bien para producto B2B:
gancho (la pérdida) → dolor → falsa solución → insight → señales → reveal → los tres pasos →
cierre con CTA. No es obligatorio, pero si el encargo no trae guion propio es un buen punto de
partida: está desarrollado en `references/bloques-narrativos.md` con qué hace cada bloque, cuánto
dura y qué recursos visuales usa.

## Ficheros de la skill

| Ruta | Qué contiene |
| --- | --- |
| `references/lenguaje-movimiento.md` | Catálogo de primitivas: firma, cuándo usarla, valores que funcionan, cómo se combinan |
| `references/arquitectura.md` | Cómo se reparte un bloque, el build, el reloj de pulso, medidas en build-time |
| `references/audio-y-musica.md` | Voz por frases, efectos por pico, música y carve, niveles medidos, export sin música |
| `references/control-calidad.md` | Ciclo build/lint/snapshot/check, diagnóstico con frames y medidas, trampas conocidas |
| `references/bloques-narrativos.md` | El arco de ocho bloques y qué recurso visual sostiene cada uno |
| `scripts/nuevo-proyecto.mjs` | Levanta un proyecto con el motor montado |
| `scripts/medir-picos.mjs` | Mide el golpe de cada archivo de audio para colocarlo al frame |
| `assets/plantilla/` | El motor: helpers, sistema de diseño, componentes, build, audio, beat clock |

## Sobre la marca

El sistema de diseño que viene en la plantilla es el de Ploot: naranja `#f43600`, tinta `#171516`,
degradado claro y negro `#0b0b0d`, tipografías Manrope e IBM Plex Mono. Para otra marca se cambian
los tokens de `:root` en `styles.css` y las fuentes; el movimiento no depende de ellos. Lo que sí
conviene conservar es la estructura de capas (`.phase`, `.cam`, `.stage`, `.p3d`), porque las
primitivas 3D dan por supuesto que existe.

Al elegir retratos para personas ficticias, usa rostros de aspecto español.
