/**
 * IronBCI-32 technical documentation panel: third column of the store hero.
 * PDFs and the ZIP are plain files in public/docs/ironbci-32/.
 * To update a document, replace the file there and adjust its size / pages below.
 */

import "./ironbci32-docs.css";

const DIR = "/docs/ironbci-32";

const DOCS = [
  { file: "IRB32-DS-001_IronBCI-32_Product_Datasheet.pdf", name: "IronBCI-32 Product Datasheet", size: "457.22 kB", pages: 4, code: "IRB32-DS-001" },
  { file: "IRB32-MD-002_IronBCI-32_Mechanical_Dimensional_Drawing.pdf", name: "IronBCI-32 Mechanical & Dimensional Drawing", size: "344.53 kB", pages: 3, code: "IRB32-MD-002" },
  { file: "IRB32-PCB-003_IronBCI-32_PCB_Technical_Information.pdf", name: "IronBCI-32 PCB Technical Information", size: "2.67 MB", pages: 5, code: "IRB32-PCB-003" },
  { file: "IRB32-PIN-004_IronBCI-32_Connector_Pinout_Electrode_Guide.pdf", name: "IronBCI-32 Connector Pinout & Electrode Guide", size: "827.01 kB", pages: 4, code: "IRB32-PIN-004" },
  { file: "IRB32-QSG-005_IronBCI-32_Quick_Start_Safety_Guide.pdf", name: "IronBCI-32 Quick Start & Safety Guide", size: "435.70 kB", pages: 4, code: "IRB32-QSG-005" },
  { file: "IRB32-SW-006_IronBCI-32_Data_Interface_Software_Guide.pdf", name: "IronBCI-32 Data Interface & Software Guide", size: "2.03 MB", pages: 5, code: "IRB32-SW-006" },
];

const ZIP = { file: "IronBCI-32_Documentation_Set.zip", size: "5.46 MB" };

// "Request Information" opens an email to PiEEG with the subject and a short template filled in.
const REQUEST_MAILTO = `mailto:pieeg@pieeg.com?subject=${encodeURIComponent("IronBCI-32 information request")}&body=${encodeURIComponent(
  "Hi PiEEG team,\n\nI would like more information about IronBCI-32.\n\nName:\nUniversity / company:\nCountry:\nQuantity:\nMy question:\n"
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

export default function IronBCI32Docs() {
  const ds = DOCS[0];
  return (
    <aside className="ib-docs" aria-label="IronBCI-32 technical documentation">
      <div className="ib-card">
        <div className="ib-bar">
          <span className="ib-bar-ic">
            <DownloadIcon />
          </span>
          <span className="ib-bar-t">Featured Download</span>
        </div>
        <div className="ib-body ib-featured">
          <DocLink file={ds.file} name="IronBCI-32 Datasheet" meta={`PDF | ${ds.size}`} />
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
          <p className="ib-note">Rev. A · November 2026 · Free download, no sign-up</p>
        </div>
      </div>

      <div className="ib-learn">
        <h3>Learn More</h3>
        <p>
          Whether you need more technical detail, an institutional quote or help choosing caps and electrodes, we are here to
          help.
        </p>
        <a className="ib-btn" href={REQUEST_MAILTO}>
          Request Information
        </a>
        <p className="ib-mail">
          or write to <a href="mailto:pieeg@pieeg.com">pieeg@pieeg.com</a> · <a href="/contact">Contact page</a>
        </p>
        <a className="ib-link" href="https://docs.pieeg.com/hardware/devices/ironbci-32/" target="_blank" rel="noopener">
          Online docs · docs.pieeg.com →
        </a>
      </div>
    </aside>
  );
}
