function s4(tl, T) {
  const D = DATA.s4;
  // ---------- 4.1 (0 → 0.7) magnetic from the right, ink on white ----------
  show(tl, "#s4-p1", T);
  tiltWords(tl, "#s4-t1", T + 0.05, { gap: fr(4), hold: 0.3 });

  // ---------- 4.2 (0.7 → 2.35) the line rises · inbox with «Leído» ----------
  const t2 = T + 0.12;
  // one gesture: the inbox comes up from below and pushes the line up with it — same curve, same brake
  tl.set("#s4-inbox", { rotationY: -14, rotationX: 9, transformOrigin: "50% 50%" }, t2);
  tl.fromTo("#s4-inbox", { y: 640, opacity: 0, rotationX: 24, scale: 0.94, filter: "blur(8px)" },
    { y: 0, opacity: 1, rotationX: 9, scale: 1, filter: "blur(0px)", duration: 0.82, ease: "power3.out", immediateRender: false }, t2);
  tl.set("#s4-inbox", { clearProps: "filter" }, t2 + 0.821);
  tl.to("#s4-t1", { y: -440, scale: 0.68, duration: 0.82, ease: "power3.out" }, t2 + 0.06);
  // it never rests: the turn starts while it is still braking; the creep takes over once it has landed
  tl.to("#s4-inbox", { rotationY: -3, duration: (T + 2.37) - (t2 + 0.4), ease: "none" }, t2 + 0.4);
  tl.to("#s4-inbox", { rotationX: 8, scale: 1.006, y: -3, duration: (T + 2.05) - (t2 + 0.82), ease: "sine.inOut" }, t2 + 0.82);
  tl.to("#s4-inbox", {y:-120,z:-320,scale:.96,opacity:0,duration:.32,ease:"power2.in"},T+2.05);
  tl.to("#s4-inbox", {rotationX:6,duration:.32,ease:"none"},T+2.05);
  tl.to("#s4-t1", { opacity: 0, y: -470, duration: 0.3, ease: "power2.in" }, T + 2.07);
  for (let i = 0; i < 6; i++) {
    const t = t2 + 0.7 + i * fr(2.5);
    tl.set("#s4-rd-" + i, { className: "rd on" }, t);
    tl.fromTo("#s4-rd-" + i, { scale: 1.25, backgroundColor: "rgba(31,164,99,.28)" }, { scale: 1, backgroundColor: "rgba(31,164,99,0)", duration: 0.4, ease: "power3.out", immediateRender: false }, t);
  }

  // ---------- 4.3 (2.35 → 4.05) orange ----------
  const t3 = T + 2.35;
  hide(tl, "#s4-p1", t3); show(tl, "#s4-p2", t3);
  tiltWords(tl, "#s4-t2", t3, { gap: fr(3.5), hold: 0.3 });
  textOut(tl, "#s4-t2", T + 4.05 - 0.4, { mode: "zoom" });   // whips into the relationship line

  // ---------- 4.4 – 4.8 (4.05 → 6.78) the relationship line: one continuous travelling with a 3D turn ----------
  const t4 = T + 4.05;
  hide(tl, "#s4-p2", t4); show(tl, "#s4-p3", t4);
  const target = (i, s) => ({ x: -((D.x[i] + D.cw / 2) - 960) * s, y: 0, scale: s });
  const line = $("#s4-line"), L = D.lineX[1] - D.lineX[0];
  gsap.set(line, { strokeDasharray: L, strokeDashoffset: L });
  tl.set("#s4-cam", { ...target(0, 1.8), rotationY: 16, rotationX: 4 }, t4);
  tl.to("#s4-cam", { scale: 1.35, x: target(0, 1.35).x, duration: 0.55, ease: "power3.out" }, t4);
  const reveal = (i, t) => {
    tl.fromTo("#s4-ph-" + i + " .top", { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out", immediateRender: false }, t);
    tl.fromTo("#s4-ph-" + i + " .sig", { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out", immediateRender: false }, t + fr(3));
  };
  const check = (i, t, hard = false) => {
    tl.fromTo("#s4-chk-" + i, { scale: hard ? 1.4 : 1.25, opacity: 0, transformOrigin: "0 50%" }, { scale: 1, opacity: 1, duration: hard ? 0.26 : 0.36, ease: "power4.out", immediateRender: false }, t);
  };
  tl.set("#s4-ph-0 .top, #s4-ph-0 .sig", { opacity: 0 }, t4);
  reveal(0, t4 + 0.15); check(0, t4 + 0.6);
  // the travelling never stops and never slows on the cards: one even glide along the whole line
  const tT = t4 + 0.55, DT = 1.9;
  tl.to("#s4-cam", { x: target(4, 1.35).x, duration: DT, ease: "power1.inOut" }, tT);
  tl.to(line, { strokeDashoffset: 0, duration: DT, ease: "power1.inOut" }, tT);
  // the 3D turn rides on the travelling: the line swings from one side of the lens to the other
  tl.to("#s4-cam", { rotationY: -14, rotationX: -2, duration: DT, ease: "sine.inOut" }, tT);
  tl.to("#s4-cam", { scale: 1.45, duration: 1.4, ease: "sine.inOut" }, tT + DT - 1.4);      // closes in on COMPRA
  for (let k = 1; k <= 4; k++) {
    const t = tT + DT * (k <= 2 ? Math.sqrt((k / 4) / 2) : 1 - Math.sqrt((1 - k / 4) / 2));                                                          // the moment card k passes in front
    tl.to("#s4-ph-" + (k - 1), { opacity: 0.32, filter: "none", duration: 0.45, ease: "power2.out" }, t - 0.2);
    if (k < 4) check(k, t - 0.05, k === 3);
    if (k === 2 || k === 3) tl.fromTo("#s4-ph-" + k, { scale: 1.06 }, { scale: 1, duration: 0.4, ease: "power3.out", immediateRender: false }, t - 0.2);
  }
  // the lines ride with the cards: «A quien ya siguen» over the follow, «En quien ya confían» into the buy
  // the VO says «…y a quien ya confía» here (no «siguen»): one line only, riding the travelling
  tiltWords(tl, "#s4-t4", tT + 0.2, { gap: fr(4), hold: 1.0 });
  // The travelling lifts into black, preparing the next sentence on the same background.
  const t8 = tT + DT;
  tl.fromTo("#s4-ph-4", { scale: 1 }, { scale: 1.08, duration: 0.18, ease: "power2.out", immediateRender: false }, t8 - 0.1);
  textOut(tl, "#s4-t4", t8 - 0.1, { dur: 0.26 });
  tl.to("#s4-out", { y: -80, opacity: 0, duration: 0.32, ease: "power2.in" }, t8 - 0.04);
  tl.to("#s4-flash", { opacity: 1, duration: 0.32, ease: "sine.inOut" }, t8 - 0.04);
}
