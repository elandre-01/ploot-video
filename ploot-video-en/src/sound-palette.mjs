// Offline edits of the licensed library; no playback-time synthesis or network.
// Run after sound-design.mjs. Short material families replace repeated transition sweeps.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('../assets/sfx/', import.meta.url));
const rate = 48000;
function source(file, start, duration, filter = '') {
  const args = ['-hide_banner','-loglevel','error','-i',dir+file,'-af',
    `atrim=start=${start}:duration=${duration},asetpts=PTS-STARTPTS${filter ? ','+filter : ''}`,
    '-ar',String(rate),'-ac','1','-f','f32le','pipe:1'];
  const p = spawnSync('ffmpeg', args, {maxBuffer: 16*1024*1024});
  if (p.status !== 0) throw Error(p.stderr.toString());
  return Array.from({length:p.stdout.length/4},(_,i)=>p.stdout.readFloatLE(i*4));
}
const sources = {
  touch: source('click-soft.mp3',0,.18,'highpass=f=220,lowpass=f=3400'),
  key: source('key-press.mp3',0,.19,'highpass=f=180,lowpass=f=2700'),
  seat: source('pop.mp3',.02,.28,'asetrate=36000,aresample=48000,highpass=f=110,lowpass=f=850'),
  signal: source('ping.mp3',0,.24,'asetrate=40000,aresample=48000,highpass=f=600,lowpass=f=3200'),
  confirm: source('chime.mp3',.3,.35,'asetrate=42000,aresample=48000,highpass=f=450,lowpass=f=3400'),
  message: source('notification.mp3',.035,.32,'highpass=f=400,lowpass=f=3000'),
  coin: source('sparkle.mp3',0,.24,'highpass=f=1700,lowpass=f=5500'),
  mark: source('impact-bass-1.mp3',.075,.32,'highpass=f=90,lowpass=f=650'),
  lock: source('impact-bass-2.mp3',1.965,.42,'highpass=f=75,lowpass=f=1700'),
  inhale: source('chime.mp3',.35,.4,'areverse,highpass=f=650,lowpass=f=2800'),
};
// Each layer: source, onset, gain, gentle stereo position, playback resample ratio.
const recipes = {
  'ui-touch': {duration:.13,layers:[['touch',0,1,0,1]],description:'Selección seca y suave'},
  'ui-latch': {duration:.16,layers:[['key',0,.75,0,.93],['touch',.032,.25,0,1]],description:'Pulsación con asentamiento'},
  'panel-seat': {duration:.24,layers:[['seat',0,.8,0,1],['key',.022,.2,0,.83]],description:'Apoyo amortiguado de un panel'},
  'card-sort': {duration:.38,layers:[['key',0,.52,-.16,.83],['touch',.09,.36,0,1.04],['key',.205,.25,.16,1.15]],description:'Tres contactos secos de una reordenación'},
  'signal-tick': {duration:.18,layers:[['signal',0,1,0,1]],description:'Dato detectado, pulso digital breve'},
  'confirm-soft': {duration:.38,layers:[['confirm',0,.75,0,1],['touch',0,.12,0,1]],description:'Confirmación corta con cola redondeada'},
  'message-in': {duration:.34,layers:[['message',0,1,0,1]],description:'Llegada de mensaje, sin cola larga'},
  'coin-detail': {duration:.43,layers:[['coin',0,.42,-.14,1],['coin',.12,.24,.14,.91],['key',.04,.25,0,1.15]],description:'Detalle metálico de monedas'},
  'step-mark': {duration:.26,layers:[['mark',0,.72,0,1],['key',.025,.25,0,.85]],description:'Marca corta y mate para Uno, Dos, Tres'},
  'logo-inhale': {duration:.43,layers:[['inhale',0,1,0,1]],description:'Anticipación tonal breve del logo'},
  'logo-lock': {duration:.68,layers:[['lock',0,.78,0,1],['confirm',.025,.28,0,.8]],description:'Cierre de marca con cuerpo breve y detalle tonal'},
};
const manifest = {};
for (const [name, recipe] of Object.entries(recipes)) {
  const count=Math.round(recipe.duration*rate), channels=[new Float32Array(count),new Float32Array(count)];
  for (const [key,onset,gain,pan,speed] of recipe.layers) {
    const input=sources[key],offset=Math.round(onset*rate),gains=[Math.sqrt((1-pan)/2),Math.sqrt((1+pan)/2)];
    for (let k=0;k<count-offset && k*speed<input.length-1;k++) {
      const pos=k*speed,i=Math.floor(pos),u=pos-i,value=(input[i]*(1-u)+input[i+1]*u)*gain;
      gains.forEach((g,ch)=>channels[ch][offset+k]+=value*g);
    }
  }
  const attack=name==='logo-inhale'?.15:.003,release=Math.min(recipe.duration*.4,.15);
  let peak=0,energy=0;
  for(let i=0;i<count;i++) {
    const t=i/rate,a=Math.min(1,t/attack),b=Math.min(1,(recipe.duration-t)/release),env=a*a*(3-2*a)*b*b*(3-2*b);
    channels.forEach(c=>{c[i]*=env;peak=Math.max(peak,Math.abs(c[i]));energy+=c[i]*c[i];});
  }
  const rms=Math.sqrt(energy/(2*count));
  if(peak<1e-6)throw Error(name+' source region is silent');
  const gain=Math.min(.14/rms,.63/peak); // measured energy match with peak headroom
  const pcm=Buffer.alloc(count*4),h=Buffer.alloc(44);
  for(let i=0;i<count;i++)for(let ch=0;ch<2;ch++)pcm.writeInt16LE(Math.round(channels[ch][i]*gain*32767),(i*2+ch)*2);
  h.write('RIFF');h.writeUInt32LE(36+pcm.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(2,22);h.writeUInt32LE(rate,24);h.writeUInt32LE(rate*4,28);h.writeUInt16LE(4,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.length,40);
  writeFileSync(dir+name+'.wav',Buffer.concat([h,pcm]));
  // Align short accents by the strongest 5ms energy window, not their container start.
  let best=0,bestAt=0;
  for(let i=0;i<count-240;i+=48){let e=0;for(let k=i;k<i+240;k++)e+=channels[0][k]**2+channels[1][k]**2;if(e>best){best=e;bestAt=i;}}
  manifest[name]={dur:recipe.duration,peak:+(bestAt/rate).toFixed(3),ext:'wav',description:recipe.description,sources:recipe.layers.map(l=>l[0]),rmsDb:+(20*Math.log10(rms*gain)).toFixed(2),peakDb:+(20*Math.log10(peak*gain)).toFixed(2)};
}
writeFileSync(new URL('./sound-palette.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n');
console.log('Prepared '+Object.keys(manifest).length+' short, level-matched library edits.');
