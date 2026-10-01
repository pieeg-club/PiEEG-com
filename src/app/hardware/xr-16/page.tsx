import { Metadata } from "next";
import XrProductView from "../_xr/XrProductView";

export const metadata: Metadata = {
  title: "PiEEG XR-16 — 16-Channel Neural Face Interface | PiEEG",
  description:
    "PiEEG XR face gasket plus eight visual-cortex sensors. 16-channel EEG and facial EMG, 24-bit, BLE 5. Price coming soon on Kickstarter.",
  openGraph: {
    title: "PiEEG XR-16 — 16-Channel Neural Face Interface",
    description:
      "PiEEG XR face gasket plus eight visual-cortex sensors. 16-channel EEG and facial EMG, 24-bit, BLE 5.",
    images: [{ url: "/products/xr-16.png", width: 1200, height: 630, alt: "PiEEG XR-16 neural face interface" }],
  },
};

export default function Xr16ProductPage() {
  return (
    <XrProductView
      productId="xr-16"
      name="PiEEG XR-16"
      tagline="Face interface plus eight visual-cortex sensors"
      badge="16-ch XR"
      badgeClassName="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
      channels="16 channels"
      platform="VR headset · BLE 5"
      signals="EEG · EMG"
      description={[
        "Everything in PiEEG XR, with eight extra electrodes over the visual cortex. 16 channels total. Same IronBCI conversion path: 24-bit, 250 SPS, BLE 5.",
        "Use it when occipital coverage matters: visual evoked work, higher spatial resolution around the headset, or any decode that needs both facial EMG and posterior EEG. Advertises as PiEEG XR-16.",
      ]}
      bullets={[
        "Face-mask electrodes plus +8 visual-cortex sensors",
        "16 channels, 24-bit, 250 SPS",
        "BLE 5 wireless stream",
        "Same gasket mount and USB-C power as PiEEG XR",
        "Open-source firmware",
      ]}
      image="/products/xr-16.png"
      imageAlt="PiEEG XR-16 face gasket, rear sensor layout, kit box, and VR headset"
      gallery={[
        {
          src: "/products/xr-16.png",
          alt: "PiEEG XR gasket rear view with sensor wells, kit box, and VR headset",
          label: "Sensor layout",
        },
        {
          src: "/products/pieeg-xr.png",
          alt: "Face-side electrodes on the XR gasket",
          label: "Face electrodes",
        },
        {
          src: "/products/pieeg-xr-kit.jpg",
          alt: "PiEEG XR kit with headset",
          label: "Kit",
        },
        {
          src: "/products/pieeg-xr-poster.png",
          alt: "PiEEG XR poster: facial EMG driving avatar expressions",
          label: "Expression map",
        },
      ]}
      glowClassName="bg-gradient-to-br from-cyan-500 to-blue-600"
      ctaClassName="from-cyan-500 to-blue-600"
      sibling={{
        name: "PiEEG XR",
        href: "/hardware/pieeg-xr",
        blurb: "8-channel face gasket without the extra visual-cortex sensors.",
      }}
    />
  );
}
