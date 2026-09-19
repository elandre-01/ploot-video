import { kin, label, cursor, vcursor, sigCard, webPloot, webHook, webCompetitor, avatar, PEOPLE, esc } from "../lib.mjs";

// ---------- feed panel (5.2) · a big window with an inner list that scrolls ----------
const FEED = [
  [PEOPLE.alfred,  "Entra en tu web",                 "2s"],  [PEOPLE.daniel, "Vuelve a tu web",              "9s"],
  [PEOPLE.lucia,  "Visita tu perfil",                "14s"], [PEOPLE.pablo,  "Sigue a tu empresa",           "31s"],
  [PEOPLE.elena,  "Analiza a tu competencia",        "48s"], [PEOPLE.ivan,   "Busca una solución como la tuya", "1m"],
  [PEOPLE.nuria,  "Descarga tu caso de cliente",     "2m"],  [PEOPLE.hugo,   "Compara precios",              "3m"],
  [PEOPLE.clara,  "Abre tu último post",             "4m"],  [PEOPLE.marc,   "Visita tu página de precios",  "6m"],
  [PEOPLE.angela, "Guarda tu perfil",                "8m"],  [PEOPLE.carlos, "Ve tu vídeo de demo",          "11m"],
  [PEOPLE.xavier, "Vuelve a precios",                "14m"], [PEOPLE.javier, "Comparte tu post",             "19m"],
];
const feedPanel = `<div id="s5-panel" class="card fpanel p3d">
  <div class="fh"><span class="eyebrow ink">SEÑALES · HOY</span><span class="live">● EN VIVO</span></div>
  <div class="flist" id="s5-flist">
    <div class="fscroll" id="s5-fscroll">${FEED.map(([p, s, t], i) => `<div class="frow" id="s5-fr-${i}">${avatar(p.av, { size: 48, live: false })}<b>${esc(p.name)}</b><span class="sg"><i></i>${esc(s)}</span><span class="tm">${t}</span></div>`).join("")}</div>
    <span class="fsb"><i id="s5-fsbi"></i></span>
  </div>
  <div class="ft"><span class="eyebrow ink">TOTAL</span><b id="s5-total">128</b></div>
</div>`;

// ---------- profile (5.6–5.8) ----------
const profile = `<div id="s5-profile" class="card profile p3d">
  <div class="cover brand-banner"><img class="banner-source" src=".media/images/image_002.png" alt="Ploot: Convierte a tu Equipo en un Generador de Ventas"></div>
  <div class="pav"><img src="assets/brand/icon-orange.png" alt=""></div>
  <div class="pbody">
    <div class="pname"><b>Ploot</b><span class="ptag">Software · B2B</span></div>
    <div class="pdesc">La Herramienta que crea tu Estrategia para Atraer Clientes en LinkedIn.</div>
    <div class="pmeta">Madrid · 10 empleados · 8.412 seguidores</div>
    <div class="pbtns"><span class="btn blue fbtn2" id="s5-followbtn"><span class="l1">+ Seguir</span><span class="l2">Siguiendo</span></span><span class="ghostb">Visitar web</span><span class="ghostb more">···</span></div>
    <div class="ptabs"><span class="on">Información</span><span>Publicaciones</span><span>Empleos</span><span>Personas</span></div>
    <div class="pabout"><h3>Sobre Ploot</h3><p>Software de creación de contenido para LinkedIn enfocada a que potencies tu marca personal escribiendo y analizando tus posts.</p><p>Llevamos muchos meses escribiendo y analizando a los mejores creadores de contenido del mundo para poder ayudar a nuevos creadores de contenido en LinkedIn y a expertos a mejorar sus posts para que tengan:</p><div class="pbenefits"><span><i>✓</i> Más Autoridad</span><span><i>✓</i> Mejorar su Marca Personal</span><span><i>✓</i> Hacer que la Gente se Acuerden de ellos</span></div><p>Vamos a ser la mejor plataforma de creación de contenido del mundo y no vamos a parar hasta conseguirlo. Tenemos un muy buen equipo, las ganas y la disciplina para conseguirlo.</p></div>
  </div>
</div>`;

// ---------- signal cards (5.13–5.14, reused in 6.6) ----------
export const CARDS5 = [
  { p: PEOPLE.nuria,  s: "Entra en tu web",         t: "12s", x: 90,   y: 90,  r: -6 },
  { p: PEOPLE.daniel, s: "Ve tu perfil",            t: "34s", x: 720,  y: 56,  r: 4 },
  { p: PEOPLE.lucia,  s: "Te sigue",                t: "1m",  x: 1350, y: 96,  r: -5 },
  { p: PEOPLE.pablo,  s: "Comparte tu post",        t: "2m",  x: 40,   y: 470, r: 5 },
  { p: PEOPLE.elena,  s: "Analiza tu competencia",  t: "3m",  x: 1390, y: 476, r: -4 },
  { p: PEOPLE.ivan,   s: "Busca tu solución",       t: "4m",  x: 160,  y: 838, r: -5 },
  { p: PEOPLE.marta,  s: "Descarga tu caso",        t: "5m",  x: 760,  y: 866, r: 4 },
  { p: PEOPLE.hugo,   s: "Compara precios",         t: "6m",  x: 1360, y: 842, r: -6 },
];
export const cards5 = (prefix) => CARDS5.map((c, i) => sigCard(`${prefix}-${i}`, c.p, c.s, { x: c.x, y: c.y, rot: c.r, time: c.t, variant: "dot compact" })).join("");

// paper-plane «send» icon drifting between the cards (reference 19.32)
const plane = (id, size) => `<svg id="${id}" class="plane" data-layout-allow-overlap viewBox="0 0 24 24" style="left:0;top:0;width:${size}px;height:${size}px" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 20.5 L21.5 12 L2.5 3.5 L2.5 9.8 L15.5 12 L2.5 14.2 Z" fill="#fff" stroke="#4a4750" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const trails = `<svg id="s5-trails" class="layer" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path id="s5-tr1" d="M400 600 C 560 440, 800 400, 960 480" stroke="#f43600" stroke-width="5" stroke-linecap="round" opacity=".95"/>
  <path id="s5-tr2" d="M960 480 C 1130 370, 1360 390, 1520 520" stroke="#f43600" stroke-width="5" stroke-linecap="round" opacity=".95"/>
  <path id="s5-tr3" d="M1520 520 C 1300 760, 640 780, 400 600" stroke="#f43600" stroke-width="5" stroke-linecap="round" opacity=".95"/>
</svg>`;

export const html = `
<div id="s5-p1" class="phase bg-dark grid-dark">
  ${kin("s5-t1", "Y justo antes de comprar", { pos: "center", color: "white", size: 96 })}
</div>

<div id="s5-p2" class="phase bg-dark grid-dark">
  <div id="s5-light" class="layer bg-light grid-light" style="opacity:0"></div>
  <div class="stage">${feedPanel}</div>
  ${label("s5-t2", "Lo demuestran", { color: "white" })}
  <div id="s5-cam3" class="cam" style="transform-origin:1230px 302px">
    <div class="stage">${webPloot("s5-web", { x: 440, y: 230, cls: "p3d" })}</div>
    <div class="stage">${profile}</div>
    ${cursor("s5-cur1", { x: 1500, y: 1120, size: 60 })}
  </div>
  ${label("s5-t3", "Entran a tu web")}
  ${label("s5-t4", "Visitan tu perfil")}
  ${label("s5-t5", "Te siguen")}
  <div id="s5-follow" class="followwrap">
    <span class="fring" id="s5-fring1"></span><span class="fring b" id="s5-fring2"></span>
    <span class="fbtn" id="s5-follow-hero">Siguiendo</span>
  </div>
</div>

<div id="s5-p3" class="phase">
  <div id="s5-webs" class="layer" style="z-index:6">
    <div class="stage">
      <div id="s5-webs-g" class="p3d" style="left:0;top:0;width:1920px;height:1080px">
        <div id="s5-w-me" class="webwrap" style="left:160px;top:300px;width:478px;height:478px;--s:.46">${webHook("s5-w-me-web")}<div id="s5-w-hl" class="hlbox" style="width:502px;height:502px"></div></div>
        <div id="s5-w-a" class="webwrap" style="left:720px;top:306px;width:480px;height:465px;--s:.75">${webCompetitor("s5-w-a-web", "Competidor A")}</div>
        <div id="s5-w-b" class="webwrap" style="left:1280px;top:306px;width:480px;height:465px;--s:.75">${webCompetitor("s5-w-b-web", "Competidor B")}</div>
        <div class="wlabel" id="s5-wl-me" style="left:160px;top:262px">Tu web</div>
        <div class="wlabel" id="s5-wl-a" style="left:720px;top:262px">Competidor A</div>
        <div class="wlabel" id="s5-wl-b" style="left:1280px;top:262px">Competidor B</div>
      </div>
    </div>
    ${trails}
    ${vcursor("s5-u1", "Visitante · Madrid", "#2d5bff", { x: 400, y: 600 })}
    ${vcursor("s5-u2", "Visitante · Bilbao", "#7c5cff", { x: 960, y: 480 })}
    ${vcursor("s5-u3", "Visitante · Sevilla", "#1fa463", { x: 1520, y: 520 })}
  </div>
  ${label("s5-t6", "Analizan a tu competencia")}
  <div id="s5-orangeL" class="layer bg-orange" style="opacity:0;z-index:5">
    ${kin("s5-t7", "Son señales de compra", { pos: "center", color: "white", size: 96 })}
  </div>
  <div id="s5-lightL" class="layer bg-light grid-light" style="opacity:0">
    <div id="s5-veil" class="veil flat" style="opacity:0"></div>
    <div id="s5-cam14" class="cam" style="transform-origin:960px 540px">
      <div class="stage"><div id="s5-g14" class="cam p3d">${cards5("s5-c")}</div></div>
      ${cursor("s5-k1", { x: 0, y: 0, size: 34 })}${cursor("s5-k2", { x: 0, y: 0, size: 30 })}
      ${plane("s5-pl1", 44)}${plane("s5-pl2", 38)}
    </div>
    ${label("s5-t8", "Y nadie las ve", { extra: "center", size: 92 })}
    <div id="s5-dark" class="layer" style="background:#0b0b0d;opacity:0;z-index:40"></div>
  </div>
</div>

<div id="s5-p4" class="phase bg-dark"></div>
`;

export const css = `
.fpanel { left: 270px; top: 185px; width: 1380px; height: 990px; padding: 30px 44px 0; border-radius: 28px; display:flex; flex-direction:column; gap: 0; opacity: 0; }
.fpanel .fh { display:flex; justify-content:space-between; align-items:center; padding-bottom: 18px; }
.fpanel .fh .eyebrow { font-size: 14px; }
.fpanel .live { font-family:"IBM Plex Mono", monospace; font-size: 14px; letter-spacing: .14em; color: #167a49; font-weight: 600; }
.flist { position: relative; height: 560px; overflow: hidden; border-radius: 18px; background: #f4f4f6; padding: 4px 56px 4px 28px; }
.fscroll { will-change: transform; }
.frow { display:flex; align-items:center; gap: 20px; padding: 15px 0; border-top: 1px solid rgba(23,21,22,.08); opacity: 0; }
.frow:first-child { border-top: 0; }
.frow b { width: 220px; font-size: 22px; font-weight: 800; }
.frow .sg { display:flex; align-items:center; gap: 12px; font-size: 21px; font-weight: 600; flex: 1; }
.frow .sg i { width: 14px; height: 14px; border-radius: 50%; background: var(--orange); }
.frow .tm { font-family:"IBM Plex Mono", monospace; font-size: 15px; color: var(--ink3); }
.fsb { position:absolute; right: 14px; top: 14px; bottom: 14px; width: 8px; border-radius: 4px; background: rgba(23,21,22,.07); }
.fsb i { position:absolute; left: 0; top: 0; width: 8px; height: 40%; border-radius: 4px; background: rgba(23,21,22,.28); display:block; will-change: transform; }
.fpanel .ft { display:flex; justify-content:space-between; align-items:center; padding-top: 22px; border-top: 2px solid var(--ink); margin-top: 26px; }
.fpanel .ft .eyebrow { font-size: 14px; }
.fpanel .ft b { font-size: 46px; font-weight: 800; color: var(--orange); letter-spacing: -.02em; font-family:"IBM Plex Mono", monospace; }
.profile { left: 460px; top: 150px; width: 1000px; height: 840px; border-radius: 22px; overflow: hidden; opacity: 0; }
.profile .cover { height: 250px; background: #fff; }
.profile .cover img { display:block; width:100%; height:100%; object-fit:contain; }
.profile .brand-banner { position:relative; overflow:hidden; border-radius:22px 22px 0 0; background:radial-gradient(ellipse at 8% 90%,#f3bfb6,transparent 55%),radial-gradient(ellipse at 85% 80%,#fbe4df,transparent 70%),#fff; }
.profile .brand-banner .brand-banner-logo { position:absolute; left:30px; top:32px; width:210px; height:auto; object-fit:contain; }
.profile .brand-banner-heading { position:absolute; right:30px; top:88px; display:flex; flex-direction:column; align-items:flex-end; gap:10px; color:#171516; font-size:30px; font-weight:600; line-height:1.15; }
.profile .brand-banner-heading strong { background:var(--orange); color:white; padding:4px 10px 7px; font-size:37px; font-weight:800; line-height:1.08; }
.profile .pav { position:absolute; left: 40px; top: 180px; width: 140px; height: 140px; border-radius: 50%; background: #fff; border: 5px solid #fff; box-shadow: 0 6px 20px rgba(0,0,0,.12); display:flex; align-items:center; justify-content:center; }
.profile .pav img { width: 96px; }
.profile .pbody { padding: 90px 40px 0; display:flex; flex-direction:column; gap: 10px; }
.profile .pname { display:flex; align-items:baseline; gap: 14px; }
.profile .pname b { font-size: 34px; font-weight: 800; letter-spacing: -.02em; }
.profile .ptag { font-size: 16px; color: var(--ink2); font-weight: 600; }
.profile .pdesc { font-size: 19px; font-weight: 600; }
.profile .pmeta { font-size: 15px; color: var(--ink2); }
.profile .pbtns { display:flex; gap: 12px; margin-top: 10px; align-items:center; }
.btn.blue { background: var(--blue); border-radius: 999px; padding: 11px 24px; font-size: 17px; will-change: transform; }
.fbtn2 { display: grid; place-items: center; }
.fbtn2 > span { grid-area: 1 / 1; white-space: nowrap; }
.fbtn2 .l2 { opacity: 0; }
#s5-followbtn { will-change:auto; }
#s5-follow-hero { opacity:0; display:flex; align-items:center; justify-content:center; padding:0; font-weight:700; will-change:auto; }
.profile .ghostb { border-radius: 999px; padding: 10px 20px; font-size: 16px; }
.profile .ghostb.more { padding: 10px 14px; }
.profile .ptabs { display:flex; gap: 26px; margin-top: 14px; border-bottom: 1px solid var(--line); padding-bottom: 12px; font-size: 16px; color: var(--ink2); font-weight: 600; }
.profile .ptabs .on { color: var(--ink); border-bottom: 3px solid var(--ink); padding-bottom: 12px; margin-bottom: -13px; }
.profile .ppost { display:flex; gap: 30px; margin-top: 12px; }
.profile .ppost .bars { flex: 1; padding-top: 6px; }
.profile .pstat { display:flex; flex-direction:column; gap: 2px; border: 1.5px solid var(--line); border-radius: 12px; padding: 12px 18px; }
.profile .pstat b { font-size: 26px; font-weight: 800; color: var(--orange); }
.profile .pstat span:last-child { font-size: 13px; color: var(--ink2); }
.followwrap { position:absolute; left: 0; top: 0; width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; opacity: 0; pointer-events:none; }
.fbtn { position:relative; background: var(--orange); color: #fff; font-weight: 800; font-size: 34px; padding: 22px 56px; border-radius: 999px; z-index: 2; will-change: transform; }
.fring { position:absolute; width: 330px; height: 106px; border-radius: 999px; background: rgba(244,54,0,.12); opacity: 0; }
.fring.b { background: rgba(249,120,72,.30); }
.hlbox { position:absolute; left: -12px; top: -12px; width: 648px; height: 648px; border: 4px solid var(--orange); border-radius: 22px; opacity: 0; }
.veil.flat { background: #f7f6ff; }
.plane { position: absolute; z-index: 61; pointer-events: none; will-change: transform, opacity; opacity: 0; }
.web .in-ico { position: relative; }
#s5-web-in { box-shadow: 0 0 0 0 rgba(244,54,0,0); }

/* Approved landing banner and full company About copy, 17 September. */
.profile .brand-banner { background:radial-gradient(ellipse at 8% 74%,#f3bfb6,transparent 49%),radial-gradient(ellipse at 84% 75%,#fbe4df,transparent 68%),#fff; }
.profile .brand-banner .banner-source { display:block; width:100%; height:100%; object-fit:contain; }
.profile .localized-banner .banner-source { position:absolute; inset:0; clip-path:inset(0 50% 16% 0); }
.profile .landing-heading { position:absolute; right:22px; top:55px; display:flex; flex-direction:column; align-items:flex-end; gap:10px; color:#080808; font-size:33px; font-weight:600; line-height:1.12; }
.profile .landing-heading strong { display:block; background:#e84324; color:#fff; padding:3px 7px 6px; font-size:41px; line-height:1.05; font-weight:800; }
.profile .landing-stats { position:absolute; bottom:0; left:0; right:0; height:40px; background:#e84324; color:#fff; display:flex; align-items:center; justify-content:flex-end; gap:15px; padding:0 28px; font-size:10px; font-weight:800; }
.profile .landing-stats span { display:flex; align-items:center; gap:3px; }
.profile .landing-stats b { font-size:23px; letter-spacing:-.8px; }
.profile .pbody { padding:80px 36px 0; gap:7px; }
.profile .pname b { font-size:32px; line-height:1.15; }
.profile .pdesc { font-size:18px; line-height:1.35; font-weight:600; }
.profile .pmeta { font-size:14px; line-height:1.3; }
.profile .pbtns { margin-top:5px; }
.profile .ptabs { margin-top:6px; padding-bottom:8px; }
.profile .ptabs .on { padding-bottom:8px; margin-bottom:-9px; }
.profile .pabout { font-size:13px; line-height:1.4; color:var(--ink2); }
.profile .pabout h3 { font-size:17px; color:var(--ink); margin:3px 0 7px; }
.profile .pabout p { margin-bottom:7px; }
.profile .pbenefits { display:flex; gap:16px; align-items:center; margin:7px 0; font-size:12px; font-weight:700; color:var(--ink); }
.profile .pbenefits i { display:inline-flex; align-items:center; justify-content:center; width:14px; height:14px; border-radius:3px; background:#159447; color:#fff; font-size:11px; font-style:normal; }
`;

export const data = { cards: CARDS5.map((c) => ({ x: c.x, y: c.y })), feedRows: FEED.length };
