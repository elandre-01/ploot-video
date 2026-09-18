import { readFileSync } from 'node:fs';

// Measured 110 BPM source; frozen anchors keep the voice, actions and SFX reviewable.
export const BEAT_SYNC = JSON.parse(readFileSync(new URL('./beat-sync.json', import.meta.url), 'utf8'));

export function mapBeatTime(time, anchors) {
  if (time <= anchors[0].old) return time + anchors[0].new - anchors[0].old;
  for (let i = 1; i < anchors.length; i++) {
    const a = anchors[i - 1], b = anchors[i];
    if (time <= b.old) return a.new + (time - a.old) * (b.new - a.new) / (b.old - a.old);
  }
  const last = anchors[anchors.length - 1];
  return time + last.new - last.old;
}

// Apply once, at build time, to the flat paused timeline. Shared boundaries stay
// shared: camera, cursor, outgoing panel and incoming panel move as one gesture.
export function retimeBeatTimeline(timeline, config) {
  const records = timeline.getChildren(false, true, false).map(tween => ({
    tween, start: tween.startTime(), end: tween.startTime() + tween.totalDuration(),
    repeat: tween.repeat(), repeatDelay: tween.repeatDelay(), duration: tween.duration(),
  }));
  for (const r of records) {
    const start = mapBeatTime(r.start, config.anchors);
    const end = mapBeatTime(r.end, config.anchors);
    if (r.duration > 0) r.tween.duration((end - start - r.repeat * r.repeatDelay) / (r.repeat + 1));
    r.tween.startTime(start);
    const id = r.tween.targets()[0]?.id || '';
    if (/^s7-meet-\d+$/.test(id) && r.duration > 0) {
      // Three bookings per eighth-note: four clear groups, then a readable hold.
      const n = Number(id.slice('s7-meet-'.length));
      r.tween.startTime(config.calendar.start + Math.floor(n / config.calendar.groupSize) * config.calendar.groupInterval);
      r.tween.duration(.4);
    }
  }
  for (const a of config.anchors) if (a.sync) timeline.addLabel('beat:' + a.label, a.new);
  timeline.seek(0, true);
}
