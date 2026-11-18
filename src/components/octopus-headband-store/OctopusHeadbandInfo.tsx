/**
 * Octopus Headband info panel: third column of the store hero (/store/octopus-headband).
 * Uses the shared PiEEG documentation-panel styles.
 */

import Link from "next/link";
import "../octopus16-store/octopus16-docs.css";

const FEATURES = [
  { t: "Powered by Octopus 16", d: "The real 16-channel dry-electrode Octopus board inside" },
  { t: "1000 mAh battery", d: "Rechargeable pack on the band, USB-C connection" },
  { t: "Open data protocol", d: "Every byte documented — read the data in any language" },
  { t: "App constructor", d: "Build and adapt your own BCI app without starting from zero" },
  { t: "PiEEG server ready", d: "Play games or VR with your brain signals" },
  { t: "Easy positioning", d: "Move the module to a new spot on the head in seconds" },
  { t: "Up to 48 channels", d: "Scale from 16 to 48 channels" },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#533192" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: 2 }}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function OctopusHeadbandInfo() {
  return (
    <aside className="ib-docs" aria-label="Octopus Headband overview">
      <div className="ib-card ib-card-docs">
        <div className="ib-bar">
          <span className="ib-bar-ic">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <span className="ib-bar-t">What&apos;s Coming</span>
        </div>
        <div className="ib-body">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {FEATURES.map((f) => (
              <li key={f.t} style={{ display: "flex", gap: 10 }}>
                <Check />
                <span>
                  <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: "#1d1630" }}>{f.t}</span>
                  <span style={{ display: "block", fontSize: 12.5, color: "#6b6580", lineHeight: 1.45 }}>{f.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="ib-note">Open source · In development · Specifications may change</p>
        </div>
      </div>

      <div className="ib-learn">
        <h3>Learn More</h3>
        <p>
          Octopus Headband is in development. Sign up if you&apos;re interested, or write to us about research, games or
          VR projects.
        </p>
        <a className="ib-btn" href="#subscribe">
          I&apos;m interested
        </a>
        <p className="ib-mail">
          <a href="mailto:pieeg@pieeg.com?subject=Octopus%20Headband">pieeg@pieeg.com</a>
        </p>
        <Link className="ib-link" href="/store/octopus-16">
          Available now: Octopus 16 →
        </Link>
      </div>
    </aside>
  );
}
