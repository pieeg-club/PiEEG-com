/* PiEEG-16 guide: interactive engine.
 * Converted from the original pieeg16-page.html. The drawing code is unchanged;
 * it is wrapped so React can mount it on the guide's root element and cleanly stop
 * it (animation frame, timers, window/document listeners) on unmount.
 * All images are embedded in this file and in pieeg16-guide.css (no public/ files needed).
 */
export function mountPieeg16StoreGuide(root) {
if (!root) return () => {};
const ROOT = root;
// Snapshot of the server-rendered markup, restored on cleanup so a re-mount
// (React Strict Mode in dev, or navigating back) starts from a clean slate.
const PRISTINE = ROOT.innerHTML;
let stopped = false;
let rafId = 0;
const timers = new Set();
const cleanups = [];
const later = (fn, ms) => {
  const id = setTimeout(() => { timers.delete(id); if (!stopped) fn(); }, ms);
  timers.add(id);
  return id;
};
const on = (target, type, fn, opts) => {
  target.addEventListener(type, fn, opts);
  cleanups.push(() => target.removeEventListener(type, fn, opts));
};

const $=s=>ROOT.querySelector(s);
const NS='http://www.w3.org/2000/svg';
const BOARD_PHOTO='/products/pieeg-16/guide-board.webp';
const COL={EEG:'#0071e3',EMG:'#ad6500',ECG:'#d72e50',EOG:'#8653bc'};
const ACC='#0071e3';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

/* =========================================================
   HERO BOARD: magenta PiEEG-16 on a Raspberry Pi
   ========================================================= */
(function drawBoard(){
  const s=$('#board');
  if(!s) return; // the store version has no hero drawing const ox=80, oy=70;
  const chip=(x,y,label)=>{ let c=`<g transform="translate(${x},${y})">`; for(let i=0;i<14;i++){ const p=4+i*5; c+=`<rect x="${p}" y="-6" width="2" height="6" fill="#cfd4da"/><rect x="${p}" y="72" width="2" height="6" fill="#cfd4da"/><rect x="-6" y="${p}" width="6" height="2" fill="#cfd4da"/><rect x="72" y="${p}" width="6" height="2" fill="#cfd4da"/>`; }
    return c+`<rect width="72" height="72" rx="3" fill="#18191c"/><circle cx="8" cy="8" r="2.6" fill="#2a2c30"/><text x="36" y="40" text-anchor="middle" fill="#8b919a" style="font-size:10px;font-weight:600">${label}</text></g>`; };
  const header=(x,y,n)=>`<rect x="${x}" y="${y}" width="24" height="${n*15.6+8}" rx="3" fill="#15161a"/>`+Array.from({length:n},(_,i)=>`<rect class="epin" x="${x+9}" y="${y+6+i*15.6}" width="6" height="6" fill="#e3c15f"/>`).join('');
  let h=`<image x="80" y="64" width="560" height="374" preserveAspectRatio="xMidYMid meet" href="${BOARD_PHOTO}"/>`;
  const call=(tx,ty,px,py,main,sub,anchor='start')=>`
    <text x="${tx}" y="${ty}" text-anchor="${anchor}"><tspan x="${tx}" fill="#1d1d1f" style="font-size:14px;font-weight:600">${main}</tspan><tspan x="${tx}" dy="17" fill="#9aa2ad" style="font-size:12.5px">${sub}</tspan></text>`;
  const callAt=(tx,ty,px,py,main,sub)=>`<text x="${tx}" y="${ty}"><tspan x="${tx}" fill="#1d1d1f" style="font-size:14px;font-weight:600">${main}</tspan><tspan x="${tx}" dy="17" fill="#9aa2ad" style="font-size:12.5px">${sub}</tspan></text>`;
  h+=call(ox+196,24,ox+196,oy+26,'40-pin GPIO header','SPI to the Raspberry Pi','middle');
  h+=callAt(20,478,ox+26,oy+246,'Header, chip 1','Left edge');
  h+=call(ox+210,478,ox+210,oy+270,'2 × ADS1299','Daisy-chained, 16 channels','middle');
  h+=callAt(ox+372-12,478,ox+372,oy+246,'Header, chip 2','Right edge');
  s.innerHTML=h;
  if(!reduce) s.querySelectorAll('.epin').forEach((p,i)=>p.animate([{fill:'#e3c15f'},{fill:'#3fc8ff'},{fill:'#e3c15f'}],{duration:900,delay:500+i*70,easing:'ease-in-out'}));
})();

/* =========================================================
   GEOMETRY
   ========================================================= */
const ARM_R='M252,300 C226,298 208,312 204,338 C198,380 192,410 190,440 C186,480 181,522 177,566 L205,568 C208,530 214,490 218,452 C222,420 230,390 236,356 Z';
const HAND_R='M177,564 C170,584 172,606 182,617 C192,623 205,616 207,600 C209,588 207,576 205,566 Z';
const mirror=d=>d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g,(m,x,y)=>`${660-parseFloat(x)},${y}`);
const P1020={Fp1:[-.31,.95],Fp2:[.31,.95],F7:[-.81,.59],F3:[-.40,.53],F4:[.40,.53],F8:[.81,.59],T7:[-1,0],C3:[-.5,0],C4:[.5,0],T8:[1,0],P7:[-.81,-.59],P3:[-.40,-.53],P4:[.40,-.53],P8:[.81,-.59],O1:[-.31,-.95],O2:[.31,-.95]};
const MONT=Object.keys(P1020);
const TH={cx:1200,cy:235,R:150};
const topPos=n=>({x:TH.cx+P1020[n][0]*TH.R*.86, y:TH.cy-P1020[n][1]*TH.R*.86});
function frontPos(n){ const [tx,ty]=P1020[n]; const r=Math.hypot(tx,ty), phi=r*Math.PI/2, a=Math.atan2(-tx,ty);
  return {x:330+51*Math.sin(phi)*Math.sin(a), y:139-51*Math.cos(phi), front:Math.sin(phi)*Math.cos(a)}; }
function along(p,q,t,off){const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy);return{x:p[0]+dx*t+(-dy/L)*off,y:p[1]+dy*t+(dx/L)*off};}
const FORE=[[455,448],[470,560]];
const EMG16=[]; for(let r=0;r<8;r++) for(const c of [-7.5,7.5]) EMG16.push(along(FORE[0],FORE[1],.08+r*.11,c));
const EMG4=[]; for(let r=0;r<2;r++) for(const c of [-7.5,7.5]) EMG4.push(along(FORE[0],FORE[1],.2+r*.3,c));
const HYB_EEG=['F3','F4','C3','C4','T7','T8','P3','P4','O1','O2'];
const VIEWS={ head:{box:[1010,30,380,400]}, arm:{box:[318,292,304,320]}, full:{box:[112,44,440,463]} };
const REGIONS=[{name:'Frontal',ch:['Fp1','Fp2','F7','F3','F4','F8'],y0:-1,y1:.3},{name:'Central',ch:['T7','C3','C4','T8'],y0:.3,y1:-.3},{name:'Occipital',ch:['P7','P3','P4','P8','O1','O2'],y0:-.3,y1:-1}];

function drawBody(){
  $('#body').innerHTML=`<defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d323b"/><stop offset="1" stop-color="#181b20"/></linearGradient>
    <radialGradient id="skull" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#fafafb"/><stop offset="1" stop-color="#dfe2e8"/></radialGradient>
    <clipPath id="headClip"><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R}"/></clipPath>
  </defs>
  <g id="mannequin"><image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="/products/pieeg-16/guide-person.webp"/></g>
  <g id="topHead">
    <ellipse cx="${TH.cx-TH.R-6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/><ellipse cx="${TH.cx+TH.R+6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/>
    <path d="M${TH.cx-22},${TH.cy-TH.R+8} Q${TH.cx},${TH.cy-TH.R-34} ${TH.cx+22},${TH.cy-TH.R+8}" fill="#d2d2d7"/>
    <circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R}" fill="url(#skull)" stroke="#c5c5cb"/>
    <g id="regionLayer" clip-path="url(#headClip)"></g>
    <g fill="none" stroke="var(--sig)" stroke-opacity=".14"><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.43}"/><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.86}"/><path d="M${TH.cx},${TH.cy-TH.R} V${TH.cy+TH.R} M${TH.cx-TH.R},${TH.cy} H${TH.cx+TH.R}"/></g>
    <text x="${TH.cx}" y="${TH.cy-TH.R-34}" text-anchor="middle" fill="#626973" style="font-size:12px">Nose</text>
  </g>
  <g id="bodyEls"></g>`;
}
const diamond=(x,y,dot,k=1)=>{ const d=8*k; return `<path d="M${x},${y-d} L${x+d},${y} L${x},${y+d} L${x-d},${y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="${1.6*k}"/>${dot?`<circle cx="${x}" cy="${y}" r="${2.4*k}" fill="#e8ebef"/>`:''}`; };
function placeElectrodes(u){
  const g=$('#bodyEls'); const c=COL[u.sig]; let h='';
  const dot=(x,y,hot,label,col=c,k=1)=>`<g opacity="${hot?1:.4}">
      ${hot&&!reduce?`<circle cx="${x}" cy="${y}" r="${9*k}" fill="none" stroke="${col}" stroke-width="${1.4*k}"><animate attributeName="r" values="${8*k};${16*k}" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.8s" repeatCount="indefinite"/></circle>`:''}
      <circle cx="${x}" cy="${y}" r="${8*k}" fill="#12151a" stroke="${col}" stroke-width="${1.9*k}"/><circle cx="${x}" cy="${y}" r="${3.2*k}" fill="${hot?col:'#aeb6c0'}"/>
      ${label?`<text x="${x}" y="${y+21*k}" text-anchor="middle" fill="${hot?'#1d1d1f':'#76767c'}" style="font-size:${12*k}px;font-weight:${hot?600:500}">${label}</text>`:''}</g>`;
  $('#regionLayer').innerHTML='';
  if(u.view==='head'){
    if(u.regions){ const cols=['#3fc8ff','#7fe0c2','#b690ff']; $('#regionLayer').innerHTML=REGIONS.map((r,i)=>{ const y0=TH.cy-r.y0*TH.R*-1, y1=TH.cy-r.y1*TH.R; const top=TH.cy-(i===0?1:i===1?.3:-.3)*TH.R, bot=TH.cy-(i===0?.3:i===1?-.3:-1)*TH.R;
      return `<rect x="${TH.cx-TH.R}" y="${top}" width="${TH.R*2}" height="${bot-top}" fill="${cols[i]}" opacity=".09"/>`; }).join('')
      +`<path d="M${TH.cx-TH.R},${TH.cy-.3*TH.R} H${TH.cx+TH.R} M${TH.cx-TH.R},${TH.cy+.3*TH.R} H${TH.cx+TH.R}" stroke="rgba(255,255,255,.18)" stroke-dasharray="3 4"/>`; }
    if(u.regions){ const cols=['#3fc8ff','#7fe0c2','#b690ff']; [[-.64,'Frontal'],[-.12,'Central'],[.66,'Occipital']].forEach(([f,n],i)=>h+=`<text x="${TH.cx}" y="${TH.cy+f*TH.R+4}" text-anchor="middle" fill="${cols[i]}" style="font-size:12.5px;font-weight:700">${n}</text>`); }
    MONT.forEach(n=>{ const p=topPos(n); h+=dot(p.x,p.y,u.hot.includes(n),n,c,.92); });
    h+=diamond(TH.cx-TH.R-6,TH.cy+10,false)+`<text x="${TH.cx-TH.R-6}" y="${TH.cy-20}" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">REF</text><text x="${TH.cx-TH.R-6}" y="${TH.cy+48}" text-anchor="middle" fill="#626973" style="font-size:11.5px">left ear</text>`;
    h+=diamond(TH.cx+TH.R+6,TH.cy+10,true)+`<text x="${TH.cx+TH.R+6}" y="${TH.cy-20}" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">BIAS</text><text x="${TH.cx+TH.R+6}" y="${TH.cy+48}" text-anchor="middle" fill="#626973" style="font-size:11.5px">right ear</text>`;
  } else if(u.view==='arm'){
    EMG16.forEach((p,i)=>{ h+=`<circle class="g16" data-i="${i}" cx="${p.x}" cy="${p.y}" r="5" fill="#12151a" stroke="${c}" stroke-width="1.5"/><circle class="g16c" data-i="${i}" cx="${p.x}" cy="${p.y}" r="2.1" fill="${c}"/>`; });
    const y0=EMG16[0].y-2, y1=EMG16[15].y+2;
    h+=`<path d="M424,${y0} L440,${y0} M424,${y1} L440,${y1} M424,${y0} V${y1}" stroke="#a1a1a6" fill="none"/>
      <text x="418" y="${(y0+y1)/2}" text-anchor="end" fill="#1d1d1f" style="font-size:12.5px;font-weight:600">16 channels</text>
      <text x="418" y="${(y0+y1)/2+16}" text-anchor="end" fill="#8e96a0" style="font-size:11.5px">in 2 rows</text>`;
    h+=diamond(478,440,false)+`<text x="492" y="444" fill="#515154" style="font-size:12px;font-weight:600">REF, elbow</text>`;
    h+=diamond(478,582,true)+`<text x="492" y="586" fill="#515154" style="font-size:12px;font-weight:600">BIAS, wrist</text>`;
  } else {
    const k=.72;
    HYB_EEG.forEach(n=>{ const p=frontPos(n); if(p.front>-.03) h+=dot(p.x,p.y,true,'',COL.EEG,k); });
    [[345,140],[345,168]].forEach(([x,y])=>h+=dot(x,y,true,'',COL.EOG,k));
    EMG4.forEach(p=>h+=dot(p.x,p.y,true,'',COL.EMG,k));
    h+=diamond(287,177,false,k)+diamond(373,177,true,k);
    const lab=(x,y,t,s,col,anchor='start')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${col}" style="font-size:13px;font-weight:600">${t}</text><text x="${x}" y="${y+15}" text-anchor="${anchor}" fill="#8e96a0" style="font-size:11.5px">${s}</text>`;
    h+=`<path d="M258,104 L200,104" stroke="#a1a1a6"/>`+lab(196,100,'EEG','CH1 to CH10','#3fc8ff','end');
    h+=`<path d="M351,154 L420,150" stroke="#a1a1a6"/>`+lab(424,146,'EOG','CH11, CH12','#b690ff');
    h+=`<path d="M440,478 L420,478" stroke="#a1a1a6"/>`+lab(416,474,'EMG','CH13 to CH16','#ffae42','end');
  }
  g.innerHTML=h;
}

/* =========================================================
   USE CASES
   ========================================================= */
const USES=[
 {id:'maps', title:'Live brain maps', short:'16-point topography', sig:'EEG', view:'head', hot:MONT,
  lead:'With sixteen points on the scalp you can see where activity is, not just how much. Close your eyes and alpha lights up the back of the head; do mental arithmetic and beta spreads over the front.',
  cap:'<b>Sixteen positions</b> cover frontal, temporal, central, parietal and occipital areas of both hemispheres.',
  rows:['O1','O2','F3','F4'], controls:['eyes','math'], readout:'maps', with:['Dashboard topographic map','3D and 2D views','Placement editor']},
 {id:'mi', title:'Motor imagery', short:'Think left, think right', sig:'EEG', view:'head', hot:['C3','C4','T7','T8'],
  lead:'Imagine moving your left hand and the mu rhythm over the right motor cortex fades; imagine the right hand and it fades on the left. Compare C3 with C4 and you can steer a cursor with thought alone.',
  cap:'<b>C3 and C4</b> sit over the hand areas of the left and right motor cortex. Each side controls the opposite hand.',
  rows:['C3','C4','muC3','muC4'], controls:['mi'], readout:'mi', with:['LSL to OpenViBE or BCI2000','WebSocket stream in Python']},
 {id:'hybrid', title:'Brain, eyes and muscles at once', short:'One board, three streams', sig:'EEG', view:'full',
  lead:'Sixteen channels are enough to split one board: ten for EEG, two for eye movements, four for muscle. LSL channel groups publish each as its own stream, so your analysis tools see three clean devices.',
  cap:'<span style="color:#3fc8ff"><b>EEG</b></span> on the scalp, <span style="color:#b690ff"><b>EOG</b></span> above and below the eye, <span style="color:#ffae42"><b>EMG</b></span> on the forearm. One reference and bias for all.',
  rows:['F3','C3','VU','VD','E1','E2'], controls:['blink','clench'], readout:'hybrid', with:['LSL channel groups','lsl_groups_set','--osc-regions-setup']},
 {id:'gesture', title:'Gesture recognition', short:'16-channel forearm EMG', sig:'EMG', view:'arm',
  lead:'Each hand gesture uses a different mix of forearm muscles. With sixteen electrodes around the forearm, every gesture leaves its own pattern, and a simple classifier can tell a fist from a point.',
  cap:'<b>Sixteen electrodes</b> in two rows around the forearm. The pattern across them tells gestures apart.',
  rows:['G1','G2','G5','G6','G9','G10'], controls:['gest'], readout:'gesture', with:['WebSocket stream','Notebook 04: export features for ML']},
 {id:'vr', title:'VR avatars by brain region', short:'Per-region OSC parameters', sig:'EEG', view:'head', hot:MONT, regions:true,
  lead:'Group the sixteen channels into regions and PiEEG Server sends each region’s band powers as separate avatar parameters. Frontal focus can drive one expression while occipital alpha drives another.',
  cap:'<b>Three regions</b>, set up once with the regions wizard. Each gets its own set of parameters in VRChat.',
  rows:['F3','O1'], controls:['eyes','math'], readout:'vr', with:['--osc-regions-setup','pieeg-server --osc','PiEEG Unity plugin']},
 {id:'research', title:'Research and teaching', short:'LSL, CSV, notebooks', sig:'EEG', view:'head', hot:MONT,
  lead:'Stream all sixteen channels to Lab Streaming Layer for OpenViBE, MNE, BCI2000 or LabRecorder. Record sessions to CSV with event markers and analyse them in the bundled notebooks.',
  cap:'<b>All sixteen channels</b> at 250 samples per second, time-stamped and ready for analysis.',
  rows:MONT, controls:['marker','eyes'], readout:'research', with:['--lsl outlet','CSV with annotations','Jupyter notebooks']}
];
const CTL={
  eyes:{label:'Close eyes', on:'Eyes closed', toggle:'eyesT', key:'E'},
  math:{label:'Do mental math', on:'Doing mental math', toggle:'mathT', key:'M'},
  blink:{label:'Blink', key:'B'},
  clench:{label:'Hold to clench', hold:true, key:'Space'},
  marker:{label:'Add event marker', key:'K'},
  mi:{radio:'mi', options:[['rest','Rest','R'],['left','Imagine left hand','←'],['right','Imagine right hand','→']]},
  gest:{radio:'gest', options:[['rest','Rest','R'],['fist','Make a fist','F'],['point','Point','P'],['open','Open hand','O']]}
};

/* =========================================================
   SIGNAL MODEL
   ========================================================= */
const FS=125, WIN=4, N=FS*WIN;
const M={eyes:0,eyesT:0,math:0,mathT:0,clench:0,clenchT:0,supC3:0,supC4:0,mi:'rest',gest:'rest',
  blinks:[],nextBlink:2.5,blinkCount:0,env:0,marks:[],gAct:new Float32Array(16),gRms:new Float32Array(16),evEOG:0,evEMG:0,muC3:.5,muC4:.5};
let simT=0, head=0, acc=0;
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const R=rng(16), CH={};
const d2=(a,b)=>{ const p=P1020[a],q=P1020[b]; return (p[0]-q[0])**2+(p[1]-q[1])**2; };
MONT.forEach(n=>{ const [x,y]=P1020[n]; const f=[],a=[],p=[]; for(let q=0;q<5;q++){const fr=1+R()*26;f.push(fr);a.push(1/Math.pow(fr,.7));p.push(R()*6.28);} const s=a.reduce((u,v)=>u+v,0); a.forEach((v,i)=>a[i]=v/s);
  CH[n]={type:'eeg',label:n,f,a,p,p0:R()*6.28,p1:R()*6.28,p2:R()*6.28,p3:R()*6.28,pm:R()*6.28,
    occ:clamp(.12-y*.9), fr:clamp(.35+y*.7), bw:y>.8?1:y>.45?.35:.03, w3:Math.exp(-d2(n,'C3')/.09), w4:Math.exp(-d2(n,'C4')/.09), buf:new Float32Array(N), col:'EEG'}; });
CH.muC3={type:'pow',label:'Mu power C3',buf:new Float32Array(N),col:'EEG'}; CH.muC4={type:'pow',label:'Mu power C4',buf:new Float32Array(N),col:'EEG'};
CH.VU={type:'eog',label:'EOG above',buf:new Float32Array(N),col:'EOG'}; CH.VD={type:'eog',label:'EOG below',buf:new Float32Array(N),col:'EOG'};
for(let i=1;i<=4;i++) CH['E'+i]={type:'emg',label:'EMG '+i,gain:.7+R()*.3,p0:R()*6.28,buf:new Float32Array(N),col:'EMG'};
for(let i=1;i<=16;i++) CH['G'+i]={type:'emg',label:'Forearm '+i,buf:new Float32Array(N),col:'EMG'};
const GT={rest:new Array(16).fill(0),
  fist:Array.from({length:16},(_,i)=>i%2===0?.95:.5),
  point:Array.from({length:16},(_,i)=>{ const r=i>>1; return i%2===1 && r>=2 && r<=5 ? .95 : .18; }),
  open:Array.from({length:16},(_,i)=>i%2===1?.88:.22)};
function stepSample(t){
  const k=1/FS;
  M.eyes+=(M.eyesT-M.eyes)*k*2.2; M.math+=(M.mathT-M.math)*k*1.8; M.clench+=(M.clenchT-M.clench)*k*(M.clenchT>M.clench?9:6);
  M.supC3+=((M.mi==='right'?.72:0)-M.supC3)*k*1.6; M.supC4+=((M.mi==='left'?.72:0)-M.supC4)*k*1.6;
  const tgt=GT[M.gest]; for(let i=0;i<16;i++) M.gAct[i]+=(tgt[i]-M.gAct[i])*k*8;
  if(t>M.nextBlink && M.eyesT<.5){ M.blinks.push({t,counted:false}); M.nextBlink=t+4+Math.random()*4.5; }
  if(M.blinks.length>12) M.blinks.shift();
  for(const b of M.blinks) if(!b.counted && t-b.t>.22){ b.counted=true; M.blinkCount++; M.evEOG=performance.now(); }
  let bl=0; for(const b of M.blinks){ const z=(t-b.t-.12)/.085; if(z>-4&&z<4) bl+=Math.exp(-z*z); }
  for(const n of MONT){ const c=CH[n]; let bg=0; for(let q=0;q<5;q++) bg+=c.a[q]*Math.sin(6.283*c.f[q]*t+c.p[q]);
    const al=(.18+1.2*M.eyes*c.occ)*(.78+.22*Math.sin(6.283*.31*t+c.p0))*Math.sin(6.283*10.2*t+c.p1);
    const be=(.08+.5*M.math*c.fr)*(Math.sin(6.283*18.7*t+c.p2)*.6+Math.sin(6.283*23.9*t+c.p3)*.4);
    const muA=.85*(c.w3*(1-M.supC3)+c.w4*(1-M.supC4));
    const s=Math.sin(6.283*10.6*t+c.pm); const mu=muA*(s+.35*Math.sin(2*(6.283*10.6*t+c.pm))); // arch-shaped mu
    c.buf[head]=bg*.75+al+be+mu+bl*c.bw*2.1+(Math.random()-.5)*.08; }
  M.muC3+=((.15+.75*(1-M.supC3))-M.muC3)*k*3; M.muC4+=((.15+.75*(1-M.supC4))-M.muC4)*k*3;
  CH.muC3.buf[head]=M.muC3+(Math.random()-.5)*.03; CH.muC4.buf[head]=M.muC4+(Math.random()-.5)*.03;
  const nz=()=>(Math.random()-.5)*.05;
  CH.VU.buf[head]=bl*1.35+.05*Math.sin(t*.35)+nz(); CH.VD.buf[head]=-bl*.7+nz();
  let rect=0; for(let i=1;i<=4;i++){ const c=CH['E'+i]; const env=.05+M.clench*c.gain; const v=(Math.random()*2-1)*env*1.15; c.buf[head]=v; rect+=Math.abs(v); }
  M.env+=(rect/4*1.9-M.env)*k*7; if(M.env>.45) M.evEMG=performance.now();
  for(let i=0;i<16;i++){ const env=.05+M.gAct[i]; const v=(Math.random()*2-1)*env*1.1; CH['G'+(i+1)].buf[head]=v; M.gRms[i]+=(Math.abs(v)*1.7-M.gRms[i])*k*6; }
}
function advance(dt){ acc+=dt; while(acc>=1/FS){ acc-=1/FS; simT+=1/FS; head=(head+1)%N; stepSample(simT); } }
function chanPower(n,band){ const c=CH[n]; const w=Math.sin(simT*1.3+c.p0)*.03;
  if(band==='alpha') return clamp(.1+.8*M.eyes*c.occ+.25*(c.w3*(1-M.supC3)+c.w4*(1-M.supC4))*.6+w);
  return clamp(.08+.75*M.math*c.fr*c.fr+w); }
function bands(){ const w=Math.sin(simT*1.7)*.02;
  return {delta:clamp(.32+w), theta:clamp(.22+.12*M.eyes-.04*M.math), alpha:clamp(.1+.66*M.eyes-.05*M.math+w), beta:clamp(.12+.55*M.math-.05*M.eyes-w), gamma:clamp(.06+.32*M.math)}; }

/* =========================================================
   DEMO UI
   ========================================================= */
let U=USES[0], mapBand='alpha';
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
  const body=$('#body');
  const apply=()=>{ const [x,y,w,h]=VIEWS[U.view].box; body.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);
    $('#mannequin').style.display=U.view==='head'?'none':''; $('#topHead').style.display=U.view==='head'?'':'none';
    placeElectrodes(U); body.classList.remove('swap'); };
  if(prevView!==U.view && !reduce){ body.classList.add('swap'); later(apply,200); } else apply();
  $('#bodyCap').innerHTML=U.cap;
  const sigTxt = U.view==='head' ? (U.hot.length===16?'all 16 channels':U.hot.join(', ')) : U.view==='arm'?'16 channels on the forearm':'EEG, EOG and EMG on one board';
  $('#demoSig').innerHTML=`<i></i>${U.view==='full'?'':U.sig+', '}${sigTxt}`;
  $('#demoTitle').textContent=U.title; $('#demoLead').textContent=U.lead;
  $('#with').innerHTML='<span>Use it with</span>'+U.with.map(w=>`<span class="chip">${w}</span>`).join('');
  renderControls(); renderReadout(); sizeCanvas();
  history.replaceState&&history.replaceState(null,'','#'+U.id);
}
function renderControls(){
  const c=$('#controls'); c.innerHTML='';
  U.controls.forEach(k=>{ const d=CTL[k];
    if(d.radio){ d.options.forEach(([v,l,key])=>{ const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k; b.dataset.v=v;
      b.innerHTML=`${l} <span class="k">${key}</span>`; b.setAttribute('aria-pressed',M[d.radio]===v);
      b.addEventListener('click',()=>setRadio(d.radio,v)); c.appendChild(b); }); return; }
    const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k;
    const refresh=()=>{ const on=d.toggle?M[d.toggle]>0:false; if(d.toggle) b.setAttribute('aria-pressed',on); b.innerHTML=`${d.toggle&&on?d.on:d.label} <span class="k">${d.key}</span>`; };
    b.refresh=refresh; refresh();
    if(d.hold){ const down=e=>{ e.preventDefault(); M.clenchT=1; b.classList.add('held'); }, up=()=>{ M.clenchT=0; b.classList.remove('held'); };
      b.addEventListener('pointerdown',down); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,up));
      b.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); if(!e.repeat) down(e); } }); b.addEventListener('keyup',e=>{ if(e.key===' '||e.key==='Enter') up(); });
    } else b.addEventListener('click',()=>act(k));
    c.appendChild(b); });
}
function setRadio(group,v){ M[group]=v; ROOT.querySelectorAll(`.ctl[data-k="${group}"]`).forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v)); }
function act(k){ const d=CTL[k];
  if(d.toggle) M[d.toggle]=M[d.toggle]?0:1;
  if(k==='blink') M.blinks.push({t:simT,counted:false});
  if(k==='marker') M.marks.push({t:simT,n:M.marks.length+1});
  ROOT.querySelectorAll('.ctl').forEach(b=>b.refresh&&b.refresh()); }
on(document,'keydown',e=>{
  if(e.target.closest('input,textarea,.use-list,.tabs,.ctl,.bandseg') || e.metaKey||e.ctrlKey||e.altKey) return;
  const r=$('#useStage').getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
  const key=e.key===' '?'Space':e.key==='ArrowLeft'?'←':e.key==='ArrowRight'?'→':e.key.length===1?e.key.toUpperCase():e.key;
  for(const k of U.controls){ const d=CTL[k];
    if(d.radio){ const o=d.options.find(o=>o[2]===key); if(o){ e.preventDefault(); setRadio(d.radio,o[0]); return; } continue; }
    if(d.key===key){ e.preventDefault(); if(d.hold){ if(!e.repeat){ M.clenchT=1; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.add('held'); } } else if(!e.repeat) act(k); return; } }
});
on(document,'keyup',e=>{ if(e.key===' ' && U.controls.includes('clench')){ M.clenchT=0; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.remove('held'); } });

function renderReadout(){
  const r=$('#readout'), k=U.readout;
  if(k==='maps'){ r.innerHTML=`<div class="row-flex" style="align-items:center"><canvas id="topo" width="200" height="200" style="width:200px;height:200px"></canvas>
    <div style="display:grid;gap:10px"><div class="seg-mini bandseg" role="group" aria-label="Band"><button data-b="alpha" aria-pressed="${mapBand==='alpha'}">Alpha, 8 to 13 Hz</button><button data-b="beta" aria-pressed="${mapBand==='beta'}">Beta, 13 to 30 Hz</button></div>
    <div class="legend"><span>Low</span><i></i><span>High</span></div><p class="muted" style="margin:0;max-width:34ch" id="mapNote"></p></div></div>`;
    r.querySelectorAll('.bandseg button').forEach(b=>b.addEventListener('click',()=>{ mapBand=b.dataset.b; r.querySelectorAll('.bandseg button').forEach(x=>x.setAttribute('aria-pressed',x===b)); })); }
  if(k==='mi') r.innerHTML=`<div style="display:grid;gap:12px"><div class="track2"><span class="tick-l">Left</span><span class="tick-r">Right</span><span class="ball" id="ball"></span></div>
    <div class="row-flex" style="justify-content:space-between"><div class="muted">Decoded: <b id="dec" style="color:var(--text)">rest</b></div><div class="muted">Lateral index <b id="lat" style="color:var(--text);font-variant-numeric:tabular-nums">0.00</b></div></div>
    <p class="muted" style="margin:0">A simple comparison of mu power at C3 and C4. Real motor-imagery BCIs train a classifier per person.</p></div>`;
  if(k==='hybrid') r.innerHTML=`<div class="outlets">${[['EEG_PiEEG','CH1 to CH10','EEG','#3fc8ff','oEEG'],['EOG_PiEEG','CH11, CH12','EOG','#b690ff','oEOG'],['EMG_PiEEG','CH13 to CH16','EMG','#ffae42','oEMG']].map(([n,c,t,col,id])=>`<div class="outlet" style="--oc:${col}"><span class="act" id="${id}"></span><div><b>${n}</b><span>${c}, 250 Hz</span></div></div>`).join('')}</div><p class="muted" style="margin:10px 0 0">Three LSL outlets from one board. Blink and clench to see each stream react.</p>`;
  if(k==='gesture') r.innerHTML=`<div class="row-flex" style="align-items:center"><div class="grid16" id="grid16">${Array.from({length:16},(_,i)=>`<i data-i="${i}"></i>`).join('')}</div>
    <div><div class="muted">Recognised</div><div class="big" id="gname" style="font-size:34px">Rest</div><div class="muted" id="gconf">No muscle activity</div></div></div>`;
  if(k==='vr') r.innerHTML=`<div class="osc">${['Frontal_Beta','Frontal_Alpha','Central_Beta','Occipital_Alpha'].map(p=>`<div><span class="addr">/avatar/parameters/EEG_${p}</span><span class="v" id="v${p}">0.00</span><span class="bar"><b id="b${p}" style="width:0"></b></span></div>`).join('')}</div>`;
  if(k==='research') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div><div class="muted">LSL outlet</div><div style="font-weight:600">PiEEG, 16 ch, 250 Hz</div><div class="muted" style="margin-top:6px">OpenViBE, MNE-LSL, BCI2000, LabRecorder</div></div><div style="flex:1;min-width:200px"><div class="muted">Markers in this session</div><div class="markers" id="marks">None yet. Add one while the data streams.</div></div></div>`;
}
/* topomap: inverse-distance interpolation over the 16 positions */
const TOPO_PTS=MONT.map(n=>({n,x:P1020[n][0],y:P1020[n][1]}));
function cmap(v){ // dark navy -> sig cyan -> white
  const stops=[[8,12,22],[23,78,120],[63,200,255],[240,250,255]]; const x=clamp(v)*3, i=Math.min(2,Math.floor(x)), f=x-i;
  return stops[i].map((c,j)=>Math.round(c+(stops[i+1][j]-c)*f)); }
let topoImg=null;
function drawTopo(){
  const cv=$('#topo'); if(!cv) return; const g=cv.getContext('2d'), S=200, G=50;
  if(!topoImg) topoImg=g.createImageData(G,G);
  const vals=TOPO_PTS.map(p=>chanPower(p.n,mapBand));
  const d=topoImg.data;
  for(let j=0;j<G;j++) for(let i=0;i<G;i++){ const x=(i+.5)/G*2.2-1.1, y=1.1-(j+.5)/G*2.2; const o=(j*G+i)*4;
    if(x*x+y*y>1.08){ d[o+3]=0; continue; }
    let num=0,den=0; for(let q=0;q<TOPO_PTS.length;q++){ const dx=x-TOPO_PTS[q].x, dy=y-TOPO_PTS[q].y; const w=1/Math.pow(dx*dx+dy*dy+.004,1.6); num+=w*vals[q]; den+=w; }
    const c=cmap(num/den); d[o]=c[0]; d[o+1]=c[1]; d[o+2]=c[2]; d[o+3]=255; }
  const off=drawTopo.off||(drawTopo.off=Object.assign(document.createElement('canvas'),{width:G,height:G}));
  off.getContext('2d').putImageData(topoImg,0,0);
  g.clearRect(0,0,S,S); g.save(); g.beginPath(); g.arc(S/2,S/2,S/2*1.04/1.1-2,0,6.283); g.clip(); g.imageSmoothingEnabled=true; g.drawImage(off,0,0,S,S); g.restore();
  const R0=S/2*(1/1.1);
  g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=1.5; g.beginPath(); g.arc(S/2,S/2,R0*1.04,0,6.283); g.stroke();
  g.beginPath(); g.moveTo(S/2-8,S/2-R0*1.04+1); g.lineTo(S/2,S/2-R0*1.04-10); g.lineTo(S/2+8,S/2-R0*1.04+1); g.stroke();
  g.fillStyle='rgba(8,10,14,.9)'; TOPO_PTS.forEach(p=>{ g.beginPath(); g.arc(S/2+p.x*R0,S/2-p.y*R0,2.6,0,6.283); g.fill(); });
  const note=$('#mapNote'); if(note) note.textContent = mapBand==='alpha' ? (M.eyes>.5?'Eyes closed: alpha is strongest over the back of the head.':'Close your eyes and watch the back of the head brighten.') : (M.math>.5?'Mental effort: beta rises over the front and centre.':'Try mental math and watch the front of the head.');
}
let lastRO=0;
function updateReadout(now){
  if(U.readout==='maps') drawTopo();
  if(now-lastRO<90) return; lastRO=now;
  const k=U.readout;
  if(k==='mi'){ const lat=(M.muC4-M.muC3)/(M.muC4+M.muC3); $('#ball').style.left=(50+clamp(lat*2.2,-1,1)*42)+'%'; $('#lat').textContent=lat.toFixed(2); $('#dec').textContent= lat<-.12?'left hand':lat>.12?'right hand':'rest'; }
  if(k==='hybrid'){ $('#oEEG').classList.add('on'); $('#oEOG').classList.toggle('on',now-M.evEOG<400); $('#oEMG').classList.toggle('on',now-M.evEMG<250); }
  if(k==='gesture'){ const cells=ROOT.querySelectorAll('#grid16 i'); let tot=0; cells.forEach((c,i)=>{ const v=clamp(M.gRms[i]); tot+=v; c.style.background=`rgba(255,174,66,${.08+v*.92})`; });
    ROOT.querySelectorAll('.g16c').forEach((c,i)=>c.setAttribute('r',2.1+clamp(M.gRms[i])*2.4));
    if(tot/16<.12){ $('#gname').textContent='Rest'; $('#gconf').textContent='No muscle activity'; }
    else { const v=[...M.gRms]; const nv=Math.hypot(...v); let best='fist',bs=-1; for(const g of ['fist','point','open']){ const t=GT[g]; const s=v.reduce((a,x,i)=>a+x*t[i],0)/(nv*Math.hypot(...t)); if(s>bs){bs=s;best=g;} }
      $('#gname').textContent={fist:'Fist',point:'Point',open:'Open hand'}[best]; $('#gconf').textContent=`${Math.round(bs*100)}% pattern match`; } }
  if(k==='vr'){ const reg=(names,band)=>names.reduce((a,n)=>a+chanPower(n,band),0)/names.length;
    const vals={Frontal_Beta:reg(REGIONS[0].ch,'beta'),Frontal_Alpha:reg(REGIONS[0].ch,'alpha'),Central_Beta:reg(REGIONS[1].ch,'beta'),Occipital_Alpha:reg(REGIONS[2].ch,'alpha')};
    for(const p in vals){ $('#v'+p).textContent=vals[p].toFixed(2); $('#b'+p).style.width=vals[p]*100+'%'; } }
  if(k==='research') $('#marks').innerHTML = M.marks.length? M.marks.slice(-4).reverse().map(m=>`Marker ${m.n}  at ${m.t.toFixed(2)} s  (frame ${Math.round(m.t*250)})`).join('<br>') : 'None yet. Add one while the data streams.';
}

/* ---------- canvas ---------- */
const cv=$('#demoCanvas'), ctx=cv.getContext('2d'); let CW=0,CHh=0,rowH=40;
function sizeCanvas(){ const n=U.rows.length; rowH=n>12?22:n>6?28:n>4?36:n>2?46:58; const d=Math.min(2,devicePixelRatio||1);
  CW=cv.clientWidth; CHh=n*rowH+14; cv.width=CW*d; cv.height=CHh*d; cv.style.height=CHh+'px'; ctx.setTransform(d,0,0,d,0,0); }
on(window,'resize',sizeCanvas);
function drawCanvas(){
  const labelW=CW<460?84:104, W=CW-labelW-12;
  ctx.clearRect(0,0,CW,CHh); ctx.strokeStyle='rgba(0,0,0,.055)'; ctx.lineWidth=1;
  for(let s=0;s<=WIN;s++){ const x=labelW+W*s/WIN; ctx.beginPath(); ctx.moveTo(x,6); ctx.lineTo(x,CHh-6); ctx.stroke(); }
  ctx.font=`${U.rows.length>12?11.5:12.5}px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif`; ctx.textBaseline='middle';
  U.rows.forEach((id,r)=>{
    const c=CH[id], y0=7+rowH*r+rowH/2, amp=rowH*.42, col=COL[c.col];
    const hot = U.view!=='head' || U.hot.includes(id) || c.type==='pow';
    ctx.fillStyle=hot?'#c7ccd3':'#6c737c'; ctx.fillText(c.label,10,y0);
    const derived=c.type==='pow';
    const map = derived ? v=>y0+rowH*.4-v*rowH*.8 : v=>y0-clamp(v,-1.6,1.6)*amp*.62;
    ctx.strokeStyle=col; ctx.globalAlpha=hot?.95:.5; ctx.lineWidth=derived?2:(U.rows.length>12?1:1.3); ctx.beginPath();
    const step=Math.max(1,Math.floor(N/Math.min(N,W)));
    for(let i=0;i<N;i+=step){ const x=labelW+W*i/(N-1); const y=map(c.buf[(head+1+i)%N]); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
    ctx.stroke(); ctx.globalAlpha=1;
    if(derived){ ctx.globalAlpha=.12; ctx.fillStyle=col; ctx.lineTo(labelW+W,y0+rowH*.4); ctx.lineTo(labelW,y0+rowH*.4); ctx.fill(); ctx.globalAlpha=1; }
  });
  if(U.id==='research'){ for(const m of M.marks){ const age=simT-m.t; if(age<0||age>WIN) continue; const x=labelW+W*(1-age/WIN);
    ctx.strokeStyle=ACC; ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(x,4); ctx.lineTo(x,CHh-4); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle=ACC; ctx.font='600 11px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif'; ctx.fillText('M'+m.n,x+4,10); } }
}

/* =========================================================
   HOW-TO WIDGETS
   ========================================================= */
function kitProgress(){ const all=[...ROOT.querySelectorAll('#kit input')], n=all.filter(i=>i.checked).length;
  $('#kitProgress').innerHTML = n===all.length ? '<b>Everything ready.</b> On to step 2.' : `<b>${n} of ${all.length}</b> ready`; $('#s1').classList.toggle('done',n===all.length); }
ROOT.querySelectorAll('#kit input').forEach(i=>i.addEventListener('change',kitProgress)); kitProgress();
ROOT.querySelectorAll('#quiet input').forEach(i=>i.addEventListener('change',()=>$('#s7').classList.toggle('done',[...ROOT.querySelectorAll('#quiet input')].every(x=>x.checked))));

(function(){ // seat
  const s=$('#seat'); let h=`<rect x="40" y="170" width="440" height="12" rx="3" fill="#1f7a45"/><rect x="40" y="182" width="440" height="4" fill="#0f3d22"/>`;
  for(let i=0;i<20;i++) h+=`<rect x="${86+i*15.6}" y="140" width="3" height="30" fill="#e3c15f"/>`;
  h+=`<rect x="80" y="160" width="318" height="10" fill="#15161a"/><rect x="410" y="136" width="60" height="34" rx="3" fill="#aeb4bc"/>
  <text x="40" y="208" fill="#9aa2ad" style="font-size:13px">Raspberry Pi, 40-pin header</text>
  <g class="shield-g"><rect x="40" y="70" width="352" height="10" rx="3" fill="#b93fb0"/><rect x="80" y="80" width="318" height="26" fill="#15161a"/>
  ${Array.from({length:20},(_,i)=>`<rect x="${85+i*15.6}" y="96" width="5" height="10" fill="#050607"/>`).join('')}
  <rect x="130" y="52" width="50" height="18" rx="2" fill="#18191c"/><rect x="220" y="52" width="50" height="18" rx="2" fill="#18191c"/><rect x="48" y="44" width="12" height="26" fill="#15161a"/><rect x="372" y="44" width="12" height="26" fill="#15161a"/>
  <text x="40" y="34" fill="#eef0f3" style="font-size:14px;font-weight:600">PiEEG-16</text></g>
  <g id="seatArrow"><path d="M440,60 V112 M430,102 L440,114 L450,102" stroke="${ACC}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="440" y="48" text-anchor="middle" fill="${ACC}" style="font-size:13px;font-weight:600">Press evenly</text></g>`;
  s.innerHTML=h; const btn=$('#seatBtn');
  btn.addEventListener('click',()=>{ const on=!s.classList.contains('seated'); s.classList.toggle('seated',on); $('#seatArrow').style.opacity=on?0:1; btn.textContent=on?'Lift it off again':'Seat the shield'; $('#s2').classList.toggle('done',on); });
})();

(function(){ // wiring map for 16 + REF + BIAS
  const s=$('#wire'), cx=175, cy=300, R=140;
  const pins=[...MONT.map((n,i)=>({label:'CH'+(i+1),to:n,desc:n})),{label:'BIAS',to:'earR',desc:'Right earlobe clip',ref:true},{label:'REF',to:'earL',desc:'Left earlobe clip',ref:true}];
  const pos=n=> n==='earL'?{x:cx-R-12,y:cy}: n==='earR'?{x:cx+R+12,y:cy}:{x:cx+P1020[n][0]*R*.86,y:cy-P1020[n][1]*R*.86};
  let h=`<ellipse cx="${cx-R-4}" cy="${cy}" rx="13" ry="30" fill="#23272e"/><ellipse cx="${cx+R+4}" cy="${cy}" rx="13" ry="30" fill="#23272e"/>
    <path d="M${cx-18},${cy-R+6} Q${cx},${cy-R-30} ${cx+18},${cy-R+6}" fill="#262a31"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="#1f232a" stroke="rgba(255,255,255,.12)"/><circle cx="${cx}" cy="${cy}" r="${R*.43}" fill="none" stroke="rgba(63,200,255,.12)"/>
    <rect x="440" y="22" width="44" height="${8*30+8}" rx="6" fill="#15161a"/><rect x="440" y="${22+8*30+22}" width="44" height="${8*30+8}" rx="6" fill="#15161a"/>
    <rect x="440" y="${22+16*30+44}" width="44" height="${2*30+8}" rx="6" fill="#15161a"/>
    <text x="462" y="14" text-anchor="middle" fill="#626973" style="font-size:12px">Chip 1</text><text x="462" y="${22+8*30+16}" text-anchor="middle" fill="#626973" style="font-size:12px">Chip 2</text><g id="wires"></g>`;
  pins.forEach((p,i)=>{ const y=40+i*30+(i>=8?22:0)+(i>=16?22:0); p.py=y; h+=`<g class="pin" data-i="${i}" style="cursor:pointer"><rect x="456" y="${y-6}" width="12" height="12" fill="#e3c15f"/><text x="496" y="${y+4}" fill="#cfd4da" style="font-size:13px;font-weight:600">${p.label}</text></g>`; });
  pins.forEach((p,i)=>{ const q=pos(p.to); p.q=q;
    h+=`<g class="edot" data-i="${i}" style="cursor:pointer">${p.ref?`<path d="M${q.x},${q.y-8} L${q.x+8},${q.y} L${q.x},${q.y+8} L${q.x-8},${q.y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.6"/>`:
      `<circle cx="${q.x}" cy="${q.y}" r="8" fill="#12151a" stroke="#3fc8ff" stroke-width="2"/><circle cx="${q.x}" cy="${q.y}" r="3" fill="#3fc8ff"/><text x="${q.x}" y="${q.y+22}" text-anchor="middle" fill="#9aa2ad" style="font-size:11.5px">${p.to}</text>`}</g>`; });
  s.innerHTML=h;
  const wires=s.querySelector('#wires');
  pins.forEach(p=>{ const q=p.q, path=document.createElementNS(NS,'path');
    path.setAttribute('d', p.to==='earL' ? `M${q.x},${q.y} C${q.x-10},${q.y+230} 330,${p.py} 456,${p.py}` : `M${q.x},${q.y} C${q.x+90},${q.y} 380,${p.py} 456,${p.py}`);
    path.setAttribute('fill','none'); path.setAttribute('stroke',p.ref?'#e8ebef':'#3fc8ff'); path.setAttribute('stroke-width','1.3'); path.setAttribute('stroke-opacity','.3'); p.path=path; wires.appendChild(path); });
  $('#wireList').innerHTML=pins.map((p,i)=>`<div data-i="${i}"><b>${p.label}</b><span>${p.desc}</span></div>`).join('');
  const hl=i=>{ pins.forEach((p,j)=>{ p.path.setAttribute('stroke-opacity', i==null?.3: i===j?1:.06); p.path.setAttribute('stroke-width',i===j?2.6:1.3); });
    s.querySelectorAll('.pin,.edot').forEach(n=>n.style.opacity= i==null||+n.dataset.i===i ? 1 : .3);
    ROOT.querySelectorAll('#wireList div').forEach(n=>n.classList.toggle('on',+n.dataset.i===i)); };
  [...s.querySelectorAll('.pin,.edot'),...ROOT.querySelectorAll('#wireList div')].forEach(n=>{ n.addEventListener('pointerenter',()=>hl(+n.dataset.i)); n.addEventListener('pointerleave',()=>hl(null)); });
})();

const Cm=t=>`<span class="c">${t}</span>`, P=t=>`<span class="p">${t}</span>`;
const TABS={
  'Record':`${Cm('# record while streaming')}
${P('pieeg-server')} --record session.csv

${Cm('# or a standalone 5-minute recording')}
${P('pieeg-server')} record session.csv --duration 300 --device pieeg16`,
  'LSL groups':`${P('pieeg-server')} --lsl

${Cm('# then split the 16 channels into three streams')}
{"cmd": "lsl_groups_set", "groups": [
  {"name": "EEG", "channels": [0,1,2,3,4,5,6,7,8,9]},
  {"name": "EOG", "channels": [10,11]},
  {"name": "EMG", "channels": [12,13,14,15]}
]}
${Cm('# publishes EEG_PiEEG, EOG_PiEEG and EMG_PiEEG')}`,
  'Python':`import asyncio, json, websockets

async def main():
    async with websockets.connect("ws://raspberrypi.local:1616") as ws:
        async for msg in ws:
            frame = json.loads(msg)
            print(frame["n"], frame["channels"])   ${Cm('# 16 values')}

asyncio.run(main())`,
  'VRChat regions':`${Cm('# define regions once: frontal, central, occipital')}
${P('pieeg-server')} --osc-regions-setup

${P('pieeg-server')} --osc
${Cm('# sends /avatar/parameters/EEG_{Region}_{Band}')}`
};
(function(){ const t=$('#codeTabs'); Object.keys(TABS).forEach((k,i)=>{ const b=document.createElement('button'); b.setAttribute('role','tab'); b.textContent=k;
  b.addEventListener('click',()=>{ t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b)); $('#code-tab').innerHTML=TABS[k]; }); t.appendChild(b); if(!i) b.click(); }); })();
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
selectUse(USES.some(u=>u.id===start)?start:'maps');
if(USES.some(u=>u.id===start)) later(()=>$('#where').scrollIntoView(),50);
for(let i=0;i<N;i++) advance(1/FS);
let last=0, visible=true;
{ const io=new IntersectionObserver(es=>{ visible=es[0].isIntersecting; },{rootMargin:'100px'}); io.observe($('#useStage')); cleanups.push(()=>io.disconnect()); }
function frame(now){
  if(stopped) return;
  const dt=Math.min(.05,(now-(last||now))/1000); last=now;
  if(!reduce) advance(dt); else if(Math.floor(now/250)!==Math.floor((now-dt*1000)/250)) advance(.25);
  if(visible){ drawCanvas(); updateReadout(now); }
  if(!stopped) rafId=requestAnimationFrame(frame);
}
if(!stopped) rafId=requestAnimationFrame(frame);


return () => {
  stopped = true;
  cancelAnimationFrame(rafId);
  timers.forEach((id) => clearTimeout(id));
  timers.clear();
  cleanups.forEach((fn) => fn());
  ROOT.innerHTML = PRISTINE;
};
}
