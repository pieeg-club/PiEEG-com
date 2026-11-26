/**
 * Content for the EasyEXG store guide (/store/easyexg).
 * Every value comes from the EasyEXG README and docs.pieeg.com/hardware/devices/easy_exg.
 * Images are plain files in /public/products/easyexg/guide/.
 */

export const IMG = "/products/easyexg/guide";
export const GH = "https://github.com/pieeg-club/EasyEXG";
export const DOCS = "https://docs.pieeg.com/hardware/devices/easy_exg";

export type SignalId = "emg" | "ecg" | "eogh" | "eogv" | "eeg";

export interface SignalInfo {
  id: SignalId;
  tab: string;
  sub: string;
  color: string;
  title: string;
  lead: string;
  jp1: "open" | "bridged";
  gif: string;
  placement: { pin: string; contact: string; where: string }[];
  size: string;
  filter: string;
  rate: string;
  see: string;
  tips: string[];
}

export const SIGNALS: SignalInfo[] = [
  {
    id: "emg",
    tab: "EMG",
    sub: "Muscle",
    color: "#ffae42",
    title: "Muscle activity",
    lead: "Clench your fist and the trace bursts; relax and it goes flat. The stronger the contraction, the bigger the bursts. Use the envelope to switch LEDs, servos and relays.",
    jp1: "open",
    gif: "app-emg.gif",
    placement: [
      { pin: "IN+", contact: "Tip", where: "Forearm muscle, a hand-width from the wrist" },
      { pin: "IN−", contact: "Ring", where: "Same muscle, 2–3 cm further along" },
      { pin: "REF", contact: "Sleeve", where: "Elbow (a bony spot)" },
    ],
    size: "0.1–5 mV",
    filter: "20–240 Hz",
    rate: "500–1000 Hz",
    see: "Noisy bursts while the muscle works",
    tips: [
      "Put IN+ and IN− along the muscle fibres, over the belly of the muscle.",
      "Other muscles work the same way: biceps, calf, jaw (masseter).",
      "Sample at 1000 Hz for the full EMG band (20–450 Hz).",
    ],
  },
  {
    id: "ecg",
    tab: "ECG",
    sub: "Heart",
    color: "#ff5a74",
    title: "Heartbeat (Lead I)",
    lead: "A heartbeat about once a second: a small P wave, a sharp QRS spike and a T wave. Detect the R peaks to show beats per minute.",
    jp1: "bridged",
    gif: "app-ecg.gif",
    placement: [
      { pin: "IN+", contact: "Tip", where: "Left chest, below the collarbone" },
      { pin: "IN−", contact: "Ring", where: "Right chest, below the collarbone" },
      { pin: "REF", contact: "Sleeve", where: "Right lower abdomen" },
    ],
    size: "0.5–2 mV",
    filter: "0.5–40 Hz",
    rate: "250–500 Hz",
    see: "P, QRS, T about once a second",
    tips: [
      "Wrist alternative: IN+ left wrist, IN− right wrist, REF right ankle or back of the right hand.",
      "Breathe normally and don't talk. Arm movement adds muscle noise.",
      "Bridge JP1 (1 048×) before you start.",
    ],
  },
  {
    id: "eogh",
    tab: "EOG ↔",
    sub: "Eyes, left / right",
    color: "#7fb2ff",
    title: "Eye movement, horizontal",
    lead: "The trace steps one way when you look left and the other way when you look right, then slowly drifts back to centre (the 0.16 Hz high-pass).",
    jp1: "open",
    gif: "app-eogh.gif",
    placement: [
      { pin: "IN+", contact: "Tip", where: "Outer corner of the right eye" },
      { pin: "IN−", contact: "Ring", where: "Outer corner of the left eye" },
      { pin: "REF", contact: "Sleeve", where: "Centre of the forehead" },
    ],
    size: "0.1–1 mV",
    filter: "0.1–10 Hz",
    rate: "100–250 Hz",
    see: "Steps with each eye movement",
    tips: [
      "Use it for eye-controlled cursors, games and look-left / look-right switches.",
      "Keep your head still and move only the eyes.",
      "\"Right\" and \"left\" mean the person's own right and left.",
    ],
  },
  {
    id: "eogv",
    tab: "EOG ↕",
    sub: "Eyes, blinks",
    color: "#45dd8b",
    title: "Eye movement, vertical",
    lead: "Slow steps when you look up or down, and a sharp spike for each blink — the easiest hands-free switch you can build.",
    jp1: "open",
    gif: "app-eogv.gif",
    placement: [
      { pin: "IN+", contact: "Tip", where: "Just above one eyebrow" },
      { pin: "IN−", contact: "Ring", where: "Just below the same eye" },
      { pin: "REF", contact: "Sleeve", where: "Forehead, to the side" },
    ],
    size: "0.1–1 mV",
    filter: "0.1–10 Hz",
    rate: "100–250 Hz",
    see: "Steps for up / down, spikes for blinks",
    tips: [
      "Use it for blink detection and a \"blink to click\" switch.",
      "A double blink is easy to tell apart from natural blinks.",
      "Fresh gel electrodes stick best on the skin around the eye.",
    ],
  },
  {
    id: "eeg",
    tab: "EEG",
    sub: "Brain",
    color: "#3fc8ff",
    title: "Frontal brain waves",
    lead: "Close your eyes and relax: a 10 Hz alpha rhythm grows. Open them and it shrinks. EEG is tiny (10–50 µV), so this one needs the highest gain and a calm setup.",
    jp1: "bridged",
    gif: "app-eeg.gif",
    placement: [
      { pin: "IN+", contact: "Tip", where: "Forehead above the left eye (Fp1)" },
      { pin: "IN−", contact: "Ring", where: "Left earlobe" },
      { pin: "REF", contact: "Sleeve", where: "Centre of the forehead" },
    ],
    size: "10–50 µV",
    filter: "1–40 Hz",
    rate: "250 Hz",
    see: "10 Hz alpha grows with the eyes closed",
    tips: [
      "Sit still, relax the face and jaw, keep cables short and away from chargers.",
      "Filter 8–12 Hz to see only alpha. Blinks show up as large slow bumps on Fp1.",
      "On the UNO R4 set ADC_BITS = 14 in the Wi-Fi sketch for finer steps.",
    ],
  },
];

export const STEPS: { title: string; body: string; img?: string; alt?: string; table?: string[][] }[] = [
  {
    title: "Gather the parts",
    body: "EasyEXG, a microcontroller (Arduino UNO, Nano or UNO R4 to start), 3 jumper wires, a 3-lead snap cable with a 3.5 mm plug, 3 gel electrodes and a USB cable.",
    img: "setup-steps.gif",
    alt: "The four steps: wiring, electrodes, upload, read the signal",
  },
  {
    title: "Set the gain jumper JP1",
    body: "JP1 ships open (221×) — right for EMG and EOG. For ECG and EEG, bridge its two pads with a small solder blob (1 048×). Board unpowered; solder wick opens it again.",
    img: "jp1-gain.webp",
    alt: "JP1 gain jumper: open 221× for EMG and EOG, bridged 1 048× for ECG and EEG",
  },
  {
    title: "Wire J3 to the Arduino",
    body: "Arduino unplugged. Three jumper wires; VREF stays unconnected.",
    img: "wiring-arduino.webp",
    alt: "EasyEXG wired to an Arduino UNO R4 WiFi",
    table: [
      ["J3 pin", "Arduino", "Wire"],
      ["GND", "GND", "grey"],
      ["VCC", "5V (or 3.3V)", "red"],
      ["OUT", "A0", "yellow"],
      ["VREF", "—", "not connected"],
    ],
  },
  {
    title: "Upload the sketch",
    body: "Install the Arduino IDE, open Arduino/EasyEXG_Arduino.ino from the repository, choose your board and port in Tools, click Upload. The sketch samples A0 at 500 Hz and prints the signal and its envelope.",
  },
  {
    title: "Place the electrodes",
    body: "Clean the skin with an alcohol wipe. Snap the electrodes onto the cable first, then stick them on: IN+ (Tip) on the forearm muscle, IN− (Ring) 2–3 cm further along, REF (Sleeve) on the elbow. Plug the cable into J1.",
    img: "inputs.webp",
    alt: "Electrode inputs: 3.5 mm jack J1 and 3-pin header J2 carry IN+, IN− and REF",
  },
  {
    title: "Read the signal",
    body: "Unplug the laptop charger first. Open Tools → Serial Plotter at 115200 baud. Relax: both traces flat. Clench your fist: bursts on the signal, the envelope rises.",
  },
];

export interface McuInfo {
  id: string;
  name: string;
  vcc: string;
  out: string;
  gnd: string;
  sw: string;
  img?: string;
  note: string;
  volt: "5V" | "3V3";
}

export const MCUS: McuInfo[] = [
  { id: "r4", name: "UNO R4 WiFi", vcc: "5V", out: "A0", gnd: "GND", sw: "USB or Wi-Fi sketch", img: "wiring-arduino.webp", volt: "5V",
    note: "The best all-rounder: USB sketch for the first test, Wi-Fi sketch + EasyEXG Studio for a cable-free setup. Set ADC_BITS = 14 for EEG." },
  { id: "uno", name: "UNO / Nano / Mega", vcc: "5V", out: "A0", gnd: "GND", sw: "USB sketch", volt: "5V",
    note: "Classic 10-bit Arduinos run the USB sketch unchanged. 1 count ≈ 22 µV at 221× — fine for EMG, EOG and ECG." },
  { id: "esp32", name: "ESP32", vcc: "3V3", out: "GPIO36 (VP, A0)", gnd: "GND", sw: "Wi-Fi sketch", img: "wiring-esp32.webp", volt: "3V3",
    note: "Power EasyEXG from 3.3 V — the ESP32's analog inputs take 3.3 V max. Set VREF = 3.3 in the Python viewer so µV values are right." },
  { id: "esp8266", name: "ESP8266", vcc: "3V3", out: "A0", gnd: "GND", sw: "Wi-Fi sketch", volt: "3V3",
    note: "Same rule as the ESP32: 3.3 V supply, VREF = 3.3 in the viewer." },
  { id: "pico", name: "Raspberry Pi Pico", vcc: "3V3(OUT), pin 36", out: "GP26 / ADC0, pin 31", gnd: "GND, pin 38", sw: "USB sketch (Arduino-Pico core)", img: "wiring-pico.webp", volt: "3V3",
    note: "Install the Raspberry Pi Pico/RP2040 board package, then upload the USB sketch unchanged: A0 is GP26 on the Pico. MicroPython works too (see Examples)." },
  { id: "stm32", name: "STM32", vcc: "3V3", out: "PA0 or any ADC pin", gnd: "GND", sw: "USB sketch, change PIN", volt: "3V3",
    note: "With the STM32 Arduino core, change PIN to your ADC pin (for example PA0) in the USB sketch." },
];

export const STUDIO_MODES = [
  ["EEG", "1–40 Hz", "Bridged, 1 048×", "5 s", "Alpha (8–12 Hz) share of power"],
  ["EOG", "0.1–10 Hz", "Open, 221×", "10 s", "–"],
  ["EMG", "20–240 Hz", "Open, 221×", "3 s", "Activity line (moving RMS)"],
  ["ECG", "0.5–40 Hz", "Bridged, 1 048×", "5 s", "Heart rate (bpm)"],
];

export const CODE_USB = `const int  PIN  = A0;      // PA0 on STM32, A0 = GP26 on the Pico
const long BAUD = 115200;
const int  FS   = 500;     // samples per second

void loop() {
  // ... runs every 1/FS seconds
  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.002f;          // slow drift removal (~1 s)
  float signal = raw - baseline;                  // biosignal centred at 0
  envelope += (fabs(signal) - envelope) * 0.02f;  // activity level (EMG)
  Serial.print(signal);   Serial.print(' ');      // trace 1: signal
  Serial.println(envelope);                       // trace 2: envelope
}`;

export const CODE_WIFI = `#define USE_ACCESS_POINT 0                    // 0 = join your home Wi-Fi
const char* STA_SSID = "YOUR_WIFI_NAME";      // 2.4 GHz network
const char* STA_PASS = "YOUR_WIFI_PASSWORD";

// Serial Monitor at 115200 baud after upload:
// Connecting to YOUR_WIFI_NAME....
// Board IP: 192.168.1.57  UDP port: 5005`;

export const CODE_STUDIO = `pip install matplotlib numpy scipy
cd SDK/Python
python easyexg_studio.py

# simple command-line viewer
python easyexg_wifi_plot.py --units uV --gain 1048 --csv ecg.csv
python easyexg_wifi_plot.py --vref 3.3        # ESP32
python easyexg_wifi_plot.py --demo            # no board needed`;

export const WIFI_SETTINGS = [
  ["FS", "500", "Samples per second. 1000 is better for EMG"],
  ["ADC_BITS", "10", "ADC resolution. Use 14 on the UNO R4 for EEG"],
  ["USE_NOTCH", "true", "Remove mains hum"],
  ["NOTCH_HZ", "50.0", "50 Hz in UK / Europe / Asia, 60 Hz in the Americas"],
  ["UDP_PORT", "5005", "Must match the Python viewer"],
];

export const PACKET = [
  ["0–3", "char[4]", "\"EXG1\""],
  ["4–7", "uint32", "Index of the first sample"],
  ["8–9", "uint16", "Number of samples (normally 25)"],
  ["10–11", "uint16", "Sample rate (Hz)"],
  ["12", "uint8", "ADC bits"],
  ["13–15", "—", "Padding"],
  ["16…", "float, float", "Per sample: signal, envelope (ADC counts, centred at 0)"],
];

export interface Example {
  id: string;
  title: string;
  signal: string;
  color: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lang: "Arduino" | "Python" | "MicroPython";
  board: string;
  idea: string;
  parts: string;
  code: string;
}

export const EXAMPLES: Example[] = [
  {
    id: "led",
    title: "Muscle switch",
    signal: "EMG",
    color: "#ffae42",
    level: "Beginner",
    lang: "Arduino",
    board: "Any Arduino",
    idea: "Clench your fist to turn an LED on. The envelope is compared with a threshold, with a little hysteresis so it doesn't flicker. Swap the LED for a relay module to switch a lamp or a fan (low voltage only).",
    parts: "EasyEXG (JP1 open) · the built-in LED, or an LED + 220 Ω on any pin (change LED)",
    code: `// EMG muscle switch: clench to light the LED
const int PIN = A0, LED = LED_BUILTIN;
const float ON_LEVEL = 40, OFF_LEVEL = 25;   // envelope in ADC counts; tune these
float baseline = 512, envelope = 0;
bool on = false;

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.002f;            // follow the VCC/2 resting level
  float signal = raw - baseline;
  envelope += (fabs(signal) - envelope) * 0.02f;    // smoothed muscle activity

  if (!on && envelope > ON_LEVEL)  on = true;       // hysteresis: separate on / off levels
  if (on  && envelope < OFF_LEVEL) on = false;
  digitalWrite(LED, on);

  Serial.println(envelope);                         // watch it in the Serial Plotter
  delayMicroseconds(2000);                          // ~500 samples per second
}`,
  },
  {
    id: "servo",
    title: "Robot gripper",
    signal: "EMG",
    color: "#ffae42",
    level: "Beginner",
    lang: "Arduino",
    board: "Any Arduino",
    idea: "The harder you squeeze, the further a servo closes — a one-channel prosthetic-hand demo. The envelope is mapped from your relaxed level to your strongest clench.",
    parts: "EasyEXG (JP1 open) · SG90 servo on pin 9, powered from its own 5 V supply or battery (common GND)",
    code: `// EMG-proportional servo gripper
#include <Servo.h>
const int PIN = A0;
const float RELAXED = 10, STRONG = 120;   // envelope at rest / full clench, tune these
Servo grip;
float baseline = 512, envelope = 0, smooth = 0;

void setup() {
  grip.attach(9);
  Serial.begin(115200);
}

void loop() {
  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.002f;
  envelope += (fabs(raw - baseline) - envelope) * 0.02f;
  smooth   += (envelope - smooth) * 0.05f;            // extra smoothing for the motor

  float k = constrain((smooth - RELAXED) / (STRONG - RELAXED), 0.0, 1.0);
  grip.write(10 + k * 150);                           // 10° open ... 160° closed

  Serial.println(smooth);
  delayMicroseconds(2000);
}`,
  },
  {
    id: "bpm",
    title: "Heart-rate monitor",
    signal: "ECG",
    color: "#ff5a74",
    level: "Intermediate",
    lang: "Arduino",
    board: "Any Arduino",
    idea: "Detect the R peaks of the ECG and print beats per minute. A simple derivative-squared detector with an adaptive threshold and a 300 ms refractory period — easy to move to a small OLED screen.",
    parts: "EasyEXG (JP1 bridged, 1 048×) · chest electrodes, Lead I",
    code: `// ECG R-peak detector -> beats per minute
const int PIN = A0;
const unsigned long PERIOD_US = 2000;          // 500 Hz
float baseline = 512, prev = 0, energy = 0, peakLevel = 0;
unsigned long lastBeat = 0, next = 0;
float bpm = 0;

void setup() { Serial.begin(115200); }

void loop() {
  if ((long)(micros() - next) < 0) return;   // wait for the next 2 ms tick
  next += PERIOD_US;

  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.005f;       // remove drift
  float x = raw - baseline;
  float d = x - prev; prev = x;                // slope: QRS is the steepest part
  energy += (d * d - energy) * 0.15f;          // short-term slope energy

  peakLevel *= 0.9995f;                        // adaptive threshold decays slowly
  if (energy > peakLevel) peakLevel = energy;

  unsigned long now = millis();
  if (energy > 0.5f * peakLevel && now - lastBeat > 300) {   // 300 ms refractory
    if (lastBeat) {
      float inst = 60000.0f / (now - lastBeat);
      bpm = bpm ? bpm * 0.8f + inst * 0.2f : inst;           // smooth
      Serial.print("BPM: "); Serial.println(bpm, 0);
    }
    lastBeat = now;
  }
}`,
  },
  {
    id: "blink",
    title: "Blink to click",
    signal: "EOG ↕",
    color: "#45dd8b",
    level: "Beginner",
    lang: "Arduino",
    board: "Any Arduino",
    idea: "Each blink is a sharp spike on vertical EOG. A double blink (two spikes within 0.6 s) toggles an LED — natural single blinks are ignored. Use it as a hands-free switch.",
    parts: "EasyEXG (JP1 open) · vertical EOG electrodes · LED on the built-in pin",
    code: `// Double blink toggles the LED (vertical EOG)
const int PIN = A0, LED = LED_BUILTIN;
const float SPIKE = 60;              // counts above baseline; tune for your setup
float baseline = 512;
bool above = false, led = false;
unsigned long firstBlink = 0;

void setup() { pinMode(LED, OUTPUT); Serial.begin(115200); }

void loop() {
  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.001f;
  float x = raw - baseline;

  if (!above && x > SPIKE) {                       // rising edge = one blink
    above = true;
    unsigned long now = millis();
    if (firstBlink && now - firstBlink < 600) {    // second blink in time
      led = !led; digitalWrite(LED, led);
      Serial.println("DOUBLE BLINK");
      firstBlink = 0;
    } else firstBlink = now;
  }
  if (above && x < SPIKE * 0.5f) above = false;
  if (firstBlink && millis() - firstBlink > 600) firstBlink = 0;
  delay(4);                                        // ~250 Hz is plenty for EOG
}`,
  },
  {
    id: "look",
    title: "Look left / right",
    signal: "EOG ↔",
    color: "#7fb2ff",
    level: "Intermediate",
    lang: "Arduino",
    board: "Any Arduino",
    idea: "Horizontal EOG steps up when you look right and down when you look left. The sketch prints LEFT / RIGHT; a host script can turn those into arrow keys for a game or a slide deck. Swap IN+ / IN− if the directions come out reversed.",
    parts: "EasyEXG (JP1 open) · horizontal EOG electrodes",
    code: `// Horizontal EOG: print LEFT / RIGHT on eye movements
const int PIN = A0;
const float STEP = 45;                 // counts; tune for your setup
float baseline = 512, fast = 0;
unsigned long hold = 0;

void setup() { Serial.begin(115200); }

void loop() {
  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.0015f;     // slow baseline (the board drifts back too)
  fast     += ((raw - baseline) - fast) * 0.2f;

  if (millis() > hold) {
    if (fast >  STEP) { Serial.println("RIGHT"); hold = millis() + 700; }
    if (fast < -STEP) { Serial.println("LEFT");  hold = millis() + 700; }
  }
  delay(4);                                    // 250 Hz
}`,
  },
  {
    id: "game",
    title: "Muscle game controller",
    signal: "EMG",
    color: "#ffae42",
    level: "Intermediate",
    lang: "Python",
    board: "Any Arduino + PC",
    idea: "Jump in any browser game with a muscle burst. The PC reads the USB sketch output (signal, envelope) and presses the space bar when the envelope crosses a threshold. Laptop on battery while electrodes are on.",
    parts: "EasyEXG (JP1 open) running the USB sketch · pip install pyserial pyautogui",
    code: `# EMG -> space bar.  pip install pyserial pyautogui
import serial, pyautogui, time

PORT = "COM5"          # or /dev/ttyACM0, /dev/cu.usbmodem...
THRESHOLD = 40         # envelope in ADC counts; watch the Serial Plotter to pick it

ser = serial.Serial(PORT, 115200, timeout=1)
armed, last = True, 0.0
while True:
    line = ser.readline().decode(errors="ignore").split()
    if len(line) != 2:
        continue
    signal, envelope = map(float, line)
    if armed and envelope > THRESHOLD and time.time() - last > 0.25:
        pyautogui.press("space")
        armed, last = False, time.time()
    elif envelope < THRESHOLD * 0.6:
        armed = True`,
  },
  {
    id: "alpha",
    title: "Relax meter (alpha)",
    signal: "EEG",
    color: "#3fc8ff",
    level: "Advanced",
    lang: "Python",
    board: "Any Arduino + PC",
    idea: "Measure how much of your EEG power sits in the 8–12 Hz alpha band, every second. Close your eyes and relax: the bar grows. The USB sketch streams at 500 Hz; Welch's method gives the spectrum.",
    parts: "EasyEXG (JP1 bridged) running the USB sketch · Fp1 / earlobe / forehead · pip install pyserial numpy scipy",
    code: `# Alpha share of EEG power, once a second.  pip install pyserial numpy scipy
import serial, numpy as np
from scipy.signal import welch, iirnotch, filtfilt

PORT, FS, MAINS = "COM5", 500, 50          # 60 in the Americas
ser = serial.Serial(PORT, 115200, timeout=1)
b, a = iirnotch(MAINS, 30, FS)
buf = []

while True:
    parts = ser.readline().decode(errors="ignore").split()
    if len(parts) != 2:
        continue
    buf.append(float(parts[0]))             # signal (ADC counts, centred at 0)
    if len(buf) < 2 * FS:                   # 2 s window
        continue
    x = filtfilt(b, a, np.array(buf[-2 * FS:]))
    f, p = welch(x, FS, nperseg=FS)
    total = p[(f >= 1) & (f <= 40)].sum()
    alpha = p[(f >= 8) & (f <= 12)].sum() / total
    print(f"alpha {alpha:5.1%}  " + "#" * int(alpha * 60))
    buf = buf[-FS:]                         # update every second (1 s overlap)`,
  },
  {
    id: "fast-emg",
    title: "1 kHz EMG sampling",
    signal: "EMG",
    color: "#ffae42",
    level: "Intermediate",
    lang: "Arduino",
    board: "UNO R4 / ESP32 / Pico",
    idea: "For the full EMG band (20–450 Hz) sample at 1000 Hz with a fixed micros() clock instead of delay(), and print at a higher baud rate so the serial link keeps up.",
    parts: "EasyEXG (JP1 open)",
    code: `// Steady 1000 Hz sampling with a micros() clock
const int PIN = A0;
const unsigned long PERIOD_US = 1000;      // 1 kHz
unsigned long next;

void setup() {
  Serial.begin(500000);                    // set the same rate in the Serial Plotter
  next = micros();
}

void loop() {
  if ((long)(micros() - next) < 0) return; // wait for the next tick
  next += PERIOD_US;
  Serial.println(analogRead(PIN));         // raw counts; rests near VCC/2
}`,
  },
  {
    id: "pico-mp",
    title: "Raspberry Pi Pico in MicroPython",
    signal: "Any",
    color: "#c084fc",
    level: "Beginner",
    lang: "MicroPython",
    board: "Raspberry Pi Pico",
    idea: "No Arduino IDE needed: read GP26 at 250 Hz in MicroPython and print µV-scaled values to Thonny's plotter. Power EasyEXG from 3V3(OUT).",
    parts: "EasyEXG on 3V3(OUT) pin 36, OUT → GP26 pin 31, GND pin 38",
    code: `# MicroPython on Raspberry Pi Pico: EasyEXG OUT on GP26
from machine import ADC, Timer
import micropython

adc = ADC(26)
GAIN, VREF = 221, 3.3                    # 1048 with JP1 bridged
UV = VREF / 65535 / GAIN * 1e6          # read_u16() is scaled to 0..65535
baseline = 32768.0

def tick(t):
    global baseline
    raw = adc.read_u16()
    baseline += (raw - baseline) * 0.004
    micropython.schedule(show, (raw - baseline) * UV)

def show(uv):
    print(round(uv))                     # Thonny: View -> Plotter

timer = Timer(freq=250, mode=Timer.PERIODIC, callback=tick)`,
  },
  {
    id: "wifi-rx",
    title: "Your own Wi-Fi receiver",
    signal: "Any",
    color: "#2cc6b4",
    level: "Advanced",
    lang: "Python",
    board: "UNO R4 WiFi / ESP32 / ESP8266",
    idea: "Receive the Wi-Fi sketch stream in your own program: send HELLO once a second, unpack the 16-byte EXG1 header and the float pairs, convert to µV.",
    parts: "EasyEXG + Wi-Fi sketch · board IP from the Serial Monitor",
    code: `import socket, struct, time

BOARD = ("192.168.1.57", 5005)        # board IP from the Serial Monitor
VREF, GAIN = 5.0, 221                  # 3.3 for ESP32; 1048 with JP1 bridged
HEADER = struct.Struct("<4sIHHB3x")

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.settimeout(1.0)
last_hello = 0
while True:
    if time.time() - last_hello > 1:   # keep the stream alive
        sock.sendto(b"HELLO", BOARD); last_hello = time.time()
    try:
        data, _ = sock.recvfrom(2048)
    except socket.timeout:
        continue
    magic, first, count, fs, bits = HEADER.unpack_from(data)
    if magic != b"EXG1":
        continue
    s = struct.unpack_from(f"<{count * 2}f", data, HEADER.size)
    uv = [c * VREF / 2**bits / GAIN * 1e6 for c in s[0::2]]
    print(first, fs, f"{uv[0]:8.1f} uV")`,
  },
  {
    id: "csv",
    title: "Analyse a recording",
    signal: "Any",
    color: "#2cc6b4",
    level: "Beginner",
    lang: "Python",
    board: "EasyEXG Studio CSV",
    idea: "Record 10–20 s with ● Record CSV in EasyEXG Studio, then plot it and re-filter it offline. Columns: time_s, raw_uV, filtered_uV, mode, band_Hz, gain.",
    parts: "pip install pandas matplotlib scipy",
    code: `import pandas as pd, matplotlib.pyplot as plt
from scipy.signal import butter, filtfilt, iirnotch

d = pd.read_csv("easyexg_ECG_20261125_180551.csv")
fs = 1 / d.time_s.diff().median()                    # about 500 Hz

b, a = butter(2, [0.5, 40], btype="band", fs=fs)     # ECG band
x = filtfilt(b, a, d.raw_uV)
b, a = iirnotch(50, 30, fs)                          # 60 in the Americas
x = filtfilt(b, a, x)

plt.plot(d.time_s, x, lw=0.8)
plt.xlabel("Time (s)"); plt.ylabel("µV"); plt.title(d["mode"][0])
plt.show()`,
  },
  {
    id: "uv",
    title: "Counts → µV in a sketch",
    signal: "Any",
    color: "#2cc6b4",
    level: "Beginner",
    lang: "Arduino",
    board: "UNO R4 WiFi",
    idea: "Print real microvolts at the electrodes instead of ADC counts. The UNO R4 ADC runs at 14 bits for 0.29 µV steps with JP1 bridged — best for EEG.",
    parts: "EasyEXG · Arduino UNO R4 (analogReadResolution)",
    code: `// Print µV at the electrodes (UNO R4, 14-bit ADC)
const int PIN = A0, BITS = 14;
const float VREF = 5.0, GAIN = 1048;             // 221 with JP1 open
const float UV_PER_COUNT = VREF / (1 << BITS) / GAIN * 1e6;   // ≈ 0.29 µV
float baseline = (1 << BITS) / 2;

void setup() {
  analogReadResolution(BITS);
  Serial.begin(115200);
}

void loop() {
  int raw = analogRead(PIN);
  baseline += (raw - baseline) * 0.002f;          // subtract the VCC/2 resting level
  Serial.println((raw - baseline) * UV_PER_COUNT, 1);
  delay(4);                                       // ~250 Hz for EEG
}`,
  },
];

export const TROUBLE: { group: string; rows: [string, string][] }[] = [
  {
    group: "Signal",
    rows: [
      ["Flat line", "Check OUT → A0, VCC and GND. Push the plug fully into J1. Check the electrodes touch clean skin."],
      ["Stuck at the top or bottom", "The input is too big for the gain: open JP1 (221×) for EMG / EOG. Wait 10–20 s after the electrodes go on for the high-pass to settle."],
      ["Resting value not near the middle", "OUT rests at VCC/2 (about 512 of 1023 on a 10-bit ADC). Check VCC and GND, and that J1 and J2 aren't both used."],
      ["Strong 50/60 Hz hum", "Check REF first: clean skin, firm contact, bony spot. Run on battery, move away from chargers and power strips, keep the cable short, set the notch to your mains frequency."],
      ["Signal upside down", "IN+ and IN− are swapped. Swap the two electrodes, or invert in software."],
      ["Big swings when moving", "Electrode or cable movement. Sit still, tape the cable down, use fresh electrodes."],
      ["No ECG heartbeat", "Bridge JP1 (1 048×). Left chest, right chest, REF on the right lower abdomen."],
      ["No alpha on EEG", "Bridge JP1. Eyes closed for at least 10 s, relax the face. Filter 8–12 Hz. Use the 14-bit ADC on the UNO R4."],
      ["µV values wrong by about 4.7×", "The Gain setting in the viewer doesn't match JP1 (221 vs 1048)."],
      ["ESP32 values clipped", "VCC must be 3.3 V on an ESP32, and VREF = 3.3 in the viewer."],
    ],
  },
  {
    group: "Upload, Wi-Fi & viewer",
    rows: [
      ["No port in Tools → Port", "Try another USB cable (some only charge) or another USB socket."],
      ["Upload fails: port busy", "Close the Serial Monitor / Plotter and any Python viewer, then upload again."],
      ["Serial Monitor shows only dots", "Wrong Wi-Fi name or password, or a 5 GHz-only network. Use 2.4 GHz."],
      ["Board makes an \"EasyEXG\" network", "Set USE_ACCESS_POINT 0 and upload again."],
      ["Viewer: \"No data yet\"", "PC and board on the same Wi-Fi (guest networks often block devices). Allow Python on Private and Public networks in the Windows firewall."],
      ["Far fewer than 500 samples/s", "Weak Wi-Fi: move the board closer to the router or use mode 1 (own network)."],
    ],
  },
];
