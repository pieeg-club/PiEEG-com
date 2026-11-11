/* ardEEG guide: interactive engine.
 * Converted from the original ardeeg-page.html. The drawing code is unchanged;
 * it is wrapped so React can mount it on the guide's root element and cleanly stop
 * it (animation loops, timers, intervals, window/document listeners) on unmount.
 * All images are embedded in this file and in ardeeg-guide.css (no public/ files needed).
 */
export function mountArdEEGStoreGuide(root) {
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
const BOARD_PHOTO='/products/ardeeg/guide-board.webp';
const COL={EEG:'#0071e3',EMG:'#ad6500',ECG:'#d72e50',DEV:'#0071e3'};
const ACC='#0071e3';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const g1=(x,m,s)=>{const z=(x-m)/s;return Math.exp(-z*z);};

/* montage from the ardEEG paper (T5, T6 written as P7, P8) */
const P1020={F7:[-.81,.59],Fz:[0,.5],F8:[.81,.59],C3:[-.5,0],C4:[.5,0],P7:[-.81,-.59],Pz:[0,-.5],P8:[.81,-.59]};
const MONT=Object.keys(P1020);

/* =========================================================
   HERO: blue shield on the teal Arduino, packets flying over Wi-Fi
   ========================================================= */
(function drawHero(){
  const s=$('#board');
  if(!s) return; // the store version has no hero drawing const ox=70, oy=110, W=380, H=280;
  let h=`<image x="65" y="105" width="410" height="288" preserveAspectRatio="xMidYMid meet" href="${BOARD_PHOTO}"/>`;
  // Wi-Fi arc and laptop
  const lx=560, ly=360;
  h+=`<path id="wifiArc" d="M${ox+W+20},${oy+60} Q${lx-20},${oy-60} ${lx+40},${ly-60}" fill="none" stroke="${ACC}" stroke-opacity=".3" stroke-width="1.6" stroke-dasharray="2 7"/>
    <g id="pkts"></g>
    <rect x="${lx-20}" y="${ly-60}" width="130" height="84" rx="7" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/><path d="M${lx-34},${ly+36} L${lx+124},${ly+36} L${lx+114},${ly+26} L${lx-24},${ly+26} Z" fill="#23272e"/>
    <g id="lapTr"></g>
    <rect x="${ox+90}" y="${oy+H+50}" width="110" height="34" rx="8" fill="#1d2127" stroke="rgba(255,255,255,.14)"/>${[0,1,2].map(i=>`<circle cx="${ox+160+i*10}" cy="${oy+H+67}" r="2.4" fill="#45dd8b"/>`).join('')}
    <path d="M${ox+90},${oy+H+60} C${ox+40},${oy+H+60} ${ox+20},${oy+H} ${ox+10},${oy+H-40}" fill="none" stroke="#45dd8b" stroke-opacity=".5" stroke-width="2.4"/>`;
  const T=(x,y,a,m,sub)=>`<text x="${x}" y="${y}" text-anchor="${a}"><tspan x="${x}" fill="#1d1d1f" style="font-size:14px;font-weight:600">${m}</tspan><tspan x="${x}" dy="17" fill="#9aa2ad" style="font-size:12.5px">${sub}</tspan></text>`;
  h+=T(ox+190,oy-40,'middle','ADS1299 shield','8 channels, 24-bit');
  h+=T(lx+45,ly+62,'middle','Your computer','Python, UDP port 13900');
  h+=T(lx+10,oy+10,'middle','Wi-Fi','5 packets a second');
  h+=T(ox+220,oy+H+72,'start','5 V power bank','1 A max');
  h+=`<path d="M${ox+W+16},${oy+H-10} L${ox+W+60},${oy+H+66}" stroke="#a1a1a6"/>`+T(ox+W+64,oy+H+78,'start','Electrode connector','8 channels, REF, BIAS');
  h+=`<text x="${ox-6}" y="${oy+H+18}" fill="#9aa2ad" style="font-size:12.5px">Arduino UNO R4 WiFi underneath</text>`;
  s.innerHTML=h;
  // packets along the arc, five per second like the real sketch
  const arc=s.querySelector('#wifiArc'), g=s.querySelector('#pkts'), L=arc.getTotalLength(); const lap=s.querySelector('#lapTr');
  let n=0; const tr=[0,1,2].map(i=>{ const p=document.createElementNS(NS,'path'); p.setAttribute('fill','none'); p.setAttribute('stroke',ACC); p.setAttribute('stroke-width','1.3'); lap.appendChild(p); return p; });
  function drawLap(){ const t=performance.now()/1000; tr.forEach((p,j)=>{ let d=''; for(let i=0;i<=50;i++){ const x=lx-10+i*2.2, y=ly-44+j*22+Math.sin(t*6+i*.5+j)*4*Math.sin(i*.37+t*2+j); d+=(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1); } p.setAttribute('d',d); }); }
  if(reduce){ drawLap(); return; }
  every(()=>{ const r=document.createElementNS(NS,'rect'); r.setAttribute('width',10); r.setAttribute('height',8); r.setAttribute('rx',2); r.setAttribute('fill',ACC); g.appendChild(r); const t0=performance.now();
    (function mv(now){ const k=(now-t0)/1400; if(k>=1){ r.remove(); return; } const pt=arc.getPointAtLength(k*L); r.setAttribute('x',pt.x-5); r.setAttribute('y',pt.y-4); r.setAttribute('opacity',k<.1?k*10:k>.9?(1-k)*10:1); raf(mv); })(t0); },200);
  (function loop(){ drawLap(); raf(loop); })();
  s.querySelectorAll('.epin').forEach((p,i)=>p.animate([{fill:'#d9dde2'},{fill:'#3fc8ff'},{fill:'#d9dde2'}],{duration:900,delay:400+i*90}));
})();

/* =========================================================
   BODY
   ========================================================= */
const ARM_R='M252,300 C226,298 208,312 204,338 C198,380 192,410 190,440 C186,480 181,522 177,566 L205,568 C208,530 214,490 218,452 C222,420 230,390 236,356 Z';
const HAND_R='M177,564 C170,584 172,606 182,617 C192,623 205,616 207,600 C209,588 207,576 205,566 Z';
const mirror=d=>d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g,(m,x,y)=>`${660-parseFloat(x)},${y}`);
const TH={cx:1200,cy:235,R:150};
const topPos=n=>({x:TH.cx+P1020[n][0]*TH.R*.86, y:TH.cy-P1020[n][1]*TH.R*.86});
function along(p,q,t,off){const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy);return{x:p[0]+dx*t+(-dy/L)*off,y:p[1]+dy*t+(dx/L)*off};}
const FORE=[[455,448],[470,560]]; const EMG4=[]; for(let r=0;r<2;r++) for(const c of [-7.5,7.5]) EMG4.push(along(FORE[0],FORE[1],.25+r*.35,c));
const VIEWS={head:{box:[1010,30,380,400]}, arm:{box:[318,292,304,320]}, chest:{box:[190,262,280,295]}};
function drawBody(){
  $('#body').innerHTML=`<defs><linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d323b"/><stop offset="1" stop-color="#181b20"/></linearGradient>
    <radialGradient id="skull" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#fafafb"/><stop offset="1" stop-color="#dfe2e8"/></radialGradient></defs>
  <g id="mannequin"><image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="/products/ardeeg/guide-person.webp"/></g>
  <g id="topHead"><ellipse cx="${TH.cx-TH.R-6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/><ellipse cx="${TH.cx+TH.R+6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/>
    <path d="M${TH.cx-22},${TH.cy-TH.R+8} Q${TH.cx},${TH.cy-TH.R-34} ${TH.cx+22},${TH.cy-TH.R+8}" fill="#d2d2d7"/>
    <circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R}" fill="url(#skull)" stroke="#c5c5cb"/>
    <g fill="none" stroke="var(--sig)" stroke-opacity=".13"><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.43}"/><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.86}"/><path d="M${TH.cx},${TH.cy-TH.R} V${TH.cy+TH.R} M${TH.cx-TH.R},${TH.cy} H${TH.cx+TH.R}"/></g>
    <text x="${TH.cx}" y="${TH.cy-TH.R-34}" text-anchor="middle" fill="#626973" style="font-size:12px">Nose</text></g>
  <g id="bodyEls"></g>`;
}
const diamond=(x,y,dot)=>`<path d="M${x},${y-8} L${x+8},${y} L${x},${y+8} L${x-8},${y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.6"/>${dot?`<circle cx="${x}" cy="${y}" r="2.4" fill="#e8ebef"/>`:''}`;
function placeElectrodes(u){
  const c=COL[u.sig==='DEV'?'EEG':u.sig]; let h='';
  const dot=(x,y,hot,label,lx,ly,anchor)=>`<g opacity="${hot?1:.38}">${hot&&!reduce?`<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${c}" stroke-width="1.5"><animate attributeName="r" values="9;18" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.8s" repeatCount="indefinite"/></circle>`:''}
    <circle cx="${x}" cy="${y}" r="9" fill="#12151a" stroke="${c}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3.6" fill="${hot?c:'#aeb6c0'}"/>${label?`<text x="${lx??x}" y="${ly??(y+24)}" text-anchor="${anchor||'middle'}" fill="${hot?'#1d1d1f':'#76767c'}" style="font-size:13px;font-weight:${hot?600:500}">${label}</text>`:''}</g>`;
  if(u.view==='head'){
    MONT.forEach(n=>{ const p=topPos(n); h+=dot(p.x,p.y,!u.hot||u.hot.includes(n),n); });
    h+=diamond(TH.cx-TH.R-6,TH.cy+10,false)+`<text x="${TH.cx-TH.R-6}" y="${TH.cy-20}" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">REF</text>`;
    h+=diamond(TH.cx+TH.R+6,TH.cy+10,true)+`<text x="${TH.cx+TH.R+6}" y="${TH.cy-20}" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">BIAS</text>`;
  } else if(u.view==='arm'){
    EMG4.forEach((p,i)=>h+=dot(p.x,p.y,true,'',0,0));
    h+=`<text x="420" y="${EMG4[0].y+14}" text-anchor="end" fill="#1d1d1f" style="font-size:12.5px;font-weight:600">4 channels</text>`;
    h+=diamond(478,447,false)+`<text x="492" y="451" fill="#515154" style="font-size:12px;font-weight:600">REF, elbow</text>`;
    h+=diamond(478,578,true)+`<text x="492" y="582" fill="#515154" style="font-size:12px;font-weight:600">BIAS, wrist</text>`;
  } else {
    [[390,318,'Lead I'],[398,482,'Lead II'],[378,404,'V4']].forEach(([x,y,l])=>h+=dot(x,y,true,l,x+16,y+4,'start'));
    h+=diamond(270,318,false)+`<text x="254" y="322" text-anchor="end" fill="#515154" style="font-size:12px;font-weight:600">REF</text>`;
    h+=diamond(262,482,true)+`<text x="246" y="486" text-anchor="end" fill="#515154" style="font-size:12px;font-weight:600">BIAS</text>`;
  }
  $('#bodyEls').innerHTML=h;
}

/* =========================================================
   USE CASES
   ========================================================= */
const USES=[
 {id:'alpha', title:'Your first brain wave', short:'Alpha, eyes closed', sig:'EEG', view:'head', hot:['Fz','Pz'],
  lead:'The classic first experiment, straight from the ardEEG repository. Filter the signal to 8 to 12 Hz and close your eyes: alpha waves grow within a second and fade again when you open them.',
  cap:'<b>The repository’s alpha test used Fz.</b> Pz, further back, shows alpha even more strongly.',
  rows:['Fz','aFz','aPz'], controls:['eyes'], readout:'alpha', with:['1.Alpha_real_time.py','Alpha dataset on GitHub']},
 {id:'artifacts', title:'Blinks and chewing', short:'Learn what artifacts look like', sig:'EEG', view:'head', hot:['Fz','F7','F8'],
  lead:'Before you trust EEG you need to know what isn’t EEG. Blink and a big, slow wave rolls across the front channels. Chew and short bursts of muscle noise appear. The repository has a dataset of exactly this.',
  cap:'<b>Fz</b> was used for the artifact test. F7 and F8 sit closer to the eyes and jaw muscles.',
  rows:['Fz','F7','F8'], controls:['blink','chew'], readout:'artifacts', with:['Artifact dataset on GitHub','1–40 Hz band-pass']},
 {id:'servo', title:'An Arduino that reacts to muscles', short:'EMG, standalone', sig:'EMG', view:'arm',
  lead:'The Arduino doesn’t need a computer to act. Read the forearm muscles, and when the activity crosses a threshold, switch on an LED or turn a servo. It’s a whole prosthetic-style prototype on one small board.',
  cap:'<b>Four electrodes</b> on the forearm muscles. Reference on the elbow bone, bias on the wrist.',
  rows:['M1','M2','env'], controls:['clench'], readout:'servo', with:['Your own sketch','Servo library','LED_BUILTIN']},
 {id:'heart', title:'A heart on the LED matrix', short:'ECG and the R4’s LED matrix', sig:'ECG', view:'chest',
  lead:'Three chest electrodes give a clear ECG. The UNO R4 WiFi has a 12 × 8 LED matrix on the board, so your own sketch can flash a heart with every beat, no computer needed.',
  cap:'<b>Lead I, Lead II and V4</b> on the chest. Reference below the right collarbone, bias on the lower right ribs.',
  rows:['I','II','V4'], controls:['stairs'], readout:'heart', with:['Arduino_LED_Matrix library','Your own sketch']},
 {id:'wifi', title:'Inside the Wi-Fi stream', short:'UDP packets, byte by byte', sig:'DEV', view:'head',
  lead:'The sketch reads 27 bytes from the ADS1299 for every sample: 3 status bytes and 3 bytes for each of the 8 channels. After 50 samples it sends them as one 1,350-byte UDP packet, five times a second. Hover a channel to decode it.',
  cap:'<b>All eight channels</b> travel in every sample, 250 times a second.',
  rows:['Fz','C3'], controls:['pause','step'], readout:'wifi', with:['UDP port 13900','Python socket','1.Send_data_via_wifi.ino']}
];
const CTL={
  eyes:{label:'Close eyes', on:'Eyes closed', toggle:'eyesT', key:'E'},
  blink:{label:'Blink', key:'B'}, chew:{label:'Chew four times', key:'C'},
  clench:{label:'Hold to clench', hold:true, key:'Space'},
  stairs:{label:'Climb the stairs', on:'Climbing', toggle:'stairsT', key:'S'},
  pause:{label:'Pause the stream', on:'Paused', toggle:'paused', key:'P'}, step:{label:'Next packet', key:'N'}
};

/* =========================================================
   SIGNAL MODEL
   ========================================================= */
const FS=125, WIN=4, N=FS*WIN;
const M={eyes:0,eyesT:0,clench:0,clenchT:0,stairsT:0,hr:68,ph:0,bpm:68,beat:0,lastBeat:0,blinks:[],nextBlink:3,chews:[],log:[],env:0,paused:0,pkt:0,sample:0};
let simT=0, head=0, acc=0;
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const R=rng(5), CH={};
MONT.forEach(n=>{ const [x,y]=P1020[n]; const f=[],a=[],p=[]; for(let q=0;q<5;q++){const fr=1+R()*26;f.push(fr);a.push(1/Math.pow(fr,.7));p.push(R()*6.28);} const s=a.reduce((u,v)=>u+v,0); a.forEach((v,i)=>a[i]=v/s);
  CH[n]={label:n,f,a,p,p0:R()*6.28,p1:R()*6.28,occ:clamp(.35-y*.7),bw:clamp((y-.3)*1.8),jaw:Math.abs(x)>.7?1:(n==='Fz'?.35:.2),buf:new Float32Array(N),col:'EEG'}; });
CH.aFz={label:'Fz, 8–12 Hz',buf:new Float32Array(N),col:'EEG'}; CH.aPz={label:'Pz, 8–12 Hz',buf:new Float32Array(N),col:'EEG'};
for(let i=1;i<=4;i++) CH['M'+i]={label:'Forearm '+i,gain:.7+R()*.3,buf:new Float32Array(N),col:'EMG'};
CH.env={label:'Envelope',buf:new Float32Array(N),col:'EMG',thr:.45,type:'env'};
[['I',.72,.28],['II',1,.34],['V4',1.25,.45]].forEach(([k,g,tw])=>CH[k]={label:k==='V4'?'V4':'Lead '+k,g,tw,buf:new Float32Array(N),col:'ECG'});
function stepSample(t){
  const k=1/FS;
  M.eyes+=(M.eyesT-M.eyes)*k*2.4; M.clench+=(M.clenchT-M.clench)*k*(M.clenchT>M.clench?9:6); M.hr+=((M.stairsT?108:68)-M.hr)*k*.35;
  if(t>M.nextBlink && M.eyesT<.5){ M.blinks.push({t,auto:true}); M.nextBlink=t+4.5+Math.random()*4; } if(M.blinks.length>10) M.blinks.shift();
  let bl=0; for(const b of M.blinks){ const z=(t-b.t-.12)/.09; if(z>-4&&z<4) bl+=Math.exp(-z*z); }
  let chew=0; for(const c of M.chews){ const dt=t-c.t; if(dt>0&&dt<.35) chew+=Math.sin(Math.PI*dt/.35); } M.chews=M.chews.filter(c=>t-c.t<1);
  MONT.forEach(n=>{ const c=CH[n]; let bg=0; for(let q=0;q<5;q++) bg+=c.a[q]*Math.sin(6.283*c.f[q]*t+c.p[q]);
    const al=(.18+1.2*M.eyes*c.occ)*(.8+.2*Math.sin(6.283*.3*t+c.p0))*Math.sin(6.283*10.2*t+c.p1);
    c.alpha=al; c.buf[head]=bg*.75+al+bl*c.bw*2.2+(Math.random()*2-1)*chew*c.jaw*1.2+(Math.random()-.5)*.08; });
  CH.aFz.buf[head]=CH.Fz.alpha*1.4+(Math.random()-.5)*.06; CH.aPz.buf[head]=CH.Pz.alpha*1.4+(Math.random()-.5)*.06;
  let rect=0; for(let i=1;i<=4;i++){ const c=CH['M'+i]; const v=(Math.random()*2-1)*(.05+M.clench*c.gain)*1.15; c.buf[head]=v; rect+=Math.abs(v); }
  M.env+=(rect/4*1.9-M.env)*k*7; CH.env.buf[head]=M.env;
  const prev=M.ph; M.ph=(M.ph+M.hr/60*k)%1; if(prev<.29&&M.ph>=.29){ if(M.lastBeat) M.bpm=60/(t-M.lastBeat); M.lastBeat=t; M.beat=performance.now(); } const ph=M.ph;
  for(const key of ['I','II','V4']){ const c=CH[key]; const v=.12*g1(ph,.16,.028)-.12*g1(ph,.27,.009)+g1(ph,.29,.011)-.28*g1(ph,.312,.011)+c.tw*g1(ph,.53,.05); c.buf[head]=(v*c.g-.15)*1.3+.05*Math.sin(6.283*.23*t)+(Math.random()-.5)*.03; }
  M.sample++;
}
function advance(dt){ acc+=dt; while(acc>=1/FS){ acc-=1/FS; simT+=1/FS; head=(head+1)%N; stepSample(simT); } }

/* =========================================================
   DEMO UI
   ========================================================= */
let U=USES[0];
function renderList(){
  const ul=$('#useList'); ul.innerHTML='';
  USES.forEach(u=>{ const li=document.createElement('li'); const b=document.createElement('button'); b.setAttribute('role','tab'); b.dataset.id=u.id; b.style.setProperty('--c',COL[u.sig]);
    b.innerHTML=`<i></i><b>${u.title}</b><span>${u.short}</span>`; b.addEventListener('click',()=>selectUse(u.id));
    b.addEventListener('keydown',e=>{ if(['ArrowDown','ArrowUp'].includes(e.key)){ e.preventDefault(); const i=USES.indexOf(U)+(e.key==='ArrowDown'?1:-1); const n=USES[(i+USES.length)%USES.length]; selectUse(n.id); ul.querySelector(`[data-id="${n.id}"]`).focus(); } });
    li.appendChild(b); ul.appendChild(li); });
}
function selectUse(id){
  const prevView=U&&U.view; U=USES.find(u=>u.id===id);
  ROOT.querySelectorAll('#useList button').forEach(b=>{ const on=b.dataset.id===id; b.setAttribute('aria-selected',on); b.tabIndex=on?0:-1; });
  { const ul=$('#useList'), sel=ul.querySelector(`[data-id="${id}"]`); if(ul.scrollWidth>ul.clientWidth) ul.scrollLeft=sel.parentElement.offsetLeft-ul.clientWidth/2+sel.clientWidth/2; }
  ROOT.style.setProperty('--sig',COL[U.sig]); if(U.id!=='wifi') M.paused=0;
  const body=$('#body');
  const apply=()=>{ const [x,y,w,h]=VIEWS[U.view].box; body.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);
    $('#mannequin').style.display=U.view==='head'?'none':''; $('#topHead').style.display=U.view==='head'?'':'none'; placeElectrodes(U); body.classList.remove('swap'); };
  if(prevView!==U.view && !reduce){ body.classList.add('swap'); later(apply,200); } else apply();
  $('#bodyCap').innerHTML=U.cap;
  $('#demoSig').innerHTML=`<i></i>${U.sig==='DEV'?'Developers':U.sig}, ${U.view==='head'?(U.hot?U.hot.join(', '):'all 8 channels'):U.view==='arm'?'forearm':'chest'}`;
  $('#demoTitle').textContent=U.title; $('#demoLead').textContent=U.lead;
  $('#with').innerHTML='<span>Use it with</span>'+U.with.map(w=>`<span class="chip">${w}</span>`).join('');
  renderControls(); renderReadout(); sizeCanvas(); history.replaceState&&history.replaceState(null,'','#'+U.id);
}
const ctlList=()=>U.id==='wifi'?(M.paused?['pause','step']:['pause']):U.controls;
function renderControls(){
  const c=$('#controls'); c.innerHTML='';
  ctlList().forEach(k=>{ const d=CTL[k]; const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k;
    const refresh=()=>{ const on=d.toggle?M[d.toggle]>0:false; if(d.toggle) b.setAttribute('aria-pressed',on); b.innerHTML=`${d.toggle&&on?d.on:d.label} <span class="k">${d.key}</span>`; };
    b.refresh=refresh; refresh();
    if(d.hold){ const down=e=>{ e.preventDefault(); M.clenchT=1; b.classList.add('held'); }, up=()=>{ M.clenchT=0; b.classList.remove('held'); };
      b.addEventListener('pointerdown',down); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,up));
      b.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); if(!e.repeat) down(e); } }); b.addEventListener('keyup',e=>{ if(e.key===' '||e.key==='Enter') up(); });
    } else b.addEventListener('click',()=>act(k));
    c.appendChild(b); });
}
function act(k){ const d=CTL[k];
  if(d.toggle){ M[d.toggle]=M[d.toggle]?0:1; if(k==='pause') renderControls(); }
  if(k==='blink'){ M.blinks.push({t:simT}); M.log.unshift({t:simT,what:'Blink'}); }
  if(k==='chew'){ for(let i=0;i<4;i++) M.chews.push({t:simT+i*.5}); M.log.unshift({t:simT,what:'Chew × 4'}); }
  if(k==='step'){ M.pkt++; renderPacket(); }
  M.log=M.log.slice(0,4);
  ROOT.querySelectorAll('.ctl').forEach(b=>b.refresh&&b.refresh());
}
on(document,'keydown',e=>{
  if(e.target.closest('input,textarea,.use-list,.tabs,.ctl,.seg-mini') || e.metaKey||e.ctrlKey||e.altKey) return;
  const r=$('#useStage').getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
  const key=e.key===' '?'Space':e.key.length===1?e.key.toUpperCase():e.key; const k=ctlList().find(c=>CTL[c].key===key); if(!k) return; e.preventDefault();
  if(CTL[k].hold){ if(!e.repeat){ M.clenchT=1; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.add('held'); } } else if(!e.repeat) act(k);
});
on(document,'keyup',e=>{ if(e.key===' '&&U.controls.includes('clench')){ M.clenchT=0; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.remove('held'); } });

const HEART=['000000000000','001100110000','011111111000','011111111000','001111110000','000111100000','000011000000','000000000000'];
function renderReadout(){
  const r=$('#readout'), k=U.readout;
  if(k==='alpha') r.innerHTML=`<div class="meters"><div class="meter"><div class="lab">Alpha at Fz<b id="ro1">0.00</b></div><div class="track"><div class="fill" id="rf1"></div></div></div><div class="meter"><div class="lab">Alpha at Pz<b id="ro2">0.00</b></div><div class="track"><div class="fill" id="rf2"></div></div></div></div><p class="muted" id="ro3" style="margin-top:10px">Close your eyes and watch the filtered rows.</p>`;
  if(k==='artifacts') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div><div class="muted">Looks like</div><div class="big" id="art" style="font-size:30px">Clean EEG</div><div class="muted" id="artWhy" style="max-width:32ch;margin-top:6px"></div></div><div style="flex:1;min-width:180px"><div class="muted">Events</div><div class="markers" id="log">None yet.</div></div></div>`;
  if(k==='servo') r.innerHTML=`<div class="row-flex" style="align-items:center"><svg class="ard" viewBox="0 0 200 120" aria-label="Arduino with LED and servo"><rect x="4" y="14" width="124" height="92" rx="8" fill="#0f7f86"/><rect x="0" y="30" width="18" height="18" rx="2" fill="#c7ccd2"/>
      <text x="66" y="66" text-anchor="middle" fill="#cdeef0" style="font-size:10px;font-weight:700">UNO R4 WiFi</text><circle id="led" cx="104" cy="30" r="6" fill="#3b2a12" stroke="#ffae42"/><text x="104" y="48" text-anchor="middle" fill="#cdeef0" style="font-size:8px">LED</text>
      <rect x="140" y="50" width="52" height="34" rx="4" fill="#2a2e35" stroke="#5a616d"/><g id="horn" style="transform-origin:166px 58px;transition:transform .15s"><rect x="162" y="22" width="8" height="38" rx="4" fill="#eef0f3"/></g><circle cx="166" cy="58" r="6" fill="#aeb4bc"/></svg>
    <div style="flex:1;min-width:220px"><div class="meter"><div class="lab">Muscle activity<b id="ro1">0.00</b></div><div class="track" style="position:relative"><div class="fill" id="rf1"></div><span style="position:absolute;left:45%;top:-3px;bottom:-3px;width:2px;background:#fff"></span></div></div>
    <pre class="snip">${'// an idea for your own sketch\nif (envelope > threshold) digitalWrite(LED_BUILTIN, HIGH);\nservo.write(map(envelope, 0, maxEnvelope, 0, 180));'.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></div></div>`;
  if(k==='heart') r.innerHTML=`<div class="row-flex" style="align-items:center"><div class="matrix" id="matrix">${HEART.map(row=>[...row].map(c=>`<i class="${c==='1'?'on':''}"></i>`).join('')).join('')}</div>
    <div><div class="big" id="ro1">68</div><div class="muted">beats per minute</div><pre class="snip">${'// an idea for your own sketch\nif (beatDetected) matrix.loadFrame(heart);'.replace(/</g,'&lt;')}</pre></div></div>`;
  if(k==='wifi'){ r.innerHTML=`<div class="pkinfo"><span id="pkHead"></span></div><div class="packet27" id="packet"></div><div class="pk-legend"><span><i style="background:#626973"></i>Status, 3 bytes</span><span><i style="background:var(--sig)"></i>8 channels × 3 bytes</span></div><p class="muted" id="decode" style="margin:8px 0 0">Hover a channel to decode it.</p>`; renderPacket(); }
}
const LSB=4.5/8388608*1e6; // µV per count at gain 1, VREF 4.5 V
function renderPacket(){
  const el=$('#packet'); if(!el) return; const hex=n=>n.toString(16).toUpperCase().padStart(2,'0');
  const bytes=[0xC0,0x00,0x00], vals=[];
  MONT.forEach(n=>{ const uv=CH[n].buf[head]*18; let raw=Math.round(uv/LSB); vals.push(raw); if(raw<0) raw+=0x1000000; bytes.push((raw>>16)&255,(raw>>8)&255,raw&255); });
  el.innerHTML=bytes.map((b,i)=>{ const ch=i>=3?Math.floor((i-3)/3):-1; return `<span class="b ${ch<0?'se':'ch'+(ch%2?' odd':'')}" data-ch="${ch}">${hex(b)}</span>`; }).join('');
  $('#pkHead').innerHTML=`Packet <b>${M.pkt}</b> · 1,350 bytes = 50 samples × 27 bytes. Showing sample ${1+(M.sample%50)} of 50.`.replace(' · ',', ');
  el.dataset.vals=JSON.stringify(vals);
  el.querySelectorAll('.b').forEach(s=>s.addEventListener('pointerenter',()=>{ const ch=+s.dataset.ch; el.querySelectorAll('.b').forEach(x=>x.classList.toggle('on',ch>=0&&+x.dataset.ch===ch));
    const d=$('#decode'); if(ch<0){ d.innerHTML='<b>Status bytes.</b> The ADS1299 starts every sample with 3 status bytes: a 1100 header, lead-off flags and GPIO.'; return; }
    const raw=JSON.parse(el.dataset.vals)[ch], b3=[...el.querySelectorAll(`.b[data-ch="${ch}"]`)].map(x=>'0x'+x.textContent).join(' ');
    d.innerHTML=`<b>${MONT[ch]}, channel ${ch+1}</b>: ${b3} → ${raw} counts × ${LSB.toFixed(3)} µV = <b>${(raw*LSB).toFixed(1)} µV</b> at gain 1`; }));
}
let lastRO=0,lastPkt=0;
function updateReadout(now){
  if(U.readout==='wifi' && !M.paused && now-lastPkt>200){ lastPkt=now; M.pkt++; if(!$('#packet .b.on')) renderPacket(); }
  if(now-lastRO<90) return; lastRO=now; const k=U.readout;
  if(k==='alpha'){ const a1=clamp(.12+.55*M.eyes*CH.Fz.occ*1.6), a2=clamp(.12+.8*M.eyes*CH.Pz.occ); $('#ro1').textContent=a1.toFixed(2); $('#rf1').style.width=a1*100+'%'; $('#ro2').textContent=a2.toFixed(2); $('#rf2').style.width=a2*100+'%';
    $('#ro3').textContent=M.eyes>.5?'Eyes closed: alpha is up, more at Pz than at Fz.':'Close your eyes and watch the filtered rows.'; }
  if(k==='artifacts'){ const recentB=M.blinks.some(b=>simT-b.t>.05&&simT-b.t<.6), recentC=M.chews.some(c=>simT-c.t>0&&simT-c.t<.5);
    $('#art').textContent=recentC?'Chewing':recentB?'A blink':'Clean EEG';
    $('#artWhy').textContent=recentC?'Short bursts of fast, spiky noise, strongest at F7 and F8 near the jaw muscles.':recentB?'A big, slow wave, strongest at the front and fading towards the back.':'Small, wandering waves with no big jumps.';
    $('#log').innerHTML=M.log.length?M.log.map(l=>`${l.what} at ${l.t.toFixed(1)} s`).join('<br>'):'None yet. Some blinks happen on their own.'; }
  if(k==='servo'){ const v=clamp(M.env); $('#ro1').textContent=v.toFixed(2); $('#rf1').style.width=v*100+'%'; const on=v>.45; $('#led').setAttribute('fill',on?'#ffae42':'#3b2a12'); $('#led').style.filter=on?'drop-shadow(0 0 6px #ffae42)':'none'; $('#horn').style.transform=`rotate(${(-80+v*160).toFixed(0)}deg)`; }
  if(k==='heart'){ $('#ro1').textContent=Math.round(M.bpm); $('#matrix').classList.toggle('beat',now-M.beat<160); }
}

/* ---------- traces ---------- */
function makeTraces(canvas){ const o={cv:canvas,ctx:canvas.getContext('2d'),W:0,H:0,rowH:40};
  o.size=n=>{ o.rowH=n>4?34:n>2?44:58; const d=Math.min(2,devicePixelRatio||1); o.W=canvas.clientWidth; o.H=n*o.rowH+14; canvas.width=o.W*d; canvas.height=o.H*d; canvas.style.height=o.H+'px'; o.ctx.setTransform(d,0,0,d,0,0); };
  o.draw=(rows)=>{ const ctx=o.ctx, labelW=o.W<460?84:100, W=o.W-labelW-12; ctx.clearRect(0,0,o.W,o.H); ctx.strokeStyle='rgba(0,0,0,.055)'; ctx.lineWidth=1;
    for(let s=0;s<=WIN;s++){ const x=labelW+W*s/WIN; ctx.beginPath(); ctx.moveTo(x,6); ctx.lineTo(x,o.H-6); ctx.stroke(); }
    ctx.font='12.5px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif'; ctx.textBaseline='middle';
    rows.forEach((id,r)=>{ const c=CH[id], y0=7+o.rowH*r+o.rowH/2, amp=o.rowH*.42; ctx.fillStyle='#6e6e73'; ctx.fillText(c.label,10,y0);
      const env=c.type==='env'; const map=env?v=>y0+o.rowH*.4-v*o.rowH*.8:v=>y0-clamp(v,-1.6,1.6)*amp*.62;
      if(env){ ctx.setLineDash([4,4]); ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.beginPath(); ctx.moveTo(labelW,map(c.thr)); ctx.lineTo(labelW+W,map(c.thr)); ctx.stroke(); ctx.setLineDash([]); }
      ctx.strokeStyle=COL[c.col]; ctx.lineWidth=env?2:1.3; ctx.beginPath(); const step=Math.max(1,Math.floor(N/Math.min(N,W)));
      for(let i=0;i<N;i+=step){ const x=labelW+W*i/(N-1); const y=map(c.buf[(head+1+i)%N]); i?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.stroke(); }); };
  return o; }
const main=makeTraces($('#demoCanvas')), test=makeTraces($('#testCanvas'));
function sizeCanvas(){ main.size(U.rows.length); } on(window,'resize',()=>{ sizeCanvas(); test.size(2); });

/* =========================================================
   HOW-TO WIDGETS
   ========================================================= */
function checklist(sel,step,progress){ const upd=()=>{ const all=[...ROOT.querySelectorAll(sel+' input')], n=all.filter(i=>i.checked).length;
  if(progress) $(progress).innerHTML=n===all.length?'<b>Everything ready.</b> On to step 2.':`<b>${n} of ${all.length}</b> ready`; $(step).classList.toggle('done',n===all.length); };
  ROOT.querySelectorAll(sel+' input').forEach(i=>i.addEventListener('change',upd)); upd(); }
checklist('#kit','#s1','#kitProgress'); checklist('#upload','#s5');
ROOT.querySelectorAll('#boardSeg button').forEach(b=>b.addEventListener('click',()=>{ ROOT.querySelectorAll('#boardSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b)); const v=$('#boardVerdict'); v.style.display='';
  if(b.dataset.b==='wifi'){ v.className='verdict ok'; v.innerHTML='<b>Right board.</b> The UNO R4 WiFi has an ESP32-S3 on board for the Wi-Fi link.'; } else { v.className='verdict bad'; v.innerHTML='<b>Won’t work.</b> The Minima has no Wi-Fi, so the sketch can’t send anything. Get the UNO R4 WiFi.'; } }));

// step 2: pins
(function(){
  const s=$('#pins'); const pins=['SCL','SDA','AREF','GND','D13','D12','D11','D10','D9','D8','D7','D6','D5','D4','D3','D2','D1','D0'];
  const use={D13:['SPI clock, SCK','The Arduino sets the pace of every transfer.'],D12:['SPI data in, MISO','Samples flow from the ADS1299 to the Arduino.'],D11:['SPI data out, MOSI','Commands flow from the Arduino to the ADS1299.'],D10:['Chip select, CS','Tells the ADS1299 the Arduino is talking to it.'],D7:['Data ready, DRDY','The ADS1299 pulls this pin to say a new sample is waiting.']};
  let h=`<rect x="10" y="60" width="500" height="70" rx="8" fill="#0f7f86"/><rect x="24" y="80" width="${pins.length*26+4}" height="30" rx="3" fill="#15161a"/>`;
  pins.forEach((p,i)=>{ const x=30+i*26, u=use[p]; h+=`<g class="apin ${u?'used':''}" data-p="${p}" style="cursor:${u?'pointer':'default'}"><rect x="${x}" y="86" width="16" height="16" rx="2" fill="${u?ACC:'#e3c15f'}" ${u?'':'opacity=".45"'}/><text x="${x+8}" y="${u?74:150}" text-anchor="middle" fill="${u?'#eef0f3':'#6c737c'}" style="font-size:10.5px;font-weight:${u?700:500}">${p}</text></g>`; });
  h+=`<text x="10" y="186" fill="#9aa2ad" style="font-size:12.5px">Digital header of the UNO R4, as seen from above. Plus 5 V and GND for power.</text>`;
  s.innerHTML=h;
  s.querySelectorAll('.apin.used').forEach(g=>{ const show=()=>{ const u=use[g.dataset.p]; s.querySelectorAll('.apin.used rect').forEach(r=>r.setAttribute('fill',ACC)); g.querySelector('rect').setAttribute('fill','#fff'); $('#pinInfo').innerHTML=`<b>${g.dataset.p}: ${u[0]}.</b> ${u[1]}`; };
    g.addEventListener('pointerenter',show); g.addEventListener('click',show); });
})();

// step 3: wiring map
(function(){
  const s=$('#wire'), cx=150, cy=196, R=118;
  const pins=[...MONT.map((n,i)=>({label:'CH'+(i+1),to:n,desc:n==='P7'?'P7 (T5)':n==='P8'?'P8 (T6)':n})),{label:'BIAS',to:'earR',desc:'Right earlobe clip',ref:true},{label:'REF',to:'earL',desc:'Left earlobe clip',ref:true}];
  const pos=n=>n==='earL'?{x:cx-R-12,y:cy}:n==='earR'?{x:cx+R+12,y:cy}:{x:cx+P1020[n][0]*R*.86,y:cy-P1020[n][1]*R*.86};
  let h=`<ellipse cx="${cx-R-4}" cy="${cy}" rx="12" ry="26" fill="#23272e"/><ellipse cx="${cx+R+4}" cy="${cy}" rx="12" ry="26" fill="#23272e"/><path d="M${cx-16},${cy-R+6} Q${cx},${cy-R-26} ${cx+16},${cy-R+6}" fill="#262a31"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="#1f232a" stroke="rgba(255,255,255,.12)"/><rect x="440" y="24" width="44" height="${pins.length*32+8}" rx="6" fill="#f1f1ee"/><text x="462" y="14" text-anchor="middle" fill="#626973" style="font-size:12px">Connector</text><g id="wires"></g>`;
  pins.forEach((p,i)=>{ const y=44+i*32; p.py=y; h+=`<g class="pin" data-i="${i}" style="cursor:pointer"><rect x="454" y="${y-6}" width="16" height="12" rx="2" fill="#9aa1aa"/><text x="496" y="${y+4}" fill="#cfd4da" style="font-size:13px;font-weight:600">${p.label}</text></g>`; });
  pins.forEach((p,i)=>{ const q=pos(p.to); p.q=q; h+=`<g class="edot" data-i="${i}" style="cursor:pointer">${p.ref?`<path d="M${q.x},${q.y-8} L${q.x+8},${q.y} L${q.x},${q.y+8} L${q.x-8},${q.y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.6"/>`:`<circle cx="${q.x}" cy="${q.y}" r="8" fill="#12151a" stroke="#3fc8ff" stroke-width="2"/><circle cx="${q.x}" cy="${q.y}" r="3" fill="#3fc8ff"/><text x="${q.x}" y="${q.y+22}" text-anchor="middle" fill="#9aa2ad" style="font-size:11.5px">${p.to}</text>`}</g>`; });
  s.innerHTML=h; const wires=s.querySelector('#wires');
  pins.forEach(p=>{ const q=p.q, path=document.createElementNS(NS,'path'); path.setAttribute('d',p.to==='earL'?`M${q.x},${q.y} C${q.x-10},${q.y+176} 330,${p.py} 454,${p.py}`:`M${q.x},${q.y} C${q.x+90},${q.y} 380,${p.py} 454,${p.py}`);
    path.setAttribute('fill','none'); path.setAttribute('stroke',p.ref?'#e8ebef':'#3fc8ff'); path.setAttribute('stroke-width','1.4'); path.setAttribute('stroke-opacity','.35'); p.path=path; wires.appendChild(path); });
  $('#wireList').innerHTML=pins.map((p,i)=>`<div data-i="${i}"><b>${p.label}</b><span>${p.desc}</span></div>`).join('');
  const hl=i=>{ pins.forEach((p,j)=>{ p.path.setAttribute('stroke-opacity',i==null?.35:i===j?1:.08); p.path.setAttribute('stroke-width',i===j?2.6:1.4); }); s.querySelectorAll('.pin,.edot').forEach(n=>n.style.opacity=i==null||+n.dataset.i===i?1:.3); ROOT.querySelectorAll('#wireList div').forEach(n=>n.classList.toggle('on',+n.dataset.i===i)); };
  [...s.querySelectorAll('.pin,.edot'),...ROOT.querySelectorAll('#wireList div')].forEach(n=>{ n.addEventListener('pointerenter',()=>hl(+n.dataset.i)); n.addEventListener('pointerleave',()=>hl(null)); });
})();

// step 4: live config
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function renderCfg(){
  const ssid=$('#fSsid').value||'Wifi Name', pass=$('#fPass').value, ip=$('#fIp').value||'192.168.1.241';
  const masked=pass?'•'.repeat(Math.min(pass.length,16)):'password';
  const ok=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(ip) && ip.split('.').every(n=>+n<=255);
  $('#code-cfg').innerHTML=`<span class="c">// 1.Send_data_via_wifi.ino, near the top</span>
char ssid[] = "<b class="hl">${esc(ssid)}</b>";
char pass[] = "<b class="hl">${esc(masked)}</b>";

<span class="c">// in loop(): where the packets go</span>
udp.beginPacket("<b class="hl">${esc(ip)}</b>", 13900);

<span class="c"># 1.Alpha_real_time.py</span>
UDP_IP = "<b class="hl">${esc(ip)}</b>"
UDP_PORT = 13900`;
  const v=$('#ipCheck'); if($('#fIp').value){ v.style.display=''; v.className='verdict '+(ok?'ok':'bad'); v.innerHTML=ok?'<b>Looks like an IP address.</b> Use the same one in both files.':'<b>That doesn’t look like an IP address.</b> Four numbers from 0 to 255, separated by dots.'; } else v.style.display='none';
  $('#s4').classList.toggle('done',!!($('#fSsid').value&&pass&&ok));
  $('#code-cfg').dataset.plain=`char ssid[] = "${ssid}";\nchar pass[] = "${pass||'password'}";\nudp.beginPacket("${ip}", 13900);\n\nUDP_IP = "${ip}"`;
}
['#fSsid','#fPass','#fIp'].forEach(id=>$(id).addEventListener('input',renderCfg)); renderCfg();
ROOT.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{ const el=$('#code-'+b.dataset.copy); const txt=el.dataset.plain||el.innerText;
  try{ await navigator.clipboard.writeText(txt); b.textContent='Copied'; }catch(e){ b.textContent='Select and copy'; } later(()=>b.textContent='Copy',1400); }));

// step 8: tests
const TESTS={blink:false,alpha:false};
function renderTests(){ $('#tests').innerHTML=[['blink','Blink hard','A big spike on Fz'],['alpha','Close your eyes for 10 seconds','Filtered 8 to 12 Hz waves grow, then drop when you open them']].map(([id,t,s])=>`<li class="${TESTS[id]?'ok':''}"><b>${t}</b><span>${s}</span></li>`).join(''); $('#s8').classList.toggle('done',TESTS.blink&&TESTS.alpha); }
(function(){ const c=$('#testCtl'); [['blink','Blink hard'],['alpha','Close eyes, then open']].forEach(([id,l])=>{ const b=document.createElement('button'); b.className='ctl'; b.textContent=l;
  b.addEventListener('click',()=>{ if(id==='blink'){ M.blinks.push({t:simT}); M.blinks.push({t:simT+.5}); later(()=>{TESTS.blink=true;renderTests();},900); }
    if(id==='alpha'){ M.eyesT=1; later(()=>{ M.eyesT=0; TESTS.alpha=true; renderTests(); },3000); } }); c.appendChild(b); }); renderTests(); })();

/* =========================================================
   BOOT + LOOP
   ========================================================= */
drawBody(); renderList();
const start=(location.hash||'').slice(1); selectUse(USES.some(u=>u.id===start)?start:'alpha');
if(USES.some(u=>u.id===start)) later(()=>$('#where').scrollIntoView(),50);
test.size(2); for(let i=0;i<N;i++) advance(1/FS);
let last=0, vis=true, visT=false;
{ const io=new IntersectionObserver(es=>{ vis=es[0].isIntersecting; },{rootMargin:'100px'}); io.observe($('#useStage')); cleanups.push(()=>io.disconnect()); }
{ const io=new IntersectionObserver(es=>{ visT=es[0].isIntersecting; },{rootMargin:'100px'}); io.observe($('#testCanvas')); cleanups.push(()=>io.disconnect()); }
function frame(now){ const dt=Math.min(.05,(now-(last||now))/1000); last=now;
  const frozen=U.id==='wifi'&&M.paused; if(!frozen){ if(!reduce) advance(dt); else if(Math.floor(now/250)!==Math.floor((now-dt*1000)/250)) advance(.25); }
  if(vis){ main.draw(U.rows); updateReadout(now); } if(visT) test.draw(['Fz','aFz']); raf(frame); }
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
