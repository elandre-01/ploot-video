// V10: complete each action, hold its result, then hand over to the next step.
// Motion contracts: control-target-sync and press-release-spring.
function s7(tl, T) {
  const D = DATA.s7;
  const title = (id, at, hold = 1) => tiltWords(tl, id, T + at, { gap: .075, dur: .46, tilt: -.6, from: .99, grow: 1.005, hold });
  const leave = (id, at, duration = .38) => textOut(tl, id, T + at, { dur: duration });
  const panelIn = (id, at, duration = .85) => {
    tl.fromTo(id, { y: 125, opacity: 0, scale: .985 },
      { y: 0, opacity: 1, scale: 1, duration, ease: 'power2.out', immediateRender: false }, T + at);
  };
  const panelOut = (id, at, duration = .42) => tl.to(id,
    { y: -65, opacity: 0, duration, ease: 'power2.inOut' }, T + at);

  // ONE: readable dashboard, then an audience profile with a clear settled result.
  show(tl, '#s7-p1', T);
  title('#s7-t0', 0, .4); leave('#s7-t0', .6);
  title('#s7-t1', 1, 2.2);
  tl.set('#s7-dash', { rotationX: 2, rotationY: -3 }, T + .95);
  panelIn('#s7-dash', .95, .85);
  tl.fromTo('#s7-cam0', { scale: 1, x: 0, y: 0 },
    { scale: 1.035, duration: 2.15, ease: 'sine.inOut', immediateRender: false }, T + .95);
  // The button reacts while the whole interface is still readable.
  click(tl, '#s7-cur0', T + 2.5, '#s7-chatbtn', { press: .96, burst: false });
  panelOut('#s7-dash', 2.78, .5);
  show(tl, '#s7-p2', T + 3.1);
  hide(tl, '#s7-p1', T + 3.1);
  tl.set('#s7-t2 .w', { opacity: 1, y: 0 }, T + 3.1);
  tl.set('#s7-cprof', { rotationX: 2, rotationY: -3 }, T + 3.1);
  panelIn('#s7-cprof', 3.1, .85);
  leave('#s7-t2', 3.35);
  title('#s7-t3', 3.75, 1.4);
  count(tl, '#s7-fol', T + 3.55, 1240, 12480, 1.2, { ease: 'power2.inOut' });
  tl.fromTo('#s7-gold', { opacity: 0, scale: 1.06 },
    { opacity: 1, scale: 1, duration: .45, ease: 'power2.out', immediateRender: false }, T + 4.6);
  tl.fromTo('#s7-tv', { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: .4, ease: 'power2.out', immediateRender: false }, T + 4.7);
  panelOut('#s7-cprof', 5.36, .44); leave('#s7-t3', 5.4);

  // TWO: list arrives, sorts, then holds the selected leads before the next title.
  hide(tl, '#s7-p2', T + 5.8); show(tl, '#s7-p3', T + 5.8);
  title('#s7-t4', 5.8, .4); leave('#s7-t4', 6.42);
  title('#s7-t5', 6.8, 3.3);
  tl.set('#s7-leads', { rotationX: 12, rotationY: -3, rotationZ: -1, transformOrigin: '50% 50%' }, T + 6.8);
  tl.set('#s7-cam3', { scale: 1, x: 0, y: -22 }, T + 6.8);
  panelIn('#s7-leads', 6.8, .9);
  tl.to('#s7-leads',{rotationY:6,rotationX:5,rotationZ:1.2,z:65,duration:4,ease:'none'},T+6.8);
  tl.to('#s7-cam3',{y:-15,scale:1.10,duration:4,ease:'none'},T+6.8);
  const order = D.leads.map((f, i) => ({ f, i })).sort((a,b)=>b.f-a.f||a.i-b.i);
  order.forEach((lead, slot) => {
    // Selected leads take one continuous path to their final centred position.

    if (lead.f === 3) {
      tl.to('#s7-lr-'+lead.i,{y:(slot-lead.i)*106+152,duration:2.6,ease:u=>.94*(1-Math.pow(1-u,4))+.06*u},T+8.2);
      tl.to('#s7-lr-'+lead.i,{z:88,rotationY:0,duration:2.6,ease:u=>.94*(1-Math.pow(1-u,4))+.06*u},T+8.2);
      tl.to('#s7-lr-' + lead.i, { borderColor: '#f43600', duration: .35 }, T + 9.2);
      tl.fromTo('#s7-lr-' + lead.i + ' .ideal', { opacity: 0, y: 7 },
        { opacity: 1, y: 0, duration: .4, ease: 'power2.out', immediateRender: false }, T + 9.45);
      tl.to('#s7-lr-' + lead.i + ' .old', { opacity: 0, duration: .25 }, T + 9.6);
      tl.fromTo('#s7-lr-' + lead.i + ' .new', { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: .35, ease: 'power2.out', immediateRender: false }, T + 9.6);
    } else {
      tl.to('#s7-lr-' + lead.i, { x:90, y:-20, z:-180, scale:.97, autoAlpha:0, duration:.72, ease:'power2.inOut' }, T + 8.25 + (slot-3)*.06);
    }
  });
  // The list is a preserve-3d plane whose rows sit at z:88: fading the plane itself flattens its 3D context on the first
  // frame with opacity < 1 (the rows snap to a smaller projection). So the plane only moves; the rows carry the fade.
  tl.to('#s7-leads', { y: -65, duration: .44, ease: 'power2.inOut' }, T + 10.36);
  tl.to('#s7-leads .lrow', { opacity: 0, duration: .44, ease: 'power2.inOut' }, T + 10.36);
  leave('#s7-t5', 10.4);

  // THREE is authored below in final seconds, against Luke’s word boundaries.
  hide(tl, '#s7-p3', T + 10.8); show(tl, '#s7-p4', T + 10.8);
}

// Final composition seconds (added AFTER the shared beat remap).
// V14: one interface at a time, and the next phrase follows without a held gap.
function s7Contact(tl) {
  const beat = label => DATA.beat.anchors.find(a => a.label === label).new;
  const title = (id, time, hold = .6) => tiltWords(tl, id, time,
    { gap: .05, dur: .3, tilt: -.4, from: .99, grow: 1.005, hold });
  const leave = (id, time, dur = .25) => textOut(tl, id, time, {dur});
  const start = beat('tres'), chat = beat('conversacion'), cal = beat('calendario-demos');
  title('#s7-t7', start, .2); leave('#s7-t7', chat - .22, .22);
  title('#s7-t8', chat + .08, .55); leave('#s7-t8', DATA.beat.contactCaptions.leadOut, .24);
  title('#s7-t9', DATA.beat.contactCaptions.momentIn, .7); leave('#s7-t9', DATA.beat.contactCaptions.momentOut, .24);
  title('#s7-t10', cal + .02, .85); leave('#s7-t10', beat('salida-calendario'), .24);
  tl.set('#s7-cam4', {scale:1, x:0, y:0}, start);

  // Contact: the interface and first paragraph arrive on the spoken action.
  tl.fromTo('#s7-a', {x:-90,y:100,opacity:0,scale:.96,rotationX:10,rotationY:-10},
    {x:0,y:0,opacity:1,scale:1,rotationX:4,rotationY:-5,duration:.52,ease:'power3.out',immediateRender:false}, chat);
  tl.to('#s7-a', {rotationX:1,rotationY:4,rotationZ:.6,z:38,duration:DATA.beat.contactExit.end-(chat+.52),ease:'none'}, chat+.52);
  for(let i=0;i<DATA.s7.paragraphs;i++) {
    tl.fromTo('#s7-par-'+i, {opacity:0,y:7},
      {opacity:1,y:0,duration:.25,ease:'power2.out',immediateRender:false},beat('parrafo-'+(i+1)));
  }
  const send=beat('enviar'), reply=beat('respuesta');
  tl.to('#s7-send',{scale:.93,duration:.12,ease:'power1.in'},send);
  tl.to('#s7-send',{scale:1,duration:.36,ease:'power2.out'},send+.12);
  tl.fromTo('#s7-a-stamp',{opacity:0,y:5},
    {opacity:1,y:0,duration:.25,ease:'power2.out',immediateRender:false},send+.12);
  tl.fromTo('#s7-chip1',{opacity:0,y:12},
    {opacity:1,y:0,duration:.3,ease:'power2.out',immediateRender:false},send+.15);
  tl.fromTo('#s7-a-reply',{opacity:0,x:-8,y:10},
    {opacity:1,x:0,y:0,duration:.2,ease:'power2.out',immediateRender:false},reply);
  tl.to('#s7-chip1',{opacity:0,y:-12,duration:.24,ease:'power2.in'},DATA.beat.contactCaptions.chipOut);

  // Finish the message's exit before revealing the calendar: no co-visible frame.
  const out=DATA.beat.contactExit;
  tl.to('#s7-a',{x:0,y:-70,scale:.97,opacity:0,duration:out.end-out.start,ease:'power2.inOut'},out.start);
  tl.fromTo('#s7-week',{x:0,y:95,scale:.97,rotationX:10,rotationY:-8,opacity:0},
    {x:0,y:0,scale:1,rotationX:4,rotationY:-4,opacity:1,duration:.5,ease:'power3.out',immediateRender:false},cal);
  tl.to('#s7-week',{rotationY:5,rotationX:1,rotationZ:-.7,z:45,duration:beat('salida-calendario')+.24-(cal+.5),ease:'none'},cal+.5);
  for(let i=0;i<DATA.s7.meetings;i++) {
    const time=DATA.beat.calendar.start+Math.floor(i/DATA.beat.calendar.groupSize)*DATA.beat.calendar.groupInterval;
    tl.fromTo('#s7-meet-'+i,{opacity:0,y:8,scale:.98},
      {opacity:1,y:0,scale:1,duration:DATA.beat.calendar.duration,ease:'power2.out',immediateRender:false},time);
  }
  count(tl,'#s7-resp',DATA.beat.calendar.start,0,DATA.s7.meetings,(Math.ceil(DATA.s7.meetings/DATA.beat.calendar.groupSize)-1)*DATA.beat.calendar.groupInterval+DATA.beat.calendar.duration,{ease:'none'});
  tl.fromTo('#s7-agend',{opacity:0,y:6},
    {opacity:1,y:0,duration:.2,ease:'power2.out',immediateRender:false},beat('agenda-confirmada'));

  // The completed week leaves with the end of «reunión», straight into the CTA.
  tl.to('#s7-week',{y:-45,opacity:0,duration:.24,ease:'power2.inOut'},beat('salida-calendario'));

  // Gentle continuous float belongs only to the visible interval of each panel.
  tl.fromTo('#s7-chat-float',{y:0},{y:-18,x:12,duration:out.end-chat,ease:'none',immediateRender:false},chat);
  tl.fromTo('#s7-week-float',{y:0},{y:-18,x:-10,duration:beat('salida-calendario')+.24-cal,ease:'none',immediateRender:false},cal);
}
