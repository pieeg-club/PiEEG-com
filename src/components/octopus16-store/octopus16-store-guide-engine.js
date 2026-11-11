/* Octopus 16 guide: interactive engine.
 * Converted from the original octopus16-page.html. The drawing code is unchanged;
 * it is wrapped so React can mount it on the guide's root element and cleanly stop
 * it (animation frame, timers, intervals, window/document listeners) on unmount.
 * All images are embedded in this file and in octopus16-guide.css (no public/ files needed).
 */
export function mountOctopus16StoreGuide(root) {
if (!root) return () => {};
const ROOT = root;
// Snapshot of the server-rendered markup, restored on cleanup so a re-mount
// (React Strict Mode in dev, or navigating back) starts from a clean slate.
const PRISTINE = ROOT.innerHTML;
let stopped = false;
let rafId = 0;
const timers = new Set();
const intervals = new Set();
const cleanups = [];
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
const BOARD_PHOTO='/products/octopus-16/guide-board.webp';
const COL={EEG:'#0071e3',EMG:'#ad6500',ECG:'#d72e50',EOG:'#8653bc',DEV:'#0071e3'};
const ACC='#0071e3';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

/* 16 pins: rows of 2, 4, 4, 4, 2 inside a circle */
const PINS=[]; [[2,-2],[4,-1],[4,0],[4,1],[2,2]].forEach(([n,r])=>{ for(let i=0;i<n;i++) PINS.push({x:(i-(n-1)/2), y:r}); });

/* =========================================================
   HERO: the board with its pogo-pin "tentacles"
   ========================================================= */
(function drawBoard(){
  const s=$('#board');
  if(!s) return; // the store version has no hero drawing const cx=360, cy=196, rx=172, ry=64, T=14, k=ry/rx;
  const rise=38;
  let h=`<image x="208" y="100" width="336" height="374" preserveAspectRatio="xMidYMid meet" href="${BOARD_PHOTO}"/>`;
  const call=(tx,ty,px,py,main,sub,anchor='start')=>`<text x="${tx}" y="${ty}" text-anchor="${anchor}"><tspan x="${tx}" fill="#1d1d1f" style="font-size:14px;font-weight:600">${main}</tspan><tspan x="${tx}" dy="17" fill="#9aa2ad" style="font-size:12.5px">${sub}</tspan></text>`;
  h+=call(cx-30,48,cx-30,cy-rise-10,'XIAO ESP32-S3','Bluetooth LE 5','middle');
  h+=call(cx+300,96,cx+262,cy-156,'Antenna','Snaps onto the XIAO','end');
  h+=call(cx-rx-6,cy-40,cx-rx+6,cy+T/2,'2 × ADS131M08','Inside, 24-bit','end');
  h+=call(cx-rx-4,cy+T+150,cx-100,cy+T+110,'16 pogo pins','The electrodes, spring-loaded','end');
  h+=call(cx+40,538,cx+40,cy+T+150,'Pins touch the scalp','Dry, through hair','middle');
  s.innerHTML=h;
  if(!reduce) s.querySelectorAll('.plunger').forEach((p,i)=>p.animate([{transform:'translateY(0)'},{transform:'translateY(-26px)'},{transform:'translateY(0)'}],{duration:700,delay:600+i*55,easing:'cubic-bezier(.3,1.5,.5,1)'}));
})();

/* =========================================================
   BODY: top view of the head, or the forearm
   ========================================================= */
const ARM_R='M252,300 C226,298 208,312 204,338 C198,380 192,410 190,440 C186,480 181,522 177,566 L205,568 C208,530 214,490 218,452 C222,420 230,390 236,356 Z';
const HAND_R='M177,564 C170,584 172,606 182,617 C192,623 205,616 207,600 C209,588 207,576 205,566 Z';
const mirror=d=>d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g,(m,x,y)=>`${660-parseFloat(x)},${y}`);
const TH={cx:1200,cy:230,R:150};
const LANDMARK={Fz:[0,.5],Cz:[0,0],Pz:[0,-.5],C3:[-.5,0],C4:[.5,0],P3:[-.4,-.53],P4:[.4,-.53],O1:[-.31,-.95],O2:[.31,-.95],Oz:[0,-1]};
const PUCK={x:TH.cx,y:TH.cy+TH.R*.72,r:38};
const ARMPUCK={x:458,y:492,r:26};
const VIEWS={head:{box:[1010,30,380,400]}, arm:{box:[318,300,304,320]}};
function drawBody(){
  $('#body').innerHTML=`<defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d323b"/><stop offset="1" stop-color="#181b20"/></linearGradient>
    <radialGradient id="skull" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#fafafb"/><stop offset="1" stop-color="#dfe2e8"/></radialGradient>
  </defs>
  <g id="mannequin"><image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="/products/octopus-16/guide-person.webp"/></g>
  <g id="topHead">
    <ellipse cx="${TH.cx-TH.R-6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/><ellipse cx="${TH.cx+TH.R+6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/>
    <path d="M${TH.cx-22},${TH.cy-TH.R+8} Q${TH.cx},${TH.cy-TH.R-34} ${TH.cx+22},${TH.cy-TH.R+8}" fill="#d2d2d7"/>
    <circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R}" fill="url(#skull)" stroke="#2c4a8a" stroke-opacity=".9" stroke-width="7"/>
    <g fill="none" stroke="var(--sig)" stroke-opacity=".12"><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.43}"/><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.86}"/><path d="M${TH.cx},${TH.cy-TH.R} V${TH.cy+TH.R} M${TH.cx-TH.R},${TH.cy} H${TH.cx+TH.R}"/></g>
    ${Object.entries(LANDMARK).map(([n,[x,y]])=>{ const px=TH.cx+x*TH.R*.86, py=TH.cy-y*TH.R*.86; const near=Math.hypot(px-PUCK.x,py-PUCK.y)<PUCK.r+8; return near?'':`<circle cx="${px}" cy="${py}" r="2.5" fill="#6c737c"/><text x="${px}" y="${py-7}" text-anchor="middle" fill="#6c737c" style="font-size:10.5px">${n}</text>`; }).join('')}
    <text x="${TH.cx}" y="${TH.cy-TH.R-34}" text-anchor="middle" fill="#626973" style="font-size:12px">Nose</text>
    <text x="${TH.cx}" y="${TH.cy-TH.R*.66}" text-anchor="middle" fill="#626973" style="font-size:11.5px">10-20 landmarks for orientation</text>
  </g>
  <g id="bodyEls"></g>`;
}
function puckSVG(P,vals,col,label=true){
  const s=P.r/2.9;
  let h=`<image x="${P.x-P.r*1.3}" y="${P.y-P.r*1.3}" width="${P.r*2.6}" height="${P.r*2.6}" href="${BOARD_PHOTO}"/><circle cx="${P.x}" cy="${P.y}" r="${P.r}" fill="#121316" fill-opacity=".26" stroke="rgba(255,255,255,.55)" stroke-width="1.4"/>`;
  PINS.forEach((p,i)=>{ const v=vals?vals[i]:1; h+=`<circle class="pin" data-i="${i}" cx="${P.x+p.x*s*1.25}" cy="${P.y+p.y*s*1.18}" r="${s*.42}" fill="${col}" fill-opacity="${.25+v*.75}" stroke="#f3c77a" stroke-width=".8"/>`; });
  return h;
}
let bodyPinEls=[];
function placeElectrodes(u){
  const g=$('#bodyEls'); let h='';
  if(u.view==='head'){
    h+=`<rect x="${TH.cx+TH.R*.62}" y="${TH.cy+TH.R*.62}" width="40" height="22" rx="5" transform="rotate(-42 ${TH.cx+TH.R*.62+20} ${TH.cy+TH.R*.62+11})" fill="#8b929c" stroke="#d6dae0"/>
      <text x="${TH.cx+TH.R*.62+58}" y="${TH.cy+TH.R*.62+44}" fill="#9aa2ad" style="font-size:11.5px">power bank</text>`;
    h+=puckSVG(PUCK,null,COL[u.sig]);
    h+=`<path d="M${PUCK.x-PUCK.r-4},${PUCK.y} H${PUCK.x-PUCK.r-40}" stroke="#a1a1a6"/>
      <text x="${PUCK.x-PUCK.r-44}" y="${PUCK.y-2}" text-anchor="end" fill="#1d1d1f" style="font-size:13px;font-weight:600">Octopus 16</text>
      <text x="${PUCK.x-PUCK.r-44}" y="${PUCK.y+14}" text-anchor="end" fill="#8e96a0" style="font-size:11.5px">over O1, Oz, O2</text>
      <text x="${TH.cx}" y="${TH.cy+TH.R+26}" text-anchor="middle" fill="#8e96a0" style="font-size:11.5px">Head band</text>`;
  } else {
    h+=`<path d="M${ARMPUCK.x-26},${ARMPUCK.y-2} C${ARMPUCK.x-10},${ARMPUCK.y+8} ${ARMPUCK.x+12},${ARMPUCK.y+8} ${ARMPUCK.x+28},${ARMPUCK.y-2}" stroke="#2c4a8a" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/>`;
    h+=puckSVG(ARMPUCK,null,COL[u.sig]);
    h+=`<path d="M${ARMPUCK.x+ARMPUCK.r+2},${ARMPUCK.y} H${ARMPUCK.x+ARMPUCK.r+30}" stroke="#a1a1a6"/>
      <text x="${ARMPUCK.x+ARMPUCK.r+34}" y="${ARMPUCK.y-2}" fill="#1d1d1f" style="font-size:13px;font-weight:600">16 pins</text>
      <text x="${ARMPUCK.x+ARMPUCK.r+34}" y="${ARMPUCK.y+14}" fill="#8e96a0" style="font-size:11.5px">on one muscle</text>`;
  }
  g.innerHTML=h; bodyPinEls=[...g.querySelectorAll('.pin')];
}

/* =========================================================
   USE CASES
   ========================================================= */
const USES=[
 {id:'alpha', title:'Visual cortex alpha', short:'Relaxation, eyes closed', sig:'EEG', view:'head',
  lead:'The visual cortex produces the strongest alpha rhythm in the brain. Close your eyes and it swells across all sixteen pins within a second: the classic relaxation signal, measured right where it starts.',
  cap:'<b>The board sits over O1, Oz and O2</b>, at the back of the head, held by the head band.',
  rows:['p7','p8','p11','p12'], controls:['eyes'], readout:'alpha', with:['cloud.pieeg.com','Band powers in pieeg.js','getRelaxationIndex()']},
 {id:'ssvep', title:'Look to select (SSVEP)', short:'Steady-state visual responses', sig:'EEG', view:'head',
  lead:'Look at something flickering at a steady rate and the visual cortex echoes that exact frequency. Give each on-screen option its own rate, find the peak in the spectrum, and you know what the person is looking at.',
  cap:'<b>Over the visual cortex</b> is exactly where steady-state responses are strongest.',
  rows:['p7','p8','p11','p12'], controls:['look'], readout:'ssvep', with:['FFT in pieeg.js','Your own stimulus page']},
 {id:'browser', title:'Straight into a browser', short:'cloud.pieeg.com, no install', sig:'EEG', view:'head',
  lead:'Open cloud.pieeg.com, press Connect on the Octopus 16 card and pick your board. The browser decodes the 16 channels, filters them and shows spectra and maps. Nothing to install.',
  cap:'<b>All sixteen pins</b> stream into the tab at 250 Hz.',
  rows:['p3','p7','p11','p15'], controls:['connect'], readout:'browser', with:['cloud.pieeg.com','Chrome or Edge']},
 {id:'hdemg', title:'Muscle patch (HD-EMG)', short:'16 pins on one muscle', sig:'EMG', view:'arm',
  lead:'Press the board onto a muscle and the sixteen pins become a high-density EMG patch. Instead of one number per muscle, you see where inside the muscle the activity is, and how it spreads as you squeeze harder.',
  cap:'<b>One patch, sixteen points</b>, a few millimetres apart on the forearm.',
  rows:['e2','e7','e8','e14'], controls:['clench','wrist'], readout:'hdemg', with:['pieeg.js raw stream','Your own analysis']},
 {id:'dev', title:'Hack the stream', short:'Decode the Bluetooth packets', sig:'DEV', view:'head',
  lead:'The ESP32-S3 sends one 51-byte packet per sample: a start byte, a header byte, sixteen 24-bit channels and an end byte. Hover the bytes below to decode them, or pause and step through packets one at a time.',
  cap:'<b>Open firmware</b> on the ESP32-S3, flashed from the browser. Change it, rebuild it, make it yours.',
  rows:['p7','p8'], controls:['pause','step'], readout:'dev', with:['decodeAds131m08() in pieeg.js','Octopus 16 firmware']},
 {id:'record', title:'Record and analyse', short:'CSV in the browser, notebooks', sig:'EEG', view:'head',
  lead:'Press Record in the browser and the stream is saved as you go. Press Stop and the tab downloads a CSV in the same format as PiEEG Server, ready for the bundled Jupyter notebooks.',
  cap:'<b>All sixteen channels</b>, time-stamped, straight to a file on your computer.',
  rows:['p3','p7','p11','p15'], controls:['rec','eyes'], readout:'record', with:['Browser CSV recording','Jupyter notebooks']}
];
const CTL={
  eyes:{label:'Close eyes', on:'Eyes closed', toggle:'eyesT', key:'E'},
  look:{radio:'look', options:[['none','Look away','0'],['a','Look at A, 7.5 Hz','1'],['b','Look at B, 12 Hz','2'],['c','Look at C, 15 Hz','3']]},
  connect:{label:'Connect Octopus 16', key:'C'},
  disconnect:{label:'Disconnect', key:'D'},
  clench:{label:'Hold to clench', hold:true, key:'Space'},
  wrist:{label:'Flex the wrist', on:'Wrist flexed', toggle:'wristT', key:'W'},
  pause:{label:'Pause the stream', on:'Paused', toggle:'paused', key:'P'},
  step:{label:'Next packet', key:'N'},
  rec:{label:'Record', key:'R'}
};

/* =========================================================
   SIGNAL MODEL: 16 pins over the occipital cortex (or a muscle)
   ========================================================= */
const FS=125, WIN=4, N=FS*WIN;
const SSF={none:0,a:7.5,b:12,c:15};
const M={eyes:0,eyesT:0,look:'none',ssA:0,clench:0,clenchT:0,wrist:0,wristT:0,paused:0,ble:'idle',liveSince:null,rec:null,files:[],pkt:0};
let simT=0, head=0, acc=0;
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const R=rng(8), CH={};
PINS.forEach((p,i)=>{ const f=[],a=[],ph=[]; for(let q=0;q<5;q++){const fr=1+R()*26;f.push(fr);a.push(1/Math.pow(fr,.7));ph.push(R()*6.28);} const s=a.reduce((x,y)=>x+y,0); a.forEach((v,j)=>a[j]=v/s);
  const d=Math.hypot(p.x,p.y); CH['p'+(i+1)]={label:'Pin '+(i+1),f,a,ph,p0:R()*6.28,p1:R()*6.28,p2:R()*6.28,aw:.85+.15*(1-d/2.3)+ (R()-.5)*.1,sw:.8+.2*(1-d/2.3),buf:new Float32Array(N),col:'EEG'};
  CH['e'+(i+1)]={label:'Pin '+(i+1),x:p.x,y:p.y,buf:new Float32Array(N),col:'EMG',rms:0}; });
function stepSample(t){
  const k=1/FS;
  M.eyes+=(M.eyesT-M.eyes)*k*2.4; M.clench+=(M.clenchT-M.clench)*k*(M.clenchT>M.clench?8:5); M.wrist+=(M.wristT-M.wrist)*k*6;
  M.ssA+=((M.look==='none'?0:1)-M.ssA)*k*3;
  const f=SSF[M.look]||M.lastF||0; if(M.look!=='none') M.lastF=SSF[M.look];
  PINS.forEach((p,i)=>{ const c=CH['p'+(i+1)]; let bg=0; for(let q=0;q<5;q++) bg+=c.a[q]*Math.sin(6.283*c.f[q]*t+c.ph[q]);
    const al=(.22+1.35*M.eyes)*c.aw*(.8+.2*Math.sin(6.283*.29*t+c.p0))*Math.sin(6.283*10.2*t+c.p1);
    const ss=f? M.ssA*(1-M.eyes)*c.sw*(.55*Math.sin(6.283*f*t+c.p2)+.22*Math.sin(6.283*2*f*t+c.p2*2)) : 0;
    c.buf[head]=bg*.8+al+ss+(Math.random()-.5)*.1;
    // EMG: hotspot moves between two muscle regions
    const e=CH['e'+(i+1)]; const hx=M.wrist>.5?-.9:.5, hy=M.wrist>.5?1:-.4;
    const spread=.6+M.clench*1.2+M.wrist*.4; const w=Math.exp(-((p.x-hx)**2+(p.y-hy)**2)/(spread*spread));
    const act=Math.max(M.clench,M.wrist*.9)*w; const v=(Math.random()*2-1)*(.05+act*1.1); e.buf[head]=v; e.rms+=(Math.abs(v)*1.7-e.rms)*k*6; });
}
function advance(dt){ acc+=dt; while(acc>=1/FS){ acc-=1/FS; simT+=1/FS; head=(head+1)%N; stepSample(simT); } }
const pinAlpha=()=>PINS.map((_,i)=>clamp(.12+.8*M.eyes*CH['p'+(i+1)].aw+Math.sin(simT*1.3+i)*.02));
function spectrum(){ // Hann-windowed DFT of the last 2 s, averaged over four centre pins
  const L=250, out=[]; const ids=['p7','p8','p11','p12'];
  for(let f=4;f<=30.01;f+=.5){ let pw=0; for(const id of ids){ const b=CH[id].buf; let re=0,im=0; for(let n=0;n<L;n++){ const idx=(head-L+1+n+N)%N; const w=.5-.5*Math.cos(6.283*n/(L-1)); const v=b[idx]*w; const a=6.283*f*n/FS; re+=v*Math.cos(a); im-=v*Math.sin(a); } pw+=re*re+im*im; } out.push({f,p:pw/ids.length}); }
  return out; }

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
  const next=USES.find(u=>u.id===id); const prevView=U&&U.view; U=next;
  ROOT.querySelectorAll('#useList button').forEach(b=>{ const on=b.dataset.id===id; b.setAttribute('aria-selected',on); b.tabIndex=on?0:-1; });
  { const ul=$('#useList'), sel=ul.querySelector(`[data-id="${id}"]`); if(ul.scrollWidth>ul.clientWidth) ul.scrollLeft=sel.parentElement.offsetLeft-ul.clientWidth/2+sel.clientWidth/2; }
  ROOT.style.setProperty('--sig',COL[U.sig]);
  if(U.id!=='dev' && M.paused){ M.paused=0; }
  const body=$('#body');
  const apply=()=>{ const [x,y,w,h]=VIEWS[U.view].box; body.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);
    $('#mannequin').style.display=U.view==='head'?'none':''; $('#topHead').style.display=U.view==='head'?'':'none';
    placeElectrodes(U); body.classList.remove('swap'); };
  if(prevView!==U.view && !reduce){ body.classList.add('swap'); later(apply,200); } else apply();
  $('#bodyCap').innerHTML=U.cap;
  $('#demoSig').innerHTML=`<i></i>${U.sig==='DEV'?'Developers':U.sig}, ${U.view==='arm'?'16 pins on the forearm':'16 pins over the visual cortex'}`;
  $('#demoTitle').textContent=U.title; $('#demoLead').textContent=U.lead;
  $('#with').innerHTML='<span>Use it with</span>'+U.with.map(w=>`<span class="chip">${w}</span>`).join('');
  renderControls(); renderReadout(); sizeCanvas();
  history.replaceState&&history.replaceState(null,'','#'+U.id);
}
function ctlList(){
  if(U.id==='browser') return M.ble==='live'?['disconnect','eyes']:M.ble==='idle'?['connect']:[];
  if(U.id==='dev') return M.paused?['pause','step']:['pause'];
  return U.controls;
}
function renderControls(){
  const c=$('#controls'); c.innerHTML='';
  ctlList().forEach(k=>{ const d=CTL[k];
    if(d.radio){ d.options.forEach(([v,l,key])=>{ const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k; b.dataset.v=v;
      b.innerHTML=`${l} <span class="k">${key}</span>`; b.setAttribute('aria-pressed',M[d.radio]===v);
      b.addEventListener('click',()=>setRadio(d.radio,v)); c.appendChild(b); }); return; }
    const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k;
    const refresh=()=>{ let on=d.toggle?M[d.toggle]>0:false; let label=d.label;
      if(k==='rec'){ on=!!M.rec; label=M.rec?'Stop and download':'Record'; }
      if(d.toggle||k==='rec') b.setAttribute('aria-pressed',on); b.innerHTML=`${d.toggle&&on?d.on:label} <span class="k">${d.key}</span>`; };
    b.refresh=refresh; refresh();
    if(d.hold){ const down=e=>{ e.preventDefault(); M.clenchT=1; b.classList.add('held'); }, up=()=>{ M.clenchT=0; b.classList.remove('held'); };
      b.addEventListener('pointerdown',down); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,up));
      b.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); if(!e.repeat) down(e); } }); b.addEventListener('keyup',e=>{ if(e.key===' '||e.key==='Enter') up(); });
    } else b.addEventListener('click',()=>act(k));
    c.appendChild(b); });
}
function setRadio(g,v){ M[g]=v; ROOT.querySelectorAll(`.ctl[data-k="${g}"]`).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v)); if(U.readout==='ssvep') renderTargets(); }
function stamp(){ const d=new Date(),p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`; }
function act(k){ const d=CTL[k];
  if(d.toggle){ M[d.toggle]=M[d.toggle]?0:1; if(k==='pause'){ renderControls(); } }
  if(k==='step'){ M.pkt++; stepPacket(); }
  if(k==='connect'){ M.ble='picker'; renderControls(); renderReadout(); return; }
  if(k==='disconnect'){ M.ble='idle'; M.liveSince=null; M.eyesT=0; renderControls(); renderReadout(); return; }
  if(k==='rec'){ if(!M.rec){ M.rec={t0:simT,name:`pieeg_${stamp()}.csv`}; } else { const dur=simT-M.rec.t0; M.files.unshift({name:M.rec.name,dur,rows:Math.round(dur*250)}); M.files=M.files.slice(0,3); M.rec=null; } renderReadout(); }
  ROOT.querySelectorAll('.ctl').forEach(b=>b.refresh&&b.refresh());
}
function pair(){ M.ble='connecting'; renderReadout(); later(()=>{ if(M.ble!=='connecting') return; M.ble='live'; M.liveSince=simT; renderControls(); renderReadout(); },reduce?0:1100); }
on(document,'keydown',e=>{
  if(e.target.closest('input,textarea,.use-list,.tabs,.ctl,.picker,.cards,.installer') || e.metaKey||e.ctrlKey||e.altKey) return;
  const r=$('#useStage').getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
  const key=e.key===' '?'Space':e.key.length===1?e.key.toUpperCase():e.key;
  for(const k of ctlList()){ const d=CTL[k];
    if(d.radio){ const o=d.options.find(o=>o[2]===key); if(o){ e.preventDefault(); setRadio(d.radio,o[0]); return; } continue; }
    if(d.key===key){ e.preventDefault(); if(d.hold){ if(!e.repeat){ M.clenchT=1; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.add('held'); } } else if(!e.repeat) act(k); return; } }
});
on(document,'keyup',e=>{ if(e.key===' ' && U.controls.includes('clench')){ M.clenchT=0; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.remove('held'); } });

function pinMapSVG(id){ let h=`<svg class="pinmap" id="${id}" viewBox="-60 -60 120 120"><circle r="56" fill="#0b0c0e" stroke="rgba(255,255,255,.2)"/>`;
  PINS.forEach((p,i)=>{ h+=`<circle class="pm" cx="${p.x*24}" cy="${p.y*21}" r="9.5" fill="var(--sig)" fill-opacity=".2" stroke="#f3c77a" stroke-width="1"/><text x="${p.x*24}" y="${p.y*21+3.5}" text-anchor="middle" style="font-size:8px;font-weight:600" fill="#0b0c0e">${i+1}</text>`; });
  return h+'</svg>'; }
function renderTargets(){ const t=$('#targets'); if(!t) return; t.querySelectorAll('.tg').forEach(x=>x.classList.toggle('on',x.dataset.v===M.look)); }
function renderReadout(){
  const r=$('#readout'), k=U.readout;
  if(k==='alpha') r.innerHTML=`<div class="row-flex">${pinMapSVG('pm1')}<div style="flex:1;min-width:200px"><div class="meter"><div class="lab">Relaxation<b id="ro1">0.00</b></div><div class="track"><div class="fill" id="rf1"></div></div></div><p class="muted" id="ro2" style="margin-top:10px">Alpha power per pin. Close your eyes.</p></div></div>`;
  if(k==='ssvep') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div class="targets" id="targets">${[['a','A','7.5 Hz'],['b','B','12 Hz'],['c','C','15 Hz']].map(([v,l,f])=>`<div class="tg" data-v="${v}"><b>${l}</b><span>${f}</span></div>`).join('')}</div>
    <div style="flex:1;min-width:230px"><canvas id="spec" height="120"></canvas><div class="muted" style="margin-top:6px">Decoded: <b id="dec" style="color:var(--text)">nothing</b></div></div></div>
    <p class="muted" style="margin:8px 0 0">The targets here don’t flash. A real SSVEP page flickers each one at its rate.</p>`;
  if(k==='hdemg') r.innerHTML=`<div class="row-flex">${pinMapSVG('pm2')}<div style="flex:1;min-width:200px"><div class="meter"><div class="lab">Activity<b id="ro1">0.00</b></div><div class="track"><div class="fill" id="rf1"></div></div></div><p class="muted" id="ro2" style="margin-top:10px">Squeeze, or flex the wrist, and watch where in the patch it happens.</p></div></div>`;
  if(k==='dev'){ r.innerHTML=`<div class="packet" id="packet"></div><div class="pk-legend"><span><i style="background:#626973"></i>Start and end, 0xA0 and 0xC0</span><span><i style="background:#8b7bd8"></i>Header byte, skipped</span><span><i style="background:var(--sig)"></i>16 channels × 3 bytes</span></div><p class="muted" id="decode" style="margin:8px 0 0">Hover a channel to decode it.</p>`; stepPacket(); }
  if(k==='record') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div><div class="muted">${M.rec?'Recording':'Not recording'}</div><div class="big" id="recT" style="font-size:34px">${M.rec?'0.0 s':'–'}</div></div>
    <div style="flex:1;min-width:220px"><div class="muted">Downloads</div><div class="markers" id="files">${M.files.length?M.files.map(f=>`${f.name}  ${f.dur.toFixed(1)} s, ${f.rows} rows`).join('<br>'):'Nothing saved yet.'}</div>
    <div class="muted" style="margin-top:10px">Then open it in the notebooks: 01 load and plot, 02 detect blinks, 03 band power and alpha, 04 export features for ML.</div></div></div>`;
  if(k==='browser'){
    const st=M.ble; let body='';
    const cards=[['IronBCI','8 ch, 250 Hz, Wireless'],['IronBCI-16','16 ch, 250 Hz, Wireless'],['PiEEG XR','8 ch, 250 Hz, Wireless'],['Octopus 16','16 ch, 250 Hz, ESP32'],['IronBCI-32','32 ch, 500 Hz, USB']];
    if(st==='idle') body=`<div class="cards">${cards.map(([n,m])=>`<div class="dcard ${n==='Octopus 16'?'hl':''}"><b>${n}</b><span>${m}</span><button class="mini" data-n="${n}">Connect</button></div>`).join('')}</div><div class="bnote" id="bnote"></div>`;
    if(st==='picker') body=`<div class="picker"><b>cloud.pieeg.com wants to pair</b><div class="dev on"><span>Octopus-16-A3F2</span><i class="bars"><i></i><i></i><i></i></i></div><div class="dev"><span>Unknown or unsupported device</span></div><div class="pk-btns"><button class="ctl" id="bCancel">Cancel</button><button class="ctl primary" id="bPair">Pair</button></div></div>`;
    if(st==='connecting') body=`<div class="lobby"><span class="spin"></span><b>Connecting to Octopus 16</b><span>Subscribing to the data stream…</span></div>`;
    if(st==='live') body=`<div class="lobby live"><b>Streaming 16 channels at 250 Hz</b><span>Filters: Hampel spike removal, 1 to 40 Hz band-pass</span></div>`;
    r.innerHTML=`<div class="browser"><div class="bbar"><i></i><i></i><i></i><span class="url">https://cloud.pieeg.com</span>${st==='live'?'<span class="badge">Bluetooth: Octopus 16</span>':''}</div><div class="bbody">${body}</div></div>`;
    r.querySelectorAll('.mini').forEach(b=>b.addEventListener('click',()=>{ if(b.dataset.n==='Octopus 16') act('connect'); else $('#bnote').textContent=`This demo is for Octopus 16. ${b.dataset.n} has its own page.`; }));
    $('#bCancel')?.addEventListener('click',()=>{ M.ble='idle'; renderControls(); renderReadout(); });
    $('#bPair')?.addEventListener('click',pair);
  }
}
/* packet inspector */
const UV_SCALE=(1.2/4.0/8388607)*1e6;
function stepPacket(){
  const el=$('#packet'); if(!el) return;
  const hex=n=>n.toString(16).toUpperCase().padStart(2,'0');
  const idx=head; const bytes=[0xA0, M.pkt&0xFF]; const vals=[];
  for(let c=0;c<16;c++){ const uv=CH['p'+(c+1)].buf[idx]*22; let raw=Math.round(uv/UV_SCALE); vals.push({uv,raw}); if(raw<0) raw+=0x1000000; bytes.push((raw>>16)&255,(raw>>8)&255,raw&255); }
  bytes.push(0xC0);
  let h=''; bytes.forEach((b,i)=>{ const ch=i>=2&&i<50?Math.floor((i-2)/3):-1; const cls=i===0||i===50?'se':i===1?'hd':'ch'+(ch%2?' odd':'');
    h+=`<span class="b ${cls}" data-ch="${ch}" data-i="${i}">${hex(b)}</span>`; });
  el.innerHTML=h; el.dataset.vals=JSON.stringify(vals);
  el.querySelectorAll('.b').forEach(s=>s.addEventListener('pointerenter',()=>{ const ch=+s.dataset.ch; el.querySelectorAll('.b').forEach(x=>x.classList.toggle('on',ch>=0&&+x.dataset.ch===ch));
    const d=$('#decode'); const i=+s.dataset.i;
    if(ch<0) d.innerHTML = i===0?'<b>0xA0</b> marks the start of a packet.': i===50?'<b>0xC0</b> marks the end. The decoder checks both, so a misaligned packet is skipped.':'<b>Byte 1</b> is skipped by the decoder. Channel data starts at byte 2.';
    else { const v=JSON.parse(el.dataset.vals)[ch]; const b3=[...el.querySelectorAll(`.b[data-ch="${ch}"]`)].map(x=>'0x'+x.textContent).join(' ');
      d.innerHTML=`<b>Channel ${ch+1}</b>: ${b3} → ${v.raw} LSB × ${UV_SCALE.toFixed(4)} µV = <b>${(v.raw*UV_SCALE).toFixed(2)} µV</b>`; } }));
}
let lastRO=0, lastPkt=0;
function updateReadout(now){
  if(U.readout==='ssvep') drawSpec();
  if(U.readout==='dev' && !M.paused && now-lastPkt>350){ lastPkt=now; M.pkt++; if(!$('#packet .b.on')) stepPacket(); }
  if(now-lastRO<90) return; lastRO=now;
  const k=U.readout;
  if(k==='alpha'){ const v=pinAlpha(); ROOT.querySelectorAll('#pm1 .pm').forEach((c,i)=>c.setAttribute('fill-opacity',.12+v[i]*.88)); bodyPinEls.forEach((c,i)=>c.setAttribute('fill-opacity',.25+v[i]*.75));
    const rl=clamp(.1+.85*M.eyes+Math.sin(simT)*.02); $('#ro1').textContent=rl.toFixed(2); $('#rf1').style.width=rl*100+'%';
    $('#ro2').textContent = M.eyes>.5?'Alpha is up across the whole patch, strongest near the middle pins.':'Alpha power per pin. Close your eyes.'; }
  if(k==='hdemg'){ const v=PINS.map((_,i)=>clamp(CH['e'+(i+1)].rms)); ROOT.querySelectorAll('#pm2 .pm').forEach((c,i)=>c.setAttribute('fill-opacity',.1+v[i]*.9)); bodyPinEls.forEach((c,i)=>c.setAttribute('fill-opacity',.25+v[i]*.75));
    const m=Math.max(...v); $('#ro1').textContent=m.toFixed(2); $('#rf1').style.width=m*100+'%';
    $('#ro2').textContent = m<.15?'Squeeze, or flex the wrist, and watch where in the patch it happens.': M.wrist>.5&&M.clench<.3?'Wrist flexion: activity sits in the upper left of the patch.':'Grip: activity centres lower right and spreads as you squeeze.'; }
  if(k==='record' && M.rec){ $('#recT').textContent=(simT-M.rec.t0).toFixed(1)+' s'; }
}
let specCache=null, lastSpec=0;
function drawSpec(){
  const cvs=$('#spec'); if(!cvs) return; const now=performance.now(); if(now-lastSpec<150 && specCache) return; lastSpec=now;
  const d=Math.min(2,devicePixelRatio||1), W=cvs.clientWidth, H=120; if(cvs.width!==W*d){ cvs.width=W*d; cvs.height=H*d; cvs.style.height=H+'px'; }
  const g=cvs.getContext('2d'); g.setTransform(d,0,0,d,0,0); g.clearRect(0,0,W,H);
  const sp=spectrum(); specCache=sp; const mx=Math.max(...sp.map(s=>s.p))*1.1||1;
  const X=f=>10+(W-44)*(f-4)/26, Y=p=>H-18-(H-28)*Math.sqrt(p/mx);
  g.strokeStyle='rgba(255,255,255,.08)'; [[7.5,'A'],[12,'B'],[15,'C']].forEach(([f,l])=>{ g.setLineDash([3,3]); g.beginPath(); g.moveTo(X(f),6); g.lineTo(X(f),H-18); g.stroke(); g.setLineDash([]); g.fillStyle='#8e96a0'; g.font='600 11px -apple-system, BlinkMacSystemFont, sans-serif'; g.fillText(l,X(f)+3,14); });
  g.beginPath(); sp.forEach((s,i)=>{ const x=X(s.f), y=Y(s.p); i?g.lineTo(x,y):g.moveTo(x,y); }); g.strokeStyle='#3fc8ff'; g.lineWidth=1.8; g.stroke();
  g.lineTo(X(30),H-18); g.lineTo(X(4),H-18); g.fillStyle='rgba(63,200,255,.12)'; g.fill();
  g.fillStyle='#626973'; g.font='10.5px -apple-system, BlinkMacSystemFont, sans-serif'; [5,10,15,20,25,30].forEach(f=>g.fillText(f+' Hz',X(f)-12,H-4));
  const score=f=>{ const a=sp.find(s=>Math.abs(s.f-f)<.01), b=sp.find(s=>Math.abs(s.f-2*f)<.01); return (a?a.p:0)+(b?b.p*.5:0); };
  const sc={a:score(7.5),b:score(12),c:score(15)}; const base=sp.reduce((a,s)=>a+s.p,0)/sp.length;
  const best=Object.entries(sc).sort((x,y)=>y[1]-x[1])[0];
  const dec = best[1] > base*5 ? {a:'A, 7.5 Hz',b:'B, 12 Hz',c:'C, 15 Hz'}[best[0]] : 'nothing';
  $('#dec').textContent=dec; ROOT.querySelectorAll('#targets .tg').forEach(t=>t.classList.toggle('dec',dec!=='nothing'&&t.dataset.v===best[0]));
}

/* ---------- canvas ---------- */
const cv=$('#demoCanvas'), ctx=cv.getContext('2d'); let CW=0,CHh=0,rowH=40;
function sizeCanvas(){ const n=U.rows.length; rowH=n>4?36:n>2?46:58; const d=Math.min(2,devicePixelRatio||1);
  CW=cv.clientWidth; CHh=n*rowH+14; cv.width=CW*d; cv.height=CHh*d; cv.style.height=CHh+'px'; ctx.setTransform(d,0,0,d,0,0); }
on(window,'resize',sizeCanvas);
function drawCanvas(){
  const labelW=CW<460?70:84, W=CW-labelW-12;
  ctx.clearRect(0,0,CW,CHh); ctx.strokeStyle='rgba(0,0,0,.055)'; ctx.lineWidth=1;
  for(let s=0;s<=WIN;s++){ const x=labelW+W*s/WIN; ctx.beginPath(); ctx.moveTo(x,6); ctx.lineTo(x,CHh-6); ctx.stroke(); }
  ctx.font='12.5px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif'; ctx.textBaseline='middle';
  let startX=labelW;
  if(U.id==='browser'){
    if(M.ble!=='live'){ U.rows.forEach((id,r)=>{ const y0=7+rowH*r+rowH/2; ctx.fillStyle='#6c737c'; ctx.fillText(CH[id].label,10,y0); ctx.strokeStyle='rgba(0,0,0,.1)'; ctx.beginPath(); ctx.moveTo(labelW,y0); ctx.lineTo(labelW+W,y0); ctx.stroke(); });
      ctx.fillStyle='#9aa2ad'; ctx.textAlign='center'; ctx.fillText(M.ble==='connecting'?'Connecting…':'No signal yet. Connect over Bluetooth.',labelW+W/2,CHh/2); ctx.textAlign='left'; return; }
    const age=simT-M.liveSince; if(age<WIN) startX=labelW+W*(1-age/WIN);
  }
  U.rows.forEach((id,r)=>{
    const c=CH[id], y0=7+rowH*r+rowH/2, amp=rowH*.42, col=U.sig==='DEV'?COL.EEG:COL[c.col];
    ctx.fillStyle='#6e6e73'; ctx.fillText(c.label,10,y0);
    if(startX>labelW){ ctx.strokeStyle='rgba(0,0,0,.1)'; ctx.beginPath(); ctx.moveTo(labelW,y0); ctx.lineTo(startX,y0); ctx.stroke(); }
    ctx.strokeStyle=col; ctx.globalAlpha=.95; ctx.lineWidth=1.3; ctx.beginPath(); let first=true;
    const step=Math.max(1,Math.floor(N/Math.min(N,W)));
    for(let i=0;i<N;i+=step){ const x=labelW+W*i/(N-1); if(x<startX) continue; const y=y0-clamp(c.buf[(head+1+i)%N],-1.6,1.6)*amp*.62; first?ctx.moveTo(x,y):ctx.lineTo(x,y); first=false; }
    ctx.stroke(); ctx.globalAlpha=1; });
  if(U.id==='record' && M.rec){ const age=simT-M.rec.t0; const x=age<WIN?labelW+W*(1-age/WIN):labelW; ctx.fillStyle='rgba(255,90,116,.07)'; ctx.fillRect(x,4,labelW+W-x,CHh-8); ctx.fillStyle='#ff5a74'; ctx.beginPath(); ctx.arc(CW-20,14,5,0,6.283); ctx.fill(); }
}

/* =========================================================
   HOW-TO WIDGETS
   ========================================================= */
function checklist(sel,step,progress){ const upd=()=>{ const all=[...ROOT.querySelectorAll(sel+' input')], n=all.filter(i=>i.checked).length;
  if(progress) $(progress).innerHTML = n===all.length ? '<b>Everything ready.</b> On to step 2.' : `<b>${n} of ${all.length}</b> ready`; $(step).classList.toggle('done',n===all.length); };
  ROOT.querySelectorAll(sel+' input').forEach(i=>i.addEventListener('change',upd)); upd(); }
checklist('#kit','#s1','#kitProgress'); checklist('#care','#s7');

// step 2: seat the XIAO + antenna (side view)
(function(){
  const s=$('#seat');
  s.innerHTML=`<ellipse cx="220" cy="186" rx="150" ry="14" fill="#0c0d0f"/><rect x="70" y="160" width="300" height="24" rx="4" fill="#17191d" stroke="rgba(255,255,255,.14)"/>
    ${Array.from({length:14},(_,i)=>`<rect x="${92+i*19}" y="184" width="7" height="36" fill="#d9a24a"/>`).join('')}
    <rect x="118" y="126" width="18" height="34" fill="#0c0d0f"/><rect x="304" y="126" width="18" height="34" fill="#0c0d0f"/>
    <text x="70" y="236" fill="#9aa2ad" style="font-size:13px">Octopus 16, socket headers on top, pins below</text>
    <g class="xiao"><rect x="112" y="60" width="216" height="12" rx="2" fill="#15171a" stroke="rgba(255,255,255,.2)"/>
      <rect x="150" y="30" width="140" height="30" rx="3" fill="#d7dce2"/><rect x="118" y="72" width="14" height="22" fill="#b89344"/><rect x="308" y="72" width="14" height="22" fill="#b89344"/>
      <rect x="96" y="56" width="22" height="14" rx="4" fill="#c7ccd2"/><text x="220" y="50" text-anchor="middle" fill="#2a2d31" style="font-size:12px;font-weight:800">XIAO ESP32-S3</text>
      <circle cx="300" cy="66" r="5" fill="#c9ced5" stroke="#8b93a1"/>
      <path class="ant" d="M300,66 C340,40 380,40 420,20" stroke="#15171a" stroke-width="3" fill="none" opacity="0"/><rect class="ant" x="410" y="8" width="44" height="18" rx="3" fill="#1d2025" stroke="rgba(255,255,255,.25)" opacity="0"/></g>
    <g id="seatArrow"><path d="M470,70 V120 M460,110 L470,122 L480,110" stroke="${ACC}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="470" y="58" text-anchor="middle" fill="${ACC}" style="font-size:13px;font-weight:600">Gently</text></g>`;
  let seated=false, ant=false; const upd=()=>{ s.classList.toggle('seated',seated); s.querySelectorAll('.ant').forEach(a=>a.setAttribute('opacity',ant?1:0)); $('#seatArrow').style.opacity=seated?0:1;
    $('#seatBtn').textContent=seated?'Lift it off again':'Seat the XIAO'; $('#antBtn').textContent=ant?'Antenna on':'Snap on the antenna'; $('#s2').classList.toggle('done',seated&&ant); };
  $('#seatBtn').addEventListener('click',()=>{ seated=!seated; upd(); }); $('#antBtn').addEventListener('click',()=>{ ant=!ant; upd(); });
})();

// step 3: firmware installer simulation
const FW={st:'idle',prog:0,boot:false,bootSeq:0,timer:null,fail:false};
function renderFW(){
  const el=$('#installer'); let h=`<div class="fw-card"><b class="fw-t">Octopus-16 Firmware</b><span class="fw-s">16-channel EEG over Bluetooth for cloud.pieeg.com</span>`;
  if(FW.st==='idle') h+=`<ol class="fw-steps"><li>Plug the XIAO ESP32-S3 in with a USB-C <b>data</b> cable.</li><li>Click Install.</li><li>Pick the serial port that appears, then wait about 30 seconds.</li></ol><button class="fw-btn" id="fwInstall">Install Octopus-16 Firmware</button>`;
  if(FW.st==='port') h+=`<div class="picker" style="margin-top:10px"><b>firmware.pieeg.com wants to connect to a serial port</b><div class="dev on"><span>USB JTAG/serial debug unit (COM5)</span></div><div class="pk-btns"><button class="ctl" id="fwCancel">Cancel</button><button class="ctl primary" id="fwConnect">Connect</button></div></div>`;
  if(FW.st==='flash') h+=`<div class="fw-prog"><div id="fwBar" style="width:${FW.prog}%"></div></div><span class="fw-s" id="fwTxt">${FW.prog<15?'Connecting to the ESP32-S3…':FW.prog<90?'Writing firmware… '+Math.round(FW.prog)+'%':'Verifying…'}</span>`;
  if(FW.st==='fail') h+=`<p class="verdict bad" style="margin-top:10px"><b>No port showed up.</b> Put the XIAO in download mode, then click Install again.</p><button class="fw-btn" id="fwInstall">Install Octopus-16 Firmware</button>`;
  if(FW.st==='done') h+=`<p class="verdict ok" style="margin-top:10px"><b>Installed.</b> Unplug the board and plug it back in once. It will appear over Bluetooth as <code>Octopus-16-A3F2</code>.</p><button class="fw-btn ghosty" id="fwAgain">Start again</button>`;
  h+=`<div class="fw-help"><b>If flashing fails or no port shows up</b><span>Hold BOOT, tap RESET, release BOOT, then click Install again.</span>
    <div class="fw-keys"><button class="key" id="kBoot" aria-pressed="false" title="Click to hold, click again to release">BOOT</button><button class="key" id="kReset">RESET</button><span class="fw-s" id="bootMsg">${FW.bootSeq===3?'Download mode. Click Install again.':'Try it: click BOOT to hold it, then tap RESET.'}</span></div>
    <label class="fw-fail"><input type="checkbox" id="fwFail" ${FW.fail?'checked':''}> Simulate a failed first try</label></div></div>`;
  el.innerHTML=h;
  $('#fwInstall')?.addEventListener('click',()=>{ if(FW.fail && FW.bootSeq!==3){ FW.st='fail'; renderFW(); return; } FW.st='port'; renderFW(); });
  $('#fwCancel')?.addEventListener('click',()=>{ FW.st='idle'; renderFW(); });
  $('#fwConnect')?.addEventListener('click',()=>{ FW.st='flash'; FW.prog=0; renderFW(); clearInterval(FW.timer);
    FW.timer=every(()=>{ FW.prog=Math.min(100,FW.prog+(reduce?100:2.2)); const b=$('#fwBar'); if(b) b.style.width=FW.prog+'%'; const t=$('#fwTxt'); if(t) t.textContent=FW.prog<15?'Connecting to the ESP32-S3…':FW.prog<90?'Writing firmware… '+Math.round(FW.prog)+'%':'Verifying…';
      if(FW.prog>=100){ clearInterval(FW.timer); FW.st='done'; $('#s3').classList.add('done'); renderFW(); } },100); });
  $('#fwAgain')?.addEventListener('click',()=>{ FW.st='idle'; FW.bootSeq=0; $('#s3').classList.remove('done'); renderFW(); });
  $('#fwFail').addEventListener('change',e=>{ FW.fail=e.target.checked; FW.bootSeq=0; if(FW.st==='fail') FW.st='idle'; renderFW(); });
  const boot=$('#kBoot'), rst=$('#kReset');
  boot.setAttribute('aria-pressed',FW.boot); boot.classList.toggle('down',FW.boot);
  boot.addEventListener('click',()=>{ FW.boot=!FW.boot; boot.setAttribute('aria-pressed',FW.boot); boot.classList.toggle('down',FW.boot); const m=$('#bootMsg');
    if(FW.boot){ FW.bootSeq=1; m.textContent='BOOT held. Now tap RESET.'; }
    else if(FW.bootSeq===2){ FW.bootSeq=3; m.textContent='Download mode. Click Install again.'; }
    else { FW.bootSeq=0; m.textContent='Released too early. Hold BOOT, tap RESET, then release.'; } });
  rst.addEventListener('click',()=>{ rst.classList.add('down'); later(()=>rst.classList.remove('down'),150); const m=$('#bootMsg');
    if(FW.boot && FW.bootSeq===1){ FW.bootSeq=2; m.textContent='Now release BOOT.'; } else if(!FW.boot){ m.textContent='That just restarted the board. Hold BOOT first.'; } });
}
renderFW();

// step 5: pin contact
const CT={q:[]};
function resetPins(){ const r=rng(Date.now()%9973); CT.q=PINS.map(()=>clamp(r()*.9)); renderContact(); }
function renderContact(){
  const s=$('#contactMap'); let h=`<circle r="100" fill="#0b0c0e" stroke="rgba(255,255,255,.2)"/>`;
  PINS.forEach((p,i)=>{ const q=CT.q[i]; const col=q>.66?'#45dd8b':q>.33?'#ffc34d':'#ff5a74';
    h+=`<circle cx="${p.x*42}" cy="${p.y*38}" r="16" fill="${col}" fill-opacity=".85" stroke="#f3c77a" stroke-width="1.2"/><text x="${p.x*42}" y="${p.y*38+4}" text-anchor="middle" style="font-size:11px;font-weight:700" fill="#0b0c0e">${i+1}</text>`; });
  s.innerHTML=h;
  const good=CT.q.filter(q=>q>.66).length; $('#goodPins').textContent=good;
  $('#contactNote').textContent = good>=15?'Good to go. Every pin is reading.' : good>=12?'Nearly there. A little more wiggling should finish it.' : 'Too many pins aren’t touching the skin yet.';
  $('#s5').classList.toggle('done',good>=15);
}
$('#tightBtn').addEventListener('click',()=>{ CT.q=CT.q.map(q=>clamp(q+.12+Math.random()*.08)); renderContact(); });
$('#wiggleBtn').addEventListener('click',()=>{ CT.q=CT.q.map(q=>q<.66&&Math.random()<.6?clamp(q+.35+Math.random()*.2):q); renderContact(); });
$('#resetPins').addEventListener('click',resetPins);
resetPins();

// step 6: code tabs
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const Cm=t=>`<span class="c">${esc(t)}</span>`;
const PAIR={
  'Browser':`${Cm('# Chrome or Edge, over HTTPS')}
open https://cloud.pieeg.com

${Cm('# Connect Your Device → Octopus 16 → Connect')}
${Cm('# pick Octopus-16-XXXX in the dialog, then Pair')}`,
  'JavaScript':esc(`<script src="https://cdn.jsdelivr.net/gh/pieeg-club/PiEEG-server@main/pieeg.js"><\/script>
<script>
  const eeg = new PiEEG();
  // Web Bluetooth needs a user gesture, so connect on click
  button.onclick = async () => {
    await eeg.connectBLE({ device: 'octopus-16' });   // 16 ch at 250 Hz
    eeg.onBandPowers((bands) => console.log(bands.Alpha));
  };
<\/script>`).replace(/&lt;\\\/script>/g,'&lt;/script>'),
  'Firmware':`${Cm('# flash from the browser, no toolchain needed')}
open https://firmware.pieeg.com

${Cm('# no port? hold BOOT, tap RESET, release BOOT, retry')}
${Cm('# after flashing: unplug and replug once')}`
};
(function(){ const t=$('#pairTabs'); Object.keys(PAIR).forEach((k,i)=>{ const b=document.createElement('button'); b.setAttribute('role','tab'); b.textContent=k;
  b.addEventListener('click',()=>{ t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b)); $('#code-pair').innerHTML=PAIR[k]; }); t.appendChild(b); if(!i) b.click(); }); })();
ROOT.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{
  const txt=b.dataset.text||$('#code-'+b.dataset.copy).innerText;
  try{ await navigator.clipboard.writeText(txt); b.textContent='Copied'; }catch(e){ b.textContent='Select and copy'; }
  later(()=>b.textContent='Copy',1400);
}));

/* =========================================================
   BOOT + LOOP
   ========================================================= */
drawBody(); renderList();
const start=(location.hash||'').slice(1);
selectUse(USES.some(u=>u.id===start)?start:'alpha');
if(USES.some(u=>u.id===start)) later(()=>$('#where').scrollIntoView(),50);
for(let i=0;i<N;i++) advance(1/FS);
let last=0, visible=true;
{ const io=new IntersectionObserver(es=>{ visible=es[0].isIntersecting; },{rootMargin:'100px'}); io.observe($('#useStage')); cleanups.push(()=>io.disconnect()); }
function frame(now){
  if(stopped) return;
  const dt=Math.min(.05,(now-(last||now))/1000); last=now;
  const frozen = U.id==='dev' && M.paused;
  if(!frozen){ if(!reduce) advance(dt); else if(Math.floor(now/250)!==Math.floor((now-dt*1000)/250)) advance(.25); }
  if(visible){ drawCanvas(); updateReadout(now); }
  if(!stopped) rafId=requestAnimationFrame(frame);
}
if(!stopped) rafId=requestAnimationFrame(frame);


return () => {
  stopped = true;
  cancelAnimationFrame(rafId);
  timers.forEach((id) => clearTimeout(id));
  timers.clear();
  intervals.forEach((id) => clearInterval(id));
  intervals.clear();
  cleanups.forEach((fn) => fn());
  ROOT.innerHTML = PRISTINE;
};
}
