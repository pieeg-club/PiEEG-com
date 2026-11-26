/**
 * EasyEXG technical documentation panel: third column of the store hero.
 * PDFs and the ZIP are plain files in public/docs/easyexg/.
 * To update a document, replace the file there and adjust its size / pages below.
 */

import "./easyexg-docs.css";

const DIR = "/docs/easyexg";

const DOCS = [
  { file: "EXG-DS-001_EasyEXG_Product_Datasheet.pdf", name: "EasyEXG Product Datasheet", size: "1.23 MB", pages: 3, code: "EXG-DS-001" },
  { file: "EXG-MD-002_EasyEXG_Mechanical_Dimensional_Drawing.pdf", name: "EasyEXG Mechanical & Dimensional Drawing", size: "105.86 kB", pages: 2, code: "EXG-MD-002" },
  { file: "EXG-PCB-003_EasyEXG_PCB_Technical_Information.pdf", name: "EasyEXG PCB Technical Information & BOM", size: "620.66 kB", pages: 2, code: "EXG-PCB-003" },
  { file: "EXG-PIN-004_EasyEXG_Connections_Electrode_Guide.pdf", name: "EasyEXG Connections & Electrode Guide", size: "1.11 MB", pages: 3, code: "EXG-PIN-004" },
  { file: "EXG-QSG-005_EasyEXG_Quick_Start_Safety_Troubleshooting.pdf", name: "EasyEXG Quick Start, Safety & Troubleshooting", size: "404.22 kB", pages: 3, code: "EXG-QSG-005" },
  { file: "EXG-SW-006_EasyEXG_Software_Guide.pdf", name: "EasyEXG Software Guide", size: "384.09 kB", pages: 3, code: "EXG-SW-006" },
];

const ZIP = { file: "EasyEXG_Documentation_Set.zip", size: "3.31 MB" };

// "Request Information" opens an email to PiEEG with the subject and a short template filled in.
const REQUEST_MAILTO = `mailto:pieeg@pieeg.com?subject=${encodeURIComponent("EasyEXG information request")}&body=${encodeURIComponent(
  "Hi PiEEG team,\n\nI would like more information about EasyEXG.\n\nName:\nUniversity / company:\nCountry:\nQuantity:\nMy question:\n"
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

export default function EasyEXGDocs() {
  const ds = DOCS[0];
  return (
    <aside className="ib-docs" aria-label="EasyEXG technical documentation">
      <div className="ib-card">
        <div className="ib-bar">
          <span className="ib-bar-ic">
            <DownloadIcon />
          </span>
          <span className="ib-bar-t">Featured Download</span>
        </div>
        <div className="ib-body ib-featured">
          <DocLink file={ds.file} name="EasyEXG Datasheet" meta={`PDF | ${ds.size}`} />
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
          Need a classroom set, a quote for your lab, or help choosing electrodes and a microcontroller? We are here to help.
        </p>
        <a className="ib-btn" href={REQUEST_MAILTO}>
          Request Information
        </a>
        <p className="ib-mail">
          or write to <a href="mailto:pieeg@pieeg.com">pieeg@pieeg.com</a> · <a href="/contact">Contact page</a>
        </p>
        <a className="ib-link" href="https://docs.pieeg.com/hardware/devices/easy_exg/" target="_blank" rel="noopener">
          Online docs · docs.pieeg.com →
        </a>
        <a className="ib-link" href="https://github.com/pieeg-club/EasyEXG" target="_blank" rel="noopener">
          Schematic, Gerbers, STEP & code · GitHub →
        </a>
      </div>
    </aside>
  );
}
