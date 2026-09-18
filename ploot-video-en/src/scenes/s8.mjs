import { kin, label, cursor, avatar, PEOPLE, esc, burstSvg } from "../lib.mjs";

// ---------- the hook web, back as in frame 8.2: a landscape window, hero + «SHIPMENTS · TODAY» + stats ----------
const web8 = `<div id="s8-web" class="card nweb p3d">
  <div class="wbar"><i></i><i></i><i></i></div>
  <div class="wnav"><span class="brand" data-layout-allow-overlap><b></b>Nordika</span><span class="links" data-layout-allow-overlap><span>Product</span><span>Pricing</span><span>Case studies</span><span>Blog</span></span><span class="btn" data-layout-allow-overlap>Book a demo</span></div>
  <div class="nbody">
    <div class="nhero"><div class="eyebrow" data-layout-allow-overlap>SMART LOGISTICS</div><h2 data-layout-allow-overlap>B2B shipping. No surprises.</h2><div class="cta-row"><span class="btn" data-layout-allow-overlap>Get a quote</span><span class="ghost" data-layout-allow-overlap>See how it works</span></div></div>
    <div class="ncard"><span class="eyebrow ink" data-layout-allow-overlap>SHIPMENTS · TODAY</span>${[["MAD-0912", "out for delivery"], ["BCN-0447", "in warehouse"], ["VLC-0231", "delivered"]].map(([c, st]) => `<div class="nrow"><i></i><b data-layout-allow-overlap>${c}</b><span data-layout-allow-overlap>${st}</span></div>`).join("")}</div>
  </div>
  <div class="nstats">${[["98.4%", "on-time deliveries"], ["−22 %", "shipping cost"], ["48 h", "average transit time"]].map(([v, l]) => `<div><b data-layout-allow-overlap>${v}</b><span data-layout-allow-overlap>${l}</span></div>`).join("")}</div>
</div>`;
// visitors identified: a coloured pointer with a white pill — avatar, name and role (frame 8.2)
const vtag = (id, p, name, role, color, x, y) => `<div id="${id}" class="vtag" data-layout-allow-overlap style="left:${x}px;top:${y}px">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5 L21 10 L12.6 12.6 L10 21 Z" fill="${color}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>
  <span class="pill" id="${id}-tag">${avatar(p.av, { size: 38, live: false })}<span><b>${esc(name)}</b><em>${esc(role)}</em></span></span>
</div>`;
// his profile, as in frame 8.3: cover, big avatar, three fires + 92, the alert with «Escribir», the last signals
const vprofile = `<div id="s8-prof" class="card vprof">
  <div class="vcover"></div>
  <div class="vav">${avatar(PEOPLE.javier.av, { size: 96, live: false })}</div>
  <div class="vh"><div class="who"><b>Javier Durán</b><span>Brand Strategist · Luce Innovative</span></div><span class="vfires"><i></i><i></i><i class="lo"></i><b>92</b></span></div>
  <div class="alert" id="s8-alert"><i></i><div><b>Contact now</b><span>Third visit to your website in 24 h</span></div><span class="btn or small" id="s8-contact">Contact</span></div>
  <div class="sigs">
    ${[["Pricing page", "2 min ago"], ["Case study · industry", "9 min ago"], ["Compared your competitors", "yesterday"]].map(([sg, t]) => `<div class="srow2"><i></i><span>${sg}</span><em>${t}</em></div>`).join("")}
  </div>
</div>`;

export const html = `
<div id="s8-p1" class="phase bg-light grid-light">
  ${kin("s8-t1", "Stop chasing cold leads", { pos: "center", size: 92 })}
  ${kin("s8-t2", "Show up when they’re ready to buy")}
  <div class="stage">${web8}</div>
  ${vtag("s8-v2", PEOPLE.javier, "Javier Durán", "Brand Strategist", "#f43600", 1080, 440)}
  ${vtag("s8-v1", PEOPLE.irene, "Irene Salas", "Operations Director", "#2d5bff", 690, 720)}
  ${vtag("s8-v3", PEOPLE.lucia, "Lucía Ferrer", "Procurement", "#1fa463", 1330, 790)}
  <div id="s8-cam" class="cam" style="transform-origin:960px 540px"><div class="stage">${vprofile}</div></div>
  <div id="s8-ctawrap" class="ctawrap">
    <div class="ctabox">
      <span class="fring" id="s8-r1"></span><span class="fring b" id="s8-r2"></span>
      <svg class="ctaline" viewBox="0 0 600 108" xmlns="http://www.w3.org/2000/svg"><rect id="s8-ctapath" x="3" y="3" width="594" height="102" rx="51" fill="none" stroke="#f43600" stroke-width="5"/></svg>
      <span class="cta" id="s8-cta">Book a demo</span>
    </div>
    <span class="sub" id="s8-sub">and we’ll analyze your case</span>
  </div>
  ${cursor("s8-cur", { x: 1500, y: 1120, size: 96 })}
</div>

<div id="s8-p2" class="phase bg-orange">
  ${burstSvg("s8-burst", { size: 560, color: "#ffffff", seed: 9 })}
  <img id="s8-logo" src="assets/brand/logo-white.png" alt="Ploot">
</div>
`;

export const css = `
.nweb { left: 400px; top: 262px; width: 1120px; height: 900px; border-radius: 22px; overflow: hidden; opacity: 0; background: #fff; }
.nweb .wnav .btn { margin-left: auto; background: var(--ink); color: #fff; font-size: 14px; padding: 9px 18px; }
.nbody { display:grid; grid-template-columns: 1.35fr 1fr; gap: 26px; padding: 34px 36px 10px; }
.nhero h2 { font-size: 40px; font-weight: 800; letter-spacing: -.03em; line-height: 1.05; margin: 12px 0 22px; }
.nhero .eyebrow { color: var(--blue); }
.nhero .cta-row .btn { background: var(--blue); color: #fff; font-size: 14px; padding: 10px 20px; } .nhero .ghost { font-size: 14px; }
.ncard { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; display:flex; flex-direction:column; gap: 10px; align-self: start; }
.nrow { display:flex; align-items:center; gap: 10px; font-size: 13px; padding: 6px 0; border-top: 1px solid var(--line); }
.nrow:first-of-type { border-top: 0; } .nrow i { width: 26px; height: 26px; border-radius: 50%; background: #e9e7f1; } .nrow b { font-weight: 800; } .nrow span { color: var(--ink3); margin-left: auto; font-size: 12px; }
.nstats { display:grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding: 18px 36px; }
.nstats > div { border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; display:flex; flex-direction:column; gap: 4px; }
.nstats b { font-size: 26px; font-weight: 800; letter-spacing: -.02em; } .nstats span { font-size: 12px; color: var(--ink2); }
.vtag { position:absolute; z-index: 55; width: 44px; height: 44px; pointer-events: none; will-change: transform, opacity; opacity: 0; }
.vtag svg { width: 44px; height: 44px; display: block; }
.vtag .pill { position:absolute; left: 34px; top: 30px; display:flex; align-items:center; gap: 10px; background: #fff; border-radius: 999px; padding: 6px 18px 6px 6px; box-shadow: 0 12px 30px rgba(23,21,22,.16); white-space: nowrap; }
.vtag .pill > span { display:flex; flex-direction:column; } .vtag .pill b { font-size: 15px; font-weight: 800; line-height: 1.1; } .vtag .pill em { font-style: normal; font-size: 12px; color: var(--ink3); }
.vprof { left: 500px; top: 246px; width: 920px; border-radius: 26px; overflow: hidden; opacity: 0; padding: 0 0 24px; display:flex; flex-direction:column; }
.vcover { height: 132px; background: linear-gradient(120deg, #dfe6ff, #c7d3ff); }
.vav { position:absolute; left: 32px; top: 78px; border-radius: 50%; border: 5px solid #fff; box-shadow: 0 8px 22px rgba(23,21,22,.14); }
.vav .av { display:block; }
.vh { display:flex; align-items:flex-end; justify-content:space-between; padding: 14px 32px 0 154px; }
.vprof .who { display:flex; flex-direction:column; gap: 3px; } .vprof .who b { font-size: 24px; font-weight: 800; letter-spacing: -.02em; } .vprof .who span { font-size: 14px; color: var(--ink2); }
.vfires { display:flex; align-items:center; gap: 6px; } .vfires i { width: 18px; height: 18px; border-radius: 50%; background: var(--orange); } .vfires i.lo { background: #fbd5c8; }
.vfires b { font-size: 26px; font-weight: 800; color: var(--orange); margin-left: 10px; }
.vprof .alert { display:flex; align-items:center; gap: 14px; margin: 20px 32px 0; background: #fff3ee; border: 1.5px solid rgba(244,54,0,.35); border-radius: 16px; padding: 14px 18px; }
.vprof .alert > i { width: 14px; height: 14px; border-radius: 50%; background: var(--orange); flex: none; }
.vprof .alert > div { display:flex; flex-direction:column; flex: 1; } .vprof .alert b { font-size: 18px; font-weight: 800; color: var(--ink); } .vprof .alert span { font-size: 13px; color: var(--ink2); }
.vprof .alert .btn.or.small { font-size: 16px; padding: 11px 24px; background: var(--orange-text); color: #fff; border-radius: 999px; will-change: transform; }
.vprof .sigs { display:flex; flex-direction:column; gap: 8px; padding: 14px 32px 0; }
.srow2 { display:flex; align-items:center; gap: 12px; font-size: 15px; font-weight: 600; padding: 12px 16px; background: #f7f6fb; border-radius: 12px; }
.srow2 i { width: 12px; height: 12px; border-radius: 50%; background: var(--orange); } .srow2 span { flex: 1; } .srow2 em { font-style: normal; font-family:"IBM Plex Mono", monospace; font-size: 12px; color: var(--ink3); }
.ctawrap { position:absolute; inset: 0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 26px; opacity: 0; pointer-events:none; }
.ctabox { position:relative; width: 600px; height: 108px; }
.ctaline { position:absolute; inset: 0; width: 100%; height: 100%; overflow: visible; z-index: 3; }
#s8-ctapath { opacity: 0; }
.cta { position:absolute; inset: 0; display:flex; align-items:center; justify-content:center; background: var(--orange); color: #fff; font-weight: 800; font-size: 40px; border-radius: 999px; z-index: 2; will-change: transform; box-shadow: 0 20px 50px rgba(244,54,0,.35); opacity: 0; }
.ctawrap .sub { font-size: 30px; color: var(--ink2); font-weight: 600; opacity: 0; letter-spacing: -.01em; }
.ctawrap .fring { position:absolute; left: 50%; top: 50%; width: 600px; height: 108px; margin: -54px 0 0 -300px; }
#s8-logo { position:absolute; left: 50%; top: 50%; width: 520px; margin: -63px 0 0 -260px; opacity: 0; }
`;

export const data = {};
