"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import HardwareSelector from "@/components/HardwareSelector";

export default function HardwareSelectorButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-md"
      >
        <Sparkles className="w-4 h-4" />
        Find My Hardware
      </button>
      {open && <HardwareSelector onClose={() => setOpen(false)} />}
    </>
  );
}
