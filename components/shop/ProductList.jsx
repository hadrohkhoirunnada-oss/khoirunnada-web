import ProductCard from "@/components/shop/ProductCard";

function EmptyShopIcon({ className = "" }) {
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
        d="M9 9.25V7.75a3 3 0 0 1 6 0v1.5M5.25 9.25h13.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/15 bg-black/38 p-6 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.09),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.18))]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <EmptyShopIcon className="h-8 w-8" />
          </div>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
            Katalog Kosong
          </p>

          <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">
            Produk belum tersedia
          </h2>

          <p className="mx-auto mt-3 max-w-[320px] text-sm font-medium leading-7 text-slate-300">
            Katalog produk Khoirunnada akan tampil di sini setelah data produk
            siap ditampilkan.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}