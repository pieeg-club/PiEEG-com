import catalog from "@/data/elecrow-catalog.json";

export type Availability = "InStock" | "OutOfStock" | "PreOrder";

export type CatalogProduct = {
  name: string;
  description: string;
  image: string;
  path: string;
  elecrowUrl: string;
  sku?: string | null;
  price?: number | null;
  currency: string;
  availability?: Availability | null;
};

export type ElecrowCatalog = {
  currency: string;
  updatedAt: string;
  products: Record<string, CatalogProduct>;
};

export const elecrowCatalog = catalog as ElecrowCatalog;

const SITE_ORIGIN = "https://pieeg.com";

export function getCatalogProduct(id: string): CatalogProduct | undefined {
  return elecrowCatalog.products[id];
}

export function hasPricedOffer(product: CatalogProduct | undefined): product is CatalogProduct & { price: number } {
  return product != null && typeof product.price === "number";
}

export function formatUsd(amount: number): string {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

function availabilityIri(availability: Availability | null | undefined): string {
  if (availability === "OutOfStock") return "https://schema.org/OutOfStock";
  if (availability === "PreOrder") return "https://schema.org/PreOrder";
  return "https://schema.org/InStock";
}

function schemaPrice(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
}

export function buildProductJsonLd(id: string) {
  const product = getCatalogProduct(id);
  if (!hasPricedOffer(product)) return null;

  const image = product.image.startsWith("http")
    ? product.image
    : `${SITE_ORIGIN}${product.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image,
    sku: product.sku ?? undefined,
    mpn: product.sku ?? undefined,
    brand: {
      "@type": "Brand",
      name: "PiEEG",
    },
    url: `${SITE_ORIGIN}${product.path}`,
    offers: {
      "@type": "Offer",
      url: product.elecrowUrl,
      priceCurrency: product.currency || "USD",
      price: schemaPrice(product.price),
      availability: availabilityIri(product.availability),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Elecrow",
      },
    },
  };
}
