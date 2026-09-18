import { kin, label, iconSvg, ICON_PATH, ICON_VIEWBOX, avatar, rng, esc, burstSvg } from "../lib.mjs";

// wordmark letters sliced from the brand PNG (1545×465 → 130px tall)
const LET = [[0, 341], [380, 545], [550, 914], [941, 1304], [1309, 1544]];
const SC = 130 / 465, WW = Math.round(1545 * SC);
const wordmark = `<div id="s6-word" class="wordmark">${LET.map(([a, b], i) => `<span class="l" id="s6-l-${i}" style="width:${Math.round((b - a + 1) * SC)}px;background-position:${-Math.round(a * SC)}px 0;background-size:${WW}px 130px;margin-right:${i < 4 ? Math.round(((LET[i + 1][0] - b) * SC)) : 0}px"></span>`).join("")}</div>`;

// team on the market map (storyboard v2 6.9–6.12)
const TEAM = [16, 27, 12, 9, 24, 19];
const SPHERE = [[120, 1010, 210], [400, 1060, 150], [640, 1000, 260], [960, 1040, 190], [1260, 1010, 240], [1600, 1060, 160]]; // x, y(centre), size — peeking over the bottom edge (6.8)
const MAP = [[430, 430], [880, 300], [1400, 330], [560, 830], [1140, 900], [1560, 700]];   // landing centres (6.9): a ring around the card at the centre
const NODE = 112;
const R = rng(66);
const BLIPS = Array.from({ length: 46 }, () => [Math.round(60 + R() * 1800), Math.round(60 + R() * 980), +(5 + R() * 7).toFixed(1), +(0.22 + R() * 0.3).toFixed(2)]);
// for each avatar, the blip its wave will light (nearest one between 200 and 420 px away, not already taken)
const LIT = []; const taken = new Set();
MAP.forEach(([ax, ay], i) => {
  let best = -1, bd = 1e9;
  BLIPS.forEach(([bx, by], k) => { const d = Math.hypot(bx - ax, by - ay); if (!taken.has(k) && d >= 200 && d <= 420 && d < bd) { bd = d; best = k; } });
  if (best < 0) { BLIPS.push([ax + 260, ay - 120, 8, 0.3]); best = BLIPS.length - 1; }
  taken.add(best); LIT.push({ av: i, blip: best });
});
// micro-cards of content that travel outward from each avatar (6.10): angle, distance
// the three signal cards that open on lit blips (6.11)
const SIGN = [{ lit: 1, tag: "WEB" }, { lit: 0, tag: "IN" }, { lit: 4, tag: "WEB" }];
const HUB = [960, 620], NODEPT = [960, 620];   // every line converges on the base of the «Meeting booked» card, standing at the centre

const mapSvg = `<svg id="s6-csvg" class="layer" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" fill="none">
  ${BLIPS.map(([x, y, r, o], k) => `<circle class="blip" id="s6-b-${k}" cx="${x}" cy="${y}" r="${(r * 1.3).toFixed(1)}" fill="#9a97a8" opacity="${o}"/>`).join("")}
  ${MAP.map(([ax, ay], i) => { const dx = HUB[0] - ax, dy = HUB[1] - ay, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, cx = ax + dx * 0.5 + nx * L * 0.2, cy = ay + dy * 0.5 + ny * L * 0.2; const tx = cx - ax, ty = cy - ay, tl = Math.hypot(tx, ty), sx = ax + tx / tl * 64, sy = ay + ty / tl * 64; return `<path class="cv" id="s6-cv-${i}" d="M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${HUB[0]} ${HUB[1]}" stroke="#f43600" stroke-width="4" stroke-linecap="round"/>`; }).join("")}
</svg>`;

export const html = `
<div id="s6-p1" class="phase bg-dark">
  ${kin("s6-intro", "Por eso hemos creado", {color:"white",size:60})}
  <div id="s6-grid" class="layer grid-dark" style="opacity:.45"></div>
  <div id="s6-lightbg" class="layer bg-light grid-light" style="opacity:0"></div>
  <div id="s6-dot"></div>
  <div id="s6-logo">
    <svg id="s6-trace" viewBox="${ICON_VIEWBOX}" width="260" height="260" xmlns="http://www.w3.org/2000/svg"><path id="s6-tpath" d="${ICON_PATH}" fill="none" stroke="#f43600" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg>
    ${iconSvg("s6-fill", { size: 260, fill: "#f43600", cls: "fillico" })}
    <span class="wave" id="s6-wave"></span>
    ${burstSvg("s6-burst", { size: 420, seed: 5 })}
    <span class="wave ring" id="s6-ring1"></span><span class="wave ring" id="s6-ring2"></span>
  </div>
  ${wordmark}
  ${kin("s6-t1", "Un nuevo sistema go-to-market", { pos: "center", size: 88 })}
</div>

<div id="s6-p2" class="phase bg-light grid-light">
  <div id="s6-cam" class="cam" style="transform-origin:960px 540px">
    <div class="stage" style="perspective-origin:50% 42%">
      <div id="s6-plane" class="p3d" style="left:0;top:0;width:1920px;height:1080px">
        ${mapSvg}
        ${MAP.map(([ax, ay], i) => [0, 1].map((k) => `<span class="wp" id="s6-wp-${i}-${k}" style="left:${ax - 60}px;top:${ay - 60}px"></span>`).join("")).join("")}
        ${TEAM.map((av, i) => { const [sx, sy, sz] = SPHERE[i]; return `<span class="shd" id="s6-sh-${i}" style="left:${Math.round(sx - sz * 0.4)}px;top:${Math.round(sy + sz * 0.3 - sz * 0.11)}px;width:${Math.round(sz * 0.8)}px;height:${Math.round(sz * 0.22)}px"></span>`; }).join("")}
        ${TEAM.map((av, i) => `<div class="sphere" id="s6-sp-${i}" style="left:${SPHERE[i][0] - SPHERE[i][2] / 2}px;top:${SPHERE[i][1] - SPHERE[i][2] / 2}px;width:${SPHERE[i][2]}px;height:${SPHERE[i][2]}px"><img src="assets/avatars/av${String(av).padStart(2, "0")}.jpg" alt=""><span class="aro"></span></div>`).join("")}
        <i id="s6-hubpt" style="position:absolute;left:${HUB[0]}px;top:${HUB[1]}px;width:1px;height:1px"></i>
      </div>
    </div>
  </div>
  <div id="s6-sign" class="sign"><i></i>Ploot</div>
  ${label("s6-t2", "Que convierte a tu equipo")}
  <div id="s6-halo" class="halo"></div>
  ${kin("s6-t3", "En tu mejor canal de ventas", { pos: "center", size: 84 })}
</div>
`;

export const css = `
#s6-dot { position:absolute; left: 950px; top: 530px; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 0 24px 8px rgba(249,120,72,.75), 0 0 60px 20px rgba(244,54,0,.4); opacity: 0; }
#s6-logo { position:absolute; left: 830px; top: 380px; width: 260px; height: 260px; }
#s6-trace, #s6-fill { position:absolute; left: 0; top: 0; }
#s6-fill { opacity: 0; }
.wave { position:absolute; left: -70px; top: -70px; width: 400px; height: 400px; border-radius: 50%; border: 2.5px solid rgba(249,120,72,.9); box-shadow: 0 0 40px 4px rgba(244,54,0,.35), inset 0 0 40px 4px rgba(244,54,0,.25); opacity: 0; }
.wave.ring { border-color: rgba(244,54,0,.8); box-shadow: none; }
.wordmark { position:absolute; left: 0; right: 0; top: 664px; display:flex; justify-content:center; height: 130px; }
.wordmark .l { display:block; height: 130px; background-image: url("assets/brand/word-white.png"); background-repeat: no-repeat; opacity: 0; }
#s6-t1 { top: 0; }
.halo { position:absolute; inset: -10%; background: radial-gradient(ellipse 30% 15% at 50% 50%, rgba(247,246,255,.98) 0%, rgba(247,246,255,.88) 40%, rgba(247,246,255,0) 100%); opacity: 0; pointer-events: none; z-index: 20; }
.sphere { position:absolute; border-radius: 50%; overflow: visible; will-change: transform; transform-origin: 50% 50%; }
.shd { position:absolute; border-radius: 50%; background: radial-gradient(ellipse at center, rgba(23,21,22,.30) 0%, rgba(23,21,22,.12) 45%, rgba(23,21,22,0) 72%); opacity: 0; will-change: transform, opacity; transform-origin: 50% 50%; }
.wp { position:absolute; width: 120px; height: 120px; border-radius: 50%; border: 3px solid rgba(244,54,0,.85); box-shadow: 0 0 18px 2px rgba(244,54,0,.18); opacity: 0; will-change: transform, opacity; transform-origin: 50% 50%; }
.sphere img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; box-shadow: 0 14px 30px rgba(23,21,22,.22); border: 4px solid #fff; box-sizing: border-box; }
.sphere .aro { position:absolute; inset: -7px; border-radius: 50%; border: 6px solid var(--orange); opacity: 0; }
.sphere .wv { position:absolute; inset: -8px; border-radius: 50%; border: 2.5px solid rgba(244,54,0,.85); opacity: 0; will-change: transform, opacity; }
.sign { position:absolute; left: 0; right: 0; top: 30px; display:flex; justify-content:center; align-items:center; gap: 8px; font-weight: 800; font-size: 20px; color: var(--ink); opacity: 0; z-index: 31; }
.sign i { width: 12px; height: 12px; border-radius: 50%; background: var(--orange); }
#s6-csvg .cv { opacity: 0; }
.mcs { position:absolute; display:flex; align-items:center; gap: 12px; padding: 14px 26px; border-radius: 20px; background: #fff; box-shadow: 0 12px 28px rgba(23,21,22,.14); font-size: 22px; color: var(--ink2); opacity: 0; will-change: transform, opacity; }
.mcs b { font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: .12em; color: var(--orange-text); font-size: 21px; }
.mchip { position:absolute; left: 0; right: 0; bottom: 0; margin: 0 auto; width: max-content; display:flex; align-items:center; gap: 26px; padding: 24px 34px; border-radius: 26px; background: #fff; box-shadow: 0 18px 40px rgba(23,21,22,.16); opacity: 0; will-change: transform, opacity; }
.mchip .ck { font-size: 30px; font-weight: 800; color: #167a49; }
.mchip .mcal { display:grid; grid-template-columns: repeat(4, 12px); gap: 5px; }
.mchip .mcal i { width: 12px; height: 12px; border-radius: 3px; background: #e6e4ef; }
.mchip .mcal i.on { background: var(--orange); }
`;

export const data = { sphere: SPHERE, map: MAP, node: NODE, blips: BLIPS, hub: HUB, nodept: NODEPT };
