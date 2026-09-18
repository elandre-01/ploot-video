// Bloque de ejemplo. Un bloque = una idea del guion, y se escribe en dos ficheros:
// éste (markup + css + data) y src/tl/s1.js (el movimiento).
//
// Reglas del markup que el movimiento da por supuestas:
//  · Cada FASE del bloque es un `.phase` (opacity 0 de serie). Se enciende con show()/hide().
//    Nunca dos fases visibles a la vez: el corte es hide(anterior) + show(siguiente) en el mismo frame.
//  · Un plano de UI que va a moverse en 3D vive dentro de `.stage` (perspectiva) y lleva `.p3d`.
//  · Una cámara de plano es un `.cam` con su `transform-origin` puesto en el punto de interés.
//  · Lo que se pincha lleva un burst dentro (withBurst) para que el anillo herede sus transforms.
//  · Los componentes de lib.mjs que usan imágenes (avatar, sigCard…) necesitan que el archivo
//    exista: avatar() busca assets/avatars/avNN.jpg. Mientras no los tengas, usa marcadores CSS
//    como el de abajo; el lint avisa de cualquier asset que falte.
import { kin, label, cursor, withBurst } from "../lib.mjs";

const panel = `<div id="s1-panel" class="card p3d" style="left:360px;top:220px;width:1200px;height:640px">
  <div class="ph"><span class="eyebrow">PANEL</span><h3>Titular del panel</h3></div>
  <div class="rows">
    ${[0, 1, 2].map((i) => `<div class="row" id="s1-row-${i}"><i class="dot"></i><b>Fila ${i + 1}</b><span>detalle</span></div>`).join("")}
  </div>
  ${withBurst(`<span class="btn or" id="s1-cta">Empezar</span>`, "s1-cta-burst")}
</div>`;

export const html = `
<div id="s1-p1" class="phase bg-dark grid-dark">
  ${kin("s1-t1", "La frase que abre", { pos: "center", color: "white", size: 112 })}
</div>

<div id="s1-p2" class="phase bg-light grid-light">
  ${label("s1-t2", "La frase que acompaña al panel")}
  <div id="s1-cam" class="cam" style="transform-origin:960px 540px">
    <div class="stage">${panel}</div>
    ${cursor("s1-cur", { x: 1560, y: 1120, size: 96 })}
  </div>
</div>
`;

export const css = `
#s1-panel .ph { padding: 28px 32px 0; }
#s1-panel .eyebrow { font-family:"IBM Plex Mono",monospace; font-size:13px; letter-spacing:.2em; color:var(--ink3); }
#s1-panel h3 { font-size:34px; font-weight:800; margin-top:6px; }
#s1-panel .rows { display:flex; flex-direction:column; gap:14px; padding:24px 32px; }
#s1-panel .row { display:flex; align-items:center; gap:16px; background:#faf9fe; border-radius:16px; padding:14px 18px; }
#s1-panel .row .dot { width:56px; height:56px; border-radius:50%; background:var(--line); flex:none; }
#s1-panel .row b { font-size:19px; font-weight:800; }
#s1-panel .row span { font-size:15px; color:var(--ink2); }
#s1-panel .btn.or { position:absolute; right:32px; bottom:28px; background:var(--orange); color:#fff; font-size:20px; font-weight:800; padding:14px 28px; border-radius:999px; }
`;

// Todo lo que el timeline necesite medir o recorrer se calcula aquí, en el build, con semilla fija.
export const data = { rows: 3 };
