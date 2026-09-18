// English V6: selected Groove Theory (2), soft interface accents, supplied brand closure.
// Source scene times are V10; beat-clock.mjs maps visual actions and clip starts together.
// Audio source playback stays at 1x, with the narrator and effects in front of the bed.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DETAIL_SFX } from "./sound-detail.mjs";
import { referenceCue, compactReferenceCues } from "./reference-sound.mjs";
import { BEAT_SYNC, mapBeatTime } from "./beat-clock.mjs";

const here = dirname(fileURLToPath(import.meta.url));
// Source ranges were measured on Luke’s take; starts use the final V12 clock.
const VOICE = JSON.parse(readFileSync(join(here, "voice-luke.json"), "utf8"));
const MUSIC_EDIT = JSON.parse(readFileSync(join(here, "groove-music-v7.json"), "utf8"));
const VO_SRC = VOICE.source;
export const VO = VOICE.clips;

// Bundled library (Pixabay licence, assets/sfx/CREDITS.md). `peak` is where the hit sits inside the file, measured on the
// RMS envelope, so a clip starts at (visual moment − peak) and the sound lands on the frame.
const LIB = {
  whoosh: { dur: 0.575, peak: 0.15 },
  "whoosh-cinematic": { dur: 5.544, peak: 2.175 },   // where the body comes in: the rumble starts with the move
  "impact-bass-1": { dur: 2.116, peak: 0.125 },
  "impact-bass-2": { dur: 2.592, peak: 2.025 },       // short swell, then the hit
  pop: { dur: 0.72, peak: 0.10 },
  click: { dur: 0.35, peak: 0.05 },
  chime: { dur: 2.5, peak: 0.42 },
  notification: { dur: 2.45, peak: 0.10 },
  error: { dur: 1.6, peak: 0.62 },
  "glitch-3": { dur: 3.075, peak: 0.225 },
  sparkle: { dur: 1.8, peak: 0.025 },
  riser: { dur: 10.032, peak: 10.032 },
  typing: { dur: 1.5, peak: 0.45 },
  ...JSON.parse(readFileSync(join(here, "sound-palette.json"), "utf8")),
  ...JSON.parse(readFileSync(join(here, "reference-palette.json"), "utf8")),
  ...JSON.parse(readFileSync(join(here, "soft-palette-v6.json"), "utf8")),
  ...JSON.parse(readFileSync(join(here, "foley-palette-v7.json"), "utf8")),
  ...JSON.parse(readFileSync(join(here, "warm-palette-v8.json"), "utf8")),
  ...JSON.parse(readFileSync(join(here, "audio-palette-v9.json"), "utf8")),
  ...JSON.parse(readFileSync(join(here, "audio-palette-v11.json"), "utf8")),
  "slot-mechanism": { dur: 1.576667, peak: 0, ext: "wav" },
  "glitch-cut": { dur: 0.24, peak: 0.03, ext: "wav" },
};
// the two bass impacts are by far the loudest files of the library (−6.5 / −4.5 LUFS): trimmed so they sit with the music
const TRIM = { "impact-bass-1": 0.75, "impact-bass-2": 0.8 };

// [file, block, visual moment in the block, volume, note]
const W = (b, t, v = 0.3, note = "") => ["whoosh", b, t, v, note];
const B = (b, t, v = 0.28, note = "") => ["impact-bass-1", b, t, v, note];
const P = (b, t, v = 0.42, note = "") => ["pop", b, t, v, note];
const C = (b, t, v = 0.5, note = "") => ["click", b, t, v, note];
const SFX_BASE = [
  // ---- 01 hook (T = 0)
  W("s1", 0.05, 0.3, "luces «Ahora mismo»"), W("s1", 1.15, 0.28, "sube la web"), W("s1", 4.10, 0.32, "bisagra «Justo lo que tú vendes»"),
  ["whoosh-cinematic", "s1", 4.45, 0.3, "las cards llenan el plano"], W("s1", 4.5, 0.16, "card"), W("s1", 4.75, 0.16, "card"), W("s1", 5.0, 0.16, "card"),
  W("s1", 5.15, 0.2, "zoom a Marta"), W("s1", 6.25, 0.2, "órbita a Daniel"), W("s1", 7.45, 0.28, "tres webs"),
  ["sparkle", "s1", 8.9, 0.28, "monedas"], P("s1", 8.87, 0.32, "moneda"), P("s1", 9.0, 0.28, "moneda"), P("s1", 9.12, 0.28, "moneda"),
  B("s1", 9.35, 0.28, "«Estás perdiendo mucho dinero»"), B("s1", 10.70, 0.3, "corte a naranja «Sin enterarte» · entra la música"), W("s1", 11.58, 0.32, "bisagra → bloque 02"),
  // ---- 02 el dolor (T = 12.0)
  P("s2", 0.55, 0.42, "chat"), ["glitch-3", "s2", 1.35, 0.28, "rebobinar"], W("s2", 1.7, 0.2, "cae el chat"), W("s2", 2.0, 0.3, "sube la ventana"),
  C("s2", 2.55, 0.5, "clic chat"), W("s2", 2.65, 0.22, "se abre el chat"), C("s2", 3.33, 0.5, "clic enviar"), P("s2", 3.58, 0.32, "enviado"),
  W("s2", 3.53, 0.24, "el chat sube"), B("s2", 3.73, 0.2, "«Que nadie abre»"), W("s2", 5.55, 0.22, "cae el chat"),
  W("s2", 5.85, 0.3, "sube la tragaperras"), C("s2", 6.4, 0.5, "tirar"), P("s2", 7.42, 0.4, "rodillo 1"), P("s2", 7.63, 0.4, "rodillo 2"), P("s2", 7.84, 0.4, "rodillo 3"),
  ["chime", "s2", 7.84, 0.26, "«referido»"], W("s2", 8.12, 0.3, "sube la máquina hacia naranja"),
  // ---- 03 la falsa solución (T = 20.35)
  W("s3", 0.64, 0.32, "bisagra «¿Y qué hacemos?»"), W("s3", 1.0, 0.18, "cards"), W("s3", 1.45, 0.18, "cards"), W("s3", 1.9, 0.18, "cards"),
  P("s3", 2.3, 0.28, "chip"), P("s3", 2.42, 0.28, "chip"), W("s3", 3.1, 0.3, "las cards salen por arriba"), W("s3", 3.35, 0.24, "aterriza el calendario"),
  ["error", "s3", 3.95, 0.26, "agenda vacía"], B("s3", 4.0, 0.2, "«Cero reuniones»"),
  // ---- 04 el insight (T = 27.18)
  B("s4", 0, 0.28, "corte a blanco «Nadie compra…»"), W("s4", 0.12, 0.3, "sube la bandeja"), ["notification", "s4", .82, 0.3, "leído"], P("s4", 1.028, 0.28, "leído"), P("s4", 1.237, 0.28, "leído"),
  W("s4", 2.35, 0.3, "naranja"), W("s4", 3.65, 0.32, "bisagra → la línea"), P("s4", 4.65, 0.34, "check conoce"), P("s4", 5.175, 0.34, "check sigue"), P("s4", 5.65, 0.34, "check oportunidad"), P("s4", 6.125, 0.34, "check confía"),
  B("s4", 6.60, 0.28, "COMPRA · transición a negro"),
  // ---- 05 las señales (T = 33.96)
  W("s5", 1.49, 0.32, "bisagra → panel"), P("s5", 2.0, 0.24, "señal"), P("s5", 2.33, 0.24, "señal"), P("s5", 2.66, 0.24, "señal"),
  ["whoosh-cinematic", "s5", 3.45, 0.3, "paneo hacia abajo"], C("s5", 5.05, 0.5, "clic LinkedIn"), W("s5", 5.3, 0.22, "sube el perfil"),
  C("s5", 6.8, 0.5, "clic seguir"), ["chime", "s5", 6.9, 0.32, "Siguiendo"], B("s5", 6.85, 0.2, "zoom al botón naranja"), W("s5", 8.1, 0.32, "sube el plano · tres webs"),
  B("s5", 10.0, 0.28, "naranja «Son señales de compra»"), W("s5", 13.2, 0.3, "pull-back"), B("s5", 13.2, 0.25, "«Y nadie las ve»"), W("s5", 14.56, 0.3, "el fondo se transforma a negro"),
  // ---- 06 reveal (T = 49.52 · burst at 1.18 = 50.70, the music changes here)
  ["riser", "s6", 1.18, 0.22, "tensión hacia el reveal"], P("s6", 0, 0.42, "punto de luz"), W("s6", 0.4, 0.25, "el trazo"),
  ["impact-bass-2", "s6", 1.18, 0.38, "Ploot"], ["sparkle", "s6", 1.18, 0.34, "Ploot"], ["chime", "s6", 1.4, 0.2, "el nombre"],
  W("s6", 2.5, 0.32, "sale el logo"), W("s6", 4.2, 0.32, "bisagra → equipo"), P("s6", 4.5, 0.28, "avatar"), P("s6", 4.67, 0.28, "avatar"), P("s6", 4.83, 0.28, "avatar"),
  W("s6", 7.17, 0.18, "líneas"), W("s6", 7.3, 0.18, "líneas"), W("s6", 7.72, 0.25, "se aleja el mapa"),
  // ---- 07 pasos (T = 57.59)
  B("s7", 0, 0.25, "«Uno»"), W("s7", 0.5, 0.32, "bisagra"), W("s7", 0.8, 0.22, "sube el panel"), C("s7", 1.9, 0.5, "clic chat"), W("s7", 2.15, 0.3, "panel a través de la lente"),
  W("s7", 2.45, 0.22, "sube el perfil"), ["chime", "s7", 3.6, 0.38, "Top Voice"],
  B("s7", 4.44, 0.25, "«Dos»"), W("s7", 4.94, 0.32, "bisagra"), W("s7", 5.24, 0.22, "sube la lista"), P("s7", 5.34, 0.24, "fila"), P("s7", 5.54, 0.24, "fila"), P("s7", 5.74, 0.24, "fila"),
  W("s7", 6.34, 0.26, "reorden"), W("s7", 6.45, 0.22, "reorden"), W("s7", 6.56, 0.22, "reorden"), C("s7", 6.89, 0.4, "la caliente al frente"),
  W("s7", 7.14, 0.26, "caen las frías"), W("s7", 7.24, 0.22, "caen las frías"), P("s7", 7.59, 0.34, "momento ideal"), P("s7", 7.71, 0.34, "momento ideal"), P("s7", 7.84, 0.34, "momento ideal"),
  B("s7", 8.37, 0.25, "«Tres»"), W("s7", 8.82, 0.32, "bisagra"), W("s7", 9.12, 0.22, "suben los canales"), ["typing", "s7", 9.42, 0.45, "escriben los dos canales"],
  C("s7", 11.02, 0.5, "enviar"), P("s7", 11.14, 0.32, "enviado"), ["notification", "s7", 11.24, 0.34, "responde Marta"],
  W("s7", 11.84, 0.22, "bajan los canales"), W("s7", 12.12, 0.3, "sube la semana"), P("s7", 12.42, 0.34, "reunión"), P("s7", 12.65, 0.3, "reunión"), P("s7", 12.88, 0.3, "reunión"), ["chime", "s7", 12.62, 0.28, "agenda llena"],
  W("s7", 13.49, 0.22, "sale la semana hacia el cierre"),
  // ---- 08 cierre (T = 80.74)
  W("s8", 1.67, 0.32, "bisagra → web"), W("s8", 1.97, 0.22, "sube la web"), P("s8", 2.52, 0.34, "visitante"), P("s8", 2.645, 0.34, "visitante"), P("s8", 2.77, 0.34, "visitante"),
  C("s8", 3.45, 0.5, "clic visitante"), W("s8", 3.47, 0.25, "entra el perfil"), C("s8", 4.92, 0.5, "clic Contactar"), W("s8", 5.05, 0.3, "la card sube"), W("s8", 5.27, 0.25, "se dibuja el trazo"),
  P("s8", 5.9, 0.42, "botón"), ["sparkle", "s8", 5.9, 0.26, "botón"], C("s8", 6.89, 0.5, "clic Agenda una demo"), P("s8", 6.89, 0.3, "onda"),
  ["impact-bass-2", "s8", 7.38, 0.38, "naranja + logo"], ["sparkle", "s8", 7.38, 0.32, "logo"], ["whoosh-cinematic", "s8", 7.36, 0.3, "cola final"],
  ...DETAIL_SFX,
];

// Retiming follows the revised visible actions, including the full-calendar hold.
const STEP_TIMES = [[0,0],[.5,.6],[.8,.95],[1.9,2.5],[2.15,2.78],[2.45,3.1],[3.6,4.6],[4.44,5.8],[4.94,6.42],[5.24,6.8],[6.34,8.2],[7.14,9.35],[7.24,9.45],[8.37,10.8],[9.12,11.75],[9.42,12.4],[11.02,15.4],[11.24,15.95],[11.84,16.95],[12.12,17.25],[12.42,17.85],[12.62,18.85],[12.88,19.1],[13.49,21.7]];
const mapMoment = (time, pairs) => {
  if (time <= pairs[0][0]) return time + pairs[0][1] - pairs[0][0];
  for (let i=1;i<pairs.length;i++) if(time<=pairs[i][0]) {
    const [a,b]=pairs[i-1], [c,d]=pairs[i]; return b+(time-a)/(c-a)*(d-b);
  }
  const [a,b]=pairs.at(-1); return time-a+b;
};
export const SFX = SFX_BASE.map(([file,block,time,volume,note])=>{
  if(block==='s7') { const sourceTime=time; time=mapMoment(time,STEP_TIMES); if(/caen las frías/.test(note))time=sourceTime===7.14?8.45:8.57; }
  if(block==='s2') {
    if(time>=2 && time<=2.65) time+=.35;
    else if(time>=3.18 && time<=3.75) time+=.15;
    else if(time===1.35) time=1.2;
    else if(time===1.7) time=2.03;
    else if(time===5.55) time=5.2;
    else if(time===5.85) time=5.5;
  }
  return referenceCue([file,block,time,volume,block==='s7' ? note.replace('los dos canales','el mensaje').replace('los canales','la conversación').replace('Marta','Noemí') : note]);
}).filter(Boolean);

// Five native Groove Theory cuts preserve the introduction, development and resolution.
// Each source is an unprocessed lossless cut; fades and voice carve run in HyperFrames.
export function music(starts, TOTAL) {
  if (Math.abs(MUSIC_EDIT.duration-TOTAL)>.002) throw new Error("Music edit timing is stale");
  return MUSIC_EDIT.segments.map(c=>[c.id,c.src,c.start,0,c.duration,c.volume,0,0,c.note]);
}
function musicVolumeLane(id) {
  const clip=MUSIC_EDIT.segments.find(c=>c.id===id);
  if(!clip) throw new Error("Unknown music segment "+id);
  return clip.lane;
}

const q = (o) => JSON.stringify(o).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const r3 = (n) => +n.toFixed(3);
const fadeLane = (dur, fi, fo) => { const pts = []; if (fi > 0) pts.push({ t: 0, v: 0 }, { t: r3(fi), v: 1 }); else pts.push({ t: 0, v: 1 }); if (fo > 0) pts.push({ t: r3(Math.max(fi, dur - fo)), v: 1 }, { t: r3(dur), v: 0 }); return { target: "volume", points: pts }; };
// a carve written by scripts/carve.mjs (hyperframes-audio) is persisted in src/carve/<id>.json and re-injected at build
const carveAttrs = (id) => { const p = join(here, "carve", id + ".json"); if (!existsSync(p)) return ""; const c = JSON.parse(readFileSync(p, "utf8")); const segment=MUSIC_EDIT.segments.find(s=>s.id===id); if(segment?.toneHz){const fx=JSON.parse(c["data-fx-chain"]);fx.nodes=fx.nodes.filter(n=>!["stage-tone","stage-intensity"].includes(n.id));fx.nodes.push({id:"stage-tone",type:"lowpass",label:"Musical stage openness",params:{frequency:segment.toneHz,q:.707,poles:"2"}});if(segment.stageGainDb)fx.nodes.push({id:"stage-intensity",type:"gain",label:"Ploot musical lift",params:{gain:segment.stageGainDb}});c["data-fx-chain"]=JSON.stringify(fx);} return Object.entries(c).map(([k, v]) => ` ${k}="${v.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`).join(""); };

// Bus chains. Voice: rumble cut → lift → compressor → limiter. SFX retains the V6 chain
// and delivery headroom; extra first-half detail uses restrained per-clip gains.
// The earlier dense effects dictated the -7 dB common output trim. With the
// redesigned SFX balance, -1 dB restores voice/music presence while preserving
// their carve relationship. This is a common output move, after all bus FX.
const OUTPUT_TRIM = { type: "gain", id: "output-trim", label: "Output Headroom", params: { gain: -1 } };
const VO_CHAIN = { version: 1, nodes: [
  { type: "highpass", id: "v1", label: "Remove Rumble", params: { frequency: 90, q: 0.707, poles: "2" } },
  { type: "gain", id: "v2", label: "Lift", params: { gain: 5 } },
  { type: "compressor", id: "v3", label: "Even Out Loudness", params: { threshold: -20, ratio: 3, attack: 10, release: 180, knee: 4, makeup: 2, mix: 1 } },
  { type: "limiter", id: "v4", label: "Peak Ceiling", params: { limit: -1.5, attack: 5, release: 60, level_out: 0 } },
  OUTPUT_TRIM,
  { type: "gain", id: "voice-match", label: "Luke C · match approved voice level", params: { gain: -2.2 } },
] };
const SFX_CHAIN = { version: 1, nodes: [
  { type: "lowshelf", id: "s1", label: "Add Weight", params: { frequency: 160, gain: 1.5 } },
  { type: "highshelf", id: "s2", label: "Round the Top", params: { frequency: 6000, gain: -2 } },
  { type: "limiter", id: "s3", label: "Peak Ceiling", params: { limit: -3, attack: 5, release: 80, level_out: 0 } },
  { type: "gain", id: "sfx-delivery", label: "Efectos · −8 dB sobre V9 (18-09-2026)", params: { gain: -15.5 } },
] };
const MUSIC_CHAIN = { version: 1, nodes: [
  { type: "limiter", id: "m1", label: "Peak Ceiling", params: { limit: -3, attack: 5, release: 120, level_out: 0 } },
  OUTPUT_TRIM,
  { type: "gain", id: "music-background", label: "Groove Theory (2) · fondo bajo la voz", params: { gain: -6.5 } },
] };

export function audioHtml(TOTAL, starts) {
  let out = "\n<!-- ================= AUDIO ================= -->\n";
  out += `<hf-audio-group id="voiceover" data-label="Voz en off" data-volume="0.794328" data-fx-chain="${q(VO_CHAIN)}"></hf-audio-group>\n`;
  out += `<hf-audio-group id="sfx" data-label="Efectos · contactos y movimientos suaves" data-volume="0.9" data-fx-chain="${q(SFX_CHAIN)}"></hf-audio-group>\n`;
  const NO_MUSIC = !!process.env.PLOOT_NO_MUSIC;   // PLOOT_NO_MUSIC=1 node src/build.mjs → voz y efectos sin música (exportaciones de referencia)
  if (!NO_MUSIC) out += `<hf-audio-group id="music" data-label="Música · Groove Theory (2) · fondo" data-volume="0.707946" data-fx-chain="${q(MUSIC_CHAIN)}"></hf-audio-group>\n`;
  for (const {id, start: at, mediaStart: mIn, mediaEnd: mOut, text, source = VO_SRC, fadeIn = 0.04, fadeOut = 0.06} of VO) {
    const start = r3(at), dur = r3(mOut - mIn);
    if (start + dur > TOTAL) throw new Error(`${id} ends after the composition`);
    out += `<!-- ${id} · ${text} -->\n<audio id="${id}" src="${source}" data-start="${start}" data-duration="${dur}" data-media-start="${r3(mIn)}" data-track-index="10" data-audio-group="voiceover" data-automation="${q({ version: 1, lanes: [fadeLane(dur, fadeIn, fadeOut)] })}"></audio>\n`;
  }
  if (!NO_MUSIC) music(starts, TOTAL).forEach(([id, src, start, media, dur, vol, fi, fo, note], k) => {
    out += `<!-- ${id} · ${note} -->\n<audio id="${id}" src="${src}" data-start="${r3(start)}" data-duration="${r3(dur)}" data-media-start="${r3(media)}" data-volume="${vol}" data-track-index="${11 + (k % 2)}" data-audio-group="music" data-timeline-role="music"${carveAttrs(id) || ` data-automation="${q({ version: 1, lanes: [musicVolumeLane(id)] })}"`}></audio>\n`;
  });
  // Studio lanes for the effects: overlapping clips never share a lane (lint duplicate_audio_track)
  const laneEnd = [];
  const lane = (start, end) => { let i = laneEnd.findIndex((e) => e + 0.04 <= start); if (i < 0) { i = laneEnd.length; laneEnd.push(0); } laneEnd[i] = end; return 13 + i; };
  let meetingHit = 0;
  const abs = compactReferenceCues(SFX.map((e, i) => {
    // Step 2 sound follows the current authored actions, not the obsolete sort clock.
    if(e[1]==='s7' && e[2]>=6.8 && e[2]<10.8) return null;
    const lib = LIB[e[0]];
    if (!lib) throw new Error("unknown sfx " + e[0]);
    let at = mapBeatTime(starts[e[1]] + e[2], BEAT_SYNC.anchors);
    if(e[0]==='tape-rewind-short') at=mapBeatTime(starts.s2+.95,BEAT_SYNC.anchors)+lib.peak;
    if (e[1] === 's7' && e[4] === 'reunión') at = BEAT_SYNC.calendar.start + meetingHit++ * BEAT_SYNC.calendar.groupInterval;
    return { e, i, at, lib };
  }).filter(Boolean));
  const step=t=>mapBeatTime(starts.s7+t,BEAT_SYNC.anchors);
  const extra=[
    ["calendar-air-long",27.251721+LIB["calendar-air-long"].peak,.011,"previous V10 air retreat restored at background level"],
    ["warm-swish",step(6.8)+LIB["warm-swish"].peak,.50,"step 2 list starts moving into frame"],
    ["panel-seat",step(7.48),.32,"step 2 list landing; one group contact"],
    ["card-sort",step(8.2)+LIB["card-sort"].peak,.50,"step 2 selected cards begin their continuous travel"],
    ["warm-away",step(8.25)+LIB["warm-away"].peak,.46,"step 2 discarded rows begin retreat together"],
    ["signal-tick",step(9.6)+.08,.43,"step 2 orange borders and contact badges confirm together"],
    ["motion-pull",step(10.36)+LIB["motion-pull"].peak,.24,"step 2 group exit begins"],
  ];
  extra.forEach(([file,at,volume,note],k)=>abs.push({e:[file,"final",0,volume,note],i:900+k,at,lib:LIB[file]}));
  abs.sort((a,b)=>(a.at-a.lib.peak)-(b.at-b.lib.peak));
  abs.forEach(({ e: [file, , , vol, note], i, at, lib }) => {
    let start = r3(at - lib.peak), mediaStart = 0;
    if (start < 0) { mediaStart = -start; start = 0; }
    const dur = r3(Math.min(lib.dur - mediaStart, TOTAL - start));
    if (dur <= 0.05) throw new Error(`sfx ${file} at ${at} falls outside the composition`);
    const id = "sfx-" + String(i + 1).padStart(2, "0");
    const lanes = lib.fadeIn !== undefined ? { version: 1, lanes: [fadeLane(dur, lib.fadeIn, lib.fadeOut)] } : file === "riser" ? { version: 1, lanes: [{ target: "volume", points: [{ t: 0, v: 0.1 }, { t: r3(dur * 0.85), v: 1, curve: 0.3 }, { t: r3(dur), v: 1 }] }] } : null;
    // Volume automation is absolute in HyperFrames; these two background cues
    // must carry the requested level in every fade point, not only data-volume.
    if (lanes && ["tape-rewind-short", "calendar-air-long"].includes(file)) {
      for (const point of lanes.lanes[0].points) point.v *= vol * (TRIM[file] || 1);
    }
    out += `<!-- ${id} · ${file} · ${note} -->\n<audio id="${id}" src="assets/sfx/${file}.${lib.ext || "mp3"}" data-start="${start}" data-duration="${dur}"${mediaStart ? ` data-media-start="${r3(mediaStart)}"` : ""} data-volume="${r3(vol * (TRIM[file] || 1))}" data-track-index="${lane(start, start + dur)}" data-audio-group="sfx"${file==="calendar-air-long" ? ` data-fx-chain="${q({version:1,nodes:[{id:"air-level",type:"gain",params:{gain:18}},{id:"air-soft",type:"lowpass",params:{frequency:4200,q:.707,poles:"2"}}]})}"` : file==="tape-rewind-short" ? ` data-fx-chain="${q({version:1,nodes:[{id:"tape-rumble",type:"highpass",params:{frequency:100,q:.707,poles:"2"}},{id:"tape-harsh",type:"peaking",label:"Soften Harshness",params:{frequency:1350,gain:-3,q:1.4}},{id:"tape-edge",type:"lowpass",params:{frequency:2400,q:.707,poles:"4"}}]})}"` : ""}${file.startsWith("warm-") ? ` data-fx-chain="${q({version:1,nodes:[{id:"warm-edge",type:"lowpass",label:"Warm replacement only",params:{frequency:2500,q:.707,poles:"4"}}]})}"` : ""}${lanes ? ` data-automation="${q(lanes)}"` : ""}></audio>\n`;
  });
  return out;
}
