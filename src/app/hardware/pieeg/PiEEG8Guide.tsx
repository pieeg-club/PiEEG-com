"use client";

/**
 * PiEEG-8 guide: "Where to use it" live demos + 8-step "How to set it up".
 *
 * Converted from pieeg8-page.html. The markup below is the original HTML as JSX;
 * the interactive parts (board drawing, body figure, signal demos, wiring map,
 * code tabs, copy buttons, checklists) are driven by ./pieeg8-guide-engine.js,
 * mounted after hydration and stopped on unmount.
 *
 * Images: /public/products/pieeg8/
 *   pieeg8-board.png        PiEEG-8 on a Raspberry Pi (hero drawing)
 *   pieeg8-body-figure.png  mannequin for electrode placement
 *   pieeg8-cap.png          EEG cap (step 1, "Gather the kit")
 */

import { useEffect, useRef } from "react";
import { mountPieeg8Guide } from "./pieeg8-guide-engine.js";
import "./pieeg8-guide.css";

export default function PiEEG8Guide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountPieeg8Guide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="PiEEG-8: where to use it and how to set it up"
      id="pieeg8-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">PiEEG-8</h2>
            <p className="lede">An 8-channel shield that turns a Raspberry Pi into a brain-computer interface.</p>
            <p className="sub">PiEEG-8 reads EEG, EMG and ECG through an ADS1299 at 24-bit resolution. It sits on the Raspberry Pi’s 40-pin GPIO header and hands the data over SPI to PiEEG Server, which adds a browser dashboard, recording and integrations.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="PiEEG-8 shield mounted on a Raspberry Pi, powered by a power bank" id="board" role="img" viewBox="0 0 720 540" />
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
            <dd>250 SPS to 16 kSPS</dd>
          </div>
          <div>
            <dt>Host</dt>
            <dd>Raspberry Pi 3, 4 or 5</dd>
          </div>
          <div>
            <dt>Power</dt>
            <dd>5 V power bank only</dd>
          </div>
        </dl>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>PiEEG-8 goes wherever a Raspberry Pi and a power bank can go: a lab bench, a desk, a classroom. Pick a use case and try the live demo.</p>
          </div>
          <div className="uses">
            <ul aria-label="Use cases" className="use-list" id="useList" role="tablist" />
            <div className="use-stage" id="useStage">
              <div className="body-col">
                <svg aria-label="Electrode and device placement" id="body" role="img" viewBox="1010 40 380 400" />
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
            <p>Kit, power, shield, software, electrodes. Eight steps from the box to a live signal, with the two checks that keep PiEEG-8 safe built in.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Gather the kit</h3>
                  <p>PiEEG-8 is a shield, so it needs a Raspberry Pi to sit on and a power bank to run from.</p>
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>PiEEG-8 shield</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Raspberry Pi 3, 4 or 5<small>with a microSD card</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Power bank<small>5 V, at least 3 A, no more than 10,000 mAh</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Short, thick USB cable<small>long, thin cables drop the voltage</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>8 electrodes with cables<small>dry or Ag/AgCl wet, 2.54 mm connectors</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>2 ear-clip electrodes<small>for reference and bias</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>EEG cap<small>the PiEEG nylon cap, or a DIY cap</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Monitor, keyboard and mouse<small>or a laptop on the same network for the dashboard</small></span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Choose the power source</h3>
                  <p>PiEEG-8 has no isolation circuitry between the electrodes and the power supply. The only safe source is a <b>5 V battery</b>, so the whole setup runs from a power bank.</p>
                  <p className="muted">Use a power bank with 5 V output, at least 3 A and no more than 10,000 mAh. Try each option below.</p>
                  <div aria-label="Power source" className="seg-mini" id="pwrSeg" role="group">
                    <button aria-pressed="true" data-p="bank">Power bank</button>
                    <button aria-pressed="false" data-p="wall">Wall charger</button>
                    <button aria-pressed="false" data-p="laptop">Laptop USB</button>
                  </div>
                </div>
                <div>
                  <svg aria-label="Power source check" id="polarity" viewBox="0 0 520 240" />
                  <p className="verdict" id="verdict" />
                </div>
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Mount the shield on the Raspberry Pi</h3>
                  <p>With everything unplugged, line PiEEG-8 up with the Pi’s 40-pin GPIO header and press it down evenly until every pin is seated.</p>
                  <p className="muted">The usual mistake is a shield shifted by one pin. Try both below.</p>
                  <div aria-label="Shield position" className="seg-mini" id="mountSeg" role="group">
                    <button aria-pressed="true" data-m="ok">Aligned</button>
                    <button aria-pressed="false" data-m="shift">Shifted by one pin</button>
                  </div>
                </div>
                <div>
                  <svg aria-label="GPIO header alignment check" id="mount" viewBox="0 0 520 240" />
                  <p className="verdict" id="verdict2" />
                </div>
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Install PiEEG Server</h3>
                  <p>PiEEG Server reads PiEEG-8 over SPI and gives you the dashboard, recording and integrations. Install it on the Raspberry Pi.</p>
                  <p className="muted">On a Raspberry Pi that has never used SPI, reboot once after installing: the reboot switches SPI on.</p>
                </div>
                <div className="code">
                  <div className="tabs" id="installTabs" role="tablist" />
                  <button className="copy" data-copy="install" style={{top: "52px"}}>Copy</button>
                  <pre id="code-install" />
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Connect the electrodes</h3>
                  <p>Plug the eight channel electrodes into the header, clip the reference to one earlobe and the bias to the other. For EEG they go on a cap at 10-20 positions; for EMG and ECG see the placements in <a href="#where">Where to use it</a>.</p>
                  <p className="muted">This is a common 8-channel layout. Follow the pin labels on the board and the connection diagram in the PiEEG-8 quick start manual on GitHub. Keep the cables short.</p>
                  <div className="wire-list" id="wireList" />
                </div>
                <svg aria-label="Wiring map from electrodes to the PiEEG-8 header" id="wire" viewBox="0 0 560 380" />
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Power on and start streaming</h3>
                  <p>Connect the power bank to the Raspberry Pi. When it has booted, start PiEEG Server with the PiEEG-8 driver and open the dashboard from any browser on the same network.</p>
                  <p className="muted">If something doesn’t work, <code>pieeg-server doctor</code> checks the hardware, SPI and configuration and tells you what to fix.</p>
                </div>
                <div className="code">
                  <div className="tabs" id="startTabs" role="tablist" />
                  <button className="copy" data-copy="start" style={{top: "52px"}}>Copy</button>
                  <pre id="code-start" />
                </div>
              </div>
            </li>
            <li className="step" id="s7">
              <div className="num">7</div>
              <div className="step-body">
                <div>
                  <h3>Check the signal</h3>
                  <p>Running from a power bank keeps PiEEG-8 away from the mains, which removes most hum. The rest comes down to contact and movement.</p>
                  <ul className="tick" id="quiet">
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Everything on the power bank<small>nothing plugged into the wall, including the monitor</small></span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Electrodes firm on the skin<small>gel gives the lowest noise</small></span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Short electrode cables, nothing dangling</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Setup away from Wi-Fi routers and phones</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Person sitting still for the first recording</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="muted" style={{marginBottom: "10px"}}>PiEEG Server can band-pass the stream from 1 to 40 Hz before it reaches the dashboard and your code.</p>
                  <div className="code">
                    <pre><span className="c">{"# stream with the 1 to 40 Hz band-pass"}</span>{"\n"}<span className="p">{"pieeg-server"}</span>{" --device pieeg8 --filter"}</pre>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s8">
              <div className="num">8</div>
              <div className="step-body">
                <div>
                  <h3>Record and stream</h3>
                  <p>Record on the Pi, or pull the live stream into your own code on the Pi or another computer on the network.</p>
                  <p className="muted">PiEEG-8 also works with the classic Python scripts and with the BrainFlow library. See the PiEEG-8 software page in the documentation.</p>
                </div>
                <div className="code">
                  <div className="tabs" id="codeTabs" role="tablist" />
                  <button className="copy" data-copy="tab" style={{top: "52px"}}>Copy</button>
                  <pre id="code-tab" />
                </div>
              </div>
            </li>
          </ol>
        </section>
        <section className="safety-band" id="safety">
          <h2>Before you put it on anyone</h2>
          <ul>
            <li>PiEEG-8 is not a medical device and isn’t certified by any regulator. It’s for education, research and engineering, never for diagnosis or treatment.</li>
            <li>Power PiEEG-8 only from a 5 V battery. Never from the mains, a wall charger or a computer’s USB port: the board has no isolation circuitry.</li>
            <li>While electrodes are on a person, keep everything connected to the Raspberry Pi on the power bank too, including the monitor.</li>
            <li>The electronics are exposed. Handle the board with anti-static care, and mount or remove the shield only with the power off.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician. Stop if the skin becomes irritated.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
