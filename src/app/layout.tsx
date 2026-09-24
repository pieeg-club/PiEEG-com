import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAgent } from "@/components/ChatAgent";
import HeroOctopusCard from "@/components/HeroOctopusCard";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Tech / futuristic display face used for the header wordmark & nav
const spaceGrotesk = Space_Grotesk({
  variable: "--font-tech",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PiEEG — Low-Cost Brain-Computer Interface Hardware for Research",
  description:
    "PiEEG offers affordable, research-grade BCI hardware for EEG, EMG, ECG, and EOG. High-quality biosignal acquisition on Raspberry Pi, Arduino, STM32, and more. For research purposes only.",
  openGraph: {
    title: "PiEEG — Low-Cost Brain-Computer Interface Hardware for Research",
    description: "High-quality, research-grade BCI hardware. Easy setup. For researchers and engineers.",
    siteName: "PiEEG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(t);e.style.colorScheme=t;}catch(_){}})();`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6E5NEF184J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6E5NEF184J');
            gtag('config', 'G-R2MG7QJ28E');
            gtag('config', 'AW-18467963184');

            if (!window.__pieegElecrowConversion) {
              window.__pieegElecrowConversion = true;
              document.addEventListener('click', function (event) {
                var node = event.target;
                if (!node || !node.closest) return;
                var link = node.closest('a[href*="elecrow.com"]');
                if (!link) return;
                var href = link.href;
                var newTab = link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1;
                var payload = {
                  send_to: 'AW-18467963184/NK-nCKfm5oIdELCCm-ZE',
                  transport_type: 'beacon'
                };
                if (newTab) {
                  gtag('event', 'conversion', payload);
                  return;
                }
                event.preventDefault();
                var done = false;
                var go = function () {
                  if (done) return;
                  done = true;
                  window.location.href = href;
                };
                gtag('event', 'conversion', Object.assign({ event_callback: go }, payload));
                setTimeout(go, 1000);
              });
            }
          `}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatAgent />
          <HeroOctopusCard />
        </ThemeProvider>
      </body>
    </html>
  );
}
