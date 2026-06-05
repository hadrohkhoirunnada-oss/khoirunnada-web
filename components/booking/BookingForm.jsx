"use client";

import { useMemo, useState } from "react";
import BookingAdminSelect from "@/components/booking/BookingAdminSelect";
import EventTypeSelect from "@/components/booking/EventTypeSelect";
import BookingSuccessHint from "@/components/booking/BookingSuccessHint";
import { bookingAdmins } from "@/data/bookingAdmins";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const initialForm = {
  name: "",
  whatsapp: "",
  eventType: "",
  otherEventType: "",
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

function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.25a7.58 7.58 0 0 0-6.5 11.47l-.72 3.5 3.58-.83A7.58 7.58 0 1 0 12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35 8.85c.18-.4.36-.42.58-.42h.45c.15 0 .36.05.55.43.2.38.65 1.3.7 1.4.05.1.08.23.02.36-.07.14-.1.22-.22.35l-.33.38c-.1.12-.22.24-.1.45.12.22.55.9 1.18 1.45.82.73 1.48.96 1.7 1.07.22.1.35.08.48-.05.15-.17.55-.65.7-.88.15-.22.3-.18.5-.1.22.08 1.36.64 1.6.76.23.12.38.18.43.28.05.1.05.58-.13 1.13-.18.55-1.05 1.05-1.45 1.1-.38.05-.88.08-2.84-.75-2.4-1.02-3.92-3.5-4.04-3.66-.12-.15-.96-1.27-.96-2.42 0-1.15.6-1.72.82-1.95.2-.23.45-.3.6-.3"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarFieldIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

export default function BookingForm() {
  const activeAdmins = useMemo(() => {
    return bookingAdmins.filter((admin) => admin.isActive);
  }, []);

  const firstAdmin = activeAdmins[0];

  const [selectedAdminId, setSelectedAdminId] = useState(firstAdmin?.id || "");
  const [form, setForm] = useState(initialForm);

  const selectedAdmin = useMemo(() => {
    return (
      activeAdmins.find((admin) => admin.id === selectedAdminId) || firstAdmin
    );
  }, [activeAdmins, selectedAdminId, firstAdmin]);

  const isOtherEventType = form.eventType === "Lainnya";

  const updateForm = (field, value) => {
    setForm((current) => {
      const nextForm = {
        ...current,
        [field]: value,
      };

      if (field === "eventType" && value !== "Lainnya") {
        nextForm.otherEventType = "";
      }

      return nextForm;
    });
  };

  const getEventTypeText = () => {
    if (!isOtherEventType) {
      return form.eventType;
    }

    const otherEventType = form.otherEventType.trim();

    return otherEventType ? `Lainnya - ${otherEventType}` : "Lainnya";
  };

  const buildMessage = () => {
    return `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Halo ${selectedAdmin?.name || "Admin Khoirunnada"}, saya ingin booking Khoirunnada.

Data Pemesan:
Nama: ${form.name}
No. WhatsApp: ${form.whatsapp}

Detail Acara:
Jenis Acara: ${getEventTypeText()}
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
      (isOtherEventType && !form.otherEventType.trim()) ||
      !form.eventDate ||
      !form.location
    ) {
      alert(
        "Mohon lengkapi nama, nomor WhatsApp, jenis acara, tanggal, dan lokasi. Jika memilih Lainnya, isi juga detail jenis acaranya."
      );
      return;
    }

    const whatsappUrl = buildWhatsAppUrl({
      phone: selectedAdmin.whatsappNumber,
      message: buildMessage(),
    });

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="space-y-7">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[1.9rem] border border-amber-300/18 bg-white/[0.055] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-[10px]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.025)_34%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.24))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.14),transparent_44%)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(245,197,66,0.08)]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 top-px h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <div className="relative z-10 space-y-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              Form Booking
            </p>

            <h2 className="mt-4 text-[1.4rem] font-extrabold leading-tight tracking-[-0.045em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.78)]">
              Isi data undangan
            </h2>

            <p className="mt-4 text-sm font-medium leading-7 text-slate-100/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.72)]">
              Data ini hanya digunakan untuk menyusun pesan WhatsApp ke admin.
            </p>
          </div>

          <BookingAdminSelect
            admins={bookingAdmins}
            selectedAdminId={selectedAdminId}
            onChange={setSelectedAdminId}
          />

          <div>
            <FieldLabel htmlFor="name">Nama Pemesan</FieldLabel>

            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Nama lengkap"
              className={fieldClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="whatsapp">Nomor WhatsApp</FieldLabel>

            <input
              id="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={(event) => updateForm("whatsapp", event.target.value)}
              placeholder="Contoh: 6281234567890"
              className={fieldClassName}
            />
          </div>

          <EventTypeSelect
            value={form.eventType}
            onChange={(value) => updateForm("eventType", value)}
          />

          {isOtherEventType ? (
            <div>
              <FieldLabel htmlFor="other-event-type">
                Jenis Acara Lainnya
              </FieldLabel>

              <input
                id="other-event-type"
                type="text"
                value={form.otherEventType}
                onChange={(event) =>
                  updateForm("otherEventType", event.target.value)
                }
                placeholder="Contoh: Haul, Aqiqah, Tasyakuran keluarga"
                className={fieldClassName}
              />
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="event-date">Tanggal</FieldLabel>

              <div className="relative mt-3 overflow-hidden rounded-2xl border border-amber-300/14 bg-black/38 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/45 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.18))]" />
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

                <input
                  id="event-date"
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
              <FieldLabel htmlFor="event-time">Waktu</FieldLabel>

              <div className="relative mt-3 overflow-hidden rounded-2xl border border-amber-300/14 bg-black/38 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/45 focus-within:bg-black/48 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.08)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.18))]" />
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

                <input
                  id="event-time"
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
            <FieldLabel htmlFor="location">Lokasi Acara</FieldLabel>

            <textarea
              id="location"
              value={form.location}
              onChange={(event) => updateForm("location", event.target.value)}
              placeholder="Alamat lengkap lokasi acara"
              className={textareaClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="notes">Catatan Tambahan</FieldLabel>

            <textarea
              id="notes"
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
              Lanjut
            </span>
          </button>
        </div>
      </form>

      <div className="pt-1">
        <BookingSuccessHint />
      </div>
    </section>
  );
}