import { Metadata } from "next";
import XrHero from "@/components/xr/XrHero";
import XrBench from "@/components/xr/XrBench";
import XrConnectionRoutes from "@/components/xr/XrConnectionRoutes";
import XrHardwareAndDemos from "@/components/xr/XrHardwareAndDemos";

export const metadata: Metadata = {
  title: "PiEEG XR - Neural Face Interface for Spatial Computing",
  description:
    "Silicone facial gasket with 10 dry Ag/AgCl electrodes (8 active + REF + BIAS; +8 occipital on XR-16) and a strap-mounted 24-bit ADS1299 / STM32WB BLE 5 box. Stream frontal EEG, EOG blinks, and facial EMG into PiEEG Cloud, pieeg-server, VRChat OSC, and WebXR.",
};

export default function XRPage() {
  return (
    <main className="flex-1">
      <XrHero />
      <XrBench />
      <XrConnectionRoutes />
      <XrHardwareAndDemos />
    </main>
  );
}
