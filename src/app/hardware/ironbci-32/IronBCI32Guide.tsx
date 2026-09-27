"use client";

/**
 * IronBCI-32 guide: "Where to use it" live demos + 8-step "How to set it up".
 *
 * Converted from ironbci32-page.html. The markup below is the original HTML as JSX;
 * the interactive parts are driven by ./ironbci32-guide-engine.js, mounted after
 * hydration and stopped on unmount. All images are embedded in the engine and CSS.
 */

import { useEffect, useRef } from "react";
import { mountIronBCI32Guide } from "./ironbci32-guide-engine.js";
import "./ironbci32-guide.css";

export default function IronBCI32Guide() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountIronBCI32Guide(root);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="IronBCI-32: where to use it and how to set it up"
      id="ironbci32-guide"
    >
      <div className="wrap ig-main">
        <section className="hero">
          <div>
            <h2 className="ig-title">IronBCI‑32</h2>
            <p className="lede">Thirty-two channels over USB. The whole scalp, research-grade, straight into BrainFlow.</p>
            <p className="sub">Four AD7771 converters, one for each bank of eight electrodes, and an STM32H7 stream 500 samples per second to your laptop. It works with BrainFlow out of the box, and with PiEEG Server or a browser tab.</p>
            <div className="cta"><a className="btn solid" href="#where">Where to use it</a> <a className="btn" href="#how">How to set it up</a></div>
          </div>
          <svg aria-label="Photograph of the IronBCI-32 board" id="board" role="img" viewBox="0 0 720 560" />
        </section>
        <dl className="facts">
          <div>
            <dt>Channels</dt>
            <dd>32, plus REF and BIAS</dd>
          </div>
          <div>
            <dt>Signals</dt>
            <dd>EEG, EMG, ECG, EOG</dd>
          </div>
          <div>
            <dt>Converters</dt>
            <dd>4 × AD7771, 24-bit</dd>
          </div>
          <div>
            <dt>Sample rate</dt>
            <dd>500 SPS</dd>
          </div>
          <div>
            <dt>Link</dt>
            <dd>USB serial, 921,600 baud</dd>
          </div>
          <div>
            <dt>Power</dt>
            <dd>5 V USB battery only</dd>
          </div>
        </dl>
        <section id="where">
          <div className="sec-head">
            <h2>Where to use it</h2>
            <p>Thirty-two channels are where EEG turns into real research: dense maps, event-related potentials, artifact removal that actually works, and several body signals at once. Pick a use case and try the live demo.</p>
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
            <p>Two cables, one battery, a laptop off the mains, and 32 gelled electrodes. Eight steps, with the two checks that matter most built in.</p>
          </div>
          <ol className="steps">
            <li className="step" id="s1">
              <div className="num">1</div>
              <div className="step-body">
                <div>
                  <h3>Gather the kit</h3>
                  <p>IronBCI-32 connects to a laptop, so there’s no Raspberry Pi. It does need two separate USB cables and a battery of its own.</p>
                  <p className="progress" id="kitProgress" />
                </div>
                <ul className="tick" id="kit">
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>IronBCI-32 board</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>5 V USB battery<small>powers the board</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Two Micro USB cables<small>one for power, one full data cable</small></span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>32 wet Ag/AgCl electrodes and conductive gel</span>
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
                      <span>32-channel EEG cap</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" />
                      <span>Laptop that can run on its battery</span>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="step" id="s2">
              <div className="num">2</div>
              <div className="step-body">
                <div>
                  <h3>Check your data cable</h3>
                  <p>The data cable must be a full data cable. A charge-only cable has just two wires and can’t carry data, so the laptop will never see the board. A data cable has four.</p>
                  <p className="muted">Not sure? Check the packaging, or test the cable with another device first. Pick a cable on the right.</p>
                  <div aria-label="Cable type" className="seg-mini" id="cableSeg" role="group">
                    <button data-c="charge">Charge-only cable</button>
                    <button data-c="data">Full data cable</button>
                  </div>
                </div>
                <div>
                  <svg aria-label="Wires inside the USB cable" id="cable" viewBox="0 0 520 220" />
                  <p className="verdict" id="cableVerdict" />
                </div>
              </div>
            </li>
            <li className="step" id="s3">
              <div className="num">3</div>
              <div className="step-body">
                <div>
                  <h3>Power from the battery, laptop off the mains</h3>
                  <p>Plug cable 1 from the 5 V battery into the board’s <b>Power</b> port. The board starts streaming as soon as it has power. There’s no start command.</p>
                  <p>Before you connect the data cable, <b>unplug the laptop’s charger</b>. The laptop is wired to the board, so if it’s on mains, the person wearing the cap is connected to the grid too. It also floods every channel with 50 or 60 Hz hum.</p>
                  <div aria-label="Laptop power" className="seg-mini" id="mainsSeg" role="group">
                    <button data-m="mains">Laptop on the charger</button>
                    <button data-m="batt">Laptop on battery</button>
                  </div>
                </div>
                <div>
                  <svg aria-label="Isolation diagram" id="iso" viewBox="0 0 520 190" />
                  <canvas height="90" id="humCanvas" />
                  <p className="verdict" id="isoVerdict" />
                </div>
              </div>
            </li>
            <li className="step" id="s4">
              <div className="num">4</div>
              <div className="step-body">
                <div>
                  <h3>Connect the data cable and find the port</h3>
                  <p>Plug cable 2 from the board’s <b>Data</b> port into the laptop. It shows up as a serial port. Note its name: every tool asks for it.</p>
                </div>
                <div className="code">
                  <div className="tabs" id="portTabs" role="tablist" />
                  <button className="copy" data-copy="port" style={{top: "52px"}}>Copy</button>
                  <pre id="code-port" />
                </div>
              </div>
            </li>
            <li className="step" id="s5">
              <div className="num">5</div>
              <div className="step-body">
                <div>
                  <h3>Connect 32 electrodes in four banks</h3>
                  <p>The board has four headers of eight pins, one per converter. REF and BIAS sit on the first bank. Clip the reference to one earlobe and the bias to the other. Hover a bank to see which part of the head it covers.</p>
                  <p className="muted">This is a common 32-channel layout on the 10-20 system. Follow the pin numbers on the board and the connection schematic in the docs.</p>
                  <div className="banks" id="bankList" />
                </div>
                <svg aria-label="Electrode banks and scalp positions" id="wire" viewBox="0 0 560 360" />
              </div>
            </li>
            <li className="step" id="s6">
              <div className="num">6</div>
              <div className="step-body">
                <div>
                  <h3>Gel every electrode</h3>
                  <p>IronBCI-32 is built for wet Ag/AgCl electrodes. Work gel through the hair under each one until it touches the scalp. Click electrodes on the map, or gel a whole bank at once.</p>
                  <p className="muted">Thirty-two electrodes take a while. Keep the gel off the space between electrodes: a bridge of gel shorts two channels together.</p>
                  <div className="controls" id="gelCtl" />
                  <p className="progress" id="gelProgress" />
                </div>
                <svg aria-label="Gel status per electrode" id="gelMap" viewBox="-180 -180 360 360" />
              </div>
            </li>
            <li className="step" id="s7">
              <div className="num">7</div>
              <div className="step-body">
                <div>
                  <h3>Stream it</h3>
                  <p>Three ways in. PiEEG Server needs no BrainFlow and adds the dashboard, LSL, OSC and recording. BrainFlow gives you its full API in Python, C++, Java, C# and more. The browser needs nothing at all.</p>
                  <p className="muted">Only one program can hold the serial port at a time. Close the others first.</p>
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
                  <h3>Check all 32 traces</h3>
                  <p>With the cap on and the person still, every channel should be a gentle line that wanders by a few microvolts. Look at each one before you record.</p>
                </div>
                <table className="ports diag">
                  <tbody>
                    <tr>
                      <td>Flat line</td>
                      <td>No skin contact. Add gel, reseat the electrode</td>
                    </tr>
                    <tr>
                      <td>Pinned to the edge</td>
                      <td>Usually a bad reference. Check the REF clip</td>
                    </tr>
                    <tr>
                      <td>Thick fuzzy band</td>
                      <td>Mains hum. Is the laptop charger still in?</td>
                    </tr>
                    <tr>
                      <td>All channels identical</td>
                      <td>Reference or bias problem</td>
                    </tr>
                    <tr>
                      <td>Two channels identical</td>
                      <td>Gel bridge between neighbours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ol>
        </section>
        <section className="safety-band" id="safety">
          <h2>Before you put it on anyone</h2>
          <ul>
            <li>IronBCI-32 is not a medical device and isn’t certified by any regulator. It’s for education, research and engineering, never for diagnosis or treatment.</li>
            <li>Power the board from a 5 V USB battery only, never from mains through USB or any other way.</li>
            <li>The laptop receiving the data must run on its battery, physically unplugged from the mains, for the whole session.</li>
            <li>Rinse the gel out of the hair and off the skin afterwards. Stop if the skin becomes irritated.</li>
            <li>Don’t use it with a pacemaker or other implanted device without asking a physician. Read the Liabilities page before use.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
