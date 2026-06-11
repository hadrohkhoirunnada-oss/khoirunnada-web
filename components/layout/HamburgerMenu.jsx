"use client";

import { useEffect } from "react";
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

function LockIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 10.25V8.5a4.25 4.25 0 0 1 8.5 0v1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.25 10.25h9.5a2 2 0 0 1 2 2v5.25a2 2 0 0 1-2 2h-9.5a2 2 0 0 1-2-2v-5.25a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 14v1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function VocalistIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13.25a3.25 3.25 0 0 0 3.25-3.25V6.75a3.25 3.25 0 0 0-6.5 0V10A3.25 3.25 0 0 0 12 13.25Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6.75 10.25a5.25 5.25 0 0 0 10.5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5v3.75M9.25 19.25h5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HamburgerMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  const isKruVocalisActive = pathname === "/login-kru-vocalis";
  const isAdminActive = pathname === "/login";

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.classList.toggle("public-menu-open", isOpen);

    window.dispatchEvent(
      new CustomEvent("khoirunnada-public-menu-toggle", {
        detail: {
          isOpen,
        },
      })
    );

    return () => {
      document.body.classList.remove("public-menu-open");

      window.dispatchEvent(
        new CustomEvent("khoirunnada-public-menu-toggle", {
          detail: {
            isOpen: false,
          },
        })
      );
    };
  }, [isOpen]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-y-0 left-1/2 z-[9999] w-full max-w-[480px] -translate-x-1/2 overflow-hidden transition-opacity duration-200 ease-out ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Tutup menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/58 transition-opacity duration-200 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute bottom-0 right-0 top-0 flex w-[82%] max-w-[315px] flex-col border-l border-amber-300/12 bg-[#050505] px-4 py-4 transition-transform duration-200 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="relative mb-4 flex min-h-[4.35rem] items-center gap-3 overflow-hidden rounded-[1.45rem] border border-amber-300/12 bg-[#0d0d0a] px-3.5 py-3 shadow-xl shadow-black/25 active:scale-[0.99]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.24))]" />
            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

            <img
              src="/logo/khoirunnada-logo.png"
              alt="Khoirunnada"
              className="relative z-10 h-11 w-11 shrink-0 rounded-full object-contain"
            />

            <div className="relative z-10 min-w-0">
              <p className="truncate text-[0.95rem] font-black tracking-[-0.04em] text-white">
                Khoirunnada
              </p>
              <p className="mt-1 text-[0.58rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                Majelis Sholawat
              </p>
            </div>
          </Link>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto pb-4">
          <div className="space-y-2.5">
            {PUBLIC_NAVIGATION.map((item, index) => {
              const isLocked = Boolean(item.isLocked);
              const isActive = !isLocked && pathname === item.href;

              const itemClassName = `group flex min-h-[3.15rem] w-full items-center justify-between rounded-[1.15rem] border px-3.5 text-left text-[0.92rem] font-extrabold tracking-[-0.03em] active:scale-[0.99] ${
                isActive
                  ? "border-amber-300/35 bg-[#211b07] text-amber-50 shadow-[0_10px_22px_rgba(0,0,0,0.26)]"
                  : isLocked
                    ? "cursor-not-allowed border-amber-300/8 bg-[#070706] text-slate-600 opacity-80"
                    : "border-amber-300/10 bg-[#0d0d0b] text-slate-100 hover:border-amber-300/20"
              }`;

              const itemContent = (
                <>
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.62rem] font-black ${
                        isActive
                          ? "border-amber-300/30 bg-[#4a3b08] text-amber-100"
                          : isLocked
                            ? "border-amber-300/8 bg-[#050505] text-slate-700"
                            : "border-amber-300/12 bg-[#050505] text-amber-200/80"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 truncate">{item.label}</span>
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      isActive
                        ? "border-amber-300/30 bg-[#4a3b08] text-amber-200"
                        : isLocked
                          ? "border-amber-300/8 bg-[#050505] text-slate-700"
                          : "border-amber-300/10 bg-[#070706] text-amber-300"
                    }`}
                  >
                    {isLocked ? (
                      <LockIcon className="h-4 w-4" />
                    ) : (
                      <ArrowIcon className="h-4 w-4" />
                    )}
                  </span>
                </>
              );

              if (isLocked) {
                return (
                  <button
                    key={item.href}
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Halaman sedang disusun"
                    className={itemClassName}
                  >
                    {itemContent}
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={itemClassName}
                >
                  {itemContent}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-amber-300/10 pt-3.5">
          <p className="mb-2.5 px-1 text-[0.58rem] font-black uppercase tracking-[0.24em] text-amber-300/70">
            Akses Khusus
          </p>

          <div className="space-y-2.5 rounded-[1.45rem] border border-amber-300/10 bg-black/28 p-2">
            <Link
              href="/login"
              onClick={onClose}
              className={`flex min-h-[3.15rem] items-center justify-between gap-3 rounded-[1.05rem] border px-3 active:scale-[0.99] ${
                isAdminActive
                  ? "border-amber-300/30 bg-[#211b07] text-amber-50"
                  : "border-amber-300/10 bg-[#090908] text-slate-100"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                    isAdminActive
                      ? "border-amber-300/26 bg-[#3b3008] text-amber-200"
                      : "border-amber-300/12 bg-[#11100b] text-amber-200"
                  }`}
                >
                  <UserAdminIcon className="h-4.5 w-4.5" />
                </span>

                <span className="min-w-0 truncate text-[0.86rem] font-black tracking-[-0.03em] text-white">
                  Login Admin
                </span>
              </span>

              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  isAdminActive
                    ? "border-amber-300/26 bg-[#3b3008] text-amber-200"
                    : "border-amber-300/10 bg-[#050505] text-amber-300"
                }`}
              >
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </Link>

            <Link
              href="/login-kru-vocalis"
              onClick={onClose}
              className={`relative flex min-h-[3.15rem] w-full items-center justify-between gap-3 overflow-hidden rounded-[1.05rem] border px-3 text-left active:scale-[0.99] ${
                isKruVocalisActive
                  ? "border-amber-300/36 bg-[#191406] text-amber-50 shadow-[0_12px_24px_rgba(0,0,0,0.28)]"
                  : "border-amber-300/10 bg-[#090908] text-slate-100"
              }`}
            >
              {isKruVocalisActive ? (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(245,197,66,0.035)_42%,rgba(0,0,0,0.08))]" />
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
                </>
              ) : null}

              <span className="relative z-10 flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                    isKruVocalisActive
                      ? "border-amber-300/30 bg-[#3b3008] text-amber-200"
                      : "border-amber-300/12 bg-[#11100b] text-amber-200"
                  }`}
                >
                  <VocalistIcon className="h-4.5 w-4.5" />
                </span>

                <span className="min-w-0 truncate text-[0.86rem] font-black tracking-[-0.03em] text-white">
                  Login Kru/Vocalis
                </span>
              </span>

              <span
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                  isKruVocalisActive
                    ? "border-amber-300/30 bg-[#3b3008] text-amber-200"
                    : "border-amber-300/10 bg-[#050505] text-amber-300"
                }`}
              >
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}