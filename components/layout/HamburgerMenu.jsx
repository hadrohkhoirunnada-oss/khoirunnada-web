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

export default function HamburgerMenu({ isOpen, onClose }) {
  const pathname = usePathname();

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
        className={`absolute inset-0 bg-black/55 transition-opacity duration-200 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute bottom-0 right-0 top-0 flex w-[82%] max-w-[315px] flex-col border-l border-amber-300/12 bg-[#050505] px-4 py-5 transition-transform duration-200 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="shrink-0">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.36em] text-amber-300">
            Menu
          </p>
        </div>

        <nav className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-5">
          {PUBLIC_NAVIGATION.map((item, index) => {
            const isLocked = Boolean(item.isLocked);
            const isActive = !isLocked && pathname === item.href;

            const itemClassName = `flex min-h-14 w-full items-center justify-between rounded-[1.35rem] border px-4 text-left text-base font-bold active:scale-[0.99] ${
              isActive
                ? "border-amber-300/40 bg-[#3a3108] text-amber-50"
                : isLocked
                  ? "cursor-not-allowed border-amber-300/10 bg-[#080806] text-slate-500 opacity-80"
                  : "border-amber-300/12 bg-[#10100d] text-slate-100"
            }`;

            const itemContent = (
              <>
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-extrabold ${
                      isActive
                        ? "border-amber-300/35 bg-[#574909] text-amber-100"
                        : isLocked
                          ? "border-amber-300/10 bg-[#050505] text-slate-600"
                          : "border-amber-300/12 bg-[#080806] text-amber-200/80"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 truncate">{item.label}</span>
                </span>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    isActive
                      ? "border-amber-300/30 bg-[#574909] text-amber-200"
                      : isLocked
                        ? "border-amber-300/10 bg-[#050505] text-slate-600"
                        : "border-amber-300/10 bg-[#080806] text-amber-300"
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
        </nav>

        <div className="shrink-0 border-t border-amber-300/10 pt-4">
          <Link
            href="/login"
            onClick={onClose}
            className="flex min-h-14 items-center gap-4 rounded-2xl border border-amber-300/14 bg-[#0d0d0b] px-4 text-slate-100 active:scale-[0.99]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/16 bg-[#14120b] text-amber-200">
              <UserAdminIcon className="h-5 w-5" />
            </span>

            <span className="text-sm font-extrabold tracking-[-0.02em] text-white">
              Login Admin
            </span>
          </Link>
        </div>
      </aside>
    </div>
  );
}