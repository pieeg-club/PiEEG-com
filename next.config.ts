import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  
  // SEO-critical redirects from old WordPress site to new Next.js structure
  async redirects() {
    return [
      // Main navigation pages
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/embed/index.html", destination: "/", permanent: true },
      { source: "/index.html@p=38", destination: "/about", permanent: true },
      { source: "/index.html@p=38.html", destination: "/about", permanent: true },
      { source: "/index.html@p=385", destination: "/examples", permanent: true },
      { source: "/index.html@p=385.html", destination: "/examples", permanent: true },
      { source: "/index.html@p=1375", destination: "/partnership", permanent: true },
      { source: "/index.html@p=1375.html", destination: "/partnership", permanent: true },
      { source: "/index.html@p=47", destination: "/job", permanent: true },
      { source: "/index.html@p=47.html", destination: "/job", permanent: true },
      { source: "/liability/index.html", destination: "/liability", permanent: true },
      { source: "/liability-pieeg/index.html", destination: "/liability", permanent: true },
      { source: "/index.html@p=54", destination: "/news", permanent: true },
      { source: "/index.html@p=54.html", destination: "/news", permanent: true },
      { source: "/index.html@p=74", destination: "/products", permanent: true },
      { source: "/index.html@p=74.html", destination: "/products", permanent: true },
      { source: "/pieeg-shop/index.html", destination: "/products", permanent: true },
      { source: "/index.html@p=928", destination: "/docs", permanent: true },
      { source: "/index.html@p=928.html", destination: "/docs", permanent: true },
      
      // Product pages
      { source: "/pieeg/index.html", destination: "/products/pieeg", permanent: true },
      { source: "/pieeg/", destination: "/products/pieeg", permanent: true },
      { source: "/index.html@p=76", destination: "/products/pieeg", permanent: true },
      { source: "/index.html@p=76.html", destination: "/products/pieeg", permanent: true },
      
      { source: "/pieeg-16/index.html", destination: "/products/pieeg-16", permanent: true },
      { source: "/pieeg-16/", destination: "/products/pieeg-16", permanent: true },
      { source: "/index.html@p=492", destination: "/products/pieeg-16", permanent: true },
      { source: "/index.html@p=492.html", destination: "/products/pieeg-16", permanent: true },
      
      { source: "/ironbci/index.html", destination: "/products/ironbci", permanent: true },
      { source: "/ironbci/", destination: "/products/ironbci", permanent: true },
      { source: "/index.html@p=1073", destination: "/products/ironbci", permanent: true },
      { source: "/index.html@p=1073.html", destination: "/products/ironbci", permanent: true },
      
      { source: "/ironbci-32/index.html", destination: "/products/ironbci-32", permanent: true },
      { source: "/ironbci-32/", destination: "/products/ironbci-32", permanent: true },
      { source: "/index.html@p=1403", destination: "/products/ironbci-32", permanent: true },
      { source: "/index.html@p=1403.html", destination: "/products/ironbci-32", permanent: true },
      
      { source: "/ardeeg/index.html", destination: "/products/ardeeg", permanent: true },
      { source: "/ardeeg/", destination: "/products/ardeeg", permanent: true },
      
      { source: "/jneeg/index.html", destination: "/products/jneeg", permanent: true },
      { source: "/jneeg/", destination: "/products/jneeg", permanent: true },
      
      { source: "/microbci/index.html", destination: "/products/microbci", permanent: true },
      { source: "/microbci/", destination: "/products/microbci", permanent: true },
      { source: "/index.html@p=1232", destination: "/products/microbci", permanent: true },
      { source: "/index.html@p=1232.html", destination: "/products/microbci", permanent: true },
      
      // Accessories
      { source: "/cap-eeg-kit/", destination: "/products", permanent: true },
      { source: "/cap-eeg-kit-8-channels-with-wet-electrodes/", destination: "/products", permanent: true },
      { source: "/conductive-gel-for-eeg/", destination: "/products", permanent: true },
      { source: "/low-cost-16-channels-eeg-cap/", destination: "/products", permanent: true },
      
      // News articles
      { source: "/news/ironbci-eeg-device/", destination: "/news/ironbci-launch", permanent: true },
      { source: "/news/pieeg-16-is-availabe-in-the-market/", destination: "/news/pieeg-16-launch", permanent: true },
      { source: "/news/low-cost-32-channels-brain-computer-interface-ironbci/", destination: "/news/ironbci-32-launch", permanent: true },
      
      // Contact
      { source: "/contact-to-pieeg/", destination: "/contact", permanent: true },
      
      // Old docs redirects
      { source: "/docs/index.html", destination: "/docs", permanent: true },
      { source: "/docs/docs/index.html", destination: "/docs", permanent: true },
      { source: "/hardware/index.html", destination: "/docs", permanent: true },
    ];
  },
};

export default nextConfig;
