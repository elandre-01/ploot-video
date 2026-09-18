// Assembles index.html from src/ (styles, scene markup, runtime timeline).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { audioHtml } from "./audio.mjs";
import { MOTION, reelProgress } from "./motion-cues.mjs";
import { BEAT_SYNC, mapBeatTime, retimeBeatTimeline } from "./beat-clock.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const read = (p) => readFileSync(join(here, p), "utf8");

const SCENES = [
  { id: "s1", start: 0, dur: 12.0 },
  { id: "s2", start: 12.0, dur: 8.35 },
  { id: "s3", start: 20.35, dur: 6.83 },
  { id: "s4", start: 27.18, dur: 6.78 },
  { id: "s5", start: 33.96, dur: 14.74 },
  { id: "s6", start: 48.70, dur: 8.07 },
  { id: "s7", start: 56.77, dur: 22.10 },
  { id: "s8", start: 78.87, dur: 9.71 },
];
// V10 authored clocks below are remapped once to the selected song's beat anchors.
// Audio clip starts and scene visibility use the same map; recorded audio stays at 1x.
const TOTAL = BEAT_SYNC.duration;

let css = read("styles.css");
let html = "";
let js = read("tl/helpers.js");
let data = { motion: MOTION, beat: BEAT_SYNC };
let calls = "";

for (const s of SCENES) {
  const modPath = join(here, "scenes", `${s.id}.mjs`);
  if (!existsSync(modPath)) continue;
  const mod = await import(`./scenes/${s.id}.mjs`);
  css += "\n/* ---- " + s.id + " ---- */\n" + (mod.css || "");
  const visibleStart = mapBeatTime(s.start, BEAT_SYNC.anchors);
  const visibleEnd = mapBeatTime(s.start + s.dur, BEAT_SYNC.anchors);
  html += `\n<section id="${s.id}" class="clip scene" data-start="${visibleStart.toFixed(6)}" data-duration="${(visibleEnd-visibleStart).toFixed(6)}" data-track-index="1">\n${mod.html}\n</section>\n`;
  if (mod.data) data[s.id] = mod.data;
  const tlPath = join(here, "tl", `${s.id}.js`);
  if (existsSync(tlPath)) {
    js += "\n// ---- " + s.id + " ----\n" + readFileSync(tlPath, "utf8");
    calls += `  ${s.id}(tl, ${s.start});\n`;
  }
}

html += audioHtml(TOTAL, Object.fromEntries(SCENES.map((s) => [s.id, s.start])));   // voice-over, sound design and music (see src/audio.mjs)

const page = `<!doctype html>
<html lang="en" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Ploot — English</title>
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
      ${reelProgress.toString()}
      ${mapBeatTime.toString()}
      ${retimeBeatTimeline.toString()}
${js}
      const buildTimeline = () => {
        // English copy keeps the same single-line title treatment. Size once before motion measurements.
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
        s7Contact(tl);
        window.__timelines["main"] = tl;
        tl.seek(0);
        if (window.__hfForceTimelineRebind) window.__hfForceTimelineRebind();
      };
      // word boxes are measured during the build, so wait for the embedded fonts first
      if (document.fonts && document.fonts.load) {
        Promise.all([document.fonts.load('700 66px "Manrope"'), document.fonts.load('600 14px "IBM Plex Mono"')]).then(buildTimeline, buildTimeline);
      } else buildTimeline();
    </script>
  </body>
</html>
`;
writeFileSync(join(root, "index.html"), page);
console.log("index.html written:", (page.length / 1024).toFixed(1), "KB");
