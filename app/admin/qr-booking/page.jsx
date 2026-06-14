"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import AdminShell from "@/components/admin/AdminShell";
import { getFirebaseDb } from "@/lib/firebase";

const SITE_SETTINGS_COLLECTION = "siteSettings";
const QR_BOOKING_DOCUMENT_ID = "qrBooking";

const DEFAULT_QR_BOOKING_SETTINGS = {
  title: "Scan Untuk Booking",
  description:
    "Arahkan kamera HP ke QR ini untuk membuka halaman booking resmi Khoirunnada.",
  targetUrl: "https://www.khoirunnada.my.id/booking",
  note:
    "QR ini bisa dicetak pada banner, pamflet, undangan, atau dibagikan ke WhatsApp agar calon pengundang lebih mudah mengakses halaman booking.",
};

function normalizeTargetUrl(value = "") {
  const cleanValue = String(value || "").trim();

  if (!cleanValue) {
    return DEFAULT_QR_BOOKING_SETTINGS.targetUrl;
  }

  if (/^https?:\/\//i.test(cleanValue)) {
    return cleanValue;
  }

  return `https://${cleanValue.replace(/^\/+/, "")}`;
}

function getQrImageUrl(targetUrl = "") {
  const safeTargetUrl = normalizeTargetUrl(targetUrl);

  return `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=18&data=${encodeURIComponent(
    safeTargetUrl
  )}`;
}

function readText(data, key, fallback) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const value = data[key];

  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim() ? value : fallback;
}

function QrIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 5.25h5.5v5.5h-5.5v-5.5ZM13.25 5.25h5.5v5.5h-5.5v-5.5ZM5.25 13.25h5.5v5.5h-5.5v-5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 14h2.25v2.25H18.5M18.5 18.5h-4.5v-2.25M16.25 13.25h2.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 14.5 14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.75 7.25 12 6a4.25 4.25 0 0 1 6 6l-1.25 1.25M13.25 16.75 12 18a4.25 4.25 0 0 1-6-6l1.25-1.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.75v9.5M8.25 10.75 12 14.5l3.75-3.75M5.75 19.25h12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaveIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.75 4.75h10.8l1.7 1.7v12.8H5.75V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 4.75v5.1h7.5v-5.1M8.5 19.25v-5.1h7v5.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-amber-200/80">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/35 focus:bg-black/50"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}) {
  return (
    <label className="block">
      <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-amber-200/80">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full resize-y rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/35 focus:bg-black/50"
      />
    </label>
  );
}

export default function Page() {
  const [title, setTitle] = useState(DEFAULT_QR_BOOKING_SETTINGS.title);
  const [description, setDescription] = useState(
    DEFAULT_QR_BOOKING_SETTINGS.description
  );
  const [targetUrl, setTargetUrl] = useState(
    DEFAULT_QR_BOOKING_SETTINGS.targetUrl
  );
  const [note, setNote] = useState(DEFAULT_QR_BOOKING_SETTINGS.note);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const safeTargetUrl = useMemo(() => normalizeTargetUrl(targetUrl), [targetUrl]);
  const qrImageUrl = useMemo(() => getQrImageUrl(safeTargetUrl), [safeTargetUrl]);

  useEffect(() => {
    let isMounted = true;

    async function loadQrBookingSettings() {
      try {
        setIsLoading(true);
        setMessage("");
        setErrorMessage("");

        const db = getFirebaseDb();

        if (!db) {
          if (isMounted) {
            setErrorMessage(
              "Firestore belum siap. Data default tetap ditampilkan."
            );
          }

          return;
        }

        const settingsRef = doc(
          db,
          SITE_SETTINGS_COLLECTION,
          QR_BOOKING_DOCUMENT_ID
        );

        const snapshot = await getDoc(settingsRef);

        if (!isMounted || !snapshot.exists()) {
          return;
        }

        const data = snapshot.data();

        setTitle(readText(data, "title", DEFAULT_QR_BOOKING_SETTINGS.title));
        setDescription(
          readText(
            data,
            "description",
            DEFAULT_QR_BOOKING_SETTINGS.description
          )
        );
        setTargetUrl(
          readText(data, "targetUrl", DEFAULT_QR_BOOKING_SETTINGS.targetUrl)
        );
        setNote(readText(data, "note", DEFAULT_QR_BOOKING_SETTINGS.note));
      } catch (error) {
        console.error("Gagal memuat pengaturan QR Booking:", error);

        if (isMounted) {
          setErrorMessage(
            "Gagal memuat data dari Firestore. Data default tetap ditampilkan."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadQrBookingSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage("");
      setErrorMessage("");

      const db = getFirebaseDb();

      if (!db) {
        throw new Error("Firestore belum siap. Periksa konfigurasi Firebase.");
      }

      const cleanTargetUrl = normalizeTargetUrl(targetUrl);

      const settingsRef = doc(
        db,
        SITE_SETTINGS_COLLECTION,
        QR_BOOKING_DOCUMENT_ID
      );

      await setDoc(
        settingsRef,
        {
          title: title.trim() || DEFAULT_QR_BOOKING_SETTINGS.title,
          description:
            description.trim() || DEFAULT_QR_BOOKING_SETTINGS.description,
          targetUrl: cleanTargetUrl,
          note: note.trim() || DEFAULT_QR_BOOKING_SETTINGS.note,
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      setTargetUrl(cleanTargetUrl);
      setMessage("Pengaturan QR Booking berhasil disimpan.");
    } catch (error) {
      console.error("Gagal menyimpan pengaturan QR Booking:", error);

      setErrorMessage(
        error?.message ||
          "Gagal menyimpan data. Periksa koneksi atau izin Firestore."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleResetDefault() {
    setTitle(DEFAULT_QR_BOOKING_SETTINGS.title);
    setDescription(DEFAULT_QR_BOOKING_SETTINGS.description);
    setTargetUrl(DEFAULT_QR_BOOKING_SETTINGS.targetUrl);
    setNote(DEFAULT_QR_BOOKING_SETTINGS.note);
    setMessage("");
    setErrorMessage("");
  }

  return (
    <AdminShell>
      <form onSubmit={handleSubmit} className="space-y-5 pb-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/34 p-5 text-center shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.11),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

          <div className="relative z-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/16 bg-amber-300/10 text-amber-300 shadow-inner shadow-black/25">
              <QrIcon className="h-7 w-7" />
            </div>

            <div className="mx-auto mt-5 max-w-[250px] overflow-hidden rounded-[1.5rem] border border-amber-300/18 bg-white p-3 shadow-2xl shadow-black/30">
              <img
                src={qrImageUrl}
                alt="QR Booking Khoirunnada"
                className="aspect-square w-full rounded-[1rem] object-cover"
              />
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              {title || DEFAULT_QR_BOOKING_SETTINGS.title}
            </p>

            <p className="mx-auto mt-3 max-w-[310px] text-sm font-medium leading-7 text-slate-300">
              {description || DEFAULT_QR_BOOKING_SETTINGS.description}
            </p>

            <div className="mt-5 rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
              <p className="break-all text-xs font-semibold leading-6 text-slate-400">
                {safeTargetUrl}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={safeTargetUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-black/35 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.98]"
              >
                <LinkIcon className="h-4 w-4" />
                Buka
              </a>

              <a
                href={qrImageUrl}
                download="qr-booking-khoirunnada.png"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-amber-300/10 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.98]"
              >
                <DownloadIcon className="h-4 w-4" />
                Unduh
              </a>
            </div>

            {isLoading ? (
              <p className="mt-5 rounded-2xl border border-amber-300/12 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100">
                Memuat pengaturan QR...
              </p>
            ) : null}

            {message ? (
              <p className="mt-5 rounded-2xl border border-emerald-400/16 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
                {message}
              </p>
            ) : null}

            {errorMessage ? (
              <p className="mt-5 rounded-2xl border border-red-400/16 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </section>

        <SectionCard>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
            Pengaturan QR
          </p>

          <h1 className="mt-2 text-2xl font-black leading-tight tracking-[-0.055em] text-white">
            Atur Link QR Booking
          </h1>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
            Ubah link tujuan QR tanpa perlu mengubah kode. QR akan otomatis
            mengikuti link terbaru yang disimpan.
          </p>

          <div className="mt-5 space-y-4">
            <Field
              label="Judul QR"
              value={title}
              onChange={setTitle}
              placeholder="Contoh: Scan Untuk Booking"
            />

            <TextareaField
              label="Deskripsi QR"
              value={description}
              onChange={setDescription}
              placeholder="Tulis deskripsi QR..."
              rows={4}
            />

            <Field
              label="Link Tujuan QR"
              value={targetUrl}
              onChange={setTargetUrl}
              placeholder="https://www.khoirunnada.my.id/booking"
              type="url"
            />

            <TextareaField
              label="Catatan"
              value={note}
              onChange={setNote}
              placeholder="Tulis catatan penggunaan QR..."
              rows={4}
            />
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
            Catatan
          </p>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
            {note || DEFAULT_QR_BOOKING_SETTINGS.note}
          </p>
        </SectionCard>

        <div className="sticky bottom-4 z-20 rounded-[1.7rem] border border-amber-300/14 bg-black/75 p-3 shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <button
              type="button"
              onClick={handleResetDefault}
              disabled={isSaving}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-300 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Default
            </button>

            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/30 bg-amber-300 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black shadow-lg shadow-amber-300/15 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <SaveIcon className="h-4 w-4" />
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </AdminShell>
  );
}