function s3(tl,T){
  const D=DATA.s3;
  show(tl,"#s3-p1",T);
  tiltWords(tl,"#s3-t1",T,{gap:.07,dur:.28,hold:.1});
  textOut(tl,"#s3-t1",T+.64,{mode:"zoom",dur:.38});
  hide(tl,"#s3-p1",T+1);show(tl,"#s3-p2",T+1);
  tiltWords(tl,"#s3-t2",T+1,{tilt:-1.5,from:.97,grow:1.02,gap:.07,hold:.3,dur:.36});
  textOut(tl,"#s3-t2",T+2.11,{mode:"up",dur:.22});
  tiltWords(tl,"#s3-t5",T+2.3,{tilt:0,from:.95,grow:1.02,gap:.055,hold:.25,dur:.28});
  // Each card keeps its travel direction after arrival and dissolves into depth.
  const flow=u=>.94*(1-Math.pow(1-u,3))+.06*u;
  D.cards.forEach((c,i)=>{
    const sel="#"+c.id,t=T+c.t,land=Math.min(c.lead?.46:.32,3.02-c.t);
    const retreat=T+Math.max(c.t+land+.12,2.78+(i%5)*.055);
    tl.set(sel,{rotation:c.rot,rotationY:(i%2?1:-1)*7,opacity:0,z:160},t);
    tl.fromTo(sel,{x:c.dx,y:c.dy,scale:1.08},
      {x:0,y:0,scale:1,duration:land,ease:flow,immediateRender:false},t);
    tl.to(sel,{opacity:c.op,duration:.16,ease:"power1.out"},t);
    tl.to(sel,{z:-680,rotationY:(i%2?1:-1)*16,rotationX:(i%3-1)*9,x:-c.dx*.15,y:-c.dy*.15,duration:T+3.48-(t+land),ease:"none"},t+land);
    tl.to(sel,{opacity:0,duration:T+3.48-retreat,ease:"power1.in"},retreat);
  });
  tl.fromTo("#s3-field",{scale:1,rotation:1.2,rotationY:-3},
    {scale:1.06,rotation:-1.2,rotationY:3,duration:2.48,ease:"none",immediateRender:false},T+1);
  tl.to("#s3-focus",{opacity:0,duration:.22,ease:"power2.in"},T+3.15);
  tl.to("#s3-t5 .line",{y:-380,opacity:0,duration:.3,ease:"power2.in"},T+3.14);
  tl.set("#s3-stage",{display:"none"},T+3.48);
  // Quieter, continuous calendar retreat after the pressure of the stack.
  const t6=T+3.38,tRetreat=T+5.51,tEnd=tRetreat+.38;
  tl.set("#s3-cal",{rotationY:-8,transformOrigin:"50% 50%"},t6);
  tl.fromTo("#s3-cal",{y:400,opacity:0,rotationX:18,scale:1.18,filter:"blur(5px)"},
    {y:35,opacity:1,rotationX:5,scale:1.12,filter:"blur(0px)",duration:.65,ease:"power3.out",immediateRender:false},t6);
  tl.set("#s3-cal",{clearProps:"filter"},t6+.651);
  tl.to("#s3-cal",{rotationY:-16,duration:tRetreat-(t6+.25),ease:"sine.inOut"},t6+.25);
  tl.to("#s3-cal",{scale:.97,y:10,rotationX:8,duration:tRetreat-(t6+.65),ease:"sine.inOut"},t6+.65);
  tiltWords(tl,"#s3-t6",T+4,{hold:.9});
  // The calendar accelerates away from the lens, pulled towards the centre.
  tl.to("#s3-cal",{z:-850,scale:.68,y:-30,rotationY:0,rotationX:0,opacity:0,filter:"blur(5px)",duration:.38,ease:"power3.in"},tRetreat);
  tl.to("#s3-t6",{scale:.86,opacity:0,duration:.3,ease:"power2.in"},tRetreat+.04);
  tl.to("#s3-dark,#s3-dark2",{opacity:1,duration:.28,ease:"power2.in"},tRetreat+.1);
  hide(tl,"#s3-p2",tEnd);show(tl,"#s3-p3",tEnd);
  tiltWords(tl,"#s3-why",tEnd,{gap:.06,dur:.36,tilt:0,hold:.5});
}
