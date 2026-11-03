"use client";

import { useEffect, useRef } from "react";
import { mountWorldMap } from "./world-map-engine.js";
import "./world-map.css";

export default function WorldMap() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return mountWorldMap(root);
  }, []);

  return (
    <section
      id="worldwide"
      aria-label="PiEEG around the world"
      className="scroll-mt-20 pt-16 pb-6 px-4 bg-white dark:bg-zinc-950"
    >
      <div ref={rootRef} className="pieeg-map">
        <div>
          <div className="pm-switch" role="group" aria-label="Show map for">
            <button type="button" data-view="server" aria-pressed="true">PiEEG Server</button>
            <button type="button" data-view="hardware" aria-pressed="false">Hardware</button>
          </div>
          <h2 aria-live="polite" />
          <div className="pm-stats">
            <div className="pm-card"><div className="pm-num" data-count="countries">0</div><div className="pm-label">Countries</div></div>
            <div className="pm-card"><div className="pm-num" data-count="continents">0</div><div className="pm-label">Continents</div></div>
          </div>
        </div>
        <div className="pm-mapwrap">
          <div className="pm-tools">
            <div className="pm-seg" role="group" aria-label="Map style">
              <button type="button" data-proj="flat" aria-pressed="true">Map</button>
              <button type="button" data-proj="globe" aria-pressed="false">Globe</button>
            </div>
            <div className="pm-zoom" role="group" aria-label="Zoom">
              <button type="button" data-zoom="in" aria-label="Zoom in" title="Zoom in">+</button>
              <button type="button" data-zoom="out" aria-label="Zoom out" title="Zoom out">&minus;</button>
              <button type="button" data-zoom="reset" aria-label="Reset view" title="Reset view">&#8634;</button>
            </div>
          </div>
          <svg viewBox="0 0 960 500" role="img" aria-label="World map of countries with PiEEG users" />
          <div className="pm-tip" />
          <div className="pm-hint">Hold Ctrl (or &#8984;) and scroll to zoom</div>
          <div className="pm-foot">
            <div className="pm-help">Drag to move &middot; +/&minus; or Ctrl + scroll to zoom</div>
            <div className="pm-legend">
              Fewer
              <div className="pm-ramp">
                <span style={{ background: "var(--pm-t1)" }} />
                <span style={{ background: "var(--pm-t2)" }} />
                <span style={{ background: "var(--pm-t3)" }} />
                <span style={{ background: "var(--pm-t4)" }} />
              </div>
              More
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
