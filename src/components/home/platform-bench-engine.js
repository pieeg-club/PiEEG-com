/* Generated from tmp/new pages prototypes. Do not edit by hand. */
export function mountPlatformBench(root) {
  if (!root) return () => {};
  let raf = 0;
  let stopped = false;
  let visible = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ============================================================
   Config
   ============================================================ */
const DOCS = 'https://docs.pieeg.com';
const SITE = {
  server:'/server', dashboard:'/server', cloud:'/cloud', buddy:'https://buddy.pieeg.com/',
  agent:'/agent', chrome:'/browser', experiences:'/examples', sdk:'/browser',
  xr:'/xr', bioide:'https://ide.pieeg.com', aura:'https://aura.pieeg.com',
  biopose:'https://cloud.pieeg.com/experiences/biopose-recorder',
  bodypress:'https://play.google.com/store/apps/details?id=com.bodypress.governorhq',
  simulation:'https://cloud.pieeg.com/mock'
};
function hrefFor(l){
  if(l.ext) return l.h;
  if(l.h==='/cloud') return '/cloud';
  const p = state.part && SITE[state.part.id];
  if(l.primary && p && p.startsWith('/')) return p;
  return DOCS+l.h;
}
function external(l){ const h=hrefFor(l); return /^https?:/.test(h); }
const FAMILY = {core:'#22d3ee', browser:'#34d399', ai:'#a78bfa', stream:'#f59e0b', build:'#38bdf8'};
const LK = { /* link kinds */
  wire:{c:'#7fb2ff', name:'Wired data'},
  air:{c:'#b690ff', name:'Wireless'},
  net:{c:'#45dd8b', name:'Network'},
  osc:{c:'#ffae42', name:'OSC / UDP'},
  ai:{c:'#c58bff', name:'LLM call'}
};

/* ============================================================
   The platform, as documented
   ============================================================ */
const PARTS = [
{
  id:'server', name:'PiEEG Server', meta:'Python, the core', badge:'Start here', fam:'core',
  tagline:'The streaming core',
  filters:['run','build'],
  summary:'One Python process reads the board at 250 Hz and hands the samples to everything else: a WebSocket, the dashboard, a CSV file, LSL, OSC and webhooks.',
  caption:'Board → pieeg-server → anything that speaks WebSocket',
  scene:{
    nodes:[
      {id:'board', c:1, t:'Your board', s:'SPI, Bluetooth LE or USB', ic:'chip', part:'source'},
      {id:'mock', c:1, t:'Mock mode', s:'synthetic EEG, no hardware', ic:'chip', part:'source'},
      {id:'srv', c:2, t:'pieeg-server', s:'250 Hz loop, filter, spikes', ic:'server', part:'runtime', core:true},
      {id:'ws', c:3, t:'WebSocket :1616', s:'plain JSON frames', ic:'plug', part:'out', go:'ws'},
      {id:'dash', c:3, t:'Dashboard :1617', s:'React UI in your browser', ic:'browser', part:'out', go:'dashboard'},
      {id:'csv', c:3, t:'CSV recorder', s:'recordings/pieeg_*.csv', ic:'disk', part:'out'},
      {id:'any', c:4, t:'Any client', s:'Python, JS, notebooks, CLI', ic:'code', part:'out'},
      {id:'bridge', c:4, t:'LSL, OSC, webhooks', s:'switched on per run', ic:'net', part:'out', go:'lsl'}
    ],
    links:[['board','srv','SPI','wire'],['mock','srv','','wire'],['srv','ws','','wire'],['srv','dash','HTTP','net'],['srv','csv','','wire'],['ws','any','JSON','net'],['ws','bridge','','net']]
  },
  rows:[
    ['runtime','Runs on','Raspberry Pi 3, 4 or 5, a Jetson Nano, or any machine with Python 3.10+'],
    ['source','Reads','PiEEG 8 and 16 over SPI, JNEEG on Jetson, IronBCI over Bluetooth LE, IronBCI-32 over USB serial'],
    ['out','Ports','<code>ws://host:1616</code> for data, <code>http://host:1617</code> for the dashboard'],
    ['runtime','Install','<code>pip install pieeg-server</code>, or the one-line install script'],
    ['out','Licence','MIT']
  ],
  gets:['250 Hz streaming with a live Butterworth bandpass','CSV recording with session annotations','Terminal monitor with per-channel sparklines, works over SSH','Mock mode, so you can build before the board arrives','<code>pieeg-server doctor</code> for SPI, GPIO, ports and dependencies','Systemd service that starts on boot'],
  note:{h:'On a shared network', p:'EEG is biometric data. Start with <code>--auth</code> for a 6-digit access code, and keep ports 1616 and 1617 off the public internet.'},
  panel:{mode:'console', title:'What comes out', note:'Frames as they arrive on ws://host:1616', gen:'frames'},
  links:[{t:'Quick start', h:'/software/getting-started/quick-start', primary:true},{t:'Server features', h:'/software/features/server'}]
},
{
  id:'dashboard', name:'Dashboard', meta:'browser UI', fam:'core',
  tagline:'The room where you watch the signal',
  filters:['run','browser'],
  summary:'Open port 1617 and you get waveforms at 60 fps, spectra, a scrolling spectrogram, a 3D head map and a session library, with no install beyond the server itself.',
  caption:'Server → your browser → waveforms, spectra, a head you can rotate',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server', s:'or cloud.pieeg.com', ic:'server', part:'source', go:'server'},
      {id:'ws', c:2, t:'WebSocket :1616', s:'250 Hz JSON', ic:'plug', part:'source', go:'ws'},
      {id:'dash', c:3, t:'Dashboard', s:'React 19, Vite 6, Canvas 2D', ic:'browser', part:'runtime', core:true},
      {id:'wave', c:4, t:'Waveforms & FFT', s:'256-point FFT in a worker', ic:'wave', part:'out'},
      {id:'topo', c:4, t:'3D head map', s:'Three.js, GPU interpolated', ic:'globe', part:'out'},
      {id:'gal', c:4, t:'Experiences', s:'WebXR, sound, games', ic:'game', part:'out', go:'experiences'}
    ],
    links:[['srv','ws','','wire'],['ws','dash','JSON','net'],['dash','wave','','wire'],['dash','topo','','wire'],['dash','gal','','wire']]
  },
  rows:[
    ['runtime','Runs in','Any modern browser, on the same network as the server'],
    ['source','Reads','The WebSocket stream, or a recorded session from the library'],
    ['out','Shows','Waveforms, PSD, spectrogram, topographic map, per-channel statistics'],
    ['runtime','Open it','<code>http://raspberrypi.local:1617</code>'],
    ['out','Built with','React 19, Vite 6, Canvas 2D and Three.js, plain CSS']
  ],
  gets:['Session lobby, so you can join a stream with a shared code','Per-channel quality badges from live RMS','Click a channel for a zoomed trace, FFT, band bars and histogram','3D head topography, with an editor for your own electrode labels','Replay recordings with seek and speed control','Keyboard shortcuts: space, R, F, G, S, V, C, W'],
  note:{h:'Sparse montages stay honest', p:'The 3D field fades out wherever no electrode is near, so an 8-channel face montage never paints data where there is none.'},
  panel:{mode:'bands', title:'What you see', note:'Band powers and state, the way the dashboard reads them'},
  links:[{t:'Dashboard guide', h:'/software/features/dashboard', primary:true},{t:'Open the live demo', h:'https://cloud.pieeg.com', ext:true}]
},
{
  id:'cloud', name:'PiEEG Cloud', meta:'cloud.pieeg.com', badge:'No install', fam:'browser',
  tagline:'The whole platform in a browser tab',
  filters:['browser'],
  summary:'Open cloud.pieeg.com in Chrome or Edge, pair a board over Web Bluetooth or Web Serial, and stream. Decoding, filtering and FFT all run inside the tab.',
  caption:'Board → Chromium tab → the same dashboard, with nothing installed',
  scene:{
    nodes:[
      {id:'ble', c:1, t:'IronBCI, Octopus 16', s:'8 or 16 ch, Bluetooth LE', ic:'chip', part:'source'},
      {id:'usb', c:1, t:'IronBCI-32', s:'32 ch over USB serial', ic:'chip', part:'source'},
      {id:'demo', c:1, t:'Demo signal', s:'synthetic, no hardware', ic:'chip', part:'source', go:'simulation'},
      {id:'tab', c:2, t:'Chromium tab', s:'Web Bluetooth, Web Serial', ic:'browser', part:'runtime'},
      {id:'engine', c:3, t:'cloud.pieeg.com', s:'decode, DSP and FFT, here', ic:'cloud', part:'runtime', core:true},
      {id:'views', c:4, t:'Dashboard views', s:'waveforms, topomap, gallery', ic:'wave', part:'out', go:'dashboard'},
      {id:'bud', c:4, t:'Buddy', s:'read-only tools on the stream', ic:'robot', part:'out', go:'buddy'},
      {id:'lb', c:4, t:'Local Bridge', s:'OSC back to your machine', ic:'net', part:'out', go:'bridge'}
    ],
    links:[['ble','tab','BLE','air'],['usb','tab','USB','wire'],['demo','tab','','wire'],['tab','engine','','net'],['engine','views','','wire'],['engine','bud','','wire'],['engine','lb','P2P','net']]
  },
  rows:[
    ['runtime','Runs in','Chrome, Edge, Brave or Opera, over HTTPS'],
    ['source','Pairs with','IronBCI-8, IronBCI-16 and Octopus 16 over Bluetooth LE, IronBCI-32 over USB serial'],
    ['out','Gives you','The full dashboard, plus Buddy next door'],
    ['runtime','Install','Nothing. No login, no account'],
    ['out','Not here','Raspberry Pi SPI shields, LSL and OSC need the server or the desktop app']
  ],
  gets:['Streaming within seconds of opening the tab','A demo server button, for exploring with no board','Session codes, so someone else can watch your stream','Raw samples never leave the tab'],
  note:{h:'Firefox and Safari cannot pair', p:'Web Bluetooth and Web Serial only exist in Chromium browsers. Everything else on the page still works with the demo signal.'},
  panel:{mode:'bands', title:'What runs in the tab', note:'The whole signal chain, client side'},
  links:[{t:'Open cloud.pieeg.com', h:'https://cloud.pieeg.com', ext:true, primary:true},{t:'Cloud overview', h:'/cloud'}]
},
{
  id:'simulation', name:'Online Simulation', meta:'scripted EEG, no hardware', badge:'No hardware', fam:'browser',
  tagline:'A board you write, then run',
  filters:['browser','run'],
  summary:'Open cloud.pieeg.com/mock and you get a scripted EEG board. Layers stack on background rhythms. Run feeds the same dashboard path as the 8, 16 and 32 demos. No hardware, no server.',
  caption:'Rules and layers → synthetic µV at board rate → the same dashboard',
  scene:{
    nodes:[
      {id:'starters', c:1, t:'Starters', s:'blink, alpha, SSVEP, mains', ic:'disk', part:'source'},
      {id:'rules', c:1, t:'Rule editor', s:'board, bg, blink, tone', ic:'code', part:'source'},
      {id:'layers', c:2, t:'Layer stack', s:'blink, pulse, tone, EMG', ic:'wave', part:'runtime'},
      {id:'studio', c:3, t:'Custom mock', s:'µV at the board sample rate', ic:'chip', part:'runtime', core:true},
      {id:'stream', c:4, t:'demo:program', s:'same path as the demos', ic:'plug', part:'out'},
      {id:'dash', c:4, t:'Dashboard', s:'waveforms, FFT, gallery', ic:'browser', part:'out', go:'dashboard'},
      {id:'cloud', c:4, t:'cloud.pieeg.com', s:'the tab that hosts it', ic:'cloud', part:'out', go:'cloud'}
    ],
    links:[['starters','layers','','wire'],['rules','layers','apply','wire'],['layers','studio','stack','wire'],['studio','stream','','wire'],['stream','dash','JSON','net'],['studio','cloud','','net']]
  },
  rows:[
    ['runtime','Runs in','A browser tab, at <code>cloud.pieeg.com/mock</code>'],
    ['source','Builds from','A starter, or New. Layers from the palette, or a rule block'],
    ['out','Feeds','The same dashboard path as the 8 / 16 / 32 demos'],
    ['runtime','Connect string','<code>demo:program</code>'],
    ['out','Not this','A volume-conductor model, or recorded physiology']
  ],
  gets:['Starters for blink, occipital alpha, SSVEP, oddball pulse, 60 Hz mains, EMG bursts, quiet baseline','Layers that stack on δ θ α β γ, pink-ish noise and slow drift: they do not replace the background','Frontal maps to the first channels of the board, occipital to the last','Save stores a copy in this browser. Run starts the stream'],
  note:{h:'Timing is exact unless you add jitter', p:'A blink layer is a frontal sine bump of the amplitude you set. Use it to drive detectors and pipelines under known conditions, not as a substitute for a skull and a volume conductor.'},
  panel:{mode:'console', title:'What the studio emits', note:'Rules applied, then frames on demo:program', gen:'simulation'},
  links:[{t:'Open the studio', h:'https://cloud.pieeg.com/mock', ext:true, primary:true},{t:'Cloud overview', h:'/cloud'}]
},
{
  id:'buddy', name:'Buddy', meta:'browser AI agent', badge:'AI agent', fam:'ai',
  tagline:'Talk to your brain signal, with nothing installed',
  filters:['browser','ai'],
  summary:'A copilot that reads your live neural state through read-only tools and answers in plain language. It runs in the tab, with your own API key, next to a live brain panel.',
  caption:'Board → BuddyEngine in the tab → an LLM that pulls facts through tools',
  scene:{
    nodes:[
      {id:'board', c:1, t:'Your board', s:'Bluetooth LE or USB serial', ic:'chip', part:'source'},
      {id:'engine', c:2, t:'BuddyEngine', s:'features, state, patterns', ic:'cloud', part:'runtime'},
      {id:'agent', c:3, t:'The agent', s:'bounded tool-calling loop', ic:'robot', part:'runtime', core:true},
      {id:'llm', c:4, t:'Your LLM provider', s:'Anthropic, OpenAI, Ollama…', ic:'net', part:'out'},
      {id:'panel', c:4, t:'Brain panel', s:'state, bands, quality', ic:'wave', part:'out'}
    ],
    links:[['board','engine','BLE','air'],['engine','agent','tools','wire'],['agent','llm','key','ai'],['engine','panel','','wire']]
  },
  rows:[
    ['runtime','Runs in','A Chromium browser, entirely client side'],
    ['source','Reads','The same Web Bluetooth and Web Serial sources as the cloud dashboard'],
    ['out','Tools','Ten read-only tools: state, band powers, spectrum, artifacts, quality, connectivity, patterns'],
    ['runtime','Open it','<code>buddy.pieeg.com</code>'],
    ['out','Needs','Your own API key, or the built-in Echo provider for a no-key demo']
  ],
  gets:['Answers grounded in a fresh tool call, never in guesswork','Contrastive pattern training with leave-one-rep-out cross-validation','Balanced accuracy and per-channel importance for every pattern','A warming-up flag while readings settle','Trained patterns saved in your browser'],
  note:{h:'It observes, it does not act', p:'Every Buddy tool is read-only. The agent explains the signal and says when the stream is still warming up, rather than guessing. Research and prototyping, not clinical use.'},
  panel:{mode:'chat', title:'What a session sounds like', note:'Buddy answers from live tool calls', script:'buddy'},
  links:[{t:'Open Buddy', h:'https://buddy.pieeg.com/', ext:true, primary:true},{t:'Buddy docs', h:'/cloud/buddy'}]
},
{
  id:'agent', name:'PiEEG Agent', meta:'AI lab notebook', badge:'AI agent', fam:'ai',
  tagline:'A lab notebook you talk to',
  filters:['ai','run'],
  summary:'The server-side copilot. It listens on Lab Streaming Layer, trains classifiers by conversation, compares sessions and writes the Jupyter notebook for you.',
  caption:'Server → LSL → an agent that trains, compares and writes notebooks',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server --lsl', s:'250 Hz, filters applied', ic:'server', part:'source', go:'server'},
      {id:'lsl', c:2, t:'Lab Streaming Layer', s:'discovered on the network', ic:'net', part:'source', go:'lsl'},
      {id:'agent', c:3, t:'pieeg-agent web', s:'perception cascade, :8000', ic:'robot', part:'runtime', core:true},
      {id:'llm', c:4, t:'Your LLM provider', s:'cloud or local, your key', ic:'net', part:'out'},
      {id:'out', c:4, t:'Sessions & notebooks', s:'patterns, CSV, .ipynb', ic:'disk', part:'out', go:'notebooks'}
    ],
    links:[['srv','lsl','','wire'],['lsl','agent','LSL','net'],['agent','llm','','ai'],['agent','out','','wire']]
  },
  rows:[
    ['runtime','Runs on','Linux, macOS, WSL or Windows, next to the server'],
    ['source','Reads','An LSL stream from <code>pieeg-server --lsl</code>, or from mock mode'],
    ['out','Writes','Recorded sessions, trained patterns and generated notebooks'],
    ['runtime','Open it','<code>pieeg-agent web</code> at <code>localhost:8000</code>'],
    ['out','Providers','Anthropic, OpenAI, Groq, Together, Ollama, LM Studio, Echo']
  ],
  gets:['Pattern training by conversation, with honest cross-validated scores','Spectral analysis: alpha peak, 1/f slope, spectral entropy, frontal asymmetry','Connectivity between channels in a chosen band','Session recording and comparison with effect sizes','Notebook generation from a sentence','A terminal mode and one-shot questions, without the web UI'],
  note:{h:'Device control is gated', p:'Actions are off by default. With <code>--allow-actions</code> the agent only previews what it would do. Executing needs <code>--execute</code>, and every action passes an allowlist, a cooldown, a dry run and an audit log.'},
  panel:{mode:'chat', title:'What a session sounds like', note:'Training a pattern, in the agent web UI', script:'agent'},
  links:[{t:'Agent docs', h:'/software/integrations/pieeg-agent', primary:true},{t:'Compare with Buddy', h:'/cloud/buddy'}]
},
{
  id:'bioide', name:'bioIDE', meta:'browser IDE', badge:'No install', fam:'build',
  tagline:'JavaScript against a live EEG frame',
  filters:['browser','build'],
  summary:'Open ide.pieeg.com, pair a board or start a mock stream, and run JavaScript in a Web Worker against the latest frame. The sandbox injects EEG, bio, TensorFlow.js, plot() and console. There is no backend.',
  caption:'Board or mock → pieeg.js → a worker that can plot, classify and log',
  scene:{
    nodes:[
      {id:'ble', c:1, t:'Your board', s:'Web Bluetooth or Web Serial', ic:'chip', part:'source'},
      {id:'mock', c:1, t:'Mock stream', s:'synthetic EEG, no hardware', ic:'chip', part:'source'},
      {id:'js', c:2, t:'pieeg.js', s:'the same browser SDK', ic:'code', part:'source', go:'sdk'},
      {id:'ide', c:3, t:'bioIDE', s:'editor, worker, recipes', ic:'browser', part:'runtime', core:true},
      {id:'api', c:4, t:'EEG, bio, tf', s:'frame, features, models', ic:'code', part:'out'},
      {id:'plot', c:4, t:'plot() and console', s:'in the tab, as you run', ic:'wave', part:'out'}
    ],
    links:[['ble','js','BLE','air'],['mock','js','','wire'],['js','ide','frames','wire'],['ide','api','','wire'],['ide','plot','','wire']]
  },
  rows:[
    ['runtime','Runs in','A Chromium browser tab, at <code>ide.pieeg.com</code>'],
    ['source','Reads','A live board through pieeg.js, or a mock stream'],
    ['out','Injects','<code>EEG</code> (latest frame), <code>bio</code> (windows, features, small models), <code>tf</code> (TensorFlow.js on CPU), <code>plot()</code> and <code>console</code>'],
    ['runtime','Run','<code>Ctrl+Enter</code> / <code>⌘↵</code>. Student code stays in a Web Worker'],
    ['out','Needs','No server, no account, no install']
  ],
  gets:['Recipes for blink, focus and a small classifier','A mock button, so you can write before the board arrives','The same SDK the dashboard uses, so numbers match'],
  note:{h:'Code stays in the tab', p:'There is no backend. Hardware arrives through the JavaScript SDK. The live site is the editor, not a frozen syllabus.'},
  panel:{mode:'console', title:'What the worker sees', note:'A recipe reading the live frame', gen:'bioide'},
  links:[{t:'Open bioIDE', h:'https://ide.pieeg.com', ext:true, primary:true},{t:'JavaScript SDK', h:'/software/api/javascript-sdk'}]
},
{
  id:'xr', name:'PiEEG XR', meta:'face interface', fam:'stream',
  tagline:'Facial EMG and frontal EEG on a VR headset',
  filters:['run','stream'],
  summary:'A silicone mask with ten flat dry electrodes replaces the headset facial interface. Expressions and focus leave over Bluetooth LE, into OSC, WebXR, or a headset app.',
  caption:'Mask → Bluetooth LE → OSC, WebXR, or the headset app',
  scene:{
    nodes:[
      {id:'mask', c:1, t:'Face mask', s:'10 dry Ag/AgCl pads', ic:'chip', part:'source'},
      {id:'ble', c:2, t:'Bluetooth LE 5', s:'advertises as PiEEG XR', ic:'plug', part:'runtime'},
      {id:'host', c:3, t:'Headset or PC', s:'browser, OSC, or app', ic:'browser', part:'runtime', core:true},
      {id:'osc', c:4, t:'OSC out', s:'avatar parameters', ic:'game', part:'out', go:'osc'},
      {id:'webxr', c:4, t:'WebXR', s:'experiences in the headset', ic:'globe', part:'out', go:'experiences'},
      {id:'bp', c:4, t:'BodyPress', s:'live signal in the headset', ic:'wave', part:'out', go:'bodypress'}
    ],
    links:[['mask','ble','EMG','air'],['ble','host','BLE','air'],['host','osc','OSC','osc'],['host','webxr','','wire'],['host','bp','','wire']]
  },
  rows:[
    ['runtime','Runs on','A VR headset or a PC, over Bluetooth LE'],
    ['source','Reads','Facial EMG from the mask pads, and frontal EEG from the same forehead contacts'],
    ['out','Sends','OSC parameters, WebXR input, or a live view in BodyPress'],
    ['runtime','Pairs as','Bluetooth LE 5, advertising as PiEEG XR'],
    ['out','Rate','250 samples per second, 24-bit']
  ],
  gets:['Expressions and focus without a handheld controller','The same OSC path the server already uses for avatars','A headset app path through BodyPress, on the same radio'],
  note:{h:'The mask is the sensor', p:'This page is the software path. The hardware itself is the face interface on the boards map, not a separate acquisition stack.'},
  panel:{mode:'bands', title:'What the headset sees', note:'Band powers and state from the mask'},
  links:[{t:'PiEEG XR', h:'/xr', primary:true},{t:'VRChat OSC', h:'/software/integrations/vrchat-osc'}]
},
{
  id:'aura', name:'Aura VR', meta:'wrist EMG + IMU', badge:'Not shipping', fam:'stream',
  tagline:'Grip, pinch, flick and wrist motion, from the forearm',
  filters:['stream'],
  summary:'A wristband with four dry EMG contacts and a 6-axis IMU. Forearm muscle activity and wrist kinematics leave as one live stream into XR. Hardware is not shipping yet.',
  caption:'Wristband → EMG + IMU stream → XR runtime',
  scene:{
    nodes:[
      {id:'band', c:1, t:'Aura wristband', s:'4 dry EMG, 6-axis IMU', ic:'chip', part:'source'},
      {id:'radio', c:2, t:'Live stream', s:'muscle + kinematics', ic:'plug', part:'runtime'},
      {id:'rt', c:3, t:'XR runtime', s:'headset or PC', ic:'game', part:'runtime', core:true},
      {id:'gest', c:4, t:'Grip, pinch, flick', s:'from forearm EMG', ic:'wave', part:'out'},
      {id:'kin', c:4, t:'Wrist motion', s:'accel and gyro', ic:'globe', part:'out'}
    ],
    links:[['band','radio','EMG','air'],['radio','rt','IMU','air'],['rt','gest','','wire'],['rt','kin','','wire']]
  },
  rows:[
    ['runtime','Runs in','An XR runtime on a headset or PC, once the band ships'],
    ['source','Reads','Four dry EMG contacts around the wrist, plus a 6-axis IMU in the puck'],
    ['out','Sends','Gesture estimates and wrist kinematics as one timestamped stream'],
    ['runtime','Form','Textile strap, four contacts, one puck'],
    ['out','Status','Early access signup only. No hardware in the field yet']
  ],
  gets:['Muscle activity and wrist motion on the same clock','No cameras on the hands, so no occlusion from that path','A signup on aura.pieeg.com for when units are ready to try'],
  note:{h:'Not shipping yet', p:'Nothing on this card is a product you can buy. The map shows where the stream is designed to land, not a current device.'},
  panel:{mode:'console', title:'What the stream carries', note:'Simulated forearm EMG and IMU, not a recording', gen:'aura'},
  links:[{t:'Open Aura', h:'https://aura.pieeg.com', ext:true, primary:true}]
},
{
  id:'biopose', name:'BioPose', meta:'camera pose + bio', fam:'browser',
  tagline:'A body stick next to the live traces',
  filters:['browser','run'],
  summary:'A recording bench in the cloud tab. A camera estimates a body stick while the board stream paints beside it. Review, mark, and export the aligned session. Pose is a vision estimate. Pixels are not stored.',
  caption:'Camera + board → aligned pose and bio → review, mark, export',
  scene:{
    nodes:[
      {id:'cam', c:1, t:'Camera', s:'webcam, in the tab', ic:'globe', part:'source'},
      {id:'board', c:1, t:'PiEEG board', s:'live EEG or EMG', ic:'chip', part:'source', go:'cloud'},
      {id:'pose', c:2, t:'Pose estimator', s:'joints from pixels', ic:'code', part:'runtime'},
      {id:'rec', c:3, t:'BioPose', s:'aligned pose + bio', ic:'disk', part:'runtime', core:true},
      {id:'mark', c:4, t:'Review & mark', s:'timeline in the tab', ic:'browser', part:'out'},
      {id:'exp', c:4, t:'Export', s:'JSON or CSV, no pixels', ic:'disk', part:'out'}
    ],
    links:[['cam','pose','','wire'],['pose','rec','joints','wire'],['board','rec','bio','air'],['rec','mark','','wire'],['rec','exp','','wire']]
  },
  rows:[
    ['runtime','Runs in','A Chromium browser tab, at <code>cloud.pieeg.com</code>'],
    ['source','Reads','A webcam for the body stick, and a live PiEEG stream for the traces'],
    ['out','Writes','A marked session you can export. Pose keypoints, not video'],
    ['runtime','Open it','<code>cloud.pieeg.com/experiences/biopose-recorder</code>'],
    ['out','Keeps','Keypoints and traces. Camera pixels are not stored']
  ],
  gets:['A body stick drawn over the camera view, next to live bio traces','Review and markers on the same timeline as the signal','Export of pose and bio, without keeping the video','The same cloud pairing path as the dashboard'],
  note:{h:'Pose is an estimate', p:'The stick is a vision model reading the camera, not motion capture. Treat joint angles as approximate. Pixels never leave the tab as a recording.'},
  panel:{mode:'console', title:'What a take holds', note:'Simulated pose keypoints and bio traces, not a recording', gen:'biopose'},
  links:[{t:'Open BioPose', h:'https://cloud.pieeg.com/experiences/biopose-recorder', ext:true, primary:true},{t:'Experiences', h:'/examples', ext:true}]
},
{
  id:'bodypress', name:'BodyPress', meta:'phone and headset app', fam:'browser',
  tagline:'Live biosignals on a phone or a VR headset',
  filters:['run','browser'],
  summary:'Pairs over Bluetooth LE with PiEEG boards and heart-rate straps. Live waveforms, spectra, electrode quality, and a daily journal written from captures the app actually took.',
  caption:'Board or strap → BLE → BodyPress on phone or headset',
  scene:{
    nodes:[
      {id:'board', c:1, t:'PiEEG board', s:'8 to 32 ch, Bluetooth LE', ic:'chip', part:'source'},
      {id:'xr', c:1, t:'PiEEG XR', s:'mask on a headset', ic:'chip', part:'source', go:'xr'},
      {id:'hr', c:1, t:'Heart-rate strap', s:'BLE Heart Rate Profile', ic:'plug', part:'source'},
      {id:'app', c:2, t:'BodyPress', s:'phone or headset', ic:'browser', part:'runtime', core:true},
      {id:'live', c:3, t:'Live Signal', s:'waveform, FFT, quality', ic:'wave', part:'out'},
      {id:'log', c:4, t:'Journal', s:'from captured signals', ic:'disk', part:'out'}
    ],
    links:[['board','app','BLE','air'],['xr','app','BLE','air'],['hr','app','BLE','air'],['app','live','','wire'],['live','log','','wire']]
  },
  rows:[
    ['runtime','Runs on','A phone, or a VR headset, over Bluetooth LE'],
    ['source','Pairs with','PiEEG boards, PiEEG XR, BLE heart-rate straps, or a demo stream'],
    ['out','Shows','Time-domain waveforms, spectra, electrode quality, and a journal from those captures'],
    ['runtime','Install','The phone store, the headset store, or a sideload APK'],
    ['out','Licence','MIT']
  ],
  gets:['A live view without the Python server','Electrode quality on the same screen as the trace','Demo mode, so the UI is usable with no hardware','Headset processing stays on the device'],
  note:{h:'It writes from captures', p:'The journal is generated from signals the app recorded. It is not a clinical reading, and it does not write back into a health store.'},
  panel:{mode:'chat', title:'What a capture reads like', note:'Journal text from signals the app captured', script:'bodypress'},
  links:[{t:'Phone app', h:'https://play.google.com/store/apps/details?id=com.bodypress.governorhq', ext:true, primary:true},{t:'Headset app', h:'https://www.meta.com/experiences/bodypress/1271355469389420', ext:true}]
},
{
  id:'bridge', name:'Local Bridge', meta:'Rust, 5 MB', fam:'browser',
  tagline:'The browser reaches your desktop apps',
  filters:['browser','stream'],
  summary:'A single Rust binary in your system tray. The cloud tab opens a WebRTC channel straight to it, and it turns the stream into real OSC packets for VRChat, TouchDesigner, Max or Ableton.',
  caption:'Browser tab → WebRTC peer to peer → OSC on your own machine',
  scene:{
    nodes:[
      {id:'cloud', c:1, t:'cloud.pieeg.com', s:'a browser tab, no backend', ic:'cloud', part:'source', go:'cloud'},
      {id:'app', c:2, t:'pieeg-local-bridge', s:'tray app, control UI :47800', ic:'server', part:'runtime', core:true},
      {id:'router', c:3, t:'Router', s:'JSON leaves → OSC addresses', ic:'code', part:'runtime'},
      {id:'vrc', c:4, t:'VRChat', s:'avatar parameters', ic:'game', part:'out', go:'osc'},
      {id:'td', c:4, t:'TouchDesigner, Max', s:'anything listening for OSC', ic:'wave', part:'out'}
    ],
    links:[['cloud','app','P2P','net'],['app','router','','wire'],['router','vrc','OSC','osc'],['router','td','OSC','osc']]
  },
  rows:[
    ['runtime','Runs on','Windows, macOS and Linux, as one binary of about 5 MB'],
    ['source','Pairs by','A 6-character share code you type into the cloud tab'],
    ['out','Sends','OSC over UDP to 127.0.0.1 or any host on your LAN'],
    ['runtime','Control UI','<code>http://127.0.0.1:47800</code>'],
    ['out','Licence','MIT, written in Rust with Tokio']
  ],
  gets:['A direct peer-to-peer data channel, encrypted with DTLS','Nothing relayed through the cloud after the handshake','mDNS discovery of OSC apps already running','Explicit OSC envelopes, or automatic flattening of any JSON','One adapter per protocol, so new outputs drop in'],
  note:{h:'The share code is the key', p:'Whoever has the 6-character code can open a session. Regenerate it from the tray menu to mint a new session and cut off the old one.'},
  panel:{mode:'console', title:'What goes out on the wire', note:'OSC addresses leaving the bridge', gen:'osc'},
  links:[{t:'Local Bridge docs', h:'/cloud/local-bridge', primary:true}]
},
{
  id:'sdk', name:'pieeg.js', meta:'browser SDK', fam:'build',
  tagline:'One file, straight to the board',
  filters:['browser','build'],
  summary:'A zero-dependency browser library that connects to a board over Web Bluetooth or Web Serial, runs the same signal chain as the dashboard, and hands you band powers.',
  caption:'Board → pieeg.js → your own web app, no server anywhere',
  scene:{
    nodes:[
      {id:'ble', c:1, t:'IronBCI, Octopus 16', s:'8 or 16 ch, Bluetooth LE', ic:'chip', part:'source'},
      {id:'ser', c:1, t:'IronBCI-32', s:'32 ch at 500 Hz, USB', ic:'chip', part:'source'},
      {id:'js', c:2, t:'pieeg.js', s:'one file, no dependencies', ic:'code', part:'runtime', core:true},
      {id:'chain', c:3, t:'Signal chain', s:'Hampel → bandpass → notch', ic:'wave', part:'runtime'},
      {id:'app', c:4, t:'Your web app', s:'band powers, focus, relax', ic:'browser', part:'out'},
      {id:'ide', c:4, t:'bioIDE', s:'write JS against the frame', ic:'code', part:'out', go:'bioide'}
    ],
    links:[['ble','js','BLE','air'],['ser','js','USB','wire'],['js','chain','','wire'],['chain','app','','wire'],['chain','ide','','wire']]
  },
  rows:[
    ['runtime','Runs in','Chromium browsers, in a secure context, from a user gesture'],
    ['source','Devices','<code>ironbci-8</code>, <code>ironbci-16</code>, <code>octopus-16</code>, <code>ironbci-32</code>'],
    ['out','Gives you','FFT band powers, a focus index and a relaxation index'],
    ['runtime','Install','A script tag from jsDelivr, or install straight from the GitHub repo'],
    ['out','Needs','No Python, no server, no build step']
  ],
  gets:['The same filtering the dashboard uses, so numbers match','Device discovery at runtime with <code>PiEEG.devices()</code>','Callbacks for raw samples and for band powers','Works with any bundler, or with no bundler at all'],
  note:{h:'Pin a version', p:'Loading <code>@main</code> from a CDN always tracks the latest commit. Pin a tag for builds you need to reproduce.'},
  panel:{mode:'console', title:'What your code sees', note:'A connect call and the band powers that follow', gen:'sdk'},
  links:[{t:'SDK reference', h:'/software/api/javascript-sdk', primary:true}]
},
{
  id:'ws', name:'WebSocket API', meta:'the contract', fam:'build',
  tagline:'Plain JSON, in any language',
  filters:['build'],
  summary:'No SDK and no binary protocol. Every frame is a JSON object on a WebSocket, and every setting is a JSON command back the other way.',
  caption:'Frames out, commands in, on one socket',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server', s:'acquisition loop', ic:'server', part:'source', go:'server'},
      {id:'sock', c:2, t:'ws://host:1616', s:'UTF-8 JSON, one frame each', ic:'plug', part:'runtime', core:true},
      {id:'fr', c:3, t:'Frames out', s:'{ t, n, channels }', ic:'wave', part:'out'},
      {id:'cmd', c:3, t:'Commands in', s:'set_filter, start_record…', ic:'code', part:'out'},
      {id:'py', c:4, t:'Python', s:'websockets, asyncio', ic:'code', part:'out'},
      {id:'js', c:4, t:'JavaScript', s:'the browser WebSocket', ic:'browser', part:'out'},
      {id:'cli', c:4, t:'Anything else', s:'websocat, Unity, Max…', ic:'net', part:'out'}
    ],
    links:[['srv','sock','','wire'],['sock','fr','','wire'],['sock','cmd','','wire'],['fr','py','','net'],['fr','js','','net'],['cmd','cli','','net']]
  },
  rows:[
    ['runtime','Endpoint','<code>ws://host:1616</code>, or with <code>?token=</code> when auth is on'],
    ['source','Frame','<code>t</code> the timestamp, <code>n</code> the sample number, <code>channels</code> in µV'],
    ['out','Commands','Filter, recording, webhooks, OSC, LSL, spike and Hampel settings, ADS1299 registers'],
    ['runtime','Auth flow','POST the 6-digit code, fetch a socket token, then connect with it'],
    ['out','Needs','A WebSocket client. That is the whole dependency list']
  ],
  gets:['Live filter changes without restarting the stream','Recording started and stopped over the same socket','Register-level control of the ADS1299 on SPI boards','A welcome message that tells you which DSP engine is active'],
  note:{h:'Registers are partly protected', p:'Channel registers can be written live, but CONFIG1 to CONFIG3 are locked, so a stray command cannot change the sample rate or the reference underneath you.'},
  panel:{mode:'console', title:'What travels on the socket', note:'Frames out, and a command going back', gen:'ws'},
  links:[{t:'WebSocket reference', h:'/software/api/websocket', primary:true},{t:'Data format', h:'/software/api/data-format'}]
},
{
  id:'lsl', name:'Lab Streaming Layer', meta:'research tools', fam:'stream',
  tagline:'Into the tools your lab already uses',
  filters:['stream'],
  summary:'One flag publishes the stream on the LSL network, where OpenViBE, MNE, BCI2000, NeuroPype and LabRecorder can find it without knowing anything about PiEEG.',
  caption:'Server → LSL outlet → whatever your lab already runs',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server --lsl', s:'raw samples, per channel', ic:'server', part:'source', go:'server'},
      {id:'outlet', c:2, t:'LSL outlet', s:'named stream, on the LAN', ic:'net', part:'runtime', core:true},
      {id:'grp', c:3, t:'Channel groups', s:'EEG here, EOG there', ic:'code', part:'runtime'},
      {id:'ov', c:4, t:'OpenViBE, BCI2000', s:'existing pipelines', ic:'wave', part:'out'},
      {id:'mne', c:4, t:'MNE, pylsl', s:'a few lines of Python', ic:'code', part:'out'},
      {id:'rec', c:4, t:'LabRecorder', s:'synchronised recording', ic:'disk', part:'out'},
      {id:'agent', c:4, t:'PiEEG Agent', s:'the AI lab notebook', ic:'robot', part:'out', go:'agent'}
    ],
    links:[['srv','outlet','','wire'],['outlet','grp','','wire'],['grp','ov','LSL','net'],['grp','mne','LSL','net'],['grp','rec','','net'],['grp','agent','','net']]
  },
  rows:[
    ['runtime','Turn on','<code>pieeg-server --lsl</code>, or from the dashboard mid-session'],
    ['source','Sends','Raw samples, before any dashboard-side processing'],
    ['out','Found by','Anything that resolves an LSL stream by name or type'],
    ['runtime','Name it','<code>--lsl-name MyEEG</code> when you run more than one rig'],
    ['out','Groups','Several outlets at once, each carrying a subset of channels']
  ],
  gets:['Discovery with no IP addresses to type','A setup wizard for channel groups, shared with the OSC bridge','Start and stop over WebSocket, like every other output','The transport PiEEG Agent listens on'],
  note:{h:'One file, two integrations', p:'The wizard writes <code>~/.pieeg/lsl_groups.json</code>, and both LSL and the OSC bridge read it. Define your regions once.'},
  panel:{mode:'console', title:'What a consumer sees', note:'Resolving the stream and pulling samples', gen:'lsl'},
  links:[{t:'LSL guide', h:'/software/integrations/lsl', primary:true}]
},
{
  id:'osc', name:'VRChat OSC', meta:'UDP out', fam:'stream',
  tagline:'Band powers as avatar parameters',
  filters:['stream'],
  summary:'The server averages band powers, normalizes them against a rolling window and sends them to VRChat as chatbox text, avatar parameters, or both.',
  caption:'Server → OSC over UDP → your avatar reacts',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server --osc', s:'band powers, 4 Hz', ic:'server', part:'source', go:'server'},
      {id:'osc', c:2, t:'OSC bridge', s:'rolling normalization', ic:'net', part:'runtime', core:true},
      {id:'udp', c:3, t:'UDP 127.0.0.1:9000', s:'or any host you point at', ic:'plug', part:'runtime'},
      {id:'chat', c:4, t:'Chatbox', s:'band powers as text', ic:'browser', part:'out'},
      {id:'params', c:4, t:'Avatar parameters', s:'floats from 0 to 1', ic:'game', part:'out', go:'unity'}
    ],
    links:[['srv','osc','','wire'],['osc','udp','OSC','osc'],['udp','chat','','osc'],['udp','params','','osc']]
  },
  rows:[
    ['runtime','Turn on','<code>pieeg-server --osc</code>, or from the dashboard'],
    ['source','Sends','Band powers averaged across channels, or per region'],
    ['out','Modes','<code>chatbox</code>, <code>parameters</code>, or both'],
    ['runtime','Rate','Every 0.25 s by default, tunable with <code>--osc-interval</code>'],
    ['out','Regions','Frontal against parietal, EEG against EOG, however you group them']
  ],
  gets:['Parameter names that match what the Unity plugin registers','Live reconfiguration over WebSocket while VRChat is running','The same channel groups as the LSL integration','A dashboard experience for setting it up visually'],
  note:{h:'Normalized, not absolute', p:'Parameters are scaled against a rolling window of your own session, so 0.8 means high for you right now, not a fixed microvolt level.'},
  panel:{mode:'console', title:'What VRChat receives', note:'OSC messages at the default 4 Hz', gen:'osc'},
  links:[{t:'VRChat OSC guide', h:'/software/integrations/vrchat-osc', primary:true}]
},
{
  id:'webhooks', name:'Webhooks', meta:'IFTTT, Zapier', fam:'stream',
  tagline:'Your brain fires an HTTP request',
  filters:['stream'],
  summary:'Build a rule in the dashboard: when alpha passes a threshold, POST somewhere. The server relays it, enforces the cooldown and tells every client it fired.',
  caption:'A rule in the dashboard → an HTTP call → anything with a webhook',
  scene:{
    nodes:[
      {id:'dash', c:1, t:'Rules you build', s:'checked once a second', ic:'browser', part:'source', go:'dashboard'},
      {id:'srv', c:2, t:'Server relay', s:'cooldown, thread pool', ic:'server', part:'runtime', core:true},
      {id:'ifttt', c:3, t:'IFTTT', s:'value1, value2, value3', ic:'net', part:'out'},
      {id:'zap', c:3, t:'Zapier', s:'flat JSON to a catch hook', ic:'net', part:'out'},
      {id:'gen', c:3, t:'n8n, Home Assistant', s:'any endpoint taking POST', ic:'code', part:'out'},
      {id:'world', c:4, t:'Your lights or notes', s:'whatever that service does', ic:'game', part:'out'}
    ],
    links:[['dash','srv','fire','wire'],['srv','ifttt','HTTP','net'],['srv','zap','HTTP','net'],['srv','gen','HTTP','net'],['ifttt','world','','net'],['zap','world','','net'],['gen','world','','net']]
  },
  rows:[
    ['source','Triggers','Band power, raw amplitude or a band ratio, above or below a threshold'],
    ['runtime','Evaluated','In the dashboard, once a second, on the channels you pick'],
    ['out','Payload','Event, rule name, value, threshold, channel and timestamp'],
    ['runtime','Cooldown','Per rule, in seconds, enforced on the server'],
    ['out','Methods','POST, PUT, PATCH or GET, with your own Authorization header']
  ],
  gets:['A visual rule builder, no config files','Presets for IFTTT and Zapier payload shapes','A test button for each rule','A guided experience that gets your first webhook working in about a minute'],
  note:{h:'Check where they point', p:'A webhook relays data about you to an outside service. Review the URL and what the receiving automation does with it.'},
  panel:{mode:'console', title:'What gets sent', note:'A rule firing, and the request that follows', gen:'hook'},
  links:[{t:'Webhooks guide', h:'/software/integrations/webhooks', primary:true},{t:'IFTTT and Zapier', h:'/software/integrations/ifttt-zapier'}]
},
{
  id:'unity', name:'Unity plugin', meta:'0.2.0', fam:'stream',
  tagline:'Neuro-reactive avatars without code',
  filters:['stream','build'],
  summary:'Map a band to a blendshape or a shader property in a routing table, shape the curve, and preview it on your avatar in the editor while you wear the headset.',
  caption:'Server → Unity → a blendshape that follows your alpha',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server', s:'live WebSocket stream', ic:'server', part:'source', go:'server'},
      {id:'plug', c:2, t:'PiEEG Unity plugin', s:'Neuro Binder and Reactor', ic:'game', part:'runtime', core:true},
      {id:'route', c:3, t:'Routing table', s:'band → target, with a curve', ic:'code', part:'runtime'},
      {id:'avatar', c:4, t:'Your VRChat avatar', s:'via Modular Avatar', ic:'game', part:'out'},
      {id:'build', c:4, t:'Any Unity or XR build', s:'desktop, mobile, headset', ic:'globe', part:'out'}
    ],
    links:[['srv','plug','WS','net'],['plug','route','','wire'],['route','avatar','','wire'],['route','build','','wire']]
  },
  rows:[
    ['runtime','Runs in','Unity 2022.3 or newer'],
    ['source','Reads','The server WebSocket directly, with no third-party runtime'],
    ['out','Drives','Blendshapes and material floats, through an animation curve'],
    ['runtime','Install','Package Manager, from the plugin git URL'],
    ['out','VRChat','Needs the Avatars SDK 3.0 and Modular Avatar, and only compiles when both are there']
  ],
  gets:['Live preview in edit mode, so you tune curves while wearing the board','The server spectral pipeline ported faithfully, so preview matches OSC','Generated clips and a blend tree, merged without touching your base FX','A runtime component for projects that have nothing to do with VRChat'],
  note:{h:'Match the parameter names', p:'Run the OSC bridge on the server so it emits <code>/avatar/parameters/EEG_&lt;Band&gt;</code>. The names the plugin registers line up exactly.'},
  panel:{mode:'bands', title:'What drives the avatar', note:'The band values behind each mapping'},
  links:[{t:'Unity plugin guide', h:'/software/integrations/unity', primary:true}]
},
{
  id:'chrome', name:'Chrome extension', meta:'overlay', fam:'stream',
  tagline:'Your state, on top of any page',
  filters:['stream'],
  summary:'A Manifest V3 extension that connects to your server and overlays live cognitive state on whatever you are reading, with optional commentary from the agent.',
  caption:'Server → extension → an overlay on the page you are on',
  scene:{
    nodes:[
      {id:'srv', c:1, t:'pieeg-server', s:'running on localhost', ic:'server', part:'source', go:'server'},
      {id:'ext', c:2, t:'Chrome extension', s:'Manifest V3', ic:'browser', part:'runtime', core:true},
      {id:'ov', c:3, t:'Overlay', s:'on any page you visit', ic:'wave', part:'out'},
      {id:'agent', c:4, t:'PiEEG Agent', s:'optional AI commentary', ic:'robot', part:'out', go:'agent'}
    ],
    links:[['srv','ext','WS','net'],['ext','ov','','wire'],['ext','agent','HTTP','ai']]
  },
  rows:[
    ['runtime','Runs in','Chrome, loaded unpacked in developer mode'],
    ['source','Needs','<code>pieeg-server</code> running, or <code>--mock</code> with no hardware'],
    ['out','Shows','Real-time cognitive state on the current page'],
    ['runtime','Optional','<code>pieeg-agent web</code> on port 8000 for AI insights'],
    ['out','Install','Clone the repo, then load the folder from <code>chrome://extensions</code>']
  ],
  gets:['A state readout that follows you across tabs','A pairing with the agent, if you want it to comment','Nothing leaves your machine: it talks to localhost'],
  note:{h:'Not on the Web Store', p:'Chrome does not allow extensions that only talk to localhost, so this one is loaded unpacked. That is expected, not a warning sign.'},
  panel:{mode:'bands', title:'What the overlay shows', note:'State, updated while you read'},
  links:[{t:'Extension guide', h:'/software/integrations/pieeg-chrome', primary:true}]
},
{
  id:'experiences', name:'Experiences', meta:'gallery', fam:'core',
  tagline:'Fifteen minutes to something playable',
  filters:['run','build'],
  summary:'The dashboard ships a gallery of immersive pieces, and adding your own is one component file and one line in the registry. Detector hooks hand you focus, relaxation and blinks.',
  caption:'Detector hooks → one .tsx file → a card in the gallery',
  scene:{
    nodes:[
      {id:'dash', c:1, t:'Dashboard', s:'live EEG buffers', ic:'browser', part:'source', go:'dashboard'},
      {id:'hooks', c:2, t:'Detector hooks', s:'useFocus, useRelax, blink', ic:'code', part:'runtime'},
      {id:'exp', c:3, t:'Your experience', s:'one component, refs only', ic:'game', part:'runtime', core:true},
      {id:'gal', c:4, t:'Experiences gallery', s:'lazy loaded, code split', ic:'globe', part:'out'},
      {id:'xr', c:4, t:'WebXR headset', s:'hand tracking, 3D space', ic:'game', part:'out'}
    ],
    links:[['dash','hooks','','wire'],['hooks','exp','refs','wire'],['exp','gal','','wire'],['exp','xr','','wire']]
  },
  rows:[
    ['runtime','Written in','React and TypeScript, inside the dashboard'],
    ['source','Reads','Ring buffers through hooks, or directly for tighter control'],
    ['out','Ships with','Neural Wave Space, Blink Browser, sonification, Spoon Bend, Eye Track and more'],
    ['runtime','To add one','One <code>.tsx</code> file, plus one entry in the registry'],
    ['out','Cost','Code split, so a new experience does not slow the first load']
  ],
  gets:['Hooks that never trigger a re-render, read them in your animation loop','Per-user calibration built into focus and relaxation','An EOG gaze tracker with five-point calibration and online learning','Sonification that maps bands to drone, pad, lead and shimmer'],
  note:{h:'Read the refs, not the state', p:'Everything in the hot path flows through refs and Canvas. Read <code>.current</code> inside <code>requestAnimationFrame</code> and the dashboard keeps its 60 fps.'},
  panel:{mode:'bands', title:'What your loop reads', note:'The values behind the detector hooks'},
  links:[{t:'Experiences guide', h:'/software/features/experiences', primary:true},{t:'Detector reference', h:'/software/features/detectors'}]
},
{
  id:'core', name:'pieeg-core', meta:'Rust accelerator', fam:'build',
  tagline:'The same maths, a thousand times faster',
  filters:['build'],
  summary:'An optional Rust wheel that swaps the DSP hot paths for compiled versions at import time. Same API, same results, no configuration. If it is missing, Python carries on.',
  caption:'Same call, two implementations, picked once at startup',
  scene:{
    nodes:[
      {id:'raw', c:1, t:'Raw 24-bit samples', s:'from SPI, BLE or serial', ic:'chip', part:'source'},
      {id:'py', c:2, t:'Python reference', s:'always there, the fallback', ic:'code', part:'runtime'},
      {id:'rust', c:2, t:'pieeg-core', s:'Rust, bound in at import', ic:'server', part:'runtime', core:true},
      {id:'chain', c:3, t:'The three hot paths', s:'decode, filter, despike', ic:'wave', part:'runtime'},
      {id:'out', c:4, t:'Filtered µV', s:'16 ch at 250 Hz, on time', ic:'plug', part:'out'}
    ],
    links:[['raw','py','','wire'],['raw','rust','','wire'],['py','chain','','wire'],['rust','chain','fast','wire'],['chain','out','','wire']]
  },
  rows:[
    ['runtime','Install','<code>pip install \'pieeg-server[fast]\'</code>'],
    ['source','Replaces','24-bit decode, the Butterworth bandpass, the Hampel spike filter'],
    ['out','Speedup','Roughly 9× on decode, 15× on Hampel, about 1000× on the bandpass'],
    ['runtime','Check it','The startup panel, the WebSocket welcome message, or <code>pieeg-server doctor</code>'],
    ['out','Licence','AGPL-3.0-or-later, which is why it stays opt-in']
  ],
  gets:['No code changes: the class name rebinds, callers never notice','A clean fallback if the wheel is missing or fails to import','A bundled benchmark script for your own hardware','The default MIT install stays MIT'],
  note:{h:'Effectively required on 16 channels', p:'Filtering 16 channels at 250 Hz needs 4,000 samples a second. The pure-Python bandpass sits below that, so turn on server-side filtering at 16 channels and you want this wheel.'},
  panel:{mode:'console', title:'What the benchmark prints', note:'Five seconds, 16 channels, 250 Hz', gen:'bench'},
  links:[{t:'Accelerator docs', h:'/software/integrations/pieeg-core', primary:true},{t:'Architecture', h:'/software/reference/architecture'}]
},
{
  id:'notebooks', name:'Notebooks', meta:'Python analysis', fam:'build',
  tagline:'Where a session becomes a result',
  filters:['build'],
  summary:'Four starter notebooks take you from a recorded CSV or a live socket to blink detection, band powers and a feature table ready for scikit-learn.',
  caption:'CSV or live socket → pandas and Welch → features for a model',
  scene:{
    nodes:[
      {id:'csv', c:1, t:'A recorded session', s:'CSV with a timestamp column', ic:'disk', part:'source'},
      {id:'live', c:1, t:'The live socket', s:'stream straight into Python', ic:'plug', part:'source', go:'ws'},
      {id:'jl', c:2, t:'Jupyter Lab', s:'four starter notebooks', ic:'code', part:'runtime', core:true},
      {id:'an', c:3, t:'Analysis', s:'Welch, blinks, alpha', ic:'wave', part:'runtime'},
      {id:'ml', c:4, t:'Feature table', s:'windowed, ready for sklearn', ic:'disk', part:'out'}
    ],
    links:[['csv','jl','','wire'],['live','jl','WS','net'],['jl','an','','wire'],['an','ml','','wire']]
  },
  rows:[
    ['runtime','Runs on','Any machine with Python, not necessarily the Pi'],
    ['source','Reads','<code>recordings/pieeg_*.csv</code>, or frames pulled live over WebSocket'],
    ['out','Produces','Plots, band powers and a windowed feature CSV'],
    ['runtime','Setup','<code>pip install -r requirements.txt</code>, then <code>jupyter lab</code>'],
    ['out','Works with','Mock mode, so you can write the analysis before you record']
  ],
  gets:['Load and plot every channel in one cell','Threshold-based eye-blink detection','Band powers with Welch, and alpha tracked over time','A feature export that drops straight into scikit-learn'],
  note:{h:'The agent can write these too', p:'Ask PiEEG Agent for a notebook on a trained pattern and it generates one, with the ROC curve and feature importance already in place.'},
  panel:{mode:'console', title:'What the first cells print', note:'Loading a session and reading its shape', gen:'nb'},
  links:[{t:'Notebook guide', h:'/software/integrations/notebooks', primary:true}]
}
];

/* ============================================================
   Scene geometry and rendering
   ============================================================ */
const SW=1040, SH=500, NW=192, NH=68, TOPCAP=34;
const NS='http://www.w3.org/2000/svg';
const $=s=>root.querySelector(s);
const svg=$('#plat-scene');

const ICONS={
  chip:'M4,4h10v10H4Z M6.5,1.5v2.5 M11.5,1.5v2.5 M6.5,14v2.5 M11.5,14v2.5 M1.5,6.5h2.5 M1.5,11.5h2.5 M14,6.5h2.5 M14,11.5h2.5',
  server:'M2,3h14v4.5H2Z M2,10.5h14V15H2Z M5,5.2h0.01 M5,12.7h0.01',
  browser:'M2,3h14v12H2Z M2,6.5h14 M4.3,4.75h0.01 M6.3,4.75h0.01',
  cloud:'M5.2,14a3.7,3.7 0 0 1 0.4,-7.4a4.6,4.6 0 0 1 8.7,1.5a3,3 0 0 1 -0.6,5.9Z',
  plug:'M6,2v4 M12,2v4 M3.5,6h11v3a5.5,5.5 0 0 1 -11,0Z M9,14.5V17',
  code:'M6.5,5.5L2.5,9l4,3.5 M11.5,5.5L15.5,9l-4,3.5',
  wave:'M1.5,9q2.2,-6 4.4,0t4.4,0t4.4,0',
  game:'M2.5,6.5h13a2,2 0 0 1 2,2v3a2,2 0 0 1 -2,2h-2l-1.6,-2h-5.8L4.5,13.5h-2a2,2 0 0 1 -2,-2v-3a2,2 0 0 1 2,-2Z',
  net:'M9,2.5a2,2 0 1 1 0,0.01 M3.5,14a2,2 0 1 1 0,0.01 M14.5,14a2,2 0 1 1 0,0.01 M8,4.4L4.4,11.9 M10,4.4L13.6,11.9 M5.6,15h6.8',
  disk:'M2.5,3.5h13v11h-13Z M5.5,3.5v4h7v-4 M9,10.5a2,2 0 1 1 0,0.01',
  robot:'M9,1.5v2 M4,3.5h10a1.5,1.5 0 0 1 1.5,1.5v7a1.5,1.5 0 0 1 -1.5,1.5H4a1.5,1.5 0 0 1 -1.5,-1.5V5A1.5,1.5 0 0 1 4,3.5Z M6.3,7.8h0.01 M11.7,7.8h0.01 M6.5,11h5',
  globe:'M9,1.5a7.5,7.5 0 1 1 0,15a7.5,7.5 0 1 1 0,-15Z M1.5,9h15 M9,1.5q3.4,3.6 0,15 M9,1.5q-3.4,3.6 0,15'
};
function icon(k,x,y,color){
  return `<g transform="translate(${x},${y})" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".92">
    <path d="${ICONS[k]||ICONS.code}"/></g>`;
}
function layoutScene(sc){
  const cols=[...new Set(sc.nodes.map(n=>n.c))].sort((a,b)=>a-b);
  const span=(SW-56)/cols.length;
  cols.forEach((c,ci)=>{
    const list=sc.nodes.filter(n=>n.c===c);
    const cx=28+span*(ci+.5), k=list.length;
    const sp=Math.min(112,(SH-TOPCAP-40)/k);
    list.forEach((n,i)=>{
      n._cx=cx;
      n._cy=TOPCAP+(SH-TOPCAP)/2+(i-(k-1)/2)*sp;
      n._x=cx-NW/2; n._y=n._cy-NH/2;
    });
  });
}
function curve(a,b){
  const x1=a._x+NW, y1=a._cy, x2=b._x, y2=b._cy, dx=Math.max(26,(x2-x1)*.45);
  return {d:`M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`, mx:(x1+x2)/2, my:(y1+y2)/2};
}
function drawScene(part){
  const sc=part.scene, acc=FAMILY[part.fam];
  layoutScene(sc);
  const byId=Object.fromEntries(sc.nodes.map(n=>[n.id,n]));
  $('#plat-lCap').innerHTML=`<text x="28" y="26" class="t-cap">${part.caption}</text>`;
  /* links */
  let lh='';
  sc.links.forEach(([f,t,label,kind])=>{
    const a=byId[f], b=byId[t]; if(!a||!b) return;
    const col=LK[kind||'wire'].c, q=curve(a,b);
    lh+=`<g data-part="link" class="fade-in">
      <path d="${q.d}" fill="none" stroke="${col}" stroke-opacity=".26" stroke-width="1.6"/>
      <path class="flow" d="${q.d}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
      ${label?`<g transform="translate(${q.mx},${q.my-11})">
        <rect x="${-(label.length*3.6+8)}" y="-9" width="${label.length*7.2+16}" height="18" rx="9" fill="#0b0d11" stroke="${col}" stroke-opacity=".3"/>
        <text x="0" y="4" text-anchor="middle" style="font-size:11px;font-weight:500" fill="${col}">${label}</text></g>`:''}
    </g>`;
  });
  $('#plat-lLinks').innerHTML=lh;
  /* nodes */
  let nh='';
  sc.nodes.forEach(n=>{
    const isCore=!!n.core;
    const stroke=isCore?acc:'rgba(255,255,255,.13)';
    const fill=isCore?`color-mix(in srgb,${acc} 11%, #0c0e12)`:'#0c0e12';
    const icCol=isCore?acc:'#8b93a1';
    const tmax=n.go?16:19;
    const ts=Math.max(11.2, 13*Math.min(1,tmax/n.t.length));
    const ss=Math.max(9.4, 11*Math.min(1,23/n.s.length));
    nh+=`<g class="node${isCore?' core':''}${n.go?' link-out':''}" data-part="${n.part}" data-id="${n.id}" ${n.go?`data-go="${n.go}"`:''}>
      <rect class="plate" x="${n._x}" y="${n._y}" width="${NW}" height="${NH}" rx="15" fill="${fill}" stroke="${stroke}" stroke-width="${isCore?1.6:1}"/>
      ${icon(n.ic,n._x+15,n._y+NH/2-9,icCol)}
      <text class="t-main" x="${n._x+42}" y="${n._y+29}" style="font-size:${ts.toFixed(1)}px">${n.t}</text>
      <text class="t-sub" x="${n._x+42}" y="${n._y+46}" style="font-size:${ss.toFixed(1)}px">${n.s}</text>
      ${n.go?`<path d="M${n._x+NW-17},${n._y+14} l5,5 l-5,5" fill="none" stroke="#626973" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`:''}
      <rect x="${n._x}" y="${n._y}" width="${NW}" height="${NH}" rx="15" fill="transparent"/>
    </g>`;
  });
  $('#plat-lNodes').innerHTML=nh;
  /* interactions */
  svg.querySelectorAll('.node').forEach(g=>{
    const n=byId[g.dataset.id];
    g.addEventListener('pointerenter',e=>showTip(n,g));
    g.addEventListener('pointerleave',()=>showTip(null));
    if(g.dataset.go){
      g.addEventListener('click',()=>select(g.dataset.go));
      g.setAttribute('tabindex','0'); g.setAttribute('role','link');
      g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();select(g.dataset.go);} });
    }
  });
  /* legend */
  const kinds=[...new Set(sc.links.map(l=>l[3]||'wire'))];
  $('#plat-legend').innerHTML = kinds.map(k=>`<span><i style="background:${LK[k].c}"></i>${LK[k].name}</span>`).join('')
    + `<span class="hint" style="margin-left:auto;color:var(--dim)">Hover a spec row to trace it. Boxes with an arrow open that page.</span>`;
}
const tip=$('#plat-tip');
function showTip(n,g){
  if(!n){ tip.classList.remove('show'); return; }
  tip.innerHTML = n.go ? `<b>${n.t}</b> <span>— open this page</span>` : `<b>${n.t}</b> <span>${n.s}</span>`;
  const box=$('.stage').getBoundingClientRect(), r=g.getBoundingClientRect();
  tip.style.left=(r.left+r.width/2-box.left)+'px'; tip.style.top=(r.top-box.top)+'px';
  tip.classList.add('show');
}
function applyFocus(){
  const p=state.focus;
  svg.classList.toggle('focusing',!!p);
  svg.querySelectorAll('[data-part]').forEach(n=>n.classList.toggle('on', !!p && n.getAttribute('data-part')===p));
  root.querySelectorAll('.row').forEach(r=>r.classList.toggle('on', r.dataset.part===p));
}

/* ============================================================
   Simulated values behind the live panels
   ============================================================ */
let simT=0, lastNow=0;
function sim(t){
  const d=.16+.07*Math.sin(t*.13), th=.15+.08*Math.sin(t*.21+2), a=.3+.22*Math.sin(t*.31+1),
        b=.19+.1*Math.sin(t*.47+3), g=.07+.04*Math.sin(t*.71+4);
  const s=d+th+a+b+g;
  const o={Delta:d/s, Theta:th/s, Alpha:a/s, Beta:b/s, Gamma:g/s};
  o.focus=Math.max(.04,Math.min(.97,(o.Beta+o.Gamma)/(o.Alpha+o.Theta+o.Delta)*1.45));
  o.relax=Math.max(.04,Math.min(.97,o.Alpha*1.45));
  o.engage=Math.max(.04,Math.min(.97,(o.Beta*1.6+o.focus)*.62));
  return o;
}
const uv=(t,i)=>(Math.sin(t*6.4+i*1.7)*9+Math.sin(t*64+i)*3.4+Math.sin(t*20.3+i*.6)*5).toFixed(2);
const f2=v=>v.toFixed(2), f3=v=>v.toFixed(3);

/* ---------- console generators ---------- */
let frameN=42100;
const GEN={
  frames:t=>{
    frameN++;
    const ch=[0,1,2,3].map(i=>`<span class="n">${uv(t,i)}</span>`).join(', ');
    return `{<span class="k">"t"</span>: <span class="n">${(1757600000+t).toFixed(3)}</span>, <span class="k">"n"</span>: <span class="n">${frameN}</span>, <span class="k">"channels"</span>: [${ch}, <span class="c">… 12 more</span>]}`;
  },
  ws:t=>{
    frameN++;
    if(frameN%9===0) return `<span class="c">→</span> {<span class="k">"cmd"</span>: <span class="s">"set_filter"</span>, <span class="k">"enabled"</span>: <span class="n">true</span>, <span class="k">"lowcut"</span>: <span class="n">1.0</span>, <span class="k">"highcut"</span>: <span class="n">40.0</span>}`;
    if(frameN%9===1) return `<span class="c">←</span> {<span class="k">"type"</span>: <span class="s">"filter"</span>, <span class="k">"enabled"</span>: <span class="n">true</span>, <span class="k">"band"</span>: <span class="s">"1.0–40.0 Hz"</span>}`;
    const ch=[0,1,2].map(i=>`<span class="n">${uv(t,i)}</span>`).join(', ');
    return `<span class="c">←</span> {<span class="k">"t"</span>: <span class="n">${(1757600000+t).toFixed(3)}</span>, <span class="k">"n"</span>: <span class="n">${frameN}</span>, <span class="k">"channels"</span>: [${ch}, <span class="c">…</span>]}`;
  },
  osc:t=>{
    const s=sim(t), k=Math.floor(simT*4)%5;
    const band=['Delta','Theta','Alpha','Beta','Gamma'][k];
    return `<span class="s">/avatar/parameters/EEG_${band}</span>   <span class="n">${f3(s[band])}</span>  <span class="c">→ 127.0.0.1:9000</span>`;
  },
  hook:t=>{
    const s=sim(t), v=(s.Alpha*48).toFixed(2), k=frameN++%4;
    if(k===0) return `<span class="c">rule</span> <span class="hl">"Alpha alert"</span>  alpha <span class="n">${v}</span> µV²/Hz  <span class="c">threshold 20</span>`;
    if(k===1) return `<span class="hl">fired</span>  <span class="c">POST</span> <span class="s">https://maker.ifttt.com/trigger/…</span>`;
    if(k===2) return `{<span class="k">"event"</span>: <span class="s">"band_power_above"</span>, <span class="k">"value"</span>: <span class="n">${v}</span>, <span class="k">"threshold"</span>: <span class="n">20</span>, <span class="k">"channel"</span>: <span class="n">0</span>}`;
    return `<span class="c">200 OK  ·  cooldown 30 s  ·  broadcast to 2 clients</span>`;
  },
  lsl:t=>{
    const k=frameN++%5;
    if(k===0) return `<span class="c">&gt;&gt;&gt;</span> streams = <span class="hl">resolve_stream</span>(<span class="s">'name'</span>, <span class="s">'PiEEG'</span>)`;
    if(k===1) return `<span class="c">found</span> <span class="hl">PiEEG</span>  type <span class="s">EEG</span>  <span class="n">16</span> ch  <span class="n">250</span> Hz  float32`;
    const ch=[0,1,2].map(i=>`<span class="n">${uv(t,i)}</span>`).join(', ');
    return `<span class="c">&gt;&gt;&gt;</span> inlet.pull_sample() <span class="c">→</span> ([${ch}, <span class="c">…</span>], <span class="n">${(1757600000+t).toFixed(3)}</span>)`;
  },
  sdk:t=>{
    const s=sim(t), k=frameN++%6;
    if(k===0) return `<span class="c">&gt;</span> <span class="hl">await</span> eeg.<span class="k">connectBLE</span>({ device: <span class="s">'octopus-16'</span> })`;
    if(k===1) return `<span class="c">Connected to Octopus 16 — 16 ch @ 250 Hz</span>`;
    return `Alpha <span class="n">${f2(s.Alpha)}</span>  Beta <span class="n">${f2(s.Beta)}</span>   focus <span class="n">${f2(s.focus)}</span>  relax <span class="n">${f2(s.relax)}</span>`;
  },
  bioide:t=>{
    const s=sim(t), k=frameN++%6;
    if(k===0) return `<span class="c">// recipe: blink</span>`;
    if(k===1) return `<span class="hl">plot</span>(EEG.channels[0])`;
    if(k===2) return `<span class="c">frame</span>  n=<span class="n">${frameN}</span>  ch0 <span class="n">${uv(t,0)}</span> µV`;
    if(k===3) return `alpha <span class="n">${f2(s.Alpha)}</span>  beta <span class="n">${f2(s.Beta)}</span>`;
    if(k===4) return `<span class="c">bio.features()</span>  lineLength <span class="n">${(s.Beta*12).toFixed(2)}</span>`;
    return `<span class="c">console</span>  blink p <span class="n">${f2(0.2+s.Gamma)}</span>`;
  },
  simulation:t=>{
    const k=frameN++%6;
    if(k===0) return `<span class="c">#</span> board <span class="n">8</span>ch <span class="n">250</span>Hz`;
    if(k===1) return `<span class="c">bg</span>  delta <span class="n">12</span>  theta <span class="n">9</span>  alpha <span class="n">18</span>  noise <span class="n">6</span>  drift <span class="n">6</span>`;
    if(k===2) return `<span class="hl">blink</span> every <span class="n">2</span>s  duration <span class="n">250</span>ms  amp <span class="n">180</span>  frontal`;
    if(k===3) return `<span class="c">connect</span>  <span class="s">demo:program</span>`;
    const ch=[0,1,2].map(i=>`<span class="n">${uv(t,i)}</span>`).join(', ');
    return `{<span class="k">"n"</span>: <span class="n">${frameN}</span>, <span class="k">"channels"</span>: [${ch}, <span class="c">…</span>]} <span class="c">µV</span>`;
  },
  aura:t=>{
    const emg=(0.12+0.55*Math.max(0,Math.sin(t*1.7))).toFixed(3);
    const k=frameN++%4;
    if(k===0) return `<span class="c">ch0–ch3 RMS</span>  <span class="n">${emg}</span>  <span class="n">${(emg*0.72).toFixed(3)}</span>  <span class="n">${(emg*0.41).toFixed(3)}</span>  <span class="n">${(emg*0.18).toFixed(3)}</span>`;
    if(k===1) return `<span class="c">accel g</span>  x <span class="n">${(Math.sin(t*2.1)*0.4).toFixed(3)}</span>  y <span class="n">${(Math.sin(t*1.3)*0.2).toFixed(3)}</span>  z <span class="n">${(0.98+Math.sin(t)*.02).toFixed(3)}</span>`;
    if(k===2) return `<span class="c">gyro °/s</span>  x <span class="n">${(Math.sin(t*3.4+1)*42).toFixed(1)}</span>  y <span class="n">${(Math.sin(t*2.2)*18).toFixed(1)}</span>  z <span class="n">${(Math.sin(t*1.1)*9).toFixed(1)}</span>`;
    return `<span class="c">window</span>  grip envelope <span class="n">${emg}</span>  <span class="c">this session, not a classifier claim</span>`;
  },
  biopose:t=>{
    const k=frameN++%4;
    const hip=(Math.sin(t*1.1)*18).toFixed(1);
    const knee=(42+Math.sin(t*1.4)*12).toFixed(1);
    const rms=(12+8*Math.max(0,Math.sin(t*2.2))).toFixed(1);
    if(k===0) return `<span class="c">pose</span>  L hip <span class="n">${hip}</span>°  L knee <span class="n">${knee}</span>°  <span class="c">vision estimate</span>`;
    if(k===1) return `<span class="c">bio</span>  ch0 RMS <span class="n">${rms}</span> µV  <span class="n">${(rms*0.8).toFixed(1)}</span>  <span class="n">${(rms*0.55).toFixed(1)}</span>`;
    if(k===2) return `<span class="c">mark</span>  t=<span class="n">${(t%60).toFixed(2)}</span>s  <span class="s">stand</span>`;
    return `<span class="c">export</span>  keypoints + traces  <span class="c">pixels not stored</span>`;
  },
  bench:()=>{
    const k=frameN++%5;
    if(k===0) return `<span class="c">$</span> python -m scripts.bench_native --seconds 5`;
    if(k===1) return `<span class="c">hot path                 python        pieeg-core     speedup</span>`;
    if(k===2) return `MultichannelFilter     <span class="n">992</span>/s     <span class="n">1,048,658</span>/s     <span class="hl">~1057×</span>`;
    if(k===3) return `HampelFilter        <span class="n">24,619</span>/s       <span class="n">358,361</span>/s       <span class="hl">~15×</span>`;
    return `decode_channels    <span class="n">121,352</span>/s     <span class="n">1,134,301</span>/s        <span class="hl">~9×</span>`;
  },
  nb:t=>{
    const s=sim(t), k=frameN++%5;
    if(k===0) return `<span class="c">In [1]:</span> df = pd.<span class="k">read_csv</span>(<span class="s">"pieeg_20260401_143136.csv"</span>)`;
    if(k===1) return `<span class="c">Out[1]:</span> shape <span class="n">(75000, 17)</span>  ·  <span class="n">300</span> s at <span class="n">250</span> Hz`;
    if(k===2) return `<span class="c">In [2]:</span> f, pxx = welch(df[<span class="s">"ch1"</span>], fs=<span class="n">250</span>, nperseg=<span class="n">512</span>)`;
    if(k===3) return `<span class="c">Out[2]:</span> alpha <span class="n">${(s.Alpha*31).toFixed(1)}</span> µV²/Hz  ·  peak <span class="n">${(9.6+s.Alpha*1.6).toFixed(1)}</span> Hz`;
    return `<span class="c">In [3]:</span> blinks detected: <span class="n">${18+Math.floor(s.Beta*20)}</span>  ·  features → <span class="s">features.csv</span>`;
  }
};

/* ---------- panel renderers ---------- */
const BANDS=[['Delta','δ','#8b5cf6','0.5–4 Hz'],['Theta','θ','#06b6d4','4–8 Hz'],['Alpha','α','#22c55e','8–13 Hz'],['Beta','β','#f59e0b','13–30 Hz'],['Gamma','γ','#ef4444','30–100 Hz']];
const SCRIPTS={
  buddy:[
    ['you','how’s my signal?'],
    ['Buddy','All channels read “good”, quality 0.97 — trustworthy.'],
    ['you','am I focused or relaxed right now?'],
    ['Buddy','Relaxed, for you right now. Alpha is dominant and focus is low. Readings are within-session, not clinical.'],
    ['you','which of my trained patterns is firing?'],
    ['Buddy','“meditation” is active, p ≈ 0.88. Leave-one-rep-out balanced accuracy 0.89, reading mostly O1 and O2.']
  ],
  agent:[
    ['you','train a pattern called “meditation”'],
    ['copilot','First, sit normally with your eyes open. Ready to record rest for 4 seconds?'],
    ['you','yes'],
    ['copilot','Captured 32 frames, quality 0.94. Now close your eyes and meditate.'],
    ['copilot','Pattern trained. Balanced accuracy 0.89, leave-one-rep-out. Top cue: alpha rising in O1 and O2.'],
    ['you','create a notebook analysing it'],
    ['copilot','Created meditation_analysis.ipynb — ROC curve, feature importance, band power over time.']
  ],
  bodypress:[
    ['app','BLE connected. 8 channels at 250 Hz. Quality 0.91.'],
    ['you','what did this capture hold?'],
    ['app','Alpha dominant for 6 of 8 minutes. Two channels dropped below 0.6 quality at minute 4.'],
    ['you','heart rate?'],
    ['app','Strap on. Mean 68 bpm, RMSSD 41 ms, from RR intervals this session.']
  ]
};
let panel={mode:null}, conLines=[], conTimer=0, chatState=null;
function buildPanel(p){
  const b=$('#plat-panelBody'); panel={mode:p.panel.mode, cfg:p.panel};
  $('#plat-panelTitle').textContent=p.panel.title;
  $('#plat-panelNote').textContent=p.panel.note;
  conLines=[]; conTimer=0; frameN=42100;
  if(p.panel.mode==='console'){
    b.innerHTML=`<div class="console" id="plat-con"></div>`;
    for(let i=0;i<6;i++){ conLines.push(GEN[p.panel.gen](simT-1+i*.15)); }
    paintConsole();
  } else if(p.panel.mode==='bands'){
    b.innerHTML=`<div class="bands">
      <div class="barwrap">${BANDS.map(([k,gl,c])=>`<div class="bar"><div class="fill" data-b="${k}" style="background:${c};height:20%"></div><div class="lb"><b style="color:${c}">${gl}</b>${k}</div></div>`).join('')}</div>
      <div class="meters">
        ${['focus','relax','engage'].map(m=>`<div class="meter"><div class="mh"><span>${m==='engage'?'engagement':m}</span><b data-m="${m}">0.00</b></div><div class="track"><div class="val" data-v="${m}" style="width:20%"></div></div></div>`).join('')}
        <div class="foot">These are 0 to 1 within this session, not absolute or clinical values.</div>
      </div></div>`;
    tickBands();
  } else {
    b.innerHTML=`<div class="chat" id="plat-chat"></div>`;
    chatState={script:SCRIPTS[p.panel.script], i:0, chars:0, wait:.35, node:null};
    if(reduce){
      chatState=null;
      b.querySelector('#chat').innerHTML = SCRIPTS[p.panel.script].map(([who,tx])=>
        `<div class="msg ${who==='you'?'you':'bot'}"><span class="who">${who}</span>${tx}</div>`).join('');
    }
  }
}
function paintConsole(){
  const c=$('#plat-con'); if(!c) return;
  c.innerHTML=conLines.map(l=>`<div>${l}</div>`).join('');
}
function tickConsole(dt){
  if(state.paused) return;
  conTimer-=dt;
  if(conTimer<=0){
    conTimer=.62;
    conLines.push(GEN[panel.cfg.gen](simT));
    if(conLines.length>9) conLines.shift();
    paintConsole();
  }
}
function tickBands(){
  const s=sim(simT);
  BANDS.forEach(([k])=>{ const el=root.querySelector(`[data-b="${k}"]`); if(el) el.style.height=(6+s[k]*180)+'%'; });
  ['focus','relax','engage'].forEach(m=>{
    const key=m==='engage'?'engage':m, v=s[key];
    const t=root.querySelector(`[data-m="${m}"]`), bar=root.querySelector(`[data-v="${m}"]`);
    if(t) t.textContent=f2(v); if(bar) bar.style.width=(v*100)+'%';
  });
}
function tickChat(dt){
  const box=$('#plat-chat'); if(!box||!chatState||state.paused) return;
  const cs=chatState;
  if(cs.wait>0){ cs.wait-=dt; return; }
  if(cs.i>=cs.script.length){ cs.wait=3.4; cs.i=0; box.innerHTML=''; return; }
  const [who,text]=cs.script[cs.i];
  if(!cs.node){
    const d=document.createElement('div');
    d.className='msg '+(who==='you'?'you':'bot');
    d.innerHTML=`<span class="who">${who}</span><span class="tx"></span><span class="caret"></span>`;
    box.appendChild(d);
    while(box.children.length>3) box.removeChild(box.firstChild);
    cs.node=d.querySelector('.tx'); cs.chars=0;
  }
  cs.chars += dt*(reduce?9999:54);
  const shown=text.slice(0,Math.floor(cs.chars));
  cs.node.textContent=shown;
  if(shown.length>=text.length){
    const car=cs.node.parentElement.querySelector('.caret'); if(car) car.remove();
    cs.node=null; cs.i++; cs.wait=.9;
  }
}

/* ============================================================
   UI
   ============================================================ */
const state={part:null, filter:'all', focus:null, layer:null, paused:false};
function renderRail(){
  const rail=$('#plat-rail'); rail.innerHTML='';
  PARTS.forEach(p=>{
    const b=document.createElement('button'); b.className='dev'; b.dataset.id=p.id;
    b.innerHTML=`<b>${p.name}</b><span>${p.meta}</span>`;
    b.addEventListener('click',()=>select(p.id));
    rail.appendChild(b);
  });
  syncRail();
}
function syncRail(){
  root.querySelectorAll('.dev').forEach(b=>{
    const p=PARTS.find(x=>x.id===b.dataset.id);
    b.setAttribute('aria-pressed', p===state.part);
    b.hidden = !(state.filter==='all' || p.filters.includes(state.filter)) && p!==state.part;
  });
}
root.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
  state.filter=b.dataset.filter;
  root.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const vis=PARTS.filter(p=>state.filter==='all'||p.filters.includes(state.filter));
  if(!vis.includes(state.part)&&vis[0]) select(vis[0].id); else syncRail();
}));

const HOST={
  server:'Raspberry Pi, Jetson, or any Python 3.10+ machine',
  dashboard:'Any browser on the same network',
  cloud:'A Chromium browser tab, nothing installed',
  buddy:'A Chromium browser tab, with your own API key',
  simulation:'A browser tab, nothing installed',
  agent:'Your computer, beside the server',
  bioide:'A Chromium browser tab, nothing installed',
  xr:'A VR headset or a PC, over Bluetooth LE',
  aura:'An XR runtime, once the band ships',
  biopose:'A Chromium browser tab, with a camera',
  bodypress:'A phone or a VR headset, over Bluetooth LE',
  bridge:'Windows, macOS or Linux, in the system tray',
  sdk:'A Chromium browser, no server at all',
  ws:'Anything that can open a WebSocket',
  lsl:'The server, published to the local network',
  osc:'The server, sending UDP to VRChat',
  webhooks:'The dashboard evaluates, the server relays',
  unity:'Unity 2022.3 or newer',
  chrome:'Chrome, loaded unpacked from a folder',
  experiences:'Inside the dashboard, as a React component',
  core:'The same Python process, swapped in at import',
  notebooks:'Any machine with Python and Jupyter'
};
const LAYERS=[['all','Everything','#d6dae0'],['source','What feeds it','#9aa2ad'],['runtime','Where it runs','#d6dae0'],['out','Where it lands','#7fb2ff']];
function renderBar(p){
  $('#plat-layers').innerHTML = LAYERS.map(([k,label,c])=>{
    const col = k==='source' ? FAMILY[p.fam] : c;
    return `<button data-layer="${k}" aria-pressed="${(state.layer||'all')===k}" style="--c:${col}"><i></i>${label}</button>`;
  }).join('');
  $('#plat-layers').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
    state.layer = b.dataset.layer==='all' ? null : b.dataset.layer;
    $('#plat-layers').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    state.focus=state.layer; applyFocus();
  }));
  $('#plat-hostWrap').innerHTML = `<span class="seg-label">Runs on</span><span class="lock">${HOST[p.id]}</span>`;
}
function renderSpec(p){
  const pc={source:FAMILY[p.fam], runtime:'#d6dae0', out:'#7fb2ff', link:'#45dd8b'};
  $('#plat-spec').innerHTML=`
    ${p.badge?`<span class="badge" style="background:linear-gradient(90deg,${FAMILY[p.fam]},#ffffff55);color:#04121a">${p.badge}</span>`:''}
    <h2>${p.name}</h2>
    <p class="tagline">${p.tagline}</p>
    <p class="summary">${p.summary}</p>
    <dl class="rows">${p.rows.map(([part,k,v])=>`<div class="row" tabindex="0" data-part="${part}" style="--pc:${pc[part]}"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <div class="need"><h3>What you get</h3><ul>${p.gets.map(g=>`<li>${g}</li>`).join('')}</ul></div>
    <div class="note"><h3>${p.note.h}</h3><p>${p.note.p}</p></div>
    ${p.links.map(l=>`<a class="docs${l.primary?' primary':''}" href="${hrefFor(l)}"${external(l)?' target="_blank" rel="noopener"':''}>${l.t}</a>`).join('')}`;
  root.querySelectorAll('.row').forEach(r=>{
    const on=()=>{state.focus=r.dataset.part;applyFocus();}, off=()=>{state.focus=state.layer;applyFocus();};
    r.addEventListener('pointerenter',on); r.addEventListener('pointerleave',off);
    r.addEventListener('focus',on); r.addEventListener('blur',off);
  });
}
function select(id){
  const p=PARTS.find(x=>x.id===id); if(!p||p===state.part) return;
  state.part=p; state.focus=state.layer;
  root.style.setProperty('--mode',FAMILY[p.fam]);
  
  syncRail(); drawScene(p); renderBar(p); renderSpec(p); buildPanel(p); applyFocus();
}

/* ============================================================
   Loop
   ============================================================ */
$('#plat-pause').addEventListener('click',e=>{ state.paused=!state.paused; e.target.textContent=state.paused?'Resume':'Pause'; });
function tickFlow(){
  root.querySelectorAll('.flow, .air').forEach(p=>{
    const dur = p.classList.contains('slow') ? 2 : (p.classList.contains('air') ? 1.4 : 1.15);
    p.style.strokeDashoffset = (-((simT * 32 / dur) % 32)).toFixed(2);
  });
}
function frame(now){
  const dt=Math.min(.05,(now-(lastNow||now))/1000); lastNow=now;
  if(!state.paused) simT+=dt;
  tickFlow();
  if(panel.mode==='console') tickConsole(dt);
  else if(panel.mode==='bands'){ if(!state.paused) tickBands(); }
  else if(panel.mode==='chat') tickChat(dt);
}

/* ============================================================
   Boot
   ============================================================ */
renderRail();
select('server');
if(reduce){ tickBands(); }


  function startLoop() {
    if (stopped || raf) return;
    lastNow = 0;
    raf = requestAnimationFrame(function tick(now) {
      raf = 0;
      if (stopped) return;
      if (visible) frame(now);
      raf = requestAnimationFrame(tick);
    });
  }

  const io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    if (visible) startLoop();
  }, { threshold: 0.08, rootMargin: "80px" });
  io.observe(root);
  startLoop();

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    io.disconnect();
    
  };
}
