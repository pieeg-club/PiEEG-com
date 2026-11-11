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
};
