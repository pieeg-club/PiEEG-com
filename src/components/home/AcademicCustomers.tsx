const universities = [
  {
    name: "Aarhus University",
    country: "Denmark",
    href: "https://au.dk/",
    logo: "/home/academia/aarhus.png",
  },
  {
    name: "New York Institute of Technology",
    country: "USA",
    href: "https://nyit.edu/",
    logo: "/home/academia/nyit.png",
  },
  {
    name: "Baylor College of Medicine",
    country: "USA",
    href: "https://bcm.edu/",
    initials: "BCM",
  },
  {
    name: "Imperial College London",
    country: "UK",
    href: "https://imperial.ac.uk/",
    logo: "/home/academia/imperial.png",
  },
  {
    name: "ETH Zürich",
    country: "Switzerland",
    href: "https://ethz.ch/",
    logo: "/home/academia/ethz.png",
  },
  {
    name: "OTH Amberg-Weiden",
    country: "Germany",
    href: "https://oth-aw.de/",
    logo: "/home/academia/oth-aw.png",
  },
  {
    name: "University of Tokyo",
    country: "Japan",
    href: "https://u-tokyo.ac.jp/",
    logo: "/home/academia/u-tokyo.png",
  },
  {
    name: "Duksung Women’s University",
    country: "South Korea",
    href: "https://duksung.ac.kr/",
    logo: "/home/academia/duksung.png",
  },
  {
    name: "Instituto Politécnico de Tomar",
    country: "Portugal",
    href: "https://ipt.pt/",
    logo: "/home/academia/ipt.png",
  },
  {
    name: "University of Edinburgh",
    country: "UK",
    href: "https://ed.ac.uk/",
    logo: "/home/academia/edinburgh.png",
  },
] as const;

export default function AcademicCustomers() {
  return (
    <section
      id="academic-customers"
      aria-labelledby="academic-customers-title"
      className="scroll-mt-20 px-6 py-20 bg-slate-50 text-zinc-900 border-y border-slate-200 dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto mb-9 max-w-[760px] text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
            PiEEG in academia
          </p>
          <h2
            id="academic-customers-title"
            className="mb-5 text-[clamp(30px,4vw,48px)] font-bold leading-[1.1] tracking-[-0.04em] text-zinc-900 dark:text-zinc-50"
          >
            Supporting research around the world
          </h2>
          <p className="m-0 text-[17px] leading-[1.7] text-zinc-600 dark:text-zinc-400">
            PiEEG devices are used by researchers at universities and academic institutions worldwide. Our academic customers include:
          </p>
        </header>

        <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 min-[600px]:grid-cols-3 min-[600px]:gap-3.5 lg:grid-cols-5">
          {universities.map((uni) => (
            <li key={uni.name}>
              <a
                href={uni.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full min-h-[184px] flex-col items-center rounded-2xl border border-slate-200 bg-white px-3.5 py-6 text-center text-inherit no-underline transition-[transform,border-color] duration-200 hover:-translate-y-[3px] hover:border-cyan-500 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-cyan-600 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="mb-[18px] flex h-[54px] w-16 items-center justify-center rounded-lg bg-white">
                  {"logo" in uni ? (
                    <img
                      src={uni.logo}
                      alt={`${uni.name} logo`}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <span
                      aria-label={uni.name}
                      className="text-base font-bold text-[#003865]"
                    >
                      {uni.initials}
                    </span>
                  )}
                </span>
                <h3 className="mb-1.5 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                  {uni.name}
                </h3>
                <p className="m-0 text-xs leading-normal text-zinc-500 dark:text-zinc-400">
                  {uni.country}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-7 mb-0 text-center text-sm text-zinc-500 dark:text-zinc-400">
          And many more universities and research institutions worldwide.
        </p>
      </div>
    </section>
  );
}
