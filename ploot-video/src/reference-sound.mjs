// A restrained UI palette for the client reference direction.
// Uses licensed stock edits, not audio extracted from the competitor video.
// Cue times remain owned by the existing motion/voice clock.
function baseReferenceCue([file, block, time, volume, note]) {
  let sound=file, gain=volume;
  if(file==='whoosh') {
    if(/^(card|cards|líneas|reorden)$/.test(note)) return null;
    if(/caen las frías/.test(note)) {sound='ui-dismiss';gain=.52;}
    else if(/bisagra|corte|naranja|transforma|hacia el cierre/.test(note)) {sound='motion-flick';gain=.28;}
    else if(/sale|salen|baja|cae|aleja|pull-back/.test(note)) {sound='motion-pull';gain=.24;}
    else {sound='motion-glide';gain=.24;}
  } else if(file==='whoosh-cinematic') {
    if(/cola final/.test(note)) return null;
    sound='motion-glide';gain=.26;
  } else if(file==='riser') {sound='logo-inhale';gain=.30;}
  else if(file==='impact-bass-2') {sound='logo-lock';gain=.40;}
  else if(file==='impact-bass-1') {
    sound=/Uno|Dos|Tres|COMPRA/.test(note)?'step-mark':'panel-seat';gain=.45;
  } else if(file==='click') {sound='ui-latch';gain=.65;}
  else if(file==='pop') {
    sound=/moneda/.test(note)?'coin-detail':/reunión|check|leído|señal|momento ideal/.test(note)?'signal-tick':'panel-seat';
    gain=/reunión|momento ideal/.test(note)?.43:.39;
  } else if(file==='chime') {sound='confirm-soft';gain=/Siguiendo|Top Voice/.test(note)?.48:.38;}
  else if(file==='sparkle') {
    if(/Ploot|logo|botón/.test(note)) return null;
    sound='coin-detail';gain=.34;
  } else if(file==='notification') {sound='message-in';gain=.34;}
  else if(file==='error') {sound='ui-dismiss';gain=.40;}
  else if(file==='glitch-3') {sound='glitch-rewind';gain=.18;}
  else if(file==='typing') {sound='type-detail';gain=.42;}
  else if(file==='glitch-cut') {gain=.17;}
  else if(file==='slot-mechanism') {gain=.32;}
  else if(file==='ui-touch'||file==='ui-latch') {gain=Math.min(.64,volume*1.18);}
  return [sound,block,time,gain,note];
}

// Digital articulation follows the existing action clock. Physical UI contacts remain varied.
export function referenceCue(input) {
  const cue=baseReferenceCue(input);
  if(!cue) return null;
  const [original,block,, ,note]=input;
  let [sound,scene,time,gain,label]=cue;
  if(original==='glitch-3') {sound='glitch-rewind';gain=.43;}
  else if(original==='glitch-cut') {sound=/desaparecen/.test(note)?'glitch-drop':'glitch-burst';gain=.43;}
  else if(/caen las frías/.test(note)) {sound='glitch-drop';gain=.43;}
  else if(/oleada de mensajes|densidad de mensajes/.test(note)) {sound='glitch-burst';gain=.33;}
  else if(original==='card-sort') {sound='glitch-scan';gain=.34;}
  else if(original==='whoosh' && /transforma a negro/.test(note)) {sound='glitch-drop';gain=.43;}
  else if(original==='whoosh' && /bisagra/.test(note)) {
    sound=['s1','s3','s6'].includes(block)?'glitch-lock':'glitch-burst';gain=.39;
  }
  else if(original==='whoosh' && /sube el panel|sube la lista|sube el perfil|entra el perfil|sube la ventana|se aleja el mapa/.test(note)) {sound='glitch-scan';gain=.34;}
  else if(original==='error') {sound='glitch-drop';gain=.37;}
  else if(original==='ui-touch' && /contador actualizado|salto del visitante/.test(note)) {sound='glitch-tick';gain=.34;}
  // New CC0 interface recordings replace every glitch at the existing visual accent.
  const soft={
    "glitch-tick":["soft-tap",.32],
    "glitch-burst":[/mensajes/.test(note)?"soft-message":"soft-pulse",.26],
    "glitch-scan":["soft-slide",.29],
    "glitch-drop":["soft-dismiss",.32],
    "glitch-lock":["soft-lock",.40],
    "glitch-rewind":["soft-shuffle",.25],
  };
  if(soft[sound]) [sound,gain]=soft[sound];
  // V8: replace only the rejected V6 accents. Original clicks, confirmations,
  // notifications and unrelated motion cues retain their original gains.
  const replacements={
    "soft-lock":["warm-seat",.48], "soft-slide":["warm-swish",.50],
    "soft-shuffle":["tape-rewind-short",.006], "soft-message":["warm-tick",.38],
    "soft-dismiss":["warm-away",.46], "soft-pulse":["warm-knock",.42],
    "soft-tap":["warm-tick",.40],
  };
  if(replacements[sound]) [sound,gain]=replacements[sound];
  if(sound==='motion-pull' && block==='s2' && /cae el chat/.test(note) && time<3) {sound='warm-swish';gain=.50;}
  if(block==='s5' && /palabra señales|palabra compra/.test(note)) {sound='warm-tick';gain=.35;}
  if(original==='whoosh' && block==='s1' && /sube la web/.test(note)) {sound='whoosh';gain=.28;}
  if(original==='whoosh' && block==='s4' && /naranja/.test(note)) {sound='motion-glide';gain=.30;}
  return [sound,scene,time,gain,label];
}

const family = f => (f.startsWith('warm-')||f.startsWith('glitch-')||f.startsWith('soft-'))?'accent': ['ui-touch','ui-latch','ui-dismiss'].includes(f)?'contact'
  :['signal-tick','confirm-soft','message-in'].includes(f)?'notification'
  :f.startsWith('motion-')?'movement':f;

// One sound per close duplicate in the same family. Distinct physical layers may coexist.
export function compactReferenceCues(cues) {
  const kept=[];
  for(const c of [...cues].sort((a,b)=>a.at-b.at)) {
    const duplicate=kept.findIndex(k=>family(k.e[0])===family(c.e[0])&&Math.abs(k.at-c.at)<.085);
    if(duplicate<0) kept.push(c);
    else if(c.e[3]>kept[duplicate].e[3]) kept[duplicate]=c;
  }
  return kept.sort((a,b)=>(a.at-a.lib.peak)-(b.at-b.lib.peak));
}
