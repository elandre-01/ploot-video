import { kin, avatar, PEOPLE, esc } from "../lib.mjs";

const INBOX = [[PEOPLE.sofia, "10:24"], [PEOPLE.daniel, "09:58"], [PEOPLE.lucia, "09:31"], [PEOPLE.pablo, "09:02"], [PEOPLE.nuria, "Yesterday"], [PEOPLE.ivan, "Yesterday"]];
const inbox = `<div id="s4-inbox" class="card inbox p3d">
  <div class="ih"><span class="eyebrow ink">INBOX</span><span class="cnt"><i></i>6 READ</span></div>
  ${INBOX.map(([p, t], i) => `<div class="irow" id="s4-ir-${i}">${avatar(p.av, { size: 84, live: false })}<div class="who"><b>${esc(p.name)}</b><span>${esc(p.role)}</span></div><span class="tm">${t}</span><span class="rd" id="s4-rd-${i}"><span class="ticks">✓✓</span> READ</span></div>`).join("")}
</div>`;

// relationship line: five phase cards
export const PH = [
  { t: "3 MONTHS AGO", s: "Visited your website", c: "Knows you" },
  { t: "2 MONTHS AGO", s: "Followed you", c: "Follows you" },
  { t: "3 WEEKS AGO", s: "Raised a funding round", c: "Opportunity detected" },
  { t: "6 DAYS AGO", s: "Saved your case study", c: "Trusts you" },
  { t: "TODAY", s: "BUYS", c: "" },
];
export const CW = 440, GAP = 140, X0 = 740; // card width, gap, first card left
const cardX = (i) => X0 + i * (CW + GAP);
const phase = (p, i) => `<div class="card rlc ${i === 4 ? "buy" : ""}" id="s4-ph-${i}" style="left:${cardX(i)}px;top:${i === 4 ? 448 : 420}px">
  <div class="top">${avatar(PEOPLE.adrian.av, { size: 44, live: false })}<div class="who"><b>${PEOPLE.adrian.name}</b><span>${PEOPLE.adrian.role}</span></div><span class="when">${p.t}</span></div>
  <div class="sig"><i></i>${esc(p.s)}</div>
  ${p.c ? `<div class="chk" id="s4-chk-${i}"><span class="ck">✓</span>${esc(p.c)}</div>` : ""}
</div>`;
const rings = `<div class="ring" id="s4-ring1" style="left:${cardX(4) - 30}px;top:418px"></div><div class="ring" id="s4-ring2" style="left:${cardX(4) - 30}px;top:418px"></div>`;
const LINE_Y = 540;

export const html = `
<div id="s4-p1" class="phase bg-white">
  ${kin("s4-t1", "Nobody buys from a stranger", { pos: "center", size: 92 })}
  <div class="stage">${inbox}</div>
</div>

<div id="s4-p2" class="phase bg-orange">
  ${kin("s4-t2", "People buy from someone they know", { pos: "center", color: "white", size: 92 })}
</div>

<div id="s4-p3" class="phase bg-white">
  ${kin("s4-t3", "Someone they follow")}
  ${kin("s4-t4", "And already trust")}
  <div id="s4-out" class="stage"><div id="s4-cam" class="cam p3d" style="transform-origin:960px 540px">
    <svg class="layer" viewBox="0 0 4000 1080" width="4000" height="1080" style="left:0;width:4000px" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="${LINE_Y}" x2="4000" y2="${LINE_Y}" stroke="#e2e0ee" stroke-width="6"/>
      <line id="s4-line" x1="${cardX(0) + CW / 2}" y1="${LINE_Y}" x2="${cardX(4) + CW / 2}" y2="${LINE_Y}" stroke="#f43600" stroke-width="6" stroke-linecap="round"/>
    </svg>
    ${rings}
    ${PH.map(phase).join("")}
  </div></div>
  <div id="s4-flash" class="layer" style="background:#0b0b0d;opacity:0;z-index:80"></div>
</div>
`;

export const css = `
.bg-white { background: linear-gradient(160deg, #ffffff 0%, #f7f7fd 100%); }
.eyebrow.ink { color: var(--ink2); }
.inbox { left: 430px; top: 300px; width: 1060px; padding: 44px 52px 40px; border-radius: 40px; display:flex; flex-direction:column; gap: 16px; opacity: 0; }
.inbox .ih { display:flex; justify-content:space-between; align-items:center; padding-bottom: 8px; }
.inbox .eyebrow { font-size: 19px; }
.inbox .cnt { display:flex; align-items:center; gap: 12px; font-family:"IBM Plex Mono", monospace; font-size: 20px; letter-spacing:.14em; color: #167a49; font-weight: 600; }
.inbox .cnt i { width: 16px; height: 16px; border-radius: 50%; background: var(--green); }
.irow { display:flex; align-items:center; gap: 26px; padding: 20px 0; border-top: 2px solid var(--line); }
.irow .who { display:flex; flex-direction:column; gap: 2px; flex: 1; }
.irow .who b { font-size: 31px; font-weight: 800; } .irow .who span { font-size: 22px; color: var(--ink2); }
.irow .tm { font-family:"IBM Plex Mono", monospace; font-size: 22px; color: var(--ink3); margin-right: 26px; }
.irow .rd { display:inline-flex; align-items:center; gap: 12px; font-family:"IBM Plex Mono", monospace; font-size: 20px; letter-spacing:.1em; color: var(--ink3); font-weight:600; padding: 10px 18px; border-radius: 12px; }
.irow .rd .ticks { font-size: 30px; letter-spacing: -.35em; margin-right: .35em; color: #cfcddb; font-family: "Manrope"; font-weight: 800; }
.irow .rd.on { color: #167a49; } .irow .rd.on .ticks { color: #1fa463; }
.rlc { width: ${CW}px; height: 240px; border-radius: 22px; padding: 22px 24px; display:flex; flex-direction:column; gap: 14px; border: 2.5px solid transparent; }
.rlc .top { display:flex; align-items:center; gap: 12px; }
.rlc .who { display:flex; flex-direction:column; flex: 1; } .rlc .who b { font-size: 18px; font-weight: 800; } .rlc .who span { font-size: 13px; color: var(--ink2); }
.rlc .when { font-family:"IBM Plex Mono", monospace; font-size: 11px; letter-spacing:.14em; color: var(--ink3); font-weight:600; align-self: flex-start; }
.rlc .sig { display:flex; align-items:center; gap: 12px; font-size: 20px; font-weight: 700; margin-top: 8px; }
.rlc .sig i { width: 16px; height: 16px; border-radius: 4px; background: var(--orange); flex: none; }
.rlc .chk { display:flex; align-items:center; gap: 12px; font-size: 19px; font-weight: 700; opacity: 0; }
.rlc .chk .ck { width: 30px; height: 30px; border-radius: 50%; background: var(--orange); color: #fff; display:flex; align-items:center; justify-content:center; font-size: 17px; font-weight: 800; }
.rlc.buy { background: #fff3ee; border-color: var(--orange); height: 184px; }
.rlc.buy .sig { font-size: 26px; font-weight: 800; letter-spacing: .04em; }
.ring { position:absolute; width: ${CW + 60}px; height: 244px; border-radius: 34px; border: 2.5px solid var(--orange); opacity: 0; }
`;

export const data = { x: [0, 1, 2, 3, 4].map(cardX), cw: CW, lineX: [cardX(0) + CW / 2, cardX(4) + CW / 2] };
