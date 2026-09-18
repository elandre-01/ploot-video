function s8(tl, T) {
  // ---------- 8.1 (0 → 1.97) only text ----------
  show(tl, "#s8-p1", T);
  // one slow, continuous push across the whole close: nothing in this block ever stands still
  tl.set("#s8-p1", { transformOrigin: "960px 540px" }, T);
  tl.fromTo("#s8-p1", { scale: 1 }, { scale: 1.06, duration: 7.2, ease: "sine.inOut", immediateRender: false }, T);
  tl.set("#s8-web", { opacity: 0 }, T);
  tl.set("#s8-v1, #s8-v2, #s8-v3", { opacity: 0 }, T);
  tiltWords(tl, "#s8-t1", T, { gap: fr(4), hold: 0.2 });

  // ---------- 8.2 (1.97 → 3.15) the hook web returns, visitors identified ----------
  const t2 = T + 1.97;   // the web rises on a beat (82.71)
  textOut(tl, "#s8-t1", t2 - 0.3, { mode: "zoom", dur: 0.38 });   // whips into the hook web
  tl.set("#s8-web", { rotationY: -10, rotationX: 6, scale: 0.98, transformOrigin: "50% 50%" }, t2);
  tl.fromTo("#s8-web", { y: 420, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power4.out", immediateRender: false }, t2);
  tl.set("#s8-web", { clearProps: "filter" }, t2 + 0.601);
  drift(tl, "#s8-web", t2 + 0.6, 2.6, { ry: 3, rx: 1.5, y: 10, scale: 0.02 });
  tiltWords(tl, "#s8-t2", t2 + 0.15, { gap: fr(4), hold: 2.4 });
  ["#s8-v2", "#s8-v1", "#s8-v3"].forEach((v, i) => tl.fromTo(v, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32, ease: "power3.out", immediateRender: false, transformOrigin: "10% 10%" }, t2 + 0.55 + i * fr(3)));
  // where Javier's pill sits on screen, for the cursor
  const rr8 = $("#root").getBoundingClientRect(), kk8 = 1920 / rr8.width, pr = $("#s8-v2-tag").getBoundingClientRect();
  const PX8 = (pr.left + pr.width * 0.42 - rr8.left) * kk8, PY8 = (pr.top + pr.height / 2 - rr8.top) * kk8;

  // ---------- 8.3 (3.15 → 5.15) click on a visitor · their profile ----------
  const t3 = T + 3.15;   // the click on the visitor lands on a downbeat (84.19)
  tl.fromTo("#s8-cur", { x: 0, y: 0 }, { x: PX8 - 20 - 1500, y: PY8 - 13 - 1120, duration: 0.55, ease: "power3.out", immediateRender: false }, t3 - 0.3);
  click(tl, "#s8-cur", t3 + 0.3, "#s8-v2 .pill", { press: 0.92 });
  tl.to("#s8-web", { opacity: 0.2, filter: "blur(10px)", duration: fr(9), ease: "power2.in" }, t3 + 0.3);
  tl.to("#s8-v1, #s8-v3", { opacity: 0, duration: 0.25 }, t3 + 0.3);
  tl.to("#s8-v2", { opacity: 0, duration: 0.3, ease: "power2.in" }, t3 + 0.42);   // the pill gives way to his profile (frame 8.3)
  // his profile lands with a stronger 3D pose and keeps turning; the camera then pushes in on «Contactar» and stays there
  tl.set("#s8-prof", { rotationY: -13, rotationX: 8, transformOrigin: "50% 50%" }, t3);
  tl.set("#s8-cam", { scale: 1, x: 0, y: 0 }, T);
  tl.fromTo("#s8-prof", { scale: 0.94, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "power3.out", immediateRender: false }, t3 + 0.32);
  drift(tl, "#s8-prof", t3 + 0.72, 1.18, { ry: 2, rx: 1, y: 3, scale: 0.006 });
  // «Contactar» in screen space at the pose the card holds when the cursor reaches it (drift ≈ 40 %)
  gsap.set("#s8-prof", { rotationY: -13 + 2 * Math.sin(Math.PI / 2 * (1.77 - 0.72) / 1.18), rotationX: 8 - Math.sin(Math.PI / 2 * (1.77 - 0.72) / 1.18), y: -3 * Math.sin(Math.PI / 2 * (1.77 - 0.72) / 1.18), scale: 1 + 0.006 * Math.sin(Math.PI / 2 * (1.77 - 0.72) / 1.18), transformOrigin: "50% 50%" });
  const cr8 = $("#s8-contact").getBoundingClientRect();
  const CX8 = (cr8.left + cr8.width / 2 - rr8.left) * kk8, CY8 = (cr8.top + cr8.height / 2 - rr8.top) * kk8;
  gsap.set("#s8-prof", { clearProps: "transform" });
  // the camera starts closing in as soon as the card has landed and travels WITH the cursor: it pivots on the button and
  // carries it towards the centre, cursor and button share the same curve so they meet exactly at the click
  const QX8 = 1260, QY8 = 540, tZ8 = t3 + 0.55, DZ8 = 1.2;   // click «Contactar» on a beat (85.66)
  tl.set("#s8-cam", { transformOrigin: CX8 + "px " + CY8 + "px" }, t3);
  tl.to("#s8-cam", { scale: 1.42, x: QX8 - CX8, y: QY8 - CY8, duration: DZ8, ease: "power2.inOut" }, tZ8);
  tl.to("#s8-cur", { x: QX8 - 20 - 1500, y: QY8 - 13 - 1120, duration: DZ8, ease: "power2.inOut" }, tZ8);
  click(tl, "#s8-cur", tZ8 + DZ8 + 0.02, "#s8-contact", { press: 0.92 });
  tl.fromTo("#s8-alert", { backgroundColor: "#ffc9b5", scale: 1.04 }, { backgroundColor: "#fdece7", scale: 1, duration: 0.45, ease: "power2.out", immediateRender: false }, t3 + 0.55);

  // ---------- 8.4 (5.15 → 6.89) the button drops · cursor comes in ----------
  const t4 = T + 5.15;
  // the card leaves upward and fades; in the centre the outline of the CTA draws itself, then the button fills in, a size up
  tl.to("#s8-prof", { y: -260, opacity: 0, filter: "blur(8px)", duration: 0.42, ease: "power2.in" }, t4 - 0.1);
  tl.to("#s8-cam", { scale: 1.55, duration: 0.42, ease: "power2.in" }, t4 - 0.1);
  tl.to("#s8-web", { opacity: 0, filter: "blur(14px)", duration: 0.4, ease: "power2.in" }, t4 - 0.1);   // the web is gone for the CTA: clean plane
  tl.set("#s8-web", { display: "none" }, t4 + 0.31);
  textOut(tl, "#s8-t2", t4 - 0.25);
  tl.set("#s8-ctawrap", { opacity: 1 }, t4 + 0.1);
  tl.set("#s8-ctapath", { opacity: 1 }, t4 + 0.12);
  draw(tl, "#s8-ctapath", t4 + 0.12, 0.6, { ease: "power2.inOut" });
  tl.fromTo("#s8-cta", { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", immediateRender: false, transformOrigin: "50% 50%" }, t4 + 0.75);   // the button fills on a beat (86.64)
  tl.to("#s8-ctapath", { opacity: 0, duration: 0.25 }, t4 + 0.95);
  tl.fromTo("#s8-sub", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", immediateRender: false }, t4 + 1.3);   // the sub lands as the VO reads it
  const ctr = $("#s8-cta").getBoundingClientRect(), CTX = (ctr.left + ctr.width / 2 - rr8.left) * kk8, CTY = (ctr.top + ctr.height / 2 - rr8.top) * kk8;
  tl.to("#s8-cur", { x: CTX - 20 - 1500, y: CTY - 13 - 1120, duration: 0.6, ease: "power3.out" }, t4 + 0.7);

  // ---------- 8.5 (6.89 → 7.38) click · ripple in the two oranges ----------
  const t5 = T + 6.89;   // click on a beat (87.63)…
  click(tl, "#s8-cur", t5, "#s8-cta", { press: 0.96 });
  ["#s8-r1", "#s8-r2"].forEach((r, i) => tl.fromTo(r, { scale: 0.7, opacity: 1 }, { scale: 1.7, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, t5 + i * fr(8)));

  // ---------- 8.6 (7.38 → 9.71) orange · logo ----------
  const t6 = T + 7.38;   // …and the orange on the music's final downbeat (88.12)
  hide(tl, "#s8-p1", t6); show(tl, "#s8-p2", t6);
  burstAt(tl, $("#s8-burst"), t6, { dur: 0.65, from: 0.3, to: 1.5 });
  tl.fromTo("#s8-logo", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: "expo.out", immediateRender: false }, t6 + fr(2));
  tl.to("#s8-logo", { scale: 1.025, duration: 1.36, ease: "sine.out" }, t6 + fr(2) + 0.55); // final 0.33 s locks cleanly
}
