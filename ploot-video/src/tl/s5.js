function s5(tl, T) {
  const D = DATA.s5;
  // ---------- 5.1 (0 → 1.85) black · hinge phrase ----------
  show(tl, "#s5-p1", T);
  tiltWords(tl, "#s5-t1", T, { gap: fr(4), hold: 0.1 });
  textOut(tl, "#s5-t1", T + 1.85 - 0.36, { mode: "zoom", dur: 0.38 });   // whips into the control tower

  // ---------- 5.2 – 5.3 (1.85 → 3.75) control-tower panel ----------
  const t2 = T + 1.85;
  hide(tl, "#s5-p1", t2); show(tl, "#s5-p2", t2);
  tl.set("#s5-cam3", { opacity: 0 }, t2);
  tl.set("#s5-panel", { rotationY: -4, rotationX: 2 }, t2);
  riseIn(tl, "#s5-panel", t2, { y: 520, rotX: 16, dur: 0.9 });
  // The feed is already running as the panel enters the frame.
  const NR = DATA.s5.feedRows;
  for (let i = 0; i < NR; i++) tl.set("#s5-fr-" + i, { y: 0, opacity: 1 }, t2 - 0.18);
  tiltWords(tl, "#s5-t2", t2 + 0.1, { hold: 1.0 });
  drift(tl, "#s5-panel", t2 + 0.9, 0.65, { ry: 2, rx: 1, y: 10, scale: 0.02 });
  // inner scroll: the list glides down through the signals still arriving while the total runs up
  const box = $("#s5-flist"), SC = box.scrollHeight - box.clientHeight, trackH = box.clientHeight - 28, thumbH = Math.round(trackH * box.clientHeight / box.scrollHeight);
  gsap.set("#s5-fsbi", { height: thumbH });
  tl.fromTo("#s5-fscroll", { y: -SC * .08 }, { y: -SC, duration: 1.6, ease: "sine.out", immediateRender: false }, t2 - 0.18);
  tl.fromTo("#s5-fsbi", { y: (trackH - thumbH) * .08 }, { y: trackH - thumbH, duration: 1.6, ease: "sine.out", immediateRender: false }, t2 - 0.18);
  count(tl, "#s5-total", t2 - 0.18, 128, 312, 1.6, { ease: "sine.out" });

  // ---------- 5.4 (3.75 → 4.3) the camera pans down: panel and title leave by the top, the background changes to the light gradient, your web comes up from below ----------
  const t4 = T + 3.75, tPan = t4 - 0.3, DP = 0.55, EP = "power3.inOut";
  tl.fromTo("#s5-p2", { backgroundPositionY: "0px" }, { backgroundPositionY: "-1080px", duration: DP, ease: EP, immediateRender: false }, tPan);   // the dark grid rides up with the pan
  tl.to("#s5-panel", { y: -1400, filter: "blur(8px)", duration: DP, ease: EP }, tPan);       // nearer than the grid: it leaves faster (parallax)
  tl.to("#s5-t2", { y: -1300, filter: "blur(6px)", duration: DP * 0.9, ease: EP }, tPan);
  tl.set("#s5-panel", { display: "none" }, tPan + DP + 0.001);
  tl.set("#s5-t2", { opacity: 0 }, tPan + DP + 0.001);
  tl.fromTo("#s5-light", { y: 0, opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.inOut", immediateRender: false }, tPan + 0.05);   // the background itself changes colour: black → light gradient (storyboard: 8 f)
  tl.set("#s5-cam3", { opacity: 1 }, tPan);
  tl.set("#s5-web", { rotationY: -18, rotationX: 22, opacity: 0, y: 760, scale: 1.14, transformOrigin: "50% 50%" }, tPan);   // waits below, a little nearer the lens
  const tWeb = tPan + 0.18, DW = 0.72;
  // one organic curve: your web comes up from a little nearer the lens (1.14 → 1) while it turns into place (Y −18 → −10, X 22 → 6)
  tl.fromTo("#s5-web", { y: 760, scale: 1.14, rotationX: 22, rotationY: -18, filter: "blur(5px)" }, { y: 0, scale: 1, rotationX: 6, rotationY: -10, filter: "blur(0px)", duration: DW, ease: "expo.out", immediateRender: false }, tWeb);
  tl.to("#s5-web", { opacity: 1, duration: 0.3, ease: "power1.out" }, tWeb);
  tl.set("#s5-web", { clearProps: "filter" }, tWeb + DW + 0.001);
  drift(tl, "#s5-web", tWeb + DW, (T + 5.05) - (tWeb + DW), { ry: 1.5, rx: 0.75, y: 5, scale: 0.01 });   // keeps turning the same way through the zoom
  tl.fromTo("#s5-t3", { y: 640 }, { y: 0, duration: 0.7, ease: "expo.out", immediateRender: false }, tPan + 0.26);   // the line rides up with the web
  tiltWords(tl, "#s5-t3", tPan + 0.3, { hold: 1.2 });

  // ---------- 5.5 (4.3 → 5.05) the camera follows the cursor to the LinkedIn button while the web is still settling ----------
  const t5 = T + 4.3, t6 = T + 5.05;
  // measure the button in stage space at the pose the web holds at the click (its drift is still running then)
  const pD = 0.5; // exact final pose of the shorter drift
  gsap.set("#s5-web", { rotationY: -10 + 3 * pD, rotationX: 6 - 1.5 * pD, y: -10 * pD, scale: 1 + 0.02 * pD, transformOrigin: "50% 50%" });
  const rr = $("#root").getBoundingClientRect(), kk = 1920 / rr.width, br = $("#s5-web-in").getBoundingClientRect();
  const ICX = (br.left + br.width / 2 - rr.left) * kk, ICY = (br.top + br.height / 2 - rr.top) * kk;
  gsap.set("#s5-web", { clearProps: "transform" });
  const CS = 60, tip = (x, y) => ({ x: x - 0.21 * CS - 1500, y: y - 0.14 * CS - 1120 });   // the cursor tip sits at 21 %/14 % of its box
  const ZS = 1.6, PX = 1240, PY = 400;   // the button is carried towards the upper right of centre while the camera closes in
  tl.set("#s5-cam3", { transformOrigin: ICX + "px " + ICY + "px", x: 0, y: 0 }, t5 - 0.15);
  tl.fromTo("#s5-cur1", { x: 0, y: 0 }, { ...tip(ICX, ICY), duration: 0.7, ease: "power3.out", immediateRender: false }, t5 - 0.1);
  tl.to("#s5-cam3", { scale: ZS, x: PX - ICX, y: PY - ICY, duration: 0.75, ease: "power2.inOut" }, t5);   // the camera follows the cursor
  tl.to("#s5-web-in", { boxShadow: "0 0 0 4px rgba(244,54,0,1)", duration: fr(3) }, t6 - 0.15);

  // ---------- 5.6 (5.05 → 5.75) click · the web goes through the lens · the camera breathes out while the profile rises ----------
  click(tl, "#s5-cur1", t6, "#s5-web-in", { press: 0.9 });
  tl.to("#s5-web", { scale: 1.25, opacity: 0, filter: "blur(12px)", duration: 0.38, ease: "power2.in" }, t6);   // pushes through the lens
  tl.set("#s5-web", { display: "none" }, t6 + 0.381);
  tl.to("#s5-cam3", { scale: 1, x: 0, y: 0, duration: 0.6, ease: "power2.inOut" }, t6);
  tl.set("#s5-profile", { rotationY: -8, rotationX: 5 }, t6);
  riseIn(tl, "#s5-profile", t6 + 0.06, { y: 280, rotX: 12, dur: 0.65 });   // identifiable by the spoken «perfil»
  tl.to("#s5-cur1", { ...tip(1090, 613), duration: 0.6, ease: "power2.inOut" }, t6 + 0.15);
  wordsOut(tl, "#s5-t3", t6, { dur: 0.25 });

  // ---------- 5.7 – 5.8 (5.75 → 6.8) the profile settles while the camera, without stopping, is already pushing in towards «Seguir» ----------
  const t7 = t6 + 0.7;
  drift(tl, "#s5-profile", t6 + 0.71, 1.04, { ry: 2, rx: 1, y: 8, scale: 0.015 });
  tiltWords(tl, "#s5-t4", t6 + 0.12, { gap: 0.055, dur: 0.28, hold: 0.65 });
  // measure the button in stage space at the pose the profile holds at the click (end of its drift) and once it has straightened
  const measure = (pose) => { gsap.set("#s5-profile", pose); const r = $("#s5-followbtn").getBoundingClientRect(); return [(r.left + r.width / 2 - rr.left) * kk, (r.top + r.height / 2 - rr.top) * kk]; };
  const [FX, FY] = measure({ rotationY: -6, rotationX: 4, y: -8, scale: 1.015, transformOrigin: "50% 50%" });
  const [GX, GY] = measure({ rotationY: 0, rotationX: 0, y: -8, scale: 1.015, transformOrigin: "50% 50%" });
  const fb = $("#s5-followbtn"), BW = fb.offsetWidth * 1.015, BH = fb.offsetHeight * 1.015;
  gsap.set("#s5-profile", { clearProps: "transform" });
  const tClick = T + 6.8, t8 = tClick - 0.34; // keep the banner readable, then accelerate toward Seguir
  tl.set("#s5-cam3", { transformOrigin: FX + "px " + FY + "px" }, t8);
  tl.to("#s5-cam3", { scale: 1.55, duration: tClick + 0.05 - t8, ease: "sine.in" }, t8);
  tl.to("#s5-cur1", { ...tip(FX, FY), duration: 0.55, ease: "power3.out" }, tClick - 0.65);
  click(tl, "#s5-cur1", tClick, "#s5-followbtn", { press: 0.94 });
  textOut(tl, "#s5-t4", tClick - 0.6); // clear the caption before the banner approaches its zone
  tiltWords(tl, "#s5-t5", tClick + 0.02, { gap: 0.04, dur: 0.3, hold: 1.0 });

  // ---------- 5.9 (6.8 → 8.2) the click launches the big zoom: the button lands centred · turns orange · everything else disappears · pill wave ----------
  // the camera keeps pivoting on the button (no origin jump) and pans so its straightened centre lands on the frame centre;
  // it takes over at speed from the push-in (power3.out), so there is no pause between the two zooms
  const S9 = 3.4, tZ = tClick + 0.05, DZ = 0.75, panTo = (s) => ({ x: 960 - (FX + (GX - FX) * s), y: 540 - (FY + (GY - FY) * s) });
  tl.to("#s5-cam3", { scale: S9, ...panTo(S9), duration: DZ, ease: "power3.out" }, tZ);
  tl.to("#s5-profile", { rotationY: 0, rotationX: 0, duration: DZ, ease: "power3.out" }, tZ);          // the button turns to face the lens
  const tWhip = T + 8.1, t10 = T + 8.2, t11 = T + 9.65, t12 = T + 10.0;   // the orange lands on a beat of the music (43.96)
  tl.to("#s5-cam3", { scale: S9 + 0.15, ...panTo(S9 + 0.15), duration: tWhip - (tZ + DZ), ease: "sine.inOut" }, tZ + DZ);   // never still
  // the button turns orange and reads «Siguiendo»
  tl.to("#s5-followbtn", { backgroundColor: "#f43600", duration: 0.25, ease: "power2.inOut" }, tClick + 0.06);
  tl.to("#s5-followbtn .l1", { opacity: 0, duration: 0.16, ease: "power1.in" }, tClick + 0.06);
  tl.to("#s5-followbtn .l2", { opacity: 1, duration: 0.2, ease: "power1.out" }, tClick + 0.14);
  tl.to("#s5-profile > .cover", { opacity: 0, duration: 0.12, ease: "power1.in" }, tClick - 0.02);
  // Clear the enlarged profile name before «Te siguen» occupies the same zone.
  tl.to("#s5-profile .pname", { opacity: 0, duration: 0.18, ease: "power2.out" }, tClick - 0.04);
  // everything else on the profile fades away; the card itself loses its white and its shadow, so only the button is left
  tl.to("#s5-profile > .cover, #s5-profile > .pav, #s5-profile .pbody > :not(.pbtns):not(.pname), #s5-profile .ghostb", { opacity: 0, duration: 0.35, ease: "power2.in" }, tClick + 0.1);
  tl.to("#s5-profile", { backgroundColor: "rgba(255,255,255,0)", boxShadow: "0 0 0 0 rgba(0,0,0,0)", duration: 0.35, ease: "power2.in" }, tClick + 0.18);
  tl.to("#s5-cur1", { y: "+=500", opacity: 0, duration: 0.3, ease: "power2.in" }, tClick + 0.1);   // the cursor leaves before the zoom makes it huge
  // the pill wave rings match the zoomed button and ripple out of it
  gsap.set("#s5-fring1, #s5-fring2", { width: BW * S9, height: BH * S9 });
  // Once the camera is face-on, keep the exact same pill in the 2D overlay.
  // Native-size live text avoids magnifying the profile's flattened 3D texture.
  gsap.set("#s5-follow-hero", {width:BW*S9,height:BH*S9,fontSize:17*1.015*S9,fontWeight:getComputedStyle(fb).fontWeight});
  tl.set("#s5-followbtn", {opacity:0}, tZ+DZ);
  tl.set("#s5-follow-hero", {opacity:1,scale:1}, tZ+DZ);
  tl.to("#s5-follow-hero", {scale:(S9+.15)/S9,duration:tWhip-(tZ+DZ),ease:"sine.inOut"}, tZ+DZ);
  tl.set("#s5-follow", { opacity: 1 }, tZ + DZ - 0.25);
  ["#s5-fring1", "#s5-fring2"].forEach((r, i) => {
    tl.fromTo(r, { scale: 0.85, opacity: 1 }, { scale: 1.9, opacity: 0, duration: 0.9, ease: "power2.out", repeat: 1, immediateRender: false }, tZ + DZ - 0.2 + i * fr(8));
  });
  // the camera tilts down again: the button and its wave leave by the top while the three webs rise from below (same move as 5.3 → 5.4)
  tl.to("#s5-cam3", { y: "-=1400", duration: 0.45, ease: "power3.in" }, tWhip);
  tl.to("#s5-follow", { y: -1400, duration: 0.45, ease: "power3.in" }, tWhip);

  // ---------- 5.10 (8.2 → 9.65) three webs rise into the same move · the cursors leave orange trails ----------
  // the phase is transparent: the light plane of 5.4 stays as the background, so nothing cuts
  show(tl, "#s5-p3", t10 - 0.05);
  tl.set("#s5-webs-g", { rotationY: -8, rotationX: 4 }, t10 - 0.05);
  tl.set("#s5-w-me, #s5-w-a, #s5-w-b, #s5-u1, #s5-u2, #s5-u3", { y: 560, opacity: 0 }, t10 - 0.05);
  tl.set("#s5-wl-me, #s5-wl-a, #s5-wl-b", { opacity: 0 }, t10 - 0.05);
  [["#s5-w-me", "#s5-wl-me", "#s5-u1"], ["#s5-w-a", "#s5-wl-a", "#s5-u2"], ["#s5-w-b", "#s5-wl-b", "#s5-u3"]].forEach(([w, l, c], i) => {
    const t = t10 + i * fr(1.5);
    tl.fromTo(w, { y: 420, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "none", duration: 0.6, ease: "expo.out", immediateRender: false }, t);
    tl.set(w, { clearProps: "filter" }, t + 0.601);
    tl.fromTo(l, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", immediateRender: false }, t + 0.2);
    tl.fromTo(c, { y: 560, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", immediateRender: false }, t + 0.05);
  });
  tiltWords(tl, "#s5-t6", t10 + 0.15, { hold: 1.6 });
  tl.to("#s5-webs-g", { rotationY: 4, rotationX: -2, z: 90, y: -14, duration: 1.68, ease: "none" }, t10 + .25);
  ["me","a","b"].forEach((key,i)=>{
    tl.to("#s5-w-"+key, {rotationY:[-5,6,-4][i],rotationX:[3,-3,4][i],rotationZ:[-1.2,.8,-.7][i],z:[24,62,4][i],y:[-16,10,-12][i],duration:1.68,ease:"none"}, t10+.62+i*.04);
  });
  tl.fromTo("#s5-webs", { scale: 1 }, { scale: 1.08, duration: t12 - t10, ease: "sine.inOut", immediateRender: false }, t10);   // one slow push through the whole beat, straight into the exit
  textOut(tl, "#s5-t5", t10 - 0.2);
  const jumps = [["#s5-u1", "#s5-tr1"], ["#s5-u2", "#s5-tr2"], ["#s5-u3", "#s5-tr3"]];
  jumps.forEach(([c, p], i) => {
    const path = $(p), t = t10 + 0.72 + i * 0.13, d = 0.45;   // the first jump starts while the last web is still landing
    trail(tl, p, t, d, { win: 0.42, ease: "power2.inOut", tail: 0.35 });
    tl.to(c, { motionPath: { path, align: path, alignOrigin: [0.1, 0.1] }, duration: d, ease: "power2.inOut" }, t);
  });

  // ---------- 5.11 (9.65 → 10.0) converge on your web ----------
  tl.to("#s5-trails", { opacity: 0, duration: 0.25 }, t11);
  // the three cursors converge on your web (positions relative to each cursor's anchor)
  [["#s5-u1", 400, 600, 300, 560], ["#s5-u2", 960, 480, 440, 660], ["#s5-u3", 1520, 520, 360, 720]].forEach(([c, ax, ay, x, y], i) => {
    tl.to(c, { x: x - ax, y: y - ay, duration: 0.3, ease: "power2.inOut" }, t11 + i * fr(0.4));
  });
  tl.to("#s5-w-hl", { opacity: 1, duration: fr(3) }, t11 + 0.3);
  tl.to("#s5-w-a, #s5-w-b", { opacity: 0.6, duration: 0.35 }, t11);

  // ---------- 5.12: cards lift away; the light background turns orange; words enter ----------
  wordsOut(tl, "#s5-t6", t12 - 0.15, { dur: 0.23 });
  tl.to("#s5-wl-me, #s5-wl-a, #s5-wl-b", { opacity: 0, duration: .2, ease: "power2.inOut" }, t12 - .1);
  tl.to("#s5-webs", { y: -480, opacity: 0, duration: 0.46, ease: "power2.in" }, t12);
  // The windows live above this plane, so they remain visible while the colour changes underneath.
  tl.fromTo("#s5-orangeL", { x: 0, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, ease: "sine.inOut", immediateRender: false }, t12 + 0.04);
  hide(tl, "#s5-p2", t12 + 0.54);
  tl.set("#s5-webs", { display: "none" }, t12 + 0.47);
  tiltWords(tl, "#s5-t7", t12 + 0.4, { gap: 0.105, dur: 0.32, y: 32, tilt: 0, from: 0.99, grow: 1.015, hold: 0.4 });
  tl.to("#s5-t7 .line", { y: -24, opacity: 0, filter: "none", duration: 0.34, ease: "power2.inOut" }, T + 11.60);

  // ---------- 5.13 (11.95 → 13.2) the colour turns · the signal field arrives in extreme close-up (reference 19.32, 0:00–0:40) ----------
  const t13 = T + 11.95, t14 = T + 13.2, t15 = T + 14.45;
  const holdEnd = t15;   // the background turns black immediately after the sentence
  tl.set("#s5-lightL", { opacity: 1, x: 0 }, t13);   // the light plane already sits under the orange
  // the orange does not slide out: its colour transforms into the light gradient. The plane's own colour drifts from
  // orange to the gradient's mid tone and, once it is already close, the plane dissolves over the gradient + grid beneath
  tl.to("#s5-orangeL", { backgroundColor: "#ebeafd", duration: 0.5, ease: "power1.inOut" }, t13);
  tl.to("#s5-orangeL", { opacity: 0, duration: 0.4, ease: "power1.inOut" }, t13 + 0.1);
  tl.set("#s5-orangeL", { display: "none" }, t13 + 0.501);
  // two layouts for the same eight cards (stage-space centres):
  //  CL — close-up, for the ×3 camera: huge cards pushed out to the corners and edges (only a corner or a strip of each
  //       one inside the frame), one shared tilt, the centre completely free
  //  SP — spread, for the ×0.95 camera: small cards around the edges, partly cut, the centre left to the line
  const CL = [[560, 330], [980, 345], [1290, 380], [610, 540], [600, 745], [950, 730], [1330, 700], [1350, 540]];
  const SP = [[300, 120], [930, 90], [1640, 150], [120, 540], [330, 960], [1000, 1040], [1620, 930], [1810, 520]];
  const off = (L, i) => ({ x: L[i][0] - 200 - D.cards[i].x, y: L[i][1] - 52 - D.cards[i].y });   // offsets that put the card's centre on a spot
  const Z5 = [-320, -160, -200, -260, -20, 160, 120, 60];
  depth(D.cards.map((c, i) => "#s5-c-" + i), Z5);
  tilt3D(tl, "#s5-g14", t13, { ry: 3, rx: 4, z: -60 });
  const S0 = 3.0;   // camera at the start: extreme close-up (cards ≈ 62 % of the frame width)
  tl.fromTo("#s5-cam14", { scale: S0, x: -30, y: -15, opacity: 1, filter: "none" }, { x: 20, y: 10, duration: t14 - t13, ease: "sine.inOut", immediateRender: false }, t13);   // the field slides slowly
  // no entrance (reference: the shot opens on the close-up already in place): the cards sit on their close-up spots
  // under the opaque orange, and the colour transformation simply reveals the field
  D.cards.forEach((c, i) => {
    const o = off(CL, i);
    tl.set("#s5-c-" + i, { x: o.x, y: o.y, rotation: -8, opacity: 1, filter: "none" }, t13);
  });
  // one slow orbit + dolly of the card group across the whole hold, one direction (relative deltas on top of the tilt3D pose)
  orbit3D(tl, "#s5-g14", t13 + 0.25, holdEnd - (t13 + 0.25), { dry: -11, drx: -3, dz: 160 });
  // pointers and paper planes drift between the cards (reference) and go with them
  const FL = [["#s5-k1", 600, 420, 690, 470], ["#s5-k2", 640, 350, 675, 378], ["#s5-pl1", 1300, 640, 1345, 605], ["#s5-pl2", 1180, 330, 1225, 352]];
  FL.forEach(([sel, x0, y0, x1, y1], i) => {
    tl.set(sel, { x: x0, y: y0, opacity: 0 }, t13);
    tl.to(sel, { opacity: 0.92, duration: 0.3 }, t13 + 0.25 + i * 0.08);
    tl.to(sel, { x: x1, y: y1, duration: holdEnd - t13, ease: "sine.inOut" }, t13);
  });

  // ---------- 5.14 (13.2 → 14.65) reference 0:40–2:00: fast pull-back, the cards fly to the edges with motion blur while «Y nadie las ve»
  // composes tilted, word by word · short hold with the small cards around the line · then the cards fade to white ----------
  const DPB = 0.5;
  tl.to("#s5-veil", { opacity: 0.9, duration: 0.35, ease: "power1.inOut" }, t14 - 0.05);            // the frame goes white as the pull-back starts
  tl.to("#s5-cam14", { scale: 0.95, x: 0, y: 0, duration: DPB, ease: "power2.inOut" }, t14);         // strong pull-back
  tl.to("#s5-cam14", { scale: 0.9, duration: holdEnd - (t14 + DPB), ease: "sine.inOut" }, t14 + DPB);   // never still
  D.cards.forEach((c, i) => {
    const o = off(SP, i);
    tl.to("#s5-c-" + i, { x: o.x, y: o.y, duration: DPB, ease: "power2.inOut" }, t14);            // each card flies to its spot around the line
    tl.to("#s5-c-" + i, { filter: "blur(6px)", duration: 0.14, ease: "power1.in" }, t14 + 0.04);   // motion blur while it moves fast
    tl.to("#s5-c-" + i, { filter: "blur(0px)", duration: 0.24, ease: "power2.out" }, t14 + 0.22);
    tl.set("#s5-c-" + i, { clearProps: "filter" }, t14 + 0.461);
  });
  tiltWords(tl, "#s5-t8", t14 + 0.08, { gap: fr(4), hold: 1.0 });   // the line lives outside the camera and keeps its size
  // the small cards stay around the line for a beat, then fade to white (reference 1:40–1:80); the cursors go with them
  const tFade = T + 14.1;
  tl.to("#s5-g14 .sig", { opacity: 0, filter: "blur(4px)", duration: 0.4, ease: "power1.inOut" }, tFade);
  tl.to("#s5-k1, #s5-k2, #s5-pl1, #s5-pl2", { opacity: 0, duration: 0.4, ease: "power2.in" }, tFade - 0.1);

  // The entire background becomes black in seven frames; the caption clears with it.
  tl.to("#s5-cam14", { scale: 0.7, opacity: 0, duration: 0.24, ease: "power2.in" }, t15);
  tl.to("#s5-t8 .line", { y: -40, opacity: 0, duration: 0.22, ease: "power2.in" }, t15);
  tl.to("#s5-veil", { opacity: 0, duration: 0.24, ease: "sine.inOut" }, t15);
  tl.to("#s5-dark", { opacity: 1, duration: 0.24, ease: "sine.inOut" }, t15);
  const t16 = T + 14.72;
  hide(tl, "#s5-p3", t16); show(tl, "#s5-p4", t16);
}
