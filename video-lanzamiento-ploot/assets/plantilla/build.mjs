// Ensambla index.html a partir de src/. NO edites index.html a mano: se regenera.
//
// Cada bloque narrativo vive en dos ficheros:
//   src/scenes/sN.mjs  → export const html, css, data   (markup estático, medido en el build)
//   src/tl/sN.js       → function sN(tl, T) { ... }     (timeline GSAP, tiempos absolutos desde T)
//
// El build concatena los helpers + todos los tl/*.js dentro de una sola etiqueta <script>, así que
// las funciones se ven entre sí sin imports. Una única timeline pausada se registra en
// window.__timelines["main"]; el runtime de HyperFrames la busca ahí para hacer seek.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { audioHtml } from "./audio.mjs";
import { BEAT_SYNC, mapBeatTime, retimeBeatTimeline } from "./beat-clock.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const read = (p) => readFileSync(join(here, p), "utf8");

// Relojes de autoría: se escriben cómodos (segundos redondos por bloque) y el beat-clock los
// remapea una sola vez a los anclajes musicales/de voz. Cambiar aquí mueve el bloque entero.
const SCENES = [
  { id: "s1", start: 0, dur: 12.0 },
];
const TOTAL = BEAT_SYNC ? BEAT_SYNC.duration : SCENES.reduce((a, s) => Math.max(a, s.start + s.dur), 0);

let css = read("styles.css");
let html = "";
let js = read("tl/helpers.js");
let data = BEAT_SYNC ? { beat: BEAT_SYNC } : {};
let calls = "";

for (const s of SCENES) {
  const modPath = join(here, "scenes", `${s.id}.mjs`);
  if (!existsSync(modPath)) continue;
  const mod = await import(`./scenes/${s.id}.mjs`);
  css += "\n/* ---- " + s.id + " ---- */\n" + (mod.css || "");
  // La visibilidad de la escena pasa por el mismo remapeo que su timeline, para que el corte
  // caiga exactamente donde cae el movimiento.
  const a = mapBeatTime(s.start, BEAT_SYNC.anchors);
  const b = mapBeatTime(s.start + s.dur, BEAT_SYNC.anchors);
  html += `\n<section id="${s.id}" class="clip scene" data-start="${a.toFixed(6)}" data-duration="${(b - a).toFixed(6)}" data-track-index="1">\n${mod.html}\n</section>\n`;
  if (mod.data) data[s.id] = mod.data;
  const tlPath = join(here, "tl", `${s.id}.js`);
  if (existsSync(tlPath)) {
    js += "\n// ---- " + s.id + " ----\n" + readFileSync(tlPath, "utf8");
    calls += `  ${s.id}(tl, ${s.start});\n`;
  }
}

html += audioHtml(TOTAL, Object.fromEntries(SCENES.map((s) => [s.id, s.start])));

const page = `<!doctype html>
<html lang="es" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>__TITULO__</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080" data-fps="60">
${html}
    </div>
    <script>
      gsap.registerPlugin(MotionPathPlugin);
      gsap.config({ force3D: false });
      const DATA = ${JSON.stringify(data)};
      ${mapBeatTime.toString()}
      ${retimeBeatTimeline.toString()}
${js}
      const buildTimeline = () => {
        // Una línea de texto nunca debe partirse: si un titular no cabe, se reduce su cuerpo
        // ANTES de medir cajas de palabras (wordsPush mide offsetLeft en el build).
        document.querySelectorAll('.kin').forEach(el => {
          const line = el.querySelector('.line');
          if (!line) return;
          const size = parseFloat(getComputedStyle(el).fontSize);
          const width = line.scrollWidth;
          if (width > 1720) el.style.fontSize = Math.floor(size * 1720 / width) + 'px';
        });
        const tl = gsap.timeline({ paused: true });
${calls}
        retimeBeatTimeline(tl, DATA.beat);
        window.__timelines = window.__timelines || {};
        window.__timelines["main"] = tl;
        tl.seek(0);
        if (window.__hfForceTimelineRebind) window.__hfForceTimelineRebind();
      };
      // Las cajas de palabras se miden en el build: hay que esperar a las fuentes embebidas.
      if (document.fonts && document.fonts.load) {
        Promise.all([document.fonts.load('700 66px "Manrope"'), document.fonts.load('600 14px "IBM Plex Mono"')]).then(buildTimeline, buildTimeline);
      } else buildTimeline();
    </script>
  </body>
</html>
`;
writeFileSync(join(root, "index.html"), page);
console.log("index.html written:", (page.length / 1024).toFixed(1), "KB");
