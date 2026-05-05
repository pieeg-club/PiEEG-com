'use client';

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useRef, useEffect } from "react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const megaMenuContent = {
  products: {
    label: "BCI Systems",
    description: "Professional brain-computer interfaces",
    sections: [
      {
        title: "Professional Series",
        items: [
          { href: "/products/ironbci-32", label: "IronBCI 32", description: "32-channel professional system" },
          { href: "/products/ironbci-16", label: "IronBCI 16", description: "16-channel portable solution" },
        ]
      },
      {
        title: "Development Kits",
        items: [
          { href: "/products/microbci", label: "MicroBCI", description: "STM32-based development kit" },
          { href: "/products/pieeg", label: "PiEEG", description: "Raspberry Pi EEG shield" },
        ]
      },
      {
        title: "Accessories",
        items: [
          { href: "/products/electrodes", label: "Electrodes", description: "Premium dry & wet electrodes" },
          { href: "/products/headsets", label: "Headsets", description: "3D printable & ready-made" },
        ]
      }
    ]
  },
  resources: {
    label: "Resources",
    description: "Documentation and guides",
    sections: [
      {
        title: "Documentation",
        items: [
          { href: "/docs/getting-started", label: "Getting Started", description: "Quick start guide" },
          { href: "/docs/api", label: "API Reference", description: "Complete API docs" },
          { href: "/docs/tutorials", label: "Tutorials", description: "Step-by-step guides" },
        ]
      },
      {
        title: "Learning",
        items: [
          { href: "/docs/courses", label: "Courses", description: "ML & EEG training" },
          { href: "/docs/examples", label: "Examples", description: "Sample projects" },
          { href: "/docs/research", label: "Research", description: "Scientific papers" },
        ]
      }
    ]
  }
};

const simpleLinks = [
  { href: "/signals", label: "Brain Signals" },
  { href: "/open-source", label: "Open Hardware" },
];

type MegaMenuKey = 'products' | 'resources';

function MegaMenu({ 
  content, 
  isOpen, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  content: typeof megaMenuContent[MegaMenuKey], 
  isOpen: boolean,
  onMouseEnter: () => void,
  onMouseLeave: () => void
}) {
  return (
    <div 
      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl shadow-zinc-900/10 dark:shadow-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-zinc-900 dark:via-cyan-950/30 dark:to-blue-950/20 px-6 py-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{content.label}</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{content.description}</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-6 p-6 min-w-[520px]">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-3">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col px-3 py-2.5 rounded-xl hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-950/20 dark:hover:to-blue-950/20 transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: MegaMenuKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image 
              src="/logo-without-bg.png" 
              alt="PiEEG Logo" 
              width={120} 
              height={32}
              className="h-8 w-auto dark:brightness-0 dark:invert transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Centered Nav */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-full px-2 py-1.5 border border-zinc-200/50 dark:border-zinc-800/50">
              {/* BCI Systems - Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeMenu === 'products'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className="relative z-10">{megaMenuContent.products.label}</span>
                </button>
                <MegaMenu 
                  content={megaMenuContent.products} 
                  isOpen={activeMenu === 'products'}
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>

              {/* Simple Links */}
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Resources - Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeMenu === 'resources'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className="relative z-10">{megaMenuContent.resources.label}</span>
                </button>
                <MegaMenu 
                  content={megaMenuContent.resources} 
                  isOpen={activeMenu === 'resources'}
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-[18px] h-[18px]" />
            </a>
            <ThemeToggle />
            <a
              href="https://pieeg.com/shop"
              className="relative overflow-hidden flex h-9 items-center rounded-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 dark:from-cyan-400 dark:via-cyan-500 dark:to-blue-500 px-5 text-sm font-semibold text-white dark:text-zinc-950 hover:scale-105 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-400/20 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/40 dark:hover:shadow-cyan-400/30 group"
            >
              <span className="relative z-10">Shop</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
