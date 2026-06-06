"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/services/authService";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Booking",
    href: "/admin/booking-admin",
  },
  {
    label: "Qasidah",
    href: "/admin/qasidah",
  },
  {
    label: "Jadwal",
    href: "/admin/jadwal",
  },
  {
    label: "Galeri",
    href: "/admin/galeri",
  },
  {
    label: "QR Booking",
    href: "/admin/qr-booking",
  },
  {
    label: "Pengaturan",
    href: "/admin/pengaturan",
  },
];

function MenuIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 7.25h13.5M5.25 12h13.5M5.25 16.75h13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m7.25 7.25 9.5 9.5M16.75 7.25l-9.5 9.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 5.25H6.75a2 2 0 0 0-2 2v9.5a2 2 0 0 0 2 2h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.75 8.25 18.5 12l-3.75 3.75M18.25 12H9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarContent({ onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logoutAdmin();
      onClose?.();
      router.replace("/login");
    } catch (error) {
      console.error("Gagal log out admin:", error);
      setIsLoggingOut(false);
      alert("Gagal log out. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative overflow-hidden rounded-[1.7rem] border border-amber-300/12 bg-black/30 p-4 shadow-xl shadow-black/25">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.18))]" />

        <div className="relative z-10 flex items-center gap-3">
          <img
            src="/logo/khoirunnada-logo.png"
            alt="Khoirunnada"
            className="h-11 w-11 rounded-full object-contain"
          />

          <div>
            <p className="text-sm font-black text-white">Admin Panel</p>
            <p className="mt-1 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-amber-300">
              Khoirunnada
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-5 space-y-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex min-h-12 items-center gap-3 rounded-2xl border px-4 text-sm font-bold transition active:scale-[0.99] ${
                isActive
                  ? "border-amber-300/18 bg-amber-300/10 text-amber-100 shadow-lg shadow-black/20"
                  : "border-transparent text-slate-400 hover:border-amber-300/10 hover:bg-white/[0.035] hover:text-white"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                  isActive
                    ? "border-amber-300/18 bg-black/30 text-amber-200"
                    : "border-white/6 bg-black/20 text-slate-500"
                }`}
              >
                <MenuIcon className="h-4 w-4" />
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex min-h-12 w-full items-center gap-3 rounded-2xl border border-red-400/18 bg-red-500/10 px-4 text-sm font-extrabold text-red-100 shadow-lg shadow-black/20 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-300/16 bg-black/25 text-red-100">
            <LogoutIcon className="h-4 w-4" />
          </span>

          {isLoggingOut ? "Keluar..." : "Log Out"}
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ isOpen = false, onClose }) {
  return (
    <>
      <aside className="hidden min-h-screen w-[270px] shrink-0 flex-col border-r border-amber-300/10 bg-black/24 px-4 py-5 backdrop-blur-xl lg:flex">
        <SidebarContent />
      </aside>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Tutup menu admin"
          onClick={onClose}
          className={`absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute bottom-0 right-0 top-0 flex w-[82%] max-w-[315px] flex-col border-l border-amber-300/12 bg-[#05070d]/96 px-4 py-5 shadow-[-24px_0_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Menu Admin
            </p>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup sidebar"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/32 text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.96]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1">
            <SidebarContent onClose={onClose} />
          </div>
        </aside>
      </div>
    </>
  );
}