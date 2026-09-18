// Additional detail over the V6 effects, only before the 50.70 s music handoff.
// Moments denote the action; audio.mjs subtracts each file's measured transient peak.
import { CARDS } from './scenes/s3.mjs';
import { MOTION } from './motion-cues.mjs';
const cue=(file,scene,at,gain,note)=>[file,scene,at,gain,note];
export const DETAIL_SFX = [
  cue('signal-tick','s1',.76,.25,'convergencia de luces'),
  ...[1.65,1.817,1.983].map((t,i)=>cue('ui-touch','s1',t,.48,`visitante ${i+1}`)),
  cue('card-sort','s1',4.58,.38,'llegada de tarjetas'),
  cue('card-sort','s1',4.96,.30,'segunda oleada de tarjetas'),
  cue('signal-tick','s1',5.60,.30,'foco en Marta'),
  cue('ui-latch','s1',6.65,.38,'foco en Daniel'),
  ...[7.80,7.925,8.05].map((t,i)=>cue('panel-seat','s1',t,.33,`asentamiento web ${i+1}`)),
  cue('coin-detail','s1',8.90,.34,'primer grupo de monedas'),
  cue('coin-detail','s1',9.24,.25,'cola de monedas'),
  cue('message-in','s2',.60,.30,'chat aparece'),
  cue('ui-latch','s2',2.55,.42,'contacto del botón chat'),
  cue('ui-latch','s2',3.33,.40,'contacto del botón enviar'),
  cue('confirm-soft','s2',3.60,.27,'mensaje enviado'),
  cue('slot-mechanism','s2',MOTION.slot.pull,.42,'giro mecánico y tres frenadas según el reloj visual'),
  ...CARDS.filter(c=>c.lead).map((c,i)=>cue(i%2?'ui-latch':'panel-seat','s3',c.t+.12,.32,`herramienta ${i+1}`)),
  ...CARDS.filter((c,i)=>!c.lead&&(i-6)%6===0).map((c,i)=>cue(i%2?'card-sort':'message-in','s3',c.t+.09,.25+i*.018,`oleada de mensajes ${i+1}`)),
  cue('glitch-cut','s3',2.54,.23,'densidad de mensajes'),
  cue('panel-seat','s3',4.02,.26,'calendario vacío se asienta'),
  ...[.82,1.028,1.237].map(t=>cue('ui-touch','s4',t,.30,'estado leído')),
  ...[5.222,5.5,5.778].map(t=>cue('signal-tick','s4',t,.28,'check de relación')),
  cue('step-mark','s4',6.50,.34,'llegada a COMPRA'),
  ...[2.0,2.312,2.625].map(t=>cue('signal-tick','s5',t,.30,'señal en el panel')),
  cue('ui-touch','s5',3.27,.32,'contador actualizado'),
  cue('panel-seat','s5',5.85,.34,'perfil Ploot se asienta'),
  cue('ui-latch','s5',6.80,.38,'clic Seguir'),
  ...[8.60,8.725,8.85].map(t=>cue('panel-seat','s5',t,.30,'web en la comparación')),
  ...[8.92,9.05,9.18].map(t=>cue('ui-touch','s5',t,.28,'salto del visitante')),
  cue('signal-tick','s5',10.505,.23,'palabra señales'),
  cue('confirm-soft','s5',10.715,.28,'palabra compra'),
  cue('glitch-cut','s5',14.56,.28,'desaparecen las señales'),
];
