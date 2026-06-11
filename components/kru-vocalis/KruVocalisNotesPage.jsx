"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

const NOTE_CATEGORIES = [
  "Umum",
  "Nada",
  "Irama",
  "Tugas",
  "Latihan",
  "Majelis",
];

function NoteIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 4.75h7.1L18.75 9v10.25h-11.5V4.75Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 4.95V9.2h4.1M9.5 12.25h5M9.5 15.25h4"
        stroke="currentColor"
        strokeWidth="1.75"
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
        d="M5.25 4.75h11.2l2.3 2.3v12.2H5.25V4.75Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 4.95v5.3h6.5v-5.3M8.25 19.05v-5.3h7.5v5.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 16.25a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m15 15 4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5.75v12.5M5.75 12h12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 8.75v9M12 8.75v9M15.75 8.75v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5.75 6.25h12.5M9.5 6.25l.75-2h3.5l.75 2M7.25 6.25l.7 13h8.1l.7-13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.64rem] font-black uppercase tracking-[0.24em] text-amber-300/90">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "min-h-[3.25rem] w-full rounded-2xl border border-amber-300/12 bg-black/34 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-amber-300/42 focus:bg-black/50";

export default function KruVocalisNotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Umum");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [notes, searchQuery]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Judul catatan wajib diisi.");
      return;
    }

    if (!content.trim()) {
      setMessage("Isi catatan wajib diisi.");
      return;
    }

    const nextNote = {
      id: `note-${Date.now()}`,
      title: title.trim(),
      category,
      content: content.trim(),
      createdAt: "Baru saja",
    };

    setNotes((current) => [nextNote, ...current]);
    setTitle("");
    setCategory("Umum");
    setContent("");
    setMessage(
      "Catatan berhasil ditambahkan sementara di frontend. Penyimpanan permanen akan aktif setelah backend Kru/Vocalis disambungkan."
    );
  }

  function handleDeleteNote(noteId) {
    setNotes((current) => current.filter((note) => note.id !== noteId));
    setMessage("Catatan sementara berhasil dihapus.");
  }

  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/16 bg-[#15120b] text-amber-200 shadow-inner shadow-black/25">
            <NoteIcon className="h-8 w-8" />
          </span>

          <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Catatan Kru
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            Catatan Latihan
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Simpan catatan nada, irama, tugas latihan, dan kebutuhan pribadi
            anggota Kru/Vocalis.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[1.45rem] border border-amber-300/12 bg-black/30 px-3 py-4">
              <p className="text-2xl font-black tracking-[-0.06em] text-white">
                {notes.length}
              </p>
              <p className="mt-1 text-[0.56rem] font-black uppercase tracking-[0.16em] text-amber-300/75">
                Catatan
              </p>
            </div>

            <div className="rounded-[1.45rem] border border-amber-300/12 bg-black/30 px-3 py-4">
              <p className="text-2xl font-black tracking-[-0.06em] text-white">
                0
              </p>
              <p className="mt-1 text-[0.56rem] font-black uppercase tracking-[0.16em] text-amber-300/75">
                Backend
              </p>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <section className="rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
              <PlusIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
                Tambah Catatan
              </p>
              <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
                Catatan Baru
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <Field label="Judul Catatan">
              <input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setMessage("");
                }}
                placeholder="Contoh: Nada Ya Hanana"
                className={inputClassName}
              />
            </Field>

            <Field label="Kategori">
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setMessage("");
                }}
                className={`${inputClassName} appearance-none`}
              >
                {NOTE_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Isi Catatan">
              <textarea
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                  setMessage("");
                }}
                placeholder="Tulis catatan latihan di sini..."
                rows={5}
                className={`${inputClassName} resize-none py-4 leading-6`}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-5 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985]"
          >
            <SaveIcon className="h-4 w-4" />
            Simpan Catatan
          </button>
        </section>
      </form>

      <section className="mt-5 rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
            <SearchIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
              Daftar Catatan
            </p>
            <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
              Catatan Tersimpan
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 transition focus-within:border-amber-300/40">
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
            <SearchIcon className="h-4 w-4" />
          </span>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari catatan latihan..."
            className="relative z-10 min-h-[3.25rem] w-full bg-transparent px-4 pl-14 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
          />
        </div>

        {filteredNotes.length > 0 ? (
          <div className="mt-4 space-y-3">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-[1.55rem] border border-amber-300/10 bg-black/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-amber-300/75">
                      {note.category} • {note.createdAt}
                    </p>

                    <h3 className="mt-2 text-base font-black tracking-[-0.045em] text-white">
                      {note.title}
                    </h3>

                    <p className="mt-2 text-xs font-semibold leading-6 text-slate-400">
                      {note.content}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-300/10 bg-red-500/10 text-red-200 active:scale-95"
                    aria-label="Hapus catatan"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.65rem] border border-amber-300/10 bg-black/28 px-4 py-7 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
              <NoteIcon className="h-7 w-7" />
            </span>

            <h3 className="mt-5 text-xl font-black tracking-[-0.055em] text-white">
              Belum Ada Catatan
            </h3>

            <p className="mx-auto mt-3 max-w-[16rem] text-sm font-semibold leading-6 text-slate-500">
              Catatan latihan yang dibuat sementara akan muncul di sini sebelum
              backend disambungkan.
            </p>
          </div>
        )}
      </section>

      {message ? (
        <p className="mt-5 rounded-2xl border border-amber-300/16 bg-amber-300/10 px-4 py-3 text-center text-xs font-bold leading-6 text-amber-100">
          {message}
        </p>
      ) : null}

      <Link
        href="/kru-vocalis"
        className="mt-5 flex min-h-[3rem] w-full items-center justify-center rounded-2xl border border-amber-300/10 bg-black/20 px-5 text-sm font-black text-slate-400 active:scale-[0.985]"
      >
        Kembali ke Profil
      </Link>
    </PageContainer>
  );
}