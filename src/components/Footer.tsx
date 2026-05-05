import Link from "next/link";

const footerLinks = {
  Hardware: [
    { label: "PiEEG", href: "/hardware#pieeg" },
    { label: "IronBCI-32", href: "/hardware#ironbci-32" },
    { label: "PiEEG-16", href: "/hardware#pieeg-16" },
    { label: "ardEEG", href: "/hardware#ardeeg" },
    { label: "JNEEG", href: "/hardware#jneeg" },
    { label: "MicroBCI", href: "/hardware#microbci" },
  ],
  Resources: [
    { label: "Documentation", href: "/support" },
    { label: "Software", href: "/software" },
    { label: "GitHub", href: "https://github.com/pieeg-club" },
    { label: "Community", href: "/community" },
  ],
  Community: [
    { label: "Discord", href: "https://discord.gg/neJ45FR6Sv" },
    { label: "YouTube", href: "https://youtube.com/@pieeg" },
    { label: "LinkedIn", href: "https://linkedin.com/company/pieeg" },
    { label: "Open Source", href: "/community" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Partnership", href: "/partnership" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="font-mono text-sm font-bold tracking-[0.2em] text-cyan-500 dark:text-cyan-400 uppercase">
              PiEEG
            </span>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-5 max-w-45">
              Open-source brain-computer interface hardware for researchers, engineers, and brain hackers.
            </p>
            <p className="text-[11px] font-medium text-zinc-300 dark:text-zinc-600 uppercase tracking-wider">
              Not a medical device
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => {
                  const isExternal = link.href.startsWith('http');
                  
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} PiEEG. For research and engineering purposes only.
          </p>
          <p className="text-xs text-zinc-300 dark:text-zinc-600">
            Cited in 11 academic papers &middot; Featured in 28 media outlets
          </p>
        </div>

      </div>
    </footer>
  );
}
