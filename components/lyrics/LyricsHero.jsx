function BookOpenIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.75 6.25c0-.83.67-1.5 1.5-1.5h4.25c.83 0 1.5.67 1.5 1.5v13c0-.83-.67-1.5-1.5-1.5H6.25c-.83 0-1.5-.67-1.5-1.5v-10Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M19.25 6.25c0-.83-.67-1.5-1.5-1.5H13.5c-.83 0-1.5.67-1.5 1.5v13c0-.83.67-1.5 1.5-1.5h4.25c.83 0 1.5-.67 1.5-1.5v-10Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M8 8.75h1.9M14.1 8.75H16M8 12h1.9M14.1 12H16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SearchLineIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.75 17.25a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="m15.75 15.75 3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function LyricsHero() {
    return (
        <section className="relative isolate -mx-5 overflow-hidden px-5 pb-8 pt-7">
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(245,197,66,0.045)_18%,rgba(245,197,66,0.055)_34%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.18)_100%)]" />

            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-black/32 via-black/16 to-transparent" />

            <div className="pointer-events-none absolute left-1/2 top-[-9rem] -z-10 h-80 w-[140%] -translate-x-1/2 rounded-full bg-amber-300/[0.055] blur-3xl" />
            <div className="pointer-events-none absolute right-[-8rem] top-20 -z-10 h-64 w-64 rounded-full bg-amber-300/[0.045] blur-3xl" />
            <div className="pointer-events-none absolute left-[-8rem] top-36 -z-10 h-56 w-56 rounded-full bg-amber-300/[0.032] blur-3xl" />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_52%_48%,rgba(0,0,0,0.02),rgba(0,0,0,0.16)_58%,rgba(0,0,0,0.04)_100%)]" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/24 to-transparent" />

            <div className="relative z-10 mx-auto max-w-[390px]">
                <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3 rounded-2xl border border-amber-300/14 bg-black/30 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
                            <BookOpenIcon className="h-5 w-5" />
                        </span>

                        <div>
                            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-amber-300">
                                Pusat Bacaan
                            </p>
                            <p className="mt-0.5 text-xs font-bold text-slate-300">
                                Qasidah & Sholawat
                            </p>
                        </div>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 shadow-lg shadow-black/20 backdrop-blur-xl">
                        <SearchLineIcon className="h-5 w-5" />
                    </span>
                </div>

                <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.44em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                    Khoirunnada
                </p>

                <h1 className="mt-5 max-w-[330px] text-[2.35rem] font-black leading-[1.04] tracking-[-0.085em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.65)]">
                    Lirik Qasidah
                </h1>

                <p className="mt-5 max-w-[350px] text-[0.98rem] font-semibold leading-8 text-slate-300">
                    Pusat lirik sholawat dan qasidah Khoirunnada. Dibuat agar nyaman
                    dibaca dari HP saat latihan maupun majelis.
                </p>

                <div className="mt-7 flex w-full justify-center gap-2.5">
                    {["Qosidah", "Wirid", "Maulid"].map((item) => (
                        <span
                            key={item}
                            className="inline-flex min-h-9 items-center justify-center rounded-full border border-amber-300/14 bg-black/28 px-4 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-amber-200 shadow-lg shadow-black/15 backdrop-blur-xl"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="mt-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
                    <p className="shrink-0 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-amber-300/80">
                        Cari • Baca • Amalkan
                    </p>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
                </div>
            </div>
        </section>
    );
}