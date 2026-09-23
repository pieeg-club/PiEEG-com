import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "src/data/elecrow-catalog.json");

const USER_AGENT =
  "Mozilla/5.0 (compatible; PiEEGPriceSync/1.0; +https://pieeg.com)";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizePrice(raw) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Number.isInteger(n) ? n : Math.round(n * 100) / 100;
}

function mapAvailability(text) {
  const value = String(text || "").toUpperCase();
  if (value.includes("OUT OF STOCK") || value.includes("OUTOFSTOCK")) {
    return "OutOfStock";
  }
  if (value.includes("PRE-ORDER") || value.includes("PREORDER") || value.includes("PRE ORDER")) {
    return "PreOrder";
  }
  if (value.includes("IN STOCK") || value.includes("INSTOCK")) {
    return "InStock";
  }
  return null;
}

function parseElecrow(html) {
  const combined = html.match(
    /\$(\d+(?:\.\d{2})?)\s*AVAILABILITY:\s*(IN STOCK|OUT OF STOCK|PRE-ORDER|PREORDER)\s*SKU:\s*([A-Z0-9]+)/i
  );
  if (combined) {
    return {
      price: normalizePrice(combined[1]),
      availability: mapAvailability(combined[2]),
      sku: combined[3],
    };
  }

  const main = html.match(
    /<div[^>]*class="[^"]*product-info-main[^"]*"[\s\S]{0,20000}/i
  );
  const slice = main ? main[0] : html;

  const amount = slice.match(/data-price-amount="(\d+(?:\.\d+)?)"/);
  const itemPrice = slice.match(
    /itemprop="price"[^>]*(?:content="(\d+(?:\.\d+)?)"|>\s*\$?(\d+(?:\.\d{2})?))/i
  );
  const skuMatch =
    slice.match(/itemprop="sku"[^>]*>\s*([A-Z0-9]+)/i) ||
    slice.match(/SKU:\s*([A-Z0-9]+)/i);
  const availability =
    mapAvailability(slice) ||
    mapAvailability(html.match(/AVAILABILITY:\s*([A-Z \-]+)/i)?.[1]);

  const price = normalizePrice(
    amount?.[1] ?? itemPrice?.[1] ?? itemPrice?.[2]
  );

  return {
    price,
    availability,
    sku: skuMatch?.[1] ?? null,
  };
}

async function fetchProduct(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });

  if (res.status === 404) {
    return { status: 404, parsed: null };
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }

  const html = await res.text();
  return { status: res.status, parsed: parseElecrow(html) };
}

async function main() {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const ids = Object.keys(catalog.products);
  let failures = 0;
  let updates = 0;

  for (const [index, id] of ids.entries()) {
    const product = catalog.products[id];
    const optional = product.price == null;

    try {
      const { status, parsed } = await fetchProduct(product.elecrowUrl);

      if (status === 404) {
        if (optional) {
          console.log(`${id}: Elecrow page 404 (left unpriced)`);
        } else {
          console.error(`${id}: Elecrow page 404`);
          failures += 1;
        }
      } else if (!parsed?.price) {
        if (optional) {
          console.log(`${id}: no price parsed (left unpriced)`);
        } else {
          console.error(`${id}: could not parse price from ${product.elecrowUrl}`);
          failures += 1;
        }
      } else {
        const nextAvailability = parsed.availability ?? product.availability ?? "InStock";
        const nextSku = parsed.sku ?? product.sku ?? null;
        const changed =
          product.price !== parsed.price ||
          product.sku !== nextSku ||
          product.availability !== nextAvailability;

        product.price = parsed.price;
        product.sku = nextSku;
        product.availability = nextAvailability;
        product.currency = catalog.currency || "USD";

        if (changed) {
          updates += 1;
          console.log(
            `${id}: ${parsed.price} ${product.currency} ${nextAvailability} SKU ${nextSku ?? "-"}`
          );
        } else {
          console.log(`${id}: unchanged (${parsed.price} ${product.currency})`);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (optional) {
        console.log(`${id}: ${message} (left unpriced)`);
      } else {
        console.error(`${id}: ${message}`);
        failures += 1;
      }
    }

    if (index < ids.length - 1) {
      await sleep(350);
    }
  }

  catalog.updatedAt = new Date().toISOString();
  fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

  console.log(
    `\nWrote ${catalogPath}\nUpdated ${updates} product(s). Failures: ${failures}.`
  );

  if (failures > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
