"use client";

import { useState } from "react";
import useFloatingPopup from "@/hooks/useFloatingPopup";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import FloatingBookingModal from "@/components/shared/FloatingBookingModal";

export default function FloatingBookingButton() {
  const isPopupVisible = useFloatingPopup();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 px-7">
        <div className="relative flex justify-end">
          {isPopupVisible && !isModalOpen ? (
            <div className="absolute bottom-[3.65rem] right-0 animate-[bookingPopup_2s_ease-in-out] rounded-xl border border-emerald-400/20 bg-[#07110b]/95 px-3 py-2 text-[0.72rem] font-semibold text-emerald-50 shadow-xl shadow-black/35 backdrop-blur">
              <span className="absolute -bottom-1 right-5 h-2.5 w-2.5 rotate-45 border-b border-r border-emerald-400/20 bg-[#07110b]" />
              Booking Kami Disini
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto relative flex h-12 w-12 items-center justify-center transition active:scale-95"
            aria-label="Booking Khoirunnada"
          >
            <WhatsAppIcon className="absolute h-10 w-10 animate-ping text-[#25D366] opacity-25" />
            <WhatsAppIcon className="relative z-10 h-10 w-10 animate-pulse text-[#25D366] drop-shadow-[0_10px_20px_rgba(18,140,86,0.45)]" />
          </button>
        </div>
      </div>

      <FloatingBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}