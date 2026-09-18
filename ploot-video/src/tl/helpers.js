// ---- runtime helpers (browser) ----
// Motion language (see MOTION.md): tilted kinetic lines that never stop growing, UI planes that rise
// from below in perspective and keep drifting, fast accelerating exits with blur that overlap the next
// entrance, burst rings on clicks. Entrances decelerate (expo/power4.out), exits accelerate (power3.in).
const F = 1 / 24;                 // storyboard frame (AE @24fps) → seconds
const fr = (n) => n * F;
const $ = (s) => document.querySelector(s);
const $$ = (s) => gsap.utils.toArray(s);

// ---------- text ----------
// tilted kinetic line (reference): the line starts slightly rotated and small, straightens and grows
// while its words rise in one by one, then keeps growing very slowly until `hold` runs out
function tiltWords(tl, sel, t, o = {}) {
  const { gap: requestedGap = fr(4), dur = 0.46, y = 22, tilt = -1.2, from = 0.985, settle = 0.8, grow = 1.01, hold = 1.6 } = o;
  const gap = Math.min(requestedGap, 0.09); // assemble phrases sooner; VO and scene clocks stay fixed
  const line = sel + " .line";
  // Entry/creep and exit have different owners. A short title may start leaving
  // before its entrance settles; these transforms now compose instead of fighting.
  const pose = $(sel + " .text-pose") || $(line);
  tl.set(line, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, filter: "none" }, t);
  tl.fromTo(pose, { rotation: tilt, scale: from, transformOrigin: "50% 50%" },
    { rotation: 0, scale: grow, duration: settle + Math.max(0, hold), ease: (u) => 0.84 * (1 - (1 - u) ** 4) + 0.16 * u, immediateRender: false }, t);
  const ws = $$(sel + " .w");
  ws.forEach((w, i) => {
    tl.fromTo(w, { y, opacity: 0, rotation: -0.6, scale: 0.99 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: dur, ease: "power3.out", immediateRender: false }, t + i * gap);
  });
  return t + (ws.length - 1) * gap + dur;
}
// legacy names kept as thin wrappers so every line shares the same language
function words(tl, sel, t, o = {}) { return tiltWords(tl, sel, t, { gap: o.gap, dur: o.dur && o.dur > 0.3 ? o.dur : undefined, hold: o.hold }); }
function wipe(tl, sel, t, dur, o = {}) { return tiltWords(tl, sel, t, o); }
// words rise from below into a line that stays centred: instead of pushing word by word, the whole line glides
// left in ONE continuous motion (so the earlier words are carried along fluidly) while each new word rises into
// its slot. Word boxes are measured once at setup (fonts loaded).
function wordsPush(tl, sel, t, o = {}) {
  const { dur = 0.7, gap = fr(4.5), y = 70, ease = "power3.out" } = o;
  const ws = $$(sel + " .w"), n = ws.length, line = sel + " .line";
  const rects = ws.map((w) => ({ l: w.offsetLeft, r: w.offsetLeft + w.offsetWidth }));
  const parentW = (ws[0] && ws[0].offsetParent) ? ws[0].offsetParent.offsetWidth : 1920;
  const dx = (i) => parentW / 2 - (rects[0].l + rects[i].r) / 2;    // line offset that centres words 0..i
  tl.set(line, { x: dx(0), opacity: 1 }, t);
  // one glide from "first word centred" to "whole line centred", spanning the arrivals, easing in and out
  tl.to(line, { x: dx(n - 1), duration: (n - 1) * gap + dur * 0.45, ease: "power2.inOut" }, t + gap * 0.35);
  ws.forEach((w, i) => {
    const ti = t + i * gap;
    tl.fromTo(w, { y, opacity: 0, rotation: -3, scale: 0.94 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: dur, ease, immediateRender: false }, ti);
  });
  return t + (n - 1) * gap + dur;
}
// magnetic from the right: x +120→0, blur 6→0, stagger 4f
function magnetic(tl, sel, t, o = {}) {
  const { dur = 0.6, gap = fr(4), x = 120 } = o;
  const ws = $$(sel + " .w");
  ws.forEach((w, i) => {
    tl.fromTo(w, { x, opacity: 0, filter: "blur(6px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: dur, ease: "expo.out", immediateRender: false }, t + i * gap);
    tl.set(w, { clearProps: "filter" }, t + i * gap + dur + .001);
  });
  return t + (ws.length - 1) * gap + dur;
}
// letters typed in (reference accent words): each glyph drops in from above, 2f apart
function lettersIn(tl, sel, t, o = {}) {
  const { dur = fr(6), gap = fr(2), y = -14 } = o;
  const ls = $$(sel + " .l");
  ls.forEach((l, i) => tl.fromTo(l, { y, opacity: 0, scale: 1.15 }, { y: 0, opacity: 1, scale: 1, duration: dur, ease: "power3.out", immediateRender: false }, t + i * gap));
  return t + (ls.length - 1) * gap + dur;
}
// text exits. "up": peels upward with blur (0.25 s). "zoom": whips through the camera (0.4 s),
// the reference's hinge between blocks. "fade": soft blur-out in place.
function textOut(tl, sel, t, o = {}) {
  const { mode = "up", dur = mode === "zoom" ? 0.42 : 0.26 } = o;
  const line = sel + " .line";
  if (mode === "zoom") {
    tl.to(line, { scale: 1.16, filter: "none", duration: dur, ease: "power2.in" }, t);
    tl.to(line, { opacity: 0, duration: dur * 0.45, ease: "power2.in" }, t + dur * 0.55);
  } else if (mode === "fade") {
    tl.to(line, { opacity: 0, scale: 1.01, filter: "none", duration: dur, ease: "power2.in" }, t);
  } else {
    tl.to(line, { y: -24, filter: "none", duration: dur, ease: "power3.in" }, t);
    tl.to(line, { opacity: 0, duration: dur * 0.7, ease: "power1.in" }, t + dur * 0.3);   // gone before the next line lands
  }
  return t + dur;
}
// exit a kinetic line upward (words peel in reading order)
function wordsOut(tl, sel, t, o = {}) {
  const { dur = 0.28, gap = fr(1.2), y = -44 } = o;
  $$(sel + " .w").forEach((w, i) => tl.to(w, { y, opacity: 0, filter: "blur(2px)", duration: dur, ease: "power3.in" }, t + i * gap));
}
const show = (tl, sel, t) => tl.set(sel, { clearProps: "display", opacity: 1 }, t);
const hide = (tl, sel, t) => tl.set(sel, { display: "none" }, t);

// ---------- UI planes / cards ----------
// rise from below in perspective and brake long (reference: the table / dashboard planes)
function riseIn(tl, sel, t, o = {}) {
  const { y = 420, rotX = 14, dur = 0.85, blur = 8, ease = "expo.out", scale = null, x = 0 } = o;
  const from = { y, x, opacity: 0, rotationX: "+=" + rotX, filter: "blur(" + blur + "px)" };
  const to = { y: 0, x: 0, opacity: 1, rotationX: "-=" + rotX, filter: "blur(0px)", duration: dur, ease, immediateRender: false };
  if (scale !== null) { from.scale = scale[0]; to.scale = scale[1]; }
  tl.fromTo(sel, from, to, t);
  tl.set(sel, { clearProps: "filter" }, t + dur + 0.001);
  return t + dur;
}
// leave downward/away, accelerating, with blur (reference exits) — overlaps the next entrance
function fallOut(tl, sel, t, o = {}) {
  const { y = 240, x = 0, dur = 0.4, rotX = -8, blur = 10, scale = null } = o;
  const to = { y: "+=" + y, x: "+=" + x, opacity: 0, rotationX: "+=" + rotX, filter: "blur(" + blur + "px)", duration: dur, ease: "power3.in" };
  if (scale !== null) to.scale = scale;
  tl.to(sel, to, t);
  return t + dur;
}
// pop in (cards, badges): scale 0.6→1 with a slight overshoot, rising 40px
function popIn(tl, sel, t, o = {}) {
  const { from = 0.82, y = 28, dur = 0.5, ease = "power3.out", rot = 0 } = o;
  tl.fromTo(sel, { scale: from, y, opacity: 0, rotation: rot }, { scale: 1, y: 0, opacity: 1, rotation: 0, duration: dur, ease, immediateRender: false }, t);
  return t + dur;
}
// nothing ever stands still: one slow monotonic drift while an element holds (replaces yoyo wobble)
function drift(tl, sel, t, dur, o = {}) {
  const { ry = 3, rx = 1.6, y = 14, scale = 0.025, ease = "sine.out" } = o;
  if (dur <= 0) return;
  tl.to(sel, { rotationY: "+=" + ry, rotationX: "-=" + rx, y: "-=" + y, scale: "+=" + scale, duration: dur, ease }, t);
}
const osc = (tl, sel, t, dur, o = {}) => drift(tl, sel, t, dur, { ry: o.ry, rx: o.rx });
// ---------- 3D parallax for floating card planes (reference: the cards multiply in real depth) ----------
// give each card its own depth (translateZ inside a perspective stage) so any camera move parallaxes
function depth(sels, zs) { sels.forEach((sel, i) => gsap.set(sel, { z: zs[i % zs.length] })); }
// initial camera pose for a shot (set, no tween)
function tilt3D(tl, cam, t, o = {}) {
  const { ry = -8, rx = 4, z = 0 } = o;
  tl.set(cam, { rotationY: ry, rotationX: rx, z, transformOrigin: "50% 50%" }, t);
}
// one slow monotonic orbit + dolly over a hold: the group turns a few degrees while pushing in.
// Relative deltas, so it composes with whatever pose the shot already has (cut the curve: one direction).
function orbit3D(tl, cam, t, dur, o = {}) {
  const { dry = 12, drx = -5, dz = 140, dscale = 0, ease = "sine.inOut" } = o;
  const to = { rotationY: "+=" + dry, rotationX: "+=" + drx, z: "+=" + dz, duration: dur, ease };
  if (dscale) to.scale = "+=" + dscale;
  tl.to(cam, to, t);
}
// camera whip: the whole group pushes through the lens (zoom) or smears sideways (pan)
function whipOut(tl, sel, t, o = {}) {
  const { mode = "zoom", dur = 0.4, scale = 2.4, x = -900 } = o;
  if (mode === "pan") tl.to(sel, { x: "+=" + x, skewX: x < 0 ? -6 : 6, filter: "blur(16px)", opacity: 0, duration: dur, ease: "power3.in" }, t);
  else tl.to(sel, { scale, filter: "blur(16px)", opacity: 0, duration: dur, ease: "power3.in" }, t);
  return t + dur;
}
// cursor travel (transform x/y in px from its CSS anchor)
function move(tl, sel, t, x, y, dur, ease = "power3.out") {
  tl.to(sel, { x, y, duration: dur, ease }, t);
}
// click tap: cursor compresses on its tip; target reacts same-frame; a burst ring (if the target has one)
function click(tl, cur, t, target, o = {}) {
  const { press = 0.94, burst = true } = o;
  tl.to(cur, { scale: 0.84, duration: 0.1, ease: "power2.in" }, t);
  tl.to(cur, { scale: 1, duration: 0.24, ease: "power2.out" }, t + 0.1);
  if (target) {
    tl.to(target, { scale: press, duration: fr(2), ease: "power2.in" }, t);
    tl.to(target, { scale: 1, duration: fr(5), ease: "power2.out" }, t + fr(2));
  }
  // the ring rides on the cursor tip, so it always fires exactly where the click lands
  if (burst) { const b = document.querySelector(cur + " .burst"); if (b) burstAt(tl, b, t + fr(1)); }
}
// burst ring (reference): short orange arcs fly outward and dissolve, 0.55 s
function burstAt(tl, el, t, o = {}) {
  const { dur = 0.55, from = 0.25, to = 1.7 } = o;
  const arcs = el.querySelectorAll("path");
  tl.set(el, { opacity: 1, scale: from, rotation: -20, transformOrigin: "50% 50%" }, t);
  tl.to(el, { scale: to, rotation: 25, duration: dur, ease: "expo.out" }, t);
  tl.to(el, { opacity: 0, duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
  arcs.forEach((a, i) => tl.fromTo(a, { strokeDashoffset: 0 }, { strokeDashoffset: -40 - (i % 3) * 12, duration: dur, ease: "power2.out", immediateRender: false }, t));
  tl.set(el, { opacity: 0, scale: from }, t + dur + 0.001);
  return t + dur;
}
// speed lines (reference "3-5x"): horizontal streaks cross the frame while a big element slides in
function speedLines(tl, sel, t, o = {}) {
  const { dur = 0.55, gap = fr(1.2), from = 2200, to = -2400 } = o;
  $$(sel + " i").forEach((s, i) => {
    tl.fromTo(s, { x: from, opacity: 1 }, { x: to, duration: dur + (i % 3) * 0.08, ease: "power1.in", immediateRender: false }, t + i * gap);
  });
}
// number counter (deterministic: pure function of progress)
function count(tl, sel, t, from, to, dur, o = {}) {
  const { ease = "power2.out", fmt = (v) => Math.round(v).toLocaleString("de-DE") } = o;
  const el = $(sel), obj = { v: from };
  tl.fromTo(obj, { v: from }, { v: to, duration: dur, ease, immediateRender: false, onUpdate: () => { el.textContent = fmt(obj.v); } }, t);
}
// blur helper: tween filter, and clear the filter property once it lands at 0
function blur(tl, sel, t, px, dur, ease = "power2.out", extra = {}) {
  tl.to(sel, { filter: "blur(" + px + "px)", duration: dur, ease, ...extra }, t);
  if (px === 0) tl.set(sel, { clearProps: "filter" }, t + dur + 0.001);
}
// stroke draw (Trim Paths)
function draw(tl, sel, t, dur, o = {}) {
  const { ease = "power2.inOut", from = 1, to = 0 } = o;
  const p = $(sel); const L = p.getTotalLength();
  const pad = from > 0 ? 8 : from < 0 ? -8 : 0;   // keep the round caps off the path while undrawn
  gsap.set(p, { strokeDasharray: L + " " + (L + 16), strokeDashoffset: L * from + pad });
  tl.to(p, { strokeDashoffset: L * to, duration: dur, ease }, t);
}
// comet trail: a window of the path whose head tracks the cursor (same ease/duration
// as the cursor's motionPath tween) and whose tail catches up afterwards
function trail(tl, sel, t, dur, o = {}) {
  const { win = 0.42, ease = "power2.inOut", tail = 0.35 } = o;
  const p = $(sel), L = p.getTotalLength(), w = L * win;
  gsap.set(p, { strokeDasharray: w + " " + (L + 16), strokeDashoffset: w + 8 });
  tl.to(p, { strokeDashoffset: w - L, duration: dur, ease }, t);
  tl.to(p, { strokeDashoffset: -L - 8, duration: tail, ease: "power2.out" }, t + dur);
}
// a quick camera shake (0.3px feel → ~3px at 1080p scale)
function shake(tl, sel, t, amp = 3) {
  tl.to(sel, { x: "+=" + amp, y: "-=" + amp * 0.6, duration: 0.04, ease: "none" }, t);
  tl.to(sel, { x: "-=" + amp * 2, y: "+=" + amp * 1.2, duration: 0.05, ease: "none" }, t + 0.04);
  tl.to(sel, { x: "+=" + amp, y: "-=" + amp * 0.6, duration: 0.06, ease: "power1.out" }, t + 0.09);
}
