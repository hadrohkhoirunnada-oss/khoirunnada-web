"use client";

import { useEffect, useState } from "react";
import {
  createQasidahItem,
  createSlugFromTitle,
  DEFAULT_QASIDAH_FORM_DATA,
  normalizeQasidahSlug,
  updateQasidahItem,
} from "@/services/qasidahService";

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

function ResetIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.25 12A6.75 6.75 0 1 0 7.2 7.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4.75 5.25v4.5h4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m7.75 9.75 4.25 4.25 4.25-4.25"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({ label, helper, children }) {
  return (
    <div>
      <label className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
        {label}
      </label>

      <div className="mt-2">{children}</div>

      {helper ? (
        <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function CustomSelect({ placeholder, options = [], value = "", onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex min-h-[3.15rem] w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left text-sm font-semibold outline-none shadow-lg shadow-black/20 transition ${
          isOpen
            ? "border-amber-300/40 bg-black/45 shadow-[0_0_0_3px_rgba(245,197,66,0.07)]"
            : "border-amber-300/12 bg-black/35"
        }`}
      >
        <span className={selectedOption ? "text-white" : "text-slate-500"}>
          {selectedOption?.label || placeholder}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/12 bg-black/35 text-amber-200 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronIcon className="h-4 w-4" />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-amber-300/16 bg-[#070707] p-1.5 shadow-2xl shadow-black/50">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition active:scale-[0.99] ${
                  isSelected
                    ? "bg-amber-300/12 text-amber-100"
                    : "text-slate-300 hover:bg-white/[0.045] hover:text-white"
                }`}
              >
                {option.label}

                {isSelected ? (
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

const inputClass =
  "min-h-[3.15rem] w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-sm font-semibold text-white outline-none shadow-lg shadow-black/20 transition placeholder:text-slate-500 focus:border-amber-300/40 focus:bg-black/45 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]";

const textareaClass =
  "min-h-[8rem] w-full resize-none rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold leading-7 text-white outline-none shadow-lg shadow-black/20 transition placeholder:text-slate-500 focus:border-amber-300/40 focus:bg-black/45 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]";

const lyricsCategoryOptions = [
  { value: "qosidah-umum", label: "Qosidah Umum" },
  { value: "qosidah-jawa", label: "Qosidah Jawa" },
  { value: "wirid-lengkap", label: "Wirid Lengkap" },
  { value: "maulid-lengkap", label: "Maulid Lengkap" },
  { value: "qosidah-yamani", label: "Qosidah Yamani" },
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Tampilkan" },
];

function getInitialFormData() {
  return {
    ...DEFAULT_QASIDAH_FORM_DATA,
    status: "draft",
  };
}

function getCategoryLabelByValue(value = "") {
  return (
    lyricsCategoryOptions.find((option) => option.value === value)?.label || ""
  );
}

function getCategoryValueFromItem(item = {}) {
  const qasidahCategory = item.qasidahCategory || "";

  if (lyricsCategoryOptions.some((option) => option.value === qasidahCategory)) {
    return qasidahCategory;
  }

  const categoryLabel = String(item.category || "").toLowerCase();

  return (
    lyricsCategoryOptions.find(
      (option) => option.label.toLowerCase() === categoryLabel
    )?.value || ""
  );
}

function getFormDataFromItem(item) {
  if (!item) {
    return getInitialFormData();
  }

  const qasidahCategory = getCategoryValueFromItem(item);
  const category = getCategoryLabelByValue(qasidahCategory);

  return {
    title: item.title || "",
    slug: item.slug || "",
    category,
    qasidahCategory,
    status: item.status || "draft",
    order: item.order || "",
    shortDescription: item.shortDescription || "",
    arabicText: item.arabicText || "",
    latinText: item.latinText || "",
    translationText: item.translationText || "",
  };
}

export default function QasidahForm({
  editingItem = null,
  reservedSlugs = [],
  onCreated,
  onUpdated,
  onCancelEdit,
}) {
  const isEditMode = Boolean(editingItem?.id && editingItem?.source === "firestore");

  const [formData, setFormData] = useState(getInitialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    if (!editingItem) {
      setFormData(getInitialFormData());
      return;
    }

    setFormData(getFormDataFromItem(editingItem));
    setMessage({
      type: "info",
      text: `Sedang mengedit "${editingItem.title}".`,
    });
  }, [editingItem]);

  const updateField = (fieldName, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setFormData((currentData) => ({
      ...currentData,
      title,
      slug: currentData.slug ? currentData.slug : createSlugFromTitle(title),
    }));
  };

  const handleSlugChange = (event) => {
    updateField("slug", normalizeQasidahSlug(event.target.value));
  };

  const handleCategoryChange = (categoryValue) => {
    setFormData((currentData) => ({
      ...currentData,
      category: getCategoryLabelByValue(categoryValue),
      qasidahCategory: categoryValue,
    }));
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setMessage({
      type: "",
      text: "",
    });
    onCancelEdit?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage({
      type: "",
      text: "",
    });

    try {
      if (isEditMode) {
        await updateQasidahItem(editingItem.id, formData, {
          reservedSlugs,
        });

        setMessage({
          type: "success",
          text: "Qasidah berhasil diperbarui di database.",
        });

        setFormData(getInitialFormData());
        onUpdated?.();
        return;
      }

      await createQasidahItem(formData, {
        reservedSlugs,
      });

      setFormData(getInitialFormData());
      setMessage({
        type: "success",
        text: "Qasidah berhasil disimpan ke database.",
      });

      onCreated?.();
    } catch (error) {
      console.error("Gagal menyimpan qasidah:", error);

      setMessage({
        type: "error",
        text: error.message || "Gagal menyimpan qasidah.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative rounded-[1.85rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.055)]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              {isEditMode ? "Edit Qasidah" : "Form Qasidah"}
            </p>

            <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              {isEditMode ? "Update Data Qasidah" : "Tambah Data Baru"}
            </h2>
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <SaveIcon className="h-5 w-5" />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-4">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
              Informasi Utama
            </p>

            <Field label="Judul" helper="Nama qasidah yang tampil di halaman lirik.">
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Contoh: Maulid Diba'i"
                className={inputClass}
              />
            </Field>

            <Field label="Slug" helper="Gunakan huruf kecil dan tanda strip.">
              <input
                type="text"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="contoh: maulid-dibai"
                className={inputClass}
              />
            </Field>

            <Field label="Kategori Bacaan">
              <CustomSelect
                placeholder="Pilih kategori bacaan"
                options={lyricsCategoryOptions}
                value={formData.qasidahCategory}
                onChange={handleCategoryChange}
              />
            </Field>

            <Field label="Status Tampil">
              <CustomSelect
                placeholder="Pilih status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => updateField("status", value)}
              />
            </Field>

            <Field label="Urutan">
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(event) => updateField("order", event.target.value)}
                placeholder="Contoh: 1"
                className={inputClass}
              />
            </Field>

            <Field label="Deskripsi Singkat">
              <textarea
                value={formData.shortDescription}
                onChange={(event) =>
                  updateField("shortDescription", event.target.value)
                }
                placeholder="Tulis deskripsi singkat qasidah..."
                className={`${textareaClass} min-h-[6.5rem]`}
              />
            </Field>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />

          <div className="space-y-4">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
              Isi Bacaan
            </p>

            <Field label="Teks Arab">
              <textarea
                dir="rtl"
                lang="ar"
                value={formData.arabicText}
                onChange={(event) => updateField("arabicText", event.target.value)}
                placeholder="اكتب النص العربي هنا..."
                className={`${textareaClass} font-arabic text-right text-lg leading-9`}
              />
            </Field>

            <Field label="Latin">
              <textarea
                value={formData.latinText}
                onChange={(event) => updateField("latinText", event.target.value)}
                placeholder="Tulis latin di sini..."
                className={textareaClass}
              />
            </Field>

            <Field label="Terjemahan">
              <textarea
                value={formData.translationText}
                onChange={(event) =>
                  updateField("translationText", event.target.value)
                }
                placeholder="Tulis terjemahan di sini..."
                className={textareaClass}
              />
            </Field>
          </div>

          {message.text ? (
            <div
              className={`rounded-2xl border px-4 py-3 ${
                message.type === "success"
                  ? "border-emerald-400/14 bg-emerald-400/10"
                  : message.type === "info"
                    ? "border-amber-300/14 bg-amber-300/10"
                    : "border-red-400/14 bg-red-500/10"
              }`}
            >
              <p
                className={`text-xs font-semibold leading-6 ${
                  message.type === "success"
                    ? "text-emerald-100"
                    : message.type === "info"
                      ? "text-amber-100"
                      : "text-red-100"
                }`}
              >
                {message.text}
              </p>
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
            <button
              type="button"
              onClick={resetForm}
              disabled={isSaving}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-300/12 bg-black/35 px-5 text-sm font-extrabold text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ResetIcon className="h-4 w-4" />
              {isEditMode ? "Batal Edit" : "Reset"}
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="relative flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#6b5115_0%,#493407_48%,#1f1503_100%)] px-5 text-sm font-black text-amber-100 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.18)] transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber-100/28" />
              <SaveIcon className="h-4 w-4" />
              {isSaving
                ? isEditMode
                  ? "Mengupdate..."
                  : "Menyimpan..."
                : isEditMode
                  ? "Update Qasidah"
                  : "Simpan Qasidah"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}