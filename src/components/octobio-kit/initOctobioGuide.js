/* OctoBio Kit guide: interactive demo + setup widgets.
   Generated from octobio-kit.html. Call initOctobioGuide(rootElement); it returns a cleanup function. */
// @ts-nocheck
export function initOctobioGuide(root) {
  if (!root) return () => {};
  let alive = true;
  const cleanups = [];


  
  const $=s=>root.querySelector(s);
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- simulated world ---------- */
  const S={eyes:false,focus:false,walkUntil:0,blinkUntil:0,jawUntil:0,knob:512,soil:620,
    band:{delta:.28,theta:.17,alpha:.18,beta:.2,gamma:.07},focusIdx:.5,relaxIdx:.5,rms:14,servo:90};
  const BANDS=[['delta','δ','#8b5cf6'],['theta','θ','#06b6d4'],['alpha','α','#22c55e'],['beta','β','#f59e0b'],['gamma','γ','#ef4444']];
  const FS=250, BUF=FS*4; const buf=new Float32Array(BUF); let wi=0; let tSig=0;
  let pink=0, pink2=0;
  function now(){return performance.now()}
  function targets(){
    const t=now(), blink=t<S.blinkUntil, jaw=t<S.jawUntil;
    let d=.28+(blink?.25:0), th=.17, a=S.eyes?.52:.16, b=S.focus?.34:.17, g=(jaw?.34:.06);
    if(S.focus&&!S.eyes) a*=.75;
    const sum=d+th+a+b+g; return {delta:d/sum,theta:th/sum,alpha:a/sum,beta:b/sum,gamma:g/sum};
  }
  function stepSignal(dt){
    const n=Math.min(200,Math.round(dt*FS));
    const t0=now();
    for(let i=0;i<n;i++){
      tSig+=1/FS;
      const r=Math.random()*2-1; pink=.97*pink+.25*r; pink2=.6*pink2+.4*(Math.random()*2-1);
      let v=pink*9+pink2*3;
      v+=(S.eyes?26:7)*Math.sin(2*Math.PI*10*tSig)*(0.75+0.25*Math.sin(2*Math.PI*.5*tSig));
      v+=(S.focus?9:4)*Math.sin(2*Math.PI*21*tSig+1.3);
      v+=6*Math.sin(2*Math.PI*1.6*tSig);
      if(t0<S.blinkUntil){const ph=1-(S.blinkUntil-t0)/350; v+=190*Math.exp(-Math.pow((ph-.45)/.18,2));}
      if(t0<S.jawUntil){v+=(Math.random()*2-1)*55+30*Math.sin(2*Math.PI*70*tSig);}
      buf[wi]=v; wi=(wi+1)%BUF;
    }
    // smooth band powers and indices
    const tg=targets(), k=1-Math.exp(-dt/0.6);
    for(const [b] of BANDS) S.band[b]+=(tg[b]-S.band[b])*k;
    const fi=S.band.beta/(S.band.beta+S.band.theta), ri=S.band.alpha/(S.band.alpha+S.band.beta);
    S.focusIdx+=(Math.min(1,Math.max(0,(fi-.4)/.45))-S.focusIdx)*k;
    S.relaxIdx+=(ri-S.relaxIdx)*k;
    let ss=0; for(let i=0;i<FS;i++){const x=buf[(wi-1-i+BUF)%BUF]; ss+=x*x;} S.rms=Math.sqrt(ss/FS);
  }

  /* ---------- lessons ---------- */
  const COL={eeg:'#3fc8ff',room:'#ffae42',mix:'#b690ff'};
  const L=[
    {id:'eyes',name:'Eyes closed, light on',hint:'alpha → LED',kind:'eeg',
     lead:'Close your eyes and the alpha rhythm (8 to 13 Hz) over the back of the head grows. One rule turns that into a light.',
     ctl:['eyes'],thr:{band:'alpha',v:.35},
     prog:s=>[['ev','forever'],['if','if <em>alpha</em> &gt; <em>35%</em>',1],['act','light <em>D10</em> on',2,'t'],['if','else',1,'E'],['act','light <em>D10</em> off',2,'e']],
     cond:s=>s.band.alpha>.35, out:'led',
     says:c=>c?'<b>Alpha is high</b>, so the light is on. Open your eyes and it drops.':'<b>Alpha is low</b> with eyes open. Close your eyes.',
     tags:['Biology: alpha rhythm','Programming: if / else','Threshold']},
    {id:'focus',name:'Focus meter',hint:'focus → servo',kind:'eeg',
     lead:'The focus index is mapped onto the servo angle, so the arm becomes a needle. It is an uncalibrated indicator, so it means "higher than a moment ago", not a score.',
     ctl:['focus','eyes'],
     prog:s=>[['ev','forever'],['act','servo to <em>map(focus, 0–1 → 0–180°)</em>',1,'t']],
     cond:()=>true, out:'servo', servo:s=>s.focusIdx*180,
     says:()=>'<b>Hold Concentrate</b> and beta climbs, the index rises and the needle swings.',
     tags:['Mapping a range','Beta band','Servo']},
    {id:'quiet',name:'Quiet room',hint:'alpha + no motion → screen',kind:'mix',
     lead:'Two readings, one action. If alpha is high and the motion sensor sees nobody, the screen asks for quiet.',
     ctl:['eyes','walk'],thr:{band:'alpha',v:.35},
     prog:s=>[['ev','forever'],['if','if <em>alpha</em> high <b>and</b> <em>no motion</em>',1],['act','screen <em>"shh"</em>',2,'t'],['if','else',1,'E'],['act','screen <em>"hello!"</em>',2,'e']],
     cond:s=>s.band.alpha>.35&&now()>s.walkUntil, out:'lcd',
     lcd:(s,c)=>c?['shh','quiet please']:['hello!',now()<s.walkUntil?'motion seen':'eyes open'],
     says:c=>c?'<b>Both are true</b>: alpha high and no motion.':'One condition is false. Close your eyes and let nobody walk by.',
     tags:['Combining two signals','PIR motion','16×2 LCD']},
    {id:'knob',name:'Follow the knob',hint:'no headset · knob → servo',kind:'room',
     lead:'A warm-up with no headset. Turn the knob and the servo follows. The knob is a raw count from 0 to 1023, mapped onto 0 to 180 degrees.',
     ctl:['knob'],
     prog:s=>[['ev','forever'],['act','servo to <em>map(knob, 0–1023 → 0–180°)</em>',1,'t']],
     cond:()=>true, out:'servo', servo:s=>s.knob/1023*180,
     says:()=>'<b>Analog in, angle out.</b> The same map block works for any reading.',
     tags:['Analog input','Mapping a range','No headset']},
    {id:'plant',name:'Plant care',hint:'soil → buzzer',kind:'room',
     lead:'The soil sensor reads a raw count. When it falls below the line, the soil is dry and the buzzer sounds.',
     ctl:['soil'],
     prog:s=>[['ev','forever'],['if','if <em>soil</em> &lt; <em>300</em>',1],['act','buzzer on',2,'t'],['if','else',1,'E'],['act','buzzer off',2,'e']],
     cond:s=>s.soil<300, out:'buzz',
     says:c=>c?'<b>Dry soil</b>: water the plant.':'<b>Soil is fine.</b> Drag the slider to dry it out.',
     tags:['Raw ADC counts','Threshold','Buzzer']},
    {id:'art',name:'Blink is not a thought',hint:'artifacts → screen',kind:'eeg',
     lead:'Blinks and jaw clenches are muscle, and they show up in the EEG as big swings in RMS and gamma. This rule flags them on the screen.',
     ctl:['blink','jaw'],thr:{band:'gamma',v:.22},
     prog:s=>[['ev','forever'],['if','if <em>RMS</em> &gt; <em>45 µV</em> or <em>gamma</em> &gt; <em>22%</em>',1],['act','screen <em>"artifact!"</em>',2,'t'],['if','else',1,'E'],['act','screen <em>"EEG ok"</em>',2,'e']],
     cond:s=>s.rms>45||s.band.gamma>.22, out:'lcd',
     lcd:(s,c)=>[c?'artifact!':'EEG ok','RMS '+s.rms.toFixed(0)+' uV'],
     says:c=>c?'<b>That was muscle</b>, not brain activity.':'<b>Clean signal.</b> Press Blink or Clench jaw.',
     tags:['Biology: artifacts','Signal quality','OR logic']}
  ];
  let cur=L[0];

  const CTL={
    eyes:{lab:'Close eyes',k:'E',type:'toggle',get:()=>S.eyes,set:v=>S.eyes=v},
    focus:{lab:'Concentrate (hold)',k:'Space',type:'hold',set:v=>S.focus=v},
    walk:{lab:'Walk by',k:'W',type:'tap',fire:()=>S.walkUntil=now()+3000},
    blink:{lab:'Blink',k:'B',type:'tap',fire:()=>S.blinkUntil=now()+350},
    jaw:{lab:'Clench jaw',k:'J',type:'tap',fire:()=>S.jawUntil=now()+700},
    knob:{type:'range',lab:'Knob (potentiometer)',min:0,max:1023,get:()=>S.knob,set:v=>S.knob=v,ends:['0','1023']},
    soil:{type:'range',lab:'Soil moisture',min:0,max:1023,get:()=>S.soil,set:v=>S.soil=v,ends:['dry','wet']}
  };

  const list=$('#useList');
  L.forEach((l,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<button role="tab" aria-selected="${i===0}" style="--c:${COL[l.kind]}"><i></i><b>${l.name}</b><span>${l.hint}</span></button>`;
    li.firstChild.addEventListener('click',()=>select(l));
    list.appendChild(li);
  });

  function select(l){
    cur=l; S.focus=false; S.eyes=false; S.walkUntil=0; for(let i=0;i<hist.length;i++)hist[i]=l.id==='plant'?S.soil:S.knob;
    list.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected',L[i]===l));
    root.style.setProperty('--sig',COL[l.kind]);
    $('#demoSig').innerHTML=`<i></i>${l.kind==='eeg'?'Octopus 16 · EEG':l.kind==='room'?'Starter kit · sensor':'EEG + room sensor'}`;
    $('#demoTitle').textContent=l.name;
    $('#demoLead').textContent=l.lead;
    $('#with').innerHTML=l.tags.map(t=>`<span class="chip">${t}</span>`).join('');
    buildControls(l);
    buildReadout(l);
    lastOut=''; render(true);
  }

  function buildControls(l){
    const c=$('#controls'); c.innerHTML='';
    l.ctl.forEach(id=>{
      const d=CTL[id];
      if(d.type==='range'){
        const w=document.createElement('div'); w.className='slider';
        w.innerHTML=`<label for="rg-${id}">${d.lab}<b id="rv-${id}">${d.get()}</b></label><input id="rg-${id}" type="range" min="${d.min}" max="${d.max}" value="${d.get()}"><small><span>${d.ends[0]}</span><span>${d.ends[1]}</span></small>`;
        const inp=w.querySelector('input');
        inp.addEventListener('input',()=>{d.set(+inp.value);w.querySelector('b').textContent=inp.value;});
        c.appendChild(w); return;
      }
      const b=document.createElement('button'); b.className='ctl'; b.type='button'; b.dataset.id=id;
      b.innerHTML=`${d.lab} <span class="k">${d.k}</span>`;
      if(d.type==='toggle'){b.setAttribute('aria-pressed',d.get());b.addEventListener('click',()=>{d.set(!d.get());b.setAttribute('aria-pressed',d.get());});}
      if(d.type==='hold'){
        const on=e=>{e.preventDefault();d.set(true);b.classList.add('held');}, off=()=>{d.set(false);b.classList.remove('held');};
        b.addEventListener('pointerdown',on);['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,off));
      }
      if(d.type==='tap'){b.addEventListener('click',()=>{d.fire();b.classList.add('held');setTimeout(()=>b.classList.remove('held'),300);});}
      c.appendChild(b);
    });
  }

  function buildReadout(l){
    const r=$('#readout');
    if(l.kind==='room'){r.innerHTML='';return;}
    r.innerHTML=`<div class="bands">${BANDS.map(([b,s,c])=>`<div class="band" style="--bc:${c}"><div class="lab"><span>${s} <span class="bn">${b}</span></span><b id="bv-${b}">0%</b></div><div class="track"><div class="fill" id="bf-${b}"></div>${l.thr&&l.thr.band===b?`<div class="thr" style="left:${l.thr.v*100}%"></div>`:''}</div></div>`).join('')}</div>
    <div class="stats" style="margin-top:10px"><span>Focus <b id="st-f">0.00</b></span><span>Relax <b id="st-r">0.00</b></span><span>RMS <b id="st-rms">0 µV</b></span><span id="st-ok"></span></div>`;
  }

  // keyboard
  function typing(e){const t=e.target;return t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);}
  function inView(){const r=$('#useStage').getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}
  const onKeyDown=e=>{
    if(typing(e)||!inView()||e.metaKey||e.ctrlKey||e.altKey) return;
    const k=e.key.toLowerCase();
    const has=id=>cur.ctl.includes(id);
    if(k==='e'&&has('eyes')){S.eyes=!S.eyes;const b=root.querySelector('.ctl[data-id="eyes"]');b&&b.setAttribute('aria-pressed',S.eyes);}
    else if(e.code==='Space'&&has('focus')){e.preventDefault();if(!e.repeat){S.focus=true;const b=root.querySelector('.ctl[data-id="focus"]');b&&b.classList.add('held');}}
    else if(k==='w'&&has('walk'))CTL.walk.fire();
    else if(k==='b'&&has('blink'))CTL.blink.fire();
    else if(k==='j'&&has('jaw'))CTL.jaw.fire();
  };;
  const onKeyUp=e=>{if(e.code==='Space'&&S.focus){S.focus=false;const b=root.querySelector('.ctl[data-id="focus"]');b&&b.classList.remove('held');}};
  document.addEventListener('keydown',onKeyDown);document.addEventListener('keyup',onKeyUp);
  cleanups.push(()=>{document.removeEventListener('keydown',onKeyDown);document.removeEventListener('keyup',onKeyUp);});

  /* ---------- outputs ---------- */
  function ledSvg(on){
    return `<svg viewBox="0 0 400 210" role="img" aria-label="LED D10 ${on?'on':'off'}">
      <defs><radialGradient id="glow"><stop offset="0" stop-color="#ff4a4a" stop-opacity=".9"/><stop offset="1" stop-color="#ff4a4a" stop-opacity="0"/></radialGradient></defs>
      ${on?'<circle cx="200" cy="88" r="92" fill="url(#glow)"/>':''}
      <path d="M170 150 V88 a30 30 0 0 1 60 0 V150 Z" fill="${on?'#ff3b3b':'#5a1d1d'}" stroke="${on?'#ffb3b3':'#7a2c2c'}" stroke-width="2"/>
      <ellipse cx="188" cy="82" rx="7" ry="16" fill="#fff" opacity="${on?.55:.15}"/>
      <rect x="164" y="150" width="72" height="10" rx="3" fill="#2a2f36"/>
      <rect x="182" y="160" width="4" height="30" fill="#8b929c"/><rect x="214" y="160" width="4" height="34" fill="#8b929c"/>
      <text x="200" y="205" text-anchor="middle" fill="#9aa2ad" font-size="13">Light D10 · ${on?'ON':'off'}</text></svg>`;
  }
  function servoSvg(a,line2){
    const rad=Math.PI*(1-a/180), cx=200, cy=150, L1=104;
    const x=cx+L1*Math.cos(rad), y=cy-L1*Math.sin(rad);
    let ticks='';for(let d=0;d<=180;d+=30){const r=Math.PI*(1-d/180);ticks+=`<line x1="${cx+120*Math.cos(r)}" y1="${cy-120*Math.sin(r)}" x2="${cx+130*Math.cos(r)}" y2="${cy-130*Math.sin(r)}" stroke="#4a515b" stroke-width="2"/><text x="${cx+146*Math.cos(r)}" y="${cy-146*Math.sin(r)+4}" text-anchor="middle" fill="#626973" font-size="11">${d}°</text>`;}
    return `<svg viewBox="0 0 400 236" role="img" aria-label="Servo at ${a.toFixed(0)} degrees">
      <path d="M70 150 A130 130 0 0 1 330 150" fill="none" stroke="#1d2229" stroke-width="10" stroke-linecap="round"/>
      <path d="M70 150 A130 130 0 0 1 ${cx+130*Math.cos(rad)} ${cy-130*Math.sin(rad)}" fill="none" stroke="var(--sig)" stroke-width="10" stroke-linecap="round"/>
      ${ticks}
      <rect x="170" y="138" width="60" height="34" rx="6" fill="#1f5fbf"/>
      <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#f2f2f2" stroke-width="9" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="11" fill="#fff"/>
      ${lcdSmall('Angle:'+a.toFixed(0),line2||'',200,208)}
    </svg>`;
  }
  function lcdSmall(l1,l2,cx,cy){
    return `<g transform="translate(${cx-80} ${cy-20})"><rect width="160" height="38" rx="4" fill="#123a8c" stroke="#2a5cc4"/><text x="10" y="16" fill="#cfe2ff" font-family="Geist Mono,monospace" font-size="12">${l1}</text><text x="10" y="31" fill="#cfe2ff" font-family="Geist Mono,monospace" font-size="12">${l2}</text></g>`;
  }
  function lcdSvg(l1,l2,alert){
    const pad=s=>(s||'').slice(0,16);
    return `<svg viewBox="0 0 400 200" role="img" aria-label="Screen shows ${pad(l1)} ${pad(l2)}">
      <rect x="20" y="30" width="360" height="140" rx="10" fill="#0d1a3a" stroke="#22314f"/>
      <rect x="44" y="54" width="312" height="92" rx="5" fill="${alert?'#1d4fc4':'#123a8c'}"/>
      ${Array.from({length:16},(_,i)=>`<rect x="${52+i*19}" y="62" width="16" height="34" rx="2" fill="#ffffff" opacity=".04"/><rect x="${52+i*19}" y="104" width="16" height="34" rx="2" fill="#ffffff" opacity=".04"/>`).join('')}
      <text x="54" y="88" fill="#e3eeff" font-family="Geist Mono,monospace" font-size="26" letter-spacing="2.9">${pad(l1)}</text>
      <text x="54" y="130" fill="#e3eeff" font-family="Geist Mono,monospace" font-size="26" letter-spacing="2.9">${pad(l2)}</text>
      <text x="200" y="192" text-anchor="middle" fill="#9aa2ad" font-size="13">16×2 screen</text></svg>`;
  }
  function buzzSvg(on,soil){
    const waves=on?[1,2,3].map(i=>`<path d="M${250+i*22} ${100-i*18} q${14} ${i*18} 0 ${i*36}" fill="none" stroke="var(--sig)" stroke-width="3" stroke-linecap="round" opacity="${1-i*.25}"><animate attributeName="opacity" values="${1-i*.25};.1;${1-i*.25}" dur=".5s" begin="${i*.12}s" repeatCount="indefinite"/></path>`).join(''):'';
    return `<svg viewBox="0 0 400 210" role="img" aria-label="Buzzer ${on?'sounding':'quiet'}">
      <circle cx="200" cy="100" r="54" fill="#15181d" stroke="#2d333b" stroke-width="3"/>
      <circle cx="200" cy="100" r="10" fill="#050607"/>
      ${waves}
      ${on?'':`<text x="300" y="106" fill="#626973" font-size="14">quiet</text>`}
      <g transform="translate(40 60)"><rect width="24" height="90" rx="6" fill="#1d2229"/><rect y="${90-soil/1023*90}" width="24" height="${soil/1023*90}" rx="6" fill="${soil<300?'#c98a3a':'#45a06b'}"/><text x="12" y="108" text-anchor="middle" fill="#626973" font-size="11">soil</text></g>
      <text x="200" y="195" text-anchor="middle" fill="#9aa2ad" font-size="13">Buzzer · ${on?'ON':'off'}</text></svg>`;
  }

  let lastOut='';
  function render(force){
    const l=cur, c=!!l.cond(S);
    const prog=l.prog(S);
    const html=prog.map(([k,t,ind,br])=>{
      let st='';
      if(br==='t') st=c?' live':' dim';
      if(br==='e') st=c?' dim':' live';
      if(br==='E') st=c?' dim':'';
      return `<span class="blk ${k}${ind?' in'+ind:''}${st}">${t}</span>`;
    }).join('');
    const blocks=$('#blocks'); if(force||blocks.innerHTML!==html) blocks.innerHTML=html;
    let out='';
    if(l.out==='led') out=ledSvg(c);
    else if(l.out==='servo'){S.servo+=((l.servo(S))-S.servo)*.25; out=servoSvg(S.servo,l.id==='focus'?'focus '+S.focusIdx.toFixed(2):'knob '+S.knob);}
    else if(l.out==='lcd'){const [a,b]=l.lcd(S,c); out=lcdSvg(a,b,c&&l.id==='art');}
    else if(l.out==='buzz') out=buzzSvg(c,S.soil);
    if(out!==lastOut){$('#out').innerHTML=out;lastOut=out;}
    $('#verdict').innerHTML=l.says(c);
    if(l.kind!=='room'){
      for(const [b] of BANDS){const f=$('#bf-'+b),v=$('#bv-'+b);if(f){f.style.width=(S.band[b]*100).toFixed(1)+'%';v.textContent=(S.band[b]*100).toFixed(0)+'%';}}
      const f=$('#st-f');if(f){f.textContent=S.focusIdx.toFixed(2);$('#st-r').textContent=S.relaxIdx.toFixed(2);$('#st-rms').textContent=S.rms.toFixed(0)+' µV';
        const ok=S.rms>=2&&S.rms<=200;$('#st-ok').innerHTML=`<span style="color:${ok?'var(--ok)':'var(--bad)'}">● EEG ${ok?'ok':'check'}</span>`;}
    }
  }

  /* ---------- canvas ---------- */
  const cv=$('#demoCanvas'), cx=cv.getContext('2d'); let W=0,H=0;
  const hist=new Float32Array(400); let hi=0;
  function size(){const r=cv.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=Math.round(W*d);cv.height=Math.round(H*d);cx.setTransform(d,0,0,d,0,0);}
  const ro=new ResizeObserver(size); ro.observe(cv); size(); cleanups.push(()=>ro.disconnect());
  function draw(){
    cx.clearRect(0,0,W,H);
    const sig=getComputedStyle(root).getPropertyValue('--sig').trim()||'#3fc8ff';
    cx.strokeStyle='rgba(255,255,255,.05)';cx.lineWidth=1;
    for(let i=1;i<4;i++){const y=H*i/4;cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke();}
    cx.font='11px Geist, sans-serif';cx.fillStyle='#626973';
    if(cur.kind==='room'){
      const val=cur.id==='knob'?S.knob:S.soil;
      hist[hi]=val;hi=(hi+1)%hist.length;
      cx.strokeStyle=sig;cx.lineWidth=2;cx.beginPath();
      for(let i=0;i<hist.length;i++){const v=hist[(hi+i)%hist.length];const x=i/(hist.length-1)*W,y=H-8-(v/1023)*(H-16);i?cx.lineTo(x,y):cx.moveTo(x,y);}cx.stroke();
      if(cur.id==='plant'){const y=H-8-(300/1023)*(H-16);cx.setLineDash([4,4]);cx.strokeStyle='rgba(255,255,255,.5)';cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke();cx.setLineDash([]);cx.fillText('dry below 300',8,y-5);}
      cx.fillText((cur.id==='knob'?'knob':'soil')+' · raw count 0–1023',8,14);
      return;
    }
    const n=BUF, scale=(H/2-8)/150;
    cx.strokeStyle=sig;cx.lineWidth=1.4;cx.beginPath();
    const step=Math.max(1,Math.floor(n/W/1.5));
    for(let i=0;i<n;i+=step){const v=buf[(wi+i)%n];const x=i/(n-1)*W,y=H/2-v*scale;i?cx.lineTo(x,y):cx.moveTo(x,y);}
    cx.stroke();
    cx.fillText('EEG · O1 · last 4 s · ±150 µV',8,14);
  }

  let last=now(), visible=true;
  const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting;},{threshold:0}); io.observe($('#useStage')); cleanups.push(()=>io.disconnect());
  function loop(){
    const t=now(), dt=Math.min(.1,(t-last)/1000); last=t;
    stepSignal(dt);
    if(visible){draw();render(false);}
    if(alive) rafId=requestAnimationFrame(loop);
  }
  for(let i=0;i<6;i++)stepSignal(.8);
  select(L[0]);
  for(let i=0;i<hist.length;i++)hist[i]=512;
  let rafId=requestAnimationFrame(loop); cleanups.push(()=>cancelAnimationFrame(rafId));

  /* ---------- setup steps ---------- */
  const kit=$('#kit'), prog=$('#kitProgress');
  function kp(){const all=kit.querySelectorAll('input'),n=[...all].filter(i=>i.checked).length;prog.textContent=`${n} of ${all.length} ready`;}
  kit.addEventListener('change',kp);kp();

  const FLASH={
    octo:{steps:['On <b>Flash</b>, plug the XIAO ESP32-S3 into the computer with a USB data cable.','Click <b>Install Octopus-16</b> and choose its port.','No port? Hold <b>BOOT</b>, tap <b>RESET</b>, release BOOT and install again.','Unplug and replug when it finishes.'],
      res:'It now shows up over Bluetooth as <code>Octopus-16-XXXX</code>.'},
    kit:{steps:['Close any other serial monitor (Arduino IDE, terminal) first.','On <b>Flash</b>, plug in the starter kit and click <b>Flash octoBio Kit</b>.','Choose its port. Flashing takes about 20 seconds.','Works with Arduino Uno / ATmega328P boards (official 16U2 or CH340).'],
      res:'The screen should say <code>octoBio Kit Ready</code>.'}
  };
  const fp=$('#flashPanel');
  function fl(k){fp.innerHTML=`<ol>${FLASH[k].steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="res">${FLASH[k].res}</div>`;
    root.querySelectorAll('#flashSeg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===k));}
  root.querySelectorAll('#flashSeg button').forEach(b=>b.addEventListener('click',()=>fl(b.dataset.f)));fl('octo');

  const PW={
    bank:{ok:true,lab:'Power bank',v:'<b style="color:var(--ok)">Safe.</b> The worn board is on its own battery, with no path to the mains.'},
    usb:{ok:false,lab:'Laptop USB',v:'<b style="color:var(--bad)">Not while worn.</b> USB from a computer is only for flashing, with the board off the head. A plugged-in laptop links the electrodes to the mains.'},
    wall:{ok:false,lab:'Wall charger',v:'<b style="color:var(--bad)">Never.</b> A wall charger connects the person to the mains through the electrodes.'}
  };
  function pw(k){
    const p=PW[k], c=p.ok?'#45dd8b':'#ff5a74';
    $('#pwrSvg').innerHTML=`
      <rect x="10" y="40" width="150" height="120" rx="16" fill="#0c0e12" stroke="#2d333b"/>
      ${k==='bank'?'<rect x="40" y="70" width="90" height="56" rx="10" fill="#15181d" stroke="#3a414a"/><rect x="52" y="84" width="50" height="10" rx="3" fill="#45dd8b"/><text x="85" y="145" text-anchor="middle" fill="#9aa2ad" font-size="12">5 V battery</text>':
       k==='usb'?'<rect x="34" y="66" width="102" height="62" rx="6" fill="#15181d" stroke="#3a414a"/><rect x="24" y="128" width="122" height="8" rx="3" fill="#3a414a"/><text x="85" y="152" text-anchor="middle" fill="#9aa2ad" font-size="12">laptop on mains</text>':
       '<rect x="58" y="62" width="54" height="66" rx="8" fill="#15181d" stroke="#3a414a"/><rect x="72" y="50" width="6" height="14" fill="#8b929c"/><rect x="92" y="50" width="6" height="14" fill="#8b929c"/><text x="85" y="152" text-anchor="middle" fill="#9aa2ad" font-size="12">mains adapter</text>'}
      <path d="M160 100 C 220 100, 260 100, 330 100" stroke="${c}" stroke-width="4" fill="none" stroke-dasharray="${p.ok?'0':'8 6'}"/>
      <circle cx="400" cy="100" r="60" fill="#0c0e12" stroke="#2d333b"/>
      <circle cx="400" cy="100" r="34" fill="#161a20" stroke="#c9a14a" stroke-width="3"/>
      ${Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2;return `<circle cx="${400+22*Math.cos(a)}" cy="${100+22*Math.sin(a)}" r="3.5" fill="#c9a14a"/>`}).join('')}
      <text x="400" y="182" text-anchor="middle" fill="#9aa2ad" font-size="12">Octopus 16, on a head</text>
      <circle cx="245" cy="70" r="16" fill="${c}"/><text x="245" y="76" text-anchor="middle" font-size="18" font-weight="800" fill="#050607">${p.ok?'✓':'!'}</text>`;
    $('#pwrVerdict').innerHTML=p.v;
    root.querySelectorAll('#pwrSeg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===k));
  }
  root.querySelectorAll('#pwrSeg button').forEach(b=>b.addEventListener('click',()=>pw(b.dataset.p)));pw('bank');



 
 const buttons=[...root.querySelectorAll('.photo-choice')];
 buttons.forEach((button,index)=>button.addEventListener('click',()=>{
  const photo=root.querySelector('#productPhoto');
  photo.src=button.querySelector('img').src; photo.alt=button.dataset.alt;
  root.querySelector('#productCaption').textContent=button.dataset.caption;
  root.querySelector('.gallery-head span:last-child').textContent=String(index+1).padStart(2,'0')+' / 03';
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 }));

  return () => { alive = false; cleanups.forEach((fn) => { try { fn(); } catch (e) {} }); };
}
