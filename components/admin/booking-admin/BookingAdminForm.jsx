function SaveIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.75 4.75h8.7l2.8 2.8v9.7a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V6.75a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 4.75v5h6.5v-5M8.25 19.25v-5.5h7.5v5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "min-h-[3.1rem] w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-sm font-semibold text-white outline-none shadow-lg shadow-black/20 transition placeholder:text-slate-500 focus:border-amber-300/40 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]";

const textareaClass =
  "min-h-[7.5rem] w-full resize-none rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold leading-7 text-white outline-none shadow-lg shadow-black/20 transition placeholder:text-slate-500 focus:border-amber-300/40 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]";

export default function BookingAdminForm() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              Form Booking
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              Tambah Booking Manual
            </h2>
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <SaveIcon className="h-5 w-5" />
          </span>
        </div>

        <form className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nama Pengundang">
              <input
                type="text"
                placeholder="Nama lengkap pengundang"
                className={inputClass}
              />
            </Field>

            <Field label="Nomor WhatsApp">
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Jenis Layanan">
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Pilih layanan
                </option>
                <option value="Majelis Sholawat">Majelis Sholawat</option>
                <option value="Hadroh">Hadroh</option>
                <option value="Majelis & Hadroh">Majelis & Hadroh</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </Field>

            <Field label="Status Booking">
              <select className={inputClass} defaultValue="">
                <option value="" disabled>
                  Pilih status
                </option>
                <option value="Menunggu">Menunggu</option>
                <option value="Diproses">Diproses</option>
                <option value="Diterima">Diterima</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tanggal Acara">
              <input
                type="text"
                placeholder="Contoh: Ahad, 12 Mei 2026"
                className={inputClass}
              />
            </Field>

            <Field label="Waktu Acara">
              <input
                type="text"
                placeholder="Contoh: 19.30 WIB"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Lokasi Acara">
            <input
              type="text"
              placeholder="Nama lokasi / tempat acara"
              className={inputClass}
            />
          </Field>

          <Field label="Alamat Lengkap">
            <textarea
              placeholder="Tulis alamat lengkap acara..."
              className={textareaClass}
            />
          </Field>

          <Field label="Catatan Tambahan">
            <textarea
              placeholder="Catatan kebutuhan acara, konsep, atau informasi tambahan..."
              className={textareaClass}
            />
          </Field>

          <div className="rounded-2xl border border-amber-300/12 bg-amber-300/[0.055] px-4 py-3">
            <p className="text-xs font-semibold leading-6 text-amber-100">
              Catatan: untuk sementara form ini masih tampilan UI. Integrasi
              simpan booking bisa disambungkan nanti ke database atau API admin.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="relative flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] transition active:scale-[0.985]"
            >
              <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber-100/35" />
              <SaveIcon className="h-4 w-4" />
              Simpan Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}