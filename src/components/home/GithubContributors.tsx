import Image from "next/image";
import data from "@/data/github-contributors.json";

const ORG_URL = "https://github.com/pieeg-club";

type Contributor = {
  name: string;
  github?: string;
};

export default function GithubContributors() {
  const contributors = data.contributors as Contributor[];
  if (contributors.length === 0) return null;

  return (
    <section
      id="contributors"
      aria-labelledby="contributors-title"
      className="scroll-mt-20 bg-white pb-20 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-6 py-10 sm:px-10 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-190 text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              Built in the open
            </p>
            <h2 id="contributors-title" className="title-subsection mb-4">
              Contributors to PiEEG Club on GitHub
            </h2>
            <p className="m-0 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {contributors.length} people across {data.repoCount} open-source repositories. Thank you!
            </p>
          </div>

          <ul className="m-0 mt-8 grid list-none grid-cols-3 gap-x-4 gap-y-6 p-0 sm:grid-cols-5 lg:grid-cols-7">
            {contributors.map((person) => {
              const href = person.github ? `https://github.com/${person.github}` : ORG_URL;
              return (
                <li key={person.name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 text-center no-underline"
                  >
                    <span className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-xl font-semibold text-zinc-600 ring-2 ring-white transition group-hover:-translate-y-0.5 group-hover:ring-cyan-500 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-900 dark:group-hover:ring-cyan-400">
                      {person.github ? (
                        <Image
                          src={`https://avatars.githubusercontent.com/${person.github}?s=128`}
                          alt=""
                          width={64}
                          height={64}
                          unoptimized
                          className="size-16 object-cover"
                        />
                      ) : (
                        <span aria-hidden="true">{person.name.charAt(0).toUpperCase()}</span>
                      )}
                    </span>
                    <span className="w-full truncate text-xs font-medium text-zinc-700 group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-zinc-50">
                      {person.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <a
              href={ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-zinc-900 px-3.5 py-2 text-sm font-semibold text-white no-underline hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Contribute on GitHub
            </a>
            <p className="m-0 text-xs text-zinc-500 dark:text-zinc-400">
              Fix a bug, improve the docs or build a new experience. Every pull request counts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
