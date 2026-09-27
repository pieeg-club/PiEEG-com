"use client";

/**
 * IronBCI guide: video, "Where to use it" live demos + "How to set it up" steps.
 *
 * Converted from ironbci-page.html. The markup below is the original HTML as JSX;
 * the interactive parts are driven by ./ironbci-guide-engine.js, mounted after
 * hydration and stopped on unmount. All images are embedded in the engine and CSS.
 */

import { useEffect, useRef } from "react";
import { mountIronBCIGuide } from "./ironbci-guide-engine.js";
import "./ironbci-guide.css";

export default function IronBCIGuide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountIronBCIGuide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="IronBCI: where to use it and how to set it up"
      id="ironbci-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">IronBCI</h2>
            <p className="lede">An 8-channel brain-computer interface you wear. No Raspberry Pi, no cables to a computer.</p>
            <p className="sub">IronBCI reads EEG, EMG, ECG and EOG through an ADS1299, runs on a small LiPo battery, and streams 250 samples per second over Bluetooth to a laptop, an Android phone or straight into a browser tab.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="IronBCI board photograph with LiPo battery illustration" id="board" role="img" viewBox="0 0 720 540" />
        </section>
        <dl className="facts">
          <div>
            <dt>Channels</dt>
            <dd>8, plus REF and BIAS</dd>
          </div>
          <div>
            <dt>Signals</dt>
            <dd>EEG, EMG, ECG, EOG</dd>
          </div>
          <div>
            <dt>Converter</dt>
            <dd>ADS1299, 24-bit</dd>
          </div>
          <div>
            <dt>Wireless</dt>
            <dd>Bluetooth LE, 250 SPS</dd>
          </div>
          <div>
            <dt>Battery</dt>
            <dd>LiPo 200 mAh, JST 2.0</dd>
          </div>
          <div>
            <dt>Host</dt>
            <dd>None needed</dd>
          </div>
        </dl>
        <section className="ig-video" id="video">
          <div className="sec-head">
            <h2>Video introduction</h2>
            <p>A two-minute look at IronBCI: the board, how it&apos;s worn, and the signal streaming over Bluetooth.</p>
          </div>
          <div className="ig-frame">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" src="https://www.youtube.com/embed/gWpfsLuq_eE" title="IronBCI video introduction" />
          </div>
        </section>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>Because it’s wireless and battery powered, IronBCI goes where a desk setup can’t: on the arm, the chest, around the eyes, into a phone. Pick a use case and try the live demo.</p>
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
            <p>Battery, switches, electrodes, Bluetooth. Eight steps from the box to a live signal, with the two checks that protect the board built in.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Gather the kit</h3>
                  <p>IronBCI is standalone, so the list is short. What you strap it to depends on the signal you want.</p>
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>IronBCI board</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>LiPo battery, 3.7 V<small>200 mAh recommended, 2.0 mm JST plug</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>8 electrodes with cables<small>dry or wet, 2.54 mm connectors</small></span>
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
                      <span>EEG cap, arm band or chest strap</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Micro USB cable<small>5 V, for charging</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Something to receive the data<small>a laptop with Bluetooth, an Android phone, or Chrome or Edge</small></span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Check the battery polarity, then connect it</h3>
                  <p>The battery socket is on the underside of the board. Some JST plugs are wired the other way round, and a reversed battery <b>will damage the board</b>.</p>
                  <p className="muted">Before the first connection, check that the red wire lands on the +3.7 V pad and the black wire on GND. Try both plugs below.</p>
                  <div aria-label="Battery plug" className="seg-mini" id="polSeg" role="group">
                    <button aria-pressed="true" data-p="ok">Standard plug</button>
                    <button aria-pressed="false" data-p="rev">Reversed plug</button>
                  </div>
                </div>
                <div>
                  <svg aria-label="Battery polarity check" id="polarity" viewBox="0 0 520 240" />
                  <p className="verdict" id="verdict" />
                </div>
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Set the two switches</h3>
                  <p>Switch 1 connects the battery. Switch 2 starts the data flow. With both on, the board starts advertising over Bluetooth and is ready to pair.</p>
                  <table className="ports modes">
                    <tbody>
                      <tr>
                        <td>Normal use</td>
                        <td>Switch 1 on, switch 2 on</td>
                      </tr>
                      <tr>
                        <td>Charging</td>
                        <td>Switch 1 on, switch 2 off</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="switchbox">
                  <div className="sw-row">
                    <button aria-checked="false" className="sw" id="sw1" role="switch"><i /></button>
                    <div><b>Switch 1</b><span>Battery</span></div>
                  </div>
                  <div className="sw-row">
                    <button aria-checked="false" className="sw" id="sw2" role="switch"><i /></button>
                    <div><b>Switch 2</b><span>Data flow</span></div>
                  </div>
                  <div className="state" id="swState" />
                </div>
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Charge over Micro USB</h3>
                  <p>Plug a 5 V Micro USB cable into the charging port on the power board. LED 1 means charging, LED 2 means the battery is full.</p>
                  <p className="muted">Never record while charging. Take the electrodes off, set switch 2 off, then plug in.</p>
                  <div className="controls">
                    <button className="btn" id="plugBtn">Plug in the charger</button>
                  </div>
                </div>
                <div className="charge">
                  <div className="leds">
                    <div className="ledrow">
                      <span className="led" id="led1" />
                      <div><b>LED 1</b><span>Charging</span></div>
                    </div>
                    <div className="ledrow">
                      <span className="led green" id="led2" />
                      <div><b>LED 2</b><span>Fully charged</span></div>
                    </div>
                  </div>
                  <div className="batt">
                    <div className="cell">
                      <div className="lvl" id="lvl" />
                    </div>
                    <span id="lvlTxt">42%</span>
                  </div>
                  <p className="state" id="chState" />
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Connect the electrodes</h3>
                  <p>Plug the eight channel electrodes into the header, clip the reference to one earlobe and the bias to the other. For EEG they go on a cap at 10-20 positions; for EMG, ECG and EOG see the placements in <a href="#where">Where to use it</a>.</p>
                  <p className="muted">This is a common 8-channel layout. Follow the pin labels on the board and the connection diagram in the IronBCI repository. Keep the cables short.</p>
                  <div className="wire-list" id="wireList" />
                </div>
                <svg aria-label="Wiring map from electrodes to the IronBCI header" id="wire" viewBox="0 0 560 380" />
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Pair over Bluetooth</h3>
                  <p>With both switches on, IronBCI advertises itself. Pair from whichever tool you like. When the link is up, the blue BLE LED turns on and 8 channels start streaming at 250 samples per second.</p>
                  <p className="muted">Only one host can hold the Bluetooth connection at a time. Disconnect the browser before connecting PiEEG Server, and the other way round.</p>
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
                  <h3>Check the signal</h3>
                  <p>The battery keeps IronBCI isolated from the mains, which removes most hum. The rest comes down to contact and movement.</p>
                  <ul className="tick" id="quiet">
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Charger unplugged, switch 2 on</span>
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
                        <span>Board away from Wi-Fi routers and phones</span>
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
                  <p className="muted" style={{marginBottom: "10px"}}>Direct browser connections filter the stream for you: Hampel spike removal and a 1 to 40 Hz band-pass are on by default, with a notch filter you can switch on. PiEEG Server applies the same chain.</p>
                  <div className="code">
                    <pre><span className="c">{"# same filters through the server"}</span>{"\n"}<span className="p">{"pieeg-server"}</span>{" --device ironbci8 --filter"}</pre>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s8">
              <div className="num">8</div>
              <div className="step-body">
                <div>
                  <h3>Record and stream</h3>
                  <p>Record from the browser or the server, or pull the live stream into your own code.</p>
                  <p className="muted">LSL, VRChat OSC and webhooks run in PiEEG Server, so use the server path for those. The browser path covers viewing, detectors and CSV recording.</p>
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
            <li>IronBCI is not a medical device and isn’t certified by any regulator. It’s for education, research and engineering, never for diagnosis or treatment.</li>
            <li>Check battery polarity before the first connection. A reversed JST plug damages the board.</li>
            <li>Don’t wear or record while charging. Remove the electrodes before plugging in the Micro USB cable.</li>
            <li>Treat the LiPo with care: don’t puncture, crush or short it, and stop using a cell that has swollen.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician. Stop if the skin becomes irritated.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
