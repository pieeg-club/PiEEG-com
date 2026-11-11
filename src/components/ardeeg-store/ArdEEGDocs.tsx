/**
 * ardEEG technical documentation panel: third column of the store hero (/store/ardeeg).
 * PDFs and the ZIP are plain files in public/docs/ardeeg/.
 * To update a document, replace the file there and adjust its size / pages below.
 */

import "./ardeeg-docs.css";

const DIR = "/docs/ardeeg";
const GITHUB_URL = "https://github.com/pieeg-club/ardEEG";

const DOCS = [
  { file: "AE-DS-001_ardEEG_Product_Datasheet.pdf", name: "ardEEG Product Datasheet", size: "359.34 kB", pages: 3, code: "AE-DS-001" },
  { file: "AE-MD-002_ardEEG_Mechanical_Dimensional_Drawing.pdf", name: "ardEEG Mechanical & Dimensional Drawing", size: "311.17 kB", pages: 2, code: "AE-MD-002" },
  { file: "AE-PCB-003_ardEEG_PCB_Manufacturing_Specification.pdf", name: "ardEEG PCB & Manufacturing Specification", size: "189.64 kB", pages: 2, code: "AE-PCB-003" },
  { file: "AE-PIN-004_ardEEG_Connector_Pinout_Electrode_Guide.pdf", name: "ardEEG Connector Pinout & Electrode Guide", size: "286.96 kB", pages: 2, code: "AE-PIN-004" },
  { file: "AE-QSG-005_ardEEG_Quick_Start_Safety_Guide.pdf", name: "ardEEG Quick Start & Safety Guide", size: "254.24 kB", pages: 3, code: "AE-QSG-005" },
  { file: "AE-SW-006_ardEEG_Data_Interface_Software_Guide.pdf", name: "ardEEG Data Interface & Software Guide", size: "382.87 kB", pages: 3, code: "AE-SW-006" },
];

const ZIP = { file: "ardEEG_Documentation_Set.zip", size: "1.43 MB" };

// "Request Information" opens an email to PiEEG with the subject and a short template filled in.
const REQUEST_MAILTO = `mailto:pieeg@pieeg.com?subject=${encodeURIComponent("ardEEG information request")}&body=${encodeURIComponent(
  "Hi PiEEG team,\n\nI would like more information about ardEEG.\n\nName:\nUniversity / company:\nCountry:\nQuantity:\nMy question:\n"
)}`;

function DownloadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg className="ib-pdf" viewBox="0 0 24 28" aria-hidden="true">
      <path d="M3 1h12l6 6v19a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" fill="#fff" stroke="#c9c4d6" />
      <path d="M15 1v6h6" fill="#ece8f3" stroke="#c9c4d6" />
      <rect x="0" y="14" width="17" height="8" rx="1.5" fill="#d93025" />
      <text x="8.5" y="20.2" textAnchor="middle" fontSize="5.6" fontWeight="700" fill="#fff" fontFamily="Arial,sans-serif">
        PDF
      </text>
    </svg>
  );
}

function DocLink({ file, name, meta }: { file: string; name: string; meta: string }) {
  return (
    <a className="ib-doc" href={`${DIR}/${file}`} download target="_blank" rel="noopener">
      <PdfIcon />
      <span className="ib-doc-t">
        <span className="ib-doc-name">{name}</span>
        <span className="ib-doc-meta">{meta}</span>
      </span>
    </a>
  );
}

export default function ArdEEGDocs() {
  const ds = DOCS[0];
  return (
    <aside className="ib-docs" aria-label="ardEEG technical documentation">
      <div className="ib-card">
        <div className="ib-bar">
          <span className="ib-bar-ic">
            <DownloadIcon />
          </span>
          <span className="ib-bar-t">Featured Download</span>
        </div>
        <div className="ib-body ib-featured">
          <DocLink file={ds.file} name="ardEEG Datasheet" meta={`PDF | ${ds.size}`} />
        </div>
      </div>

      <div className="ib-card ib-card-docs">
        <div className="ib-bar">
          <span className="ib-bar-ic">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
              <path d="M14 3v5h5" />
              <path d="M8.5 13h7M8.5 17h5" />
            </svg>
          </span>
          <span className="ib-bar-t">Technical Documentation</span>
        </div>
        <div className="ib-body">
          <ul className="ib-list">
            {DOCS.map((d) => (
              <li key={d.code}>
                <DocLink file={d.file} name={d.name} meta={`PDF | ${d.size} · ${d.pages} pages · ${d.code}`} />
              </li>
            ))}
          </ul>
          <a className="ib-zip" href={`${DIR}/${ZIP.file}`} download>
            <DownloadIcon size={16} />
            <span>Download all {DOCS.length} documents</span>
            <span className="ib-zip-s">ZIP · {ZIP.size}</span>
          </a>
          <a className="ib-gh" href={GITHUB_URL} target="_blank" rel="noopener">
            <GitHubIcon />
            <span>Source code, 3D files &amp; examples</span>
            <span className="ib-gh-s">GitHub</span>
          </a>
          <p className="ib-note">Rev. A · November 2026 · Free download, no sign-up</p>
        </div>
      </div>

      <div className="ib-learn">
        <h3>Learn More</h3>
        <p>
          Whether you need more technical detail, a quote for a class or lab, or help choosing caps and electrodes, we are here
          to help.
        </p>
        <a className="ib-btn" href={REQUEST_MAILTO}>
          Request Information
        </a>
        <p className="ib-mail">
          or write to <a href="mailto:pieeg@pieeg.com">pieeg@pieeg.com</a> · <a href="/contact">Contact page</a>
        </p>
        <a className="ib-link" href="https://docs.pieeg.com/hardware/devices/ardeeg/" target="_blank" rel="noopener">
          Online docs · docs.pieeg.com →
        </a>
        <a className="ib-link" href={GITHUB_URL} target="_blank" rel="noopener">
          GitHub · github.com/pieeg-club/ardEEG →
        </a>
      </div>
    </aside>
  );
}
