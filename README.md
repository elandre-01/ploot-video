# Ploot · vídeo de lanzamiento

Código fuente del vídeo de producto de Ploot, hecho en [HyperFrames](https://hyperframes.heygen.com).
Dos proyectos con la misma animación y distinto idioma:

| Carpeta | Idioma | Voz | Duración |
| --- | --- | --- | --- |
| `ploot-video/` | Español | toma en español (`src/voice-es.json`) | 80,55 s |
| `ploot-video-en/` | Inglés | Luke C (`src/voice-luke.json`) | 80,55 s |

`video-lanzamiento-ploot/` es una skill de Claude Code con el motor y el lenguaje de movimiento de
este vídeo, para crear otros con el mismo estilo (ver su `SKILL.md`; se instala enlazándola en
`~/.claude/skills/`).

Cada proyecto tiene su propio `README.md`, `MOTION.md` (lenguaje de movimiento) y `STORYBOARD.md`.

## Construir y previsualizar

```bash
cd ploot-video            # o ploot-video-en
node src/build.mjs        # regenera index.html (no se edita a mano)
npx hyperframes check     # lint + runtime + layout + contraste
npx hyperframes preview   # Studio en el navegador
```

Export sin música (voz + efectos):

```bash
PLOOT_NO_MUSIC=1 node src/build.mjs && npx hyperframes render . --quality looks --output renders/sin-musica.mp4
node src/build.mjs        # reconstruir después, para dejar el proyecto con música
```

## Qué contiene y qué no

El repositorio guarda **sólo lo que usa el montaje final**:

- El código de las dos versiones (`src/`), sin los módulos que el build ya no carga.
- Los assets que aparecen en pantalla o suenan: 17 retratos de los 28 del set, 24 efectos de sonido,
  la marca, las fuentes, el banner y las dos tomas de voz de cada idioma.
- La skill `video-lanzamiento-ploot`.

Quedan fuera los renders, las carpetas de revisión, los archivos sueltos de trabajo y cualquier asset
que no aparezca en el vídeo.

También queda fuera la **música**: son pistas con licencia de Artlist y generadas con Lyria, unos
220 MB. El código que las coloca y las mezcla sí está (`src/*music*.json`, `src/carve/`). Para
renderizar con música hay que copiar `.media/audio/bgm/` y `assets/music/` desde la copia de trabajo;
sin ellas, el export sin música funciona igual.
