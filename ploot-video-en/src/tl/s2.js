function s2(tl, T) {
  const D = DATA.s2;
  // ---------- 2.1 (0 → 0.55) ----------
  show(tl, "#s2-p1", T);
  // magnetic from the right, word by word (same language as «Ahora mismo»), then whips into the timeline
  magnetic(tl, "#s2-t1", T + 0.02, { gap: 0.045, x: 90, dur: 0.28 });
  textOut(tl, "#s2-t1", T + 0.35, { mode: "zoom", dur: 0.2 });

  // ---------- 2.2 (0.55 → 1.05) chat abierto en el centro · las señales entran por los bordes (storyboard v2) ----------
  const t2 = T + 0.55;
  hide(tl, "#s2-p1", t2); show(tl, "#s2-p2", t2);
  tilt3D(tl, "#s2-cam", t2, { ry: -4, rx: 2, z: 0 });
  orbit3D(tl, "#s2-cam", t2, 2.2, { dry: 7, drx: -3, dz: 90 });
  tl.set("#s2-wchat", { rotationY: -9, rotationX: 6, transformOrigin: "50% 50%" }, t2);
  popIn(tl, "#s2-wchat", t2, { from: 0.84, y: 70, dur: 0.5, ease: "expo.out" });
  drift(tl, "#s2-wchat", t2 + 0.5, 0.65, { ry: 3, rx: -2, y: 8, scale: 0.02 });
  depth(D.sigs.map((_, i) => "#s2-sg-" + i), [120, -160, 60, -220, 160, -100]);
  D.sigs.forEach((c, i) => {
    const sel = "#s2-sg-" + i, t = t2 + 0.1 + i * fr(1.2);
    tl.set(sel, { x: c.from, opacity: 0, filter: "blur(6px)" }, t2);
    tl.to(sel, { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "expo.out" }, t);
    tl.set(sel, { clearProps: "filter" }, t + 0.451);
  });

  // ---------- 2.3 (1.05 → 1.7) «Como hace…» · iconos de rebobinar · el plano va hacia atrás ----------
  const t3 = T + 0.90;
  tiltWords(tl, "#s2-t2", t3, { gap: 0.085, dur: 0.44, hold: 0.95 });
  D.rew.forEach((_, i) => {
    const sel = "#s2-rw-" + i, t = t3 + 0.05 + i * fr(1);
    tl.fromTo(sel, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out", immediateRender: false }, t);
    tl.to(sel, { opacity: 0.35, duration: fr(2), ease: "none" }, t + 0.3);        // 2f blink
    tl.to(sel, { opacity: 1, duration: fr(2), ease: "none" }, t + 0.3 + fr(2));
  });
  // rewind: the signals lose focus, then ride back to their edges (their entrance, reversed)
  D.sigs.forEach((c, i) => {
    const sel = "#s2-sg-" + i, t = t3 + 0.35 + i * fr(1.5);
    tl.to(sel, { x: c.from * 0.6, opacity: 0, filter: "blur(8px)", duration: 0.45, ease: "power2.in" }, t);
  });

  // ---------- 2.4 (1.7 → 2.0) solo queda el chat · el kinetic completo · hold ----------
  const t4 = T + 1.7;
  D.rew.forEach((_, i) => tl.to("#s2-rw-" + i, { opacity: i === 1 ? 0.45 : 0, scale: 0.85, duration: 0.35, ease: "power2.in" }, t4 + i * fr(1.5)));
  tl.to("#s2-rw-1", { opacity: 0, duration: 0.3 }, t4 + 0.5);
  textOut(tl, "#s2-t2", T + 2.35 - 0.32);
  fallOut(tl, "#s2-wchat", T + 2.35 - 0.32, { y: 220, dur: 0.3 });

  // ---------- 2.5 (2.0 → 2.55) the network window rises from below, chat closed · the cursor heads straight to the chat button ----------
  const t5 = T + 2.35;
  hide(tl, "#s2-p2", t5); show(tl, "#s2-p3", t5);
  // the window's static tilt is applied at build time so the chat button can be measured in stage space
  gsap.set("#s2-feed", { rotationY: -8, rotationX: 5 });
  const rr = $("#root").getBoundingClientRect(), kk = 1920 / rr.width, br = $("#s2-fchat").getBoundingClientRect();
  const ICX = Math.round((br.left + br.width / 2 - rr.left) * kk), ICY = Math.round((br.top + br.height / 2 - rr.top) * kk);
  const chatEl = $("#s2-chat"), CH = chatEl.offsetHeight, CTOP = Math.round(632 - CH / 2);
  gsap.set(chatEl, { top: CTOP, left: 610 });
  // camera: pivots on the chat button and pans it to the centre while zooming ×1.7 (screen = O + (stage − O)·s + T)
  const ZS = 1.7, TX = 960 - ICX, TY = 632 - ICY;
  const stg = (sx, sy) => [ICX + (sx - 960) / ZS, ICY + (sy - 632) / ZS];   // stage point that lands on a screen point once zoomed
  tl.set("#s2-cam3", { scale: 1, x: 0, y: 0, transformOrigin: ICX + "px " + ICY + "px" }, t5);
  tl.set("#s2-chat", { x: 0, y: 0, scale: 0.2, opacity: 0, transformOrigin: "50% 50%" }, t5);
  tl.set("#s2-chat .tick", { opacity: 0 }, t5);
  tl.set("#s2-fscroll", { y: 0 }, t5);
  riseIn(tl, "#s2-feed", t5, { y: 480, rotX: 8, dur: 0.55, blur: 3 });
  lettersIn(tl, "#s2-t3", t5 + 0.15, { gap: fr(0.6), dur: fr(5), y: -14 });
  // the cursor (inside the camera) comes in and goes straight to the chat button; the camera starts centring on it as it moves
  const tip = (x, y) => ({ x: x - 20 - 1560, y: y - 13 - 1120 });
  const tI = t5 + 0.2, ZD = 0.7;   // everything from here to the send is compressed so «Que nadie abre» lands on the voice (15.73)
  tl.fromTo("#s2-cur1", { x: 0, y: 0 }, { ...tip(ICX, ICY), duration: 0.35, ease: "expo.out", immediateRender: false }, tI);
  tl.to("#s2-cam3", { scale: ZS, x: TX, y: TY, duration: ZD, ease: "power2.inOut" }, tI + 0.05);

  // ---------- 2.6 (2.55 → 3.18) click on the chat button · the chat opens in the centre · the window fades ----------
  const tC = tI + 0.35;
  click(tl, "#s2-cur1", tC, "#s2-fchat", { press: 0.86 });
  const tO = tC + 0.1, pO = gsap.parseEase("power2.inOut")((tO - tI - 0.05) / ZD);   // where the button is on screen when the chat opens
  tl.set("#s2-chat", { x: (ICX + TX * pO) - 960, y: (ICY + TY * pO) - 632, scale: 0.2 }, tO);
  tl.to("#s2-chat", { opacity: 1, duration: 0.1, ease: "power1.out" }, tO);
  tl.to("#s2-chat", { x: 0, y: 0, scale: 1.5, duration: 0.28, ease: "power3.out" }, tO);   // opens from the button into the centre
  tl.to("#s2-feed", { opacity: 0, filter: "blur(14px)", duration: 0.35, ease: "power2.in" }, tC + 0.2);   // the window disappears behind
  tl.set("#s2-feed", { display: "none" }, tC + 0.56);
  const [cx1, cy1] = stg(960, 700);
  tl.to("#s2-cur1", { ...tip(cx1, cy1), duration: 0.23, ease: "power2.inOut" }, tO + 0.05);
  // hand-off: once the chat covers it, the in-camera cursor gives way to a screen-space cursor drawn above the chat
  tl.set("#s2-cur4", { ...tip(960, 700), opacity: 0 }, t5);
  tl.set("#s2-cur1", { opacity: 0 }, tO + 0.28);
  tl.set("#s2-cur4", { opacity: 1 }, tO + 0.28);
  // read: the chat keeps creeping in very slowly while the message is read (never still)
  tl.to("#s2-chat", { scale: 1.56, duration: 0.3, ease: "sine.out" }, tO + 0.28);

  // ---------- 2.7 (3.18 → 5.85) click Send at the 2.6 size · sent · the chat lifts and «Que nadie abre» lands under it ----------
  const t7 = T + 3.33;
  const sb = $("#s2-chat .sendbtn"), sbx = sb.offsetLeft + sb.offsetWidth / 2, sby = sb.offsetTop + sb.offsetHeight / 2, SC = 1.56;
  tl.to("#s2-cur4", { ...tip(960 + (sbx - 350) * SC, 632 + (sby - CH / 2) * SC), duration: 0.28, ease: "power3.out" }, t7 - 0.25);
  click(tl, "#s2-cur4", t7 + 0.15, "#s2-chat .sendbtn", { press: 0.94 });
  textOut(tl, "#s2-t3", t7 + 0.15);   // «Mensajes en frío» stays until the send, so it is on screen while the voice says it
  // The composed message becomes the sent bubble and remains readable.
  tl.to("#s2-chat .bubble", { y: -4, backgroundColor: "#e8efff", duration: 0.3, ease: "power2.out" }, t7 + 0.2);
  tl.to("#s2-chat .cf", { opacity: 0.28, duration: 0.25, ease: "power2.out" }, t7 + 0.3);
  tl.set("#s2-chat .receipt-read", { opacity:0 }, t5);
  tl.to("#s2-chat .receipt-sent", { opacity:0, duration:0.12 }, t7 + 0.72);
  tl.to("#s2-chat .receipt-read", { opacity:1, duration:0.18 }, t7 + 0.8);
  tl.fromTo("#s2-chat .tick", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", immediateRender: false }, t7 + 0.4);   // sent confirmation followed by the read receipt
  tl.to("#s2-cur4", { y: "+=520", x: "+=120", duration: 0.4, ease: "power2.in" }, t7 + 0.35);   // the cursor leaves by the bottom
  // the chat drifts up (and settles a touch smaller) to make room; the line forms underneath it
  const tU = t7 + 0.35;
  tl.to("#s2-chat", { y: -200, scale: 1.3, duration: 0.55, ease: "power3.inOut" }, tU);
  tl.to("#s2-chat", { y: -212, scale: 1.32, duration: (T + 5.5 - 0.3) - (tU + 0.55), ease: "none" }, tU + 0.55);          // low-amplitude settle
  tiltWords(tl, "#s2-t4", tU + 0.2, { gap: fr(3.5), hold: 0.5 });
  textOut(tl, "#s2-t4", T + 5.5 - 0.28);
  fallOut(tl, "#s2-chat", T + 5.5 - 0.3, { y: 220, dur: 0.3 });

  // ---------- 2.11 – 2.13 omitted: the recorded VO has no «eventos carísimos sin retorno», so the chat hands over straight to the slot machine ----------

  // ---------- 2.14 (5.85 → 7.85) slot machine + phrase ----------
  const t14 = T + 5.5;
  hide(tl, "#s2-p3", t14); show(tl, "#s2-p6", t14);
  tl.set("#s2-slot", { rotationY: -10, rotationX: 6 }, t14);
  tl.fromTo("#s2-slot", { scale: 1.3, opacity: 0, filter: "blur(12px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "expo.out", immediateRender: false }, t14);
  tl.set("#s2-slot", { clearProps: "filter" }, t14 + 0.551);
  tl.to("#s2-slot", {rotationY:7,rotationX:1,rotationZ:1.2,z:60,duration:2.77,ease:"none"},t14);
  tl.to("#s2-slot", {y:-14,scale:1.035,duration:1.94,ease:"none"},t14+.55);
  tiltWords(tl, "#s2-t6", t14, { gap: fr(4), hold: 1.6 });
  // the cursor aims at the «Tirar» button, measured in the slot's own box (tip sits +20/+13 inside the cursor)
  const slotEl = $("#s2-slot"), pullEl = $("#s2-pull"), cur3 = $("#s2-cur3");
  const PX = parseFloat(slotEl.style.left || getComputedStyle(slotEl).left) + pullEl.offsetLeft + pullEl.offsetWidth / 2;
  const PY = parseFloat(slotEl.style.top || getComputedStyle(slotEl).top) + pullEl.offsetTop + pullEl.offsetHeight / 2;
  const c3x = parseFloat(cur3.style.left) + 20, c3y = parseFloat(cur3.style.top) + 13;
  tl.fromTo("#s2-cur3", { x: 0, y: 0 }, { x: PX - c3x, y: PY - c3y, duration: 0.5, ease: "power3.out", immediateRender: false }, t14);
  const tPull = T + DATA.motion.slot.pull;
  click(tl, "#s2-cur3", tPull, "#s2-pull", { press: 0.94 });
  const slot = DATA.motion.slot;
  const H = D.reelH;
  ["#s2-r1", "#s2-r2", "#s2-r3"].forEach((r, i) => {
    const strip = r + " .strip", duration = slot.stops[i] - slot.pull;
    tl.fromTo(strip, { y: 0 }, { y: -H * slot.rows[i], duration,
      ease: (u) => reelProgress(u * duration, duration, slot.acceleration, slot.brake), immediateRender: false }, tPull);
    tl.fromTo(strip, { filter: "blur(0px)" }, { filter: "blur(5px)", duration: slot.acceleration, ease: "power1.in", immediateRender: false }, tPull);
    tl.to(strip, { filter: "blur(0px)", duration: slot.brake, ease: "power2.out" }, T + slot.stops[i] - slot.brake);
    tl.set(strip, { clearProps: "filter" }, T + slot.stops[i] + .001);
    // Each casing absorbs its own stop; the whole machine no longer jerks three times.
    tl.fromTo(r, { y: 1.5 }, { y: 0, duration: 0.14, ease: "power3.out", immediateRender: false }, T + slot.stops[i]);
  });
  tl.to("#s2-cur3", { x: PX - c3x + 200, y: PY - c3y + 90, duration: 0.5, ease: "power2.inOut" }, tPull + 0.2);
  tl.to("#s2-r1 .strip i.ref", { scale: 1.08, duration: 0.15, ease: "power2.out" }, tPull + 0.95);
  tl.to("#s2-r1 .strip i.ref", { scale: 1, duration: 0.2 }, tPull + 1.1);
  // One exit carries the slot upwards while its background becomes the next orange scene.
  const t16 = T + 7.99;
  textOut(tl, "#s2-t6", t16, { dur: 0.24 });
  tl.to("#s2-slot", { y: -180, scale: 0.94, opacity: 0, duration: 0.28, ease: "power2.in" }, t16);
  tl.to("#s2-cur3", { y: "-=160", opacity: 0, duration: 0.24, ease: "power2.in" }, t16);
  tl.to("#s2-handoff", { opacity: 1, duration: 0.34, ease: "sine.inOut" }, t16);
}
