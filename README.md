# Ploot · vídeo de lanzamiento

Código fuente del vídeo de producto de Ploot, hecho en [HyperFrames](https://hyperframes.heygen.com).
Dos proyectos con la misma animación y distinto idioma:

| Carpeta | Idioma | Voz |
| --- | --- | --- |
| `ploot-video/` | Español | toma en español (`src/voice-es.json`) |
| `ploot-video-en/` | Inglés | Luke C (`src/voice-luke.json`) |

La carpeta `video-lanzamiento-ploot/` es una skill de Claude Code con el motor y el lenguaje de movimiento de este vídeo, para crear otros con el mismo estilo (ver su `SKILL.md`; se instala enlazándola en `~/.claude/skills/`).

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
node src/build.mjs
```

## Qué no está en el repositorio

- **Música** (`.media/audio/bgm/`, `assets/music/`): pistas con licencia de Artlist y generadas con
  Lyria, ~220 MB. El código que la coloca (`src/squad-music-v*.json`, `src/groove-music*.json`,
  `src/carve/`) sí está. Para renderizar con música hay que copiar esas carpetas desde la copia de
  trabajo. Sin ellas, el export sin música funciona igual.
- **Renders** (`renders/`) y **revisiones** (`review/`): se regeneran.
