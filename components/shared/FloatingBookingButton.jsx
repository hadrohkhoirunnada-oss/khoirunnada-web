"use client";

import Link from "next/link";

export default function FloatingBookingButton() {
  return (
    <Link
      href="/booking"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-300 text-lg font-bold text-slate-950 shadow-xl shadow-amber-950/40"
      aria-label="Booking Khoirunnada"
    >
      ✦
    </Link>
  );
}
