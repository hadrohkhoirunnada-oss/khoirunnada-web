"use client";

import { useState } from "react";
import LogoBrand from "@/components/shared/LogoBrand";
import HamburgerMenu from "@/components/layout/HamburgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40">
      <header className="relative overflow-hidden border-b border-amber-300/10 bg-[#050505]/72 px-5 py-3 text-white shadow-[0_10px_32px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(245,197,66,0.16),transparent_36%),radial-gradient(circle_at_92%_20%,rgba(245,197,66,0.1),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015)_45%,rgba(0,0,0,0.22))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent opacity-70 shadow-[0_0_16px_rgba(245,197,66,0.55)]" />
        <div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-40" />

        <div className="relative z-10 flex min-h-12 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-black/30 shadow-lg shadow-black/25 backdrop-blur-xl">
              <LogoBrand size={34} />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-[-0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                Khoirunnada
              </p>
              <p className="mt-1 text-[0.66rem] font-bold uppercase tracking-[0.26em] text-amber-300 drop-shadow-[0_0_12px_rgba(245,197,66,0.2)]">
                Majelis Sholawat
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-amber-300/22 bg-black/30 text-amber-200 shadow-lg shadow-black/25 backdrop-blur-xl transition active:scale-95"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-200/10 to-transparent" />
            <span className="pointer-events-none absolute inset-1 rounded-full border border-amber-300/12" />

            <span className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-[3px] block h-0.5 w-5 rounded-full bg-amber-200 transition duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] block h-0.5 w-5 rounded-full bg-amber-200 transition duration-300 ${
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[17px] block h-0.5 w-5 rounded-full bg-amber-200 transition duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}