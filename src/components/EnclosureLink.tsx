import { ExternalLink } from "lucide-react";
import type { EnclosureLink as EnclosureLinkType } from "@/lib/thingiverse";

const toneClass = {
  muted:
    "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
  ondark: "text-zinc-400 hover:text-white",
  oncolor: "text-white/75 hover:text-white",
} as const;

export function EnclosureLinks({
  links,
  tone = "muted",
  className = "",
}: {
  links: EnclosureLinkType[];
  tone?: keyof typeof toneClass;
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className}`}>
      {links.map((link) => (
        <a
          key={`${link.href}-${link.label}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline ${toneClass[tone]}`}
        >
          {link.label}
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      ))}
    </div>
  );
}
