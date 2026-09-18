function s1(tl, T) {
  const D = DATA.s1;
  // ---------- 1.1 – 1.2  (0 → 1.15) «Ahora mismo» magnético · dos luces desde las esquinas ----------
  show(tl, "#s1-p2", T);
  tl.set("#s1-web", { opacity: 0 }, T);
  magnetic(tl, "#s1-t1", T + 0.06, { gap: fr(2.5), x: 140, dur: 0.45 });
  // one continuous run per light: starts at 55 % speed and keeps accelerating until it leaves the top
  const tL = T + 0.05, dur = 1.05, easeRun = (u) => 0.55 * u + 0.45 * u * u;
  let Lref = 0;
  ["L", "R"].forEach((side) => {
    const core = $("#s1-lt" + side), orb = "#s1-orb" + side;
    const L = core.getTotalLength(), w = L * 0.36; Lref = L;
    gsap.set(core, { strokeDasharray: w + " " + L, strokeDashoffset: w });
    tl.set(orb, { opacity: 1 }, tL);
    tl.to(orb, { motionPath: { path: core, align: core, alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: dur, ease: easeRun }, tL);
    tl.to(core, { strokeDashoffset: w - L, duration: dur, ease: easeRun }, tL);
    tl.to(core, { strokeDashoffset: -L, duration: 0.28, ease: "power2.out" }, tL + dur);
    tl.to(orb, { opacity: 0, duration: 0.06 }, tL + dur);
  });
  // the two arcs merge into one line at (960,560); the text starts rising just before they reach it
  const pM = 1 - 700 / Lref;
  const uM = (-0.55 + Math.sqrt(0.3025 + 1.8 * pM)) / 0.9;
  const tMerge = tL + dur * uM;
  const tTxt = tMerge - 0.12, dTxt = (tL + dur + 0.08) - tTxt;
  tl.to("#s1-t1", { y: -780, scale: 1.06, duration: dTxt, ease: "power2.in" }, tTxt);
  tl.to("#s1-t1 .w", { opacity: 0, duration: 0.25, ease: "power1.in" }, tTxt + dTxt - 0.3);

  // ---------- 1.3 – 1.5  (1.15 → 3.05) ----------
  const t2 = T + 1.15;
  // measure the three pricing cards inside the web mock and map them to stage coordinates
  // (web: 1040×1040 at left 440 / top 200, scaled 0.66 about its centre → stage centre 960,720)
  const webEl = $("#s1-web"), plans = $$("#s1-web .plan");
  const loc = (el) => { let x = el.offsetWidth / 2, y = el.offsetHeight / 2; for (let e = el; e && e !== webEl; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return [x, y]; };
  const [P0, P1, P2] = plans.map((pl) => { const [lx, ly] = loc(pl); return [960 + (lx - 520) * 0.66, 720 + (ly - 520) * 0.66]; });
  tl.set("#s1-cam2", { transformOrigin: "960px " + Math.round(P1[1] - 20) + "px" }, T);
  const d2 = (A, c1, c2, M, c3, c4, E) => `M ${A[0]} ${A[1]} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${M[0]} ${M[1]} C ${c3[0]} ${c3[1]}, ${c4[0]} ${c4[1]}, ${E[0]} ${E[1]}`;
  const A1 = [764, 694], E1 = [P1[0], P1[1] - 6];
  $("#s1-wp1").setAttribute("d", d2(A1, [A1[0] - 90, A1[1] - 80], [E1[0] - 170, E1[1] - 170], [E1[0] - 70, E1[1] - 120], [E1[0] + 60, E1[1] - 70], [E1[0] + 80, E1[1] - 10], E1));
  const A2 = [1154, 704], E2 = [P2[0], P2[1] + 4];
  $("#s1-wp2").setAttribute("d", d2(A2, [A2[0] + 70, A2[1] - 70], [E2[0] + 110, E2[1] - 160], [E2[0] + 90, E2[1] - 90], [E2[0] + 60, E2[1] - 30], [E2[0] - 40, E2[1] - 40], E2));
  const A3 = [904, 864], E3 = [P0[0], P0[1] + 10];
  $("#s1-wp3").setAttribute("d", d2(A3, [A3[0] - 60, A3[1] + 30], [E3[0] - 120, E3[1] + 30], [E3[0] - 110, E3[1] - 40], [E3[0] - 90, E3[1] - 90], [E3[0] + 20, E3[1] - 80], E3));
  // the web rises and settles in one organic move (no yoyo oscillation, no shake)
  tl.set("#s1-web", { rotationY: -20, rotationX: 9, scale: 0.6, transformOrigin: "50% 50%", opacity: 1 }, t2);
  tl.fromTo("#s1-web", { y: 560, filter: "blur(10px)" }, { y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", immediateRender: false }, t2);
  tl.set("#s1-web", { clearProps: "filter" }, t2 + 0.701);
  tl.to("#s1-web", { rotationY: -12, rotationX: 6, scale: 0.66, duration: 1.0, ease: "power2.out" }, t2);
  tl.to("#s1-web", { rotationY: -8, rotationX: 5, duration: 1.55, ease: "sine.inOut" }, t2 + 1.0);
  // the headline builds from the centre: each word rises from below and pushes the previous ones left
  wordsPush(tl, "#s1-t2", t2 + 0.12, { gap: .18, dur: .5, y: 70 });
  // cursors enter one by one, arcs into the pricing zone
  const cur = [["#s1-v1", -620, -360, "#s1-wp1", 1.3], ["#s1-v2", 700, -460, "#s1-wp2", 1.45], ["#s1-v3", 480, 420, "#s1-wp3", 1.2]];
  cur.forEach(([s, dx, dy]) => tl.set(s, { x: dx, y: dy, opacity: 0 }, T));
  cur.forEach(([s, dx, dy, wp, wd], i) => {
    const t = t2 + 0.5 + i * fr(4);
    tl.set(s, { opacity: 1 }, t);
    tl.fromTo(s, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.65, ease: "power3.out", immediateRender: false }, t);
    // then each visitor keeps browsing the page along its own curve until the cut
    const path = $(wp);
    tl.to(s, { motionPath: { path, align: path, alignOrigin: [0.1, 0.1] }, duration: wd, ease: "power1.inOut" }, t + 0.65);
  });
  // one continuous push-in, much closer, that starts early and only stops at the cut
  // push in and tilt down together so the pricing row ends up at ~55 % of the frame height
  tl.to("#s1-cam2", { scale: 2.8, x: -20, y: Math.round(600 - (P1[1] - 20)), duration: 1.3, ease: "power1.inOut" }, t2 + 0.6);
  tl.to("#s1-web", { filter: "blur(14px)", duration: 0.5, ease: "power2.in" }, t2 + 1.45);
  tl.to("#s1-light", { opacity: 1, duration: fr(9), ease: "power1.inOut" }, t2 + 1.7);
  // the headline flips to ink the moment the (white) web slides under it
  tl.to("#s1-t2 .w", { color: "#171516", duration: 0.15, ease: "none" }, t2 + 1.08);

  // ---------- 1.6 – 1.7  (3.05 → 4.45) ----------
  const t3 = T + 3.05;
  hide(tl, "#s1-p2", t3); show(tl, "#s1-p3", t3);
  tiltWords(tl, "#s1-t3", t3, { gap: fr(4), hold: 0.2 });
  textOut(tl, "#s1-t3", t3 + 1.05, { mode: "zoom" });       // whips through the lens into the cards

  // ---------- 1.8  (4.45 → 5.15) cards fill the plane ----------
  const t4 = T + 4.45;
  hide(tl, "#s1-p3", t4); show(tl, "#s1-p4", t4);
  // 3D field (reference: the cards multiply in real depth). Each card AND its Send cursor get the same
  // translateZ, set once at build time. The two zoom targets (m, d) sit on the focal plane z=0 so the zooms
  // stay centred and sharp; the small (depth<1) cards go far, the edge cards come near.
  const Z4 = { m: 0, d: 0, a: 150, b: -340, c: -70, e: 130, f: -300, g: -400 };
  const zs4 = D.cards.map((c) => Z4[c.id]);
  depth(D.cards.map((c) => "#s1-c-" + c.id), zs4);
  depth(D.cards.map((c) => "#s1-sc-" + c.id), zs4);
  // camera pose at the cut, then one orbit + dolly that runs through the sweep AND the first 0.35 s of the
  // zoom (rotationY −16 → −3): its fastest stretch lands when every card is settled, so the field is seen turning
  tilt3D(tl, "#s1-cam4", t4, { ry: -16, rx: 6, z: 0 });
  orbit3D(tl, "#s1-cam4", t4, 1.0, { dry: 13, drx: -3.5, dz: 60 });
  // every card and Send cursor starts hidden at its entry offset, so nothing is visible before its entrance
  D.cards.forEach((c) => { const [dx, dy] = D.edge[c.id]; tl.set("#s1-c-" + c.id, { x: dx, y: dy, opacity: 0, scale: c.depth }, t4); tl.set("#s1-sc-" + c.id, { x: dx, y: dy, opacity: 0 }, t4); if (c.depth < 1) tl.set("#s1-c-" + c.id, { filter: "none" }, t4); });
  // cards sweep in fast and brake long (reference: motion-blur streaks), stretched along their travel while fast
  D.cards.forEach((c, i) => {
    const [dx, dy] = D.edge[c.id], t = t4 + i * fr(2), horiz = Math.abs(dx) > Math.abs(dy);
    tl.fromTo("#s1-c-" + c.id, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.8, ease: "expo.out", immediateRender: false }, t);
    tl.fromTo("#s1-c-" + c.id, { scaleX: horiz ? c.depth * 1.16 : c.depth, scaleY: horiz ? c.depth : c.depth * 1.14 }, { scaleX: c.depth, scaleY: c.depth, duration: 0.55, ease: "expo.out", immediateRender: false }, t);
    if (c.depth === 1) {
      tl.fromTo("#s1-c-" + c.id, { filter: "blur(9px)" }, { filter: "blur(0px)", duration: 0.42, ease: "power2.out", immediateRender: false }, t);
      tl.set("#s1-c-" + c.id, { clearProps: "filter" }, t + 0.421);
    }
    tl.fromTo("#s1-sc-" + c.id, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.85, ease: "expo.out", immediateRender: false }, t + 0.05);
    tl.to("#s1-c-" + c.id, { opacity: 1, duration: 0.15, ease: "power2.out" }, t);
    tl.to("#s1-sc-" + c.id, { opacity: 1, duration: 0.15, ease: "power2.out" }, t + 0.05);
    // then a slow parallax drift while the camera keeps pushing
    const [ddx, ddy] = D.drift[c.id];
    tl.to("#s1-c-" + c.id, { x: ddx, y: ddy, duration: 1.6, ease: "sine.out" }, t + 0.8);
    tl.to("#s1-sc-" + c.id, { x: ddx, y: ddy, duration: 1.6, ease: "sine.out" }, t + 0.9);
    tl.to("#s1-sc-" + c.id, { scale: 1.035, duration: 1.4, ease: "sine.out" }, t + 0.7);
  });
  tl.fromTo("#s1-cam4", { x: 0, scale: 1 }, { x: -20, scale: 1.05, duration: 0.7, ease: "sine.inOut", immediateRender: false }, t4);

  // ---------- 1.9  (5.15 → 6.25) zoom to Marta's card ----------
  const t9 = T + 5.15;
  const cm = D.cards.find((c) => c.id === "m"), cd = D.cards.find((c) => c.id === "d");
  const S9 = 3.0;
  const target = (c, s) => ({ x: -((c.x + 235) - 960) * s, y: -((c.y + 58) - 540) * s, scale: s });
  // a soft, longer push into Marta's card
  tl.to("#s1-cam4", { ...target(cm, S9), duration: 0.85, ease: "power2.inOut" }, t9);
  // the orbit keeps turning (−3 → 0) and pushing in through the rest of the zoom and the hold; it lands on rotationY 0
  // at 6.9, exactly where the 1.10 orbit picks up, so there is no pop
  orbit3D(tl, "#s1-cam4", t9 + 0.3, T + 6.25 - (t9 + 0.3), { dry: 3, drx: -1.5, dz: 70 });
  D.cards.filter((c) => c.id !== "m").forEach((c) => tl.to("#s1-c-" + c.id + ", #s1-sc-" + c.id, { filter: "none", opacity: 0.38, duration: 0.6, ease: "power2.inOut" }, t9 + 0.12));
  tl.to("#s1-sc-m", { opacity: 0, duration: 0.3 }, t9);
  tiltWords(tl, "#s1-t4a", t9 + 0.25, { hold: 0.75 });

  // ---------- 1.10 (6.25 → 7.45) 3D orbit to Daniel's card ----------
  const t10 = T + 6.25;
  tl.to("#s1-cam4", { ...target(cd, 2.9), duration: 0.9, ease: "power2.inOut" }, t10);
  tl.to("#s1-cam4", { rotationY: -8, rotationX: 0, z: 95, duration: 1.2, ease: "sine.inOut" }, t10);
  // Daniel's hold: the camera keeps turning the way it was going (0 → −4) and starts pulling back,
  // which the whip at 8.05 then accelerates (exits accelerate)
  // One continuous turn through Daniel; no opposing orbit at the handoff.
  tl.to("#s1-c-m", { filter: "none", opacity: 0.38, duration: 0.35 }, t10 + 0.15);
  tl.to("#s1-c-d", { filter: "none", opacity: 1, duration: 0.16, ease:"power2.out" }, t10);
  tl.set("#s1-c-d", { clearProps: "filter" }, t10 + 0.161);
  tl.to("#s1-sc-d", { opacity: 0, duration: 0.2 }, t10);
  wordsOut(tl, "#s1-t4a", t10, { dur: 0.28, y: -40 });
  tiltWords(tl, "#s1-t4b", t10 + 0.25, { hold: 0.75 });

  // ---------- 1.11 (7.45 → 8.85) three webs · the cursors leave orange trails ----------
  const t11 = T + 7.45;
  tl.to("#s1-cam4", { scale: 2.2, x: "-=1900", y: "-=420", duration: 0.35, ease: "power3.in" }, t11 - 0.3);
  hide(tl, "#s1-p4", t11); show(tl, "#s1-p5", t11);
  tl.set("#s1-webs-g", { rotationY: -8, rotationX: 4 }, t11);
  // the three panels rise from below, one after another (storyboard 1.11), cursors riding with them
  tl.set("#s1-w-me, #s1-w-a, #s1-w-b, #s1-u1, #s1-u2, #s1-u3", { y: 560, opacity: 0 }, t11);
  tl.set("#s1-wl-me, #s1-wl-a, #s1-wl-b", { opacity: 0 }, t11);
  [["#s1-w-me", "#s1-wl-me", "#s1-u1"], ["#s1-w-a", "#s1-wl-a", "#s1-u2"], ["#s1-w-b", "#s1-wl-b", "#s1-u3"]].forEach(([w, l, c], i) => {
    const t = t11 + i * fr(1);
    tl.fromTo(w, { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "expo.out", immediateRender: false }, t);
    tl.set(w, { clearProps: "filter" }, t + 0.501);
    tl.fromTo(l, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", immediateRender: false }, t + 0.2);
    tl.fromTo(c, { y: 560, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", immediateRender: false }, t + 0.05);
  });
  wordsOut(tl, "#s1-t4b", t11 - 0.25);
  tiltWords(tl, "#s1-t5a", t11 + 0.15, { hold: 1.3 });
  tl.to("#s1-webs-g", { rotationY: 4, rotationX: -2, z: 90, y: -14, duration: 1.18, ease: "none" }, t11 + .25);
  ["me","a","b"].forEach((key,i)=>{
    tl.to("#s1-w-"+key, {rotationY:[-5,6,-4][i],rotationX:[3,-3,4][i],rotationZ:[-1.2,.8,-.7][i],z:[24,62,4][i],y:[-16,10,-12][i],duration:1.18,ease:"none"}, t11+.52+i*.04);
  });   // the panels never stand still
  tl.fromTo("#s1-webs", {scale:1}, {scale:1.07,x:-12,duration:1.4,ease:"none",immediateRender:false}, t11);
  const jumps = [["#s1-u1", "#s1-tr1"], ["#s1-u2", "#s1-tr2"], ["#s1-u3", "#s1-tr3"]];
  jumps.forEach(([c, p], i) => {
    const path = $(p), t = t11 + 0.72 + i * 0.13, d = 0.38;
    trail(tl, p, t, d, { win: 0.42, ease: "power2.inOut", tail: 0.35 });
    tl.to(c, { motionPath: { path, align: path, alignOrigin: [0.1, 0.1] }, duration: d, ease: "power2.inOut" }, t);
  });

  // ---------- 1.12 (8.85 → 9.3) cursors burst into coins ----------
  const t12 = T + 8.85;
  tl.to("#s1-webs-g", { filter: "blur(12px)", opacity: 0.6, duration: 0.35 }, t12);
  tl.to("#s1-trails", { opacity: 0, duration: 0.2 }, t12);
  tl.to("#s1-u1, #s1-u2, #s1-u3", { scale: 0.2, opacity: 0, duration: 0.14, ease: "power3.in" }, t12);
  D.coins.forEach((c, i) => {
    const s = "#s1-coin-" + i;
    tl.set(s, { opacity: 1, scale: 0.3, x: 0, y: 0, rotationY: 0 }, t12 + c.delay);
    tl.to(s, { x: c.dx, y: c.dy, scale: 1, duration: 0.4, ease: "power3.out" }, t12 + c.delay);
    tl.to(s, { rotationY: c.spin, duration: 2.1, ease: "none" }, t12 + c.delay);
    tl.to(s, { y: c.dy + c.fall, x: c.dx + c.drift, duration: 1.7, ease: "power1.in" }, t12 + c.delay + 0.4);   // still falling at the cut
  });

  // ---------- 1.13 (9.3 → 10.7) falling with the camera, «Estás perdiendo mucho dinero» ----------
  // the camera keeps dropping with the coins right up to the cut: the rain carries us into the orange
  const t13 = T + 9.3;
  tl.to("#s1-webs", { opacity: 0, duration: 0.3, ease: "power2.in" }, t13);
  tl.to("#s1-t5a", { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" }, t13);
  tl.to("#s1-grid5", { backgroundPositionY: "-520px", duration: 1.4, ease: "power1.in" }, t13);
  tl.to("#s1-coins", { y: -220, duration: 1.4, ease: "power1.in" }, t13);
  // words land by ~12.05 s; the line keeps growing until the cut
  tiltWords(tl, "#s1-t5b", t13 + 0.05, { hold: 0.35 });

  // ---------- 1.14 (10.7 → 12.0) cut to orange · «Sin enterarte» straight from the coins ----------
  const t14 = T + 10.7;
  hide(tl, "#s1-p5", t14); show(tl, "#s1-p6", t14);
  tiltWords(tl, "#s1-t6", t14 + 0.05, { hold: 0.45 });
  textOut(tl, "#s1-t6", T + 12.0 - 0.42, { mode: "zoom" });      // whips through the lens into block 02
}
