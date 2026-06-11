"use client";

import { useEffect, useRef, useState } from "react";
import {
  createGalleryItem,
  updateGalleryItem,
} from "@/services/galleryService";

const CATEGORY_OPTIONS = [
  "Majelis",
  "Hadroh",
  "Sholawat",
  "Kegiatan",
  "Dokumentasi",
  "Acara",
  "Latihan",
];

const HIGHLIGHT_LIMIT = 10;

function UploadIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 15.25V4.75M8.25 8.5 12 4.75 15.75 8.5M5.75 19.25h12.5"
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

function ImageIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5.75 5.25h12.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m4.75 16 3.5-3.25 2.25 2.1 3.75-4.1 5 5.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.75h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
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

function StarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m12 4.75 2.05 4.15 4.58.67-3.32 3.23.78 4.57L12 15.22l-4.09 2.15.78-4.57-3.32-3.23 4.58-.67L12 4.75Z"
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

const emptyFormData = {
  title: "",
  category: "",
  imageUrl: "",
  description: "",
  order: "",
  isHighlight: false,
};

export default function GalleryForm() {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(emptyFormData);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [highlightStats, setHighlightStats] = useState({
    count: 0,
    limit: HIGHLIGHT_LIMIT,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(editingItem?.id);
  const currentPreviewUrl = previewUrl || (isEditMode ? formData.imageUrl : "");
  const highlightCount = Number(highlightStats.count || 0);
  const highlightLimit = Number(highlightStats.limit || HIGHLIGHT_LIMIT);
  const isOriginalHighlight = Boolean(editingItem?.isHighlight);
  const isHighlightFull = highlightCount >= highlightLimit;
  const isHighlightCheckboxDisabled =
    !isOriginalHighlight && !formData.isHighlight && isHighlightFull;

  useEffect(() => {
    function handleStartEdit(event) {
      const item = event.detail?.item;

      if (!item?.id) {
        return;
      }

      setEditingItem(item);
      setSelectedFile(null);
      setPreviewUrl("");
      setFormData({
        title: item.title || "",
        category: item.category || "",
        imageUrl: item.imageUrl || item.image || "",
        description: item.description || "",
        order: Number.isFinite(Number(item.order)) ? String(item.order) : "",
        isHighlight: Boolean(item.isHighlight),
      });
      setMessageType("info");
      setMessage("Mode edit aktif. Ubah data lalu klik Simpan Perubahan.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    function handleDeleted(event) {
      const deletedId = event.detail?.id;

      if (deletedId && editingItem?.id === deletedId) {
        resetForm();
      }
    }

    function handleHighlightStats(event) {
      setHighlightStats({
        count: Number(event.detail?.count || 0),
        limit: Number(event.detail?.limit || HIGHLIGHT_LIMIT),
      });
    }

    window.addEventListener("khoirunnada-gallery-edit", handleStartEdit);
    window.addEventListener("khoirunnada-gallery-deleted", handleDeleted);
    window.addEventListener(
      "khoirunnada-gallery-highlight-stats",
      handleHighlightStats
    );

    window.dispatchEvent(
      new CustomEvent("khoirunnada-gallery-highlight-stats-request")
    );

    return () => {
      window.removeEventListener("khoirunnada-gallery-edit", handleStartEdit);
      window.removeEventListener("khoirunnada-gallery-deleted", handleDeleted);
      window.removeEventListener(
        "khoirunnada-gallery-highlight-stats",
        handleHighlightStats
      );
    };
  }, [editingItem?.id]);

  function updateField(fieldName, value) {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));

    setMessage("");
  }

  function resetForm() {
    setFormData(emptyFormData);
    setEditingItem(null);
    setSelectedFile(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleCancelEdit() {
    resetForm();
    setMessageType("info");
    setMessage("Mode edit dibatalkan. Form kembali ke mode tambah galeri.");
  }

  function handleHighlightChange(event) {
    const nextIsHighlight = event.target.checked;

    if (nextIsHighlight && !isOriginalHighlight && isHighlightFull) {
      setMessageType("error");
      setMessage(
        `Highlight sudah penuh (${highlightCount}/${highlightLimit}). Hapus centang salah satu galeri highlight terlebih dahulu.`
      );
      return;
    }

    updateField("isHighlight", nextIsHighlight);
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;

    setSelectedFile(file);
    setMessage("");

    if (!file) {
      setPreviewUrl("");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setSelectedFile(null);
      setPreviewUrl("");
      setMessageType("error");
      setMessage("Format gambar harus JPG, PNG, atau WEBP.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null);
      setPreviewUrl("");
      setMessageType("error");
      setMessage("Ukuran gambar maksimal 5 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  async function uploadGalleryImage(file) {
    const uploadFormData = new FormData();

    uploadFormData.append("image", file);

    const response = await fetch("/api/gallery/upload-image", {
      method: "POST",
      body: uploadFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Gagal upload gambar galeri.");
    }

    return result;
  }

  async function deleteSupabaseImage(imagePath) {
    const cleanImagePath = String(imagePath || "").trim();

    if (!cleanImagePath) {
      return;
    }

    const response = await fetch("/api/gallery/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imagePath: cleanImagePath }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message || "Gagal menghapus gambar lama dari Supabase."
      );
    }
  }

  function dispatchGalleryCreated(item) {
    window.dispatchEvent(
      new CustomEvent("khoirunnada-gallery-created", {
        detail: { item },
      })
    );
  }

  function dispatchGalleryUpdated(item) {
    window.dispatchEvent(
      new CustomEvent("khoirunnada-gallery-updated", {
        detail: { item },
      })
    );
  }

  async function handleCreateGallery({
    title,
    category,
    description,
    manualImageUrl,
    order,
    isHighlight,
  }) {
    let imagePayload = {
      imageUrl: manualImageUrl,
      imagePath: "",
      imageProvider: manualImageUrl ? "manual-url" : "",
      imageOriginalName: "",
      imageContentType: "",
      imageSize: 0,
    };

    if (selectedFile) {
      imagePayload = await uploadGalleryImage(selectedFile);
    }

    const createdItem = await createGalleryItem({
      title,
      category,
      description,
      imageUrl: imagePayload.imageUrl,
      imagePath: imagePayload.imagePath,
      imageProvider: imagePayload.imageProvider || "supabase",
      imageOriginalName: imagePayload.imageOriginalName,
      imageContentType: imagePayload.imageContentType,
      imageSize: imagePayload.imageSize,
      isHighlight,
      order,
      status: "published",
    });

    dispatchGalleryCreated({
      id: createdItem.id,
      title,
      category,
      description:
        description || "Dokumentasi kegiatan Khoirunnada Majelis Sholawat.",
      imageUrl: imagePayload.imageUrl,
      image: imagePayload.imageUrl,
      imagePath: imagePayload.imagePath || "",
      imageProvider: imagePayload.imageProvider || "supabase",
      imageOriginalName: imagePayload.imageOriginalName || "",
      imageContentType: imagePayload.imageContentType || "",
      imageSize: Number(imagePayload.imageSize || 0),
      isHighlight,
      order,
      status: "published",
      createdAt: new Date().toISOString(),
      createdAtMillis: Date.now(),
    });

    resetForm();

    setMessageType("success");
    setMessage("Galeri berhasil disimpan dan langsung masuk ke tabel admin.");
  }

  async function handleUpdateGallery({
    title,
    category,
    description,
    manualImageUrl,
    order,
    isHighlight,
  }) {
    const galleryId = String(editingItem?.id || "").trim();
    const oldImagePath = editingItem?.imagePath || "";
    const manualUrlChanged =
      !selectedFile && manualImageUrl !== (editingItem?.imageUrl || "");

    let imagePayload = {
      imageUrl: manualImageUrl,
      imagePath: editingItem?.imagePath || "",
      imageProvider: editingItem?.imageProvider || "",
      imageOriginalName: editingItem?.imageOriginalName || "",
      imageContentType: editingItem?.imageContentType || "",
      imageSize: editingItem?.imageSize || 0,
    };

    let shouldDeleteOldImage = false;

    if (selectedFile) {
      imagePayload = await uploadGalleryImage(selectedFile);
      shouldDeleteOldImage = Boolean(oldImagePath);
    } else if (manualUrlChanged) {
      imagePayload = {
        imageUrl: manualImageUrl,
        imagePath: "",
        imageProvider: "manual-url",
        imageOriginalName: "",
        imageContentType: "",
        imageSize: 0,
      };
      shouldDeleteOldImage = Boolean(oldImagePath);
    }

    const updatedItem = await updateGalleryItem(galleryId, {
      title,
      category,
      description,
      imageUrl: imagePayload.imageUrl,
      imagePath: imagePayload.imagePath,
      imageProvider: imagePayload.imageProvider || "supabase",
      imageOriginalName: imagePayload.imageOriginalName,
      imageContentType: imagePayload.imageContentType,
      imageSize: imagePayload.imageSize,
      isHighlight,
      order,
      status: editingItem?.status || "published",
    });

    if (
      shouldDeleteOldImage &&
      oldImagePath &&
      oldImagePath !== imagePayload.imagePath
    ) {
      try {
        await deleteSupabaseImage(oldImagePath);
      } catch (deleteError) {
        console.error(
          "Data galeri sudah update, tapi gambar lama gagal dihapus:",
          deleteError
        );
      }
    }

    dispatchGalleryUpdated({
      ...editingItem,
      ...updatedItem,
      title,
      category,
      description:
        description || "Dokumentasi kegiatan Khoirunnada Majelis Sholawat.",
      imageUrl: imagePayload.imageUrl,
      image: imagePayload.imageUrl,
      imagePath: imagePayload.imagePath || "",
      imageProvider: imagePayload.imageProvider || "supabase",
      imageOriginalName: imagePayload.imageOriginalName || "",
      imageContentType: imagePayload.imageContentType || "",
      imageSize: Number(imagePayload.imageSize || 0),
      isHighlight,
      order,
      status: editingItem?.status || "published",
    });

    resetForm();

    setMessageType("success");
    setMessage("Galeri berhasil diperbarui dan tabel admin ikut berubah.");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const title = formData.title.trim();
    const category = formData.category.trim();
    const description = formData.description.trim();
    const manualImageUrl = formData.imageUrl.trim();
    const order = formData.order ? Number(formData.order) : 9999;
    const isHighlight = Boolean(formData.isHighlight);
    const isNewHighlight = isHighlight && !isOriginalHighlight;

    if (!title) {
      setMessageType("error");
      setMessage("Judul foto wajib diisi.");
      return;
    }

    if (!category) {
      setMessageType("error");
      setMessage("Kategori wajib dipilih.");
      return;
    }

    if (!selectedFile && !manualImageUrl) {
      setMessageType("error");
      setMessage("Upload gambar atau isi URL gambar terlebih dahulu.");
      return;
    }

    if (isNewHighlight && isHighlightFull) {
      setMessageType("error");
      setMessage(
        `Highlight sudah penuh (${highlightCount}/${highlightLimit}). Hapus centang salah satu galeri highlight terlebih dahulu.`
      );
      return;
    }

    setIsSubmitting(true);
    setMessageType("info");
    setMessage(isEditMode ? "Menyimpan perubahan..." : "Menyimpan galeri...");

    try {
      if (isEditMode) {
        await handleUpdateGallery({
          title,
          category,
          description,
          manualImageUrl,
          order,
          isHighlight,
        });
      } else {
        await handleCreateGallery({
          title,
          category,
          description,
          manualImageUrl,
          order,
          isHighlight,
        });
      }
    } catch (error) {
      console.error("Gagal menyimpan galeri:", error);

      setMessageType("error");
      setMessage(error?.message || "Gagal menyimpan galeri.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={formRef}
      id="gallery-form-section"
      className={`relative overflow-hidden rounded-[1.75rem] border p-5 shadow-xl shadow-black/25 backdrop-blur-xl ${
        isEditMode
          ? "border-amber-300/30 bg-amber-300/[0.045]"
          : "border-amber-300/14 bg-black/34"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              {isEditMode ? "Edit Galeri" : "Form Galeri"}
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              {isEditMode ? "Edit Dokumentasi" : "Tambah Dokumentasi"}
            </h2>
          </div>

          {isEditMode ? (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-slate-300 shadow-inner shadow-black/25 active:scale-95"
              aria-label="Batal edit galeri"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
              <UploadIcon className="h-5 w-5" />
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Judul Foto">
              <input
                type="text"
                value={formData.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Contoh: Dokumentasi Majelis"
                className={inputClass}
              />
            </Field>

            <Field label="Kategori">
              <select
                value={formData.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={isEditMode ? "Ganti Gambar" : "Upload Gambar"}>
            <div className="relative overflow-hidden rounded-[1.35rem] border border-dashed border-amber-300/20 bg-black/28 p-4 text-center shadow-lg shadow-black/20">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 z-20 cursor-pointer opacity-0"
                aria-label="Upload gambar galeri"
              />

              {currentPreviewUrl ? (
                <div className="relative z-10 overflow-hidden rounded-2xl border border-amber-300/12 bg-black/40">
                  <img
                    src={currentPreviewUrl}
                    alt="Preview gambar galeri"
                    className="h-44 w-full object-cover"
                  />
                  <p className="px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-amber-200">
                    Klik area ini untuk {isEditMode ? "ganti gambar" : "pilih gambar lain"}
                  </p>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center py-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200">
                    <ImageIcon className="h-7 w-7" />
                  </span>

                  <p className="mt-4 text-sm font-black text-white">
                    Pilih Gambar Galeri
                  </p>

                  <p className="mt-2 text-xs font-semibold leading-6 text-slate-500">
                    Format JPG, PNG, atau WEBP. Maksimal 5 MB.
                  </p>
                </div>
              )}
            </div>
          </Field>

          <Field label="URL Gambar Manual">
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              placeholder="Opsional jika tidak upload file"
              className={inputClass}
            />
          </Field>

          <Field label="Urutan">
            <input
              type="number"
              value={formData.order}
              onChange={(event) => updateField("order", event.target.value)}
              placeholder="Contoh: 1"
              className={inputClass}
            />
          </Field>

          <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/30 p-4 shadow-lg shadow-black/20">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

            <div className="relative z-10 flex items-start gap-3">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200">
                <StarIcon className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1">
                <label className="flex cursor-pointer items-start justify-between gap-4">
                  <span>
                    <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                      Sorotan Galeri
                    </span>
                    <span className="mt-2 block text-sm font-black text-white">
                      Jadikan Highlight
                    </span>
                    <span className="mt-2 block text-xs font-semibold leading-6 text-slate-500">
                      Highlight aktif {highlightCount}/{highlightLimit}. Maksimal 10 gambar tampil di Sorotan Galeri.
                    </span>
                  </span>

                  <input
                    type="checkbox"
                    checked={Boolean(formData.isHighlight)}
                    disabled={isHighlightCheckboxDisabled}
                    onChange={handleHighlightChange}
                    className="mt-1 h-5 w-5 shrink-0 accent-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </label>

                {isHighlightCheckboxDisabled ? (
                  <p className="mt-3 rounded-xl border border-red-300/14 bg-red-500/10 px-3 py-2 text-[0.7rem] font-semibold leading-5 text-red-100">
                    Highlight sudah penuh. Hapus centang salah satu galeri highlight terlebih dahulu.
                  </p>
                ) : (
                  <p className="mt-3 rounded-xl border border-amber-300/10 bg-amber-300/[0.045] px-3 py-2 text-[0.7rem] font-semibold leading-5 text-amber-100">
                    Jika dicentang, gambar ini tetap tampil sebagai card galeri dan juga masuk ke bagian Sorotan Galeri.
                  </p>
                )}
              </div>
            </div>
          </div>

          <Field label="Deskripsi">
            <textarea
              value={formData.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Tulis deskripsi singkat dokumentasi..."
              className={textareaClass}
            />
          </Field>

          <div
            className={`rounded-2xl border px-4 py-3 ${
              messageType === "error"
                ? "border-red-300/16 bg-red-500/10"
                : messageType === "success"
                  ? "border-emerald-300/16 bg-emerald-500/10"
                  : "border-amber-300/12 bg-amber-300/[0.055]"
            }`}
          >
            <p
              className={`text-xs font-semibold leading-6 ${
                messageType === "error"
                  ? "text-red-100"
                  : messageType === "success"
                    ? "text-emerald-100"
                    : "text-amber-100"
              }`}
            >
              {message ||
                (isEditMode
                  ? "Mode edit aktif. Perubahan akan disimpan ke Firestore."
                  : "Upload gambar akan disimpan ke Supabase Storage, lalu data galeri disimpan ke Firestore.")}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            {isEditMode ? (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex min-h-11 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/28 px-5 text-sm font-black text-slate-300 active:scale-[0.985]"
              >
                Batal
              </button>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber-100/35" />
              <SaveIcon className="h-4 w-4" />
              {isSubmitting
                ? "Menyimpan..."
                : isEditMode
                  ? "Simpan Perubahan"
                  : "Simpan Galeri"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}