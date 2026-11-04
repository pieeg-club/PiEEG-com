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
        url: "/community/octopus-challenge/headband.jpg",
        width: 1200,
        height: 630,
        alt: "Octopus 16 Maker Projects",
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

