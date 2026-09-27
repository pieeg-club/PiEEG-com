"use client";

/**
 * ardEEG guide: "Where to use it" live demos + "How to set it up" steps.
 *
 * Converted from ardeeg-page.html. The markup below is the original HTML as JSX;
 * the interactive parts are driven by ./ardeeg-guide-engine.js, mounted after
 * hydration and stopped on unmount. All images are embedded in the engine and CSS.
 */

import { useEffect, useRef } from "react";
import { mountArdEEGGuide } from "./ardeeg-guide-engine.js";
import "./ardeeg-guide.css";

export default function ArdEEGGuide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountArdEEGGuide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="ardEEG: where to use it and how to set it up"
      id="ardeeg-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">ardEEG</h2>
            <p className="lede">The lowest-cost way into brain signals. An 8-channel shield for the Arduino UNO R4 WiFi.</p>
            <p className="sub">An ADS1299 on a shield reads EEG, EMG and ECG. The Arduino sends it over Wi-Fi to a Python script on your computer. Two scripts, one small battery, and you’re measuring. Built for students, hobbyists, teachers and embedded prototypes.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="ardEEG shield on an Arduino UNO R4 WiFi, sending data over Wi-Fi" id="board" role="img" viewBox="0 0 720 540" />
        </section>
        <dl className="facts">
          <div>
            <dt>Channels</dt>
            <dd>8, plus REF and BIAS</dd>
          </div>
          <div>
            <dt>Signals</dt>
            <dd>EEG, EMG, ECG</dd>
          </div>
          <div>
            <dt>Converter</dt>
            <dd>ADS1299, 24-bit</dd>
          </div>
          <div>
            <dt>Sample rate</dt>
            <dd>250 SPS</dd>
          </div>
          <div>
            <dt>Host</dt>
            <dd>Arduino UNO R4 WiFi</dd>
          </div>
          <div>
            <dt>Link</dt>
            <dd>Wi-Fi, UDP</dd>
          </div>
        </dl>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>From a first look at your own brain waves to an Arduino that reacts to your muscles on its own. Pick a use case and try the live demo.</p>
          </div>
          <div className="uses">
            <ul aria-label="Use cases" className="use-list" id="useList" role="tablist" />
            <div className="use-stage" id="useStage">
              <div className="body-col">
                <svg aria-label="Electrode placement" id="body" role="img" viewBox="1010 30 380 400" />
                <p className="body-cap" id="bodyCap" />
              </div>
              <div className="demo" id="demo" role="tabpanel">
                <div>
                  <span className="sig" id="demoSig" />
                  <h3 id="demoTitle" />
                </div>
                <p className="lead" id="demoLead" />
                <div className="controls" id="controls" />
                <canvas height="200" id="demoCanvas" />
                <div className="readout" id="readout" />
                <div className="with" id="with" />
                <p className="sim-note">Simulated signal to show the effect. Real recordings are noisier.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how">
          <div className="sec-head">
            <h2>How to set it up</h2>
            <p>Seat the shield, connect the electrodes, put three settings into the sketch, upload, unplug, run the Python script. Eight steps.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Gather the kit</h3>
                  <p>You need the <b>WiFi</b> version of the UNO R4. The UNO R4 Minima looks almost the same but has no Wi-Fi, so it can’t send the data.</p>
                  <div aria-label="Which Arduino" className="seg-mini" id="boardSeg" role="group">
                    <button data-b="wifi">UNO R4 WiFi</button>
                    <button data-b="minima">UNO R4 Minima</button>
                  </div>
                  <p className="verdict" id="boardVerdict" style={{display: "none"}} />
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>ardEEG shield</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Arduino UNO R4 WiFi</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Small 5 V power bank<small>1 A max, up to 1,000 mAh</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>USB-C cable<small>only for uploading the sketch</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>8 electrodes with cables<small>dry, or Ag/AgCl wet with gel</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>2 ear-clip electrodes and an EEG cap</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>A computer with Python, on the same Wi-Fi</span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Seat the shield on the Arduino</h3>
                  <p>Line the shield up with the Arduino’s headers and press it down evenly until every pin is in. Besides power, the shield uses only five Arduino pins: four for SPI and one that says a new sample is ready.</p>
                  <p className="muted">Hover a pin to see what it does. Leave these pins free if you add your own hardware.</p>
                </div>
                <div>
                  <svg aria-label="Arduino pins used by the shield" id="pins" viewBox="0 0 520 200" />
                  <p className="state" id="pinInfo">Hover a highlighted pin.</p>
                </div>
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Connect the electrodes</h3>
                  <p>Place the eight channel electrodes on the cap at 10-20 positions. Clip the reference to one earlobe and the bias to the other. The bias actively cancels interference.</p>
                  <p className="muted">This is the layout from the ardEEG paper. T5 and T6 are the older names for P7 and P8. Use any positions you need and follow the labels on the shield.</p>
                  <div className="wire-list" id="wireList" />
                </div>
                <svg aria-label="Wiring map from electrodes to the ardEEG header" id="wire" viewBox="0 0 560 380" />
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Put your network into the sketch and the script</h3>
                  <p>Open <code>1.Send_data_via_wifi.ino</code> in the Arduino IDE. It needs your Wi-Fi name, your password, and the IP address of the computer that will receive the data. The Python script needs the same IP.</p>
                  <p className="muted">Find your computer’s IP with <code>ipconfig</code> on Windows, <code>ip addr</code> on Linux, or in Wi-Fi settings on macOS. Type your values here and copy the lines you need.</p>
                  <div className="form">
                    <label>
                      Wi-Fi name
                      <input autoComplete="off" id="fSsid" placeholder="HomeNetwork" defaultValue="" />
                    </label>
                    <label>
                      Password
                      <input autoComplete="off" id="fPass" placeholder="password" type="password" defaultValue="" />
                    </label>
                    <label>
                      Computer IP
                      <input autoComplete="off" id="fIp" inputMode="decimal" placeholder="192.168.1.241" defaultValue="" />
                    </label>
                  </div>
                  <p className="verdict" id="ipCheck" style={{display: "none"}} />
                </div>
                <div className="code">
                  <button className="copy" data-copy="cfg">Copy</button>
                  <pre id="code-cfg" />
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Upload, then unplug the USB cable</h3>
                  <p>Connect the Arduino to the computer with USB-C, pick <b>Arduino UNO R4 WiFi</b> as the board and upload. Then disconnect the USB cable.</p>
                  <p className="muted">The USB cable is only for uploading. During a measurement the Arduino must never be connected to a computer port or a wall adapter.</p>
                </div>
                <ul className="tick" id="upload">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Board set to Arduino UNO R4 WiFi in the IDE</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Sketch uploaded without errors</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>USB cable disconnected</span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Power it from the battery</h3>
                  <p>Plug the small power bank into the Arduino. It joins your Wi-Fi and starts sending packets. The battery keeps the person isolated from the mains and the signal clean.</p>
                </div>
                <div className="dodont">
                  <div className="yes">
                    <h4>Do</h4>
                    <ul>
                      <li>Small 5 V power bank</li>
                      <li>1 A maximum, up to 1,000 mAh</li>
                      <li>Short cable</li>
                    </ul>
                  </div>
                  <div className="no">
                    <h4>Don’t</h4>
                    <ul>
                      <li>A computer’s USB port</li>
                      <li>Wall adapters or chargers</li>
                      <li>Big, high-current power banks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s7">
              <div className="num">7</div>
              <div className="step-body">
                <div>
                  <h3>Run the Python script</h3>
                  <p>On the computer, run <code>1.Alpha_real_time.py</code>. It listens for the Arduino’s packets and plots all eight channels live, with a band-pass filter.</p>
                  <p className="muted">No graph? Check the Arduino is powered, the computer is on the same Wi-Fi, the name, password and IP are right, and the firewall lets UDP port 13900 through.</p>
                </div>
                <div className="code">
                  <button className="copy" data-copy="run">Copy</button>
                  <pre id="code-run"><span className="c">{"# once"}</span>{"\npip install matplotlib scipy\n\n"}<span className="c">{"# every session, same Wi-Fi as the Arduino"}</span>{"\n"}<span className="p">{"python"}</span>{" 1.Alpha_real_time.py"}</pre>
                </div>
              </div>
            </li>
            <li className="step" id="s8">
              <div className="num">8</div>
              <div className="step-body">
                <div>
                  <h3>Check it works: a blink, then alpha</h3>
                  <p>Two quick tests from the ardEEG repository. A hard blink throws a big spike onto Fz. Then close your eyes: after the 8 to 12 Hz filter, alpha waves grow and drop again when you open them.</p>
                  <div className="controls" id="testCtl" />
                </div>
                <div>
                  <canvas height="130" id="testCanvas" />
                  <ul className="tests" id="tests" />
                </div>
              </div>
            </li>
          </ol>
        </section>
        <section className="safety-band" id="safety">
          <h2>Before you put it on anyone</h2>
          <ul>
            <li>ardEEG is not a medical device and hasn’t been certified by any regulator. It can’t be used for any medical purpose.</li>
            <li>Run it from a 5 V battery only. It must never be connected to mains power, through USB or any other way.</li>
            <li>Upload the sketch first, then unplug the USB cable before the electrodes go on.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician. Stop if the skin becomes irritated.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
