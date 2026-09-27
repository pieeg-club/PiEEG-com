"use client";

/**
 * Octopus 16 guide: "Where to use it" live demos + "How to set it up" steps.
 *
 * Converted from octopus16-page.html. The markup below is the original HTML as JSX;
 * the interactive parts are driven by ./octopus16-guide-engine.js, mounted after
 * hydration and stopped on unmount. All images are embedded in the engine and CSS.
 */

import { useEffect, useRef } from "react";
import { mountOctopus16Guide } from "./octopus16-guide-engine.js";
import "./octopus16-guide.css";

export default function Octopus16Guide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountOctopus16Guide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Octopus 16: where to use it and how to set it up"
      id="octopus16-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">Octopus<br />16</h2>
            <p className="lede">Sixteen spring-loaded pins that are the electrodes. No cables, no gel, no cap.</p>
            <p className="sub">A small round board with two ADS131M08 converters and a Seeed Studio XIAO ESP32-S3 on top. Strap it over the back of the head and it streams 16 channels over Bluetooth, straight into a browser.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="Photograph of the Octopus 16 board with its pogo-pin electrodes" id="board" role="img" viewBox="0 0 720 560" />
        </section>
        <dl className="facts">
          <div>
            <dt>Channels</dt>
            <dd>16</dd>
          </div>
          <div>
            <dt>Electrodes</dt>
            <dd>Pogo pins, dry</dd>
          </div>
          <div>
            <dt>Converters</dt>
            <dd>2 × ADS131M08, 24-bit</dd>
          </div>
          <div>
            <dt>Wireless</dt>
            <dd>Bluetooth LE, 250 SPS</dd>
          </div>
          <div>
            <dt>Brain</dt>
            <dd>XIAO ESP32-S3</dd>
          </div>
          <div>
            <dt>Power</dt>
            <dd>5 V bank, up to 300 mAh</dd>
          </div>
        </dl>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>Sixteen pins packed into a few centimetres give you a dense look at one area, usually the visual cortex. Pick a use case and try the live demo.</p>
          </div>
          <div className="uses">
            <ul aria-label="Use cases" className="use-list" id="useList" role="tablist" />
            <div className="use-stage" id="useStage">
              <div className="body-col">
                <svg aria-label="Where the board sits" id="body" role="img" viewBox="1010 30 380 400" />
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
            <p>Mount the XIAO, flash the firmware from your browser, strap it on and connect. The last step keeps the pins working for years.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Gather the kit</h3>
                  <p>The board takes a Seeed Studio XIAO ESP32-S3 as its brain. It usually ships without its pins soldered, so check before you start.</p>
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Octopus 16 board</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Seeed Studio XIAO ESP32-S3<small>with its header pins soldered on</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>BLE antenna<small>usually comes with the XIAO</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>USB-C data cable<small>for flashing the firmware, not a charge-only cable</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Small 5 V power bank<small>up to 300 mAh, 2 A max</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Elastic head band</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Chrome or Edge on a computer with Bluetooth</span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Mount the XIAO and the antenna</h3>
                  <p>Line the XIAO up with the socket headers on the board, check the orientation against the photo in the connection guide, and press down gently until it’s fully seated.</p>
                  <p className="muted">Then snap the BLE antenna onto the small round connector on the XIAO. Without it, the Bluetooth range drops to almost nothing.</p>
                  <div className="controls">
                    <button className="btn" id="seatBtn">Seat the XIAO</button>
                    <button className="btn" id="antBtn">Snap on the antenna</button>
                  </div>
                </div>
                <svg aria-label="XIAO module being mounted onto the Octopus board" id="seat" viewBox="0 0 520 240" />
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Flash the firmware from your browser</h3>
                  <p>Plug the XIAO into your computer with the USB-C data cable, open <b>firmware.pieeg.com</b> in Chrome or Edge, click Install and pick the serial port. It takes about 30 seconds.</p>
                  <p className="muted">When it’s done, unplug and replug the board once. It then shows up over Bluetooth as <code>Octopus-16-XXXX</code>. Try the installer on the right.</p>
                </div>
                <div className="installer" id="installer" />
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Unplug from the computer, power it from a battery</h3>
                  <p>Once flashed, disconnect the USB-C cable from the computer and run the board from a small 5 V power bank on the head band. A battery keeps the body isolated from mains power and keeps the signal clean.</p>
                </div>
                <div className="dodont">
                  <div className="yes">
                    <h4>Do</h4>
                    <ul>
                      <li>5 V power bank, up to 300 mAh</li>
                      <li>2 A maximum</li>
                      <li>Bank fixed on the band, cable short</li>
                    </ul>
                  </div>
                  <div className="no">
                    <h4>Don’t</h4>
                    <ul>
                      <li>Wear it while plugged into a computer</li>
                      <li>Wall adapters or chargers</li>
                      <li>Large, heavy power banks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Place it and check pin contact</h3>
                  <p>Put the board over the back of the head, pins down, and hold it with the band. Set it straight on, at a right angle to the scalp: tilted pins lose contact and can jam.</p>
                  <p className="muted">Dry pins have to reach the skin through hair. Tighten the band until it’s snug but comfortable, and wiggle the board gently so the pins part the hair. Try it on the right.</p>
                  <div className="controls">
                    <button className="btn" id="tightBtn">Tighten the band</button>
                    <button className="btn" id="wiggleBtn">Wiggle through the hair</button>
                    <button className="btn" id="resetPins" style={{borderColor: "transparent", color: "var(--muted)"}}>Start again</button>
                  </div>
                </div>
                <div className="contact">
                  <svg aria-label="Pin contact quality" id="contactMap" viewBox="-110 -110 220 220" />
                  <div>
                    <div className="big" id="goodPins">0</div>
                    <div className="muted">of 16 pins in good contact</div>
                    <div className="qlegend"><span><i style={{background: "#45dd8b"}} />Good</span><span><i style={{background: "#ffc34d"}} />Weak</span><span><i style={{background: "#ff5a74"}} />None</span></div>
                    <p className="muted" id="contactNote" style={{marginTop: "10px"}} />
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Connect in the browser</h3>
                  <p>Open cloud.pieeg.com, find the Octopus 16 card under Connect Your Device and press Connect. Pick your board in the Bluetooth dialog and the stream starts: 16 channels at 250 Hz, filtered in the browser.</p>
                  <p className="muted">Web Bluetooth needs Chrome or Edge over HTTPS. Firefox, Safari and iOS don’t support it. Building your own page? The PiEEG JavaScript SDK connects in one call.</p>
                </div>
                <div className="code">
                  <div className="tabs" id="pairTabs" role="tablist" />
                  <button className="copy" data-copy="pair" style={{top: "52px"}}>Copy</button>
                  <pre id="code-pair" />
                </div>
              </div>
            </li>
            <li className="step" id="s7">
              <div className="num">7</div>
              <div className="step-body">
                <div>
                  <h3>Look after the pins</h3>
                  <p>Each pin is a tiny spring in a barrel. Dust, hair, oil and sideways pressure can make one stick. Clean them regularly and they keep working.</p>
                  <p className="muted">A stuck pin often still works if it touches the skin. Contamination and wear from handling aren’t covered by the warranty.</p>
                </div>
                <div>
                  <ul className="tick" id="care">
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Wipe the tips with isopropyl alcohol, over 90%</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Blow dust from around the pin bases with compressed air</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Unstick a pin: a drop of alcohol in the barrel, work the plunger gently with a non-metal tool, let it dry fully</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Never oil or grease the pins<small>it attracts dirt and ruins conductivity</small></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ol>
        </section>
        <section className="safety-band" id="safety">
          <h2>Before you put it on anyone</h2>
          <ul>
            <li>Octopus 16 is not a medical device and isn’t certified by any regulator. It’s for education, research and engineering, never for diagnosis or treatment.</li>
            <li>Only wear it on battery power. Unplug the USB-C cable from the computer first.</li>
            <li>Press gently. The pins should rest on the scalp, not dig in. Stop if the skin becomes sore or irritated.</li>
            <li>Building an SSVEP interface? Flickering stimuli can trigger seizures in people with photosensitive epilepsy. Screen participants and keep stimuli small.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
