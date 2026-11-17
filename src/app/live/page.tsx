import { Metadata } from "next";
import { CommunitySubNav } from "@/app/community/CommunitySubNav";
import LivePageClient from "./LivePageClient";

export const metadata: Metadata = {
  title: "PiEEG Monthly Live — Neurotech & Biotech Stream | PiEEG",
  description:
    "PiEEG Monthly Live: one stream a month with the latest PiEEG updates in AI agents, hardware, software, signal processing and neuroscience. Come and ask us anything. Last Monday of every month, 2 PM London.",
  alternates: {
    canonical: "https://pieeg.com/live",
  },
  openGraph: {
    title: "PiEEG Monthly Live — Neurotech & Biotech Stream",
    description:
      "Once a month we go live with everything new at PiEEG: AI agents, hardware, software, signal processing, and neuroscience. Last Monday of every month, 2 PM London.",
    url: "https://pieeg.com/live",
    type: "website",
    images: [
      {
        url: "/live/community.jpg",
        width: 1418,
        height: 504,
        alt: "PiEEG community members building together at a hackathon",
      },
    ],
  },
};

export default function LivePage() {
  return (
    <main className="flex-1 flex flex-col">
      <CommunitySubNav />
      <LivePageClient />
    </main>
  );
}
