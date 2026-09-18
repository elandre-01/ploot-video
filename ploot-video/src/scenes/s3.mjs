import { kin, label, esc, rng } from "../lib.mjs";

// A field of independent windows arriving from all four edges. The middle stays
// clear for the headline; later messages increase density around it, not in columns.
const R=rng(309), TOOLS=["CRM nuevo","Secuenciador","Scraper de leads","Panel de KPIs","Agenda automática","Enriquecimiento"];
const MESSAGES=["Hola Marta…","Seguimiento","Recordatorio","Re: demo","¿Lo viste?","Último intento","Propuesta v3","Otra campaña","Sin respuesta","Rebotado","Spam","Lista fría"];
export const CARDS=[];
for(let i=0;i<36;i++){
  const lead=i<6,theta=i<6?i*Math.PI/3:(i%12)*Math.PI/6+(i>=12?.11:0);
  const rx=lead?750:790+(i%3)*45,ry=lead?365:425+(i%4)*26;
  const w=lead?410:315+(i%3)*30,h=lead?240:156+(i%2)*34;
  const cx=960+Math.cos(theta)*rx,cy=540+Math.sin(theta)*ry;
  const arrival=lead?1+i*.125:1.68+1.04*(1-Math.pow(1-(i-6)/30,1.55));
  const edgeX=Math.abs(Math.cos(theta))>.45?Math.sign(Math.cos(theta))*640:Math.cos(theta)*190;
  const edgeY=Math.abs(Math.sin(theta))>.45?Math.sign(Math.sin(theta))*510:Math.sin(theta)*150;
  CARDS.push({id:`s3-field-${i}`,name:lead?TOOLS[i]:MESSAGES[(i-6)%MESSAGES.length],lead,
    x:Math.round(cx-w/2),y:Math.round(cy-h/2),w,h,rot:+(R()*12-6).toFixed(2),
    dx:Math.round(edgeX),dy:Math.round(edgeY),t:+arrival.toFixed(3),op:lead?1:.88+(i%3)*.05});
}
const card=c=>`<div id="${c.id}" class="card s3-window ${c.lead?'tool':'message'}" data-layout-allow-overlap style="left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h}px">
  <div class="s3-windowbar"><i></i><i></i><i></i><span data-layout-allow-overlap>${c.lead?'HERRAMIENTA':'MENSAJE'}</span></div>
  <b data-layout-allow-overlap>${esc(c.name)}</b>
  <div class="s3-window-lines" aria-hidden="true"><i></i><i></i></div>
  ${c.lead?'<span class="s3-window-action" aria-hidden="true"></span>':''}
</div>`;
const cal = `<div id="s3-cal" class="card cal p3d">
  <div class="calh"><span class="dot"></span><b>Septiembre</b><span class="calbtns"><span class="ghostb">Semana</span><span class="btn or">Crear</span></span></div>
  <div class="calg">
    <div class="corner"></div>${["L 14", "M 15", "X 16", "J 17", "V 18"].map((d) => `<div class="dh">${d}</div>`).join("")}
    ${["09:00", "10:00", "11:00", "12:00", "13:00", "16:00"].map((h) => `<div class="th">${h}</div>` + "<div class=\"cell\"></div>".repeat(5)).join("")}
  </div>
</div>`;

export const html = `
<div id="s3-p1" class="phase bg-orange">${kin("s3-t1","¿Y qué hacemos?",{pos:"center",color:"white"})}</div>
<div id="s3-p2" class="phase bg-light grid-light">
  <div id="s3-stage" class="stage"><div id="s3-field" class="cam">${CARDS.map(card).join('')}</div></div>
  <div id="s3-focus" aria-hidden="true"></div>
  ${kin("s3-t2","Más herramientas",{pos:"center",size:96})}
  ${kin("s3-t5","Más ruido",{pos:"center",size:116})}
  <div class="stage">${cal}</div>
  ${label("s3-t6","Cero reuniones")}
  <div id="s3-dark" class="veil dark"></div><div id="s3-dark2" class="layer" style="background:#f8f7ff;opacity:0;z-index:41"></div>
</div>
<div id="s3-p3" class="phase bg-light grid-light">${kin("s3-why", "Porque en B2B", {pos:"center", size:92})}</div>
`;
export const css = `
.s3-window { opacity:0; display:flex; flex-direction:column; padding:22px 24px; border-radius:20px; box-shadow:0 20px 44px #2b26401b; }
.s3-windowbar { display:flex; align-items:center; gap:5px; margin-bottom:18px; }
.s3-windowbar>i { width:7px; height:7px; border-radius:50%; background:#cecbdc; }
.s3-windowbar>span { margin-left:auto; color:var(--ink2); font:600 11px "IBM Plex Mono",monospace; letter-spacing:.15em; }
.s3-window b { font-size:27px; letter-spacing:-.025em; white-space:nowrap; }
.s3-window.message b { font-size:25px; }
.s3-window-lines { display:grid; gap:10px; margin-top:18px; }
.s3-window-lines i { display:block; height:9px; width:88%; border-radius:6px; background:#e7e5f0; }
.s3-window-lines i:last-child { width:62%; }
.s3-window-action { align-self:flex-end; width:75px; height:22px; background:#eae6ff; border-radius:6px; margin-top:auto; }
#s3-field { transform-origin:960px 540px; }
#s3-focus { position:absolute; inset:0; pointer-events:none; z-index:20; background:radial-gradient(ellipse 38% 21% at 50% 50%,#f2f0ff 0%,#f2f0fff2 57%,#f2f0ff00 100%); }
#s3-t2 { font-size:96px; } #s3-t5 { font-size:116px; }
#s3-t5 .w:last-child { color:var(--orange-text); }
#s3-dark { opacity:0; z-index:40; background:#f8f7ff; }
.cal { left: 410px; top: 230px; width: 1100px; height: 620px; border-radius: 22px; padding: 26px 30px; display:flex; flex-direction:column; opacity: 0; }
.calh { display:flex; align-items:center; gap: 12px; margin-bottom: 18px; }
.calh .dot { width: 14px; height: 14px; border-radius: 4px; background: var(--blue); }
.calh b { font-size: 20px; font-weight: 800; }
.calbtns { margin-left:auto; display:flex; gap: 10px; align-items:center; }
.ghostb { font-size: 14px; color: var(--ink2); font-weight: 700; padding: 8px 14px; border: 1.5px solid var(--line); border-radius: 8px; }
.btn.or { background: var(--orange-text); font-size: 14px; padding: 8px 16px; }
.calg { flex:1; display:grid; grid-template-columns: 90px repeat(5, 1fr); grid-template-rows: 44px repeat(6, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.calg .dh { font-family:"IBM Plex Mono", monospace; font-size: 13px; letter-spacing: .1em; color: var(--ink2); display:flex; align-items:center; justify-content:center; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #fafafe; }
.calg .corner { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.calg .th { font-family:"IBM Plex Mono", monospace; font-size: 12px; color: var(--ink3); display:flex; align-items:center; justify-content:center; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.calg .cell { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
`;
export const data={cards:CARDS};
