import { Metadata } from "next";
import OctopusMakerProjects from "./OctopusMakerProjects";

export const metadata: Metadata = {
  title: "Octopus 16 Maker Projects | PiEEG Community",
  description:
    "Five makers got an Octopus 16 brain-computer interface. Meet them, read their ideas, follow their progress and like your favourite project.",
  openGraph: {
    title: "Octopus 16 Maker Projects | PiEEG",
    description:
      "Five makers got an Octopus 16 brain-computer interface. Meet them, read their ideas, follow their progress and like your favourite project.",
    images: [
      {
        url: "/community/octopus-challenge/octopus-overview.jpg",
        width: 1063,
        height: 1038,
        alt: "PiEEG Octopus 16 — 16-channel wireless EEG",
      },
    ],
  },
};

export default function CommunityPage() {
  return (
    <main className="flex-1">
      <OctopusMakerProjects />
    </main>
  );
}

