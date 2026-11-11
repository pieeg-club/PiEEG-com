/* PiEEG XR guide: interactive engine.
 * Converted from the original pieegxr-page.html. The drawing code is unchanged;
 * it is wrapped so React can mount it on the guide's root element and cleanly stop
 * it (animation loops, timers, intervals, window/document listeners) on unmount.
 * All images are embedded in this file and in pieegxr-guide.css (no public/ files needed).
 */
export function mountPieegXRStoreGuide(root) {
if (!root) return () => {};
const ROOT = root;
// Snapshot of the server-rendered markup, restored on cleanup so a re-mount
// (React Strict Mode in dev, or navigating back) starts from a clean slate.
const PRISTINE = ROOT.innerHTML;
let stopped = false;
const rafs = new Set();
const timers = new Set();
const intervals = new Set();
const cleanups = [];
// requestAnimationFrame that stops every animation loop once the guide unmounts
const raf = (fn) => {
  if (stopped) return 0;
  const id = requestAnimationFrame((t) => { rafs.delete(id); if (!stopped) fn(t); });
  rafs.add(id);
  return id;
};
const later = (fn, ms) => {
  const id = setTimeout(() => { timers.delete(id); if (!stopped) fn(); }, ms);
  timers.add(id);
  return id;
};
const every = (fn, ms) => {
  const id = setInterval(() => { if (!stopped) fn(); }, ms);
  intervals.add(id);
  return id;
};
const on = (target, type, fn, opts) => {
  target.addEventListener(type, fn, opts);
  cleanups.push(() => target.removeEventListener(type, fn, opts));
};

const $=s=>ROOT.querySelector(s);
const NS='http://www.w3.org/2000/svg';
const XR_PHOTO='/products/pieeg-xr/guide-headset.webp';
const COL={EEG:'#0071e3',EMG:'#ad6500',ECG:'#d72e50',EOG:'#8653bc'};
const ACC='#0071e3';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

/* Electrode layout from the specification drawing (as drawn: Ch1-3 left, Ch6-8 right, REF and BIAS top centre) */
const MASK_EL=[
  {id:'Ch1',x:128,y:262},{id:'Ch2',x:118,y:206},{id:'Ch3',x:156,y:136},{id:'Ch4',x:232,y:118},
  {id:'Ch5',x:488,y:118},{id:'Ch6',x:564,y:136},{id:'Ch7',x:602,y:206},{id:'Ch8',x:592,y:262},
  {id:'Ref',x:322,y:124,ref:true},{id:'Bias',x:398,y:124,ref:true}];
const MASK_OUT='M100,170 C100,110 150,88 230,93 C290,97 322,110 360,112 C398,110 430,97 490,93 C570,88 620,110 620,170 L620,262 C620,332 588,382 518,396 C468,406 430,392 406,372 C390,358 380,340 360,338 C340,340 330,358 314,372 C290,392 252,406 202,396 C132,382 100,332 100,262 Z';
const MASK_IN='M168,190 C168,154 196,146 244,148 C292,150 322,158 360,160 C398,158 428,150 476,148 C524,146 552,154 552,190 L552,254 C552,302 532,328 492,334 C458,339 432,328 414,312 C400,300 386,286 360,286 C334,286 320,300 306,312 C288,328 262,339 228,334 C188,328 168,302 168,254 Z';

/* =========================================================
   HERO: the silicone mask, its ten electrodes and the BCI box
   ========================================================= */
(function drawHero(){
  const s=$('#board');
  if(!s) return; // the store version has no hero drawing
  let h=`<defs><clipPath id="xrProductClip"><rect x="12" y="46" width="696" height="340" rx="22"/></clipPath></defs>
    <image x="12" y="46" width="696" height="340" preserveAspectRatio="xMidYMid slice" clip-path="url(#xrProductClip)" href="${XR_PHOTO}"/>
    <text x="360" y="28" text-anchor="middle" fill="#76767c" style="font-size:12px">headset</text>
    <text x="584" y="408" text-anchor="middle" fill="#76767c" style="font-size:12px">lenses</text>`;
  MASK_EL.forEach((e,i)=>{const x=64+i*66;
    h+=`<g><circle cx="${x}" cy="438" r="10" fill="#f5f5f7" stroke="${e.ref?'#86868b':ACC}" stroke-width="1.5"/>
    <text x="${x}" y="464" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">${e.id==='Ref'?'REF':e.id==='Bias'?'BIAS':e.id}</text></g>`;
  });
  const label=(x,main,sub,a='start')=>`<text x="${x}" y="505" text-anchor="${a}"><tspan x="${x}" fill="#1d1d1f" style="font-size:14px;font-weight:600">${main}</tspan><tspan x="${x}" dy="17" fill="#6e6e73" style="font-size:12px">${sub}</tspan></text>`;
  h+=label(22,'Braided cable','Mask to box')+label(345,'Silicone mask','Snaps in with four buckles','middle')+label(698,'BCI box on the strap','Dual ADS1299, STM32WB, BLE 5','end');
  s.innerHTML=h;
})();

/* =========================================================
   FACE VIEW: mannequin with the headset see-through
   ========================================================= */
const FACE_EL={Ch1:{x:274,y:196},Ch2:{x:266,y:172},Ch3:{x:282,y:146},Ch4:{x:302,y:140},Ch5:{x:358,y:140},Ch6:{x:378,y:146},Ch7:{x:394,y:172},Ch8:{x:386,y:196},Ref:{x:322,y:139},Bias:{x:338,y:139}};
Object.values(FACE_EL).forEach(p=>{p.x=330+(p.x-330)*.76;p.y-=20;});
const CHS=['Ch1','Ch2','Ch3','Ch4','Ch5','Ch6','Ch7','Ch8'];
function drawBody(){
  $('#body').innerHTML=`<defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d323b"/><stop offset="1" stop-color="#181b20"/></linearGradient>
    <radialGradient id="skull" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#3a404a"/><stop offset="1" stop-color="#1b1f25"/></radialGradient>
  </defs>
  <image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="/products/pieeg-xr/guide-person.webp"/>
  <g transform="translate(79.2 -20) scale(.76 1)">
    <path d="M262,152 C250,148 244,160 250,172 M398,152 C410,148 416,160 410,172" stroke="#2b3038" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M256,142 C256,130 268,128 330,128 C392,128 404,130 404,142 L404,196 C404,210 388,214 372,210 C356,206 350,192 330,192 C310,192 304,206 288,210 C272,214 256,210 256,196 Z" fill="rgba(34,38,46,.5)" stroke="#8b93a1" stroke-opacity=".55" stroke-width="1.4"/>
    <rect x="404" y="140" width="22" height="30" rx="6" fill="#aeb4bc" stroke="#e1e5ea"/><circle cx="415" cy="148" r="2.2" fill="${ACC}"/>
    <path d="M404,196 C416,204 420,186 415,170" stroke="#e9ecef" stroke-width="2" fill="none"/>
    <text x="436" y="142" text-anchor="end" fill="#8e96a0" style="font-size:7.5px">box</text>
  </g>
  <g id="bodyEls"></g>`;
}
function placeElectrodes(u){
  let h='';
  CHS.forEach(id=>{ const p=FACE_EL[id], hot=!u.hot||u.hot.includes(id); const c=COL[u.sig];
    h+=`<g opacity="${hot?1:.4}"><circle class="fe" data-id="${id}" cx="${p.x}" cy="${p.y}" r="5.4" fill="#12151a" stroke="${c}" stroke-width="1.3"/><circle class="fec" data-id="${id}" cx="${p.x}" cy="${p.y}" r="2.1" fill="${hot?c:'#aeb6c0'}"/>
      <text x="${p.x+(p.x<330?-7:7)}" y="${p.y+(p.y<150?-6:9)}" text-anchor="${p.x<330?'end':'start'}" fill="${hot?'#1d1d1f':'#76767c'}" style="font-size:7px;font-weight:700">${id.replace('Ch','')}</text></g>`; });
  ['Ref','Bias'].forEach((id,i)=>{ const p=FACE_EL[id]; h+=`<path d="M${p.x},${p.y-4.5} L${p.x+4.5},${p.y} L${p.x},${p.y+4.5} L${p.x-4.5},${p.y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="1"/>${i?`<circle cx="${p.x}" cy="${p.y}" r="1.3" fill="#e8ebef"/>`:''}`; });
  h+=`<text x="330" y="104" text-anchor="middle" fill="#515154" style="font-size:6.5px;font-weight:600">REF  BIAS</text>`;
  $('#bodyEls').innerHTML=h;
}

/* =========================================================
   USE CASES
   ========================================================= */
const EXPR={
  neutral:{name:'Neutral',w:[0,0,0,0,0,0,0,0]},
  smile:{name:'Smile',w:[.95,.55,.12,.1,.1,.12,.55,.95]},
  brows:{name:'Raise brows',w:[.1,.3,.9,.95,.95,.9,.3,.1]},
  furrow:{name:'Furrow brow',w:[.1,.15,.4,.95,.95,.4,.15,.1]},
  jaw:{name:'Jaw open',w:[.7,.95,.15,.1,.1,.15,.95,.7]},
  winkL:{name:'Wink left',w:[.08,.1,.12,.1,.2,.55,.9,.7]},
  winkR:{name:'Wink right',w:[.7,.9,.55,.2,.1,.12,.1,.08]}
};
const USES=[
 {id:'face', title:'Facial expressions to avatars', short:'Face Trainer, facial EMG', sig:'EMG',
  lead:'Every expression uses its own mix of face muscles. The eight mask channels see that pattern, and Face Trainer learns it: record a few reps of each expression and your avatar starts copying you.',
  cap:'<b>Eight channels</b> around the mask pick up forehead, temple and cheek muscles. <b>REF</b> and <b>BIAS</b> sit at the top centre.',
  rows:['Ch1','Ch3','Ch4','Ch7'], controls:['expr'], readout:'face', with:['Face Trainer mini-game','ARKit blendshapes','three.js avatar']},
 {id:'vrchat', title:'Brain-reactive VRChat avatar', short:'Band powers over OSC', sig:'EEG', hot:['Ch3','Ch4','Ch5','Ch6'],
  lead:'The forehead pads pick up frontal brain activity. PiEEG Server turns it into five band powers from 0 to 1 and sends them to VRChat over OSC, where they can drive avatar animations and effects.',
  cap:'<b>The four forehead channels</b> carry the frontal EEG. Temples and cheeks mostly see muscle.',
  rows:['Ch4','Ch5'], controls:['relax','focus'], readout:'vr', with:['PiEEG Server --osc','Brain-reactive avatar guide']},
 {id:'webxr', title:'Neural-adaptive WebXR', short:'Right in the Quest browser', sig:'EEG', hot:['Ch3','Ch4','Ch5','Ch6'],
  lead:'PiEEG XR works inside the Meta Quest browser, with no native app or proprietary SDK. Attention and relaxation shape the scene around you in real time.',
  cap:'<b>Frontal channels</b> feed focus and relaxation. The headset itself can be the Bluetooth host.',
  rows:['Ch4','Ch5'], controls:['relax','focus'], readout:'webxr', with:['Meta Quest browser','pieeg.js','Neural Wave Space']},
 {id:'hands', title:'Hands-free VR controls', short:'Winks and jaw as buttons', sig:'EMG',
  lead:'Short, deliberate face movements make reliable buttons. Wink right to move down a menu, wink left to move up, clench your jaw to select. Useful when both hands are busy.',
  cap:'<b>Left and right sides</b> of the mask tell a left wink from a right one. The temples catch the jaw.',
  rows:['Ch2','Ch3','Ch6','Ch7'], controls:['winkR','winkL','clench'], readout:'hands', with:['Face Trainer detectors','Your own WebXR scene']},
 {id:'activity', title:'EEG while you move', short:'BodyPress, sport and play', sig:'EEG', hot:['Ch3','Ch4','Ch5','Ch6'],
  lead:'The mask is built to be worn while you move, which is also the hardest test for EEG. Walk or swing a racket and watch motion, muscle and sweat noise bury the signal, then see what a little gel does.',
  cap:'<b>Brain signals</b> are tens of microvolts. Movement noise can be hundreds of times larger.',
  rows:['Ch3','Ch4','Ch5','Ch6'], controls:['move','gel','loose'], readout:'activity', with:['BodyPress for Meta Quest','BodyPress for Android']}
];
const CTL={
  expr:{radio:'expr', options:[['neutral','Neutral'],['smile','Smile'],['brows','Raise brows'],['furrow','Furrow brow'],['jaw','Jaw open'],['winkL','Wink left'],['winkR','Wink right']]},
  relax:{label:'Relax', on:'Relaxing', toggle:'relaxT', key:'R'},
  focus:{label:'Focus hard', on:'Focusing', toggle:'focusT', key:'F'},
  winkR:{label:'Wink right, next', key:'→', code:'ArrowRight'},
  winkL:{label:'Wink left, previous', key:'←', code:'ArrowLeft'},
  clench:{label:'Clench jaw, select', key:'Space'},
  move:{radio:'move', options:[['still','Sit still'],['walk','Walk'],['tennis','Play tennis']]},
  gel:{label:'Add a little gel', on:'Gel on the pads', toggle:'gelT', key:'G'},
  loose:{label:'Loosen the mask', on:'Mask loose', toggle:'looseT', key:'L'}
};

/* =========================================================
   SIGNAL MODEL: 8 mask channels
   ========================================================= */
const FS=125, WIN=4, N=FS*WIN;
const M={expr:'neutral',exA:new Float32Array(8),relax:0,relaxT:0,focus:0,focusT:0,blinks:[],nextBlink:2,pulses:[],gaze:0,gazeT:0,gazeUntil:0,
  move:'still',mv:0,gel:0,gelT:0,loose:0,looseT:0,drift:0,menu:1,sel:null,selAt:0,det:null,detAt:0,test:{blink:0,look:0,jaw:0},rms:new Float32Array(8),blend:{}};
let simT=0, head=0, acc=0;
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const R=rng(21), CH={};
const FRONT=[0,0,.8,1,1,.8,0,0], BLINKW=[.15,.35,.9,1,1,.9,.35,.15], SIDE=[-1,-1,-.6,-.2,.2,.6,1,1];
CHS.forEach((id,i)=>{ const f=[],a=[],p=[]; for(let q=0;q<5;q++){const fr=1+R()*26;f.push(fr);a.push(1/Math.pow(fr,.7));p.push(R()*6.28);} const s=a.reduce((x,y)=>x+y,0); a.forEach((v,j)=>a[j]=v/s);
  CH[id]={label:id,i,f,a,p,p1:R()*6.28,p2:R()*6.28,buf:new Float32Array(N),col:'EEG'}; });
const PULSE={winkR:[.7,.9,.55,.2,.1,.12,.1,.08],winkL:[.08,.1,.12,.1,.2,.55,.9,.7],clench:[.7,.95,.15,.1,.1,.15,.95,.7]};
function stepSample(t){
  const k=1/FS;
  const tgt=EXPR[M.expr].w; for(let i=0;i<8;i++) M.exA[i]+=(tgt[i]-M.exA[i])*k*9;
  M.relax+=(M.relaxT-M.relax)*k*1.5; M.focus+=(M.focusT-M.focus)*k*1.5;
  M.gel+=(M.gelT-M.gel)*k*2; M.loose+=(M.looseT-M.loose)*k*3;
  const mvT={still:0,walk:.5,tennis:1}[M.move]; M.mv+=(mvT-M.mv)*k*2;
  M.drift+= (M.mv>.2 ? k*.05*M.mv : -M.drift*k*.2);
  if(M.gazeUntil && t>M.gazeUntil){ M.gazeT=0; M.gazeUntil=0; } M.gaze+=(M.gazeT-M.gaze)*Math.min(1,k*20);
  if(t>M.nextBlink){ M.blinks.push({t,hard:false}); M.nextBlink=t+4+Math.random()*4; } if(M.blinks.length>10) M.blinks.shift();
  M.pulses=M.pulses.filter(p=>t-p.t<.6);
  let bl=0; for(const b of M.blinks){ const z=(t-b.t-.12)/.09; if(z>-4&&z<4) bl+=Math.exp(-z*z)*(b.hard?1.8:1); }
  const pulseW=new Array(8).fill(0); for(const p of M.pulses){ const e=Math.exp(-(((t-p.t-.25)/.14)**2)); PULSE[p.k].forEach((w,i)=>pulseW[i]+=w*e); }
  const mA=(1-.65*M.gel)*(1+1.3*M.loose)*M.mv;
  const step = M.move==='walk' ? Math.pow(Math.max(0,Math.sin(6.283*1.8*t)),8) : M.move==='tennis' ? Math.pow(Math.max(0,Math.sin(6.283*1.1*t+Math.sin(t*1.7)*2)),6) : 0;
  CHS.forEach((id,i)=>{ const c=CH[id]; let bg=0; for(let q=0;q<5;q++) bg+=c.a[q]*Math.sin(6.283*c.f[q]*t+c.p[q]);
    const al=(.12+.5*M.relax*FRONT[i]*.6)*Math.sin(6.283*10.2*t+c.p1);
    const be=(.06+.45*M.focus*FRONT[i])*Math.sin(6.283*19.5*t+c.p2);
    const emgAmp=Math.max(M.exA[i],pulseW[i])+(M.move==='tennis'?.35*M.mv*(i===1||i===6?1:.4):0);
    const emg=(Math.random()*2-1)*emgAmp*1.1;
    const eog=bl*BLINKW[i]*1.8 + M.gaze*(i===2||i===3?-.8:i===4||i===5?.8:0);
    const motion=mA*(1.4*Math.sin(6.283*.7*t+i*.4)+2.2*step*(1+(i%3)*.2)) + M.drift*(i%2?1:-1)*2;
    let v=bg*.7+al+be+emg+eog+motion+(Math.random()-.5)*.08;
    if(M.loose>.6 && (i===3)) v=Math.max(-1.6,Math.min(1.6,v*3)); // one pad loses contact and rails
    c.buf[head]=v; M.rms[i]+=(Math.abs(emg)*1.7-M.rms[i])*k*6; });
}
function advance(dt){ acc+=dt; while(acc>=1/FS){ acc-=1/FS; simT+=1/FS; head=(head+1)%N; stepSample(simT); } }
function bands(){ const w=Math.sin(simT*1.7)*.02; return {delta:clamp(.3+w+.2*M.mv),theta:clamp(.2+.12*M.relax),alpha:clamp(.12+.5*M.relax-.05*M.focus+w),beta:clamp(.12+.55*M.focus-.05*M.relax-w),gamma:clamp(.06+.3*M.focus)}; }

/* =========================================================
   DEMO UI
   ========================================================= */
let U=USES[0];
function renderList(){
  const ul=$('#useList'); ul.innerHTML='';
  USES.forEach(u=>{ const li=document.createElement('li'); const b=document.createElement('button');
    b.setAttribute('role','tab'); b.dataset.id=u.id; b.style.setProperty('--c',COL[u.sig]);
    b.innerHTML=`<i></i><b>${u.title}</b><span>${u.short}</span>`;
    b.addEventListener('click',()=>selectUse(u.id));
    b.addEventListener('keydown',e=>{ if(['ArrowDown','ArrowUp'].includes(e.key)){ e.preventDefault(); const i=USES.indexOf(U)+(e.key==='ArrowDown'?1:-1); const n=USES[(i+USES.length)%USES.length]; selectUse(n.id); ul.querySelector(`[data-id="${n.id}"]`).focus(); } });
    li.appendChild(b); ul.appendChild(li); });
}
function selectUse(id){
  U=USES.find(u=>u.id===id);
  ROOT.querySelectorAll('#useList button').forEach(b=>{ const on=b.dataset.id===id; b.setAttribute('aria-selected',on); b.tabIndex=on?0:-1; });
  { const ul=$('#useList'), sel=ul.querySelector(`[data-id="${id}"]`); if(ul.scrollWidth>ul.clientWidth) ul.scrollLeft=sel.parentElement.offsetLeft-ul.clientWidth/2+sel.clientWidth/2; }
  ROOT.style.setProperty('--sig',COL[U.sig]);
  if(U.id!=='face') M.expr='neutral';
  if(U.id!=='activity'){ M.move='still'; M.looseT=0; }
  placeElectrodes(U);
  $('#bodyCap').innerHTML=U.cap;
  $('#demoSig').innerHTML=`<i></i>${U.sig==='EMG'?'Facial EMG':'Frontal EEG'}, ${U.hot?'forehead channels':'all 8 mask channels'}`;
  $('#demoTitle').textContent=U.title; $('#demoLead').textContent=U.lead;
  $('#with').innerHTML='<span>Use it with</span>'+U.with.map(w=>`<span class="chip">${w}</span>`).join('');
  renderControls(); renderReadout(); sizeCanvas();
  history.replaceState&&history.replaceState(null,'','#'+U.id);
}
function renderControls(){
  const c=$('#controls'); c.innerHTML='';
  U.controls.forEach(k=>{ const d=CTL[k];
    if(d.radio){ d.options.forEach(([v,l])=>{ const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k; b.dataset.v=v; b.textContent=l;
      b.setAttribute('aria-pressed',M[d.radio]===v); b.addEventListener('click',()=>setRadio(d.radio,v)); c.appendChild(b); }); return; }
    const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k;
    const refresh=()=>{ const on=d.toggle?M[d.toggle]>0:false; if(d.toggle) b.setAttribute('aria-pressed',on); b.innerHTML=`${d.toggle&&on?d.on:d.label} <span class="k">${d.key}</span>`; };
    b.refresh=refresh; refresh(); b.addEventListener('click',()=>act(k)); c.appendChild(b); });
}
function setRadio(g,v){ M[g]=v; ROOT.querySelectorAll(`.ctl[data-k="${g}"]`).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v)); }
function act(k){ const d=CTL[k];
  if(d.toggle) M[d.toggle]=M[d.toggle]?0:1;
  if(k==='winkR'||k==='winkL'||k==='clench'){ M.pulses.push({t:simT,k}); M.det=k; M.detAt=performance.now();
    if(k==='winkR') M.menu=Math.min(3,M.menu+1); if(k==='winkL') M.menu=Math.max(0,M.menu-1); if(k==='clench'){ M.sel=M.menu; M.selAt=performance.now(); } }
  ROOT.querySelectorAll('.ctl').forEach(b=>b.refresh&&b.refresh());
}
on(document,'keydown',e=>{
  if(e.target.closest('input,textarea,.use-list,.tabs,.ctl,.seg-mini') || e.metaKey||e.ctrlKey||e.altKey) return;
  const r=$('#useStage').getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
  const key=e.key===' '?'Space':e.key.length===1?e.key.toUpperCase():e.key;
  for(const k of U.controls){ const d=CTL[k]; if(d.radio) continue; if(d.key===key||d.code===e.key){ e.preventDefault(); if(!e.repeat) act(k); return; } }
});

function renderReadout(){
  const r=$('#readout'), k=U.readout;
  if(k==='face') r.innerHTML=`<div class="row-flex" style="align-items:center">
    <svg class="avatar" viewBox="0 0 120 130" aria-label="Avatar face"><ellipse cx="60" cy="66" rx="46" ry="56" fill="#2a2f38" stroke="rgba(255,255,255,.15)"/>
      <path id="aBrowL" d="M30,44 Q40,38 50,44" stroke="#eef0f3" stroke-width="3" fill="none" stroke-linecap="round"/><path id="aBrowR" d="M70,44 Q80,38 90,44" stroke="#eef0f3" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse id="aEyeL" cx="40" cy="58" rx="7" ry="4" fill="#eef0f3"/><ellipse id="aEyeR" cx="80" cy="58" rx="7" ry="4" fill="#eef0f3"/>
      <path id="aMouth" d="M44,94 Q60,96 76,94" stroke="#eef0f3" stroke-width="3" fill="none" stroke-linecap="round"/></svg>
    <div style="flex:1;min-width:230px"><div class="muted">Recognised</div><div class="big" id="eName" style="font-size:30px">Neutral</div><div class="muted" id="eConf">Pick an expression</div>
      <div class="muted" style="margin-top:12px">Channel importance</div><div class="imp" id="imp">${CHS.map(c=>`<i title="${c}"><span>${c.replace('Ch','')}</span></i>`).join('')}</div></div></div>`;
  if(k==='vr') r.innerHTML=`<div class="osc">${['Delta','Theta','Alpha','Beta','Gamma'].map(b=>`<div><span class="addr">/avatar/parameters/EEG_${b}</span><span class="v" id="v${b}">0.00</span><span class="bar"><b id="b${b}" style="width:0"></b></span></div>`).join('')}</div>`;
  if(k==='webxr') r.innerHTML=`<div class="row-flex" style="align-items:center"><svg class="scene" viewBox="0 0 260 130" aria-label="WebXR scene">
      <defs><radialGradient id="orbG"><stop offset="0" stop-color="#fff"/><stop offset=".35" id="orbMid" stop-color="#7c8cff"/><stop offset="1" stop-color="#7c8cff" stop-opacity="0"/></radialGradient>
      <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" id="sky1" stop-color="#0b1330"/><stop offset="1" stop-color="#05070c"/></linearGradient></defs>
      <rect width="260" height="130" rx="10" fill="url(#skyG)"/><path d="M0,100 Q130,86 260,100 L260,130 L0,130 Z" fill="#0d1017"/>
      <circle id="orb" cx="130" cy="62" r="30" fill="url(#orbG)"/>${Array.from({length:14},(_,i)=>`<circle class="pt" cx="${20+i*17}" cy="${30+((i*37)%50)}" r="1.3" fill="#cfd8ff"/>`).join('')}</svg>
    <div><div class="meter" style="width:190px"><div class="lab">Relaxation<b id="ro1">0.00</b></div><div class="track"><div class="fill" id="rf1"></div></div></div>
    <div class="meter" style="width:190px;margin-top:10px"><div class="lab">Focus<b id="ro2">0.00</b></div><div class="track"><div class="fill" id="rf2"></div></div></div></div></div>`;
  if(k==='hands') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div class="vmenu" id="vmenu">${['Resume','Settings','Recenter','Quit'].map((m,i)=>`<div data-i="${i}">${m}</div>`).join('')}</div>
    <div><div class="muted">Detected</div><div class="big" id="det" style="font-size:26px">Nothing yet</div><div class="muted" id="selTxt" style="margin-top:8px">Wink right to move down.</div></div></div>`;
  if(k==='activity') r.innerHTML=`<div class="qual"><div class="q-verdict" id="qv"></div><ul class="q-list" id="ql"></ul></div>`;
}
let lastRO=0;
function updateReadout(now){
  if(now-lastRO<90) return; lastRO=now;
  const k=U.readout, B=bands();
  if(k==='face'){ const v=[...M.rms]; const tot=v.reduce((a,x)=>a+x,0);
    let best='neutral',bs=0; if(tot/8>.12){ const nv=Math.hypot(...v); for(const e in EXPR){ if(e==='neutral') continue; const t=EXPR[e].w; const s=v.reduce((a,x,i)=>a+x*t[i],0)/(nv*Math.hypot(...t)); if(s>bs){bs=s;best=e;} } }
    $('#eName').textContent=EXPR[best].name; $('#eConf').textContent= best==='neutral'?'Relaxed face, low muscle activity':`${Math.round(bs*100)}% pattern match`;
    ROOT.querySelectorAll('#imp i').forEach((c,i)=>{ const w=best==='neutral'?0:EXPR[best].w[i]; c.style.background=`rgba(255,174,66,${.08+w*.92})`; });
    ROOT.querySelectorAll('.fec').forEach((c,i)=>c.setAttribute('r',2.1+clamp(v[i])*2.4));
    const bl=M.blend; const tgt={smile:0,brows:0,furrow:0,jaw:0,winkL:0,winkR:0}; if(best!=='neutral') tgt[best]=clamp((bs-.6)/.35);
    for(const x in tgt) bl[x]=(bl[x]||0)+(tgt[x]-(bl[x]||0))*.35;
    const bu=(bl.brows||0)*7-(bl.furrow||0)*4, tilt=(bl.furrow||0)*5;
    $('#aBrowL').setAttribute('d',`M30,${44-bu+tilt*.2} Q40,${38-bu} 50,${44-bu+tilt}`); $('#aBrowR').setAttribute('d',`M70,${44-bu+tilt} Q80,${38-bu} 90,${44-bu+tilt*.2}`);
    $('#aEyeL').setAttribute('ry',Math.max(.5,4*(1-(bl.winkL||0)))); $('#aEyeR').setAttribute('ry',Math.max(.5,4*(1-(bl.winkR||0))));
    const sm=(bl.smile||0)*10, jo=(bl.jaw||0)*14; $('#aMouth').setAttribute('d',`M${44-sm*.4},${94-sm*.3} Q60,${96+sm+jo} ${76+sm*.4},${94-sm*.3}` + (jo>1?` Q60,${94-jo*.2} ${44-sm*.4},${94-sm*.3}`:''));
  }
  if(k==='vr'){ for(const b of ['Delta','Theta','Alpha','Beta','Gamma']){ const v=B[b.toLowerCase()]; $('#v'+b).textContent=v.toFixed(2); $('#b'+b).style.width=v*100+'%'; } }
  if(k==='webxr'){ const rl=clamp(.1+.8*M.relax-.2*M.focus), fo=clamp(.1+.8*M.focus);
    $('#ro1').textContent=rl.toFixed(2); $('#rf1').style.width=rl*100+'%'; $('#ro2').textContent=fo.toFixed(2); $('#rf2').style.width=fo*100+'%';
    $('#orb').setAttribute('r',(22+fo*22+Math.sin(simT*2)*1.5).toFixed(1)); const mix=(a,b,t)=>Math.round(a+(b-a)*t);
    $('#orbMid').setAttribute('stop-color',`rgb(${mix(255,90,rl)},${mix(170,190,rl)},${mix(90,255,rl)})`); $('#sky1').setAttribute('stop-color',`rgb(${mix(40,8,rl)},${mix(18,26,rl)},${mix(30,60,rl)})`);
    ROOT.querySelectorAll('.pt').forEach((p,i)=>p.setAttribute('cy',(30+((i*37+simT*(4+fo*14))%60)).toFixed(1))); }
  if(k==='hands'){ ROOT.querySelectorAll('#vmenu div').forEach((d,i)=>{ d.classList.toggle('on',i===M.menu); d.classList.toggle('picked',M.sel===i && now-M.selAt<900); });
    const labels={winkR:'Right wink',winkL:'Left wink',clench:'Jaw clench'}; $('#det').textContent= M.det && now-M.detAt<1400 ? labels[M.det] : 'Nothing yet';
    $('#selTxt').textContent = M.sel!=null && now-M.selAt<1400 ? `Selected: ${['Resume','Settings','Recenter','Quit'][M.sel]}` : 'Wink right to move down, left to move up, clench to select.'; }
  if(k==='activity'){ const mv=M.mv*(1-.65*M.gel)*(1+1.3*M.loose);
    let v,cls; if(M.loose>.6){ v='Pinned at the edge on one channel'; cls='bad'; } else if(mv>.55){ v='Large slow rolling wander'; cls='bad'; } else if(mv>.18){ v='Noisy, but brain signal still visible'; cls='warn'; } else { v='Gentle line, small wander. Good'; cls='ok'; }
    $('#qv').className='q-verdict '+cls; $('#qv').textContent=v;
    const items=[]; if(M.mv>.2) items.push('Motion artifact from pads sliding on the skin'); if(M.move==='tennis') items.push('Muscle bursts from the jaw and temples'); if(M.drift>.08) items.push('Slow drift as the skin starts to sweat');
    if(M.move!=='still') items.push(M.move==='walk'?'A rhythmic bump with every step':'Irregular jolts from swings and footwork');
    if(M.loose>.6) items.push('A pad lost contact: that channel rails. Reseat the mask');
    if(M.gel>.5) items.push('Gel is steadying the contact and cutting the motion noise');
    if(!items.length) items.push('Sitting still with a firm mask: this is your clean baseline');
    $('#ql').innerHTML=items.map(t=>`<li>${t}</li>`).join(''); }
}

/* ---------- traces ---------- */
function makeTraces(canvas){ const o={cv:canvas,ctx:canvas.getContext('2d'),W:0,H:0,rowH:40};
  o.size=(n)=>{ o.rowH=n>4?30:n>2?42:56; const d=Math.min(2,devicePixelRatio||1); o.W=canvas.clientWidth; o.H=n*o.rowH+14; canvas.width=o.W*d; canvas.height=o.H*d; canvas.style.height=o.H+'px'; o.ctx.setTransform(d,0,0,d,0,0); };
  o.draw=(rows,colFn)=>{ const ctx=o.ctx, labelW=o.W<460?46:56, W=o.W-labelW-12; ctx.clearRect(0,0,o.W,o.H); ctx.strokeStyle='rgba(0,0,0,.055)'; ctx.lineWidth=1;
    for(let s=0;s<=WIN;s++){ const x=labelW+W*s/WIN; ctx.beginPath(); ctx.moveTo(x,6); ctx.lineTo(x,o.H-6); ctx.stroke(); }
    ctx.font='12.5px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif'; ctx.textBaseline='middle';
    rows.forEach((id,r)=>{ const c=CH[id], y0=7+o.rowH*r+o.rowH/2, amp=o.rowH*.42; ctx.fillStyle='#6e6e73'; ctx.fillText(id,10,y0);
      ctx.strokeStyle=colFn(id); ctx.lineWidth=1.3; ctx.beginPath(); const step=Math.max(1,Math.floor(N/Math.min(N,W)));
      for(let i=0;i<N;i+=step){ const x=labelW+W*i/(N-1); const y=y0-clamp(c.buf[(head+1+i)%N],-1.6,1.6)*amp*.62; i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); }); };
  return o; }
const main=makeTraces($('#demoCanvas')), test=makeTraces($('#testCanvas'));
function sizeCanvas(){ main.size(U.rows.length); }
on(window,'resize',()=>{ sizeCanvas(); test.size(3); });

/* =========================================================
   HOW-TO WIDGETS
   ========================================================= */
function checklist(sel,step,progress,msg){ const upd=()=>{ const all=[...ROOT.querySelectorAll(sel+' input')], n=all.filter(i=>i.checked).length;
  if(progress) $(progress).innerHTML = n===all.length ? `<b>Everything ready.</b> ${msg||''}` : `<b>${n} of ${all.length}</b> ready`; $(step).classList.toggle('done',n===all.length); };
  ROOT.querySelectorAll(sel+' input').forEach(i=>i.addEventListener('change',upd)); upd(); }
checklist('#kit','#s1','#kitProgress','On to step 2.'); checklist('#mount','#s3'); checklist('#prep','#s5');

// step 2: buckles in the right order
(function(){
  const s=$('#buckles'); const sc=.62, ox=36, oy=-20;
  const B=[{id:'bl',x:150,y:150,back:true,label:'Back left'},{id:'br',x:570,y:150,back:true,label:'Back right'},{id:'fl',x:230,y:340,back:false,label:'Front left'},{id:'fr',x:490,y:340,back:false,label:'Front right'}];
  const state={};
  const render=()=>{ let h=`<g transform="translate(${ox},${oy}) scale(${sc})"><path d="${MASK_OUT} ${MASK_IN}" fill="#1b1e23" fill-rule="evenodd" stroke="rgba(255,255,255,.2)" stroke-width="2"/>`;
    B.forEach(b=>{ const on=state[b.id]; h+=`<g class="buckle" data-id="${b.id}" style="cursor:pointer" tabindex="0" role="button" aria-pressed="${!!on}" aria-label="${b.label} buckle"><circle cx="${b.x}" cy="${b.y}" r="30" fill="${on?ACC:'#2a2e35'}" fill-opacity="${on?.9:1}" stroke="${on?'#dfe3ff':'#8b93a1'}" stroke-width="3"/>
      <rect x="${b.x-14}" y="${b.y-6}" width="28" height="12" rx="3" fill="${on?'#10132a':'#8b93a1'}"/><text x="${b.x}" y="${b.y+(b.back?-42:56)}" text-anchor="middle" fill="#cfd4da" style="font-size:22px;font-weight:600">${b.label}</text></g>`; });
    h+=`</g>`; s.innerHTML=h;
    const n=Object.keys(state).length; const st=$('#buckleState');
    st.innerHTML = n===4 ? '<b>All four snapped.</b> The mask is in.' : n===0 ? 'Click the buckles in the right order.' : (state.bl&&state.br) ? 'Back buckles done. Now the two front ones.' : 'Keep going with the back buckles.';
    $('#s2').classList.toggle('done',n===4);
    s.querySelectorAll('.buckle').forEach(g=>{ const f=()=>{ const b=B.find(x=>x.id===g.dataset.id);
      if(!b.back && !(state.bl&&state.br)){ $('#buckleState').innerHTML='<span class="warn">Snap the two back buckles first.</span> Front ones go last.'; return; }
      state[b.id]=!state[b.id]; if(!state[b.id]) delete state[b.id]; render(); };
      g.addEventListener('click',f); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); f(); } }); }); };
  render();
})();

// step 4: power
ROOT.querySelectorAll('#pwrSeg button').forEach(b=>b.addEventListener('click',()=>{
  ROOT.querySelectorAll('#pwrSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const p=b.dataset.p, led=$('#pwrLed'), t=$('#pwrText');
  if(p==='a'){ led.className='led lit'; t.innerHTML='<b>LED on, advertising as PiEEG XR.</b> The recommended setup: a USB-C to USB-A cable into a power bank.'; }
  if(p==='c'){ led.className='led dim'; t.innerHTML='<b>May not power up.</b> Some banks don’t negotiate power over USB-C to USB-C. If the LED stays off, switch to a USB-C to USB-A cable, or add a USB to USB-C adapter.'; }
  if(p==='h'){ led.className='led lit'; t.innerHTML='<b>LED on, advertising as PiEEG XR.</b> A headset with a built-in battery can power the box, so there’s nothing extra to carry.'; }
  $('#s4').classList.toggle('done',p!=='c');
}));

// step 6: functional tests with their own live traces
const TESTS=[['blink','Blink hard 3 to 5 times','Big sharp spikes on the forehead channels'],['look','Look left, then right','Slower swings, opposite on the left and right forehead'],['jaw','Clench your teeth','A burst of high-frequency fuzz that stops when you relax'],['alpha','Close your eyes for 10 seconds','Alpha at the back of the head. Academic version only']];
function renderTests(){ $('#tests').innerHTML=TESTS.map(([id,t,s])=>`<li class="${M.test[id]?'ok':''} ${id==='alpha'?'na':''}"><b>${t}</b><span>${id==='alpha'&&M.alphaTried?'The mask can’t see the back of the head, so nothing changes here. That’s expected on the standard mask.':s}</span></li>`).join('');
  $('#s6').classList.toggle('done',M.test.blink&&M.test.look&&M.test.jaw); }
(function(){ const c=$('#testCtl');
  [['blink','Blink hard'],['look','Look left, then right'],['jaw','Clench jaw'],['alpha','Close eyes']].forEach(([id,l])=>{ const b=document.createElement('button'); b.className='ctl'; b.textContent=l;
    b.addEventListener('click',()=>{ if(id==='blink'){ for(let i=0;i<3;i++) M.blinks.push({t:simT+i*.45,hard:true}); }
      if(id==='look'){ M.gazeT=-1; M.gazeUntil=simT+.9; later(()=>{ M.gazeT=1; M.gazeUntil=simT+.9; },900); }
      if(id==='jaw'){ M.pulses.push({t:simT,k:'clench'}); M.pulses.push({t:simT+.3,k:'clench'}); }
      if(id==='alpha'){ M.alphaTried=1; renderTests(); return; }
      later(()=>{ M.test[id]=1; renderTests(); },900); }); c.appendChild(b); }); renderTests(); })();

// step 7: code tabs
const Cm=t=>`<span class="c">${t}</span>`, P=t=>`<span class="p">${t}</span>`;
const TABS={
  'Clean':`${Cm('# recommended processing for moving data')}
band-pass    1 to 40 Hz      ${Cm('# drift from sweat and steps, most muscle')}
notch        50 or 60 Hz     ${Cm('# match your mains frequency')}
reject       big-movement epochs
ICA          when you need the higher bands`,
  'PiEEG Server':`${Cm('# the Bluetooth driver finds PiEEG XR units too')}
pip install "pieeg-server[ironbci]"

${P('pieeg-server')} --device ironbci8 --filter --record session.csv
${P('pieeg-server')} --device ironbci8 --osc     ${Cm('# VRChat avatar parameters')}`,
  'Browser':`${Cm('# no install: Chrome or Edge, Bluetooth on')}
open https://pieeg.com   ${Cm('# Try Live Demo, then connect PiEEG XR')}
${Cm('# Mini-Games → Face Trainer to train expressions')}`
};
(function(){ const t=$('#codeTabs'); Object.keys(TABS).forEach((k,i)=>{ const b=document.createElement('button'); b.setAttribute('role','tab'); b.textContent=k;
  b.addEventListener('click',()=>{ t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b)); $('#code-tab').innerHTML=TABS[k]; }); t.appendChild(b); if(!i) b.click(); }); })();
ROOT.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{
  const txt=b.dataset.text||$('#code-'+b.dataset.copy).innerText;
  try{ await navigator.clipboard.writeText(txt); b.textContent='Copied'; }catch(e){ b.textContent='Select and copy'; }
  later(()=>b.textContent='Copy',1400);
}));

// step 8: SWD wiring
(function(){
  const s=$('#swd'); const pins=[['GND','Ground reference','#8b93a1'],['RST','Reset, NRST','#ff8a5c'],['SWD','Data, SWDIO','#ffc34d'],['CLK','Clock, SWCLK','#7c8cff']];
  let h=`<rect x="20" y="40" width="140" height="170" rx="12" fill="#1d4ed8" fill-opacity=".25" stroke="#3b82f6"/><text x="90" y="30" text-anchor="middle" fill="#eef0f3" style="font-size:13px;font-weight:600">ST-Link</text>
    <rect x="360" y="40" width="140" height="170" rx="70" fill="#15171b" stroke="rgba(255,255,255,.3)"/><text x="430" y="30" text-anchor="middle" fill="#eef0f3" style="font-size:13px;font-weight:600">Board in the box</text>`;
  pins.forEach(([p,d,c],i)=>{ const y=72+i*36;
    h+=`<g class="wire" data-i="${i}" style="cursor:default"><path d="M130,${y} H410" stroke="transparent" stroke-width="30" fill="none" pointer-events="stroke"/><path d="M160,${y} C250,${y} 270,${y} 380,${y}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <rect x="138" y="${y-8}" width="16" height="16" rx="3" fill="#e3c15f"/><text x="128" y="${y+5}" text-anchor="end" fill="#eef0f3" style="font-size:13px;font-weight:700">${p}</text>
      <rect x="376" y="${y-8}" width="16" height="16" rx="3" fill="#e3c15f"/><text x="402" y="${y+5}" fill="#eef0f3" style="font-size:13px;font-weight:700">${p}</text>
      <text class="wdesc" x="270" y="${y-10}" text-anchor="middle" fill="#9aa2ad" style="font-size:11.5px" opacity="0">${d}</text></g>`; });
  s.innerHTML=h;
  s.querySelectorAll('.wire').forEach(g=>{ g.addEventListener('pointerenter',()=>{ s.querySelectorAll('.wire').forEach(x=>{ x.style.opacity=x===g?1:.25; x.querySelector('.wdesc').setAttribute('opacity',x===g?1:0); }); });
    g.addEventListener('pointerleave',()=>s.querySelectorAll('.wire').forEach(x=>{ x.style.opacity=1; x.querySelector('.wdesc').setAttribute('opacity',0); })); });
})();

/* =========================================================
   BOOT + LOOP
   ========================================================= */
drawBody(); renderList();
const start=(location.hash||'').slice(1);
selectUse(USES.some(u=>u.id===start)?start:'face');
if(USES.some(u=>u.id===start)) later(()=>$('#where').scrollIntoView(),50);
test.size(3);
for(let i=0;i<N;i++) advance(1/FS);
let last=0, visMain=true, visTest=false;
{ const io=new IntersectionObserver(es=>{ visMain=es[0].isIntersecting; },{rootMargin:'100px'}); io.observe($('#useStage')); cleanups.push(()=>io.disconnect()); }
{ const io=new IntersectionObserver(es=>{ visTest=es[0].isIntersecting; },{rootMargin:'100px'}); io.observe($('#testCanvas')); cleanups.push(()=>io.disconnect()); }
const rowCol=id=>U.sig==='EMG'?COL.EMG:COL.EEG;
function frame(now){
  const dt=Math.min(.05,(now-(last||now))/1000); last=now;
  if(!reduce) advance(dt); else if(Math.floor(now/250)!==Math.floor((now-dt*1000)/250)) advance(.25);
  if(visMain){ main.draw(U.rows,rowCol); updateReadout(now); }
  if(visTest) test.draw(['Ch4','Ch5','Ch7'],id=>id==='Ch7'?COL.EMG:COL.EEG);
  raf(frame);
}
raf(frame);


return () => {
  stopped = true;
  rafs.forEach((id) => cancelAnimationFrame(id));
  rafs.clear();
  timers.forEach((id) => clearTimeout(id));
  timers.clear();
  intervals.forEach((id) => clearInterval(id));
  intervals.clear();
  cleanups.forEach((fn) => fn());
  ROOT.innerHTML = PRISTINE;
};
}
