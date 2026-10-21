'use client';

// OctoBio Kit product page (drop-in). Works with the App Router and the Pages Router.
import { useEffect, useRef } from 'react';
import { octobioGuideHtml } from './octobioGuideHtml';
import { octobioGuideCss } from './octobioGuideCss';
import { initOctobioGuide } from './initOctobioGuide';

// showOwnHeader={false} hides the page's built-in PiEEG top bar + breadcrumb
// (use it if your site layout already has a header).
export default function OctoBioGuide({ showOwnHeader = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const cleanup = initOctobioGuide(root);
    return () => {
      cleanup();
      // reset the markup so a re-mount starts clean
      if (root) root.innerHTML = octobioGuideHtml;
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: octobioGuideCss }} />
      {!showOwnHeader && (
        <style>{'#octobio-guide header.top,#octobio-guide .breadcrumb{display:none}'}</style>
      )}
      <div id="octobio-guide" ref={ref} dangerouslySetInnerHTML={{ __html: octobioGuideHtml }} />
    </>
  );
}
