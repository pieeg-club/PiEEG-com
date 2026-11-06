import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllStoreProducts,
  getStoreProduct,
  getStoreProductPriceDisplay,
  buildStoreProductJsonLd,
  SITE_ORIGIN,
} from "@/lib/store-catalog";
import StoreProductClient from "@/components/StoreProductClient";

export function generateStaticParams() {
  return getAllStoreProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found — PiEEG Store",
    };
  }

  const priceDisplay = getStoreProductPriceDisplay(product);
  const priceSuffix = typeof product.price === "number" ? ` (${priceDisplay} USD)` : "";
  const title = `Buy ${product.name}${priceSuffix} — ${product.eyebrow} | PiEEG Store`;
  const description = `${product.tagline} ${product.summary}`;
  const canonicalUrl = `${SITE_ORIGIN}${product.storePath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Buy ${product.name}${priceSuffix} — PiEEG Official Store`,
      description: product.tagline,
      url: canonicalUrl,
      siteName: "PiEEG Store",
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: `${product.name} — ${product.eyebrow}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Buy ${product.name}${priceSuffix} | PiEEG Store`,
      description: product.tagline,
      images: [product.heroImage],
    },
  };
}

export default async function StoreProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getStoreProduct(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = buildStoreProductJsonLd(product);

  return (
    <main className="flex-1 bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <StoreProductClient product={product} />
    </main>
  );
}
