// Node-side helpers + UI component builders for the Ploot composition.
// Everything here produces static HTML strings; the runtime timeline lives in src/tl/*.js

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Seeded PRNG (mulberry32) — deterministic layouts computed at build time.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const AV = (n) => `assets/avatars/av${String(n).padStart(2, "0")}.jpg`;

// Named people used across the film (avatar index into the 28-face grid).
export const PEOPLE = {
  marta:   { name: "Marta Rubio",   role: "Head of Growth · Madrid",          av: 27 },
  daniel:  { name: "Daniel Sáez",   role: "Director comercial · Valencia",    av: 4 },
  lucia:   { name: "Lucía Ferrer",  role: "Compras",                          av: 29 },
  pablo:   { name: "Pablo Durán",   role: "CEO",                              av: 10 },
  elena:   { name: "Elena Ruiz",    role: "Marketing",                        av: 19 },
  ivan:    { name: "Iván Costa",    role: "Operaciones",                      av: 12 },
  nuria:   { name: "Nuria Vidal",   role: "Dir. financiera",                  av: 5 },
  hugo:    { name: "Hugo Peña",     role: "IT",                               av: 28 },
  clara:   { name: "Clara Ribas",   role: "Head of Growth · Nordika",         av: 9 },
  javier:  { name: "Javier Durán",  role: "Brand Strategist · Luce Innovative", av: 24 },
  xavier:  { name: "Xavier Oliver", role: "Director de Operaciones · Recuit",  av: 16 },
  marc:    { name: "Marc Jardí",    role: "Growth",                           av: 21 },
  angela:  { name: "Àngela Riba",   role: "Ventas",                           av: 1 },
  alfred:  { name: "Alfred Porter", role: "Head of Growth · Mavia",           av: 7 },
  noemi:   { name: "Noemí Herrero", role: "Sales Manager · Lumen",            av: 19 },
  carlos:  { name: "Carlos Llombart", role: "CEO · Brava Labs",               av: 26 },
  pedro:   { name: "Pedro Duarte",  role: "CEO · Marlo",                      av: 18 },
  sofia:   { name: "Sofía Marín",   role: "Directora de Marketing · Ondas",   av: 23 },
  irene:   { name: "Irene Salas",   role: "Directora de Operaciones · Kappa", av: 1 },
  adrian:  { name: "Adrián Vega",   role: "Director de Ventas · Talia",       av: 30 },
};

// ---------- kinetic text ----------
// words("Hay personas decidiendo comprar") -> spans with .w
export function words(text, cls = "") {
  return text.split(" ").map((w) => `<span class="w ${cls}">${esc(w)}</span>`).join(" ");
}
export function letters(text) {
  return [...text].map((c) => `<span class="l">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
}
export function kin(id, text, { pos = "top", color = "ink", extra = "", size = "" } = {}) {
  return `<div id="${id}" class="kin ${pos} ${color} ${extra}" ${size ? `style="font-size:${size}px"` : ""}><span class="line"><span class="text-pose">${words(text)}</span></span></div>`;
}
// label: same kinetic line as kin(), anchored at the top (every line in the film shares the tilted
// word-by-word language of the reference; the old clip-path wipe is gone)
export function label(id, text, { color = "ink", extra = "", size = "" } = {}) {
  return kin(id, text, { pos: "top", color, extra, size });
}

// ---------- burst ring (reference): short arcs that fly outward on a click / reveal ----------
// Drop it inside the clicked element (which becomes the host) so it inherits every transform.
export function burstSvg(id, { size = 260, color = "#f43600", seed = 7 } = {}) {
  const R = rng(seed), arcs = [];
  for (let i = 0; i < 16; i++) {
    const a0 = (i / 16) * Math.PI * 2 + R() * 0.3, len = 0.16 + R() * 0.36, r = 64 + R() * 46;
    const a1 = a0 + len;
    const x0 = 130 + Math.cos(a0) * r, y0 = 130 + Math.sin(a0) * r, x1 = 130 + Math.cos(a1) * r, y1 = 130 + Math.sin(a1) * r;
    arcs.push(`<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" stroke-width="${(6 + R() * 8).toFixed(1)}"/>`);
  }
  const h = size / 2;
  return `<svg id="${id}" class="burst" viewBox="0 0 260 260" style="width:${size}px;height:${size}px;margin:-${h}px 0 0 -${h}px" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${color}" stroke-linecap="round">${arcs.join("")}</svg>`;
}
// wrap an element string so it hosts a burst ring
export function withBurst(html, id, o = {}) {
  return html.replace(/^(<(\w+)[^>]*class=")/, "$1burst-host ").replace(/(<\/\w+>)\s*$/, burstSvg(id, o) + "$1");
}

// ---------- cursors ----------
export const ARROW = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 2.8 L5.5 18.6 L9.6 14.9 L12.4 21.2 L15.6 19.8 L12.8 13.6 L18.4 13.6 Z" fill="#1c1c1c" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
export function cursor(id, { x = 0, y = 0, size = 96, cls = "" } = {}) {
  // the burst ring sits on the cursor tip, so every click() fires it at the exact click point
  return `<div id="${id}" class="cursor ${cls}" data-layout-allow-overlap style="left:${x}px;top:${y}px;width:${size}px;height:${size}px">${ARROW}${burstSvg(id + "-burst", { seed: 11 })}</div>`;
}
// visitor cursor: colored pointer + label pill
export function vcursor(id, text, color, { x = 0, y = 0, cls = "" } = {}) {
  return `<div id="${id}" class="vcur ${cls}" data-layout-allow-overlap style="left:${x}px;top:${y}px;--c:${color}">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5 L21 10 L12.6 12.6 L10 21 Z" fill="${color}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>
    <span class="tag" data-layout-allow-overlap>${esc(text)}</span></div>`;
}

// ---------- cards ----------
export function avatar(av, { size = 60, live = true, cls = "" } = {}) {
  return `<span class="av ${live ? "live" : ""} ${cls}" style="width:${size}px;height:${size}px"><img src="${AV(av)}" alt=""></span>`;
}
export function sigCard(id, p, signal, { x = 0, y = 0, rot = 0, time = "", send = false, variant = "", cls = "" } = {}) {
  return `<div id="${id}" class="card sig ${variant} ${cls}" style="left:${x}px;top:${y}px;--rot:${rot}deg">
    ${avatar(p.av)}
    <div class="body"><div class="nm">${esc(p.name)}</div><div class="rl">${esc(p.role)}</div><div class="tx">${esc(signal)}</div></div>
    ${time ? `<div class="tm">${esc(time)}</div>` : ""}${send ? `<div class="send">Send</div>` : ""}
  </div>`;
}

// ---------- browser / web mocks ----------
function bars(ws, cls = "") {
  return `<div class="bars ${cls}">${ws.map((w) => `<i style="width:${w}%"></i>`).join("")}</div>`;
}
export function webHook(id, { x = 0, y = 0, cls = "" } = {}) {
  // Customer site "Nordika" — hero + pricing (hook web, returns in 8.2)
  return `<div id="${id}" class="web hook ${cls}" style="left:${x}px;top:${y}px">
    <div class="wbar"><i></i><i></i><i></i><span class="url">nordika.es</span></div>
    <div class="wnav"><span class="brand"><b></b>Nordika</span><span class="links"><span>Producto</span><span>Precios</span><span>Casos</span><span>Blog</span></span><span class="btn">Pedir demo</span></div>
    <div class="whero">
      <div class="eyebrow">LOGÍSTICA INTELIGENTE</div>
      <h2 data-layout-allow-overlap>Envíos B2B sin sorpresas</h2>
      ${bars([72, 58], "sub")}
      <div class="cta-row"><span class="btn">Pedir demo</span><span class="ghost" data-layout-allow-overlap>Ver casos</span></div>
      <div class="stats"><div><b>98,4 %</b><span>entregas a tiempo</span></div><div><b>−22 %</b><span>coste por envío</span></div><div><b>48 h</b><span>integración media</span></div></div>
    </div>
    <div class="wpricing">
      <div class="ph"><span class="eyebrow">PLANES</span><h3>Planes y precios</h3></div>
      <div class="plans">
        <div class="plan"><span>Starter</span><b>290 €</b>${bars([80, 60, 70])}</div>
        <div class="plan hi"><span>Growth</span><b>790 €</b>${bars([80, 60, 70])}</div>
        <div class="plan"><span>Scale</span><b>1.400 €</b>${bars([80, 60, 70])}</div>
      </div>
    </div>
  </div>`;
}
export function webPloot(id, { x = 0, y = 0, cls = "" } = {}) {
  return `<div id="${id}" class="web ploot ${cls}" style="left:${x}px;top:${y}px">
    <div class="wbar"><i></i><i></i><i></i><span class="url">ploot.io</span></div>
    <div class="wnav"><span class="brand"><img src="assets/brand/logo-dark.png" alt=""></span><span class="links"><span>Producto</span><span>Precios</span><span>Casos</span></span><span class="right"><span class="btn">Pedir demo</span><span class="in-ico" id="${id}-in">in</span></span></div>
    <div class="wgrid">
      <div class="whero compact">
        <div class="eyebrow">SEÑALES DE COMPRA</div>
        <h2>Vende a quien ya te está mirando</h2>
        ${bars([84, 62], "sub")}
        <div class="cta-row"><span class="btn">Empezar</span><span class="ghost">Ver cómo funciona</span></div>
        <div class="stats"><div><b>+38 %</b><span>reuniones al mes</span></div><div><b>−60 %</b><span>mensajes en frío</span></div><div><b>12 min</b><span>tiempo de respuesta</span></div></div>
      </div>
      <div class="wside">
        <div class="sh"><span class="eyebrow">SEÑALES · HOY</span><span class="live">● en vivo</span></div>
        ${["Marta R.", "Daniel S.", "Lucía F.", "Pablo D."].map((n, i) => `<div class="srow"><b>${n}</b>${bars([[60, 44, 70, 52][i]])}</div>`).join("")}
      </div>
    </div>
  </div>`;
}
export function webCompetitor(id, name, { x = 0, y = 0, cls = "" } = {}) {
  return `<div id="${id}" class="web comp ${cls}" style="left:${x}px;top:${y}px">
    <div class="wbar"><i></i><i></i><i></i></div>
    <div class="wnav"><span class="brand"><b class="sq"></b>${esc(name)}</span><span class="links"><span></span><span></span><span></span></span></div>
    <div class="whero compact">${bars([70, 90, 55], "title")}${bars([60, 48], "sub")}<div class="cta-row"><span class="btn grey">&nbsp;</span></div></div>
    <div class="cards3"><div>${bars([70, 50])}</div><div>${bars([60, 50])}</div><div>${bars([75, 45])}</div></div>
  </div>`;
}

// ---------- chat / messages ----------
export function chatWindow(id, p, msg, { x = 0, y = 0, cls = "", sent = false, tick = false, subtitle = "CEO de Ploot", warm = false } = {}) {
  // warm = the Ploot-style message (storyboard 2.2 / 7.18): divider under the header, placeholder + orange «Enviar»
  const foot = warm
    ? `<div class="cf"><span class="ph">Escribe un mensaje…</span><span class="sendbtn or">Enviar</span></div>`
    : `<div class="cf"><span class="tools"><i></i><i></i><i></i></span><span class="sendbtn">Enviar</span></div>`;
  return `<div id="${id}" class="card chat ${warm ? "warm" : ""} ${cls}" style="left:${x}px;top:${y}px">
    <div class="ch">${avatar(p.av, { size: warm ? 80 : 96 })}<div><b>${esc(p.name)}</b><span>${esc(subtitle)}</span></div><i class="x">×</i></div>
    <div class="cb"><div class="bubble">${esc(msg)}</div>${tick ? `<div class="tick"><span class="receipt-sent">✓ Enviado</span><span class="receipt-read">✓✓ Leído</span></div>` : ""}</div>
    ${foot}
  </div>`;
}

// rounded polygon → SVG path (for the isotype stroke draw)
export function roundedPath(pts, r) {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const v1 = [p0[0] - p1[0], p0[1] - p1[1]], v2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
    const a = [p1[0] + (v1[0] / l1) * r, p1[1] + (v1[1] / l1) * r];
    const b = [p1[0] + (v2[0] / l2) * r, p1[1] + (v2[1] / l2) * r];
    d += (i === 0 ? `M${a[0].toFixed(1)} ${a[1].toFixed(1)}` : ` L${a[0].toFixed(1)} ${a[1].toFixed(1)}`);
    d += ` Q${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  return d + " Z";
}
// Ploot isotype geometry (normalised to the 432×431 alpha bbox of the PNG)
export const ICON_PTS = [[241, 0], [431, 110], [431, 321], [241, 431], [48, 321], [108, 285], [-8, 215.5], [108, 146], [48, 110]];
export const ICON_PATH = roundedPath(ICON_PTS, 16);
export const ICON_VIEWBOX = "-24 -16 480 464";
export function iconSvg(id, { size = 200, fill = "#f43600", stroke = "", sw = 4, cls = "" } = {}) {
  return `<svg id="${id}" class="isotype ${cls}" viewBox="${ICON_VIEWBOX}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="${ICON_PATH}" fill="${fill}" ${stroke ? `stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"` : ""}/></svg>`;
}

// Catmull-Rom → cubic bezier path through points
export function smoothPath(pts, tension = 0.5) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) * tension / 3, p1[1] + (p2[1] - p0[1]) * tension / 3];
    const c2 = [p2[0] - (p3[0] - p1[0]) * tension / 3, p2[1] - (p3[1] - p1[1]) * tension / 3];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export const FIRE = `<svg viewBox="0 0 24 24" class="fire"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.2 1.5 1 2.5 2 2.5 0-3-1-5 1-9z"/></svg>`;
export function fires(n, total = 3) {
  return `<span class="fires">${Array.from({ length: total }, (_, i) => `<span class="f ${i < n ? "on" : ""}">${FIRE}</span>`).join("")}</span>`;
}
