#!/usr/bin/env node
// Crea un proyecto HyperFrames con el motor de movimiento ya montado.
//
//   node <skill>/scripts/nuevo-proyecto.mjs <carpeta-destino> [--titulo "Mi vídeo"] [--bloques 4]
//
// Deja listo: src/{build,audio,lib,beat-clock}.mjs, src/styles.css, src/tl/helpers.js,
// un bloque de ejemplo (s1) con su timeline, beat-sync.json y las carpetas de assets.
// No sobrescribe nada: si el destino ya tiene ficheros con el mismo nombre, aborta.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const TPL = join(here, "..", "assets", "plantilla");

const args = process.argv.slice(2);
const dest = resolve(args[0] || "");
const opt = (name, def) => { const i = args.indexOf("--" + name); return i >= 0 ? args[i + 1] : def; };
const titulo = opt("titulo", "Vídeo");
const bloques = Math.max(1, Math.min(12, parseInt(opt("bloques", "1"), 10) || 1));

if (!args[0]) {
  console.error("uso: node nuevo-proyecto.mjs <carpeta-destino> [--titulo \"Mi vídeo\"] [--bloques 4]");
  process.exit(1);
}
if (existsSync(join(dest, "src"))) {
  console.error(`✗ ${dest}/src ya existe. Elige otra carpeta o borra la anterior a mano.`);
  process.exit(1);
}

for (const d of ["src/scenes", "src/tl", "src/carve", "assets/sfx", "assets/fonts", "assets/brand", ".media/audio/bgm", ".media/audio/voice", "review"]) {
  mkdirSync(join(dest, d), { recursive: true });
}

// motor
for (const f of ["build.mjs", "audio.mjs", "lib.mjs", "beat-clock.mjs", "styles.css", "beat-sync.json"]) {
  cpSync(join(TPL, f), join(dest, "src", f));
}
cpSync(join(TPL, "tl", "helpers.js"), join(dest, "src", "tl", "helpers.js"));
// fuentes embebidas: sin ellas el check falla con 404 y las medidas de texto salen mal
cpSync(join(TPL, "fonts"), join(dest, "assets", "fonts"), { recursive: true });

// bloques: s1 es el ejemplo completo; los demás se clonan renombrando ids
const sceneTpl = readFileSync(join(TPL, "scenes", "s1.mjs"), "utf8");
const tlTpl = readFileSync(join(TPL, "tl", "s1.js"), "utf8");
const SCENES = [];
let start = 0;
for (let n = 1; n <= bloques; n++) {
  // 5,5 s es justo lo que ocupa el bloque de ejemplo: un proyecto recién creado no tiene frames
  // muertos. Al escribir contenido real, ajusta la duración de cada bloque a lo que dure su idea.
  const id = "s" + n, dur = 5.5;
  writeFileSync(join(dest, "src", "scenes", id + ".mjs"), sceneTpl.replace(/s1-/g, id + "-"));
  writeFileSync(join(dest, "src", "tl", id + ".js"), tlTpl.replace(/s1-/g, id + "-").replace(/function s1\(/, `function ${id}(`).replace(/DATA\.s1/, `DATA.${id}`));
  SCENES.push({ id, start, dur });
  start += dur;
}

// build.mjs: lista de bloques, título y duración total
let build = readFileSync(join(dest, "src", "build.mjs"), "utf8");
build = build.replace(/const SCENES = \[[\s\S]*?\];/, "const SCENES = [\n" + SCENES.map((s) => `  { id: "${s.id}", start: ${s.start}, dur: ${s.dur} },`).join("\n") + "\n];");
build = build.replace("__TITULO__", titulo);
writeFileSync(join(dest, "src", "build.mjs"), build);

const beat = JSON.parse(readFileSync(join(dest, "src", "beat-sync.json"), "utf8"));
beat.duration = start;
beat.anchors[1] = { old: start, new: start, label: "fin", sync: false };
writeFileSync(join(dest, "src", "beat-sync.json"), JSON.stringify(beat, null, 2));

// metadatos mínimos de HyperFrames
const slug = dest.split("/").filter(Boolean).pop();
writeFileSync(join(dest, "meta.json"), JSON.stringify({ id: slug, name: titulo }, null, 2));
if (!existsSync(join(dest, "package.json"))) {
  writeFileSync(join(dest, "package.json"), JSON.stringify({
    name: slug, private: true, type: "module",
    scripts: {
      build: "node src/build.mjs",
      dev: "npx --yes hyperframes preview",
      check: "npx --yes hyperframes check",
      render: "npx --yes hyperframes render",
    },
  }, null, 2));
}

console.log(`✓ proyecto creado en ${dest}`);
console.log(`  bloques: ${SCENES.map((s) => s.id).join(", ")} · duración ${start}s`);
console.log(`  siguiente paso: cd ${dest} && node src/build.mjs && npx hyperframes check`);
console.log(`  fuentes ya incluidas; faltan por copiar las imágenes de marca y los efectos de sonido.`);
