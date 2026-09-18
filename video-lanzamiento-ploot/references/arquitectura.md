# Arquitectura del proyecto

## Reparto de responsabilidades

```
mi-video/
├── index.html              ← SE GENERA. No editar nunca a mano.
├── meta.json               ← id y nombre del proyecto para HyperFrames
├── src/
│   ├── build.mjs           ← ensambla index.html: lista de bloques, plantilla de página
│   ├── styles.css          ← sistema de diseño + primitivas de capa (.phase, .cam, .stage, .p3d)
│   ├── lib.mjs             ← componentes que devuelven HTML (kin, cursor, avatar, tarjetas…)
│   ├── beat-clock.mjs      ← remapeo de tiempos de autoría a tiempos finales
│   ├── beat-sync.json      ← las anclas de ese remapeo
│   ├── audio.mjs           ← voz, efectos y música (tablas + buses)
│   ├── carve/*.json        ← carve de música persistido, lo reinyecta el build
│   ├── scenes/sN.mjs       ← markup, CSS y datos de cada bloque
│   └── tl/
│       ├── helpers.js      ← las primitivas de movimiento
│       └── sN.js           ← el movimiento de cada bloque
├── assets/                 ← fuentes, marca, avatares, efectos de sonido, voz
└── .media/                 ← audio generado o importado (música, tomas de voz)
```

La separación entre `scenes/sN.mjs` y `tl/sN.js` es deliberada: **el markup describe un estado en
reposo y el timeline describe el movimiento**. Cuando se mezclan (posiciones animadas escritas en el
CSS, o markup generado desde el timeline) deja de poderse hacer seek y el render sale mal.

## Cómo se ensambla

`build.mjs` recorre `SCENES` y, por cada bloque:

1. importa `scenes/sN.mjs` y añade su `css` al CSS global y su `html` dentro de un
   `<section class="clip scene" data-start data-duration>`;
2. guarda su `data` en el objeto `DATA` que viajará al navegador;
3. concatena `tl/sN.js` al script y añade la llamada `sN(tl, start)`.

Todo acaba en **un solo `<script>`**, por eso las funciones se ven entre sí sin imports y `DATA` es
global. Al final se registra una única timeline pausada en `window.__timelines["main"]`, que es donde
el runtime de HyperFrames la busca para hacer seek.

Consecuencias prácticas:

- Los nombres de función y las constantes de nivel superior son **globales compartidos**. Dos
  bloques que declaren `const t3` en el ámbito raíz rompen la página entera. Declara siempre dentro
  de la función del bloque.
- Las clases CSS también son globales. Ver «colisiones de clases» en `control-calidad.md`.

## Medidas en tiempo de build

Varias primitivas necesitan saber dónde está algo (`wordsPush` mide cajas de palabras, el zoom que
acompaña al cursor mide el botón). Esas medidas se toman **mientras se construye la timeline**, con
las fuentes ya cargadas, no durante la reproducción. Por eso `build.mjs` espera a `document.fonts`
antes de llamar a `buildTimeline()`.

Regla al medir: **fija primero la pose que el elemento tendrá en ese instante**, mide, y luego
limpia. Si mides el elemento en su pose de reposo pero en pantalla estará girado, el clic caerá al
lado:

```js
gsap.set("#panel", { rotationY: -6.6, rotationX: 4.3, y: -3, scale: 1.004, transformOrigin: "50% 50%" });
const r = $("#boton").getBoundingClientRect();     // ← ahora sí es la posición real
gsap.set("#panel", { clearProps: "transform" });
```

Para convertir píxeles de pantalla a coordenadas de escena (1920×1080), que es en lo que trabaja la
timeline:

```js
const rr = $("#root").getBoundingClientRect(), kk = 1920 / rr.width;
const X = (r.left + r.width / 2 - rr.left) * kk;
const Y = (r.top  + r.height / 2 - rr.top ) * kk;
```

## El reloj de pulso

Los tiempos se escriben **cómodos**: bloques en segundos redondos, offsets legibles dentro de cada
bloque. Después `beat-sync.json` los remapea de una vez a los tiempos finales.

```json
{
  "bpm": 110,
  "duration": 81.139091,
  "anchors": [
    { "old": 0,     "new": 0,         "label": "inicio",     "sync": false },
    { "old": 21.35, "new": 24.363636, "label": "herramientas", "sync": true },
    { "old": 49.88, "new": 51.090909, "label": "reveal",     "sync": true }
  ]
}
```

Cada ancla dice «el instante de autoría `old` pasa a ser `new`». Entre anclas se interpola linealmente,
así que los tramos se estiran o encogen de forma continua: no hay saltos. `retimeBeatTimeline` aplica
ese mapa **una sola vez**, después de construir la timeline, y arrastra a la vez:

- la timeline entera (inicios y duraciones de cada tween),
- la visibilidad de las escenas (el `data-start` de cada `<section>` pasa por el mismo mapa),
- la voz y los efectos (sus tiempos son relativos al bloque, y el bloque se mueve con el mapa).

Por eso se puede cambiar de canción sin reescribir ningún bloque: se mueven los `new` al pulso de la
pista nueva y todo el vídeo se recoloca junto. `sync: true` marca las anclas que además publican una
etiqueta en la timeline, útil para leerlas desde el código (`DATA.beat.anchors`).

**Cuidado**: cualquier tiempo escrito directamente en segundos finales (por ejemplo una función que
se añade *después* del remapeo) no pasa por el mapa. Si necesitas eso, sepáralo en una función
aparte y llámala explícitamente después de `retimeBeatTimeline`, como hace el bloque de contacto del
vídeo de Ploot.

## Reglas de HyperFrames que hay que respetar

- Todo elemento temporizado necesita `data-start` y una duración. `class="clip"` le da la caja a
  pantalla completa.
- Una sola composición raíz por proyecto. Un segundo `.html` con `data-composition-id` en la raíz
  hace fallar el lint; si guardas copias, renómbralas a `.disabled`.
- Cada `<audio>` necesita `id`. Sin él, el mezclador lo ignora y el render sale mudo.
- `data-track-index` es sólo el carril visual de Studio, pero dos clips que se solapan en el mismo
  carril disparan un aviso: asigna carriles libres (la plantilla de `audio.mjs` lo hace sola).
- Nada de `Date.now()`, `Math.random()` ni fetch: el render hace seek a instantes sueltos y todo debe
  ser función pura del tiempo. Para posiciones aleatorias, usa el PRNG con semilla de `lib.mjs`
  (`rng(309)`) y calcula en el build.

## Localizar a otro idioma

El vídeo de Ploot tiene dos proyectos hermanos (`ploot-video` y `ploot-video-en`) con la **misma
animación** y distinto idioma. El reparto que funcionó:

- `src/tl/*.js`, `styles.css` y `beat-sync.json` son idénticos en los dos: el movimiento no se
  duplica, se copia.
- `src/scenes/*.mjs` y `lib.mjs` llevan los textos; ahí está toda la traducción.
- `src/voice-<idioma>.json` lleva la tabla de frases de esa voz, y `audio.mjs` apunta a ella.
- El formato de números cambia en `helpers.js` (`toLocaleString`) y en los textos de interfaz.

Al traducir, los titulares cambian de longitud: el build reduce el cuerpo de letra si no caben, pero
conviene revisar los frames de los rótulos más largos.
