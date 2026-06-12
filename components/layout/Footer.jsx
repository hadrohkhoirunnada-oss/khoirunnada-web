"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LogoBrand from "@/components/shared/LogoBrand";
import {
  DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
  getSiteSocialMediaSettings,
} from "@/services/siteSettingsService";

const SOCIAL_LINKS = [
  {
    key: "facebookUrl",
    label: "Facebook",
    icon: "/icons/social/facebook.png",
  },
  {
    key: "instagramUrl",
    label: "Instagram",
    icon: "/icons/social/instagram.png",
  },
  {
    key: "youtubeUrl",
    label: "YouTube",
    icon: "/icons/social/youtube.png",
  },
  {
    key: "tiktokUrl",
    label: "TikTok",
    icon: "/icons/social/tiktok.png",
  },
];

function SocialButton({ item, href }) {
  const isActive = Boolean(href);

  function handleClick(event) {
    if (!isActive) {
      event.preventDefault();
    }
  }

  return (
    <a
      href={isActive ? href : "#"}
      aria-label={item.label}
      target={isActive ? "_blank" : undefined}
      rel={isActive ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-amber-300/12 bg-white/[0.045] shadow-lg shadow-black/25 backdrop-blur-xl transition active:scale-95"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.035)_38%,rgba(0,0,0,0.22))]" />
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <span className="pointer-events-none absolute bottom-1 h-3 w-8 rounded-full bg-black/40 blur-md" />

      <Image
        src={item.icon}
        alt=""
        width={32}
        height={32}
        className="relative z-10 h-7 w-7 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.55)] transition duration-300 group-active:translate-y-0.5 group-active:scale-95"
        style={{
          filter: "saturate(1.15) contrast(1.05) brightness(1.05)",
        }}
      />
    </a>
  );
}

export default function Footer() {
  const [socialSettings, setSocialSettings] = useState(
    DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS
  );

  useEffect(() => {
    let isMounted = true;

    async function loadSocialSettings() {
      try {
        const settings = await getSiteSocialMediaSettings();

        if (!isMounted) {
          return;
        }

        setSocialSettings({
          ...DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS,
          ...settings,
        });
      } catch (error) {
        console.error("Gagal memuat pengaturan footer:", error);

        if (isMounted) {
          setSocialSettings(DEFAULT_SITE_SOCIAL_MEDIA_SETTINGS);
        }
      }
    }

    loadSocialSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="relative z-10 overflow-hidden border-t border-amber-300/10 bg-[#030407]/72 px-5 pb-5 pt-8 text-white shadow-[0_-18px_55px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.11),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012)_42%,rgba(0,0,0,0.24))]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-200/75 to-transparent opacity-70 shadow-[0_0_16px_rgba(245,197,66,0.5)]" />
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-35" />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-black/35 shadow-lg shadow-black/25 backdrop-blur-xl">
            <LogoBrand size={42} />
          </div>

          <div>
            <p className="text-lg font-extrabold leading-tight tracking-[-0.03em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              Khoirunnada
            </p>
            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-amber-300 drop-shadow-[0_0_12px_rgba(245,197,66,0.2)]">
              Majelis Sholawat
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium leading-7 text-slate-300">
          Website resmi Khoirunnada untuk informasi majelis, lirik qasidah,
          jadwal penampilan, galeri kegiatan, dan layanan booking.
        </p>

        <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-amber-300/14 bg-black/35 px-5 py-5 shadow-xl shadow-black/25 backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.105),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10">
            <p className="text-center text-xs font-extrabold uppercase tracking-[0.36em] text-amber-300">
              Media Sosial
            </p>

            <div className="mt-5 grid grid-cols-4 gap-3">
              {SOCIAL_LINKS.map((item) => (
                <SocialButton
                  key={item.key}
                  item={item}
                  href={socialSettings[item.key]}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-8 pt-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/45 to-transparent opacity-60" />

          <p className="text-center text-xs leading-6 text-slate-500">
            {socialSettings.copyrightText}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-100/45 to-transparent opacity-60" />
    </footer>
  );
}