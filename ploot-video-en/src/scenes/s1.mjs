import { kin, label, cursor, vcursor, sigCard, webHook, webCompetitor, PEOPLE, rng, esc } from "../lib.mjs";

// ---------- opening lights: two arcs from the bottom corners that merge into one line ----------
// both arcs arrive vertically at the merge point (960,560) and share the same straight run to the top
const LPATH = "M -80 1160 C 380 1060, 960 830, 960 560 L 960 -140";
const RPATH = "M 2000 1160 C 1540 1060, 960 830, 960 560 L 960 -140";

// ---------- signal cards (1.8 world) ----------
export const CARDS1 = [
  { id: "m", p: PEOPLE.marta,  s: "Is visiting your website",                 x: 700,  y: 450, rot: -7, depth: 1 },
  { id: "d", p: PEOPLE.daniel, s: "Shared your content on LinkedIn", x: 1480, y: 70,  rot: -8, depth: 1 },
  { id: "a", p: PEOPLE.lucia,  s: "Returned to your website",                     x: -150, y: 110, rot: -7, depth: 1 },
  { id: "b", p: PEOPLE.pablo,  s: "Viewed your profile",                     x: 640,  y: -20, rot: -8, depth: 0.82 },
  { id: "c", p: PEOPLE.elena,  s: "Opened your case study",          x: 1560, y: 520, rot: -7, depth: 1 },
  { id: "e", p: PEOPLE.ivan,   s: "Compares pricing",                        x: -130, y: 560, rot: -8, depth: 1 },
  { id: "f", p: PEOPLE.nuria,  s: "Downloaded your case study",                  x: 220,  y: 900, rot: -7, depth: 0.85 },
  { id: "g", p: PEOPLE.hugo,   s: "Looks for your solution",                      x: 1380, y: 890, rot: -8, depth: 0.82 },
];
// entry vector per card: long, mostly lateral sweeps (motion-blur streaks in the reference)
const EDGE = { m: [-900, 120], d: [900, -60], a: [-900, -40], b: [-700, -200], c: [900, 60], e: [-900, 40], f: [-800, 220], g: [900, 180] };
// slow parallax drift after landing (px over ~1.6 s)
const DRIFT = { m: [18, -10], d: [-26, 14], a: [30, 8], b: [-14, 18], c: [-28, -10], e: [26, -16], f: [20, -22], g: [-22, -18] };

// ---------- coins (1.12) ----------
const R = rng(1201);
const CURSOR_ORIG = [[400, 600], [960, 480], [1520, 520]];
export const COINS = [];
CURSOR_ORIG.forEach(([cx, cy]) => {
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2 + R() * 0.6 - 0.3;
    const rad = 130 + R() * 150;
    COINS.push({ cx, cy, dx: Math.cos(ang) * rad, dy: Math.sin(ang) * rad * 0.7 - 60, spin: 360 + Math.round(R() * 540), fall: 820 + Math.round(R() * 380), drift: Math.round(R() * 80 - 40), delay: R() * 0.12, size: 38 + Math.round(R() * 18) });
  }
});

const trails = `<svg id="s1-trails" class="layer" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path id="s1-tr1" d="M400 600 C 560 440, 800 400, 960 480" stroke="#f43600" stroke-width="5" stroke-linecap="round" opacity=".95"/>
  <path id="s1-tr2" d="M960 480 C 1130 370, 1360 390, 1520 520" stroke="#f43600" stroke-width="5" stroke-linecap="round" opacity=".95"/>
  <path id="s1-tr3" d="M1520 520 C 1300 760, 640 780, 400 600" stroke="#f43600" stroke-width="5" stroke-linecap="round" opacity=".95"/>
</svg>`;

export const html = `
<!-- P2: Right now (magnético) + dos luces desde las esquinas → web 3D + cursores + push-in -->
<div id="s1-p2" class="phase bg-dark grid-dark">
  <div id="s1-light" class="layer bg-light grid-light" style="opacity:0"></div>
  <svg id="s1-lights" class="layer" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path id="s1-ltL" d="${LPATH}" stroke="#f43600" stroke-width="6" stroke-linecap="round"/>
    <path id="s1-ltR" d="${RPATH}" stroke="#f43600" stroke-width="6" stroke-linecap="round"/>
  </svg>
  <div class="orb" id="s1-orbL"></div><div class="orb" id="s1-orbR"></div>
  ${kin("s1-t1", "Right now", { pos: "center", color: "white", size: 112 })}
  <div id="s1-cam2" class="cam" style="transform-origin:960px 790px">
    <div class="stage">
      ${webHook("s1-web", { x: 440, y: 200, cls: "p3d" })}
    </div>
    <svg id="s1-wander" class="layer" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="none">
      <path id="s1-wp1" d="M 764 694 C 700 620, 820 560, 900 600 C 980 640, 1000 720, 964 782"/>
      <path id="s1-wp2" d="M 1154 704 C 1220 640, 1260 700, 1230 760 C 1200 810, 1150 820, 1184 796"/>
      <path id="s1-wp3" d="M 904 864 C 840 880, 700 860, 700 800 C 700 760, 760 770, 748 806"/>
    </svg>
    ${vcursor("s1-v1", "Visitor · Madrid", "#2d5bff", { x: 760, y: 690 })}
    ${vcursor("s1-v2", "Visitor · Bilbao", "#7c5cff", { x: 1150, y: 700 })}
    ${vcursor("s1-v3", "Visitor · Seville", "#1fa463", { x: 900, y: 860 })}
  </div>
  ${kin("s1-t2", "People are deciding to buy", { color: "white" }).replace('<div id="s1-t2"', '<div id="s1-t2" data-layout-allow-overlap')}
</div>

<!-- P3: naranja -->
<div id="s1-p3" class="phase bg-orange">
  ${kin("s1-t3", "Exactly what you sell", { pos: "center", color: "white" })}
</div>

<!-- P4: lienzo de cards → zoom → órbita -->
<div id="s1-p4" class="phase bg-light grid-light">
  <div class="stage">
    <div id="s1-cam4" class="cam p3d" style="transform-origin:960px 540px">
      ${CARDS1.map((c) => sigCard("s1-c-" + c.id, c.p, c.s, { x: c.x, y: c.y, rot: c.rot, send: true })).join("\n")}
      ${CARDS1.map((c) => cursor("s1-sc-" + c.id, { x: c.x + 430, y: c.y + 70, size: 44 })).join("\n")}
    </div>
  </div>
  ${kin("s1-t4a", "They visit your website")}
  ${kin("s1-t4b", "They read your content")}
</div>

<!-- P5: tres webs → monedas → caída -->
<div id="s1-p5" class="phase bg-light">
  <div id="s1-grid5" class="layer grid-light"></div>
  <div id="s1-webs" class="layer">
    <div class="stage">
      <div id="s1-webs-g" class="p3d" style="left:0;top:0;width:1920px;height:1080px">
        <div id="s1-w-me" class="webwrap" style="left:160px;top:300px;width:478px;height:478px;--s:.46">${webHook("s1-w-me-web")}</div>
        <div id="s1-w-a" class="webwrap" style="left:720px;top:306px;width:480px;height:465px;--s:.75">${webCompetitor("s1-w-a-web", "Competitor A")}</div>
        <div id="s1-w-b" class="webwrap" style="left:1280px;top:306px;width:480px;height:465px;--s:.75">${webCompetitor("s1-w-b-web", "Competitor B")}</div>
        <div class="wlabel" id="s1-wl-me" style="left:160px;top:262px">Your website</div>
        <div class="wlabel" id="s1-wl-a" style="left:720px;top:262px">Competitor A</div>
        <div class="wlabel" id="s1-wl-b" style="left:1280px;top:262px">Competitor B</div>
      </div>
    </div>
    ${trails}
    ${vcursor("s1-u1", "Visitor · Madrid", "#2d5bff", { x: 400, y: 600 })}
    ${vcursor("s1-u2", "Visitor · Bilbao", "#7c5cff", { x: 960, y: 480 })}
    ${vcursor("s1-u3", "Visitor · Seville", "#1fa463", { x: 1520, y: 520 })}
  </div>
  <div id="s1-coins" class="layer" style="z-index:10">
    ${COINS.map((c, i) => `<div class="coin" id="s1-coin-${i}" data-layout-allow-overlap style="left:${c.cx - c.size / 2}px;top:${c.cy - c.size / 2}px;width:${c.size}px;height:${c.size}px;font-size:${Math.round(c.size * 0.6)}px">€</div>`).join("")}
  </div>
  ${label("s1-t5a", "They compare you")}
  ${kin("s1-t5b", "You’re losing a lot of money", { pos: "center", size: 92 })}
</div>

<!-- P6: contador mecánico + Without even knowing it -->
<div id="s1-p6" class="phase bg-orange">
  ${kin("s1-t6", "Without even knowing it", { pos: "center", color: "white", size: 100 })}
</div>
`;

export const css = `
.orb { position:absolute; left:0; top:0; width:18px; height:18px; margin:-9px 0 0 -9px; border-radius:50%; background: var(--orange); opacity:0; z-index:5; will-change: transform; }
#s1-lights { z-index:4; }
.webwrap { position:absolute; width: 624px; height: 624px; transform-origin: 0 0; }
.webwrap .web { transform: scale(var(--s, .6)); transform-origin: 0 0; }
.webwrap .web.hook { height: 1040px; }
.wlabel { position:absolute; font-family:"IBM Plex Mono", monospace; font-size:15px; letter-spacing:.14em; color: var(--ink2); font-weight:600; text-transform: uppercase; }
#s1-w-me-web { outline: 0px solid var(--orange); }
.coin { position:absolute; border-radius:50%; background: var(--orange); color:#fff; font-weight:800; display:flex; align-items:center; justify-content:center; opacity:0; will-change: transform; font-family:"Manrope"; line-height:1; }
.counter { position:absolute; left:0; right:0; top:50%; margin-top:-90px; display:flex; justify-content:center; gap: 10px; font-family:"IBM Plex Mono", monospace; font-weight:600; font-size:180px; color:#fff; line-height:1; letter-spacing:.02em; }
.counter .col { display:block; height:180px; overflow:hidden; width: 118px; text-align:center; }
.counter .col.sym { width: 90px; line-height: 180px; }
.counter .strip { display:block; will-change: transform; }
.counter .strip i { display:block; height:180px; font-style:normal; }
.kin.center.wipe { font-size: 92px; }
`;

export const data = { coins: COINS, edge: EDGE, drift: DRIFT, cards: CARDS1.map((c) => ({ id: c.id, x: c.x, y: c.y, depth: c.depth })) };
