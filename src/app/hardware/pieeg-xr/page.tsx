import { Metadata } from "next";
import XrProductView from "../_xr/XrProductView";
import { XR_ENCLOSURE } from "../_xr/media";

export const metadata: Metadata = {
  title: "PiEEG XR — Neural Face Interface for Spatial Computing | PiEEG",
  description:
    "Face-gasket neural interface for VR headsets. 8-channel facial EMG and EEG, 24-bit IronBCI front-end, BLE 5. Price coming soon on Kickstarter.",
  openGraph: {
    title: "PiEEG XR — Neural Face Interface",
    description:
      "Face-gasket neural interface for VR headsets. 8-channel facial EMG and EEG, 24-bit IronBCI front-end, BLE 5.",
    images: [
      { url: "/products/pieeg-xr.png", width: 1200, height: 630, alt: "PiEEG XR neural face interface" },
    ],
  },
};

export default function PiEEGXRProductPage() {
  return (
    <XrProductView
      productId="pieeg-xr"
      name="PiEEG XR"
      tagline="Neural face interface that snaps onto a VR headset"
      badge="Newest"
      badgeClassName="bg-violet-500/10 text-violet-400 border border-violet-500/20"
      channels="8 channels"
      platform="VR headset · BLE 5"
      signals="EEG · EMG"
      description={[
        "A replaceable face gasket with dry electrodes. It reads facial EMG and EEG while you are inside a headset. No face-tracking cameras. The analog path is IronBCI: 8 channels, 24-bit, 250 SPS, BLE 5.",
        "Mount replaces the stock gasket (four buckles). The board sits under the head strap and takes 5 V USB-C. The device advertises over Bluetooth as PiEEG XR.",
      ]}
      bullets={[
        "8 dry electrodes on the face mask",
        "IronBCI analog front-end, BLE 5 stream",
        "Focus-to-Action band-power API",
        "Avatar expression from facial EMG",
        "Open-source firmware and 3D model",
      ]}
      image="/products/pieeg-xr.png"
      imageAlt="PiEEG XR face gasket with eight dry electrodes, kit box, and VR headset"
      gallery={[
        {
          src: "/products/pieeg-xr.png",
          alt: "PiEEG XR gasket, electrodes facing up, beside a VR headset and kit box",
          label: "Gasket and kit",
        },
        {
          src: "/products/pieeg-xr-kit.jpg",
          alt: "PiEEG XR product shot with expression overlay",
          label: "Kit",
        },
        {
          src: "/products/pieeg-xr-poster.png",
          alt: "PiEEG XR poster: facial EMG driving avatar expressions",
          label: "Expression map",
        },
        {
          src: "/products/pieeg-xr-focus.png",
          alt: "Headset session with live focus and load readouts",
          label: "Live state",
        },
      ]}
      glowClassName="bg-gradient-to-br from-violet-500 to-cyan-600"
      ctaClassName="from-violet-500 to-cyan-600"
      enclosureLinks={[XR_ENCLOSURE]}
      sibling={{
        name: "PiEEG XR-16",
        href: "/hardware/xr-16",
        blurb: "Same face gasket plus eight sensors over the visual cortex. 16 channels total.",
      }}
    />
  );
}
