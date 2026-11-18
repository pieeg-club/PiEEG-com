/**
 * IronBCI-128 preliminary documentation panel: third column of the store hero (/store/ironbci-128).
 * PDFs and the ZIP are plain files in public/docs/ironbci-128/.
 * To update a document, replace the file there and adjust its size / pages below.
 */

import Link from "next/link";
import "../octopus16-store/octopus16-docs.css";

const DIR = "/docs/ironbci-128";

const DOCS = [
  { file: "IRB128-DS-001_IronBCI-128_Preliminary_Product_Datasheet.pdf", name: "IronBCI-128 Preliminary Datasheet", size: "770.83 kB", pages: 2, code: "IRB128-DS-001" },
  { file: "IRB128-MD-002_IronBCI-128_Mechanical_Dimensional_Drawing.pdf", name: "IronBCI-128 Mechanical & Dimensional Drawing", size: "106.68 kB", pages: 2, code: "IRB128-MD-002" },
  { file: "IRB128-PCB-003_IronBCI-128_PCB_Technical_Information.pdf", name: "IronBCI-128 PCB Technical Information", size: "1.61 MB", pages: 3, code: "IRB128-PCB-003" },
];

const ZIP = { file: "IronBCI-128_Preliminary_Documentation_Set.zip", size: "2.01 MB" };

// "Request Information" opens an email to PiEEG with the subject and a short template filled in.
const REQUEST_MAILTO = `mailto:pieeg@pieeg.com?subject=${encodeURIComponent("IronBCI-128 information request")}&body=${encodeURIComponent(
  "Hi PiEEG team,\n\nI would like more information about IronBCI-128.\n\nName:\nUniversity / company:\nCountry:\nPlanned quantity:\nMy question:\n"
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

export default function IronBCI128Docs() {
  const ds = DOCS[0];
  return (
    <aside className="ib-docs" aria-label="IronBCI-128 preliminary documentation">
      <div className="ib-card">
        <div className="ib-bar">
          <span className="ib-bar-ic">
            <DownloadIcon />
          </span>
          <span className="ib-bar-t">Featured Download</span>
        </div>
        <div className="ib-body ib-featured">
          <DocLink file={ds.file} name="IronBCI-128 Preliminary Datasheet" meta={`PDF | ${ds.size}`} />
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
          <span className="ib-bar-t">Preliminary Documentation</span>
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
          <p className="ib-note">Rev. P1 (preliminary) · November 2026 · Specifications may change</p>
        </div>
      </div>

      <div className="ib-learn">
        <h3>Learn More</h3>
        <p>
          IronBCI-128 is in development. Subscribe for launch news, or write to us about research projects and planned
          quantities.
        </p>
        <a className="ib-btn" href="#subscribe">
          Subscribe for IronBCI-128
        </a>
        <p className="ib-mail">
          <a href={REQUEST_MAILTO}>Request information</a> · <a href="mailto:pieeg@pieeg.com">pieeg@pieeg.com</a>
        </p>
        <Link className="ib-link" href="/store/ironbci-32">
          Available now: IronBCI-32 →
        </Link>
      </div>
    </aside>
  );
}
