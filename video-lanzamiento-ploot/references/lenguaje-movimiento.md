# Lenguaje de movimiento · catálogo de primitivas

Todas viven en `src/tl/helpers.js` (se copia tal cual desde `assets/plantilla/tl/helpers.js`) y están
disponibles sin import dentro de cualquier `src/tl/sN.js`, porque el build concatena todo en un solo
`<script>`.

Trátalo como un vocabulario cerrado. Cuando una escena pide algo que no está aquí, casi siempre es
una combinación de dos primitivas, no una animación nueva. Inventar rompe la coherencia y además
suele saltarse alguna de las seis reglas.

Índice: [Texto](#texto) · [Planos de UI](#planos-de-ui) · [Cámara y 3D](#cámara-y-3d) ·
[Cursor y clics](#cursor-y-clics) · [Trazos, números y remates](#trazos-números-y-remates) ·
[Combinaciones](#combinaciones-que-funcionan)

---

## Texto

### `tiltWords(tl, sel, t, { gap, dur, y, tilt, from, settle, grow, hold })`
La línea base de toda la pieza. La frase nace ligeramente inclinada y algo pequeña, se endereza y
sigue creciendo mientras sus palabras suben una a una.

Por qué está montada así: la entrada (cada palabra) y la deriva (la línea entera) tienen **dueños
distintos** — las palabras animan `.w`, la pose anima `.text-pose`. Eso permite que un rótulo corto
empiece a salir antes de terminar de entrar sin que las dos animaciones se peleen por la misma
propiedad.

- `hold` es lo que hace que la frase no se congele: sigue creciendo hasta `grow` durante ese tiempo.
- `gap` se limita internamente a 0,09 s: las frases se ensamblan antes de lo que sugiere el
  storyboard porque, con voz encima, una cadencia lenta se siente arrastrada.
- Devuelve el segundo en que termina de entrar, útil para encadenar.

### `label(id, texto)` y `kin(id, texto, { pos, color, size })` (en `lib.mjs`)
Construyen el markup. `kin` con `pos: "center"` para las frases grandes a pantalla completa, `label`
(equivale a `pos: "top"`) para las que acompañan a un visual. El tamaño se reduce solo en el build si
la línea no cabe en 1720 px: nunca se parte en dos líneas.

### `wordsPush(tl, sel, t, { dur, gap, y })`
La frase se forma desde el centro: la línea entera se desliza a la izquierda en **un solo movimiento
continuo** mientras cada palabra nueva sube a su hueco. Mide las cajas de las palabras en el build.
Para titulares largos donde el empuje palabra a palabra se vería a trompicones.

### `magnetic(tl, sel, t, { dur, gap, x })`
Palabra a palabra desde la derecha con desenfoque que se resuelve. Da una entrada más seca y
mecánica que `tiltWords`. Va bien en la primera frase de la pieza y en frases-bisagra cortas.

### `lettersIn(tl, sel, t, { dur, gap, y })`
Letra a letra cayendo desde arriba cada 2 f. Sólo para palabras-acento muy cortas (una o dos
palabras). En una frase larga se hace eterno.

### `textOut(tl, sel, t, { mode, dur })`
Tres salidas, y elegir bien importa:

| modo | qué hace | cuándo |
| --- | --- | --- |
| `up` (por defecto) | Sube 24 px con la opacidad cayendo antes | Cambio de línea dentro del mismo bloque |
| `zoom` | La frase atraviesa la lente (escala + desvanecido) en 0,42 s | **Bisagra entre bloques**: es lo que cose dos ideas sin corte |
| `fade` | Se disuelve en el sitio | Cuando el visual de debajo ya está llevando la atención |

### `wordsOut(tl, sel, t, { dur, gap, y })`
La línea se deshace palabra a palabra en orden de lectura. Más suave que `textOut up` cuando la
frase es larga y quieres que se vacíe progresivamente.

---

## Planos de UI

### `riseIn(tl, sel, t, { y, rotX, dur, blur, ease, scale })`
Un plano (dashboard, chat, tarjeta grande) entra desde abajo del frame, con rotación X extra que se
corrige al llegar y desenfoque que se resuelve. `expo.out` 0,85 s. Es **la** entrada de interfaz: si
un plano aparece sin subir, la pieza pierde la sensación de espacio.

El `rotX` se aplica en relativo (`+=` / `-=`), así que respeta la pose 3D que ya tenga el elemento.

### `fallOut(tl, sel, t, { y, x, dur, rotX, blur, scale })`
Sale hacia abajo acelerando, inclinándose y desenfocando, 0,3–0,4 s `power3.in`. Colócalo **antes**
de que entre lo siguiente, no después: el solape es lo que elimina el corte.

### `popIn(tl, sel, t, { from, y, dur, ease, rot })`
Para elementos pequeños que aparecen: badges, chips, avatares, filas, burbujas. Escala 0,82 → 1
subiendo 28 px. En cascada (cada uno 2–3 f después del anterior) para listas.

### `drift(tl, sel, t, dur, { ry, rx, y, scale, ease })`
La regla 1 hecha función: mientras un elemento aguanta en pantalla, deriva en una sola dirección.
Se pone **siempre** después de un `riseIn`, cubriendo todo el hold. Sin esto el plano se congela.

---

## Cámara y 3D

El montaje 3D es: un `.stage` (perspectiva 1800 px) contiene planos con `.p3d`
(`transform-style: preserve-3d`). Una `.cam` envuelve el conjunto y es lo que se mueve.

### `depth(sels, zs)`
Da a cada elemento su propia profundidad (`translateZ`). Es lo que convierte un movimiento de cámara
en paralaje real: los cercanos se desplazan más que los lejanos. Sin `depth`, un giro de cámara sobre
elementos coplanares parece un simple sesgado.

### `tilt3D(tl, cam, t, { ry, rx, z })`
Pose inicial del plano (un `set`, no un tween). Se pone en el frame en que la escena empieza.

### `orbit3D(tl, cam, t, dur, { dry, drx, dz, dscale })`
Una órbita + dolly lenta y monótona durante el hold. **Deltas relativos**, así que compone con la
pose que ya tenga el plano. Es la versión 3D de `drift` para grupos.

### `whipOut(tl, sel, t, { mode, dur, scale, x })`
Todo el grupo se va por la lente (`zoom`) o barre lateralmente con skew (`pan`). Para salidas de
bloque muy marcadas, cuando la bisagra la lleva el visual y no el texto.

### Zoom que acompaña al cursor (patrón, no helper)
La regla 4 se escribe a mano porque depende de medir. La forma canónica está en
`assets/plantilla/tl/s1.js`; el resumen:

```js
// 1. fija la pose estática ANTES de medir
gsap.set("#panel", { rotationY: -8, rotationX: 5, transformOrigin: "50% 50%" });
// 2. mide el botón en coordenadas de escena (1920×1080)
const rr = $("#root").getBoundingClientRect(), kk = 1920 / rr.width;
const br = $("#boton").getBoundingClientRect();
const BX = (br.left + br.width / 2 - rr.left) * kk, BY = (br.top + br.height / 2 - rr.top) * kk;
// 3. la cámara pivota SOBRE el botón y lo lleva al centro
tl.set("#cam", { transformOrigin: BX + "px " + BY + "px" }, t0);
tl.to("#cam", { scale: 1.45, x: 960 - BX, y: 540 - BY, duration: D, ease: "power2.inOut" }, tCur);
// 4. el cursor viaja con la MISMA duración y curva
tl.to("#cur", { ...tip(BX, BY), duration: D, ease: "power2.inOut" }, tCur);
```

Pivotar sobre el botón es la clave: si el `transform-origin` está en el centro del frame, el zoom
desplaza el botón y el cursor tiene que perseguirlo.

---

## Cursor y clics

### `cursor(id, { x, y, size })` (en `lib.mjs`)
Cursor sobreescalado (96 px es el tamaño de trabajo; 48–60 px cuando la escena está muy cerca).
Lleva el anillo de burst dentro.

**La punta no es la esquina**: está al 21 % / 14 % de su caja. Para llevar la punta a un punto:

```js
const CS = 96, tip = (x, y) => ({ x: x - 0.21 * CS - ANCLA_X, y: y - 0.14 * CS - ANCLA_Y });
```

donde `ANCLA_X/Y` son las coordenadas CSS con las que se creó el cursor. Olvidarlo descoloca todos
los clics unos 20 px, que a tamaño de pantalla se ve.

### `click(tl, cur, t, target, { press })`
El tap completo: el cursor se comprime sobre su punta, el objetivo reacciona **en el mismo frame**
y el anillo sale de la punta. El anillo hace falta que exista dentro del elemento pinchado
(`withBurst`) para que herede sus transformaciones.

### `move(tl, sel, t, x, y, dur, ease)`
Desplazamiento simple del cursor. Para trayectos curvos, usa `motionPath` de GSAP con un path del
markup y acompáñalo con `trail`.

---

## Trazos, números y remates

### `draw(tl, sel, t, dur, { ease, from, to })`
Dibuja un trazo SVG (equivale a Trim Paths). Funciona con `path` y con `rect`. Para dibujar el
contorno de un botón antes de que aparezca, o un logo.

### `trail(tl, sel, t, dur, { win, ease, tail })`
Estela tipo cometa: una ventana del trazo cuya cabeza sigue al cursor (misma curva y duración que su
`motionPath`) y cuya cola le alcanza después.

### `count(tl, sel, t, from, to, dur, { ease, fmt })`
Contador determinista (función pura del progreso, apto para seek). `fmt` controla el formato:
`de-DE` para separador de miles español, `en-GB` para inglés.

### `burstAt(tl, el, t, { dur, from, to })`
El anillo de arcos, 0,55 s. `click` lo dispara solo; se llama a mano para remates sin clic (el burst
del logo, por ejemplo).

### `speedLines`, `shake`, `blur`, `show` / `hide`
Utilidades menores. `show`/`hide` encienden y apagan fases: el cambio de fase es siempre
`hide(anterior)` + `show(siguiente)` **en el mismo instante**, nunca con hueco.

---

## Combinaciones que funcionan

**Frase sola sobre color plano** (bisagra o golpe narrativo)
`show` → `tiltWords` con `hold` largo → `textOut` en `zoom`.

**Plano de interfaz que se presenta**
`gsap.set` de la pose → `riseIn` → `drift` cubriendo el hold → filas con `popIn` en cascada →
`fallOut` solapando con lo siguiente.

**Demostración de producto con clic**
Plano dentro de `.cam` → cursor entra desde fuera → cámara y cursor viajan juntos → `click` →
el plano atraviesa la lente (`whipOut` o `scale` + blur) y el siguiente ya está subiendo.

**Campo de tarjetas en profundidad**
`depth` con z distintos → `tilt3D` → las tarjetas entran desde el frente (z alto → su z) con
`expo.out` y desenfoque que se resuelve → `orbit3D` durante el hold → todas se van hacia arriba
a la vez.

**Lista que se reordena y se filtra**
Filas con `popIn` en cascada → cada fila se mueve a su nuevo hueco con `power2.inOut`, escalonando
por distancia recorrida → las descartadas caen en Z (`z: -260 - k*170`, escala 0,55, opacidad 0) →
la cámara cierra sobre las que quedan.
