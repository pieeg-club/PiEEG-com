import { Metadata } from "next";
import { fetchServerThread } from "@/lib/discussions";
import DiscussionDetailClient from "@/components/DiscussionDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ threadId: string }>;
}): Promise<Metadata> {
  const { threadId } = await params;
  const detail = await fetchServerThread(threadId);

  if (!detail?.thread) {
    return {
      title: "Discussion | PiEEG Community",
      description:
        "Technical Q&A and open-source BCI discussions from the PiEEG community.",
    };
  }

  const { thread } = detail;
  const snippet = (thread.bodyPreview || thread.body || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: `${thread.title} — PiEEG Community Discussions`,
    description:
      snippet ||
      `Discussion by ${thread.author.name} in ${thread.category} on PiEEG Community.`,
    alternates: {
      canonical: `https://pieeg.com/community/discussions/${thread.id}`,
    },
    openGraph: {
      title: `${thread.title} | PiEEG Community`,
      description: snippet,
      type: "article",
      url: `https://pieeg.com/community/discussions/${thread.id}`,
    },
  };
}

export default async function DiscussionThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const initialDetail = await fetchServerThread(threadId);

  return (
    <main className="flex-1 bg-white dark:bg-zinc-950">
      <DiscussionDetailClient
        threadId={threadId}
        initialDetail={initialDetail}
      />
    </main>
  );
}
