import { Metadata } from "next";
import OctopusMakerProjects from "./OctopusMakerProjects";

export const metadata: Metadata = {
  title: "Octopus 16 Maker Challenge Winners | PiEEG Community",
  description:
    "Meet the five builders who won an Octopus 16 BCI grant. Explore their brain-computer interface projects, cheer them on, and apply to be featured next.",
  openGraph: {
    title: "Octopus 16 Maker Challenge Winners | PiEEG Community",
    description:
      "Meet the five builders who won an Octopus 16 BCI grant. Explore their brain-computer interface projects, cheer them on, and apply to be featured next.",
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

