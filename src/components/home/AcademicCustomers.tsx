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
    name: "McGill University",
    country: "Canada",
    href: "https://www.mcgill.ca/",
    logo: "/home/academia/mcgill.png",
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

type University = (typeof universities)[number];

const rowOne = universities.filter((_, i) => i % 2 === 0);
const rowTwo = universities.filter((_, i) => i % 2 === 1);

function UniPill({ uni }: { uni: University }) {
  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white py-2 pr-4 pl-2 text-left shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-200 group-hover:border-zinc-300 group-hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:group-hover:border-zinc-700 dark:group-hover:bg-zinc-800">
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-50 dark:bg-zinc-800">
        {"logo" in uni ? (
          <img
            src={uni.logo}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="size-7 object-contain"
          />
        ) : (
          <span className="text-[10px] font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">
            {uni.initials}
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[13px] font-medium tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
          {uni.name}
        </span>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          {uni.country}
        </span>
      </span>
    </span>
  );
}

function PillRow({
  items,
  reverse = false,
}: {
  items: readonly University[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-fade overflow-hidden">
      <div
        className={`flex w-max items-center gap-3 px-4 ${
          reverse ? "academia-marquee-track-reverse" : "academia-marquee-track"
        }`}
      >
        {loop.map((uni, i) => (
          <a
            key={`${uni.name}-${i}`}
            href={uni.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : undefined}
            className="group shrink-0"
          >
            <UniPill uni={uni} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function AcademicCustomers() {
  return (
    <section
      id="academic-customers"
      aria-labelledby="academic-customers-title"
      className="scroll-mt-20 overflow-hidden border-y border-zinc-200 bg-white py-20 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <div className="mx-auto mb-12 max-w-190 px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
          PiEEG in academia
        </p>
        <h2
          id="academic-customers-title"
          className="mb-4 text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-900 dark:text-zinc-50"
        >
          Supporting research around the world
        </h2>
        <p className="m-0 text-[17px] leading-[1.7] text-zinc-500 dark:text-zinc-400">
          Used by researchers at universities and labs worldwide.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <PillRow items={rowOne} />
        <PillRow items={rowTwo} reverse />
      </div>
    </section>
  );
}
