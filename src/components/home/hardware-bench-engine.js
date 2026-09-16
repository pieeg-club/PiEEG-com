/* Generated from tmp/new pages prototypes. Do not edit by hand. */
export function mountHardwareBench(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;


/* ============================================================
   Config
   ============================================================ */
const PAGE = {pieeg:'/hardware/pieeg','pieeg-16':'/hardware/pieeg-16',ironbci:'/hardware/ironbci','ironbci-32':'/hardware/ironbci-32','pieeg-xr':'/xr','octopus-16':'/hardware/octopus-16',jneeg:'/hardware/jneeg',ardeeg:'/hardware/ardeeg',microbci:'/hardware/microbci'};
const MODE_COLOR = {EEG:'#22d3ee', EMG:'#f59e0b', ECG:'#f43f5e', EOG:'#a78bfa'};
const MODE_NAME  = {EEG:'brain', EMG:'muscle', ECG:'heart', EOG:'eye movement'};
const C = {power:'#34d399', data:'#38bdf8', neutral:'#a1a1aa'};

/* ============================================================
   Devices (from the PiEEG docs and PiEEG-server drivers)
   ============================================================ */
const DEVICES = [
{
  id:'pieeg', name:'PiEEG-8', meta:'8 ch, Pi 3/4/5', badge:'Most popular',
  tagline:'8-channel Raspberry Pi shield', filters:['rpi','8'], ch:8,
  summary:'Plugs onto the Raspberry Pi GPIO header and turns it into a biosignal lab. PiEEG Server streams and records the data.',
  modes:['EEG','EMG','ECG'], electrodes:['dry','wet'], rig:'shield-monitor',
  host:'rpi', shield:'#e9a526', rate:250, docs:'pieeg',
  spec:{ board:'ADS1299, 24-bit, gain 1 to 24', host:'Raspberry Pi 3, 4 or 5',
    link:'SPI through the 40-pin GPIO header. PiEEG Server streams over WebSocket, LSL and OSC.',
    rate:'250 SPS to 16 kSPS', power:'5 V power bank, at least 3 A, up to 10,000 mAh' },
  need:['Raspberry Pi 3, 4 or 5 with a microSD card','5 V power bank, 3 A or more','8 electrodes and 2 ear clips','EEG cap','Keyboard, mouse and a portable monitor'],
  safety:'Run everything from the power bank. Keep the Pi and the monitor off mains power while electrodes are on the body.'
},
{
  id:'pieeg-16', name:'PiEEG-16', meta:'16 ch, Pi 5',
  tagline:'16-channel Raspberry Pi shield', filters:['rpi','16'], ch:16,
  summary:'Two ADS1299 chips in a daisy chain double the channel count for fuller scalp coverage and denser EMG.',
  modes:['EEG','EMG','ECG'], electrodes:['dry','wet'], rig:'shield-monitor',
  host:'rpi', shield:'#c4449f', rate:250, docs:'pieeg-16',
  spec:{ board:'Two ADS1299 in daisy chain, 24-bit', host:'Raspberry Pi 5',
    link:'SPI through the 40-pin GPIO header. PiEEG Server streams over WebSocket, LSL and OSC.',
    rate:'250 SPS to 16 kSPS', power:'5 V power bank, at least 3 A, up to 10,000 mAh' },
  need:['Raspberry Pi 5 with a microSD card','5 V power bank, 3 A or more','16 electrodes and 2 ear clips','EEG cap','Keyboard, mouse and a portable monitor'],
  safety:'Run everything from the power bank. Keep the Pi and the monitor off mains power while electrodes are on the body.'
},
{
  id:'ironbci', name:'IronBCI', meta:'8 ch, Bluetooth LE',
  tagline:'8-channel wearable over Bluetooth LE', filters:['wireless','8'], ch:8,
  summary:'A standalone board you wear. No Raspberry Pi needed: it runs on a small LiPo and streams to a laptop or phone over Bluetooth LE.',
  modes:['EEG','EMG','ECG','EOG'], electrodes:['dry','wet'], rig:'body-ble', body:'ironbci', rate:250, docs:'ironbci',
  spec:{ board:'ADS1299, 24-bit', host:'None. Streams to a laptop, phone or tablet',
    link:'Bluetooth LE to PiEEG Server, the Android app or the Python SDK',
    rate:'250 SPS', power:'LiPo battery, 200 mAh, 2.0 mm JST. Charges over Micro USB' },
  need:['LiPo battery, 200 mAh with a 2.0 mm JST plug','8 electrodes and 2 ear clips','EEG cap, arm band or chest strap','Laptop or Android phone with Bluetooth'],
  safety:'Check the battery polarity before the first connection: a reversed JST plug damages the board. Don’t record while charging. To charge, set switch 1 on and switch 2 off.'
},
{
  id:'ironbci-32', name:'IronBCI-32', meta:'32 ch, USB serial',
  tagline:'32-channel high-density EEG', filters:['16'], ch:32,
  summary:'The highest channel count in the family. Full-scalp coverage with wet electrodes, streamed to a laptop over USB and ready for BrainFlow.',
  modes:['EEG','EMG','ECG','EOG'], electrodes:['wet'], rig:'usb-box', rate:500, docs:'ironbci-32',
  spec:{ board:'Four AD7771 converters with an STM32H7, 24-bit', host:'Laptop or desktop, running on battery',
    link:'USB serial at 921,600 baud, FreeEEG frames. Works with BrainFlow and PiEEG Server.',
    rate:'500 SPS', power:'5 V USB power bank on its own cable. Mains power is not allowed.' },
  need:['5 V USB power bank','Two Micro USB cables: one for power, one full data cable','32 wet Ag/AgCl electrodes, conductive gel and 2 ear clips','EEG cap','Laptop running on its battery'],
  safety:'Power the board from the 5 V battery only, and unplug the laptop from mains before you connect it. This keeps the body isolated from the grid and removes 50/60 Hz noise.'
},
{
  id:'pieeg-xr', name:'PiEEG XR', meta:'8 ch, VR mask',
  tagline:'Neural face interface for VR', filters:['wireless','8'], ch:8,
  summary:'A silicone face mask with ten flat dry electrodes replaces your headset’s facial interface. Expressions and focus flow into WebXR or VRChat over OSC.',
  modes:['EMG','EEG'], electrodes:['dry'], rig:'xr', rate:250, docs:'PiEEG_XR',
  spec:{ board:'Dual ADS1299 with an STM32WB, 1.0 µVpp noise', host:'A VR headset',
    link:'Bluetooth LE 5. Advertises as “PiEEG XR”. OSC bridge for VRChat.',
    power:'5 V USB-C power bank, or the headset’s own battery' },
  need:['A supported VR headset','5 V USB-C power bank (a USB-C to USB-A cable works best)','The mask and enclosure made for your headset model'],
  safety:'Each mask and enclosure is shaped for one headset model. Use the unit made for yours.'
},
{
  id:'octopus-16', name:'Octopus 16', meta:'16 ch, ESP32-S3',
  tagline:'16-channel wearable on a Seeed XIAO ESP32-S3', filters:['wireless','16'], ch:16,
  summary:'Spring-loaded pogo pins press straight onto the scalp, so there are no loose electrode cables. Worn over the visual cortex.',
  modes:['EEG','EMG','ECG'], electrodes:['dry'], rig:'body-ble', body:'octopus', rate:250, docs:'Octopus_16',
  spec:{ board:'Two ADS131M08, 24-bit', host:'Seeed Studio XIAO ESP32-S3 on the board',
    link:'Bluetooth LE to PiEEG Server or the browser SDK',
    rate:'250 SPS', power:'Small 5 V power bank, up to 300 mAh, 2 A max' },
  need:['Seeed Studio XIAO ESP32-S3 with its BLE antenna','Small 5 V power bank, up to 300 mAh','A belt or band to hold it over the back of the head'],
  safety:'Keep the pogo pins clean with 90% isopropyl alcohol. Never use oil or grease on them.'
},
{
  id:'jneeg', name:'JNEEG', meta:'8 ch, Jetson Nano',
  tagline:'8-channel shield for NVIDIA Jetson Nano', filters:['8'], ch:8,
  summary:'The PiEEG shield on a Jetson Nano, so you can run machine-learning models on the GPU right next to the signal.',
  modes:['EEG','EMG','ECG'], electrodes:['dry','wet'], rig:'shield-monitor', host:'jetson', shield:'#2f86d6', rate:250, docs:'jneeg',
  spec:{ board:'ADS1299, 24-bit', host:'NVIDIA Jetson Nano',
    link:'SPI through the Jetson GPIO header. PiEEG Server runs with the jneeg profile.',
    rate:'250 SPS', power:'5 V power bank, at least 3 A, up to 10,000 mAh' },
  need:['Jetson Nano with a microSD card','5 V power bank, 3 A or more','8 electrodes and 2 ear clips','EEG cap','Keyboard, mouse and a portable monitor'],
  safety:'Run everything from the power bank. Keep the Jetson and the monitor off mains power while electrodes are on the body.'
},
{
  id:'ardeeg', name:'ardEEG', meta:'8 ch, Arduino R4',
  tagline:'8-channel shield for Arduino UNO R4', filters:['8'], ch:8,
  summary:'The lowest-cost way in. The Arduino sends data over Wi-Fi to a Python script on your computer.',
  modes:['EEG','EMG','ECG'], electrodes:['dry','wet'], rig:'shield-wireless', host:'arduino', shield:'#d9642b', air:'wifi', rate:250, docs:'ardeeg',
  spec:{ board:'ADS1299, 24-bit', host:'Arduino UNO R4',
    link:'Wi-Fi to a Python script on a computer on the same network',
    power:'Small 5 V power bank, 1 A max, up to 1,000 mAh' },
  need:['Arduino UNO R4','Small 5 V power bank, 1 A max','8 electrodes and 2 ear clips','EEG cap','A computer on the same Wi-Fi network'],
  safety:'Upload the sketch over USB, then unplug it. During measurement the Arduino runs from the power bank only, never from a PC port or wall adapter.'
},
{
  id:'microbci', name:'MicroBCI', meta:'8 ch, STM32',
  tagline:'8-channel shield for NUCLEO-WB55', filters:['wireless','8'], ch:8,
  summary:'Brings EEG to the STM32WB Nucleo board, with Bluetooth firmware, a mobile SDK and a Python SDK.',
  modes:['EEG','EMG'], electrodes:['dry','wet'], rig:'shield-wireless', host:'nucleo', shield:'#37a36f', air:'ble', rate:250, docs:'microbci',
  spec:{ board:'ADS1299, 24-bit', host:'STM32 NUCLEO-WB55',
    link:'Bluetooth LE to the mobile SDK or the Python SDK',
    power:'Small 5 V power bank, up to 1 A' },
  need:['NUCLEO-WB55 board and a Micro USB cable','Small 5 V power bank','8 electrodes and 2 ear clips','EEG cap or EMG kit'],
  safety:'Keep the board fully isolated from mains during measurement. A 5 V battery is the only allowed supply.'
}
];

/* ============================================================
   Geometry: body, 10-20 positions, placements
   ============================================================ */
const HEAD = {cx:330, cy:139, R:51};
const CAP_R = 51;
const P1020 = {
  Fp1:[-.31,.95],Fp2:[.31,.95],AF3:[-.33,.76],AF4:[.33,.76],
  F7:[-.81,.59],F3:[-.40,.53],Fz:[0,.5],F4:[.40,.53],F8:[.81,.59],
  FC5:[-.72,.28],FC1:[-.24,.25],FC2:[.24,.25],FC6:[.72,.28],
  T7:[-1,0],C3:[-.5,0],Cz:[0,0],C4:[.5,0],T8:[1,0],
  CP5:[-.72,-.28],CP1:[-.24,-.25],CP2:[.24,-.25],CP6:[.72,-.28],
  P7:[-.81,-.59],P3:[-.40,-.53],Pz:[0,-.5],P4:[.40,-.53],P8:[.81,-.59],
  PO3:[-.33,-.76],PO4:[.33,-.76],O1:[-.31,-.95],Oz:[0,-1],O2:[.31,-.95]
};
const MONTAGE = {
  8:['Fp1','Fp2','C3','C4','P7','P8','O1','O2'],
  16:['Fp1','Fp2','F7','F3','F4','F8','T7','C3','C4','T8','P7','P3','P4','P8','O1','O2'],
  32:['Fp1','Fp2','AF3','AF4','F7','F3','Fz','F4','F8','FC5','FC1','FC2','FC6','T7','C3','Cz','C4','T8','CP5','CP1','CP2','CP6','P7','P3','Pz','P4','P8','PO3','PO4','O1','Oz','O2'],
  occ16:['C3','C4','CP5','CP1','CP2','CP6','P7','P3','Pz','P4','P8','PO3','PO4','O1','Oz','O2']
};
// The model faces us, so its left ear is on our right.
function project(tx,ty){
  const r=Math.hypot(tx,ty), phi=r*Math.PI/2, a=Math.atan2(-tx,ty); // mirror: subject's left appears on viewer's right
  const X=Math.sin(phi)*Math.sin(a), F=Math.sin(phi)*Math.cos(a), Z=Math.cos(phi);
  return {x:HEAD.cx+CAP_R*X, y:HEAD.cy-CAP_R*Z, front:F};
}
const lerp=(a,b,t)=>a+(b-a)*t;
function along(p,q,t,off){ // point along segment p->q with perpendicular offset
  const dx=q[0]-p[0], dy=q[1]-p[1], L=Math.hypot(dx,dy);
  return {x:p[0]+dx*t+(-dy/L)*off, y:p[1]+dy*t+(dx/L)*off};
}
// Model's left arm (viewer's right): centre lines
const FORE=[[455,448],[470,560]], UPPER=[[440,350],[455,440]];
function emgSites(n){
  const s=[], rows=n>8?5:4;
  for(let r=0;r<rows;r++) for(const c of [-7.5,7.5]){ s.push({...along(FORE[0],FORE[1],.14+r*(.66/(rows-1)),c), label:`Forearm ${s.length+1}`}); }
  if(n>8){ let k=1; for(let r=0;r<3;r++) for(const c of [-8,8]) s.push({...along(UPPER[0],UPPER[1],.34+r*.24,c), label:`Upper arm ${k++}`}); }
  return s.slice(0,Math.min(n,16));
}
const ECG_SITES=[{x:390,y:318,label:'Lead I'},{x:398,y:482,label:'Lead II'},{x:378,y:404,label:'V4'}];
const EOG_SITES=[{x:304,y:152,label:'Right canthus'},{x:356,y:152,label:'Left canthus'},{x:345,y:140,label:'Above left eye'},{x:345,y:168,label:'Below left eye'}];
const XR_SITES=[
  {x:296,y:146,label:'Forehead R2'},{x:318,y:144,label:'Forehead R1'},{x:342,y:144,label:'Forehead L1'},{x:364,y:146,label:'Forehead L2'},
  {x:273,y:170,label:'Temple right'},{x:387,y:170,label:'Temple left'},{x:298,y:197,label:'Cheek right'},{x:362,y:197,label:'Cheek left'}];
const XR_REF={x:319,y:188,label:'Reference, mask'}, XR_BIAS={x:341,y:188,label:'Bias, mask'};

const COLLECT = {EEG:{x:402,y:188}, EOG:{x:402,y:188}, EMG:{x:492,y:560}, ECG:{x:430,y:505}};
const BODY_POS = {EEG:{x:414,y:118}, EOG:{x:414,y:118}, EMG:{x:455,y:328}, ECG:{x:330,y:452}};

function layout(dev, mode){
  const L = {ch:[], ref:null, bias:null, leads:.55, note:'', mapShown:false};
  if(dev.rig==='xr'){
    L.ch = XR_SITES.map((p,i)=>({...p, x:330+(p.x-330)*.76, y:p.y-20, visible:true}));
    L.ref={...XR_REF,x:322,y:168}; L.bias={...XR_BIAS,x:338,y:168}; L.leads=0;
    L.collector={x:414,y:160};
    L.note = mode==='EMG'
      ? 'Ten flat dry Ag/AgCl pads sit inside the silicone mask: eight channels plus reference and bias. Smiles, frowns and brow raises show up as facial EMG.'
      : 'The same forehead pads pick up frontal EEG, the basis for focus and relaxation scores in XR.';
    return L;
  }
  if(mode==='EEG'){
    const names = dev.id==='octopus-16' ? MONTAGE.occ16 : MONTAGE[dev.ch];
    L.ch = names.map(n=>{ const p=project(...P1020[n]); return {x:p.x,y:p.y,label:n,visible:p.front>-0.03,topo:P1020[n]}; });
    L.ref={x:373,y:177,label:'Reference, left ear clip'}; L.bias={x:287,y:177,label:'Bias, right ear clip'};
    L.leads=0; L.mapShown=true;
    const hidden=L.ch.filter(c=>!c.visible).length;
    L.note = dev.id==='octopus-16'
      ? 'Pogo pins cover the back of the head, over the visual cortex. The map shows all 16 positions.'
      : `${names.length} positions on the 10-20 system. The model shows the front half; ${hidden} more sit on the back of the head.`;
  } else if(mode==='EMG'){
    L.ch = emgSites(dev.ch).map(p=>({...p,visible:true}));
    L.ref={x:478,y:447,label:'Reference, elbow'}; L.bias={x:478,y:575,label:'Bias, wrist'};
    const used=L.ch.length;
    L.note = `${used} channels along the forearm${used>8?' and upper arm':''}, over the flexor and extensor muscles. Reference on the elbow bone, bias on the wrist.` + (dev.ch>used?` ${dev.ch-used} channels stay free for other muscles.`:'');
  } else if(mode==='ECG'){
    L.ch = ECG_SITES.map(p=>({...p,visible:true}));
    L.ref={x:270,y:318,label:'Reference, below right collarbone'}; L.bias={x:262,y:482,label:'Bias, lower right ribs'};
    L.note = `Three channels: Lead I, Lead II and chest lead V4. Reference below the right collarbone, bias on the lower right ribs.${dev.ch>3?` ${dev.ch-3} channels stay free.`:''}`;
  } else if(mode==='EOG'){
    L.ch = EOG_SITES.map(p=>({...p,visible:true}));
    L.ref={x:373,y:177,label:'Reference, left ear clip'}; L.bias={x:287,y:177,label:'Bias, right ear clip'};
    L.note = `Electrodes at the outer corners of the eyes track left-right gaze. Above and below one eye they catch blinks. Uses 4 of ${dev.ch} channels.`;
  }
  L.collector = dev.rig==='body-ble' ? {...BODY_POS[mode]} : {...COLLECT[mode]};
  if(dev.rig==='body-ble' && mode==='EEG' && dev.id==='octopus-16') L.collector={x:394,y:98};
  return L;
}

/* ============================================================
   SVG helpers
   ============================================================ */
const NS='http://www.w3.org/2000/svg';
const $=s=>root.querySelector(s);
const svg=$('#hw-scene');
function el(tag,attrs={},parent){ const e=document.createElementNS(NS,tag); for(const k in attrs) e.setAttribute(k,attrs[k]); if(parent) parent.appendChild(e); return e; }
function wrapText(str,max){ const w=str.split(' '),out=[]; let line=''; for(const x of w){ if((line+' '+x).trim().length>max){out.push(line.trim());line=x;} else line+=' '+x; } if(line.trim())out.push(line.trim()); return out; }
function textBlock(x,y,lines,cls='t-sub',lh=17,anchor='start'){ return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${lines.map((l,i)=>`<tspan x="${x}" dy="${i?lh:0}">${l}</tspan>`).join('')}</text>`; }
function callout(x,y,main,sub,anchor='start'){ return `<text x="${x}" y="${y}" text-anchor="${anchor}"><tspan class="t-main" x="${x}">${main}</tspan>${sub?`<tspan class="t-sub" x="${x}" dy="17">${sub}</tspan>`:''}</text>`; }

// Product photographs supplied in PiEEG-com-main.zip (public/products and public/news-images).
const PRODUCT_PHOTOS = {"pieeg":"/products/pieeg.png","pieeg-16":"/products/pieeg16.jpg","ironbci":"/products/ironbci.jpg","ironbci-32":"/products/ironbci-32-main.png","pieeg-xr":"/xr/xr-headset-main.png","octopus-16":"/products/octopus16.png","jneeg":"/products/jneeg.png","ardeeg":"/products/ardeeg.png","microbci":"/products/microbci.png","cap8-dry":"/products/cap8-dry.png","cap8-wet":"/products/cap8-wet.jpg","cap16":"/products/cap16.png","cap32-wet":"/products/cap32-wet.webp"};
function productPhoto(key,x,y,w,h,part='device'){
  return `<image class="product-photo" data-part="${part}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" href="${PRODUCT_PHOTOS[key]}"/>`;
}
function capPhotoKey(dev){
  if(state.mode!=='EEG'||dev.rig==='xr'||dev.id==='octopus-16') return null;
  if(dev.ch===32) return 'cap32-wet';
  if(dev.ch===16) return 'cap16';
  return state.gel==='wet'?'cap8-wet':'cap8-dry';
}

/* ---------- figure ---------- */
function mirror(d){ return d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g,(m,x,y)=>`${660-parseFloat(x)},${y}`); }
const ARM_R='M252,300 C226,298 208,312 204,338 C198,380 192,410 190,440 C186,480 181,522 177,566 L205,568 C208,530 214,490 218,452 C222,420 230,390 236,356 Z';
const HAND_R='M177,564 C170,584 172,606 182,617 C192,623 205,616 207,600 C209,588 207,576 205,566 Z';
function drawFigure(){
  const g=$('#hw-lFigure');
  g.innerHTML=`<image x="60" y="42" width="540" height="640" preserveAspectRatio="none" href="/home/body-figure.png"/>`;
}

/* ---------- worn items: cap, straps, headset ---------- */
function drawWear(dev,mode){
  const g=$('#hw-lWear'); let h='';
  if(dev.rig==='xr'){
    h+=`<g data-part="device" class="fade-in" transform="translate(79.2 -20) scale(.76 1)">
      <path d="M262,150 C250,146 244,160 250,172 M398,150 C410,146 416,160 410,172" stroke="#2b3038" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M256,142 C256,132 268,130 330,130 C392,130 404,132 404,142 L404,196 C404,210 388,214 372,210 C356,206 350,192 330,192 C310,192 304,206 288,210 C272,214 256,210 256,196 Z" fill="rgba(34,38,46,.55)" stroke="#8b93a1" stroke-opacity=".6" stroke-width="1.5"/>
      <path d="M262,138 L398,138" stroke="rgba(255,255,255,.12)"/>
      <rect x="402" y="140" width="26" height="36" rx="6" fill="#20242b" stroke="#5a616d"/>
      <circle cx="415" cy="150" r="2.4" fill="${C.data}"/>
    </g>
    <g data-part="electrodes">${callout(440,214,'Silicone mask','Seen through the headset')}</g>
    `;
  } else if(mode==='EEG' && dev.id!=='octopus-16'){
    // mesh cap with projected meridians and parallels
    let mesh='';
    for(const lat of [.25,.5,.75]){ let d=''; for(let a=-90;a<=90;a+=6){ const rad=a*Math.PI/180; const p=project(lat*Math.sin(rad),lat*Math.cos(rad)); d+=(d?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1); } mesh+=`<path d="${d}"/>`; }
    for(const a of [-60,-30,0,30,60]){ let d=''; for(let r=0;r<=1.02;r+=.06){ const rad=a*Math.PI/180; const p=project(r*Math.sin(rad),r*Math.cos(rad)); d+=(d?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1);} mesh+=`<path d="${d}"/>`; }
    h+=`<g data-part="electrodes" class="fade-in">
      <use href="#hw-capShape" fill="rgba(24,27,33,.9)" stroke="rgba(255,255,255,.14)"/>
      <g clip-path="url(#hw-capClip)" fill="none" stroke="var(--mode)" stroke-opacity=".16" stroke-width="1">${mesh}</g>
      <path d="M281,159 C286,190 305,221 330,229 C355,221 374,190 379,159" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="2" stroke-dasharray="1 4"/>
    </g>`;
  } else if(mode==='EEG' && dev.id==='octopus-16'){
    h+=`<g class="fade-in"><path d="M266,120 C290,104 370,104 394,120" stroke="#2b3038" stroke-width="6" fill="none"/></g>`;
  }
  if(dev.rig==='body-ble'){
    if(mode==='EMG') h+=`<path class="fade-in" d="M424,330 C440,338 470,338 486,330" stroke="#2b3038" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    if(mode==='ECG') h+=`<path class="fade-in" d="M241,452 C300,462 360,462 419,452" stroke="#2b3038" stroke-width="8" fill="none"/>`;
    if((mode==='EEG'||mode==='EOG') && dev.id!=='octopus-16') h+=`<path class="fade-in" d="M268,112 C300,98 360,98 392,112" stroke="#2b3038" stroke-width="5" fill="none"/>`;
  }
  const capKey=capPhotoKey(dev);
  h+=`<g class="fade-in" aria-label="${dev.name} product photograph">${productPhoto(dev.id,558,60,230,166)}</g>`;
  if(capKey){
    h+=`<g class="fade-in" aria-label="EEG cap product photograph">${productPhoto(capKey,800,50,166,190,'electrodes')}</g>`;
    // Front-facing transparent cap photos fit the scalp while interactive markers remain above.
    if(capKey==='cap8-dry') h+=`<g clip-path="url(#hw-capClip)" data-part="electrodes">${productPhoto(capKey,258,70,150,150,'electrodes')}</g>`;
    if(capKey==='cap16') h+=`<g clip-path="url(#hw-capClip)" data-part="electrodes">${productPhoto(capKey,235,53,190,202,'electrodes')}</g>`;
  }
  g.innerHTML=h;
}

/* ---------- desk peripherals ---------- */
function slab(x,y,w,t,dx,dy,top,side){ return `<rect x="${x}" y="${y-t}" width="${w}" height="${t}" fill="${side}"/><path d="M${x},${y-t} L${x+w},${y-t} L${x+w+dx},${y-t+dy} L${x+dx},${y-t+dy} Z" fill="${top}"/>`; }
function shade(hex,f){ const n=parseInt(hex.slice(1),16); let r=n>>16,g=n>>8&255,b=n&255; r=Math.round(r*f);g=Math.round(g*f);b=Math.round(b*f); return `rgb(${Math.min(255,r)},${Math.min(255,g)},${Math.min(255,b)})`; }
function stack(x,y,dev){
  return productPhoto(dev.id,x-4,y-76,180,76,'device host');
}
function powerBank(x,y,w=104,main='5 V power bank',sub=''){
  return `<g data-part="power">
    <rect x="${x}" y="${y-30}" width="${w}" height="30" rx="8" fill="#1d2127" stroke="rgba(255,255,255,.12)"/>
    <rect x="${x+6}" y="${y-21}" width="7" height="12" rx="1.5" fill="#0c0e11"/>
    ${[0,1,2,3].map(i=>`<circle cx="${x+w-40+i*9}" cy="${y-15}" r="2.4" fill="${i<3?C.power:'#2b3a31'}"/>`).join('')}
    ${callout(x,y+24,main,sub)}
  </g>`;
}
function monitor(x,y){ // x,y = screen top-left, 140x92
  return `<g data-part="host">
    <rect x="${x}" y="${y}" width="140" height="92" rx="7" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/>
    <g class="screen" data-x="${x+10}" data-y="${y+10}" data-w="120" data-h="72"></g>
    <rect x="${x+64}" y="${y+92}" width="12" height="${520-y-96}" fill="#2a2e35"/>
    <rect x="${x+38}" y="516" width="64" height="5" rx="2" fill="#2a2e35"/>
  </g>`;
}
function laptop(x,y,opts={}){ // x = left of screen, screen 144x92, base on desk
  return `<g data-part="host">
    <rect x="${x}" y="${y}" width="144" height="92" rx="7" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/>
    <g class="screen" data-x="${x+10}" data-y="${y+(opts.battery?20:10)}" data-w="124" data-h="${opts.battery?62:72}"></g>
    ${opts.battery?`<g><rect x="${x+104}" y="${y+8}" width="22" height="10" rx="2" fill="none" stroke="${C.power}"/><rect x="${x+106}" y="${y+10}" width="13" height="6" fill="${C.power}"/><rect x="${x+126}" y="${y+11}" width="2" height="4" fill="${C.power}"/></g>`:''}
    <path d="M${x-14},520 L${x+158},520 L${x+148},${y+96} L${x-4},${y+96} Z" fill="#23272e" stroke="#3a3f47"/>
  </g>`;
}
function phone(x,y){
  return `<g data-part="host">
    <rect x="${x}" y="${y}" width="40" height="76" rx="8" fill="#0b0d10" stroke="#3a3f47" stroke-width="2"/>
    <g class="screen" data-x="${x+5}" data-y="${y+10}" data-w="30" data-h="54"></g>
    <path d="M${x+6},${y+76} L${x+2},520 M${x+34},${y+76} L${x+38},520" stroke="#2a2e35" stroke-width="3"/>
  </g>`;
}
function plugCrossed(x,y){
  return `<g data-part="power">
    <g stroke="#8b93a1" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M${x},${y-10} v-8 M${x+10},${y-10} v-8"/><rect x="${x-5}" y="${y-10}" width="20" height="14" rx="3" fill="#1d2127"/><path d="M${x+5},${y+4} v10"/>
    </g>
    <path d="M${x-10},${y+14} L${x+20},${y-22}" stroke="#ff5a74" stroke-width="2.4" stroke-linecap="round"/>
  </g>`;
}
function cable(d,color,part,flow=false,width=2.2){
  return `<g data-part="${part}"><path d="${d}" fill="none" stroke="${color}" stroke-opacity=".38" stroke-width="${width}" stroke-linecap="round"/>${flow?`<path class="flow" d="${d}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`:''}</g>`;
}

function rigFor(dev){
  // returns {html, port, air:[{to,kind,label}] , airFrom:'body'|{x,y}}
  const R={html:'',port:null,air:[],airFrom:null};
  const desk=`<g data-part="desk"><path d="M548,520 L992,520" stroke="rgba(255,255,255,.14)"/><rect x="548" y="520" width="444" height="60" fill="url(#hw-deskGrad)"/></g>`;
  if(dev.rig==='shield-monitor'){
    const hostName = dev.host==='jetson'?'Jetson Nano':'Raspberry Pi';
    R.html=desk+
      cable('M786,505 C760,505 748,510 736,512',C.power,'power')+
      cable('M890,505 C908,505 912,500 916,492',C.power,'power')+
      cable('M718,470 C760,450 800,440 846,430','#8b93a1','host',false,2)+
      stack(578,520,dev)+
      powerBank(786,520,104,'5 V power bank','3 A, up to 10,000 mAh')+
      monitor(846,328)+
      `<g data-part="device">${callout(578,420,dev.name,'on '+hostName+', GPIO header')}</g>`+
      `<g data-part="host">${callout(846,300,'Portable monitor','Same power bank')}</g>`;
    R.port={x:592,y:482};
  }
  else if(dev.rig==='shield-wireless'){
    const hostName={arduino:'Arduino UNO R4',nucleo:'NUCLEO-WB55'}[dev.host];
    R.html=desk+
      cable('M740,505 C730,505 728,510 726,512','#45dd8b','power')+
      stack(572,520,dev)+
      powerBank(740,520,80,'5 V bank','1 A max')+
      laptop(846,390)+
      `<g data-part="device">${callout(572,420,dev.name,'on '+hostName)}</g>`+
      `<g data-part="host">${callout(988,546,'Your computer',dev.air==='wifi'?'Python script, same Wi-Fi':'Python SDK or mobile app','end')}</g>`;
    R.port={x:586,y:482};
    R.airFrom={x:690,y:470};
    R.air=[{to:{x:916,y:414},kind:dev.air}];
  }
  else if(dev.rig==='body-ble'){
    R.html=desk+ phone(646,420)+ laptop(820,410)+
      `<g data-part="host">${callout(636,546,'Phone','Android app')}${callout(820,546,'Laptop','PiEEG Server or SDK')}</g>`;
    R.airFrom='body';
    R.air=[{to:{x:666,y:426},kind:'ble'},{to:{x:892,y:418},kind:'ble'}];
  }
  else if(dev.rig==='usb-box'){
    R.html=desk+
      cable('M700,500 C712,500 716,506 726,508','#45dd8b','power',false,2.6)+
      cable('M690,480 C740,440 800,480 846,470',C.data,'link',true,2.6)+
      `<g data-part="device">${productPhoto('ironbci-32',574,444,150,78)}
        <text x="596" y="500" class="t-dim" style="font-weight:600;fill:#aab2bd;paint-order:stroke;stroke:#fff;stroke-width:2">IronBCI-32</text>
      </g>`+
      powerBank(726,520,92,'5 V power bank','Its own USB cable')+
      laptop(846,390,{battery:true})+
      plugCrossed(958,532)+
      `<g data-part="device">${callout(582,420,'IronBCI-32','Two Micro USB cables')}</g>`+
      `<g data-part="host">${callout(846,372,'Laptop on battery','Unplugged from mains')}</g>`+
      `<g data-part="link"><text x="770" y="448" class="t-sub" style="fill:${C.data}">USB data</text></g>`;
    R.port={x:590,y:474};
  }
  else if(dev.rig==='xr'){
    R.html=desk+
      cable('M428,172 C470,210 520,380 560,508',C.power,'power',false,2.4)+
      powerBank(560,520,100,'USB-C power bank','Or the headset battery')+
      laptop(820,410)+
      `<g data-part="host">${callout(988,546,'PC or headset browser','OSC to VRChat, WebXR','end')}</g>`;
    R.airFrom={x:415,y:152};
    R.air=[{to:{x:892,y:418},kind:'ble'}];
  }
  return R;
}

/* ---------- on-body device (IronBCI / Octopus) ---------- */
function bodyDeviceSVG(dev){
  const photo=productPhoto(dev.id,-25,-24,50,48);
  if(dev.body==='ironbci') return photo+`
    <g data-part="power">
      <path d="M-4,20 C-4,24 0,24 4,28" stroke="#ff5a74" stroke-width="1.4" fill="none"/>
      <rect x="-2" y="26" width="30" height="18" rx="3" fill="#b9bfc7" stroke="#e1e5ea"/>
      <path d="M2,31 h22 M2,35 h22" stroke="#8e959e" stroke-width=".8"/>
    </g>`;
  return photo+`<g data-part="power"><rect x="28" y="-6" width="24" height="14" rx="3" fill="#1d2127" stroke="rgba(255,255,255,.2)"/><circle cx="46" cy="1" r="1.8" fill="${C.power}"/></g>`;
}
const BODY_CALL = {
  ironbci:{EEG:[18,-62,'end'],EOG:[18,-62,'end'],EMG:[-40,-8,'end'],ECG:[0,64,'middle']},
  octopus:{EEG:[-30,-40,'end'],EMG:[-40,-8,'end'],ECG:[0,52,'middle']}
};
function bodyCallout(dev,mode){
  const [x,y,a]=BODY_CALL[dev.body][mode];
  if(dev.body==='ironbci') return callout(x,y,'IronBCI','LiPo 200 mAh, JST 2.0 mm',a);
  return callout(x,y,'Octopus 16',mode==='EEG'?'Pins over the visual cortex':'Pins against the skin',a);
}

/* ============================================================
   State and electrode pool
   ============================================================ */
const state={dev:DEVICES[0], mode:'EEG', gel:'dry', filter:'all', hover:null, focus:null, paused:false};
const POOL=[]; // 32 channels + ref + bias
let bodyDev=null, collector={x:402,y:188,fx:402,fy:188,tx:402,ty:188};
let tween={t0:0,dur:0,active:false};
let current=null, rig=null;

function buildPool(){
  const lE=$('#hw-lElectrodes'), lL=$('#hw-lLeads');
  for(let i=0;i<34;i++){
    const kind=i<32?'ch':(i===32?'ref':'bias');
    const g=el('g',{class:'el','data-i':i},lE);
    el('circle',{class:'gelc',r:14,fill:'url(#hw-gel)'},g);
    if(kind==='ch'){ el('circle',{class:'body',r:7}, g); el('circle',{class:'core',r:3},g); }
    else { el('path',{class:'body',d:'M0,-8 L8,0 L0,8 L-8,0 Z'},g); if(kind==='bias') el('circle',{class:'core',r:2.4},g); }
    el('circle',{class:'hit',r:11},g);
    const lead=el('path',{fill:'none','stroke-width':1.1},lL);
    const o={i,kind,g,lead,x:402,y:188,fx:402,fy:188,tx:402,ty:188,o:0,fo:0,to:0,label:'',delay:0};
    g.addEventListener('pointerenter',e=>hoverEl(o,e)); g.addEventListener('pointerleave',()=>hoverEl(null));
    POOL.push(o);
  }
}

function applyState(animate=true){
  const dev=state.dev, mode=state.mode;
  root.style.setProperty('--mode',MODE_COLOR[mode]);
  const L=layout(dev,mode); current=L;
  const col=MODE_COLOR[mode];
  const small = L.ch.length>16;
  // targets
  POOL.forEach((o,i)=>{
    let t;
    if(o.kind==='ch') t=L.ch[i]; else t=o.kind==='ref'?L.ref:L.bias;
    o.fx=o.x; o.fy=o.y; o.fo=o.o;
    if(t){ o.tx=t.x; o.ty=t.y; o.to=(t.visible===false)?0:1; o.label=t.label; o.active=true; o.visible=t.visible!==false; }
    else { o.tx=L.collector.x; o.ty=L.collector.y; o.to=0; o.active=false; o.visible=false; }
    o.delay = animate ? (o.kind==='ch'? i*14 : 60) : 0;
    // style
    const wet = state.gel==='wet';
    const R = o.kind==='ch' ? (small?5.6:7.2) : 7;
    const body=o.g.querySelector('.body'), core=o.g.querySelector('.core'), gel=o.g.querySelector('.gelc');
    gel.setAttribute('r', wet ? R*2 : 0); gel.style.opacity = wet?1:0;
    if(o.kind==='ch'){
      body.setAttribute('r',R); body.setAttribute('fill','#12151a'); body.setAttribute('stroke',col); body.setAttribute('stroke-width',1.8);
      core.setAttribute('r',R*.42); core.setAttribute('fill', wet?'#e8f4ff':'#aeb6c0');
    } else {
      body.setAttribute('fill','#12151a'); body.setAttribute('stroke','#e8ebef'); body.setAttribute('stroke-width',1.6);
      if(core) core.setAttribute('fill','#e8ebef');
    }
    o.g.setAttribute('pointer-events', o.to>0?'all':'none');
    o.lead.setAttribute('stroke', o.kind==='ch'?col:'#e8ebef');
    o.R=R;
  });
  collector.fx=collector.x; collector.fy=collector.y; collector.tx=L.collector.x; collector.ty=L.collector.y;
  tween={t0:performance.now(), dur: animate?760:0, active:true};
  drawWear(dev,mode);
  drawMap(L);
  renderStatic();
  renderSpec(); renderModes(); renderGel(); renderLegend(); setupTraces();
}

function renderStatic(){
  const dev=state.dev;
  if(renderStatic.devId!==dev.id){
    rig=rigFor(dev); renderStatic.devId=dev.id;
    const p=$('#hw-lPeriph'); p.innerHTML=`<g class="fade-in">${rig.html}</g>`;
    const b=$('#hw-lBodyDev'); b.innerHTML='';
    bodyDev=null;
    if(dev.rig==='body-ble'){
      const g=el('g',{},b); g.innerHTML=bodyDeviceSVG(dev)+`<g class="bcall" data-part="device"></g>`;
      const pos=BODY_POS[state.mode];
      bodyDev={g,x:pos.x,y:pos.y};
    }
    screens=[...svg.querySelectorAll('.screen')].map(s=>{
      const paths=[0,1,2].map(()=>el('path',{fill:'none','stroke-width':1.3},s));
      return {x:+s.dataset.x,y:+s.dataset.y,w:+s.dataset.w,h:+s.dataset.h,paths};
    });
  }
  if(bodyDev){ const bc=bodyDev.g.querySelector('.bcall'); bc.innerHTML=`<g class="fade-in" style="animation-delay:.5s">${bodyCallout(dev,state.mode)}</g>`; }
  // air links container
  $('#hw-lAir').innerHTML='';
  airEls = rig.air.map(a=>{
    const g=el('g',{'data-part':'link'},$('#hw-lAir'));
    const base=el('path',{fill:'none',stroke:C.data,'stroke-opacity':.22,'stroke-width':1.4,'stroke-dasharray':'2 6'},g);
    const flow=el('path',{class:'air',stroke:C.data,'stroke-width':3},g);
    const lab=el('g',{},g);
    lab.innerHTML=`<circle r="12" fill="#0b1422" stroke="${C.data}" stroke-opacity=".6"/>`+
      (a.kind==='ble'
        ? `<path d="M-3.5,-4.5 L3.5,2.5 L0,6 L0,-6 L3.5,-2.5 L-3.5,4.5" fill="none" stroke="${C.data}" stroke-width="1.6" stroke-linejoin="round"/>`
        : `<g fill="none" stroke="${C.data}" stroke-width="1.6" stroke-linecap="round"><path d="M-6,-1 Q0,-7 6,-1"/><path d="M-3.5,2 Q0,-1.5 3.5,2"/></g><circle cy="5" r="1.4" fill="${C.data}"/>`);
    const t=el('text',{class:'t-sub','text-anchor':'middle',fill:C.data},g); t.style.fill=C.data;
    t.textContent = a.kind==='ble' ? (state.dev.rig==='xr'?'Bluetooth LE 5':`Bluetooth LE, ${state.dev.rate} SPS`) : 'Wi-Fi';
    return {a,base,flow,lab,t,showLabel: a===rig.air[rig.air.length-1]};
  });
  $('#hw-lBundle').innerHTML='';
  bundleEl=null;
  if(rig.port){
    const g=el('g',{'data-part':'link'},$('#hw-lBundle'));
    bundleEl={base:el('path',{fill:'none',stroke:'#3a4049','stroke-width':5,'stroke-linecap':'round'},g),
              flow:el('path',{class:'flow slow',stroke:MODE_COLOR[state.mode],'stroke-width':2.2,'stroke-linecap':'round'},g)};
  }
  // focus classes may need reapplying
  applyFocus();
}
let screens=[], airEls=[], bundleEl=null;

/* ---------- per-frame geometry ---------- */
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function stepTween(now){
  if(!tween.active) return false;
  let done=true;
  for(const o of POOL){
    const k = tween.dur? Math.min(1,Math.max(0,(now-tween.t0-o.delay)/tween.dur)) : 1;
    if(k<1) done=false;
    const e=ease(k);
    o.x=lerp(o.fx,o.tx,e); o.y=lerp(o.fy,o.ty,e); o.o=lerp(o.fo,o.to,e);
  }
  const k= tween.dur? Math.min(1,(now-tween.t0)/tween.dur):1, e=ease(k);
  collector.x=lerp(collector.fx,collector.tx,e); collector.y=lerp(collector.fy,collector.ty,e);
  if(bodyDev){ bodyDev.x=collector.x; bodyDev.y=collector.y; }
  if(done&&k>=1) tween.active=false;
  return true;
}
function drawGeometry(){
  const L=current;
  for(const o of POOL){
    const sc = .35+.65*o.o;
    const hl = state.hover===o;
    o.g.setAttribute('transform',`translate(${o.x.toFixed(1)},${o.y.toFixed(1)}) scale(${(hl?1.35:sc).toFixed(3)})`);
    o.g.style.opacity=o.o.toFixed(3);
    // leads: EEG wires hidden by the cap, XR integrated in mask
    const lo = o.o*L.leads;
    if(lo>0.01){
      const cx=collector.x, cy=collector.y;
      const mx=(o.x+cx)/2, my = cy<250 ? Math.min(o.y,cy)-42 : Math.max(o.y,cy)+18;
      o.lead.setAttribute('d',`M${o.x.toFixed(1)},${o.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`);
      o.lead.style.opacity=(lo*(state.hover&&!hl?.35:1)).toFixed(3);
    } else o.lead.style.opacity=0;
  }
  if(bodyDev){ bodyDev.g.setAttribute('transform',`translate(${bodyDev.x.toFixed(1)},${bodyDev.y.toFixed(1)})`); }
  if(bundleEl){
    const a=collector, p=rig.port;
    const d=`M${a.x.toFixed(1)},${a.y.toFixed(1)} C${(a.x+110).toFixed(1)},${(a.y+20).toFixed(1)} ${(p.x-70)},${p.y-60} ${p.x},${p.y}`;
    bundleEl.base.setAttribute('d',d); bundleEl.flow.setAttribute('d',d);
  }
  for(const A of airEls){
    const f = rig.airFrom==='body' ? {x:collector.x+(state.dev.body==='ironbci'?-13:0), y:collector.y-8} : rig.airFrom;
    const t=A.a.to; const cx=(f.x+t.x)/2, cy=Math.min(f.y,t.y,330)-90;
    const d=`M${f.x.toFixed(1)},${f.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${t.x},${t.y}`;
    A.base.setAttribute('d',d); A.flow.setAttribute('d',d);
    const mx=(f.x+2*cx+t.x)/4, my=(f.y+2*cy+t.y)/4;
    A.lab.setAttribute('transform',`translate(${mx.toFixed(1)},${my.toFixed(1)})`);
    A.t.setAttribute('x',mx.toFixed(1)); A.t.setAttribute('y',(my-20).toFixed(1));
    A.t.style.display=A.showLabel?'':'none';
  }
}

/* ============================================================
   Scalp map / placement note (left column of the stage)
   ============================================================ */
function drawMap(L){
  const g=$('#hw-lMap'); const cx=124, cy=126, R=80;
  let h='';
  if(L.mapShown){
    h+=`<g class="fade-in" data-part="electrodes">
      <circle cx="${cx}" cy="${cy}" r="${R+8}" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.14)"/>
      <path d="M${cx-9},${cy-R-7} L${cx},${cy-R-19} L${cx+9},${cy-R-7}" fill="none" stroke="rgba(255,255,255,.2)"/>
      <path d="M${cx-R-8},${cy-12} q-9,12 0,24 M${cx+R+8},${cy-12} q9,12 0,24" fill="none" stroke="rgba(255,255,255,.2)"/>
      <circle cx="${cx}" cy="${cy}" r="${R/2}" fill="none" stroke="rgba(255,255,255,.05)"/>
      <path d="M${cx-R-8},${cy} H${cx+R+8} M${cx},${cy-R-8} V${cy+R+8}" stroke="rgba(255,255,255,.05)"/>`;
    L.ch.forEach((c,i)=>{
      const x=cx+c.topo[0]*R, y=cy-c.topo[1]*R; // conventional top view: left hemisphere on the left
      h+=`<g class="mapdot" data-i="${i}"><circle cx="${x}" cy="${y}" r="${c.visible?4.2:3.6}" fill="${c.visible?'var(--mode)':'#12151a'}" stroke="var(--mode)" stroke-width="1.4"/><text x="${x}" y="${y+(L.ch.length>16?11:13)}" text-anchor="middle" class="t-dim" style="font-size:${L.ch.length>16?8:9.5}px;fill:#8e96a0">${c.label}</text></g>`;
    });
    h+=`<path d="M${cx-R-26},${cy} l6,-6 l6,6 l-6,6 Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.2"/>
        <path d="M${cx+R+14},${cy} l6,-6 l6,6 l-6,6 Z" fill="#12151a" stroke="#e8ebef" stroke-width="1.2"/><circle cx="${cx+R+20}" cy="${cy}" r="1.8" fill="#e8ebef"/>
        <text x="${cx}" y="${cy+R+32}" text-anchor="middle" class="t-dim">Top view, nose up, left on left</text></g>`;
    h+=textBlock(26,cy+R+62,wrapText(L.note,27),'t-sub',17);
  } else {
    const title = state.dev.rig==='xr' ? (state.mode==='EMG'?'Facial EMG':'Frontal EEG')
      : {EMG:'Forearm EMG',ECG:'Chest ECG',EOG:'Eye movement'}[state.mode];
    h+=`<g class="fade-in"><text x="26" y="64" class="t-main" style="font-size:18px">${title}</text>
      ${textBlock(26,92,wrapText(L.note,28),'t-sub',18)}</g>`;
  }
  g.innerHTML=h;
  g.querySelectorAll('.mapdot').forEach(d=>{
    const o=POOL[+d.dataset.i];
    d.addEventListener('pointerenter',e=>hoverEl(o,e,d)); d.addEventListener('pointerleave',()=>hoverEl(null));
    d.style.cursor='pointer';
  });
}

/* ============================================================
   Hover + focus linking
   ============================================================ */
const tip=$('#hw-tip');
function hoverEl(o,e,anchor){
  state.hover=o;
  if(o){
    const isCh=o.kind==='ch';
    const idx=isCh?o.i+1:null;
    tip.innerHTML = isCh ? `<b>${o.label}</b> <span>channel ${idx}${o.visible?'':', back of head'}</span>` : `<b>${o.kind==='ref'?'Reference':'Bias'}</b> <span>${o.label.split(', ')[1]||''}</span>`;
    const box=$('.stage').getBoundingClientRect();
    const r=(anchor||o.g).getBoundingClientRect();
    tip.style.left=(r.left+r.width/2-box.left)+'px'; tip.style.top=(r.top-box.top)+'px';
    tip.classList.add('show');
  } else tip.classList.remove('show');
  root.querySelectorAll('.mapdot').forEach(d=>d.style.opacity = !o? 1 : (+d.dataset.i===o.i && o.kind==='ch'?1:.35));
  drawGeometry();
}
function applyFocus(){
  const part=state.focus;
  svg.classList.toggle('focusing',!!part);
  svg.querySelectorAll('[data-part]').forEach(n=>n.classList.toggle('on', !!part && n.getAttribute('data-part').split(' ').includes(part)));
  root.querySelectorAll('.row').forEach(r=>r.classList.toggle('on', r.dataset.part===part));
}
svg.addEventListener('pointerover',e=>{
  const n=e.target.closest('[data-part]'); if(!n||n.closest('#lElectrodes')||n.closest('#lMap')) return;
  const p=n.getAttribute('data-part').split(' ')[0]; if(p==='desk') return;
  if(state.focus!==p){ state.focus=p; applyFocus(); }
});
svg.addEventListener('pointerleave',()=>{ state.focus=null; applyFocus(); });

/* ============================================================
   UI: rail, modes, gel toggle, spec, legend
   ============================================================ */
function renderRail(){
  const rail=$('#hw-rail'); rail.innerHTML='';
  DEVICES.forEach(d=>{
    const b=document.createElement('button'); b.className='dev'; b.dataset.id=d.id;
    b.innerHTML=`<b>${d.name}</b><span>${d.meta}</span>`;
    b.addEventListener('click',()=>selectDevice(d.id));
    rail.appendChild(b);
  });
  syncRail();
}
function syncRail(){
  root.querySelectorAll('.dev').forEach(b=>{
    const d=DEVICES.find(x=>x.id===b.dataset.id);
    b.setAttribute('aria-pressed', d===state.dev);
    b.hidden = !(state.filter==='all' || d.filters.includes(state.filter)) && d!==state.dev;
  });
}
root.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  state.filter=b.dataset.filter;
  root.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const vis=DEVICES.filter(d=>state.filter==='all'||d.filters.includes(state.filter));
  if(!vis.includes(state.dev) && vis[0]) selectDevice(vis[0].id); else syncRail();
}));

function renderModes(){
  const m=$('#hw-modes'); m.innerHTML='';
  ['EEG','EMG','ECG','EOG'].forEach(k=>{
    const ok=state.dev.modes.includes(k);
    const b=document.createElement('button');
    b.style.setProperty('--c',MODE_COLOR[k]);
    b.innerHTML=`<i></i>${k}`;
    b.setAttribute('aria-pressed',state.mode===k);
    if(!ok){ b.setAttribute('aria-disabled','true'); b.title=`${k} is not listed in the ${state.dev.name} spec`; }
    else { b.title=`Measure ${MODE_NAME[k]} signals`; b.addEventListener('click',()=>{ if(state.mode!==k){ state.mode=k; applyState(); } }); }
    m.appendChild(b);
  });
}
function renderGel(){
  const w=$('#hw-gelWrap'); const opts=state.dev.electrodes;
  if(opts.length===1){
    const txt = state.dev.id==='octopus-16' ? 'Dry pogo pins' : state.dev.rig==='xr' ? 'Flat dry Ag/AgCl pads' : 'Wet Ag/AgCl with gel';
    w.innerHTML=`<span class="seg-label">Electrodes</span><span class="lock">${txt}</span>`; return;
  }
  w.innerHTML=`<span class="seg-label">Electrodes</span><div class="seg" role="group" aria-label="Electrode type">
    <button data-g="dry" aria-pressed="${state.gel==='dry'}" style="--c:#aeb6c0"><i></i>Dry</button>
    <button data-g="wet" aria-pressed="${state.gel==='wet'}" style="--c:#8fd3ff"><i></i>Wet with gel</button></div>`;
  w.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ state.gel=b.dataset.g; applyState(false); }));
}
function renderLegend(){
  const dev=state.dev, L=current;
  const items=[];
  if(L.leads>0 || rig.port) items.push([MODE_COLOR[state.mode],'Electrode leads']);
  if(rig.air.length || dev.rig==='usb-box') items.push([C.data, dev.rig==='usb-box'?'USB data':'Wireless data']);
  items.push([C.power,'Power']);
  $('#hw-legend').innerHTML = items.map(([c,t])=>`<span><i style="background:${c}"></i>${t}</span>`).join('') +
    `<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a part or a spec row to trace it</span>`;
}
function renderSpec(){
  const d=state.dev, s=d.spec;
  const elecText = d.electrodes.length===2 ? (state.gel==='wet'?'Wet Ag/AgCl with conductive gel. Dry electrodes fit the same 2.54 mm headers.':'Dry, no gel needed. Wet Ag/AgCl fits the same 2.54 mm headers.')
    : d.id==='octopus-16' ? 'Spring-loaded pogo pins, dry' : d.rig==='xr' ? '10 flat dry Ag/AgCl pads in a silicone mask' : 'Wet Ag/AgCl with conductive gel, 2.54 mm headers';
  const rows=[
    ['electrodes','Signals', d.modes.join(', ')],
    ['electrodes','Channels', `${d.ch}, plus reference and bias`],
    ['electrodes','Electrodes', elecText],
    ['device','Board', s.board],
    ['host','Host', s.host],
    ['link','Data link', s.link],
    s.rate?['link','Sample rate', s.rate]:null,
    ['power','Power', s.power]
  ].filter(Boolean);
  const pc={electrodes:MODE_COLOR[state.mode],device:C.neutral,host:'#8b93a1',link:C.data,power:C.power};
  $('#hw-spec').innerHTML=`
    ${d.badge?`<span class="badge">${d.badge}</span>`:''}
    <h2>${d.name}</h2>
    <p class="tagline">${d.tagline}</p>
    <p class="summary">${d.summary}</p>
    <dl class="rows">${rows.map(([p,k,v])=>`<div class="row" tabindex="0" data-part="${p}" style="--pc:${pc[p]}"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <div class="need"><h3>What you need</h3><ul>${d.need.map(n=>`<li>${n}</li>`).join('')}</ul></div>
    <div class="safety"><h3>Safety</h3><p>${d.safety}</p></div>
    <a class="docs" href="${PAGE[d.id]||'/hardware'}">View ${d.name}</a>`;
  root.querySelectorAll('.row').forEach(r=>{
    const on=()=>{state.focus=r.dataset.part;applyFocus();}, off=()=>{state.focus=null;applyFocus();};
    r.addEventListener('pointerenter',on); r.addEventListener('pointerleave',off);
    r.addEventListener('focus',on); r.addEventListener('blur',off);
  });
}

function selectDevice(id, animate=true){
  const d=DEVICES.find(x=>x.id===id); if(!d) return;
  state.dev=d;
  if(!d.modes.includes(state.mode)) state.mode=d.modes[0];
  if(!d.electrodes.includes(state.gel)) state.gel=d.electrodes[0];
  
  syncRail(); applyState(animate);
}

/* ============================================================
   Simulated signals — live scrolling 4 s window
   ============================================================ */
function hash(n){ const s=Math.sin(n*127.1)*43758.5453; return (s-Math.floor(s))*2-1; }
const g1=(x,m,s)=>{const z=(x-m)/s;return Math.exp(-z*z);};
let traceCh=[];
function setupTraces(){
  const L=current, dev=state.dev, mode=state.mode;
  traceCh = L.ch.map((c,i)=>{
    const seed = (dev.id.length*97 + mode.charCodeAt(0)*13 + i*19) >>> 0;
    const ty = c.topo? c.topo[1] : 0;
    return {
      label:c.label, i,
      p0: seed*.017, p1: seed*.031,
      alphaW: c.topo? Math.max(.15,.4-ty*.55) : .3,
      blinkW: c.topo? Math.max(0,(ty-.55)*2.4) : (dev.rig==='xr' && i<4 ? .9 : 0),
      lag: (i%5)*.11, gain:.7+(i%4)*.1, group: dev.rig==='xr'? (i<4?0:i<6?1:2) : i%3
    };
  });
  const n=traceCh.length;
  $('#hw-sigNote').textContent=`${n} channel${n>1?'s':''}, ${MODE_NAME[mode]} signal, ${dev.rate} SPS on the real device, 4 s window`;
  sizeCanvas();
}
function sEEG(t,c){
  const bg = Math.sin(6.283*8.2*t+c.p0)*.35 + Math.sin(6.283*12.4*t+c.p1)*.22 + Math.sin(6.283*4.1*t+c.i)*.18;
  const env=.55+.45*Math.sin(6.283*.18*t+c.p0);
  const alpha=c.alphaW*env*Math.sin(6.283*10.2*t+c.p1);
  const bt=(t%4.3)-1.2; const blink=c.blinkW*(g1(bt,0,.1)*1.6);
  return bg+alpha*1.4+blink;
}
function sEMG(t,c){
  const per=2.6, ph=((t+c.lag*(c.group+1)*.4)%per);
  const on=Math.min(1,Math.max(0,(ph-.5)/.12))*Math.min(1,Math.max(0,(1.5-ph)/.18));
  const n=hash(Math.floor(t*700)+c.i*7919)*.7+hash(Math.floor(t*700)*3+c.i)*.3;
  return n*(.08+on*c.gain*1.05);
}
function sECG(t,c){
  const hr=1.18, ph=((t+.1)*hr)%1;
  const gains=[.72,1,1.25][c.i]||1; const tw=[.28,.34,.45][c.i]||.3;
  const v=.12*g1(ph,.16,.028)-.12*g1(ph,.27,.009)+1*g1(ph,.29,.011)-.28*g1(ph,.312,.011)+tw*g1(ph,.53,.05);
  return (v*gains-.12)*1.5+.05*Math.sin(6.283*.23*t)+hash(Math.floor(t*500)+c.i)*.02;
}
function gaze(t){
  const seg=Math.floor(t/1.25), fr=t/1.25-seg; const lv=[-1,-.35,.4,1];
  const a=lv[Math.floor((hash(seg)+1)*2)%4], b=lv[Math.floor((hash(seg+1)+1)*2)%4];
  return fr<.9? a : lerp(a,b,Math.min(1,(fr-.9)/.06));
}
function sEOG(t,c){
  const gz=gaze(t)*.8, bt=(t%3.1)-2.2, blink=g1(bt,0,.09)*1.5;
  const n=hash(Math.floor(t*300)+c.i*31)*.03;
  return [gz, -gz, blink+gz*.08, -blink*.55+gz*.05][c.i]+n;
}
function sample(t,c){
  const m=state.mode;
  if(m==='EEG') return sEEG(t,c)*.55;
  if(m==='EMG') return sEMG(t,c);
  if(m==='ECG') return sECG(t,c)*.8;
  return sEOG(t,c)*.8;
}

/* ---------- canvas ---------- */
const cv=$('#hw-traces'), cx=cv.getContext('2d');
let CW=0,CH=0,DPR=1,rowH=30;
function sizeCanvas(){
  const n=Math.max(1,traceCh.length);
  rowH = n>24?15 : n>12?21 : n>6?30 : 50;
  DPR=Math.min(2,window.devicePixelRatio||1);
  CW=Math.max(320, cv.clientWidth||cv.parentElement?.clientWidth||640);
  CH=Math.max(120,n*rowH+16);
  cv.width=CW*DPR; cv.height=CH*DPR; cv.style.height=CH+'px';
  cx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize',sizeCanvas);
let simT=0, lastNow=0;
function drawTraces(){
  if(!CW) sizeCanvas();
  const n=traceCh.length, col=MODE_COLOR[state.mode], labelW=CW<520?84:118, W=Math.max(40,CW-labelW-10), win=4;
  cx.clearRect(0,0,CW,CH);
  const hi = state.hover && state.hover.kind==='ch' ? state.hover.i : -1;
  const amp = rowH*.42;
  cx.font=`${n>24?10.5:12.5}px -apple-system, BlinkMacSystemFont, sans-serif`; cx.textBaseline='middle';
  cx.strokeStyle='rgba(255,255,255,.06)'; cx.lineWidth=1;
  for(let s=0;s<=win;s++){ const x=labelW+W*s/win; cx.beginPath(); cx.moveTo(x,6); cx.lineTo(x,CH-6); cx.stroke(); }
  const pts=Math.min(360,Math.max(80,Math.floor(W)));
  for(let r=0;r<n;r++){
    const c=traceCh[r], y0=8+rowH*r+rowH/2;
    const dim = hi>=0 && hi!==r;
    cx.fillStyle = hi===r? '#f4f4f5' : dim? '#52525b' : '#a1a1aa';
    cx.fillText(c.label.length>15?c.label.slice(0,14)+'…':c.label, 10, y0);
    cx.strokeStyle=col; cx.globalAlpha= dim? .22 : hi===r? 1 : .85; cx.lineWidth = hi===r? 1.8 : n>24? 1 : 1.3;
    cx.beginPath();
    for(let k=0;k<=pts;k++){
      const tt=simT-win+win*k/pts;
      let v=sample(tt,c); v=Math.max(-1.6,Math.min(1.6,v));
      const x=labelW+W*k/pts, y=y0-v*amp;
      k?cx.lineTo(x,y):cx.moveTo(x,y);
    }
    cx.stroke(); cx.globalAlpha=1;
  }
}
function drawScreens(){
  const col=MODE_COLOR[state.mode];
  for(const s of screens){
    s.paths.forEach((p,j)=>{
      const c=traceCh[j % Math.max(1,traceCh.length)]; if(!c) return;
      const rows=s.paths.length, y0=s.y+s.h*(j+.5)/rows, amp=s.h/rows*.4;
      let d=''; const N=40;
      for(let k=0;k<=N;k++){ const tt=simT-2+2*k/N; const v=Math.max(-1.5,Math.min(1.5,sample(tt,c)));
        d+=(k?'L':'M')+(s.x+s.w*k/N).toFixed(1)+','+(y0-v*amp).toFixed(1); }
      p.setAttribute('d',d); p.setAttribute('stroke',col); p.setAttribute('stroke-opacity',.9);
    });
  }
}
cv.addEventListener('pointermove',e=>{
  const r=cv.getBoundingClientRect(); const row=Math.floor((e.clientY-r.top-8)/rowH);
  const o = row>=0&&row<traceCh.length ? POOL[row] : null;
  if(o!==state.hover){ state.hover=o; root.querySelectorAll('.mapdot').forEach(d=>d.style.opacity=!o?1:(+d.dataset.i===o.i?1:.35)); drawGeometry(); }
});
cv.addEventListener('pointerleave',()=>{ state.hover=null; root.querySelectorAll('.mapdot').forEach(d=>d.style.opacity=1); drawGeometry(); });
const pauseBtn=$('#hw-pause');
pauseBtn.textContent='Pause';
pauseBtn.addEventListener('click',()=>{
  state.paused=!state.paused;
  pauseBtn.textContent=state.paused?'Resume':'Pause';
});

/* ============================================================
   Loop
   ============================================================ */
function frame(now){
  const dt=Math.min(.05,(now-(lastNow||now))/1000);
  lastNow=now;
  if(!state.paused) simT+=dt;
  if(stepTween(now)) drawGeometry();
  drawTraces();
  drawScreens();
}

/* ============================================================
   Boot
   ============================================================ */
drawFigure(); buildPool(); renderRail();
selectDevice('pieeg', false);

  function tick(now){
    if(stopped) return;
    if(visible) frame(now);
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  const io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
  }, { threshold: 0.08, rootMargin: "80px" });
  io.observe(root);

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    io.disconnect();
    window.removeEventListener('resize', sizeCanvas);
  };
}
