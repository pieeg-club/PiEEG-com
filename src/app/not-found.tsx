import Link from "next/link";
import {
  Cpu,
  Code2,
  Users,
  BookOpen,
  Newspaper,
  Mail,
  Building2,
  Zap,
  Briefcase,
  Shield,
  ArrowRight,
} from "lucide-react";

const hardwareLinks = [
  { label: "All Boards", href: "/hardware" },
  { label: "IronBCI-32", href: "/hardware/ironbci-32" },
  { label: "IronBCI", href: "/hardware/ironbci" },
  { label: "PiEEG-16", href: "/hardware/pieeg-16" },
  { label: "PiEEG", href: "/hardware/pieeg" },
  { label: "ardEEG", href: "/hardware/ardeeg" },
  { label: "JNEEG", href: "/hardware/jneeg" },
  { label: "MicroBCI", href: "/hardware/microbci" },
];

const sections = [
  {
    heading: "Resources",
    accent: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    Icon: Code2,
    links: [
      { label: "Software & SDKs", href: "/software" },
      { label: "Support & Docs", href: "/support" },
      { label: "Examples & Demos", href: "/examples" },
      { label: "News", href: "/news" },
    ],
  },
  {
    heading: "Community",
    accent: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500",
    Icon: Users,
    links: [
      { label: "Community Hub", href: "/community" },
      { label: "Partnership", href: "/partnership" },
      { label: "Careers", href: "/job" },
    ],
  },
  {
    heading: "Company",
    accent: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500",
    Icon: Building2,
    links: [
      { label: "About PiEEG", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Liability", href: "/liability" },
    ],
  },
];

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-7xl font-black text-zinc-100 dark:text-zinc-800 select-none mb-2">
            404
          </p>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            Page not found
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Here&apos;s where you might want to go:
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-4"
          >
            Back to home <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Site map grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-start">

          {/* Hardware — spans 2 cols, links split into 2 sub-columns */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-500 border-opacity-40">
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Hardware
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {hardwareLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Other sections */}
          {sections.map(({ heading, accent, border, Icon, links }) => (
            <div key={heading}>
              <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${border} border-opacity-40`}>
                <Icon className={`w-4 h-4 ${accent} shrink-0`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${accent}`}>
                  {heading}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}
