#!/usr/bin/env node
// Mide dónde está el golpe dentro de cada archivo de audio, que es lo que permite que un efecto
// caiga en el frame exacto: el clip empieza en (momento visual − peak).
//
//   node <skill>/scripts/medir-picos.mjs assets/sfx/*.mpg .media/audio/bgm/*.wav
//
// Imprime una línea por archivo lista para pegar en el objeto LIB de src/audio.mjs, y además
// el onset (primer sonido audible) y la duración, útiles para recortar.
// Requiere ffmpeg en el PATH.
import { execFileSync } from "node:child_process";
import { basename, extname } from "node:path";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("uso: node medir-picos.mjs <archivos de audio...>");
  process.exit(1);
}

const SR = 8000, H = 40;   // 5 ms por ventana: suficiente para un transitorio

for (const f of files) {
  let pcm;
  try {
    pcm = execFileSync("ffmpeg", ["-v", "error", "-i", f, "-ac", "1", "-ar", String(SR), "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  } catch {
    console.error(`✗ no se pudo leer ${f}`);
    continue;
  }
  const n = pcm.length / 2, frames = Math.floor(n / H);
  const e = new Float32Array(frames);
  for (let k = 0; k < frames; k++) {
    let s = 0;
    for (let j = 0; j < H; j++) { const v = pcm.readInt16LE((k * H + j) * 2) / 32768; s += v * v; }
    e[k] = Math.sqrt(s / H);
  }
  // El "golpe" es el máximo de la envolvente de ATAQUE (subida), no el máximo de energía:
  // en un impacto con cola larga el máximo de energía llega tarde y el sonido sonaría desplazado.
  const on = new Float32Array(frames);
  for (let k = 2; k < frames; k++) on[k] = Math.max(0, e[k] - Math.max(e[k - 1], e[k - 2]));
  let peak = 0, pv = 0, onset = 0;
  for (let k = 0; k < frames; k++) if (on[k] > pv) { pv = on[k]; peak = k; }
  const emax = Math.max(...e);
  for (let k = 0; k < frames; k++) if (e[k] > emax * 0.08) { onset = k; break; }
  const t = (k) => +(k * H / SR).toFixed(3);
  const name = basename(f, extname(f));
  console.log(`  "${name}": { dur: ${(frames * H / SR).toFixed(3)}, peak: ${t(peak)} },   // onset ${t(onset)}${extname(f) !== ".mp3" ? `, ext: "${extname(f).slice(1)}"` : ""}`);
}
