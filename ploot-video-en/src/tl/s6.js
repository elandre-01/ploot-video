function s6(tl, T) {
  const D = DATA.s6;
  // ---------- 6.1 (0 → 0.35) one point of light ----------
  show(tl, "#s6-p1", T);
  tiltWords(tl, "#s6-intro", T + .04, {gap:.075,dur:.4,tilt:0,hold:1.6});
  textOut(tl, "#s6-intro", T + 2.22, {dur:.32});
  tl.fromTo("#s6-dot", { scale: 0, opacity: 1 }, { scale: 1, duration: fr(4), ease: "power2.out", immediateRender: false }, T);

  // ---------- 6.2 – 6.3 (0.35 → 1.4) the point of light becomes the pen: it slides to the start of the outline and draws the isotype ----------
  const t3 = T + 0.4;
  // the outline's start point in stage space (the dot's centre sits at 960/540)
  const tp = $("#s6-tpath"), sp0 = tp.getPointAtLength(0).matrixTransform(tp.getScreenCTM());
  const rr6 = $("#root").getBoundingClientRect(), kk6 = 1920 / rr6.width;
  const SX = (sp0.x - rr6.left) * kk6, SY = (sp0.y - rr6.top) * kk6;
  tl.to("#s6-dot", { x: SX - 960, y: SY - 540, scale: 0.8, duration: 0.15, ease: "power2.in" }, t3 - 0.15);
  tl.to("#s6-dot", { motionPath: { path: "#s6-tpath", align: "#s6-tpath", alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 0.8, ease: "power2.inOut" }, t3);   // the light rides the pen tip
  draw(tl, "#s6-tpath", t3, 0.8, { ease: "power2.inOut" });
  tl.to("#s6-dot", { scale: 0.3, opacity: 0, duration: 0.14, ease: "power2.in" }, t3 + 0.74);   // it dissolves into the burst as the stroke closes
  tl.fromTo("#s6-wave", { scale: 0.6, opacity: 1 }, { scale: 1.5, opacity: 0, duration: 0.8, ease: "power2.out", immediateRender: false }, t3 + 0.2);
  burstAt(tl, $("#s6-burst"), t3 + 0.78, { dur: 0.6, from: 0.3, to: 1.6 });   // the ring bursts as the stroke closes

  // ---------- 6.4 (1.4 → 2.2) the name, letter by letter ----------
  const t4 = T + 1.4;
  for (let i = 0; i < 5; i++) tl.fromTo("#s6-l-" + i, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: fr(7), ease: "power3.out", immediateRender: false }, t4 + i * fr(3));
  tl.to("#s6-fill", { opacity: 1, duration: 0.4, ease: "power2.out" }, t4);
  tl.to("#s6-tpath", { opacity: 0, duration: 0.4 }, t4 + 0.1);

  // ---------- 6.5 (1.9 → 2.5) expanding light · the grid returns ----------
  const t5 = T + 1.9;
  ["#s6-ring1", "#s6-ring2"].forEach((r, i) => tl.fromTo(r, { scale: 0.6, opacity: 1 }, { scale: 1.7, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false }, t5 + i * fr(8)));
  tl.to("#s6-grid", { opacity: 0.75, duration: 0.5 }, t5);

  // ---------- 6.6 – 6.7 (2.5 → 4.5) straight from the logo on black: the logo leaves, the background turns to the light gradient and the phrase forms ----------
  const t7 = T + 2.5;
  tl.to("#s6-logo", { scale: 1.12, y: -26, opacity: 0, duration: 0.38, ease: "power2.in" }, t7);
  tl.to("#s6-word", { y: -26, opacity: 0, duration: 0.38, ease: "power2.in" }, t7);
  tl.to("#s6-lightbg", { opacity: 1, duration: 0.45, ease: "power1.inOut" }, t7 + 0.05);   // the colour transforms, no signal field in between
  tiltWords(tl, "#s6-t1", t7 + 0.2, { gap: fr(4), hold: 0.4 });

  // ---------- 6.8 – 6.12 (4.5 → 8.07) the market as a tilted 3D plane: the team rises at the front edge and, without stopping,
  // arcs back onto the map as standing nodes; waves ripple on the plane; one curved line per avatar joins into a single line
  // that runs to the node, where the «Meeting booked» card stands up; the camera never stops (dolly-out → push-in) ----------
  const t8 = T + 4.5, t10 = T + 6.0, t12 = T + 6.85, tOut = T + 7.72, tEnd = T + 8.07;   // the burst at T + 1.18 (50.70) is where the music changes   // the recede lands exactly on the cut
  textOut(tl, "#s6-t1", t8 - 0.3, { mode: "zoom", dur: 0.4 });   // whips into the team
  hide(tl, "#s6-p1", t8 + 0.25); show(tl, "#s6-p2", t8);
  tl.set("#s6-p2", { opacity: 1 }, t8);
  tl.set("#s6-csvg", { opacity: 1 }, t8);
  D.blips.forEach((b, k) => tl.set("#s6-b-" + k, { opacity: 0 }, t8));
  // plane poses (rotationX tilts the far edge away); every standing element counter-rotates so it always faces the lens
  const STAND = ".sphere";
  const P0 = [56, 0], P1 = [42, -8];
  const pose = (t, dur, [rx, ry], ease) => {
    tl.to("#s6-plane", { rotationX: rx, rotationY: ry, duration: dur, ease }, t);
    tl.to(STAND, { rotationX: -rx, rotationY: -ry, duration: dur, ease }, t);
  };
  gsap.set(".sphere", { transformOrigin: "50% 50%" });
  gsap.set("#s6-cam", { scale: 1, x: 0, y: 0, transformOrigin: "960px 540px" });
  gsap.set("#s6-plane", { rotationX: P0[0], rotationY: P0[1], transformOrigin: "50% 50%" });
  gsap.set(STAND, { rotationX: -P0[0], rotationY: -P0[1] });
  // camera: one slow, continuous dolly-out while the team arrives, radiates and joins — no push-in
  tl.set("#s6-cam", { scale: 1.04, x: 0, y: 20 }, t8);
  tl.to("#s6-cam", { scale: 0.94, y: 0, duration: tOut - t8, ease: "sine.inOut" }, t8);
  pose(t8, tOut - t8, P1, "sine.inOut");
  // and, as soon as the lines have met, everything simply recedes into the background along Z and fades to nothing
  tl.to("#s6-plane", { z: -1500, duration: tEnd - tOut, ease: "power2.in" }, tOut);        // the whole map falls back in depth
  tl.to("#s6-cam", { opacity: 0, duration: tEnd - tOut - 0.05, ease: "power2.in" }, tOut + 0.05);   // …and fades to nothing as it goes
  hide(tl, "#s6-p2", tEnd + 0.2);
  tl.to("#s6-t3 .line", { scale: 0.62, opacity: 0, duration: tEnd - tOut, ease: "power2.in" }, tOut);   // the phrase goes back with it
  tl.to("#s6-halo, #s6-sign", { opacity: 0, duration: 0.3, ease: "power2.in" }, tOut);
  // the team: each sphere comes in over the front edge and goes straight to its spot on the map (one gently curved
  // path, decelerating, shrinking to a node); its centre lands exactly on the spot, so the plane waves are concentric with the face
  D.sphere.forEach((sp, i) => {
    const [mx, my] = D.map[i], sc = D.node / sp[2], tA = t8 + i * fr(2);
    const ex = mx - sp[0], ey = my - sp[1];
    const both = "#s6-sp-" + i + ", #s6-sh-" + i;
    tl.set(both, { x: 0, y: 380, scale: 1, opacity: 1 }, t8);
    tl.to(both, { motionPath: { path: [{ x: 0, y: 380 }, { x: ex * 0.5, y: ey * 0.5 + 150 }, { x: ex, y: ey }], curviness: 0.8 }, scale: sc, duration: 0.78, ease: "power3.out" }, tA);
    tl.to("#s6-sp-" + i + " .aro", { opacity: 1, duration: 0.25 }, tA + 0.62);
  });
  tl.fromTo("#s6-sign", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", immediateRender: false }, t8 + 0.15);
  tl.set("#s6-t2", { top: 68 }, t8);
  tiltWords(tl, "#s6-t2", t8 + 0.15, { hold: 0.5 });
  textOut(tl, "#s6-t2", T + 5.75);
  // the market appears under the arriving team, then blinks faintly (finite)
  D.blips.forEach((b, k) => tl.to("#s6-b-" + k, { opacity: b[3], duration: 0.5, ease: "power2.out" }, T + 5.3 + (k % 7) * fr(1)));
  D.blips.forEach((b, k) => { if (k % 5 === 0) tl.to("#s6-b-" + k, { opacity: b[3] * 0.4, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, T + 6.1 + (k % 4) * 0.2); });

  // 6.10 «En tu mejor canal de ventas» composes in the centre, between the avatars, over a soft halo · two waves per avatar rippling ON the plane
  tl.to("#s6-halo", { opacity: 1, duration: 0.5, ease: "power1.inOut" }, t10);
  tiltWords(tl, "#s6-t3", t10 + 0.05, { gap: fr(4), hold: 3.2 });
  D.map.forEach((_, i) => {
    for (let k = 0; k < 2; k++) {
      tl.fromTo("#s6-wp-" + i + "-" + k, { scale: 0.35, opacity: 0.9 }, { scale: 3.6, opacity: 0, duration: 1.3, ease: "power2.out", immediateRender: false }, t10 + 0.1 + i * fr(2) + k * 0.45);
    }
  });

  // 6.11 – 6.12 one curved line per avatar, all converging on the centre, under the phrase (the team becomes the channel)
  D.map.forEach((_, i) => { const t = t12 + 0.05 + i * fr(1); tl.set("#s6-cv-" + i, { opacity: 1 }, t); draw(tl, "#s6-cv-" + i, t, 0.55, { ease: "power3.out" }); });
}
