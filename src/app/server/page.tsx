import { Metadata } from "next";
import ServerHero from "@/components/server/ServerHero";
import ServerBench from "@/components/server/ServerBench";
import ServerApiAndDevices from "@/components/server/ServerApiAndDevices";
import ServerEcosystem from "@/components/server/ServerEcosystem";

export const metadata: Metadata = {
  title: "PiEEG Server - Self-Hosted Biosignal Streaming",
  description:
    "pip install pieeg-server. Stream EEG, EMG, ECG, and EOG at 250-500 Hz as JSON over WebSocket :1616, with a React dashboard on :1617. SPI, BLE, and USB serial. MIT licensed.",
};

export default function ServerPage() {
  return (
    <main className="flex-1">
      <ServerHero />
      <ServerBench />
      <ServerApiAndDevices />
      <ServerEcosystem />
    </main>
  );
}
