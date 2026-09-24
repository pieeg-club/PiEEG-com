export const THINGIVERSE_DESIGNS = "https://www.thingiverse.com/PiEEG/designs";

export type EnclosureLink = {
  href: string;
  label: string;
};

/** Printable cases that match a product. Not a file download — a Thingiverse page. */
export const productEnclosures: Record<string, EnclosureLink[]> = {
  pieeg: [
    { href: "https://www.thingiverse.com/thing:7377540", label: "3D enclosure" },
  ],
  ironbci: [
    { href: "https://www.thingiverse.com/thing:7375230", label: "3D enclosure" },
    { href: "https://www.thingiverse.com/thing:7377545", label: "3D headset" },
    { href: "https://www.thingiverse.com/thing:7407637", label: "Aura VR case" },
  ],
  "ironbci-32": [
    { href: "https://www.thingiverse.com/thing:7387334", label: "3D enclosure" },
  ],
  ardeeg: [
    { href: "https://www.thingiverse.com/thing:7403768", label: "3D enclosure" },
  ],
  "octopus-16": [
    { href: "https://www.thingiverse.com/thing:7386761", label: "3D enclosure" },
  ],
};

export function enclosuresFor(productId: string): EnclosureLink[] {
  return productEnclosures[productId] ?? [];
}
