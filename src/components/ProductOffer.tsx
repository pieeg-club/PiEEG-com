import {
  buildProductJsonLd,
  formatUsd,
  getCatalogProduct,
  hasPricedOffer,
} from "@/lib/elecrow-catalog";

export function ProductJsonLd({ productId }: { productId: string }) {
  const jsonLd = buildProductJsonLd(productId);
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

type ProductPriceProps = {
  productId: string;
  variant?: "default" | "onDark" | "compact";
};

export function ProductPrice({ productId, variant = "default" }: ProductPriceProps) {
  const product = getCatalogProduct(productId);
  if (!hasPricedOffer(product)) return null;

  const price = formatUsd(product.price);

  if (variant === "compact") {
    return (
      <p className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-100">
        {price}
      </p>
    );
  }

  if (variant === "onDark") {
    return (
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">Price</div>
        <div className="text-3xl font-black text-white tracking-tight">
          {price}
          <span className="ml-2 text-sm font-semibold text-zinc-400">USD</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">Price</div>
      <div className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
        {price}
        <span className="ml-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">USD</span>
      </div>
    </div>
  );
}
