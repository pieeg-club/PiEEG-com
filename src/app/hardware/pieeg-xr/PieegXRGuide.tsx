"use client";

/**
 * PiEEG XR guide: "Where to use it" live demos + "How to set it up" steps.
 *
 * Converted from pieegxr-page.html. The markup below is the original HTML as JSX;
 * the interactive parts are driven by ./pieegxr-guide-engine.js, mounted after
 * hydration and stopped on unmount. All images are embedded in the engine and CSS.
 */

import { useEffect, useRef } from "react";
import { mountPieegXRGuide } from "./pieegxr-guide-engine.js";
import "./pieegxr-guide.css";

export default function PieegXRGuide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountPieegXRGuide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="PiEEG XR: where to use it and how to set it up"
      id="pieegxr-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">PiEEG XR</h2>
            <p className="lede">A face mask with ten electrodes that swaps into your VR headset. Your expressions and brain state go straight into XR.</p>
            <p className="sub">The silicone mask replaces the headset’s facial interface. A small box on the head strap holds dual ADS1299 converters and an STM32WB, and streams over Bluetooth LE 5 to the headset, a phone or VRChat.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="PiEEG XR silicone mask with its ten electrodes and the BCI box" id="board" role="img" viewBox="0 0 720 540" />
        </section>
        <dl className="facts">
          <div>
            <dt>Channels</dt>
            <dd>8, plus REF and BIAS</dd>
          </div>
          <div>
            <dt>Electrodes</dt>
            <dd>10 flat dry Ag/AgCl</dd>
          </div>
          <div>
            <dt>Converters</dt>
            <dd>Dual ADS1299</dd>
          </div>
          <div>
            <dt>Noise</dt>
            <dd>1.0 µVpp</dd>
          </div>
          <div>
            <dt>Wireless</dt>
            <dd>Bluetooth LE 5</dd>
          </div>
          <div>
            <dt>Power</dt>
            <dd>5 V over USB-C</dd>
          </div>
        </dl>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>The mask sits where your face meets the headset: over the forehead, temples and cheeks. That’s the right place for facial muscles, blinks and frontal brain activity. Pick a use case and try the live demo.</p>
          </div>
          <div className="uses">
            <ul aria-label="Use cases" className="use-list" id="useList" role="tablist" />
            <div className="use-stage" id="useStage">
              <div className="body-col">
                <svg aria-label="Mask electrodes on the face" id="body" role="img" viewBox="224 62 212 223" />
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
            <p>Swap the mask, mount the box, power it, and prove the signal is real before you record. Eight steps, with the checks from the XR noise guide built in.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Check what you need</h3>
                  <p>Each mask and box is shaped for one headset model. A unit built for the Meta Quest 3 fits only the Meta Quest 3, so check yours matches.</p>
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>PiEEG XR mask and BCI box<small>made for your headset model</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>VR headset<small>Meta Quest 3, Meta Quest, PICO and others. A built-in battery can power the box</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>5 V power bank<small>rated for USB power delivery</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>USB-C to USB-A cable<small>the most reliable way to power the box</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Alcohol pads<small>to clean the skin before each session</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Conductive gel or saline<small>optional, cuts motion noise</small></span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Replace the face mask</h3>
                  <p>Remove the headset’s original facial interface. Line up the four buckles on the PiEEG XR mask, then snap the <b>two back</b> buckles first and the <b>two front</b> buckles after.</p>
                  <p className="muted">Prefer to keep your own mask? You can take just the silicone insert out of the PiEEG XR mask and fit it into your setup.</p>
                  <p className="state" id="buckleState" />
                </div>
                <svg aria-label="Snap the four buckles" id="buckles" viewBox="0 0 520 300" />
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Mount the BCI box on the strap</h3>
                  <p>The box is held in place by the headset’s own head strap. Take the strap off, seat the box against the headset, and put the strap back on over it. Then route the cable from the mask to the box.</p>
                </div>
                <ul className="tick" id="mount">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Remove the head strap from the headset</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Place the box against the headset</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Reattach the strap over the box</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Route the cable from the mask to the box</span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Power it on</h3>
                  <p>Plug a 5 V supply into the box’s USB-C port. An LED lights up inside the box, and it starts advertising over Bluetooth as <code>PiEEG XR</code>.</p>
                  <p className="muted">Box not showing up? It’s almost always power. Pick a supply on the right to see what to expect.</p>
                </div>
                <div className="powerbox">
                  <div aria-label="Power supply" className="seg-mini" id="pwrSeg" role="group">
                    <button data-p="a">USB-C to USB-A, power bank</button>
                    <button data-p="c">USB-C to USB-C</button>
                    <button data-p="h">Headset battery</button>
                  </div>
                  <div className="pwr-row">
                    <span className="led" id="pwrLed" />
                    <div id="pwrText">Choose how you’ll power it.</div>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Prep the skin and fit the mask</h3>
                  <p>Movement is the hardest condition for EEG, so preparation decides whether you get data or noise. Do this every session.</p>
                </div>
                <ul className="tick" id="prep">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Wipe the contact areas with an alcohol pad<small>removes oil, sweat and makeup. Let it dry</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Fit the mask firmly and evenly<small>original mask with the silicone insert, no gaps or bending</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Optionally, a little gel or saline on the pads<small>the single best fix for motion noise</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Reference and bias pads solid<small>a loose reference makes every channel drift or rail</small></span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Connect, then prove the signal is real</h3>
                  <p>Connect from BodyPress in the headset or on Android, or with the live demo at pieeg.com: turn Bluetooth on and pick <code>PiEEG XR</code>. Let the band-pass filter settle for a few seconds, then run the tests. They take under a minute.</p>
                  <p className="muted">The blink test is your one-second sanity check. If a hard blink doesn’t show on the forehead channels, fix the fit before anything else. The alpha test needs electrodes at the back of the head, so it’s only for the academic version.</p>
                  <div className="controls" id="testCtl" />
                </div>
                <div>
                  <canvas height="170" id="testCanvas" />
                  <ul className="tests" id="tests" />
                </div>
              </div>
            </li>
            <li className="step" id="s7">
              <div className="num">7</div>
              <div className="step-body">
                <div>
                  <h3>Record, then clean in software</h3>
                  <p>Record 20 to 30 seconds standing still first. That clean baseline lets you compare the moving data later. Note the times of big movements as you go.</p>
                  <p className="muted">Filtering can’t rescue a channel that was saturated by motion. Getting the fit right is always worth more than processing afterwards.</p>
                </div>
                <div className="code">
                  <div className="tabs" id="codeTabs" role="tablist" />
                  <button className="copy" data-copy="tab" style={{top: "52px"}}>Copy</button>
                  <pre id="code-tab" />
                </div>
              </div>
            </li>
            <li className="step" id="s8">
              <div className="num">8</div>
              <div className="step-body">
                <div>
                  <h3>If Bluetooth won’t connect: update the firmware</h3>
                  <p>The fix is usually a new firmware file. The ST-Link programmer and its cables ship in the package. Connect it to your computer, install STM32CubeProgrammer, wire it to the board over SWD, then Connect, open the hex file, upload, disconnect and reset.</p>
                  <p className="muted">If the ST-Link isn’t recognised, update its driver and reconnect. Hover a wire to trace it.</p>
                </div>
                <svg aria-label="SWD wiring between ST-Link and the board" id="swd" viewBox="0 0 520 250" />
              </div>
            </li>
          </ol>
        </section>
        <section className="safety-band" id="safety">
          <h2>Before you put it on anyone</h2>
          <ul>
            <li>PiEEG XR is a research setup for research only. It isn’t a medical or consumer medical device and isn’t meant for diagnosis or treatment.</li>
            <li>Power it only from a 5 V power bank or the headset’s own battery, never from a wall adapter.</li>
            <li>Take regular breaks from VR, and stop if the wearer feels dizzy, sick or uncomfortable.</li>
            <li>Clean the pads and the skin between users. Stop if the skin becomes irritated.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
