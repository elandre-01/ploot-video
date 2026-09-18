# Control de calidad y diagnóstico

## El ciclo

```bash
node src/build.mjs                                    # regenera index.html
npx hyperframes lint                                  # 0 errores antes de seguir
npx hyperframes snapshot . -o <scratch> --no-end --describe false --at 1.2,3.4,5.0
npx hyperframes check                                 # lint + runtime + layout + contraste
```

Y después, actualizar la documentación del proyecto con lo que ha cambiado y por qué.

**Mirar los frames no es opcional.** El check valida estructura, no intención: no ve que una card
salte, que un rótulo entre antes que la voz, que dos textos se pisen en perspectiva o que un plano
se corte por el borde. Captura los instantes que has tocado y mira la hoja de contactos que genera
el propio snapshot.

Renderizar sólo cuando la persona lo pida.

### Snapshots útiles

```bash
# los instantes exactos que has tocado
npx hyperframes snapshot . -o $S --no-end --describe false --at 12.4,13.2,14.1,15.0

# frame a frame alrededor de un problema, recortando la zona
npx hyperframes snapshot . -o $S --zoom "100,330,1720,420" --zoom-scale 1 \
  --at 64.60,64.63,64.67,64.70,64.73,64.77
```

Para comparar dos versiones (por ejemplo español e inglés), captura **los mismos instantes** en las
dos y mira las hojas de contactos en paralelo.

## Diagnosticar con medidas, no a ojo

Un salto de imagen se encuentra midiendo la diferencia de píxeles entre frames consecutivos del MP4:

```bash
ffmpeg -ss 63.4 -t 3.4 -i render.mp4 -vf "scale=480:270,format=gray" -f rawvideo frames.gray
# y comparar cada frame con el anterior; el pico que destaca sobre la media es el salto
```

Un frame cuya diferencia es 10 veces la media es un salto real; entre 2 y 4 veces suele ser
movimiento rápido normal. Una vez localizado el instante final, se puede traducir al reloj de
autoría invirtiendo el mapa de `beat-sync.json` y así saber qué línea del timeline lo causa.

Para audio, mide tramos concretos con `ebur128` (ver `audio-y-musica.md`).

## Trampas conocidas

Cada una costó tiempo al menos una vez.

### Un plano 3D que se desvanece da un salto
Si un contenedor con `transform-style: preserve-3d` cuyos hijos tienen `translateZ` se anima con
`opacity`, el primer frame con opacidad < 1 crea un contexto de composición nuevo y **aplana el 3D**:
los hijos saltan a una proyección más pequeña.

Solución: que el contenedor sólo se mueva y sean **los hijos** los que se desvanezcan.

```js
// mal
tl.to('#leads', { y: -65, opacity: 0, duration: .44 }, t);
// bien
tl.to('#leads', { y: -65, duration: .44 }, t);
tl.to('#leads .row', { opacity: 0, duration: .44 }, t);
```

### Colisiones de clases entre bloques
Todos los bloques comparten una hoja de estilos. Una clase genérica (`.post`, `.cal`, `.chip`,
`.ph`) definida en dos escenas se pisa y aparece un bloque de color sobre otra cosa. Prefija las
clases por bloque o usa nombres específicos (`.fpost`, `.mcal`, `.nchip`, `.rlc`).

### `const` redeclarada = vídeo en negro
Todo el JS acaba en un solo `<script>`. Una constante declarada dos veces en el ámbito raíz, o usada
antes de declararse, lanza un `SyntaxError` y **no se construye ninguna timeline**: todos los frames
salen negros. Si ves negro total, abre la consola antes de tocar la animación.

Declara siempre dentro de la función del bloque.

### La punta del cursor no es su esquina
Está al 21 % / 14 % de su caja. Sin corregirlo, todos los clics caen desplazados.

### Medir sin fijar la pose
Si mides un botón con el plano en reposo pero al pinchar estará girado, el clic cae al lado. Fija la
pose, mide, limpia (ver `arquitectura.md`).

### Escalar por debajo de 1 revela los bordes
Un plano a pantalla completa escalado a menos de 1 deja ver el fondo por los lados. Escala siempre
**desde** 1 hacia arriba.

### Avisos de solapamiento de texto
`content_overlap` en el layout check suele ser real, pero en planos 3D a veces es una falsa alarma
por la proyección. Cuando el solape es intencionado (un rótulo sobre una interfaz), márcalo con
`data-layout-allow-overlap` en el elemento. Los avisos de contraste son informativos.

### Dos composiciones raíz
Un segundo `.html` con `data-composition-id` en la raíz del proyecto hace fallar el lint
(`multiple_root_compositions`). Si guardas copias de trabajo, renómbralas a `.disabled`.

### La automatización de volumen es absoluta
No multiplica a `data-volume`. Una lane que llega a 1 suena a tope aunque bajes el fader.

### El nombre del archivo de snapshot
Para tiempos enteros no lleva decimal (`frame-01-at-67s.png`). Si los procesas en bucle, ordénalos
en vez de construir el nombre.

## Antes de dar algo por terminado

- `npx hyperframes check` pasa sin errores.
- Los frames de lo que has tocado están mirados, no sólo generados.
- Los rótulos entran después de su palabra, no antes.
- Ningún elemento se queda quieto mientras aguanta en pantalla.
- Las salidas solapan con las entradas siguientes: no hay frames vacíos.
- Si hay audio: la voz no compite con nada, los golpes caen en el frame, y la mezcla está medida.
- La documentación del proyecto refleja el cambio y dónde está cada cosa.

## Guardar copias antes de cambios grandes

Antes de una reescritura (cambiar de música, sustituir la voz, retimar todo), guarda el estado
previo:

```bash
mkdir -p review/<nombre-del-cambio>
tar -czf review/<nombre-del-cambio>/before.tgz src index.html README.md
```

Permite volver atrás sin depender de deshacer, y deja claro qué versión era cuál cuando hay varias
iteraciones el mismo día.
