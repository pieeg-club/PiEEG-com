import { Metadata } from "next";
import {
  getAllOpenIdeas,
  getHighlightedCommunityBuilds,
  OPEN_IDEAS_FAQS,
} from "@/lib/open-ideas";
import OpenIdeasClient from "./OpenIdeasClient";

export const metadata: Metadata = {
  title: "Open Project Ideas & Independent Neurotech Builds | PiEEG Community",
  description:
    "Open-source EEG, BCI and neurotech project ideas anyone can build independently on PiEEG's MIT-licensed hardware and software. Your project, your code, your name.",
  alternates: {
    canonical: "https://pieeg.com/community/open-ideas",
  },
  openGraph: {
    title: "Open Project Ideas | PiEEG",
    description:
      "Open-source neurotech project ideas you can build on your own. Pick one, build it in your own repository, and share it with the community.",
    url: "https://pieeg.com/community/open-ideas",
    type: "website",
  },
};

export default function OpenIdeasPage() {
  const ideas = getAllOpenIdeas();
  const highlightedBuilds = getHighlightedCommunityBuilds();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: OPEN_IDEAS_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Open-Source EEG, BCI & Neurotech Project Ideas",
    description:
      "16 open-source EEG, BCI and neurotech project ideas anyone can build independently on MIT-licensed hardware and software.",
    numberOfItems: ideas.length,
    itemListElement: ideas.map((idea, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: idea.title,
      description: idea.summary,
      url: `https://pieeg.com/community/open-ideas/${idea.slug}`,
    })),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListLd).replace(/</g, "\\u003c"),
        }}
      />
      <OpenIdeasClient highlightedBuilds={highlightedBuilds} />
    </main>
  );
}
