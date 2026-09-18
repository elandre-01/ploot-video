// Timeline del bloque. `T` es el segundo absoluto en el que empieza el bloque (lo pasa build.mjs),
// así que todo se escribe como T + offset y el bloque entero se mueve cambiando una sola cifra.
//
// Este fichero es la plantilla canónica del lenguaje: una frase que entra y sale, un plano de UI
// que sube y no se queda quieto, una cámara que acompaña al cursor hasta el clic, y una bisagra.
// Copia la forma, cambia el contenido.
function s1(tl, T) {
  const D = DATA.s1;

  // Atajos locales: hacen legible el bloque y mantienen una sola cadencia en toda la pieza.
  const title = (id, at, hold = 1) => tiltWords(tl, id, T + at, { hold });
  const leave = (id, at, dur = 0.26) => textOut(tl, id, T + at, { dur });

  // ---------- fase 1 · sólo texto sobre negro ----------
  show(tl, "#s1-p1", T);
  title("#s1-t1", 0, 0.8);
  // Bisagra: la frase atraviesa la lente y el siguiente visual ya está entrando por debajo.
  textOut(tl, "#s1-t1", T + 1.6, { mode: "zoom" });

  // ---------- fase 2 · el panel sube y la línea lo acompaña ----------
  const t2 = T + 2.0;
  hide(tl, "#s1-p1", t2); show(tl, "#s1-p2", t2);

  // La pose estática se fija ANTES de medir: cualquier getBoundingClientRect posterior
  // devuelve ya la posición real en la que el elemento estará al pinchar.
  gsap.set("#s1-panel", { rotationY: -8, rotationX: 5, transformOrigin: "50% 50%" });

  riseIn(tl, "#s1-panel", t2, { y: 520, rotX: 14, dur: 0.85 });
  // Nada se queda quieto: mientras aguanta, deriva en una sola dirección.
  drift(tl, "#s1-panel", t2 + 0.85, 2.2, { ry: 3, rx: 1.5, y: 10, scale: 0.02 });
  title("#s1-t2", 2.05, 1.6);

  // Las filas aterrizan en cascada, no de golpe.
  for (let i = 0; i < D.rows; i++) {
    tl.fromTo("#s1-row-" + i, { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", immediateRender: false }, t2 + 0.35 + i * fr(2.5));
  }

  // ---------- el cursor y la cámara viajan juntos hasta el clic ----------
  // Se mide el botón en coordenadas de escena (1920×1080) con el plano ya en su pose.
  const rr = $("#root").getBoundingClientRect(), kk = 1920 / rr.width;
  const br = $("#s1-cta").getBoundingClientRect();
  const BX = (br.left + br.width / 2 - rr.left) * kk, BY = (br.top + br.height / 2 - rr.top) * kk;
  // La punta del cursor no es su esquina: vive al 21 % / 14 % de su caja (ver .cursor en styles.css).
  const CS = 96, tip = (x, y) => ({ x: x - 0.21 * CS - 1560, y: y - 0.14 * CS - 1120 });

  const tCur = t2 + 1.4, tClick = t2 + 2.2;
  // La cámara pivota SOBRE el botón y lo lleva al centro: el zoom no lo desplaza, sólo lo acerca.
  tl.set("#s1-cam", { transformOrigin: BX + "px " + BY + "px", scale: 1, x: 0, y: 0 }, t2);
  tl.fromTo("#s1-cur", { x: 0, y: 0 }, { ...tip(BX, BY), duration: 0.55, ease: "power3.out", immediateRender: false }, tCur);
  // Misma curva y misma duración que el cursor: los dos llegan juntos justo en el clic.
  tl.to("#s1-cam", { scale: 1.45, x: 960 - BX, y: 540 - BY, duration: tClick - tCur, ease: "power2.inOut" }, tCur);
  click(tl, "#s1-cur", tClick, "#s1-cta", { press: 0.92 });   // el anillo sale de la punta del cursor

  // ---------- salida ----------
  // La salida acelera y solapa con lo siguiente; nunca hay un frame vacío entre bloques.
  leave("#s1-t2", 4.6);
  fallOut(tl, "#s1-panel", T + 4.6, { y: 240, dur: 0.4 });
}
