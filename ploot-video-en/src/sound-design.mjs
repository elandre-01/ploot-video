// Offline, reproducible foley from the existing licensed SFX. No playback-time synthesis.
// Run: node src/sound-design.mjs. The reel positions and tick schedule use one curve.
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { MOTION, reelProgress } from "./motion-cues.mjs";

const dir = fileURLToPath(new URL("../assets/sfx/", import.meta.url));
const rate = 48000;
function ff(args) {
  const p = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { maxBuffer: 16 * 1024 * 1024 });
  if (p.status !== 0) throw new Error(p.stderr.toString());
  return p.stdout;
}
function writeWav(name, channels) {
  const count = channels[0].length, n = channels.length;
  let peak = 0;
  channels.forEach((c) => c.forEach((v) => { peak = Math.max(peak, Math.abs(v)); }));
  const gain = peak ? 0.7 / peak : 1, pcm = Buffer.alloc(count * n * 2), header = Buffer.alloc(44);
  for (let i = 0; i < count; i++) for (let ch = 0; ch < n; ch++) pcm.writeInt16LE(Math.round(channels[ch][i] * gain * 32767), (i * n + ch) * 2);
  header.write("RIFF", 0); header.writeUInt32LE(36 + pcm.length, 4); header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(n, 22);
  header.writeUInt32LE(rate, 24); header.writeUInt32LE(rate * n * 2, 28); header.writeUInt16LE(n * 2, 32);
  header.writeUInt16LE(16, 34); header.write("data", 36); header.writeUInt32LE(pcm.length, 40);
  writeFileSync(dir + name, Buffer.concat([header, pcm]));
}

const clickBytes = ff(["-i", dir + "click.mp3", "-af", "atrim=start=0.028:end=0.062,asetpts=PTS-STARTPTS,highpass=f=350,lowpass=f=4200,afade=t=in:d=0.002,afade=t=out:st=0.016:d=0.018", "-ar", String(rate), "-ac", "1", "-f", "f32le", "pipe:1"]);
const tick = Array.from({ length: clickBytes.length / 4 }, (_, i) => clickBytes.readFloatLE(i * 4));
const slot = MOTION.slot, length = slot.stops.at(-1) - slot.pull + 0.14;
const channels = [new Float32Array(Math.ceil(length * rate)), new Float32Array(Math.ceil(length * rate))];
const crossings = [];
slot.stops.forEach((stop, reel) => {
  const duration = stop - slot.pull, rows = slot.rows[reel], pan = [-0.38, 0, 0.38][reel];
  const gains = [Math.sqrt((1 - pan) / 2), Math.sqrt((1 + pan) / 2)];
  // Every second symbol crossing produces a tooth click, thinning as the reel brakes.
  for (let row = 2; row < rows; row += 2) {
    let lo = 0, hi = duration;
    for (let k = 0; k < 32; k++) {
      const mid = (lo + hi) / 2;
      if (reelProgress(mid, duration, slot.acceleration, slot.brake) < row / rows) lo = mid; else hi = mid;
    }
    const at = (lo + hi) / 2;
    crossings.push({ reel: reel + 1, row, at: +(slot.pull + at).toFixed(6) });
    const offset = Math.round(at * rate);
    tick.forEach((v, k) => { if (offset + k < channels[0].length) gains.forEach((g, c) => channels[c][offset + k] += v * g * 0.46); });
  }
  // Low mechanical body; velocity and pitch fall to zero with the picture.
  let phase = 0;
  for (let i = 0; i < Math.round(duration * rate); i++) {
    const t = i / rate, u = Math.min(1, t / slot.acceleration), b = Math.min(1, (duration - t) / slot.brake);
    const envelope = (u * u * (3 - 2 * u)) * (b * b * (3 - 2 * b));
    phase += 2 * Math.PI * (95 + 90 * envelope + reel * 11) / rate;
    const v = (Math.sin(phase) + 0.18 * Math.sin(phase * 3)) * envelope * 0.022;
    gains.forEach((g, c) => channels[c][i] += v * g);
  }
  // Separate, tight detents at the exact three visual stops; no success/jackpot jingle.
  const start = Math.round(duration * rate);
  for (let i = 0; i < 0.13 * rate && start + i < channels[0].length; i++) {
    const t = i / rate;
    const v = Math.sin(2 * Math.PI * (165 - reel * 20) * t) * Math.exp(-t * 52) * 0.19 + (tick[i] || 0) * 0.8;
    gains.forEach((g, c) => channels[c][start + i] += v * g);
  }
});
writeWav("slot-mechanism.wav", channels);

for (const [name, start, duration, reverse] of [["glitch-rewind.wav", 0.08, 0.42, true], ["glitch-cut.wav", 0.18, 0.24, false]]) {
  const filter = `atrim=start=${start}:duration=${duration},asetpts=PTS-STARTPTS,${reverse ? "areverse," : ""}highpass=f=240,lowpass=f=4800,afade=t=in:d=0.008,afade=t=out:st=${duration - 0.05}:d=0.05`;
  ff(["-i", dir + "glitch-3.mp3", "-af", filter, "-ar", String(rate), "-ac", "2", dir + name]);
}
writeFileSync(new URL("../review/motion-polish/reel-sync.json", import.meta.url), JSON.stringify({ clock: "s2 local seconds", ...slot, crossings }, null, 2));
console.log(`Wrote slot-mechanism.wav (${length.toFixed(3)} s, ${crossings.length} teeth + 3 stops) and two short glitches.`);
