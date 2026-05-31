"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAVIGATION } from "@/constants/navigation";

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
        d="M9.75 6.75L15.25 12L9.75 17.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserAdminIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.75 19.25c.78-3.15 3.05-5 6.25-5s5.47 1.85 6.25 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HamburgerMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <div
      className={`grid overflow-hidden border-b border-amber-300/10 bg-[#050505]/78 shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-all duration-500 ease-out ${isOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
        }`}
    >
      <div className="no-scrollbar overflow-hidden">
        <div className="relative px-5 pb-6 pt-5">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/20" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-5">
              <Link
                href="/login"
                onClick={onClose}
                className="group inline-flex min-h-12 items-center gap-4 rounded-2xl border border-amber-300/14 bg-black/28 py-1.5 pl-2 pr-6 text-slate-100 shadow-lg shadow-black/15 backdrop-blur-2xl transition active:scale-[0.99]"
              >
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-300/18 bg-white/[0.045] text-amber-200 shadow-inner shadow-black/25">
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(245,197,66,0.12),rgba(255,255,255,0.035),rgba(0,0,0,0.18))]" />
                  <UserAdminIcon className="relative z-10 h-5 w-5" />
                </span>

                <span className="text-sm font-extrabold tracking-[-0.02em] text-white">
                  Login Admin
                </span>
              </Link>
            </div>

            <nav className="space-y-3">
              {PUBLIC_NAVIGATION.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex min-h-14 items-center justify-between overflow-hidden rounded-[1.35rem] border px-5 text-base font-bold shadow-lg shadow-black/15 backdrop-blur-2xl transition active:scale-[0.99] ${isActive
                        ? "border-amber-300/40 bg-amber-300/15 text-amber-50"
                        : "border-amber-300/12 bg-white/[0.04] text-slate-100"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border text-[0.65rem] font-extrabold ${isActive
                            ? "border-amber-300/35 bg-amber-300/20 text-amber-100"
                            : "border-amber-300/12 bg-black/25 text-amber-200/80"
                          }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>

                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border ${isActive
                          ? "border-amber-300/30 bg-amber-300/15 text-amber-200"
                          : "border-amber-300/10 bg-black/20 text-amber-300"
                        }`}
                    >
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}