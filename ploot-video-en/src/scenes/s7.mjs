import { kin, label, cursor, avatar, PEOPLE, fires, esc } from "../lib.mjs";

// ---------- Ploot dashboard ----------
const NAV1 = ["Leads", "Campaigns", "Inbox"], NAV2 = ["Posts", "Calendar", "Analytics", "Knowledge"];
const TASKS = [["Weekly recap", "View →"], ["Tell us about your week", "Reply →"], ["Publish weekly posts", "View week →"]];
const METRICS = [["LEADS GENERATED", "157", "+14 in 24 h", true], ["ACTIVE PIPELINE", "24", "+7 this week", true], ["IMPRESSIONS", "460,965", "+303% vs last month", true], ["ENGAGEMENT", "1.2%", "+53% vs last month", true]];
const RETOS = [["Publish 2 posts", "+2"], ["Reach 4,000 impressions", "+2"], ["Gain 20 followers", "+2"]];
const dash = `<div id="s7-dash" class="card dash p3d">
  <div class="dside">
    <div class="dlogo"><i></i>Ploot</div>
    <div class="dnav on"><i></i>Home</div>
    <div class="dsec">PIPELINE</div>
    ${NAV1.map((n) => `<div class="dnav"><i></i>${n}</div>`).join("")}
    <div class="dsec">CONTENT</div>
    ${NAV2.map((n) => `<div class="dnav"><i></i>${n}</div>`).join("")}
  </div>
  <div class="dmain">
    <div class="dtop"><span class="dtime" data-layout-allow-overlap>Tuesday, September 15 · Álvaro</span></div>
    <div class="dgrid">
      <div class="dlead">
        <h3 data-layout-allow-overlap>157 leads await your decision</h3>
        <div class="drow">
          ${avatar(PEOPLE.xavier.av, { size: 52, live: false })}
          <div class="dwho">
            <b>${PEOPLE.xavier.name}<span class="inb">in</span></b>
            <span>Co-founder · Head of Recruitment</span>
            <span class="dtags"><em class="or">Commented on a target profile</em><em>Human Resources</em></span>
            <span class="dscore"><em>82</em>View profile →</span>
          </div>
          <span class="dacts"><i class="gr"><svg viewBox="0 0 24 24" aria-label="Accept lead"><path d="m5 12 4 4L19 6"/></svg></i><i class="or"><svg viewBox="0 0 24 24" aria-label="Reject lead"><path d="m7 7 10 10M17 7 7 17"/></svg></i></span>
        </div>
      </div>
      <div class="dtasks"><span class="eyebrow ink">TODAY’S TASKS</span>${TASKS.map(([t, a]) => `<div class="task"><i></i><span data-layout-allow-overlap>${t}</span><em data-layout-allow-overlap>${a}</em></div>`).join("")}</div>
    </div>
    <div class="dmetrics">${METRICS.map(([l, v, d, up]) => `<div><span class="eyebrow ink" data-layout-allow-overlap>${l}</span><b data-layout-allow-overlap>${v}</b><span class="dd ${up ? "up" : ""}" data-layout-allow-overlap>${d}</span></div>`).join("")}</div>
    <div class="dgrid2">
      <div class="drank"><span class="rh"><span class="eyebrow ink">RANKING</span><em>View leaderboard →</em></span>${[[PEOPLE.marc, "24 points", "+24", false], [PEOPLE.angela, "18 points", "+18", true]].map(([p, pt, v, hi]) => `<div class="rrow ${hi ? "hi" : ""}">${avatar(p.av, { size: 34, live: false })}<div><b data-layout-allow-overlap>${p.name}</b><span data-layout-allow-overlap>${pt}</span></div><em data-layout-allow-overlap>${v}</em></div>`).join("")}</div>
      <div class="dretos"><span class="rh"><span class="eyebrow ink">WEEKLY CHALLENGES</span><em class="c">0/3</em></span>${RETOS.map(([t, v]) => `<div class="reto"><i></i><span data-layout-allow-overlap>${t}</span><em data-layout-allow-overlap>${v}</em></div>`).join("")}</div>
    </div>
  </div>
  <span class="dchatbtn" id="s7-chatbtn"><img src="assets/brand/icon-white.png" alt=""></span>
</div>`;



// ---------- Clara's profile ----------
const cprofile = `<div id="s7-cprof" class="card cprof p3d">
  <div class="cover"></div>
  <div class="cav"><img src="assets/avatars/av09.jpg" alt=""><span class="gold" id="s7-gold"></span></div>
  <span class="tv" id="s7-tv">★ TOP VOICE</span>
  <div class="cbody"><b>${PEOPLE.clara.name}</b><span class="role">${PEOPLE.clara.role}</span><div class="fol"><b id="s7-fol">1,240</b> followers</div><div class="ptabs"><span class="on">Posts</span><span>Activity</span><span>About</span></div></div>
</div>`;

// ---------- leads list (storyboard 7.14 – 7.16) ----------
const LEADS = [
  [PEOPLE.alfred, 2, "Head of Communications", "HourMave"],
  [PEOPLE.noemi,  3, "Sales Manager",          "Lumen"],
  [PEOPLE.carlos, 1, "Sales Director",         "Radiantsky"],
  [PEOPLE.javier, 3, "Brand Strategist",       "Luce Innovative"],
  [PEOPLE.nuria,  2, "Digital Marketing Manager", "Decathlon"],
  [PEOPLE.xavier, 3, "Operations Director", "Recuit"],
];
const leads = `<div id="s7-leads" class="leads p3d">
  ${LEADS.map(([p, f, title, co], i) => `<div class="lrow ${f === 3 ? "hot" : ""}" id="s7-lr-${i}" data-f="${f}">
    <span class="cbx"></span>
    ${avatar(p.av, { size: 44, live: false })}
    <div class="who"><b>${esc(p.name)}</b><span>${esc(title)}</span><span class="co"><i></i>${esc(co)}</span></div>
    <div class="bars"><i style="width:82%"></i><i style="width:54%"></i></div>
    <span class="fires">${[0, 1, 2].map((k) => `<i class="${k < f ? "on" : ""}"></i>`).join("")}</span>
    <span class="pl lav"></span><span class="pl or"></span>
    <span class="seg"><i class="gr"></i><i class="am"></i></span>
    <span class="lst"><span class="old" data-layout-allow-overlap>Potential lead</span><span class="new" data-layout-allow-overlap>In contact</span></span>
    <span class="ideal">Right moment</span>
  </div>`).join("")}
</div>`;

// One recipient, one sent message. Paragraphs reveal as meaningful units.
const MESSAGE = [
  "Hi Noemí, thanks for |following me|.",
  "I noticed you have an |open sales role|. We’ve helped teams like yours book |12 sales meetings| in a month.",
  "Would you like to hear how?",
];
const messageHtml = MESSAGE.map((paragraph, i) => `<p id="s7-par-${i}">${paragraph.split("|").map((part,k)=>k%2?`<strong>${esc(part)}</strong>`:esc(part)).join("")}</p>`).join("");
const sendIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 14-7-5 14-3-6-6-1Z"/><path d="m11 13 8-8"/></svg>';
const conversation = `<div id="s7-a" class="card chan p3d in">
  <div class="chh">${avatar(PEOPLE.noemi.av,{size:56,live:false})}<div class="chw"><b>${PEOPLE.noemi.name}</b><span>${PEOPLE.noemi.role}</span></div><span class="channel-tag in"><span class="channel-icon">in</span>LinkedIn</span></div>
  <div class="thread">
    <span class="chat-date">Today · 10:24</span>
    <div class="msg me" data-side="outgoing" id="s7-a-msg"><div class="cht">${messageHtml}</div><span class="meta sent" id="s7-a-stamp">✓✓ Sent · 10:24</span></div>
    <div class="msg them" data-side="incoming" id="s7-a-reply">${avatar(PEOPLE.noemi.av,{size:38,live:false})}<div><div class="bub2">Yes, tell me more. Does Thursday at 11:00 work for you?</div><span class="meta">Noemí · 10:33</span></div></div>
  </div>
  <div class="chat-compose"><span>Write a message…</span><span class="chat-attach">+</span><span class="chat-send" id="s7-send">${sendIcon}</span></div>
</div>`;

// ---------- week calendar ----------
// Names sampled from the public Ploot calendar mockup; Noemí connects this demo to the chat.
const MEET = [
  [3,2,"11:00", "Noemí Herrero"], [0,0,"09:00","Javier Nieto"],
  [1,1,"10:00","Nuria Blanco"], [2,0,"09:00","Elena Campos"],
  [4,1,"10:00","Sergio Lara"], [0,3,"12:00","Carla Soler"],
  [2,3,"12:00","Hugo Serrano"], [1,4,"15:00","Raquel Vidal"],
  [3,0,"09:00","Irene Molina"], [4,4,"15:00","Pablo Ortega"],
  [0,5,"16:00","Diego Herrera"], [2,5,"16:00","Laura Fuentes"],
];
const week = `<div id="s7-week" class="card week p3d">
  <div class="wh"><span class="eyebrow ink">YOUR WEEK</span><b>September</b></div>
  <div class="wg">${["MON 14", "TUE 15", "WED 16", "THU 17", "FRI 18"].map((d) => `<div class="dh">${d}</div>`).join("")}${Array.from({ length: 30 }, (_,i) => `<div class="cell" style="grid-column:${i%5+1};grid-row:${Math.floor(i/5)+2}"></div>`).join("")}
    ${MEET.map(([d, r, t, n], i) => `<div class="meet" id="s7-meet-${i}" style="grid-column:${d+1};grid-row:${r+2}"><b>${t} · Demo</b><span>${n}</span></div>`).join("")}
  </div>
  <div class="wf2"><span class="chip green" id="s7-agend">● Demos confirmed</span><span class="resp"><b id="s7-resp">0</b> meetings this week</span></div>
</div>`;

export const html = `
<div id="s7-p1" class="phase bg-light grid-light">
  <div id="s7-title-scrim" class="layer"></div>
  ${kin("s7-t0", "One", { pos: "center", size: 132 })}
  ${kin("s7-t1", "We turn your team’s knowledge")}
  <div id="s7-cam0" class="cam" style="transform-origin:960px 540px">
    <div class="stage">${dash}</div>
    ${cursor("s7-cur0", { x: 1560, y: 1120, size: 48 })}
  </div>
</div>

<div id="s7-p2" class="phase bg-light grid-light">
  ${kin("s7-t2", "We turn your team’s knowledge")}
  ${label("s7-t3", "Into an audience")}
  <div id="s7-cam2" class="cam" style="transform-origin:960px 540px">
    <div class="stage">${cprofile}</div>
  </div>
</div>

<div id="s7-p3" class="phase bg-light grid-light">
  ${kin("s7-t4", "Two", { pos: "center", size: 132 })}
  ${kin("s7-t5", "We detect every buying signal")}
  ${label("s7-t6", "And act within minutes")}
  <div id="s7-cam3" class="cam" style="transform-origin:960px 407px"><div class="stage">${leads}</div></div>
</div>

<div id="s7-p4" class="phase bg-light grid-light">
  ${kin("s7-t7", "Three", { pos: "center", size: 132 })}
  ${label("s7-t8", "We reach out to the lead")}
  ${label("s7-t9", "At the right moment")}
  <div id="s7-chips" class="chips"><span class="chip green" id="s7-chip1">● Message sent</span></div>
  ${label("s7-t10", "To book you a meeting")}
  <div id="s7-cam4" class="cam" style="transform-origin:960px 560px"><div class="stage"><div id="s7-chat-float" class="s7-float">${conversation}</div></div><div class="stage"><div id="s7-week-float" class="s7-float">${week}</div></div></div>
</div>

`;

export const css = `
.s7-float { position:absolute; inset:0; transform-style:preserve-3d; }
#s7-chips { top:190px; }
.step { top: 44px; opacity: 0; }
#s7-title-scrim { height:270px; bottom:auto; z-index:20; opacity:0; pointer-events:none; background:linear-gradient(to bottom,#fafaff 0%,#f8f7ff 62%,rgba(248,247,255,0) 100%); }
#s7-p1 .kin.top, #s7-p2 .kin.top { top: 86px; }
#s7-p3 .kin.top, #s7-p4 .kin.top { top: 64px; }
.dash { left: 222px; top: 226px; width: 1476px; height: 716px; border-radius: 22px; display:grid; grid-template-columns: 262px 1fr; overflow: hidden; opacity: 0; background: #fff; }
.dside { background: #fff; border-right: 1px solid var(--line); padding: 24px 20px; display:flex; flex-direction:column; gap: 4px; }
.dlogo { display:flex; align-items:center; gap: 10px; font-size: 19px; font-weight: 800; margin-bottom: 18px; }
.dlogo i { width: 20px; height: 20px; border-radius: 6px; background: var(--orange); }
.dsec { font-family:"IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .18em; color: var(--ink3); margin: 16px 0 6px; }
.dnav { display:flex; align-items:center; gap: 11px; font-size: 15px; color: var(--ink2); padding: 8px 10px; border-radius: 9px; }
.dnav i { width: 11px; height: 11px; border-radius: 50%; border: 1.5px solid #cfccdb; }
.dnav.on { background: #fdece7; color: var(--ink); font-weight: 700; } .dnav.on i { background: var(--orange); border-color: var(--orange); }
.dmain { padding: 22px 30px; display:flex; flex-direction:column; gap: 15px; background: #fbfbfe; }
.dtop { display:flex; justify-content:flex-start; } .dtime { font-size: 13px; color: var(--ink3); }
.dgrid { display:grid; grid-template-columns: 1.55fr 1fr; gap: 16px; }
.dlead, .dtasks, .drank, .dretos, .dmetrics > div { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; }
.dlead h3 { font-size: 22px; font-weight: 800; letter-spacing: -.02em; margin-bottom: 14px; }
.drow { display:flex; align-items:flex-start; gap: 14px; }
.dwho { display:flex; flex-direction:column; gap: 4px; flex: 1; }
.dwho b { font-size: 17px; font-weight: 800; display:flex; align-items:center; gap: 8px; }
.dwho .inb { background: var(--blue); color: #fff; font-size: 11px; border-radius: 4px; padding: 1px 5px; font-family:"Manrope"; }
.dwho > span { font-size: 13px; color: var(--ink2); }
.dtags { display:flex; gap: 8px; margin-top: 4px; } .dtags em { font-style: normal; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: #f1f0f6; color: var(--ink2); }
.dtags em.or { background: #fdece7; color: var(--orange-text); }
.dscore { display:flex; align-items:center; gap: 10px; margin-top: 6px; font-size: 12px; color: var(--orange-text); font-weight: 700; }
.dscore em { font-style: normal; background: var(--orange); color: #fff; border-radius: 6px; padding: 2px 7px; font-family:"IBM Plex Mono", monospace; font-size: 12px; }
.dacts { display:flex; gap: 8px; } .dacts i { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--green); } .dacts i { display:grid; place-items:center; background:#e8f6ed; color:#159447; } .dacts i.or { border-color:#dc4040; color:#dc4040; background:#fff0f0; } .dacts svg { width:20px; height:20px; fill:none; stroke:currentColor; stroke-width:2.8; stroke-linecap:round; stroke-linejoin:round; }
.dtasks { display:flex; flex-direction:column; gap: 10px; }
.task { display:flex; align-items:center; gap: 10px; font-size: 13px; }
.task i { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid #cfccdb; flex: none; }
.task span { flex: 1; color: var(--ink); } .task em { font-style: normal; font-size: 12px; font-weight: 700; color: var(--orange-text); }
.dmetrics { display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.dmetrics > div { display:flex; flex-direction:column; gap: 3px; }
.dmetrics b { font-size: 28px; font-weight: 800; letter-spacing: -.02em; }
.dmetrics .dd { font-size: 11px; color: var(--ink3); } .dmetrics .dd.up { color: #167a49; font-weight: 700; }
.dgrid2 { display:grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
.rh { display:flex; align-items:center; justify-content:space-between; margin-bottom: 10px; }
.rh em { font-style: normal; font-size: 12px; font-weight: 700; color: var(--orange-text); } .rh em.c { color: var(--ink3); font-family:"IBM Plex Mono", monospace; }
.rrow { display:flex; align-items:center; gap: 11px; padding: 7px 9px; border-radius: 10px; }
.rrow.hi { background: #fdece7; }
.rrow div { display:flex; flex-direction:column; flex: 1; } .rrow b { font-size: 14px; font-weight: 800; } .rrow span { font-size: 11px; color: var(--ink3); }
.rrow em { font-style: normal; font-size: 13px; font-weight: 800; color: #167a49; }
.dretos { display:flex; flex-direction:column; }
.reto { display:flex; align-items:center; gap: 10px; font-size: 13px; padding: 6px 0; }
.reto i { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid #cfccdb; flex: none; }
.reto span { flex: 1; } .reto em { font-style: normal; font-size: 11px; font-weight: 800; color: var(--orange-text); background: #fdece7; border-radius: 999px; padding: 3px 8px; }
.dchatbtn { position:absolute; right: 22px; bottom: 20px; width: 52px; height: 52px; border-radius: 50%; background: var(--orange); display:flex; align-items:center; justify-content:center; box-shadow: 0 10px 24px rgba(244,54,0,.35); }
.dchatbtn img { width: 26px; }
.cprof { left: 520px; top: 176px; width: 840px; height: 760px; border-radius: 20px; overflow: hidden; opacity: 0; }
.cprof .cover { height: 170px; background: linear-gradient(120deg, #dfe6ff, #c7d3ff); }
.cprof .cav { position:absolute; left: 40px; top: 100px; width: 150px; height: 150px; border-radius: 50%; }
.cprof .cav img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 5px solid #fff; }
.cprof .gold { position:absolute; inset: -8px; border-radius: 50%; border: 5px solid var(--gold); box-shadow: 0 0 24px rgba(224,168,50,.6); opacity: 0; }
.cprof .tv { position:absolute; left: 62px; top: 262px; background: var(--gold); color: #fff; font-weight: 800; font-size: 12px; letter-spacing: .12em; padding: 6px 12px; border-radius: 999px; opacity: 0; }
.cprof .cbody { padding: 150px 40px 0; display:flex; flex-direction:column; gap: 6px; }
.cprof .cbody > b { font-size: 32px; font-weight: 800; letter-spacing: -.02em; }
.cprof .role { font-size: 16px; color: var(--ink2); }
.cprof .fol { font-size: 18px; margin-top: 8px; color: var(--ink2); } .cprof .fol b { font-size: 34px; font-weight: 800; color: var(--orange); letter-spacing: -.02em; font-family:"IBM Plex Mono", monospace; }
.cprof .ptabs { display:flex; gap: 26px; margin-top: 18px; border-bottom: 1px solid var(--line); padding-bottom: 12px; font-size: 16px; color: var(--ink2); font-weight: 600; }
.cprof .ptabs .on { color: var(--ink); border-bottom: 3px solid var(--ink); padding-bottom: 12px; margin-bottom: -13px; }
.leads { position:relative; left: 270px; top: 236px; width: 1380px; display:flex; flex-direction:column; gap: 20px; opacity: 0; }
.lrow { position:relative; display:grid; grid-template-columns: auto auto 300px 1fr auto 120px 90px 78px 140px; align-items:center; gap: 20px; background: #fff; border-radius: 18px; padding: 13px 26px; box-shadow: var(--shadow); border: 3px solid transparent; }
.lrow .cbx { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #d6d3e2; }
.lrow .who { display:flex; flex-direction:column; gap: 2px; }
.lrow .who b { font-size: 17px; font-weight: 800; color: var(--orange-text); }
.lrow .who span { font-size: 12px; color: var(--ink2); }
.lrow .who .co { display:flex; align-items:center; gap: 6px; font-size: 11px; color: var(--ink3); }
.lrow .who .co i { width: 8px; height: 8px; border-radius: 50%; background: #cfccdb; }
.lrow .bars { display:flex; flex-direction:column; gap: 7px; } .lrow .bars i { height: 7px; border-radius: 4px; background: #e9e7f1; display:block; }
.lrow .fires { display:flex; gap: 7px; } .lrow .fires i { width: 19px; height: 19px; border-radius: 50%; background: #fbd5c8; } .lrow .fires i.on { background: var(--orange); }
.lrow .pl { height: 22px; border-radius: 999px; display:block; } .lrow .pl.lav { background: #e6e6fb; } .lrow .pl.or { background: var(--orange); }
.lrow .seg { display:flex; gap: 6px; } .lrow .seg i { width: 36px; height: 22px; border-radius: 999px; display:block; } .lrow .seg i.gr { background: #bfe6cf; } .lrow .seg i.am { background: #f8ddb0; }
.lst { position:relative; font-size: 13px; font-weight: 700; color: var(--ink2); display:flex; justify-content:flex-end; }
.lst .new { position:absolute; right: 0; top: -4px; background: #dff5e9; color: #167a49; padding: 4px 12px; border-radius: 999px; opacity: 0; }
.lrow .ideal { position:absolute; right: 150px; top: -13px; background: var(--orange-text); color: #fff; font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: 999px; opacity: 0; letter-spacing: .04em; }
.chan { width: 1160px; height: 714px; border-radius: 24px; padding: 0; display:flex; flex-direction:column; overflow:hidden; opacity: 0; background:#fff; border:1px solid #e5e3e9; box-shadow: 0 22px 58px rgba(23,21,22,.075), 0 2px 5px rgba(23,21,22,.025); }
#s7-a { left: 380px; top: 246px; }
.chh { display:flex; align-items:center; gap: 15px; padding: 22px 28px; border-bottom: 1px solid #eeedf0; flex:none; }
.chh .chw { display:flex; flex-direction:column; flex: 1; gap: 4px; } .chh .chw b { font-size: 23px; font-weight: 750; letter-spacing:-.02em; } .chh .chw span { font-size: 14px; color: #747079; }
.channel-tag { display:flex; align-items:center; gap:8px; border:1px solid #e6e5eb; border-radius:999px; padding:9px 13px; font-size:14px; font-weight:700; color:#49464f; background:#fafafa; }
.channel-icon { width:21px; height:21px; display:flex; align-items:center; justify-content:center; }
.channel-tag.in .channel-icon { background:#0a66c2; color:#fff; font-size:15px; border-radius:3px; }
.channel-icon svg { width:23px; height:23px; }
.thread { flex: 1; min-height:0; display:flex; flex-direction:column; justify-content:flex-start; gap: 17px; padding: 19px 28px 16px; background:#fbfafb; }
.chat-date { align-self:center; color:#77717b; font-size:12px; letter-spacing:.015em; flex:none; }
.msg { display:flex; gap: 10px; max-width: 94%; flex:none; }
.msg[data-side="outgoing"] { align-self: flex-end; flex-direction:column; align-items:flex-end; gap: 8px; }
.msg.me .cht { position:relative; background: #fff0e9; border:1px solid #f9e1d5; border-radius: 18px 18px 5px 18px; padding: 19px 23px; font-size: 25px; line-height: 1.5; color: #343039; letter-spacing: -.012em; transform-origin:100% 100%; }
.cht p { opacity:0; margin:0 0 17px; } .cht p:last-child { margin-bottom:0; } .cht strong { color:#b53213; font-weight:750; } .cht .tok { border-radius: 4px; padding: 0; display:inline; font-weight:700; }
.cht .tok.lit { color: #b53213; font-weight: 700; }
.caret { position:absolute; left:0; top:0; display:block; width: 2px; height: 20px; background: var(--orange); opacity: 0; border-radius: 2px; }
.msg .meta { display:flex; align-items:center; gap: 6px; font-size: 12px; color: #76717d; font-weight: 500; padding:0 3px; }
.msg .meta.sent { opacity: 0; color: #49705c; } .msg .meta.sent svg { width:19px; height:14px; }
.msg[data-side="incoming"] { align-self: flex-start; opacity: 0; align-items:flex-start; }
.msg.them > .av { flex:none; margin-top:5px; }
.msg.them > div:not(.av) { display:flex; flex-direction:column; gap: 8px; }
.bub2 { background: #fff; border:1px solid #e6e3e9; border-radius: 18px 18px 18px 5px; padding: 15px 19px; font-size: 21px; color: #343039; line-height: 1.4; letter-spacing:-.014em; transform-origin:0 100%; }
.chat-compose { display:flex; align-items:center; gap:16px; padding:16px 24px; border-top:1px solid #eeedf0; flex:none; }
.chat-compose > span:first-child { flex:1; font-size:16px; color:#7e7884; }
.chat-attach { color:#817b86; font-size:28px; font-weight:400; }
.chat-send { display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:12px; background:var(--orange); color:#fff; }
.chat-send svg { width:23px; height:23px; }
.chips { position:absolute; left: 0; right: 0; top: 96px; display:flex; justify-content:center; gap: 16px; z-index: 30; }
.chip.green { background: #dff5e9; color: #167a49; font-weight: 800; font-size: 20px; padding: 10px 20px; border-radius: 999px; opacity: 0; display:inline-block; }
.week { left: 240px; top: 236px; width: 1440px; height: 710px; will-change: transform; border-radius: 20px; padding: 24px 30px; opacity: 0; display:flex; flex-direction:column; }
.wh { display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; } .wh b { font-size: 16px; }
.wg { position:relative; flex: 1; display:grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: 44px repeat(6, minmax(0,1fr)); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.wg .dh { grid-row:1; font-family:"IBM Plex Mono", monospace; font-size: 13px; color: var(--ink2); display:flex; align-items:center; justify-content:center; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #fafafe; }
.wg .cell { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.meet { position:relative; z-index:1; margin:4px; padding:8px 12px; min-width:0; border-radius:9px; background:#fff0e8; border-left:4px solid var(--orange); color:var(--ink); display:flex; flex-direction:column; justify-content:center; gap:5px; opacity:0; }
.meet b { font-size:18px; color:var(--orange-text); } .meet span { font-size:17px; white-space:nowrap; font-weight:650; }
#s7-meet-0 { background:var(--orange-text); color:#fff; } #s7-meet-0 b { color:#fff; }
.wf2 { display:flex; justify-content:space-between; align-items:center; margin-top: 14px; }
.wf2 .chip.green { font-size: 15px; padding: 7px 14px; }
.resp { font-size: 15px; color: var(--ink2); } .resp b { color: var(--orange); font-family:"IBM Plex Mono", monospace; }
`;

export const data = { paragraphs: MESSAGE.length, meetings: MEET.length, leads: LEADS.map(([, f]) => f) };
