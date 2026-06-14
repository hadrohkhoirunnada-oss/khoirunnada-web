"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useFloatingPopup from "@/hooks/useFloatingPopup";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import {
  DEFAULT_SITE_CONTACT_SETTINGS,
  getSiteContactSettings,
} from "@/services/siteSettingsService";

const FloatingBookingModal = dynamic(
  () => import("@/components/shared/FloatingBookingModal"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function FloatingBookingButton() {
  const pathname = usePathname();
  const isPopupVisible = useFloatingPopup();

  const [hasMounted, setHasMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublicMenuOpen, setIsPublicMenuOpen] = useState(false);
  const [popupLabel, setPopupLabel] = useState(
    DEFAULT_SITE_CONTACT_SETTINGS.whatsappLabel
  );

  const isLyricsDetailPage = pathname?.startsWith("/lirik/");

  const isLoginPage =
    pathname === "/login" ||
    pathname?.startsWith("/login/") ||
    pathname === "/login-kru-vocalis" ||
    pathname?.startsWith("/login-kru-vocalis/");

  const isKruVocalisPage =
    pathname === "/kru-vocalis" || pathname?.startsWith("/kru-vocalis/");

  const isAdminPage = pathname?.startsWith("/admin");

  const shouldHideFloatingButton =
    isLyricsDetailPage || isLoginPage || isKruVocalisPage || isAdminPage;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (shouldHideFloatingButton || isPublicMenuOpen) {
      setIsModalOpen(false);
    }
  }, [shouldHideFloatingButton, isPublicMenuOpen]);

  useEffect(() => {
    if (!hasMounted || typeof window === "undefined") {
      return undefined;
    }

    const handleMenuToggle = (event) => {
      const nextIsOpen = Boolean(event.detail?.isOpen);

      setIsPublicMenuOpen(nextIsOpen);

      if (nextIsOpen) {
        setIsModalOpen(false);
      }
    };

    setIsPublicMenuOpen(
      document.body.classList.contains("public-menu-open")
    );

    window.addEventListener(
      "khoirunnada-public-menu-toggle",
      handleMenuToggle
    );

    return () => {
      window.removeEventListener(
        "khoirunnada-public-menu-toggle",
        handleMenuToggle
      );
    };
  }, [hasMounted]);

  useEffect(() => {
    if (
      !hasMounted ||
      shouldHideFloatingButton ||
      isPublicMenuOpen ||
      !isPopupVisible ||
      isModalOpen
    ) {
      return undefined;
    }

    let isMounted = true;

    const timer = window.setTimeout(async () => {
      try {
        const settings = await getSiteContactSettings();

        if (!isMounted) {
          return;
        }

        setPopupLabel(
          settings?.whatsappLabel?.trim() ||
          DEFAULT_SITE_CONTACT_SETTINGS.whatsappLabel
        );
      } catch (error) {
        console.error("Gagal memuat teks popup WhatsApp:", error);

        if (!isMounted) {
          return;
        }

        setPopupLabel(DEFAULT_SITE_CONTACT_SETTINGS.whatsappLabel);
      }
    }, 350);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, [
    hasMounted,
    shouldHideFloatingButton,
    isPublicMenuOpen,
    isPopupVisible,
    isModalOpen,
  ]);

  if (!hasMounted || shouldHideFloatingButton || isPublicMenuOpen) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 px-7">
        <div className="relative flex justify-end">
          {isPopupVisible && !isModalOpen ? (
            <div className="absolute bottom-[3.65rem] right-0 rounded-xl border border-emerald-400/18 bg-[#07110b] px-3 py-2 text-[0.72rem] font-semibold text-emerald-50 shadow-lg shadow-black/25">
              <span className="absolute -bottom-1 right-5 h-2.5 w-2.5 rotate-45 border-b border-r border-emerald-400/18 bg-[#07110b]" />
              {popupLabel}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto relative flex h-12 w-12 items-center justify-center transition active:scale-95"
            aria-label="Booking Khoirunnada"
          >
            <WhatsAppIcon className="h-11 w-11 text-[#25D366]" />
          </button>
        </div>
      </div>

      {isModalOpen ? (
        <FloatingBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </>
  );
}