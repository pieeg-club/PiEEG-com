"use client";

/**
 * Extra blocks for individual store pages (/store/[slug]):
 *   Docs  – technical documentation panel, shown as a third column in the hero
 *   Guide – interactive guide, shown after Technical Specifications
 *
 * To add a device: create its folder in src/components/<device>-store/ and add one line
 * below, keyed by the product slug from src/lib/store-catalog.ts. Each block is loaded
 * only on its own product page (next/dynamic), so other pages stay light.
 */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type StoreExtras = { Docs?: ComponentType; Guide?: ComponentType };

export const STORE_EXTRAS: Record<string, StoreExtras> = {
  "ironbci-32": {
    Docs: dynamic(() => import("@/components/ironbci-32-store/IronBCI32Docs")),
    Guide: dynamic(() => import("@/components/ironbci-32-store/IronBCI32StoreGuide")),
  },
  pieeg: {
    Docs: dynamic(() => import("@/components/pieeg8-store/PiEEG8Docs")),
    Guide: dynamic(() => import("@/components/pieeg8-store/PiEEG8StoreGuide")),
  },
  "pieeg-16": {
    Docs: dynamic(() => import("@/components/pieeg16-store/PiEEG16Docs")),
    Guide: dynamic(() => import("@/components/pieeg16-store/PiEEG16StoreGuide")),
  },
  "octopus-16": {
    Docs: dynamic(() => import("@/components/octopus16-store/Octopus16Docs")),
    Guide: dynamic(() => import("@/components/octopus16-store/Octopus16StoreGuide")),
  },
  ironbci: {
    Docs: dynamic(() => import("@/components/ironbci8-store/IronBCIDocs")),
    Guide: dynamic(() => import("@/components/ironbci8-store/IronBCIStoreGuide")),
  },
  "pieeg-xr": {
    Docs: dynamic(() => import("@/components/pieegxr-store/PieegXRDocs")),
    Guide: dynamic(() => import("@/components/pieegxr-store/PieegXRStoreGuide")),
  },
  ardeeg: {
    Docs: dynamic(() => import("@/components/ardeeg-store/ArdEEGDocs")),
    Guide: dynamic(() => import("@/components/ardeeg-store/ArdEEGStoreGuide")),
  },
  // JNEEG has no interactive guide yet: documentation panel only.
  jneeg: {
    Docs: dynamic(() => import("@/components/jneeg-store/JNEEGDocs")),
  },
  // MicroBCI has no interactive guide yet: documentation panel only.
  microbci: {
    Docs: dynamic(() => import("@/components/microbci-store/MicroBCIDocs")),
  },
  "octobio-kit": {
    Docs: dynamic(() => import("@/components/octobio-store/OctoBioDocs")),
    Guide: dynamic(() => import("@/components/octobio-store/OctoBioStoreGuide")),
  },
};
