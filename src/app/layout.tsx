import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PiEEG \u2014 Open-Source Brain-Computer Interface",
  description:
    "PiEEG turns a Raspberry Pi, Arduino, or Jetson Nano into a biosignal acquisition platform for EEG, EMG, ECG, and EOG. Open-source, low-cost, Python-first.",
  openGraph: {
    title: "PiEEG \u2014 Open-Source Brain-Computer Interface",
    description: "Measure the human nervous system. With Python.",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
