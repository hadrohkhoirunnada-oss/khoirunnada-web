"use client";

import { useMemo, useState } from "react";
import EventTypeSelect from "@/components/booking/EventTypeSelect";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { bookingAdmins } from "@/data/bookingAdmins";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const initialForm = {
  name: "",
  whatsapp: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  location: "",
  notes: "",
};

const fieldClassName =
  "mt-3 min-h-13 w-full rounded-2xl border border-amber-300/14 bg-black/38 px-4 text-sm font-semibold text-white shadow-lg shadow-black/20 outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-amber-300/45 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]";

const textareaClassName =
  "mt-3 min-h-24 w-full resize-none rounded-2xl border border-amber-300/14 bg-black/38 px-4 py-3 text-sm font-semibold leading-7 text-white shadow-lg shadow-black/20 outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-amber-300/45 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]";

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
    >
      {children}
    </label>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m7.25 7.25 9.5 9.5M16.75 7.25l-9.5 9.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BackIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m14.25 6.75-5.5 5.25 5.5 5.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9.75 6.75 15.25 12l-5.5 5.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarFieldIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7.25 4.75v2.5M16.75 4.75v2.5M5.75 9.25h12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.75 6.25h10.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockFieldIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 6.75v5.35l3.15 1.85"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.25 12A8.25 8.25 0 1 1 3.75 12a8.25 8.25 0 0 1 16.5 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function FloatingBookingModal({ isOpen, onClose }) {
  const activeAdmins = useMemo(() => {
    return bookingAdmins.filter((admin) => admin.isActive);
  }, []);

  const [selectedAdminId, setSelectedAdminId] = useState("");
  const [form, setForm] = useState(initialForm);

  const selectedAdmin = useMemo(() => {
    return activeAdmins.find((admin) => admin.id === selectedAdminId);
  }, [activeAdmins, selectedAdminId]);

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const closeModal = () => {
    onClose();
    setSelectedAdminId("");
  };

  const buildMessage = () => {
    return `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Halo ${selectedAdmin?.name || "Admin Khoirunnada"}, saya ingin booking Khoirunnada.

Data Pemesan:
Nama: ${form.name}
No. WhatsApp: ${form.whatsapp}

Detail Acara:
Jenis Acara: ${form.eventType}
Tanggal: ${form.eventDate}
Waktu: ${form.eventTime || "-"}
Lokasi: ${form.location}

Catatan Tambahan:
${form.notes || "-"}

Mohon informasi ketersediaan jadwal dan detail administrasinya.

Terima kasih.
Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedAdmin?.whatsappNumber) {
      alert("Nomor WhatsApp admin belum tersedia.");
      return;
    }

    if (
      !form.name ||
      !form.whatsapp ||
      !form.eventType ||
      !form.eventDate ||
      !form.location
    ) {
      alert(
        "Mohon lengkapi nama, nomor WhatsApp, jenis acara, tanggal, dan lokasi."
      );
      return;
    }

    const whatsappUrl = buildWhatsAppUrl({
      phone: selectedAdmin.whatsappNumber,
      message: buildMessage(),
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center px-4 pb-5 pt-20">
      <button
        type="button"
        aria-label="Tutup popup booking"
        onClick={closeModal}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <section className="relative z-10 max-h-[82dvh] w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-amber-300/14 bg-[#05070d]/96 shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_44%,rgba(0,0,0,0.24))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

        <div className="relative z-10 flex max-h-[82dvh] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-amber-300/10 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                {selectedAdmin ? "Form Booking" : "Pilih Admin"}
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                {selectedAdmin
                  ? `Admin tujuan: ${selectedAdmin.label}`
                  : "Pilih admin yang ingin dihubungi."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeModal}
              aria-label="Tutup popup"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.96]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {!selectedAdmin ? (
            <div className="space-y-3 overflow-y-auto px-5 py-5">
              {activeAdmins.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => setSelectedAdminId(admin.id)}
                  className="group flex w-full items-center justify-between gap-4 rounded-[1.35rem] border border-amber-300/12 bg-black/30 p-4 text-left shadow-lg shadow-black/20 transition active:scale-[0.99]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/14 bg-emerald-400/10 text-[#25D366]">
                      <WhatsAppIcon className="h-6 w-6" />
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">
                        {admin.name}
                      </p>

                      <p className="mt-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-amber-300">
                        {admin.label}
                      </p>

                      {admin.description ? (
                        <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500">
                          {admin.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/35 text-amber-200 transition group-active:translate-x-0.5">
                    <ArrowIcon className="h-5 w-5" />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 overflow-y-auto px-5 py-5"
            >
              <button
                type="button"
                onClick={() => setSelectedAdminId("")}
                className="group relative flex min-h-[3.1rem] w-full items-center justify-center overflow-hidden rounded-2xl border border-amber-300/18 bg-black/38 px-4 text-xs font-extrabold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.22))]" />
                <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

                <span className="relative flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
                    <BackIcon className="h-4 w-4" />
                  </span>
                  Ganti Admin
                </span>
              </button>

              <div>
                <FieldLabel htmlFor="floating-name">Nama Pemesan</FieldLabel>

                <input
                  id="floating-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Nama lengkap"
                  className={fieldClassName}
                />
              </div>

              <div>
                <FieldLabel htmlFor="floating-whatsapp">
                  Nomor WhatsApp
                </FieldLabel>

                <input
                  id="floating-whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(event) =>
                    updateForm("whatsapp", event.target.value)
                  }
                  placeholder="Contoh: 6281234567890"
                  className={fieldClassName}
                />
              </div>

              <EventTypeSelect
                value={form.eventType}
                onChange={(value) => updateForm("eventType", value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel htmlFor="floating-event-date">Tanggal</FieldLabel>

                  <div className="relative mt-3 overflow-hidden rounded-2xl border border-amber-300/14 bg-black/38 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/45 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.18))]" />
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

                    <input
                      id="floating-event-date"
                      type="date"
                      value={form.eventDate}
                      onChange={(event) =>
                        updateForm("eventDate", event.target.value)
                      }
                      className="relative z-10 min-h-13 w-full bg-transparent px-3.5 pr-11 text-[0.82rem] font-extrabold tracking-[-0.03em] text-white outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/14 bg-black/35 text-amber-100 shadow-inner shadow-black/25">
                      <CalendarFieldIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="floating-event-time">Waktu</FieldLabel>

                  <div className="relative mt-3 overflow-hidden rounded-2xl border border-amber-300/14 bg-black/38 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/45 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.18))]" />
                    <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

                    <input
                      id="floating-event-time"
                      type="time"
                      value={form.eventTime}
                      onChange={(event) =>
                        updateForm("eventTime", event.target.value)
                      }
                      className="relative z-10 min-h-13 w-full bg-transparent px-3.5 pr-11 text-[0.9rem] font-extrabold tracking-[-0.03em] text-white outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/14 bg-black/35 text-amber-100 shadow-inner shadow-black/25">
                      <ClockFieldIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="floating-location">Lokasi Acara</FieldLabel>

                <textarea
                  id="floating-location"
                  value={form.location}
                  onChange={(event) =>
                    updateForm("location", event.target.value)
                  }
                  placeholder="Alamat lengkap lokasi acara"
                  className={textareaClassName}
                />
              </div>

              <div>
                <FieldLabel htmlFor="floating-notes">
                  Catatan Tambahan
                </FieldLabel>

                <textarea
                  id="floating-notes"
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  placeholder="Contoh: Request Lagu, Sholawat, dll."
                  className={`${textareaClassName} min-h-28`}
                />
              </div>

              <button
                type="submit"
                className="group relative flex min-h-[3.35rem] w-full items-center justify-center overflow-hidden rounded-2xl border border-amber-300/18 bg-black/38 px-4 text-sm font-extrabold text-white shadow-lg shadow-black/25 backdrop-blur-2xl transition active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,197,66,0.14),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.22))]" />
                <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

                <span className="relative flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-black/35 text-amber-200">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  Kirim ke WhatsApp
                </span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}