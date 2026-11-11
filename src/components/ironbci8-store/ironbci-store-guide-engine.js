/* IronBCI guide: interactive engine.
 * Converted from the original ironbci-page.html. The drawing code is unchanged;
 * it is wrapped so React can mount it on the guide's root element and cleanly stop
 * it (animation frame, timers, intervals, window/document listeners) on unmount.
 * All images are embedded in this file and in ironbci-guide.css (no public/ files needed).
 */
export function mountIronBCIStoreGuide(root) {
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
const BOARD_PHOTO='/products/ironbci-8/guide-board.webp';
const COL={EEG:'#0071e3',EMG:'#ad6500',ECG:'#d72e50',EOG:'#8653bc'};
const ACC='#0071e3';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

/* =========================================================
   HERO: the round three-board stack
   ========================================================= */
(function drawBoard(){
  const s=$('#board');
  if(!s) return; // the store version has no hero drawing const cx=372, rx=168, ry=64, T=11;
  const lv=[{cy:362,top:'#1b1d21',side:'#0d0e10'},{cy:292,top:'#1d2025',side:'#0e0f12'},{cy:222,top:'#212429',side:'#0f1013'}];
  const ang=[40,140,220,320].map(a=>a*Math.PI/180);
  const sp=a=>({dx:Math.cos(a)*rx*.8, dy:Math.sin(a)*ry*.8});
  const side=(cy,c)=>`<path d="M${cx-rx},${cy} A${rx},${ry} 0 0 0 ${cx+rx},${cy} L${cx+rx},${cy+T} A${rx},${ry} 0 0 1 ${cx-rx},${cy+T} Z" fill="${c}"/>`;
  const standoff=(x,y1,y2)=>`<rect x="${x-4.5}" y="${y2}" width="9" height="${y1-y2}" fill="url(#brass)"/><rect x="${x-6}" y="${y1-5}" width="12" height="5" rx="1" fill="#a8842f"/>`;
  let h=`<defs>
    <linearGradient id="brass" x1="0" x2="1"><stop offset="0" stop-color="#7a5d1c"/><stop offset=".45" stop-color="#e7c56a"/><stop offset="1" stop-color="#8a6a22"/></linearGradient>
    <linearGradient id="lipo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe3e8"/><stop offset="1" stop-color="#9aa1aa"/></linearGradient>
    <linearGradient id="usb" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d5dae0"/><stop offset="1" stop-color="#8e969f"/></linearGradient>
    <radialGradient id="halo" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="${ACC}" stop-opacity=".16"/><stop offset="1" stop-color="${ACC}" stop-opacity="0"/></radialGradient>
    <radialGradient id="ledglow"><stop offset="0" stop-color="#bfe0ff"/><stop offset=".4" stop-color="${ACC}"/><stop offset="1" stop-color="${ACC}" stop-opacity="0"/></radialGradient>
  </defs>
`;
  // battery + wires (behind the stack, front-left)
  h+=`<path d="M205,452 C240,452 250,440 262,${lv[0].cy+ry*.55+T+4}" stroke="#e5484d" stroke-width="3" fill="none"/>
      <path d="M205,460 C246,460 258,446 270,${lv[0].cy+ry*.55+T+6}" stroke="#16181b" stroke-width="3" fill="none"/>
      <rect x="58" y="424" width="150" height="52" rx="7" fill="url(#lipo)" stroke="#f2f4f6"/>
      <rect x="66" y="433" width="84" height="34" rx="3" fill="#2e7a4a" opacity=".9"/>
      <text x="72" y="448" fill="#e9f5ee" style="font-size:11px;font-weight:700">3.7 V LiPo</text>
      <text x="72" y="461" fill="#e9f5ee" style="font-size:10px">200 mAh</text>`;
  h+=`<image x="205" y="140" width="350" height="290" preserveAspectRatio="xMidYMid meet" href="${BOARD_PHOTO}"/>`;
  const call=(tx,ty,px,py,main,sub,anchor='start',lx)=>`
    <text x="${tx}" y="${ty}" text-anchor="${anchor}"><tspan x="${tx}" fill="#1d1d1f" style="font-size:14px;font-weight:600">${main}</tspan><tspan x="${tx}" dy="17" fill="#9aa2ad" style="font-size:12.5px">${sub}</tspan></text>`;
  const topY=lv[2].cy;
  h+=call(cx+62,120,cx+62,topY-22,'BLE LED','On when paired','middle');
  h+=call(716,topY-50,cx+rx+6,topY+6,'Electrode header','2.54 mm pins','end',cx+rx+6);
  h+=call(cx-rx-16,lv[1].cy-30,cx-rx-9,lv[1].cy+5,'Switch 1','Battery','end',cx-rx-9);
  h+=call(cx+rx*.5+10,512,cx+rx*.5,lv[0].cy+ry*.86+10,'Switch 2','Data flow','start',cx+rx*.5);
  h+=call(cx-10,512,cx,lv[0].cy+ry+10,'Micro USB','5 V charging','end',cx);
  h+=`<text x="58" y="500"><tspan x="58" fill="#1d1d1f" style="font-size:14px;font-weight:600">LiPo battery</tspan><tspan x="58" dy="17" fill="#9aa2ad" style="font-size:12.5px">JST 2.0 mm, underneath</tspan></text>`;
  s.innerHTML=h;
})();

/* =========================================================
   BODY FIGURE
   ========================================================= */
const ARM_R='M252,300 C226,298 208,312 204,338 C198,380 192,410 190,440 C186,480 181,522 177,566 L205,568 C208,530 214,490 218,452 C222,420 230,390 236,356 Z';
const HAND_R='M177,564 C170,584 172,606 182,617 C192,623 205,616 207,600 C209,588 207,576 205,566 Z';
const mirror=d=>d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g,(m,x,y)=>`${660-parseFloat(x)},${y}`);
const P1020={Fp1:[-.31,.95],Fp2:[.31,.95],C3:[-.5,0],C4:[.5,0],P7:[-.81,-.59],P8:[.81,-.59],O1:[-.31,-.95],O2:[.31,-.95]};
const MONT=['Fp1','Fp2','C3','C4','P7','P8','O1','O2'];
const TH={cx:1200,cy:235,R:150};
const topPos=n=>({x:TH.cx+P1020[n][0]*TH.R*.86, y:TH.cy-P1020[n][1]*TH.R*.86});
function along(p,q,t,off){const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy);return{x:p[0]+dx*t+(-dy/L)*off,y:p[1]+dy*t+(dx/L)*off};}
const FORE=[[455,448],[470,560]];
const EMG_SITES=[]; for(let r=0;r<4;r++) for(const c of [-7.5,7.5]) EMG_SITES.push(along(FORE[0],FORE[1],.14+r*.22,c));
const VIEWS={
  head:{box:[1010,30,380,400]},
  face:{box:[226,52,220,232]},
  arm:{box:[318,272,304,320]},
  chest:{box:[190,262,280,295]}
};
function drawBody(){
  $('#body').innerHTML=`<defs>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d323b"/><stop offset="1" stop-color="#181b20"/></linearGradient>
    <radialGradient id="skull" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#fafafb"/><stop offset="1" stop-color="#dfe2e8"/></radialGradient>
  </defs>
  <g id="mannequin"><image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="/products/ironbci-8/guide-person.webp"/><g id="pupils" fill="#28211e"><circle cx="312" cy="152" r="1.3"/><circle cx="347" cy="152" r="1.3"/></g></g>
  <g id="topHead">
    <ellipse cx="${TH.cx-TH.R-6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/><ellipse cx="${TH.cx+TH.R+6}" cy="${TH.cy}" rx="16" ry="34" fill="#d2d2d7"/>
    <path d="M${TH.cx-22},${TH.cy-TH.R+8} Q${TH.cx},${TH.cy-TH.R-34} ${TH.cx+22},${TH.cy-TH.R+8}" fill="#d2d2d7"/>
    <circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R}" fill="url(#skull)" stroke="#b6bec8" stroke-width="6"/>
    <g fill="none" stroke="var(--sig)" stroke-opacity=".14">
      <circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.43}"/><circle cx="${TH.cx}" cy="${TH.cy}" r="${TH.R*.86}"/>
      <path d="M${TH.cx},${TH.cy-TH.R} V${TH.cy+TH.R} M${TH.cx-TH.R},${TH.cy} H${TH.cx+TH.R}"/>
    </g>
    <text x="${TH.cx}" y="${TH.cy-TH.R-34}" text-anchor="middle" fill="#626973" style="font-size:12px">Nose</text>
  </g>
  <g id="bodyLeads" fill="none"></g><g id="bodyEls"></g>`;
}
function ironGlyph(x,y,k=1,label=true,lx=24,ly=4,anchor='start'){
  return `<g transform="translate(${x},${y}) scale(${k})">
    <path d="M18,-7 C30,-10 36,-4 40,0" stroke="#e5484d" stroke-width="1.4" fill="none"/>
    <rect x="22" y="-2" width="26" height="15" rx="3" fill="#b9bfc7" stroke="#e6e9ed"/>
    <image x="-22" y="-22" width="44" height="44" href="${BOARD_PHOTO}"/>
  </g>${label?`<text x="${x+lx}" y="${y+ly}" text-anchor="${anchor}" fill="#1d1d1f" style="font-size:${13*k}px;font-weight:600">IronBCI</text><text x="${x+lx}" y="${y+ly+15*k}" text-anchor="${anchor}" fill="#8e96a0" style="font-size:${11.5*k}px">with LiPo</text>`:''}`;
}
function diamond(x,y,dot,k=1){ const d=8*k; return `<path d="M${x},${y-d} L${x+d},${y} L${x},${y+d} L${x-d},${y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="${1.6*k}"/>${dot?`<circle cx="${x}" cy="${y}" r="${2.4*k}" fill="#e8ebef"/>`:''}`; }
function placeElectrodes(u){
  const g=$('#bodyEls'), L=$('#bodyLeads'); const c=COL[u.sig]; let h='', leads='';
  const k=u.view==='face'?.62:1;
  const dot=(x,y,hot,label,lx,ly,anchor)=>`<g opacity="${hot?1:.38}">
      ${hot&&!reduce?`<circle cx="${x}" cy="${y}" r="${10*k}" fill="none" stroke="${c}" stroke-width="${1.5*k}"><animate attributeName="r" values="${9*k};${18*k}" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="1.8s" repeatCount="indefinite"/></circle>`:''}
      <circle cx="${x}" cy="${y}" r="${9*k}" fill="#12151a" stroke="${c}" stroke-width="${2*k}"/><circle cx="${x}" cy="${y}" r="${3.6*k}" fill="${hot?c:'#aeb6c0'}"/>
      ${label?`<text x="${lx??x}" y="${ly??(y+24*k)}" text-anchor="${anchor||'middle'}" fill="${hot?'#1d1d1f':'#76767c'}" style="font-size:${13*k}px;font-weight:${hot?600:500}">${label}</text>`:''}</g>`;
  const lead=(x,y,tx,ty,col)=>{ leads+=`<path d="M${x},${y} Q${(x+tx)/2},${Math.min(y,ty)-20} ${tx},${ty}" stroke="${col}" stroke-opacity=".45" stroke-width="${1.2*k}"/>`; };
  if(u.view==='head'){
    MONT.forEach(n=>{ const p=topPos(n); h+=dot(p.x,p.y,u.hot.includes(n),n); });
    h+=diamond(TH.cx-TH.R-6,TH.cy+10,false)+`<text x="${TH.cx-TH.R-6}" y="${TH.cy-20}" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">REF</text><text x="${TH.cx-TH.R-6}" y="${TH.cy+48}" text-anchor="middle" fill="#626973" style="font-size:11.5px">left ear</text>`;
    h+=diamond(TH.cx+TH.R+6,TH.cy+10,true)+`<text x="${TH.cx+TH.R+6}" y="${TH.cy-20}" text-anchor="middle" fill="#515154" style="font-size:12px;font-weight:600">BIAS</text><text x="${TH.cx+TH.R+6}" y="${TH.cy+48}" text-anchor="middle" fill="#626973" style="font-size:11.5px">right ear</text>`;
    h+=ironGlyph(TH.cx,TH.cy+TH.R+8,.95,true,30,16);
  } else if(u.view==='face'){
    const pts=[[304,152,'1'],[356,152,'2'],[345,140,'3'],[345,168,'4']];
    const dev={x:410,y:112};
    pts.forEach(([x,y])=>lead(x,y,dev.x-8,dev.y+6,c));
    lead(287,177,dev.x-8,dev.y+6,'#e8ebef'); lead(373,177,dev.x-8,dev.y+8,'#e8ebef');
    h+=`<path d="M283,111 C303,100 357,100 377,111" stroke="#2b3038" stroke-width="5" fill="none"/>`;
    pts.forEach(([x,y,l],i)=>h+=dot(x,y,true,l, i===0?x-9:i===1?x+9:x+9, i===2?y-5:i===3?y+9:y+3, i===0?'end':'start'));
    h+=diamond(287,177,false,k)+`<text x="258" y="206" text-anchor="middle" fill="#515154" style="font-size:8.5px;font-weight:600">REF</text>`;
    h+=diamond(373,177,true,k)+`<text x="402" y="206" text-anchor="middle" fill="#515154" style="font-size:8.5px;font-weight:600">BIAS</text>`;
    h+=ironGlyph(dev.x,dev.y,.62,true,-2,-18,'middle');
  } else if(u.view==='arm'){
    const dev={x:452,y:326};
    EMG_SITES.forEach(p=>lead(p.x,p.y,dev.x,dev.y+10,c)); lead(478,447,dev.x+4,dev.y+10,'#e8ebef'); lead(478,578,dev.x+4,dev.y+10,'#e8ebef');
    h+=`<path d="M424,${dev.y+2} C440,${dev.y+10} 470,${dev.y+10} 486,${dev.y+2}" stroke="#2b3038" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    EMG_SITES.forEach(p=>{ h+=`<circle cx="${p.x}" cy="${p.y}" r="5.6" fill="#12151a" stroke="${c}" stroke-width="1.6"/><circle cx="${p.x}" cy="${p.y}" r="2.2" fill="${c}"/>`; });
    h+=`<path d="M424,${EMG_SITES[0].y-2} L440,${EMG_SITES[0].y-2} M424,${EMG_SITES[7].y+2} L440,${EMG_SITES[7].y+2} M424,${EMG_SITES[0].y-2} V${EMG_SITES[7].y+2}" stroke="#a1a1a6" fill="none"/>
      <text x="418" y="${(EMG_SITES[0].y+EMG_SITES[7].y)/2}" text-anchor="end" fill="#1d1d1f" style="font-size:12.5px;font-weight:600">8 channels</text>
      <text x="418" y="${(EMG_SITES[0].y+EMG_SITES[7].y)/2+16}" text-anchor="end" fill="#8e96a0" style="font-size:11.5px">in pairs</text>`;
    h+=diamond(478,447,false)+`<text x="492" y="451" fill="#515154" style="font-size:12px;font-weight:600">REF, elbow</text>`;
    h+=diamond(478,578,true)+`<text x="492" y="582" fill="#515154" style="font-size:12px;font-weight:600">BIAS, wrist</text>`;
    h+=ironGlyph(dev.x,dev.y,1,true,-24,-26,'end');
  } else {
    const dev={x:330,y:452};
    [[390,318],[398,482],[378,404]].forEach(([x,y])=>lead(x,y,dev.x+8,dev.y,c)); lead(270,318,dev.x-8,dev.y,'#e8ebef'); lead(262,482,dev.x-8,dev.y,'#e8ebef');
    h+=`<path d="M241,${dev.y} C300,${dev.y+10} 360,${dev.y+10} 419,${dev.y}" stroke="#2b3038" stroke-width="8" fill="none"/>`;
    [[390,318,'Lead I'],[398,482,'Lead II'],[378,404,'V4']].forEach(([x,y,l])=>h+=dot(x,y,true,l,x+16,y+4,'start'));
    h+=diamond(270,318,false)+`<text x="254" y="322" text-anchor="end" fill="#515154" style="font-size:12px;font-weight:600">REF</text>`;
    h+=diamond(262,482,true)+`<text x="246" y="486" text-anchor="end" fill="#515154" style="font-size:12px;font-weight:600">BIAS</text>`;
    h+=ironGlyph(dev.x,dev.y,1,true,0,36,'middle');
  }
  L.innerHTML=leads; g.innerHTML=h;
}

/* =========================================================
   USE CASES
   ========================================================= */
const ALL8=['Fp1','Fp2','C3','C4','P7','P8','O1','O2'];
const USES=[
 {id:'eyes', title:'Eye tracking and blinks', short:'EOG, hands-free input', sig:'EOG', view:'face',
  lead:'The eye works like a tiny battery with a positive front. Look left or right and the electrodes beside the eyes swing in opposite directions; blinks show up above and below the eye. Track gaze, count blinks, or build hands-free controls.',
  cap:'<b>1 and 2</b> at the outer corners of the eyes track left and right. <b>3 and 4</b> above and below one eye catch blinks. Ear clips for reference and bias.',
  rows:['HR','HL','VU','VD'], controls:['left','right','blink'], readout:'eyes', with:['Eye Track experience','Blink detector','useBlink']},
 {id:'focus', title:'Focus and relaxation', short:'Anywhere, on a battery', sig:'EEG', view:'head', hot:['O1','O2','C3','C4'],
  lead:'Alpha grows over the back of the head when the eyes close; beta rises with mental effort. With its own battery and Bluetooth, IronBCI measures this at a desk, on a sofa or on the move.',
  cap:'<b>O1 and O2</b> for alpha, <b>C3 and C4</b> for beta. The board rides on the cap strap at the back of the head.',
  rows:['O1','O2','C3','Fp1'], controls:['eyes','math'], readout:'focus', with:['pieeg.js','getFocusIndex()','getRelaxationIndex()','Dashboard detectors']},
 {id:'muscle', title:'Wireless muscle control', short:'EMG on an arm band', sig:'EMG', view:'arm',
  lead:'Strap the board to the arm and there’s no cable back to a computer to catch or pull. Clench a fist, the forearm channels burst, and a threshold drives a gripper, a game or a prosthetic prototype.',
  cap:'<b>Eight electrodes</b> in pairs over the forearm muscles, wired to the board on an arm band. Reference on the elbow bone, bias on the wrist.',
  rows:['M1','M2','M3','M4','env'], controls:['clench'], readout:'muscle', with:['PiEEG Server WebSocket','Webhooks','amplitude_above']},
 {id:'heart', title:'Heart rate on the move', short:'ECG on a chest strap', sig:'ECG', view:'chest',
  lead:'Three chest electrodes and a strap make a wearable ECG. Walk around, climb the stairs, and watch the rate follow, all without a cable tying you to the desk.',
  cap:'<b>Lead I, Lead II and V4</b> wired to the board on a chest strap. Reference below the right collarbone, bias on the lower right ribs.',
  rows:['I','II','V4'], controls:['stairs'], readout:'heart', with:['CSV recording','Jupyter notebooks in PiEEG Server']},
 {id:'browser', title:'Straight into a browser', short:'No install, Web Bluetooth', sig:'EEG', view:'head', hot:ALL8,
  lead:'Open cloud.pieeg.com in Chrome or Edge, click Connect and pick your board. The browser decodes and filters the stream itself: no Python, no server, nothing to install.',
  cap:'<b>All eight channels</b> stream into the tab at 250 Hz, with spike removal and a 1 to 40 Hz band-pass on by default.',
  rows:['Fp1','C3','O1','O2'], controls:['connect'], readout:'browser', with:['cloud.pieeg.com','pieeg.js','Chrome or Edge']},
 {id:'mobile', title:'Phone apps', short:'Android app and mobile SDK', sig:'EEG', view:'head', hot:ALL8,
  lead:'The open-source Android app pairs with IronBCI, shows the live signal, processes it on the phone and saves recordings in Excel format. The mobile SDK lets you build your own iOS or Android BCI app.',
  cap:'<b>All eight channels</b> go straight to the phone over Bluetooth. No laptop in the loop.',
  rows:['Fp1','O1'], controls:['eyes','save'], readout:'mobile', with:['IronBCI Android app','Mobile SDK']},
 {id:'vr', title:'VR avatars', short:'VRChat and Unity', sig:'EEG', view:'head', hot:ALL8,
  lead:'Run PiEEG Server with the Bluetooth driver and it sends five band powers into VRChat as avatar parameters from 0 to 1. Wear the board under the headset strap and your avatar follows your brain.',
  cap:'<b>All eight channels</b> feed the band powers. Group them into regions to drive separate parameters.',
  rows:['O1','Fp1'], controls:['eyes','math'], readout:'vr', with:['pieeg-server --device ironbci8 --osc','PiEEG Unity plugin']},
 {id:'home', title:'Smart home triggers', short:'Webhooks from your brain', sig:'EEG', view:'head', hot:['O1'],
  lead:'Close your eyes to turn the lights off. PiEEG Server fires a webhook when alpha power on O1 crosses a threshold, and IFTTT or Zapier does the rest.',
  cap:'<b>One channel is enough.</b> O1 over the visual cortex shows the clearest eyes-closed alpha.',
  rows:['O1','alpha'], controls:['eyes'], readout:'home', with:['PiEEG Server webhooks','band_power_above','band_power_below','IFTTT and Zapier']}
];
const CTL={
  eyes:{label:'Close eyes', on:'Eyes closed', toggle:'eyesT', key:'E'},
  math:{label:'Do mental math', on:'Doing mental math', toggle:'mathT', key:'M'},
  blink:{label:'Blink', key:'B'},
  left:{label:'Look left', key:'←', code:'ArrowLeft'},
  right:{label:'Look right', key:'→', code:'ArrowRight'},
  clench:{label:'Hold to clench', hold:true, key:'Space'},
  stairs:{label:'Climb the stairs', on:'Climbing', toggle:'stairsT', key:'S'},
  save:{label:'Save to Excel', key:'X'},
  connect:{label:'Connect IronBCI (Bluetooth)', key:'C'}
};

/* =========================================================
   SIGNAL MODEL
   ========================================================= */
const FS=125, WIN=4, N=FS*WIN;
const M={eyes:0,eyesT:0,math:0,mathT:0,clench:0,clenchT:0,hr:66,stairsT:0,ph:0,gaze:0,gazeT:0,gazeUntil:0,looks:{L:0,R:0},
  blinks:[],nextBlink:2.5,blinkCount:0,env:0,alphaP:.15,beat:0,lastBeat:0,bpm:66,
  lamp:true,above:0,below:0,cool:0,payload:null,ble:'idle',liveSince:null,saves:[]};
let simT=0, head=0, acc=0;
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
const R=rng(11), CH={};
const W1020={Fp1:{occ:.1,fr:.8,bw:1},Fp2:{occ:.1,fr:.8,bw:1},C3:{occ:.3,fr:1,bw:.08},C4:{occ:.3,fr:1,bw:.08},P7:{occ:.65,fr:.5,bw:.03},P8:{occ:.65,fr:.5,bw:.03},O1:{occ:1,fr:.3,bw:.02},O2:{occ:1,fr:.3,bw:.02}};
MONT.forEach(n=>{ const f=[],a=[],p=[]; for(let q=0;q<5;q++){const fr=1+R()*26;f.push(fr);a.push(1/Math.pow(fr,.7));p.push(R()*6.28);} const s=a.reduce((x,y)=>x+y,0); a.forEach((v,i)=>a[i]=v/s);
  CH[n]={type:'eeg',label:n,f,a,p,p0:R()*6.28,p1:R()*6.28,p2:R()*6.28,p3:R()*6.28,...W1020[n],buf:new Float32Array(N),col:'EEG'}; });
for(let i=1;i<=8;i++) CH['M'+i]={type:'emg',label:'Forearm '+i,gain:.7+R()*.35,p0:R()*6.28,buf:new Float32Array(N),col:'EMG'};
CH.env={type:'env',label:'Envelope',buf:new Float32Array(N),col:'EMG',thr:.45};
[['I',.72,.28],['II',1,.34],['V4',1.25,.45]].forEach(([k,g,tw])=>CH[k]={type:'ecg',label:k==='V4'?'V4':'Lead '+k,g,tw,buf:new Float32Array(N),col:'ECG'});
CH.alpha={type:'alpha',label:'Alpha power',buf:new Float32Array(N),col:'EEG',thr:.55,thrLow:.3};
[['HR','1 Right canthus'],['HL','2 Left canthus'],['VU','3 Above eye'],['VD','4 Below eye']].forEach(([k,l])=>CH[k]={type:'eog',label:l,buf:new Float32Array(N),col:'EOG'});
const g1=(x,m,s)=>{const z=(x-m)/s;return Math.exp(-z*z);};
function stepSample(t){
  const k=1/FS;
  M.eyes+=(M.eyesT-M.eyes)*k*2.2; M.math+=(M.mathT-M.math)*k*1.8; M.clench+=(M.clenchT-M.clench)*k*(M.clenchT>M.clench?9:6);
  M.hr+=((M.stairsT?108:66)-M.hr)*k*.35;
  if(M.gazeUntil && t>M.gazeUntil){ M.gazeT=0; M.gazeUntil=0; }
  M.gaze+=(M.gazeT-M.gaze)*Math.min(1,k*26);
  if(t>M.nextBlink && M.eyesT<.5){ M.blinks.push({t,counted:false}); M.nextBlink=t+4+Math.random()*4.5; }
  if(M.blinks.length>12) M.blinks.shift();
  for(const b of M.blinks) if(!b.counted && t-b.t>.22){ b.counted=true; M.blinkCount++; }
  let bl=0; for(const b of M.blinks){ const z=(t-b.t-.12)/.085; if(z>-4&&z<4) bl+=Math.exp(-z*z); }
  for(const n of MONT){ const c=CH[n]; let bg=0; for(let q=0;q<5;q++) bg+=c.a[q]*Math.sin(6.283*c.f[q]*t+c.p[q]);
    const al=(.2+1.25*M.eyes*c.occ)*(.78+.22*Math.sin(6.283*.31*t+c.p0))*Math.sin(6.283*10.2*t+c.p1);
    const be=(.08+.5*M.math*c.fr)*(Math.sin(6.283*18.7*t+c.p2)*.6+Math.sin(6.283*23.9*t+c.p3)*.4);
    c.buf[head]=bg*.75+al+be+bl*c.bw*2.1+(Math.random()-.5)*.08; }
  let rect=0;
  for(let i=1;i<=8;i++){ const c=CH['M'+i]; const env=.05+M.clench*c.gain*(.85+.15*Math.sin(6.283*1.3*t+c.p0)); const v=(Math.random()*2-1)*env*1.15; c.buf[head]=v; if(i<=4) rect+=Math.abs(v); }
  M.env+=(rect/4*1.9-M.env)*k*7; CH.env.buf[head]=M.env;
  const prev=M.ph; M.ph=(M.ph+M.hr/60*k)%1;
  if(prev<.29 && M.ph>=.29){ if(M.lastBeat) M.bpm=60/(t-M.lastBeat); M.lastBeat=t; M.beat=performance.now(); }
  const ph=M.ph;
  for(const key of ['I','II','V4']){ const c=CH[key]; const v=.12*g1(ph,.16,.028)-.12*g1(ph,.27,.009)+g1(ph,.29,.011)-.28*g1(ph,.312,.011)+c.tw*g1(ph,.53,.05);
    c.buf[head]=(v*c.g-.15)*1.3+.05*Math.sin(6.283*.23*t)+(Math.random()-.5)*.03; }
  const drift=.06*Math.sin(t*.35), nz=()=>(Math.random()-.5)*.05;
  CH.HR.buf[head]=M.gaze*.95+drift+nz(); CH.HL.buf[head]=-M.gaze*.95+drift+nz();
  CH.VU.buf[head]=bl*1.35+M.gaze*.05+nz(); CH.VD.buf[head]=-bl*.7+nz();
  M.alphaP+=((.14+.72*M.eyes-.06*M.math+.03*Math.sin(t*.9))-M.alphaP)*k*2.5; CH.alpha.buf[head]=M.alphaP;
  if(M.cool>0) M.cool-=k;
  M.above = M.alphaP>CH.alpha.thr ? M.above+k : 0; M.below = M.alphaP<CH.alpha.thrLow ? M.below+k : 0;
  if(M.lamp && M.above>1.2 && M.cool<=0){ M.lamp=false; M.cool=3; fireHook('band_power_above','Lights off',CH.alpha.thr); }
  if(!M.lamp && M.below>1.2 && M.cool<=0){ M.lamp=true; M.cool=3; fireHook('band_power_below','Lights on',CH.alpha.thrLow); }
}
function fireHook(ev,rule,thr){ M.payload={event:ev,rule,value:+(M.alphaP*40).toFixed(2),threshold:+(thr*40).toFixed(0),channel:6,timestamp:+(Date.now()/1000).toFixed(2)}; M.fired=ev; M.firedAt=performance.now(); }
function advance(dt){ acc+=dt; while(acc>=1/FS){ acc-=1/FS; simT+=1/FS; head=(head+1)%N; stepSample(simT); } }
function bands(){ const w=Math.sin(simT*1.7)*.02;
  return {delta:clamp(.32+w), theta:clamp(.22+.12*M.eyes-.04*M.math), alpha:clamp(.1+.66*M.eyes-.05*M.math+w), beta:clamp(.12+.55*M.math-.05*M.eyes-w), gamma:clamp(.06+.32*M.math)}; }

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
  const body=$('#body');
  const apply=()=>{ const [x,y,w,h]=VIEWS[U.view].box; body.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);
    $('#mannequin').style.display=U.view==='head'?'none':''; $('#topHead').style.display=U.view==='head'?'':'none';
    placeElectrodes(U); body.classList.remove('swap'); };
  if(prevView!==U.view && !reduce){ body.classList.add('swap'); later(apply,200); } else apply();
  $('#bodyCap').innerHTML=U.cap;
  const sigTxt = U.view==='head' ? (U.hot.length===8?'all 8 channels':U.hot.join(', ')) : U.view==='face'?'4 channels around the eyes': U.view==='arm'?'forearm':'chest';
  $('#demoSig').innerHTML=`<i></i>${U.sig}, ${sigTxt}`;
  $('#demoTitle').textContent=U.title; $('#demoLead').textContent=U.lead;
  $('#with').innerHTML='<span>Use it with</span>'+U.with.map(w=>`<span class="chip">${w}</span>`).join('');
  renderControls(); renderReadout(); sizeCanvas();
  history.replaceState&&history.replaceState(null,'','#'+U.id);
}
function ctlList(){
  if(U.id==='browser') return M.ble==='live'?['disconnect','eyes']:M.ble==='idle'?['connect']:[];
  return U.controls;
}
CTL.disconnect={label:'Disconnect', key:'D'};
function renderControls(){
  const c=$('#controls'); c.innerHTML='';
  ctlList().forEach(k=>{ const d=CTL[k]; const b=document.createElement('button'); b.className='ctl'; b.dataset.k=k;
    const refresh=()=>{ const on = d.toggle? M[d.toggle]>0 : false;
      if(d.toggle){ b.setAttribute('aria-pressed',on); } b.innerHTML=`${d.toggle&&on?d.on:d.label} <span class="k">${d.key}</span>`; };
    b.refresh=refresh; refresh();
    if(d.hold){
      const down=e=>{ e.preventDefault(); M.clenchT=1; b.classList.add('held'); }, up=()=>{ M.clenchT=0; b.classList.remove('held'); };
      b.addEventListener('pointerdown',down); ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,up));
      b.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); if(!e.repeat) down(e); } });
      b.addEventListener('keyup',e=>{ if(e.key===' '||e.key==='Enter') up(); });
    } else b.addEventListener('click',()=>act(k));
    c.appendChild(b); });
}
function act(k){
  const d=CTL[k];
  if(d.toggle) M[d.toggle]=M[d.toggle]?0:1;
  if(k==='blink') M.blinks.push({t:simT,counted:false});
  if(k==='left'||k==='right'){ M.gazeT=k==='left'?-1:1; M.gazeUntil=simT+1.6; M.looks[k==='left'?'L':'R']++; }
  if(k==='save'){ const d=new Date(); M.saves.unshift(`Recording ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.xlsx`); M.saves=M.saves.slice(0,3); }
  if(k==='connect'){ M.ble='picker'; renderControls(); renderReadout(); return; }
  if(k==='disconnect'){ M.ble='idle'; M.liveSince=null; M.eyesT=0; renderControls(); renderReadout(); return; }
  ROOT.querySelectorAll('.ctl').forEach(b=>b.refresh&&b.refresh());
}
function pair(){ M.ble='connecting'; renderReadout(); later(()=>{ if(M.ble!=='connecting') return; M.ble='live'; M.liveSince=simT; renderControls(); renderReadout(); },reduce?0:1100); }
on(document,'keydown',e=>{
  if(e.target.closest('input,textarea,.use-list,.tabs,.sw,.seg-mini,.ctl,.lobby,.picker') || e.metaKey||e.ctrlKey||e.altKey) return;
  const r=$('#useStage').getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
  const key=e.key===' '?'Space':e.key.length===1?e.key.toUpperCase():e.key;
  const k=ctlList().find(c=>CTL[c].key===key || CTL[c].code===e.key); if(!k) return;
  e.preventDefault();
  if(CTL[k].hold){ if(!e.repeat){ M.clenchT=1; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.add('held'); } }
  else if(!e.repeat) act(k);
});
on(document,'keyup',e=>{ if(e.key===' ' && U.controls.includes('clench')){ M.clenchT=0; ROOT.querySelector('.ctl[data-k="clench"]')?.classList.remove('held'); } });

function renderReadout(){
  const r=$('#readout'); const k=U.readout;
  if(k==='eyes') r.innerHTML=`<div class="row-flex"><div class="gazebox"><span class="gz" id="gz"></span><span class="gline"></span></div><div><div class="big" id="ro1">0</div><div class="muted">blinks detected</div><div class="muted" style="margin-top:8px" id="ro2">Looked left 0, right 0</div></div></div>`;
  if(k==='focus') r.innerHTML=`<div class="meters"><div class="meter"><div class="lab">Focus<b id="ro1">0.00</b></div><div class="track"><div class="fill" id="rf1"></div></div></div><div class="meter"><div class="lab">Relaxation<b id="ro2">0.00</b></div><div class="track"><div class="fill" id="rf2"></div></div></div></div>`;
  if(k==='muscle') r.innerHTML=`<div class="row-flex"><svg width="86" height="70" viewBox="0 0 86 70" aria-hidden="true"><rect x="36" y="4" width="14" height="20" rx="3" fill="#2a2e35"/><g id="jawL"><path d="M40,24 L22,40 L22,64 L30,64 L30,44 L42,32 Z" fill="#8b93a1"/></g><g id="jawR"><path d="M46,24 L64,40 L64,64 L56,64 L56,44 L44,32 Z" fill="#8b93a1"/></g></svg>
    <div style="flex:1;min-width:200px"><div class="meter"><div class="lab">Muscle activity<b id="ro1">0.00</b></div><div class="track" style="position:relative"><div class="fill" id="rf1"></div><span style="position:absolute;left:45%;top:-3px;bottom:-3px;width:2px;background:#fff"></span></div></div><div class="muted" style="margin-top:8px">Gripper <b id="ro2" style="color:var(--text)">open</b>, threshold 0.45</div></div></div>`;
  if(k==='heart') r.innerHTML=`<div class="row-flex"><svg width="46" height="42" viewBox="0 0 24 22" id="heartIcon" style="transition:transform .12s"><path d="M12 21s-9-5.6-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.4-9 12-9 12z" fill="var(--sig)"/></svg><div><div class="big" id="ro1">66</div><div class="muted">beats per minute, from R-peak timing</div></div></div>`;
  if(k==='vr') r.innerHTML=`<div class="osc">${['Delta','Theta','Alpha','Beta','Gamma'].map(b=>`<div><span class="addr">/avatar/parameters/EEG_${b}</span><span class="v" id="v${b}">0.00</span><span class="bar"><b id="b${b}" style="width:0"></b></span></div>`).join('')}</div>`;
  if(k==='home') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div class="lamp on" id="lamp"><svg viewBox="0 0 24 24" fill="none" stroke="#1b1204" stroke-width="1.8"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg></div>
    <div style="flex:1;min-width:240px;display:grid;gap:8px"><div class="rules"><div class="rule" id="rA"><span>Alpha on O1 above threshold</span><code>band_power_above</code></div><div class="rule" id="rB"><span>Alpha on O1 below threshold</span><code>band_power_below</code></div></div><pre class="payload" id="payload">No webhook fired yet. Close your eyes.</pre></div></div>`;
  if(k==='mobile') r.innerHTML=`<div class="row-flex" style="align-items:flex-start"><div class="phone"><div class="ph-top"><b>IronBCI</b><span class="blue">Connected</span></div><svg id="phSvg" viewBox="0 0 120 150" preserveAspectRatio="none"></svg><div class="ph-btn">Save</div></div>
    <div><div class="muted">Saved on the phone</div><div class="markers" id="saves" style="margin-top:6px">Nothing saved yet.</div></div></div>`;
  if(k==='browser'){
    const st=M.ble; let body='';
    if(st==='idle') body=`<div class="lobby"><b>Session lobby</b><span>No server needed for a direct Bluetooth connection.</span><button class="ctl" id="bConnect">Connect IronBCI (Bluetooth)</button></div>`;
    if(st==='picker') body=`<div class="picker"><b>cloud.pieeg.com wants to pair</b><div class="dev on"><span>IronBCI</span><i class="bars"><i></i><i></i><i></i></i></div><div class="dev"><span>Unknown or unsupported device</span></div><div class="pk-btns"><button class="ctl" id="bCancel">Cancel</button><button class="ctl primary" id="bPair">Pair</button></div></div>`;
    if(st==='connecting') body=`<div class="lobby"><span class="spin"></span><b>Connecting to IronBCI</b><span>Subscribing to the data stream…</span></div>`;
    if(st==='live') body=`<div class="lobby live"><b>Streaming 8 channels at 250 Hz</b><span>Filters: Hampel spike removal, 1 to 40 Hz band-pass</span></div>`;
    r.innerHTML=`<div class="browser"><div class="bbar"><i></i><i></i><i></i><span class="url">https://cloud.pieeg.com</span>${st==='live'?'<span class="badge">Bluetooth: IronBCI</span>':''}</div><div class="bbody">${body}</div></div>`;
    $('#bConnect')?.addEventListener('click',()=>act('connect'));
    $('#bCancel')?.addEventListener('click',()=>{ M.ble='idle'; renderControls(); renderReadout(); });
    $('#bPair')?.addEventListener('click',pair);
  }
}
let lastRO=0;
function updateReadout(now){
  if(now-lastRO<90) return; lastRO=now;
  const k=U.readout, B=bands();
  if(k==='eyes'){ $('#ro1').textContent=M.blinkCount; $('#ro2').textContent=`Looked left ${M.looks.L}, right ${M.looks.R}`; $('#gz').style.left=(50+M.gaze*38)+'%';
    const blinking=M.blinks.some(b=>simT-b.t>.05&&simT-b.t<.25); $('#gz').classList.toggle('blink',blinking);
    const px=M.gaze*2.6; ROOT.querySelectorAll('#pupils circle').forEach((c,i)=>c.setAttribute('cx',(i?347:312)+px)); }
  if(k==='focus'){ const f=clamp(((B.beta+B.gamma)/(B.alpha+B.theta+B.delta)-.18)/.95), r=clamp(B.alpha/(B.alpha+B.beta+B.theta+B.delta+B.gamma)*2.1-.05);
    $('#ro1').textContent=f.toFixed(2); $('#rf1').style.width=f*100+'%'; $('#ro2').textContent=r.toFixed(2); $('#rf2').style.width=r*100+'%'; }
  if(k==='muscle'){ const v=clamp(M.env); $('#ro1').textContent=v.toFixed(2); $('#rf1').style.width=v*100+'%'; const closed=v>.45;
    $('#ro2').textContent=closed?'closed':'open'; $('#jawL').setAttribute('transform',closed?'rotate(14 42 30)':''); $('#jawR').setAttribute('transform',closed?'rotate(-14 44 30)':''); }
  if(k==='heart'){ $('#ro1').textContent=Math.round(M.bpm); $('#heartIcon').style.transform=now-M.beat<140?'scale(1.18)':'scale(1)'; }
  if(k==='vr'){ for(const b of ['Delta','Theta','Alpha','Beta','Gamma']){ const v=B[b.toLowerCase()]; $('#v'+b).textContent=v.toFixed(2); $('#b'+b).style.width=v*100+'%'; } }
  if(k==='home'){ $('#lamp').classList.toggle('on',M.lamp); const recent=M.firedAt&&now-M.firedAt<1800;
    $('#rA').classList.toggle('fired',recent&&M.fired==='band_power_above'); $('#rB').classList.toggle('fired',recent&&M.fired==='band_power_below');
    if(M.payload) $('#payload').textContent=`POST https://maker.ifttt.com/trigger/…\n`+JSON.stringify(M.payload,null,2); }
  if(k==='mobile'){ const svg=$('#phSvg'); if(svg){ let h=''; ['Fp1','C3','O1','O2'].forEach((id,j)=>{ const c=CH[id]; let d=''; const n=60; for(let i=0;i<n;i++){ const idx=(head+1+Math.floor(i*(N-1)/(n-1)))%N; d+=(i?'L':'M')+(i*120/(n-1)).toFixed(1)+','+(18+j*36-clamp(c.buf[idx],-1.5,1.5)*9).toFixed(1); } h+=`<path d="${d}" fill="none" stroke="${COL.EEG}" stroke-width="1"/>`; }); svg.innerHTML=h; }
    $('#saves').innerHTML=M.saves.length?M.saves.join('<br>'):'Nothing saved yet.'; }
}

/* ---------- canvas ---------- */
const cv=$('#demoCanvas'), ctx=cv.getContext('2d'); let CW=0,CHh=0,rowH=40;
function sizeCanvas(){ const n=U.rows.length; rowH=n>6?26:n>4?36:n>2?46:58; const d=Math.min(2,devicePixelRatio||1);
  CW=cv.clientWidth; CHh=n*rowH+14; cv.width=CW*d; cv.height=CHh*d; cv.style.height=CHh+'px'; ctx.setTransform(d,0,0,d,0,0); }
on(window,'resize',sizeCanvas);
function drawCanvas(){
  const labelW=CW<460?92:120, W=CW-labelW-12;
  ctx.clearRect(0,0,CW,CHh);
  ctx.strokeStyle='rgba(0,0,0,.055)'; ctx.lineWidth=1;
  for(let s=0;s<=WIN;s++){ const x=labelW+W*s/WIN; ctx.beginPath(); ctx.moveTo(x,6); ctx.lineTo(x,CHh-6); ctx.stroke(); }
  ctx.font='12.5px -apple-system, BlinkMacSystemFont, sans-serif, sans-serif'; ctx.textBaseline='middle';
  let startX=labelW;
  if(U.id==='browser'){
    if(M.ble!=='live'){ U.rows.forEach((id,r)=>{ const y0=7+rowH*r+rowH/2; ctx.fillStyle='#6c737c'; ctx.fillText(CH[id].label,10,y0); ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(labelW,y0); ctx.lineTo(labelW+W,y0); ctx.stroke(); });
      ctx.fillStyle='#9aa2ad'; ctx.textAlign='center'; ctx.fillText(M.ble==='connecting'?'Connecting…':'No signal yet. Connect over Bluetooth.',labelW+W/2,CHh/2); ctx.textAlign='left'; return; }
    const age=simT-M.liveSince; if(age<WIN) startX=labelW+W*(1-age/WIN);
  }
  U.rows.forEach((id,r)=>{
    const c=CH[id], y0=7+rowH*r+rowH/2, amp=rowH*.42, col=COL[c.col];
    const hot = U.view!=='head' || U.hot.includes(id);
    ctx.fillStyle=hot?'#c7ccd3':'#6c737c'; ctx.fillText(c.label,10,y0);
    const derived=c.type==='env'||c.type==='alpha';
    const map = derived ? v=>y0+rowH*.4-v*rowH*.8 : v=>y0-clamp(v,-1.6,1.6)*amp*.62;
    if(derived){ ctx.setLineDash([4,4]); ctx.strokeStyle='rgba(255,255,255,.55)'; [c.thr,c.thrLow].filter(v=>v!=null).forEach(t=>{ ctx.beginPath(); ctx.moveTo(labelW,map(t)); ctx.lineTo(labelW+W,map(t)); ctx.stroke(); }); ctx.setLineDash([]); }
    if(startX>labelW){ ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.beginPath(); ctx.moveTo(labelW,y0); ctx.lineTo(startX,y0); ctx.stroke(); }
    ctx.strokeStyle=col; ctx.globalAlpha=hot?.95:.5; ctx.lineWidth=derived?2:1.3; ctx.beginPath(); let first=true;
    const step=Math.max(1,Math.floor(N/Math.min(N,W)));
    for(let i=0;i<N;i+=step){ const x=labelW+W*i/(N-1); if(x<startX) continue; const idx=(head+1+i)%N; const y=map(c.buf[idx]); first?ctx.moveTo(x,y):ctx.lineTo(x,y); first=false; }
    ctx.stroke(); ctx.globalAlpha=1;
  });
}

/* =========================================================
   HOW-TO WIDGETS
   ========================================================= */
function kitProgress(){ const all=[...ROOT.querySelectorAll('#kit input')], n=all.filter(i=>i.checked).length;
  $('#kitProgress').innerHTML = n===all.length ? '<b>Everything ready.</b> On to step 2.' : `<b>${n} of ${all.length}</b> ready`; $('#s1').classList.toggle('done',n===all.length); }
ROOT.querySelectorAll('#kit input').forEach(i=>i.addEventListener('change',kitProgress)); kitProgress();
ROOT.querySelectorAll('#quiet input').forEach(i=>i.addEventListener('change',()=>$('#s7').classList.toggle('done',[...ROOT.querySelectorAll('#quiet input')].every(x=>x.checked))));

// step 2: polarity
function drawPolarity(rev){
  const s=$('#polarity');
  const padY={plus:70,gnd:150}, plugY = rev? {red:150,black:70} : {red:70,black:150};
  const ok=!rev;
  s.innerHTML=`
    <rect x="300" y="24" width="200" height="190" rx="95" fill="#141619" stroke="rgba(255,255,255,.18)"/>
    <text x="400" y="200" text-anchor="middle" fill="#626973" style="font-size:12px">Underside of the board</text>
    <rect x="300" y="46" width="70" height="128" rx="6" fill="#f1f1ee"/>
    <g style="font-size:13px;font-weight:700">
      <rect x="376" y="${padY.plus-12}" width="72" height="24" rx="5" fill="#2a1519" stroke="#e5484d"/><text x="412" y="${padY.plus+4}" text-anchor="middle" fill="#ff8a8f">+3.7 V</text>
      <rect x="376" y="${padY.gnd-12}" width="72" height="24" rx="5" fill="#15171a" stroke="#8b93a1"/><text x="412" y="${padY.gnd+4}" text-anchor="middle" fill="#cfd4da">GND</text>
    </g>
    <rect x="20" y="70" width="140" height="80" rx="9" fill="#c9ced5" stroke="#eef0f3"/><rect x="30" y="80" width="80" height="60" rx="4" fill="#2e7a4a"/>
    <text x="40" y="106" fill="#e9f5ee" style="font-size:12px;font-weight:700">3.7 V LiPo</text><text x="40" y="122" fill="#e9f5ee" style="font-size:11px">200 mAh</text>
    <path d="M160,96 C230,96 250,${plugY.red} 330,${plugY.red}" stroke="#e5484d" stroke-width="4" fill="none"/>
    <path d="M160,124 C230,124 250,${plugY.black} 330,${plugY.black}" stroke="#202328" stroke-width="4" fill="none"/>
    <circle cx="340" cy="${plugY.red}" r="6" fill="#e5484d"/><circle cx="340" cy="${plugY.black}" r="6" fill="#43474e" stroke="#8b93a1"/>
    <path d="M346,${plugY.red} H376" stroke="${ok?'#45dd8b':'#ff5a74'}" stroke-width="2.5" stroke-dasharray="${ok?'0':'4 3'}"/>
    <path d="M346,${plugY.black} H376" stroke="${ok?'#45dd8b':'#ff5a74'}" stroke-width="2.5" stroke-dasharray="${ok?'0':'4 3'}"/>
    <text x="462" y="${padY.plus+5}" fill="${ok?'#45dd8b':'#ff5a74'}" style="font-size:18px;font-weight:800">${ok?'✓':'✕'}</text>
    <text x="462" y="${padY.gnd+5}" fill="${ok?'#45dd8b':'#ff5a74'}" style="font-size:18px;font-weight:800">${ok?'✓':'✕'}</text>`;
  const v=$('#verdict'); v.className='verdict '+(ok?'ok':'bad');
  v.innerHTML= ok ? '<b>Polarity matches.</b> Red to +3.7 V, black to GND. Safe to plug in.' : '<b>Reversed. Don’t plug this in.</b> Red would land on GND and damage the board. Use a battery with the correct plug, or have the connector re-pinned.';
  $('#s2').classList.toggle('done',!!(ok && drawPolarity.touched));
}
ROOT.querySelectorAll('#polSeg button').forEach(b=>b.addEventListener('click',()=>{ drawPolarity.touched=true; ROOT.querySelectorAll('#polSeg button').forEach(x=>x.setAttribute('aria-pressed',x===b)); drawPolarity(b.dataset.p==='rev'); }));
drawPolarity(false);

// steps 3 and 4: switches and charging share state
const SW={s1:false,s2:false,plugged:false,level:42,timer:null};
function swMode(){ if(!SW.s1) return 'off'; return SW.s2?'run':'charge'; }
function renderSwitches(){
  $('#sw1').setAttribute('aria-checked',SW.s1); $('#sw2').setAttribute('aria-checked',SW.s2);
  const m=swMode(), st=$('#swState');
  const bleLed=`<span class="led blue ${m==='run'&&!reduce?'blinking':''} ${m==='run'?'lit':''}"></span>`;
  st.innerHTML = m==='run' ? `${bleLed}<div><b>Normal use.</b> Advertising over Bluetooth and ready to pair.${SW.plugged?' <span class="warn">Unplug the charger before recording.</span>':''}</div>`
    : m==='charge' ? `${bleLed}<div><b>Charging mode.</b> Battery connected, data off. Safe to plug in the charger.</div>`
    : `${bleLed}<div><b>Off.</b> Switch 1 disconnects the battery.</div>`;
  $('#s3').classList.toggle('done',m==='run');
  renderCharge();
}
function renderCharge(){
  const m=swMode(), full=SW.level>=100;
  $('#led1').classList.toggle('lit',SW.plugged&&!full); $('#led2').classList.toggle('lit',SW.plugged&&full);
  $('#lvl').style.width=SW.level+'%'; $('#lvlTxt').textContent=Math.round(SW.level)+'%';
  $('#plugBtn').textContent=SW.plugged?'Unplug the charger':'Plug in the charger';
  const cs=$('#chState');
  if(!SW.plugged) cs.innerHTML = m==='charge' ? 'Switches set for charging. Plug in the cable.' : `Set switch 1 on and switch 2 off first. Right now: switch 1 ${SW.s1?'on':'off'}, switch 2 ${SW.s2?'on':'off'}.`;
  else if(m==='run') cs.innerHTML='<span class="warn">Switch 2 is on. Don’t record while charging: turn switch 2 off.</span>';
  else if(m==='off') cs.innerHTML='<span class="warn">Switch 1 is off, so the battery isn’t connected to the charger.</span>';
  else cs.innerHTML = full ? '<b>Fully charged.</b> Unplug, then set switch 2 on to record.' : 'Charging…';
  $('#s4').classList.toggle('done',full);
}
$('#sw1').addEventListener('click',()=>{ SW.s1=!SW.s1; renderSwitches(); });
$('#sw2').addEventListener('click',()=>{ SW.s2=!SW.s2; renderSwitches(); });
$('#plugBtn').addEventListener('click',()=>{ SW.plugged=!SW.plugged; clearInterval(SW.timer);
  if(SW.plugged) SW.timer=every(()=>{ if(swMode()==='charge' && SW.level<100){ SW.level=Math.min(100,SW.level+2.5); } renderCharge(); },120);
  renderSwitches(); });
renderSwitches();

// step 5: wiring map
(function(){
  const s=$('#wire'), cx=150, cy=196, R=118;
  const pins=[...MONT.map((n,i)=>({label:'CH'+(i+1),to:n,desc:n})),{label:'BIAS',to:'earR',desc:'Right earlobe clip',ref:true},{label:'REF',to:'earL',desc:'Left earlobe clip',ref:true}];
  const pos=n=> n==='earL'?{x:cx-R-12,y:cy}: n==='earR'?{x:cx+R+12,y:cy}:{x:cx+P1020[n][0]*R*.86,y:cy-P1020[n][1]*R*.86};
  let h=`<ellipse cx="${cx-R-4}" cy="${cy}" rx="12" ry="26" fill="#23272e"/><ellipse cx="${cx+R+4}" cy="${cy}" rx="12" ry="26" fill="#23272e"/>
    <path d="M${cx-16},${cy-R+6} Q${cx},${cy-R-26} ${cx+16},${cy-R+6}" fill="#262a31"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="#1f232a" stroke="rgba(255,255,255,.12)"/><circle cx="${cx}" cy="${cy}" r="${R*.43}" fill="none" stroke="rgba(63,200,255,.12)"/>
    <rect x="440" y="24" width="44" height="${pins.length*32+8}" rx="6" fill="#15161a"/><text x="462" y="14" text-anchor="middle" fill="#626973" style="font-size:12px">Header</text><g id="wires"></g>`;
  pins.forEach((p,i)=>{ const y=44+i*32; p.py=y; h+=`<g class="pin" data-i="${i}" style="cursor:pointer"><rect x="456" y="${y-6}" width="12" height="12" fill="#e3c15f"/><text x="496" y="${y+4}" fill="#cfd4da" style="font-size:13px;font-weight:600">${p.label}</text></g>`; });
  pins.forEach((p,i)=>{ const q=pos(p.to); p.q=q;
    h+=`<g class="edot" data-i="${i}" style="cursor:pointer">${p.ref?`<path d="M${q.x},${q.y-8} L${q.x+8},${q.y} L${q.x},${q.y+8} L${q.x-8},${q.y} Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.6"/>`:
      `<circle cx="${q.x}" cy="${q.y}" r="8" fill="#12151a" stroke="#3fc8ff" stroke-width="2"/><circle cx="${q.x}" cy="${q.y}" r="3" fill="#3fc8ff"/><text x="${q.x}" y="${q.y+22}" text-anchor="middle" fill="#9aa2ad" style="font-size:11.5px">${p.to}</text>`}</g>`; });
  s.innerHTML=h;
  const wires=s.querySelector('#wires');
  pins.forEach(p=>{ const q=p.q, path=document.createElementNS(NS,'path');
    path.setAttribute('d', p.to==='earL' ? `M${q.x},${q.y} C${q.x-10},${q.y+176} 330,${p.py} 456,${p.py}` : `M${q.x},${q.y} C${q.x+90},${q.y} 380,${p.py} 456,${p.py}`);
    path.setAttribute('fill','none'); path.setAttribute('stroke',p.ref?'#e8ebef':'#3fc8ff'); path.setAttribute('stroke-width','1.4'); path.setAttribute('stroke-opacity','.35'); p.path=path; wires.appendChild(path); });
  $('#wireList').innerHTML=pins.map((p,i)=>`<div data-i="${i}"><b>${p.label}</b><span>${p.desc}</span></div>`).join('');
  const hl=i=>{ pins.forEach((p,j)=>{ p.path.setAttribute('stroke-opacity', i==null?.35: i===j?1:.08); p.path.setAttribute('stroke-width',i===j?2.6:1.4); });
    s.querySelectorAll('.pin,.edot').forEach(n=>n.style.opacity= i==null||+n.dataset.i===i ? 1 : .3);
    ROOT.querySelectorAll('#wireList div').forEach(n=>n.classList.toggle('on',+n.dataset.i===i)); };
  [...s.querySelectorAll('.pin,.edot'),...ROOT.querySelectorAll('#wireList div')].forEach(n=>{ n.addEventListener('pointerenter',()=>hl(+n.dataset.i)); n.addEventListener('pointerleave',()=>hl(null)); });
})();

// steps 6 and 8: code tabs
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const C=t=>`<span class="c">${esc(t)}</span>`, P=t=>`<span class="p">${t}</span>`;
const PAIR={
  'Browser':`${C('# no install: Chrome or Edge, over HTTPS')}
open https://cloud.pieeg.com

${C('# click "Connect IronBCI (Bluetooth)"')}
${C('# pick your board in the dialog, then Pair')}`,
  'PiEEG Server':`pip install "pieeg-server[ironbci]"

${P('pieeg-server')} --device ironbci8                      ${C('# scan for the board')}
${P('pieeg-server')} --device ironbci8 --ble-name MyBoard   ${C('# custom name')}
${P('pieeg-server')} --device ironbci8 --ble-address AA:BB:CC:DD:EE:FF`,
  'JavaScript':esc(`<script src="https://cdn.jsdelivr.net/gh/pieeg-club/PiEEG-server@main/pieeg.js"><\/script>
<script>
  const pieeg = new PiEEG();
  // Web Bluetooth needs a user gesture, so connect on click
  button.onclick = async () => {
    await pieeg.connectBLE();          // IronBCI-8 is the default
    pieeg.onBandPowers(() => {
      console.log(pieeg.getRelaxationIndex());
    });
  };
<\/script>`),
  'Android and Python':`${C('# Android: open-source app, pair and launch')}
${C('# live signal, on-device processing, save to Excel')}
https://github.com/pieeg-club/ironbci/tree/master/SDK

${C('# Python SDK: BLE streaming, filtering, plots, save to file')}
https://github.com/pieeg-club/ironbci`
};
const REC={
  'Server':`${C('# record while streaming')}
${P('pieeg-server')} --device ironbci8 --record session.csv

${C('# or a standalone 5-minute recording')}
${P('pieeg-server')} record session.csv --duration 300 --device ironbci8`,
  'Browser':`${C('# in cloud.pieeg.com, press Record')}
${C('# press it again to stop: the tab downloads')}
pieeg_YYYYMMDD_HHMMSS.csv   ${C('# same format as the server')}`,
  'Python':`${C('# with pieeg-server --device ironbci8 running')}
import asyncio, json, websockets

async def main():
    async with websockets.connect("ws://localhost:1616") as ws:
        async for msg in ws:
            frame = json.loads(msg)
            print(frame["n"], frame["channels"])

asyncio.run(main())`,
  'LSL and OSC':`${P('pieeg-server')} --device ironbci8 --lsl   ${C('# OpenViBE, MNE, LabRecorder')}
${P('pieeg-server')} --device ironbci8 --osc   ${C('# VRChat avatar parameters')}`
};
function tabs(el,pre,set){ const t=$(el); Object.keys(set).forEach((k,i)=>{ const b=document.createElement('button'); b.setAttribute('role','tab'); b.textContent=k;
  b.addEventListener('click',()=>{ t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b)); $(pre).innerHTML=set[k]; }); t.appendChild(b); if(!i) b.click(); }); }
tabs('#pairTabs','#code-pair',PAIR); tabs('#codeTabs','#code-tab',REC);
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
selectUse(USES.some(u=>u.id===start)?start:'eyes');
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
  intervals.forEach((id) => clearInterval(id));
  intervals.clear();
  cleanups.forEach((fn) => fn());
  ROOT.innerHTML = PRISTINE;
};
}
