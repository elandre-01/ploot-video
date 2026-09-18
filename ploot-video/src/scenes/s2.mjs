import { letters, sigCard, kin, label, cursor, chatWindow, avatar, PEOPLE, smoothPath, rng, esc, AV } from "../lib.mjs";

// ---------- 2.2–2.4 · chat abierto con señales alrededor · rebobinado (storyboard v2) ----------
const SIGS2 = [
  { p: PEOPLE.daniel, s: "Entra en tu web",  t: "12s", x: 126,  y: 190, from: -900 },
  { p: PEOPLE.lucia,  s: "Visita tu perfil", t: "34s", x: 1330, y: 162, from: 900 },
  { p: PEOPLE.pablo,  s: "Te sigue",         t: "1m",  x: 110,  y: 578, from: -900 },
  { p: PEOPLE.elena,  s: "Comparte tu post", t: "2m",  x: 1340, y: 590, from: 900 },
  { p: PEOPLE.ivan,   s: "Guarda tu caso",   t: "3m",  x: 168,  y: 946, from: -900 },
  { p: PEOPLE.nuria,  s: "Pide precios",     t: "4m",  x: 1330, y: 946, from: 900 },
];
const REW = [[440, 400], [1118, 284], [1720, 402], [527, 894], [1603, 867], [990, 1016]];
const rewind = (id, [x, y]) => `<svg id="${id}" class="rew" viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" style="left:${x - 55}px;top:${y - 35}px"><path d="M31 20 L62 2 V38 Z"/><path d="M2 20 L33 2 V38 Z"/></svg>`;
const WARM = "Hola Pablo, gracias por empezar a seguirme, es un placer! He visto tenéis una vacante comercial abierta, supongo que estáis creciendo, enhorabuena!!";

// ---------- red profesional mock ----------
function feedMock() {
  // storyboard 2.5: simplified professional network, no brand — top bar, three columns of skeleton content.
  // The content scrolls inside the window (#s2-fscroll) and the chat is CLOSED: a floating chat button (#s2-fchat).
  const bars = (ws) => ws.map((w) => `<i style="width:${w}%"></i>`).join("");
  const post = (ws) => `<div class="fpost"><span class="pav"></span><div class="pb">${bars(ws)}</div></div>`;
  return `<div id="s2-feed" class="feed p3d">
    <div class="ftop"><span class="flogo"></span><span class="fsearch"></span><span class="fnav"><i></i><i></i><i></i><i></i><i class="big"></i></span></div>
    <div class="fscroll" id="s2-fscroll"><div class="fcols">
      <div class="fleft"><div class="fbanner"></div>${bars([72, 48])}<div class="fblock"></div>${bars([62, 80, 54])}<div class="fblock short"></div>${bars([70, 44, 66])}<div class="fblock"></div>${bars([58, 76])}</div>
      <div class="fmain">${post([96, 88, 60])}${post([90, 72])}<div class="fimg"></div>${post([94, 80, 66])}${post([88, 58])}${post([92, 84, 50])}<div class="fimg"></div>${post([90, 70])}${post([86, 64, 72])}</div>
      <div class="fright"><div class="fcardr">${bars([92, 70, 88, 60, 84, 46])}</div><div class="fblock"></div>${bars([80, 66, 74])}<div class="fcardr">${bars([88, 72, 64, 80])}</div><div class="fblock short"></div>${bars([76, 58])}</div>
    </div></div>
    <span class="fchatbtn" id="s2-fchat" data-layout-allow-overlap><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.4c-.6.5-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z" fill="#fff"/></svg><i class="nb"></i></span>
  </div>`;
}
const LONG = "Hola Pablo, te escribo porque te vengo a hablar de nuestra promoción de venta, seguro que te va a interesar porque tenemos un 10% de descuento. ¿Cómo te va hacer una llamada esta semana? Gracias y un saludo.";
const SHORT = "Hola Pablo, te escribo porque creo que podríamos ayudarte con vuestro pipeline. ¿Te encaja una llamada esta semana?";

// ---------- facturas (2.11–2.12): a wall of invoice windows receding in depth, revealed by a pull-back ----------
// reference «and hoping volume will fix the problem»: tall white windows in an orderly grid, two planes (front sharp,
// back offset half a cell and out of focus), a few big blurred discs drifting in front, everything fading to white
const EV_NAMES = ["Feria de Madrid", "Congreso Barcelona", "Stand Valencia", "Summit Lisboa", "Expo Bilbao", "Foro Sevilla", "Meetup Málaga", "Cumbre Oporto",
  "Foro Oporto", "Cumbre Vigo", "Feria Zaragoza", "Congreso Sevilla", "Stand Alicante", "Summit Madrid", "Expo Valencia", "Foro Bilbao",
  "Meetup Girona", "Cumbre Málaga", "Feria Murcia", "Congreso Vigo", "Stand Palma", "Summit Barcelona", "Expo Coruña", "Foro Granada",
  "Meetup Santander", "Cumbre Valladolid", "Feria Pamplona", "Congreso Salamanca", "Stand Oviedo", "Summit Sevilla", "Expo Córdoba", "Foro Cádiz",
  "Meetup Toledo", "Cumbre Burgos", "Feria León", "Congreso Logroño"];
const EV_TAGS = ["EVENTO", "NUEVO EVENTO", "EVENTO PASADO"];
const RE = rng(4102);
const IW = 440, IH = 600;
// a continuous stream of invoice windows arriving from the front for 1.5 s, saturating the frame, centre included
const NI = 80, ISPAN = 1.5;
const icells = [];
for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) icells.push([-200 + c * 232 + 116, -160 + r * 284 + 142]);
for (let i = icells.length - 1; i > 0; i--) { const j = Math.floor(RE() * (i + 1)); [icells[i], icells[j]] = [icells[j], icells[i]]; }
export const EVENTS = [];
for (let i = 0; i < NI; i++) {
  const [gx, gy] = icells[i % icells.length];
  const cx = Math.round(gx + RE() * 200 - 100), cy = Math.round(gy + RE() * 180 - 90);
  const z0 = Math.round(-1100 + (i / NI) * 1300 + RE() * 240 - 120), far = z0 < -600, mid = z0 < -200;
  EVENTS.push({ tag: EV_TAGS[i % 3], name: EV_NAMES[i % EV_NAMES.length], cost: "−" + (1900 + Math.round(RE() * 79) * 100).toLocaleString("de-DE") + " €",
    x: Math.round(cx - IW / 2), y: Math.round(cy - IH / 2), cx, cy, rot: +(RE() * 12 - 6).toFixed(1), z0,
    sc: +((far ? 0.8 : mid ? 0.9 : 1) * (0.92 + RE() * 0.16)).toFixed(2), blur: far ? 2.8 : mid ? 1.3 : 0, op: far ? 0.66 : mid ? 0.86 : 1,
    bars: [78 + Math.round(RE() * 14), 52 + Math.round(RE() * 30), 64 + Math.round(RE() * 24), 40 + Math.round(RE() * 30)],
    t: +((i / NI) * ISPAN + RE() * 0.05).toFixed(2) });
}
const invoice = (e, i) => `<div class="card inv" id="s2-inv-${i}" data-layout-allow-overlap style="left:${e.x}px;top:${e.y}px;--rot:${e.rot}deg">
  <span class="tag" data-layout-allow-overlap>${e.tag}</span><b data-layout-allow-overlap>${esc(e.name)}</b>
  <span class="bars">${e.bars.map((w) => `<i style="width:${w}%"></i>`).join("")}</span>
  <span class="lab" data-layout-allow-overlap>Coste total</span><span class="amt" data-layout-allow-overlap>${e.cost}</span><span class="pill"></span>
</div>`;

// ---------- tragaperras ----------
const REEL = ["nada", "lead", "nada", "referido", "nada", "spam", "nada", "cliente"];
const reel = (id) => `<div class="reel" id="${id}"><div class="strip">${REEL.concat(REEL, REEL, REEL).map((w) => `<i class="${w === "referido" ? "ref" : ""}">${w}</i>`).join("")}</div></div>`;

export const html = `
<div id="s2-p1" class="phase bg-light">
  ${label("s2-t1", "Porque sigues vendiendo", { extra: "center", size: 92 })}
</div>

<div id="s2-p2" class="phase bg-light grid-light">
  <div class="stage"><div id="s2-cam" class="cam p3d" style="transform-origin:960px 540px">
    <div id="s2-sigs" class="layer cards3d">${SIGS2.map((c, i) => sigCard("s2-sg-" + i, c.p, c.s, { x: c.x, y: c.y, time: c.t, variant: "dot wide" })).join("")}</div>
    ${chatWindow("s2-wchat", PEOPLE.pablo, WARM, { x: 610, y: 372, cls: "p3d", warm: true, subtitle: PEOPLE.pablo.role })}
  </div></div>
  <div id="s2-rw" class="layer">${REW.map((r, i) => rewind("s2-rw-" + i, r)).join("")}</div>
  ${kin("s2-t2", "Como hace 5 años")}
</div>

<div id="s2-p3" class="phase bg-light grid-light">
  <!-- 0:20 — the network window rises with the chat closed; a cursor scrolls, clicks the chat button; the camera
       zooms after the cursor and the chat opens right in the centre of the closer shot; the window fades behind -->
  <div id="s2-cam3" class="cam" style="transform-origin:1807px 975px">
    <div class="stage">${feedMock()}</div>
    ${cursor("s2-cur1", { x: 1560, y: 1120, size: 96 })}
  </div>
  ${chatWindow("s2-chat", PEOPLE.pablo, LONG, { x: 610, y: 260, cls: "p3d", tick: true, subtitle: PEOPLE.pablo.role })}
  ${cursor("s2-cur4", { x: 1560, y: 1120, size: 96 })}
  <div id="s2-t3" class="kin top ink"><span class="line">${letters("Mensajes en frío")}</span></div>
  ${kin("s2-t4", "Que nadie abre", { pos: "top", size: 72 }).replace('<div id="s2-t4"', '<div id="s2-t4" style="top:900px"')}
</div>

<div id="s2-p5" class="phase bg-light grid-light">
  <div class="stage"><div id="s2-cam5" class="cam p3d" style="transform-origin:960px 540px">
    ${EVENTS.map((e, i) => invoice(e, i)).join("")}
  </div></div>
  <div class="veil light" style="opacity:.55"></div>
  ${label("s2-t5", "Eventos carísimos sin retorno", { extra: "center", size: 72 }).replace('<div id="s2-t5"', '<div id="s2-t5" data-layout-allow-overlap')}
  <div id="s2-white" class="layer bg-light grid-light" style="opacity:0;z-index:40"></div>
</div>

<div id="s2-p6" class="phase bg-light grid-light">
  <div id="s2-handoff" class="layer bg-orange" style="opacity:0"></div>
  <div class="stage">
    <div id="s2-slot" class="card slot p3d">
      <div class="sh"><span class="eyebrow">REFERIDOS</span><span class="dots"><i></i><i></i></span></div>
      <div class="reels">${reel("s2-r1")}${reel("s2-r2")}${reel("s2-r3")}</div>
      <div class="sf"><span class="lab">Sin sistema</span><span class="pull" id="s2-pull">Tirar</span></div>
    </div>
  </div>
  ${cursor("s2-cur3", { x: 1240, y: 1120, size: 96 })}
  ${kin("s2-t6", "Y rezar para que lleguen referidos")}
</div>
`;

export const css = `
.rew { position:absolute; width:110px; height:70px; fill: var(--orange); opacity: 0; will-change: transform; transform-origin: 50% 50%; }
.feed { left: 150px; top: 335px; width: 1620px; height: 980px; background: #fff; border-radius: 20px; box-shadow: var(--shadow); overflow: hidden; }
.feed .ftop { height: 72px; background: #ecebf6; display:flex; align-items:center; gap: 24px; padding: 0 34px; }
.feed .flogo { width: 44px; height: 44px; border-radius: 8px; background: var(--blue); flex:none; }
.feed .fsearch { flex: 1; max-width: 1080px; height: 34px; border-radius: 10px; background: #f8f8fc; }
.feed .fnav { margin-left:auto; display:flex; gap: 18px; align-items:center; }
.feed .fnav i { width: 28px; height: 28px; border-radius: 6px; background: #d9d8e6; }
.feed .fnav i.big { width: 46px; height: 36px; border-radius: 8px; }
.feed .fscroll { position:absolute; left: 0; right: 0; top: 72px; will-change: transform; }
.feed .fcols { display:grid; grid-template-columns: 350px 1fr 350px; gap: 42px; padding: 30px 34px; }
.feed .fchatbtn { position:absolute; right: 60px; top: 612px; width: 60px; height: 60px; border-radius: 50%; background: var(--blue); box-shadow: 0 14px 30px rgba(45,91,255,.35); display:flex; align-items:center; justify-content:center; will-change: transform; }
.feed .fchatbtn svg { width: 30px; height: 30px; display:block; }
.feed .fchatbtn .nb { position:absolute; right: 2px; top: 2px; width: 14px; height: 14px; border-radius: 50%; background: var(--orange); border: 2.5px solid #fff; }
.feed .fcols i { display:block; height: 14px; border-radius: 7px; background: #e8e7f1; margin-bottom: 12px; }
.feed .fbanner { height: 84px; border-radius: 8px; background: #d7ddff; margin-bottom: 18px; }
.feed .fblock { height: 72px; border-radius: 8px; background: #ebebf2; margin: 14px 0 18px; }
.feed .fblock.short { height: 48px; }
.feed .fimg { height: 190px; border-radius: 10px; background: #dedde5; margin: 6px 0 22px; }
.feed .fcardr { padding: 4px 0 6px; }
.feed .fpost { display:flex; gap: 16px; margin-bottom: 20px; }
.feed .fpost .pav { width: 46px; height: 46px; border-radius: 50%; background: #dcdbe6; flex:none; }
.feed .fpost .pb { flex:1; padding-top: 6px; }
.card.inv { width: 440px; height: 600px; padding: 34px 34px 30px; display:flex; flex-direction:column; gap: 10px; border-radius: 24px; opacity:0; transform: rotate(var(--rot)); box-shadow: 0 24px 50px rgba(23,21,22,.10), 0 2px 6px rgba(23,21,22,.04); }
.card.inv .tag { font-family:"IBM Plex Mono", monospace; font-size: 14px; letter-spacing:.2em; color: var(--orange-text); font-weight:600; }
.card.inv b { font-size: 28px; font-weight: 800; letter-spacing: -.01em; margin-bottom: 16px; }
.card.inv .bars { display:flex; flex-direction:column; gap: 15px; margin-bottom: auto; }
.card.inv .bars i { display:block; height: 15px; border-radius: 8px; background: #ebeaf3; }
.card.inv .lab { font-size: 15px; color: var(--ink3); }
.card.inv .amt { font-size: 36px; font-weight: 800; color: var(--orange); letter-spacing:-.02em; }
.card.inv .pill { position:absolute; right: 32px; bottom: 34px; width: 96px; height: 34px; border-radius: 17px; background: #ecebf3; }
.slot { left: 400px; top: 200px; width: 1120px; height: 660px; border-radius: 36px; padding: 40px 46px; display:flex; flex-direction:column; }
.slot .sh { display:flex; justify-content:space-between; align-items:center; }
.slot .dots { display:flex; gap: 10px; } .slot .dots i { width: 14px; height: 14px; border-radius:50%; background:#dad8e6; }
.slot .reels { display:flex; gap: 30px; margin: 34px 0; flex:1; }
.reel { flex:1; background: #f3f2f8; border-radius: 24px; overflow:hidden; position:relative; height: 360px; }
.reel .strip { position:absolute; left:0; right:0; top:0; will-change: transform; }
.reel .strip i { display:flex; align-items:center; justify-content:center; height: 360px; font-style:normal; font-family:"IBM Plex Mono", monospace; font-size: 46px; color: #b3b0bd; font-weight: 600; }
.reel .strip i.ref { color: var(--orange); font-weight: 600; }
.slot .sf { display:flex; justify-content:space-between; align-items:center; }
.slot .lab { font-family:"IBM Plex Mono", monospace; font-size: 16px; letter-spacing: .16em; color: var(--ink3); }
.slot .pull { background: var(--orange); color:#fff; font-weight:800; font-size: 26px; padding: 16px 40px; border-radius: 16px; will-change: transform; }
`;

export const data = { sigs: SIGS2.map((c) => ({ from: c.from })), rew: REW, events: EVENTS.map((e) => ({ z0: e.z0, sc: e.sc, blur: e.blur, op: e.op, t: e.t })), reelH: 360, reelIdx: { r1: 3, r2: 4, r3: 6 } };
