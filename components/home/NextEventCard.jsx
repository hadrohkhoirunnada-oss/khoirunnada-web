import Link from "next/link";

function ShopIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 9.25h10.5l-.75 10H7.5l-.75-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.25V7.75a3 3 0 0 1 6 0v1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.25 9.25h13.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h13M13 6.75 18.25 12 13 17.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getProductStatusLabel(status = "") {
  if (status === "published") {
    return "Tersedia";
  }

  if (status === "coming-soon") {
    return "Segera Hadir";
  }

  if (status === "sold-out") {
    return "Sold Out";
  }

  return "Katalog";
}

function formatProductPrice(price = "") {
  const cleanPrice = String(price || "").trim();

  if (!cleanPrice) {
    return "";
  }

  const numberPrice = Number(cleanPrice);

  if (!Number.isFinite(numberPrice)) {
    return cleanPrice;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numberPrice);
}

function normalizeProduct(item = {}, index = 0) {
  return {
    id: item.id || `product-${index}`,
    title: item.title || "Produk Khoirunnada",
    description: item.description || "",
    status: item.status || "",
    statusLabel: getProductStatusLabel(item.status),
    category: item.category || "Katalog",
    price: item.price || "",
    priceLabel: formatProductPrice(item.price),
    imageUrl: item.imageUrl || "",
  };
}

function getCleanProducts(products = []) {
  if (!Array.isArray(products)) {
    return [];
  }

  return products.map(normalizeProduct).filter((item) => item.title);
}

function ProductMiniCard({ product }) {
  return (
    <article className="group relative min-w-[118px] max-w-[118px] overflow-hidden rounded-2xl border border-amber-300/14 bg-black/35 shadow-lg shadow-black/25">
      <div className="relative h-[82px] overflow-hidden bg-black/45">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover opacity-80 transition duration-500 group-active:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(245,197,66,0.16),rgba(0,0,0,0.65)_60%)] text-amber-200">
            <ShopIcon className="h-7 w-7" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/55" />
      </div>

      <div className="p-3">
        <p className="line-clamp-1 text-[0.55rem] font-extrabold uppercase tracking-[0.16em] text-amber-300">
          {product.category}
        </p>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2rem] text-[0.76rem] font-extrabold leading-[1.25] tracking-[-0.035em] text-white">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="rounded-full border border-amber-300/14 bg-amber-300/10 px-2 py-1 text-[0.52rem] font-extrabold uppercase tracking-[0.12em] text-amber-200">
            {product.statusLabel}
          </span>
        </div>

        {product.priceLabel ? (
          <p className="mt-2 line-clamp-1 text-[0.7rem] font-black text-white">
            {product.priceLabel}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function NextEventCard({ products = [], isLoading = false }) {
  const cleanProducts = getCleanProducts(products);
  const previewProducts = cleanProducts.slice(0, 6);
  const hasProductPreview = previewProducts.length > 0;

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.06)]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/16 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <ShopIcon className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-amber-300">
              Shop & Katalog
            </p>
            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              {isLoading
                ? "Memuat Data"
                : hasProductPreview
                ? "Tersedia"
                : "Segera Hadir"}
            </p>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300/28 to-transparent" />

        {hasProductPreview ? (
          <>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-slate-400">
                Produk Pilihan
              </p>

              <p className="text-[0.68rem] font-bold text-amber-200/80">
                {previewProducts.length} item
              </p>
            </div>

            <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
              {previewProducts.map((product) => (
                <ProductMiniCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
            Katalog produk, perlengkapan majelis, dan merchandise Khoirunnada
            akan ditampilkan di sini.
          </p>
        )}

        <Link
          href="/shop"
          className="group relative mt-5 flex min-h-[3.35rem] w-full items-center justify-between overflow-hidden rounded-2xl border border-amber-300/18 bg-black/38 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.22))]" />
          <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <span className="relative flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
              <ShopIcon className="h-5 w-5" />
            </span>
            Buka Katalog
          </span>

          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition group-active:translate-x-0.5">
            <ArrowIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}