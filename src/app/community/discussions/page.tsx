import { Suspense } from "react";
import { Metadata } from "next";
import { fetchServerDiscussions } from "@/lib/discussions";
import DiscussionsListClient from "@/components/DiscussionsListClient";

export const metadata: Metadata = {
  title: "Community Discussions & Q&A | PiEEG",
  description:
    "Ask EEG hardware & DSP questions, share BCI builds, vote on community solutions, and connect with PiEEG engineers and neuroscience researchers.",
  alternates: {
    canonical: "https://pieeg.com/community/discussions",
  },
  openGraph: {
    title: "PiEEG Community Discussions & Technical Q&A",
    description:
      "Technical Q&A, signal processing tips, hardware troubleshooting, and open-source BCI project discussions from the PiEEG community.",
    url: "https://pieeg.com/community/discussions",
  },
};

export default async function DiscussionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;
  const pageNum = Math.max(1, Number.parseInt(sp.page || "1", 10) || 1);

  const initialData = await fetchServerDiscussions({
    category: sp.category,
    tag: sp.tag,
    search: sp.search,
    sort: sp.sort || "active",
    page: pageNum,
    limit: 20,
  });

  return (
    <main className="flex-1 bg-white dark:bg-zinc-950">
      <Suspense fallback={null}>
        <DiscussionsListClient
          initialData={initialData}
          initialFilters={{
            category: sp.category || "all",
            tag: sp.tag || "",
            search: sp.search || "",
            sort: sp.sort || "active",
            page: pageNum,
          }}
        />
      </Suspense>
    </main>
  );
}
