import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "private-user-images.githubusercontent.com",
      },
    ],
  },
  
  // SEO-critical redirects from old WordPress site to new Next.js structure
  async redirects() {
    return [
      // ── Home ────────────────────────────────────────────────────────────────
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/embed/index.html", destination: "/", permanent: true },

      // ── Main navigation pages ────────────────────────────────────────────────
      { source: "/contact-to-pieeg", destination: "/contact", permanent: true },
      { source: "/contact-to-pieeg/index.html", destination: "/contact", permanent: true },
      { source: "/index.html@p=38", destination: "/contact", permanent: true },
      { source: "/index.html@p=38.html", destination: "/contact", permanent: true },

      { source: "/case", destination: "/examples", permanent: true },
      { source: "/index.html@p=385", destination: "/examples", permanent: true },
      { source: "/index.html@p=385.html", destination: "/examples", permanent: true },

      { source: "/partners", destination: "/partnership", permanent: true },
      { source: "/partners/index.html", destination: "/partnership", permanent: true },
      { source: "/index.html@p=1375", destination: "/partnership", permanent: true },
      { source: "/index.html@p=1375.html", destination: "/partnership", permanent: true },

      { source: "/engineer-for-biodata-signal-processing", destination: "/job", permanent: true },
      { source: "/engineer-for-biodata-signal-processing/index.html", destination: "/job", permanent: true },
      { source: "/index.html@p=47", destination: "/job", permanent: true },
      { source: "/index.html@p=47.html", destination: "/job", permanent: true },

      { source: "/liability-pieeg", destination: "/liability", permanent: true },
      { source: "/liability-pieeg/index.html", destination: "/liability", permanent: true },
      { source: "/liability/index.html", destination: "/liability", permanent: true },

      { source: "/news-bci-neuroscience", destination: "/news", permanent: true },
      { source: "/news-bci-neuroscience", destination: "/news", permanent: true },
      { source: "/news-bci-neuroscience/index.html", destination: "/news", permanent: true },
      { source: "/index.html@p=54", destination: "/news", permanent: true },
      { source: "/index.html@p=54.html", destination: "/news", permanent: true },

      { source: "/pieeg-shop", destination: "/hardware", permanent: true },
      { source: "/pieeg-shop", destination: "/hardware", permanent: true },
      { source: "/pieeg-shop/index.html", destination: "/hardware", permanent: true },      { source: "/products", destination: "/hardware", permanent: true },
      { source: "/products", destination: "/hardware", permanent: true },      { source: "/index.html@p=74", destination: "/hardware", permanent: true },
      { source: "/index.html@p=74.html", destination: "/hardware", permanent: true },

      { source: "/links", destination: "/community", permanent: true },
      { source: "/links/index.html", destination: "/community", permanent: true },
      { source: "/software", destination: "/server", permanent: true },

      { source: "/signal-processing-with-python-for-neuroscience-practical-course", destination: "/server", permanent: true },
      { source: "/google-colab-page", destination: "/server", permanent: true },
      { source: "/google-colab-page/index.html", destination: "/server", permanent: true },
      { source: "/books", destination: "/server", permanent: true },
      { source: "/books/index.html", destination: "/server", permanent: true },

      { source: "/index.html@p=928", destination: "/docs", permanent: true },
      { source: "/index.html@p=928.html", destination: "/docs", permanent: true },

      // ── Hardware sub-sections (old WordPress CPT) ───────────────────────────
      { source: "/hardware/index.html", destination: "/hardware", permanent: true },
      { source: "/hardware/cases", destination: "/examples", permanent: true },
      { source: "/hardware/cases/index.html", destination: "/examples", permanent: true },
      { source: "/hardware/collobarations", destination: "/partnership", permanent: true },
      { source: "/hardware/collobarations/index.html", destination: "/partnership", permanent: true },
      { source: "/hardware/software-for-eeg", destination: "/server", permanent: true },
      { source: "/hardware/software-for-eeg", destination: "/server", permanent: true },
      { source: "/hardware/software-for-eeg/index.html", destination: "/server", permanent: true },
      { source: "/hardware/eeg_courses", destination: "/server", permanent: true },
      { source: "/hardware/eeg_courses/index.html", destination: "/server", permanent: true },
      { source: "/hardware/innovations", destination: "/about", permanent: true },
      { source: "/hardware/innovations/index.html", destination: "/about", permanent: true },
      { source: "/hardware/plans", destination: "/about", permanent: true },
      { source: "/hardware/plans/index.html", destination: "/about", permanent: true },

      // ── Product pages ────────────────────────────────────────────────────────
      { source: "/pieeg", destination: "/hardware/pieeg", permanent: true },
      { source: "/pieeg/index.html", destination: "/hardware/pieeg", permanent: true },
      { source: "/pieeg-kit", destination: "/hardware/pieeg", permanent: true },
      { source: "/pieeg-kit/index.html", destination: "/hardware/pieeg", permanent: true },
      { source: "/index.html@p=76", destination: "/hardware/pieeg", permanent: true },
      { source: "/index.html@p=76.html", destination: "/hardware/pieeg", permanent: true },

      { source: "/pieeg-16", destination: "/hardware/pieeg-16", permanent: true },
      { source: "/pieeg-16/index.html", destination: "/hardware/pieeg-16", permanent: true },
      { source: "/index.html@p=492", destination: "/hardware/pieeg-16", permanent: true },
      { source: "/index.html@p=492.html", destination: "/hardware/pieeg-16", permanent: true },

      { source: "/ironbci", destination: "/hardware/ironbci", permanent: true },
      { source: "/ironbci/index.html", destination: "/hardware/ironbci", permanent: true },
      { source: "/index.html@p=1073", destination: "/hardware/ironbci", permanent: true },
      { source: "/index.html@p=1073.html", destination: "/hardware/ironbci", permanent: true },

      { source: "/ironbci-32", destination: "/hardware/ironbci-32", permanent: true },
      { source: "/ironbci-32/index.html", destination: "/hardware/ironbci-32", permanent: true },
      { source: "/index.html@p=1403", destination: "/hardware/ironbci-32", permanent: true },
      { source: "/index.html@p=1403.html", destination: "/hardware/ironbci-32", permanent: true },

      { source: "/ardeeg", destination: "/hardware/ardeeg", permanent: true },
      { source: "/ardeeg/index.html", destination: "/hardware/ardeeg", permanent: true },

      { source: "/jneeg", destination: "/hardware/jneeg", permanent: true },
      { source: "/jneeg/index.html", destination: "/hardware/jneeg", permanent: true },

      { source: "/microbci", destination: "/hardware/microbci", permanent: true },
      { source: "/microbci/index.html", destination: "/hardware/microbci", permanent: true },
      { source: "/index.html@p=1232", destination: "/hardware/microbci", permanent: true },
      { source: "/index.html@p=1232.html", destination: "/hardware/microbci", permanent: true },

      // ── Accessories / caps ───────────────────────────────────────────────────
      { source: "/cap-eeg-kit", destination: "/hardware/8ch-dry-cap", permanent: true },
      { source: "/cap-eeg-kit/index.html", destination: "/hardware/8ch-dry-cap", permanent: true },
      { source: "/cap-eeg-kit-8-channels-with-wet-electrodes", destination: "/hardware/8ch-wet-cap", permanent: true },
      { source: "/cap-eeg-kit-8-channels-with-wet-electrodes/index.html", destination: "/hardware/8ch-wet-cap", permanent: true },
      { source: "/low-cost-16-channels-eeg-cap", destination: "/hardware/16ch-cap", permanent: true },
      { source: "/low-cost-16-channels-eeg-cap/index.html", destination: "/hardware/16ch-cap", permanent: true },
      { source: "/low-cost-cap-eeg-kit-32-channels-with-32-wet-electrodes-and-2-clips-electrode", destination: "/hardware", permanent: true },
      { source: "/conductive-gel-for-eeg", destination: "/hardware/conductive-gel", permanent: true },
      { source: "/conductive-gel-for-eeg/index.html", destination: "/hardware/conductive-gel", permanent: true },
      { source: "/kit-to-measure-emg-ecg-ekg", destination: "/hardware/emg-kit", permanent: true },
      { source: "/kit-to-measure-emg-ecg-ekg/index.html", destination: "/hardware/emg-kit", permanent: true },

      // ── News articles — matched to new slugs ────────────────────────────────
      { source: "/news/free-3d-design-for-headset-for-measuring-eeg-for-ironbci-users", destination: "/news/3d-printable-headset", permanent: true },
      { source: "/news/instruction-how-to-use-machine-learning-to-stress-or-emoinal-control-via-eeg-2", destination: "/news/deep-learning-keras-tutorial", permanent: true },
      { source: "/news/pieeg-in-discord", destination: "/news/discord-community-milestone", permanent: true },
      { source: "/news/low-cost-32-channels-brain-computer-interface-ironbci", destination: "/news/ironbci-32-professional", permanent: true },
      { source: "/news/ironbci-eeg-device", destination: "/news/ironbci-launch", permanent: true },
      { source: "/news/measure-eeg-with-stm32", destination: "/news/microbci-stm32-launch", permanent: true },
      { source: "/news/free-course-for-pieeg-users-signal-processing-python-for-neuroscience-practical-course", destination: "/news/ml-eeg-python-course", permanent: true },
      { source: "/news/openclaw-connected-to-the-brain-to-read-eeg-with-pieeg", destination: "/news/openclaw-brain-control", permanent: true },
      { source: "/news/new-software-for-pieeg-devices", destination: "/news/pieeg-software-update", permanent: true },

      // ── News articles — no matching new article, fall back to /news ──────────
      { source: "/news/how-measure-eeg-and-avoid-noise", destination: "/news", permanent: true },
      { source: "/news/measure-eeg-with-shield-ardeeg-for-arduino", destination: "/news", permanent: true },
      { source: "/news/pieeg-16-measure-16-eeg-channels-with-raspberry-pi", destination: "/news", permanent: true },
      { source: "/news/deep-learning-in-real-time-with-eeg-with-nvidia-jetson-nanonvidia-publication-in-arxiv", destination: "/news", permanent: true },
      { source: "/news/how-to-start-becoming-a-neuroscientist-with-pieeg", destination: "/news", permanent: true },
      { source: "/news/low-cost-open-source-active-electrode-to-measure-eeg", destination: "/news", permanent: true },
      { source: "/news/pieeg-16-is-availabe-in-the-market", destination: "/news", permanent: true },
      { source: "/news/datasets-for-eeg-2", destination: "/news", permanent: true },
      { source: "/news/low-cost-16-eeg-channels-cap-hat-available-for-buy-all-in-one", destination: "/news", permanent: true },
      { source: "/news/manual-diy-how-to-create-eeg-cap-for-measure-eeg-for-few-dollars", destination: "/news", permanent: true },
      { source: "/news/low-cost-brain-computer-interface-for-everyday-use-with-sdk-for-mobile-application", destination: "/news", permanent: true },
      { source: "/news/new-open-source-software-to-read-eeg-data-with-pieeg", destination: "/news", permanent: true },
      { source: "/news/call-for-vr-research", destination: "/news", permanent: true },
      { source: "/news/16-32-64-eeg-channels-with-jetson-nano-orin-and-dl", destination: "/news", permanent: true },
      { source: "/news/we-are-in-indiegogopieeg-kit-bioscience-lab-in-home-brain-muscles-heart", destination: "/news", permanent: true },
      { source: "/news/low-cost-24-channels-brain-computer-interface", destination: "/news", permanent: true },
      { source: "/news/instruction-how-to-use-machine-learning-to-stress-or-emoinal-control-via-eeg", destination: "/news", permanent: true },
      { source: "/news/how-to-programming-the-ads1299", destination: "/news", permanent: true },
      { source: "/news/brain-computer-interface-with-chat-chatgpt-in-real-time-with-pieeg", destination: "/news", permanent: true },
      { source: "/news/pieeg-32", destination: "/news", permanent: true },

      // ── Docs ─────────────────────────────────────────────────────────────────
      { source: "/docs", destination: "/support", permanent: true },
      { source: "/docs-2", destination: "/support", permanent: true },
      { source: "/docs/index.html", destination: "/support", permanent: true },
      { source: "/docs/docs", destination: "/support", permanent: true },
      { source: "/docs/docs/index.html", destination: "/support", permanent: true },
      { source: "/docs/docs/:path*", destination: "/support", permanent: true },
    ];
  },
};

export default nextConfig;
