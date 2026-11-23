"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import data from "@/data/github-contributors.json";

const ORG_URL = "https://github.com/pieeg-club";
const REPOS_API = "https://api.github.com/orgs/pieeg-club/repos?per_page=100&type=public";

type Repo = { fork: boolean; stargazers_count: number; forks_count: number };

// 1,946 -> "1,900+", 234 -> "230+"
function roundDown(n: number) {
  const step = n >= 1000 ? 100 : n >= 100 ? 10 : 1;
  return `${(Math.floor(n / step) * step).toLocaleString("en-GB")}+`;
}

type Contributor = {
  name: string;
  github?: string;
};

export default function GithubContributors() {
  const contributors = data.contributors as Contributor[];
  const [stats, setStats] = useState({ stars: data.stars, forks: data.forks, repos: data.repos });

  useEffect(() => {
    let active = true;
    fetch(REPOS_API)
      .then((res) => (res.ok ? res.json() : null))
      .then((repos: Repo[] | null) => {
        if (!active || !Array.isArray(repos)) return;
        const own = repos.filter((r) => !r.fork);
        const stars = own.reduce((sum, r) => sum + r.stargazers_count, 0);
        const forks = own.reduce((sum, r) => sum + r.forks_count, 0);
        if (stars > 0) setStats({ stars, forks, repos: own.length });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (contributors.length === 0) return null;

  return (
    <section
      id="contributors"
      aria-labelledby="contributors-title"
      className="scroll-mt-20 bg-white pb-20 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-6 py-10 sm:px-10 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h2
            id="contributors-title"
            className="title-subsection m-0 flex flex-wrap items-center justify-center gap-x-3 text-center"
          >
            Contributors to PiEEG Club
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-label="on GitHub"
              className="size-[0.9em] shrink-0"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </h2>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 no-underline hover:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-cyan-400"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 text-amber-500">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
              </svg>
              {roundDown(stats.stars)} stars
            </a>
            <a
              href={ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 no-underline hover:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-cyan-400"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 text-zinc-500 dark:text-zinc-400">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
              </svg>
              {roundDown(stats.forks)} forks
            </a>
            <a
              href={`${ORG_URL}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 no-underline hover:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-cyan-400"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4 text-zinc-500 dark:text-zinc-400">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
              </svg>
              {roundDown(stats.repos)} open-source repos
            </a>
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
            <li>
              <a
                href={ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-center no-underline"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-zinc-900 text-2xl font-semibold text-white ring-2 ring-white transition group-hover:-translate-y-0.5 group-hover:ring-cyan-500 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-900 dark:group-hover:ring-cyan-400">
                  +
                </span>
                <span className="w-full truncate text-xs font-semibold uppercase tracking-[0.12em] text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-zinc-50">
                  And more
                </span>
              </a>
            </li>
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
