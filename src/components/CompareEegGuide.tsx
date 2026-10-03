import fs from 'fs';
import path from 'path';
import CompareEegFilters from '@/components/CompareEegFilters';

export const COMPARE_EEG_SLUG = 'pieeg-vs-openbci-emotiv-muse';
const ROOT_ID = 'compare-eeg';
const PAGE_URL = `https://pieeg.com/guides/${COMPARE_EEG_SLUG}`;

function scopeCss(css: string) {
  const scoped = css
    .replace(/:root/g, ':scope')
    .replace(/\bhtml\b/g, ':scope')
    .replace(/\bbody\b/g, ':scope');
  return `@scope (.compare-eeg) {\n${scoped}\n}\nhtml:has(.compare-eeg) { scroll-behavior: smooth; }\n@media (prefers-reduced-motion: reduce) { html:has(.compare-eeg) { scroll-behavior: auto; } }`;
}

function loadComparePage() {
  const filePath = path.join(
    process.cwd(),
    'content/guides',
    `${COMPARE_EEG_SLUG}.html`,
  );
  const html = fs.readFileSync(filePath, 'utf8');
  const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? '';
  const jsonLd = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  const body =
    html.match(/<body>([\s\S]*?)<script>/)?.[1]?.trim() ?? '';

  return {
    css: scopeCss(css),
    jsonLd: jsonLd
      ?.replaceAll('https://pieeg.com/compare', PAGE_URL)
      .replace(/</g, '\\u003c'),
    body: body.replaceAll('https://pieeg.com/', '/'),
  };
}

export default function CompareEegGuide() {
  const page = loadComparePage();

  return (
    <div id={ROOT_ID} className="compare-eeg bg-white text-slate-700">
      {page.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: page.jsonLd }}
        />
      )}
      <style dangerouslySetInnerHTML={{ __html: page.css }} />
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
      <CompareEegFilters rootId={ROOT_ID} />
    </div>
  );
}
