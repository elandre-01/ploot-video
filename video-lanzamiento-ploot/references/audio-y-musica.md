# Audio y música

Tres buses (`<hf-audio-group>`) con una jerarquía clara: **la voz manda, los efectos acompañan, la
música es cama**. Si algo compite con la voz, el problema casi nunca se arregla bajando volúmenes en
general, sino dándole a cada uno su sitio.

## Voz en off

Se trocea **por frases**, no se coloca entera. Cada clip es una entrada de la tabla `VO`:

```js
{ id: "vo-07", block: "s4", start: 2.27, mediaStart: 26.45, mediaEnd: 30.00, text: "La gente compra…" }
```

`start` es relativo al bloque (así el clip se mueve con el bloque), `mediaStart`/`mediaEnd` son
segundos de la toma original.

**Cada corte debe caer dentro de un silencio real de la grabación.** Localízalos así:

```bash
ffmpeg -i assets/vo.mp3 -af "silencedetect=noise=-38dB:d=0.09" -f null -
```

Y para saber dónde está cada palabra, transcribe con timestamps:

```bash
npx hyperframes transcribe assets/vo.mp3 -l es -m large-v3 --timeout 600000
```

Colocación: la palabra clave de cada frase manda. El rótulo entra entre 0 y 0,4 s después de que la
voz la diga. Cuando una frase de la locución no tiene visual (o al revés), **acorta el visual o
quita el beat**: estirar silencios para cuadrar se nota mucho más que recortar.

Comprobación que merece la pena: monta un mixdown sólo-voz de los clips y transcríbelo. Si devuelve
las mismas palabras que la toma original, ningún corte se ha comido una sílaba.

## Efectos

**Un efecto se coloca por su pico, no por su inicio.** El clip empieza en (momento visual − peak), y
por eso `LIB` guarda el `peak` de cada archivo:

```bash
node <skill>/scripts/medir-picos.mjs assets/sfx/*.mp3
```

El script busca el máximo de la envolvente de *ataque*, no el de energía: en un impacto con cola
larga el máximo de energía llega tarde y el golpe sonaría desplazado.

Qué poner y dónde, según lo que acabó funcionando:

| Momento visual | Sonido |
| --- | --- |
| Bisagra entre bloques, movimiento de cámara | `whoosh` (0,3) |
| Entrada o salida de un plano grande | `whoosh` corto (0,22) o `whoosh-cinematic` bajo |
| Corte a color pleno, rótulo de número («Uno», «Dos») | `impact-bass-1` (0,25) |
| Clic del cursor | `click` (0,5) |
| Elemento que aparece: card, fila, chip, burbuja | `pop` (0,3–0,42) |
| Confirmación, éxito, badge conseguido | `chime` (0,3–0,48) |
| Mensaje entrante, notificación | `notification` (0,34) |
| Escritura en un campo | `typing` |
| Subida hacia el reveal | `riser` (se coloca por su final, que es la cresta) |
| Reveal de marca, naranja final | `impact-bass-2` (swell + golpe) |

Densidad: mejor un sonido por acción visible que un tapiz continuo. Y todos los impactos de bajo
llevan un `TRIM` de serie porque son los archivos más fuertes de la biblioteca.

Los efectos que se solapan **no pueden compartir carril** de Studio; la plantilla de `audio.mjs`
asigna carriles libres automáticamente.

## Música

### Elegir pista
Lo que hace que una pista encaje con esta animación:

- **Tempo**: el movimiento está construido sobre una rejilla de 110 BPM. Una pista entre 105 y 115
  BPM cuadra sin tocar nada. Fuera de ahí hay que mover los anclajes del beat clock o estirar la
  pista (hasta un 4 % es inaudible; más se nota).
- **Tres niveles de energía claros**, con una intro sin batería de 25 s o más. En la forma de onda
  del reproductor se ve: busca la silueta escalonada, y descarta lo que arranca alto.
- **Un drop identificable** para el reveal y un final propio para el logo.
- **Instrumental**. Los coros cortados son lo primero que suena a «hilo musical de tienda».

Filtros de Artlist que funcionan: Vocals → Instrumental; BPM 105–115; Duration ≥ 2:00; Genre
Electronic o Cinematic (excluyendo Funk, Disco, House, Lounge); Mood Building / Determined /
Inspiring (excluyendo Groovy, Laid Back, Sexy); Instrument Synth / Percussion (excluyendo saxo,
metales y guitarra funky).

### Montar la pista
Dos formas, según lo que haya:

**Con stems** (lo ideal): la canción corre en su propio reloj, desplazada lo justo para que sus
pulsos caigan en la rejilla y su drop coincida con el reveal. Las tres intensidades se construyen
**activando y bajando pistas**, no cortando: chill = piano y sintes suaves; medio = todo con la
batería contenida; fuerte = todos los stems a nivel. Además se pueden sacar *one-shots* de los stems
(golpes de orquesta, impactos) y colocarlos en los cortes fuertes: suenan a la misma canción, que es
justo lo que hace que la música y la imagen no vayan por su lado.

**Sin stems**: se corta por compases en primer tiempo, eligiendo fragmentos de distinta intensidad
del propio tema. Cada etapa debe empezar en un primer tiempo de compás, exactamente en su anclaje.

En los dos casos, los silencios del guion se respetan: la música se va antes y vuelve con el drop.

### Carve contra la voz
Una cama bajo una voz no se arregla bajándola entera: pierde toda su presencia durante la locución.
Se **carvea**, que quita sólo las bandas donde vive la voz y sigue la envolvente del habla:

```bash
node ~/.claude/skills/hyperframes-audio/scripts/carve.mjs \
  --comp index.html --bed <id-del-clip> --strength 0.35 --core <dir con @hyperframes/core>
```

Fuerza 0,35 es un buen punto de partida (0,8 es demasiado para música que debe seguir oyéndose). El
carve escribe `data-fx-carve`, `data-fx-chain` y `data-automation` en el `<audio>`; hay que
**persistirlo** en `src/carve/<id>.json` para que el build lo reinyecte, porque `index.html` se
regenera en cada build.

Si cambias el volumen de la música, repite el carve: está calculado contra un nivel concreto.

## Niveles que funcionaron

Medidos sobre la mezcla exportada del vídeo de Ploot. No son dogma, pero son un punto de partida
mucho mejor que empezar de cero:

| Elemento | Nivel |
| --- | --- |
| Mezcla completa | −22 a −25 LUFS integrado, pico ≤ −6 dBFS |
| Voz | referencia; todo lo demás se ajusta contra ella |
| Música en las pausas de voz | −22 LUFS aprox. (etapas: −27 chill, −20,6 medio, −12,9 fuerte antes del bus) |
| Efectos | el bus acabó en −15,5 dB tras varias pasadas de «más bajo» |

Cuando la persona pida «súbelo/bájalo N dB», el sitio es el nodo `gain` del bus correspondiente
(`sfx-delivery`, `music-background`), no los volúmenes clip a clip.

**Cuidado con la automatización**: en HyperFrames los puntos de una lane de `volume` son
**absolutos**, no multiplican a `data-volume`. Si una lane llega a 1, el clip suena a tope por mucho
que bajes `data-volume`. La plantilla escala los puntos de la lane por el `volume` del clip
justamente por eso.

## Export sin música

Para valorar voz y efectos por separado, la plantilla trae un interruptor:

```bash
NO_MUSIC=1 node src/build.mjs && npx hyperframes render . --quality looks --output renders/sin-musica.mp4
node src/build.mjs     # ← reconstruir siempre después, para dejar el proyecto con música
```

Es también la forma de entregar una versión a la que el cliente le ponga su propia música.

## Comprobar la mezcla en el MP4

```bash
# nivel de un tramo concreto
ffmpeg -ss 27.25 -to 29.25 -i render.mp4 -vn -af ebur128=peak=true -f null -
```

Elige tramos **sin voz** para medir efectos o música; si la voz está sonando, mides la voz. Y para
comprobar que un golpe cae donde debe, mide la envolvente del propio archivo de música, no la del
MP4 mezclado: las consonantes de la locución falsean el máximo.
