"use client";

import { useEffect, useRef, useState } from "react";
import {
  createShopProduct,
  DEFAULT_SHOP_PRODUCT_FORM_DATA,
  updateShopProduct,
} from "@/services/shopProductService";

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
        d="m6.75 16.75 3.75-3.75 2.5 2.5 2.25-2.25 2.25 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 9.25h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UploadIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 15.75V5.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.75 9.5 12 5.25l4.25 4.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 16.25v1.5a2 2 0 0 0 2 2h9.5a2 2 0 0 0 2-2v-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m6.75 12.35 3.15 3.15 7.35-7.35"
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
      <label className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/90">
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
        className={`flex min-h-[3.15rem] w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left text-sm font-semibold outline-none shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.99] ${
          isOpen
            ? "border-amber-300/45 bg-amber-300/10 shadow-[0_0_0_3px_rgba(245,197,66,0.08)]"
            : "border-amber-300/12 bg-black/35 hover:border-amber-300/22"
        }`}
      >
        <span className={selectedOption ? "text-white" : "text-slate-500"}>
          {selectedOption?.label || placeholder}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/14 bg-black/35 text-amber-200 transition ${
            isOpen ? "rotate-180 border-amber-300/30 bg-amber-300/10" : ""
          }`}
        >
          <ChevronIcon className="h-4 w-4" />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-[80] overflow-hidden rounded-2xl border border-amber-300/18 bg-[#070910]/98 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018)_44%,rgba(0,0,0,0.25))]" />
          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10 space-y-1">
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
                  className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-sm font-bold transition active:scale-[0.99] ${
                    isSelected
                      ? "bg-amber-300/14 text-amber-100"
                      : "text-slate-200 hover:bg-white/[0.045] hover:text-white"
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {option.label}
                  </span>

                  {isSelected ? (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-300/18 bg-black/30 text-amber-200">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const inputClass =
  "min-h-[3.1rem] w-full rounded-2xl border border-amber-300/12 bg-black/35 px-4 text-sm font-semibold text-white outline-none shadow-lg shadow-black/20 transition placeholder:text-slate-500 focus:border-amber-300/40 focus:bg-black/45 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]";

const readonlyInputClass =
  "min-h-[3.1rem] w-full cursor-not-allowed rounded-2xl border border-amber-300/12 bg-amber-300/[0.045] px-4 text-sm font-semibold text-amber-100 outline-none shadow-lg shadow-black/20 placeholder:text-slate-500";

const textareaClass =
  "min-h-[7.5rem] w-full resize-none rounded-2xl border border-amber-300/12 bg-black/35 px-4 py-3 text-sm font-semibold leading-7 text-white outline-none shadow-lg shadow-black/20 transition placeholder:text-slate-500 focus:border-amber-300/40 focus:bg-black/45 focus:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]";

const categoryOptions = [
  { value: "Katalog", label: "Katalog" },
  { value: "Merchandise", label: "Merchandise" },
  { value: "Perlengkapan", label: "Perlengkapan" },
  { value: "Aksesoris", label: "Aksesoris" },
  { value: "Digital", label: "Digital" },
];

const statusOptions = [
  { value: "published", label: "Tampilkan" },
  { value: "draft", label: "Draft" },
  { value: "coming-soon", label: "Coming Soon" },
  { value: "sold-out", label: "Stok Habis" },
];

function parsePriceNumber(value = "") {
  const digits = String(value || "").replace(/[^\d]/g, "");
  const numberValue = Number(digits);

  if (!Number.isFinite(numberValue)) {
    return 0;
  }

  return numberValue;
}

function calculateDiscountLabel(priceValue = "", originalPriceValue = "") {
  const price = parsePriceNumber(priceValue);
  const originalPrice = parsePriceNumber(originalPriceValue);

  if (!price || !originalPrice || originalPrice <= price) {
    return "";
  }

  const discountPercent = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );

  if (!discountPercent || discountPercent < 1) {
    return "";
  }

  return `Diskon ${discountPercent}%`;
}

function getInitialFormData() {
  return {
    ...DEFAULT_SHOP_PRODUCT_FORM_DATA,
    status: "draft",
  };
}

function getFormDataFromProduct(product = {}) {
  const price = product.price || "";
  const originalPrice = product.originalPrice || "";

  return {
    ...DEFAULT_SHOP_PRODUCT_FORM_DATA,
    title: product.title || "",
    category: product.category || "",
    status: product.status || "draft",
    price,
    originalPrice,
    discount: product.discount || calculateDiscountLabel(price, originalPrice),
    stock: product.stock === 0 ? "0" : product.stock || "",
    description: product.description || "",
    imageId: product.imageId || "",
    imageUrl: product.imageUrl || "",
    imageFilename: product.imageFilename || "",
    imageOriginalName: product.imageOriginalName || "",
    imageContentType: product.imageContentType || "",
    imageSize: product.imageSize || 0,
  };
}

async function deleteProductImage(imageId = "") {
  if (!imageId) {
    return null;
  }

  const response = await fetch(`/api/admin/shop/product-images/${imageId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.message || "Gagal menghapus gambar produk.");
  }

  return result;
}

export default function ProductForm({
  editingProduct = null,
  onSaved,
  onCancelEdit,
}) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(getInitialFormData);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const isEditMode = Boolean(editingProduct?.id);
  const currentImageUrl = imagePreviewUrl || formData.imageUrl || "";

  useEffect(() => {
    if (!editingProduct) {
      setFormData(getInitialFormData());
      setSelectedImageFile(null);
      setImagePreviewUrl("");
      setMessage({ type: "", text: "" });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setFormData(getFormDataFromProduct(editingProduct));
    setSelectedImageFile(null);
    setImagePreviewUrl("");
    setMessage({
      type: "success",
      text: `Mode edit aktif untuk produk "${editingProduct.title}".`,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [editingProduct]);

  useEffect(() => {
    if (!selectedImageFile) {
      setImagePreviewUrl("");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImageFile);
    setImagePreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedImageFile]);

  const updateField = (fieldName, value) => {
    setFormData((currentData) => {
      const nextData = {
        ...currentData,
        [fieldName]: value,
      };

      if (fieldName === "price" || fieldName === "originalPrice") {
        nextData.discount = calculateDiscountLabel(
          nextData.price,
          nextData.originalPrice
        );
      }

      return nextData;
    });
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedImageFile(file);
  };

  const handleResetImage = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setSelectedImageFile(null);
    setImagePreviewUrl("");
    setMessage({ type: "", text: "" });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onCancelEdit?.();
  };

  const uploadProductImage = async () => {
    if (!selectedImageFile) {
      return {};
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("image", selectedImageFile);

    const response = await fetch("/api/admin/shop/product-images", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.message || "Gagal upload gambar produk.");
    }

    return result.image || {};
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    let uploadedImageData = null;
    const finalFormData = {
      ...formData,
      discount: calculateDiscountLabel(formData.price, formData.originalPrice),
    };

    try {
      uploadedImageData = await uploadProductImage();

      if (isEditMode) {
        await updateShopProduct(editingProduct.id, {
          ...finalFormData,
          ...(uploadedImageData || {}),
        });

        if (selectedImageFile && editingProduct.imageId) {
          try {
            await deleteProductImage(editingProduct.imageId);
          } catch (imageError) {
            console.warn(
              "Produk terupdate, tapi gambar lama gagal dihapus:",
              imageError
            );
          }
        }

        setMessage({
          type: "success",
          text: "Produk berhasil diperbarui.",
        });
      } else {
        await createShopProduct({
          ...finalFormData,
          ...(uploadedImageData || {}),
        });

        setMessage({
          type: "success",
          text: "Produk berhasil disimpan ke Firestore. Gambar tersimpan di MongoDB.",
        });
      }

      setFormData(getInitialFormData());
      setSelectedImageFile(null);
      setImagePreviewUrl("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await onSaved?.();
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);

      if (uploadedImageData?.imageId) {
        try {
          await deleteProductImage(uploadedImageData.imageId);
        } catch (cleanupError) {
          console.warn("Gagal membersihkan gambar baru:", cleanupError);
        }
      }

      setMessage({
        type: "error",
        text: error.message || "Gagal menyimpan produk.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[1.85rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.08),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.22))]" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
              {isEditMode ? "Edit Produk" : "Form Produk"}
            </p>

            <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.05em] text-white">
              {isEditMode ? "Perbarui Produk Katalog" : "Tambah Produk Katalog"}
            </h2>

            <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
              {isEditMode
                ? "Ubah data produk di Firestore. Jika gambar diganti, gambar baru masuk MongoDB GridFS."
                : "Silahkan periksa kembali sebelum menambahkan produk."}
            </p>
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
            <SaveIcon className="h-5 w-5" />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-4">

            <Field label="Nama Produk">
              <input
                type="text"
                value={formData.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Contoh: Katalog Produk Khoirunnada"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Kategori">
                <CustomSelect
                  placeholder="Pilih kategori"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(value) => updateField("category", value)}
                />
              </Field>

              <Field label="Status">
                <CustomSelect
                  placeholder="Pilih status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => updateField("status", value)}
                />
              </Field>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />

          <div className="space-y-4">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
              Harga & Stok
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Harga">
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="Rp80.000"
                  className={inputClass}
                />
              </Field>

              <Field label="Harga Coret">
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.originalPrice}
                  onChange={(event) =>
                    updateField("originalPrice", event.target.value)
                  }
                  placeholder="Rp100.000"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Diskon"
              >
                <input
                  type="text"
                  value={formData.discount}
                  readOnly
                  placeholder="Otomatis"
                  className={readonlyInputClass}
                />
              </Field>

              <Field label="Stok">
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(event) => updateField("stock", event.target.value)}
                  placeholder="10"
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />

          <div className="space-y-4">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-amber-300">
              Gambar & Deskripsi
            </p>

            <Field
              label={isEditMode ? "Gambar Produk" : "Upload Gambar Produk"}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="relative overflow-hidden rounded-[1.35rem] border border-amber-300/12 bg-black/35 p-3 shadow-lg shadow-black/20">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_45%,rgba(0,0,0,0.2))]" />

                <div className="relative z-10 flex gap-3">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/12 bg-black/35 text-amber-200 shadow-inner shadow-black/30">
                    {currentImageUrl ? (
                      <img
                        src={currentImageUrl}
                        alt="Preview produk"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-black text-white">
                      {selectedImageFile?.name ||
                        formData.imageOriginalName ||
                        "Belum ada gambar dipilih"}
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      Format JPG, PNG, atau WebP. Ukuran maksimal 5MB.
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleChooseFile}
                        disabled={isSaving}
                        className="flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-amber-300/10 px-3 text-xs font-extrabold text-amber-100 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <UploadIcon className="h-4 w-4" />
                        Pilih
                      </button>

                      <button
                        type="button"
                        onClick={handleResetImage}
                        disabled={!selectedImageFile || isSaving}
                        className="flex min-h-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-3 text-xs font-extrabold text-slate-300 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Field>

            <Field label="Deskripsi Produk">
              <textarea
                value={formData.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Tulis deskripsi singkat produk, bahan, ukuran, atau informasi pemesanan..."
                className={textareaClass}
              />
            </Field>
          </div>

          {message.text ? (
            <div
              className={`rounded-2xl border px-4 py-3 ${
                message.type === "success"
                  ? "border-emerald-400/14 bg-emerald-400/10"
                  : "border-red-400/14 bg-red-500/10"
              }`}
            >
              <p
                className={`text-xs font-semibold leading-6 ${
                  message.type === "success" ? "text-emerald-100" : "text-red-100"
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
              className="flex min-h-12 items-center justify-center rounded-2xl border border-amber-300/12 bg-black/35 px-5 text-sm font-extrabold text-amber-100 shadow-lg shadow-black/20 transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isEditMode ? "Batal Edit" : "Reset"}
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="relative flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber-100/35" />
              <SaveIcon className="h-4 w-4" />
              {isSaving
                ? "Menyimpan..."
                : isEditMode
                  ? "Simpan Edit"
                  : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}