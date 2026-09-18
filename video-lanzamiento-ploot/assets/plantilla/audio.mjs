// Audio de la pieza: voz en off troceada por frases, sound design y música.
//
// Tres reglas que explican todo lo demás:
//  1. Los tiempos son RELATIVOS AL BLOQUE. build.mjs pasa el inicio de cada bloque, así que retimar
//     un bloque arrastra su voz y sus efectos sin tocar esta tabla.
//  2. Un efecto se coloca por su PICO, no por su inicio: el clip empieza en (momento visual − peak),
//     así el golpe cae en el frame exacto. Medir el peak una vez por archivo y guardarlo en LIB.
//  3. La música va en su propio bus y se "carvea" contra la voz (ver references/audio-y-musica.md).
//     El carve lo escribe scripts/carve.mjs de /hyperframes-audio y se persiste en src/carve/<id>.json
//     para que el build lo reinyecte sin volver a analizarlo.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// ---- voz ------------------------------------------------------------------------------------
// { id, block, start (relativo al bloque), mediaStart, mediaEnd, text, [source], [volume] }
// Cada corte debe caer DENTRO de un silencio real de la toma:
//   ffmpeg -i voz.mp3 -af "silencedetect=noise=-38dB:d=0.09" -f null -
const VO_SRC = "assets/vo.mp3";
export const VO = [
  // { id: "vo-01", block: "s1", start: 0, mediaStart: 0.1, mediaEnd: 3.9, text: "..." },
];

// ---- efectos ---------------------------------------------------------------------------------
// peak = dónde está el golpe dentro del archivo (medir con scripts/medir-picos.mjs)
const LIB = {
  whoosh: { dur: 0.575, peak: 0.15 },
  "whoosh-cinematic": { dur: 5.544, peak: 2.175 },
  "impact-bass-1": { dur: 2.116, peak: 0.125 },
  "impact-bass-2": { dur: 2.592, peak: 2.025 },   // swell corto y luego el golpe
  pop: { dur: 0.72, peak: 0.10 },
  click: { dur: 0.35, peak: 0.05 },
  chime: { dur: 2.5, peak: 0.42 },
  notification: { dur: 2.45, peak: 0.10 },
  riser: { dur: 10.032, peak: 10.032 },           // cresta al final: se coloca por su final
  typing: { dur: 1.5, peak: 0.45 },
};
// Los impactos de bajo son los archivos más fuertes de la biblioteca: se atenúan de serie.
const TRIM = { "impact-bass-1": 0.75, "impact-bass-2": 0.8 };

// [archivo, bloque, momento visual dentro del bloque, volumen, nota]
const W = (b, t, v = 0.3, note = "") => ["whoosh", b, t, v, note];
const B = (b, t, v = 0.28, note = "") => ["impact-bass-1", b, t, v, note];
const P = (b, t, v = 0.42, note = "") => ["pop", b, t, v, note];
const C = (b, t, v = 0.5, note = "") => ["click", b, t, v, note];
export const SFX = [
  // W("s1", 0.05, 0.3, "bisagra de entrada"),
  // C("s1", 2.55, 0.5, "clic en el botón"),
];

// ---- música ----------------------------------------------------------------------------------
// Etapas premezcladas (si hay stems, una mezcla por etapa; si no, cortes por compás del tema).
// { id, src, start, duration, volume, note, [toneHz], [lane] }
export const MUSIC = [
  // { id: "mus-chill", src: ".media/audio/bgm/chill.wav", start: 0, duration: 27.22, volume: 0.35, note: "..." },
];

// ---- buses -----------------------------------------------------------------------------------
// La voz manda; los efectos acompañan; la música es cama. Estos números son el punto de partida
// que funcionó en el vídeo de Ploot: ajustar de oído después, no antes.
const VO_CHAIN = { version: 1, nodes: [
  { type: "highpass", id: "v1", label: "Remove Rumble", params: { frequency: 90, q: 0.707, poles: "2" } },
  { type: "gain", id: "v2", label: "Lift", params: { gain: 5 } },
  { type: "compressor", id: "v3", label: "Even Out Loudness", params: { threshold: -20, ratio: 3, attack: 10, release: 180, knee: 4, makeup: 2, mix: 1 } },
  { type: "limiter", id: "v4", label: "Peak Ceiling", params: { limit: -1.5, attack: 5, release: 60, level_out: 0 } },
] };
const SFX_CHAIN = { version: 1, nodes: [
  { type: "lowshelf", id: "s1", label: "Add Weight", params: { frequency: 160, gain: 1.5 } },
  { type: "highshelf", id: "s2", label: "Round the Top", params: { frequency: 6000, gain: -2 } },
  { type: "limiter", id: "s3", label: "Peak Ceiling", params: { limit: -3, attack: 5, release: 80, level_out: 0 } },
  { type: "gain", id: "sfx-delivery", label: "Nivel de efectos", params: { gain: -15.5 } },
] };
const MUSIC_CHAIN = { version: 1, nodes: [
  { type: "limiter", id: "m1", label: "Peak Ceiling", params: { limit: -3, attack: 5, release: 120, level_out: 0 } },
  { type: "gain", id: "music-background", label: "Música · fondo bajo la voz", params: { gain: -4.5 } },
] };

const q = (o) => JSON.stringify(o).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const r3 = (n) => +n.toFixed(3);
const fadeLane = (dur, fi, fo) => {
  const pts = [];
  if (fi > 0) pts.push({ t: 0, v: 0 }, { t: r3(fi), v: 1 }); else pts.push({ t: 0, v: 1 });
  if (fo > 0) pts.push({ t: r3(Math.max(fi, dur - fo)), v: 1 }, { t: r3(dur), v: 0 });
  return { target: "volume", points: pts };
};
// El carve escrito por hyperframes-audio se guarda en src/carve/<id>.json y se reinyecta aquí.
const carveAttrs = (id) => {
  const p = join(here, "carve", id + ".json");
  if (!existsSync(p)) return "";
  const c = JSON.parse(readFileSync(p, "utf8"));
  return Object.entries(c).map(([k, v]) => ` ${k}="${v.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`).join("");
};

export function audioHtml(TOTAL, starts) {
  const NO_MUSIC = !!process.env.NO_MUSIC;   // NO_MUSIC=1 node src/build.mjs → export de referencia
  let out = "\n<!-- ================= AUDIO ================= -->\n";
  out += `<hf-audio-group id="voiceover" data-label="Voz en off" data-volume="1" data-fx-chain="${q(VO_CHAIN)}"></hf-audio-group>\n`;
  out += `<hf-audio-group id="sfx" data-label="Efectos" data-volume="0.9" data-fx-chain="${q(SFX_CHAIN)}"></hf-audio-group>\n`;
  if (!NO_MUSIC) out += `<hf-audio-group id="music" data-label="Música" data-volume="1" data-fx-chain="${q(MUSIC_CHAIN)}"></hf-audio-group>\n`;

  for (const { id, block, start: rel, mediaStart, mediaEnd, text, source = VO_SRC, fadeIn = 0.04, fadeOut = 0.06, volume = 1 } of VO) {
    const start = r3(starts[block] + rel), dur = r3(mediaEnd - mediaStart);
    if (start + dur > TOTAL) throw new Error(`${id} termina después de la composición`);
    const lane = fadeLane(dur, fadeIn, fadeOut);
    lane.points.forEach((p) => { p.v = r3(p.v * volume); });   // la automatización es absoluta
    out += `<!-- ${id} · ${text} -->\n<audio id="${id}" src="${source}" data-start="${start}" data-duration="${dur}" data-media-start="${r3(mediaStart)}" data-track-index="10" data-audio-group="voiceover" data-automation="${q({ version: 1, lanes: [lane] })}"></audio>\n`;
  }

  if (!NO_MUSIC) MUSIC.forEach((m, k) => {
    out += `<!-- ${m.id} · ${m.note || ""} -->\n<audio id="${m.id}" src="${m.src}" data-start="${r3(m.start)}" data-duration="${r3(m.duration)}" data-media-start="${r3(m.sourceOffset || 0)}" data-volume="${m.volume}" data-track-index="${11 + (k % 2)}" data-audio-group="music" data-timeline-role="music"${carveAttrs(m.id) || ` data-automation="${q({ version: 1, lanes: [m.lane || fadeLane(m.duration, 0.12, 0.15)] })}"`}></audio>\n`;
  });

  // Carriles de Studio: dos clips que se solapan nunca comparten carril (lint duplicate_audio_track).
  const laneEnd = [];
  const lane = (start, end) => { let i = laneEnd.findIndex((e) => e + 0.04 <= start); if (i < 0) { i = laneEnd.length; laneEnd.push(0); } laneEnd[i] = end; return 13 + i; };
  const abs = SFX.map(([file, block, t, vol, note], i) => {
    const lib = LIB[file];
    if (!lib) throw new Error("efecto desconocido: " + file);
    return { file, vol, note, i, at: starts[block] + t, lib };
  }).sort((a, b) => (a.at - a.lib.peak) - (b.at - b.lib.peak));

  abs.forEach(({ file, vol, note, i, at, lib }) => {
    let start = r3(at - lib.peak), mediaStart = 0;
    if (start < 0) { mediaStart = -start; start = 0; }
    const dur = r3(Math.min(lib.dur - mediaStart, TOTAL - start));
    if (dur <= 0.05) throw new Error(`el efecto ${file} en ${at} cae fuera de la composición`);
    const id = "sfx-" + String(i + 1).padStart(2, "0");
    const lanes = file === "riser"
      ? { version: 1, lanes: [{ target: "volume", points: [{ t: 0, v: 0.1 }, { t: r3(dur * 0.85), v: 1, curve: 0.3 }, { t: r3(dur), v: 1 }] }] }
      : null;
    out += `<!-- ${id} · ${file} · ${note} -->\n<audio id="${id}" src="assets/sfx/${file}.${lib.ext || "mp3"}" data-start="${start}" data-duration="${dur}"${mediaStart ? ` data-media-start="${r3(mediaStart)}"` : ""} data-volume="${r3(vol * (TRIM[file] || 1))}" data-track-index="${lane(start, start + dur)}" data-audio-group="sfx"${lanes ? ` data-automation="${q(lanes)}"` : ""}></audio>\n`;
  });
  return out;
}
