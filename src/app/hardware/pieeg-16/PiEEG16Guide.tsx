"use client";

/**
 * PiEEG-16 guide: "Where to use it" live demos + "How to set it up" steps.
 *
 * Converted from pieeg16-page.html. The markup below is the original HTML as JSX;
 * the interactive parts are driven by ./pieeg16-guide-engine.js, mounted after
 * hydration and stopped on unmount. All images are embedded in the engine and CSS.
 */

import { useEffect, useRef } from "react";
import { mountPieeg16Guide } from "./pieeg16-guide-engine.js";
import "./pieeg16-guide.css";

export default function PiEEG16Guide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountPieeg16Guide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="PiEEG-16: where to use it and how to set it up"
      id="pieeg16-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">PiEEG‑16</h2>
            <p className="lede">Sixteen channels on a Raspberry Pi. Enough to map the whole scalp, or brain, eyes and muscles in one session.</p>
            <p className="sub">Two ADS1299 converters in a daisy chain double the original PiEEG-8. It’s the default board for PiEEG Server, which streams, records and draws live topographic maps of all sixteen channels.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="Photograph of the PiEEG-16 shield on a Raspberry Pi" id="board" role="img" viewBox="0 0 720 520" />
        </section>
        <dl className="facts">
          <div>
            <dt>Channels</dt>
            <dd>16, plus REF and BIAS</dd>
          </div>
          <div>
            <dt>Signals</dt>
            <dd>EEG, EMG, ECG</dd>
          </div>
          <div>
            <dt>Converters</dt>
            <dd>2 × ADS1299, 24-bit</dd>
          </div>
          <div>
            <dt>Sample rate</dt>
            <dd>250 SPS to 16 kSPS</dd>
          </div>
          <div>
            <dt>Host</dt>
            <dd>Raspberry Pi 5 or 4</dd>
          </div>
          <div>
            <dt>Power</dt>
            <dd>5 V battery, 3 A</dd>
          </div>
        </dl>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>Sixteen channels change what’s possible: a picture of the whole head instead of a few points, both hemispheres at once, or several kinds of signal side by side. Pick a use case and try the live demo.</p>
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
            <p>The same shield-on-a-Pi setup as PiEEG-8, with twice the electrodes. Eight steps from the box to a live 16-channel map.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Gather the kit</h3>
                  <p>PiEEG-16 is a shield, so you bring the Raspberry Pi. Everything runs from one power bank.</p>
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>PiEEG-16 shield</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Raspberry Pi 5 or 4<small>with a microSD card and Raspberry Pi OS</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>5 V power bank<small>3 A or more, up to 10,000 mAh</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>16 electrodes with cables<small>dry, or Ag/AgCl wet with gel</small></span>
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
                      <span>16-channel EEG cap<small>the PiEEG cap kit, a third-party cap with 2.54 mm pins, or DIY</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Wired keyboard, mouse and a portable monitor</span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Seat the shield on the GPIO header</h3>
                  <p>With the Pi switched off, line PiEEG-16 up with the 40-pin header and press it down evenly until every pin is fully in.</p>
                  <p className="muted">A pin that misses its socket is the most common reason for a board that won’t start. Look along both rows before you power on.</p>
                  <button className="btn" id="seatBtn">Seat the shield</button>
                </div>
                <svg aria-label="Shield being pressed onto the Raspberry Pi header" id="seat" viewBox="0 0 520 220" />
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Connect sixteen electrodes</h3>
                  <p>Fit the cap and place the sixteen channel electrodes on 10-20 positions. Clip the reference to one earlobe and the bias to the other. One reference serves all sixteen channels.</p>
                  <p className="muted">This is a common 16-channel layout. Use any positions you need, and follow the pin labels on the board and the connection diagram in the quick start manual. Keep the cables short and tidy: sixteen loose leads pick up a lot of noise.</p>
                  <div className="wire-list" id="wireList" />
                </div>
                <svg aria-label="Wiring map from electrodes to the PiEEG-16 headers" id="wire" viewBox="0 0 560 600" />
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Power it from the battery only</h3>
                  <p>Plug the power bank into the Pi and run the monitor from the same bank. The board has no patient isolation, so the battery is what keeps the person safe and the signal clean. It’s printed on the board for a reason.</p>
                </div>
                <div className="dodont">
                  <div className="yes">
                    <h4>Do</h4>
                    <ul>
                      <li>5 V power bank, 3 A or more</li>
                      <li>Monitor powered from the same bank</li>
                      <li>Short, thick USB cable</li>
                      <li>Wired keyboard and mouse</li>
                    </ul>
                  </div>
                  <div className="no">
                    <h4>Don’t</h4>
                    <ul>
                      <li>Wall adapters or chargers</li>
                      <li>USB from a computer on mains</li>
                      <li>Charging while electrodes are on</li>
                      <li>Phones and routers close by</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Install PiEEG Server</h3>
                  <p>One command installs the server. Reboot once so SPI is switched on. PiEEG-16 is the server’s default board, so plain <code>pieeg-server</code> is enough.</p>
                  <p className="muted">No board yet? Run <code>pieeg-server --mock</code> for synthetic data.</p>
                </div>
                <div className="code">
                  <button className="copy" data-copy="install">Copy</button>
                  <pre id="code-install"><span className="c">{"# install"}</span>{"\ncurl -sSL \\\n  https://raw.githubusercontent.com/pieeg-club/PiEEG-server/main/install.sh | bash\n\n"}<span className="c">{"# first time only: enables SPI"}</span>{"\nsudo reboot\n\n"}<span className="c">{"# pieeg16 is the default device"}</span>{"\n"}<span className="p">{"pieeg-server"}</span></pre>
                </div>
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Open the dashboard and the head map</h3>
                  <p>Open the dashboard and press Connect. Then open the topographic map: it paints live band power onto a 3D head, with a flat 2D view if you prefer.</p>
                  <p className="muted">Placed your electrodes differently? Open the map’s placement editor with the gear button to rename or remap any channel. Your layout is saved in the browser.</p>
                </div>
                <div className="urls">
                  <div className="url">
                    <div><code>http://localhost:1617</code><small>On the Pi’s own monitor</small></div>
                    <button className="copy" data-text="http://localhost:1617">Copy</button>
                  </div>
                  <div className="url">
                    <div><code>http://raspberrypi.local:1617</code><small>From another computer on the same network</small></div>
                    <button className="copy" data-text="http://raspberrypi.local:1617">Copy</button>
                  </div>
                  <table className="ports">
                    <tbody>
                      <tr>
                        <td>:1616</td>
                        <td>WebSocket data stream</td>
                      </tr>
                      <tr>
                        <td>:1617</td>
                        <td>Web dashboard</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
            <li className="step" id="s7">
              <div className="num">7</div>
              <div className="step-body">
                <div>
                  <h3>Check the signal before you record</h3>
                  <p>With sixteen channels, one bad contact is easy to miss. Look at every trace before you start, then work through the list.</p>
                  <ul className="tick" id="quiet">
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>All sixteen traces look alike at rest<small>a flat or wild channel means a loose electrode</small></span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Wi-Fi and Bluetooth off on the Pi<small>if you view the dashboard on the Pi itself</small></span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Board on an insulating surface</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Feet off the floor, no metal stool</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span>Gel on the electrodes for the lowest noise</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="muted" style={{marginBottom: "8px"}}>Still noisy? Short every input internally and each trace should sit within about ±1 to 3 µV. Do it on both chips: if one half is noisy and the other isn’t, you’ve found your problem.</p>
                  <div className="code">
                    <button className="copy" data-copy="short">Copy</button>
                    <pre id="code-short"><span className="c">{"# Test 1: every channel set to input short"}</span>{"\nwrite_byte(CHnSET, 0x01)\n\n"}<span className="c">{"# Test 2: open channel 1, keep the rest shorted"}</span>{"\nwrite_byte(CH1SET, 0x00)"}</pre>
                  </div>
                </div>
              </div>
            </li>
            <li className="step" id="s8">
              <div className="num">8</div>
              <div className="step-body">
                <div>
                  <h3>Record and stream</h3>
                  <p>Record sessions to CSV, or stream to your own code and tools. With sixteen channels, LSL channel groups are worth knowing: split one board into separate EEG, EOG and EMG streams.</p>
                  <p className="muted">The PiEEG-16 SDK scripts on GitHub read the SPI directly if you prefer your own code.</p>
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
            <li>PiEEG-16 is not a medical device and isn’t certified by the FDA, CE or any other regulator. It’s for education, research and engineering only, never for diagnosis or treatment.</li>
            <li>The board has no patient isolation circuitry. Power the Pi, the shield and anything connected to them from a 5 V battery only.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician first.</li>
            <li>Stop if the skin becomes irritated or the person feels any discomfort.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
