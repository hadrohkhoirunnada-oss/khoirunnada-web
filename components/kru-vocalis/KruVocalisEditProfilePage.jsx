"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE } from "@/data/initialKruVocalis";
import {
  linkGoogleToCurrentKruAccount,
  listenKruVocalisAuthState,
  updateKruVocalisProfile,
} from "@/services/kruVocalisAuthService";

const KRU_PROFILE_BUCKET = "kru-profile-images";

function UserIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.75 19.25c.8-3.15 3.08-5 6.25-5s5.45 1.85 6.25 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.75 7.25 9.1 5.5h5.8l1.35 1.75h1.5a2.5 2.5 0 0 1 2.5 2.5v6.5a2.5 2.5 0 0 1-2.5 2.5H6.25a2.5 2.5 0 0 1-2.5-2.5v-6.5a2.5 2.5 0 0 1 2.5-2.5h1.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
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

function GoogleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.03h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.3 2.98-7.43Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.88A6.01 6.01 0 0 1 6.1 12c0-.65.11-1.28.31-1.88V7.53H3.08A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.08 4.47l3.33-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.47 0 2.79.5 3.82 1.5l2.87-2.87C16.95 3.01 14.69 2 12 2a9.99 9.99 0 0 0-8.92 5.53l3.33 2.59C7.2 7.76 9.4 6 12 6Z"
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
        d="M10.25 13.75 13.75 10.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.35 8.15 8.2 9.3a3.9 3.9 0 0 0 5.51 5.52l1.14-1.15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m14.65 15.85 1.15-1.15a3.9 3.9 0 0 0-5.51-5.52l-1.14 1.15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.75 12.35 3.25 3.15 7.25-7"
        stroke="currentColor"
        strokeWidth="1.9"
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

function getUsernameFromEmail(email) {
  const cleanEmail = String(email || "").trim().toLowerCase();

  if (!cleanEmail.includes("@")) {
    return "";
  }

  return cleanEmail
    .split("@")[0]
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "");
}

function normalizeUsername(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "");
}

function isApproved(profile) {
  return String(profile?.status || "").toLowerCase() === "approved";
}

function getAvatarUrl(formData, selectedPhotoPreviewUrl) {
  return (
    selectedPhotoPreviewUrl ||
    formData.photoURL ||
    formData.googlePhotoURL ||
    INITIAL_KRU_PROFILE.avatarUrl
  );
}

function shouldDeleteOldSupabasePhoto(oldPhoto, nextPhotoPath) {
  return (
    oldPhoto.photoProvider === "supabase" &&
    oldPhoto.photoBucket === KRU_PROFILE_BUCKET &&
    Boolean(oldPhoto.photoPath) &&
    oldPhoto.photoPath !== nextPhotoPath
  );
}

export default function KruVocalisEditProfilePage() {
  const router = useRouter();
  const photoFileInputRef = useRef(null);

  const [authState, setAuthState] = useState({
    user: null,
    profile: null,
  });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    bio: "",
    mainRole: "",
    email: "",
    photoURL: "",
    photoPath: "",
    photoBucket: "",
    photoProvider: "default",
    photoOriginalName: "",
    photoContentType: "",
    photoSize: 0,
    googlePhotoURL: "",
    linkedProviders: [],
  });
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [selectedPhotoPreviewUrl, setSelectedPhotoPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLinkingGoogle, setIsLinkingGoogle] = useState(false);
  const [useGooglePhotoOnLink, setUseGooglePhotoOnLink] = useState(true);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    const unsubscribe = listenKruVocalisAuthState(({ user, profile }) => {
      setAuthState({
        user,
        profile,
      });

      if (!user) {
        setIsLoading(false);
        router.replace("/login-kru-vocalis?error=login-required");
        return;
      }

      if (profile && !isApproved(profile)) {
        setIsLoading(false);
        router.replace("/kru-vocalis");
        return;
      }

      const name = profile?.name || user?.name || "";
      const email = profile?.email || user?.email || "";
      const username =
        profile?.username || getUsernameFromEmail(email) || "kru.khoirunnada";

      setFormData({
        name,
        username,
        phone: profile?.phone || "",
        bio: profile?.bio || "",
        mainRole: profile?.mainRole || "Vocalis / Kru",
        email,
        photoURL: profile?.photoURL || user?.photoURL || "",
        photoPath: profile?.photoPath || "",
        photoBucket: profile?.photoBucket || "",
        photoProvider: profile?.photoProvider || "default",
        photoOriginalName: profile?.photoOriginalName || "",
        photoContentType: profile?.photoContentType || "",
        photoSize: Number(profile?.photoSize || 0),
        googlePhotoURL: profile?.googlePhotoURL || "",
        linkedProviders: Array.isArray(profile?.linkedProviders)
          ? profile.linkedProviders
          : user?.providerIds || [],
      });

      setIsLoading(false);
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    return () => {
      if (selectedPhotoPreviewUrl) {
        URL.revokeObjectURL(selectedPhotoPreviewUrl);
      }
    };
  }, [selectedPhotoPreviewUrl]);

  const isGoogleLinked = useMemo(() => {
    return formData.linkedProviders.includes("google.com");
  }, [formData.linkedProviders]);

  const avatarUrl = useMemo(
    () => getAvatarUrl(formData, selectedPhotoPreviewUrl),
    [formData, selectedPhotoPreviewUrl]
  );

  function setSuccess(text) {
    setMessage({
      type: "success",
      text,
    });
  }

  function setError(text) {
    setMessage({
      type: "error",
      text,
    });
  }

  function clearMessage() {
    setMessage({
      type: "",
      text: "",
    });
  }

  function updateField(fieldName, value) {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
    clearMessage();
  }

  function handleOpenPhotoPicker() {
    photoFileInputRef.current?.click();
  }

  function handlePhotoFileChange(event) {
    const file = event.target.files?.[0] || null;

    clearMessage();

    if (selectedPhotoPreviewUrl) {
      URL.revokeObjectURL(selectedPhotoPreviewUrl);
    }

    setSelectedPhotoFile(null);
    setSelectedPhotoPreviewUrl("");

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Format foto profil harus JPG, PNG, atau WEBP.");

      if (photoFileInputRef.current) {
        photoFileInputRef.current.value = "";
      }

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran foto profil maksimal 5 MB.");

      if (photoFileInputRef.current) {
        photoFileInputRef.current.value = "";
      }

      return;
    }

    setSelectedPhotoFile(file);
    setSelectedPhotoPreviewUrl(URL.createObjectURL(file));

    setFormData((current) => ({
      ...current,
      photoProvider: "supabase",
    }));

    setSuccess("Foto baru siap dipakai. Klik Simpan Perubahan untuk menyimpan.");
  }

  async function uploadProfilePhoto(file) {
    const uploadFormData = new FormData();

    uploadFormData.append("image", file);
    uploadFormData.append(
      "uid",
      authState?.user?.uid || authState?.profile?.uid || ""
    );

    const response = await fetch("/api/kru-vocalis/profile-image", {
      method: "POST",
      body: uploadFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Gagal upload foto profil.");
    }

    if (!result?.photoURL) {
      throw new Error("Upload berhasil, tapi URL foto tidak ditemukan.");
    }

    return result;
  }

  async function deleteOldProfilePhoto({ photoProvider, photoBucket, photoPath }) {
    if (
      photoProvider !== "supabase" ||
      photoBucket !== KRU_PROFILE_BUCKET ||
      !photoPath
    ) {
      return {
        skipped: true,
      };
    }

    const response = await fetch("/api/kru-vocalis/profile-image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photoBucket,
        photoPath,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Gagal menghapus foto profil lama.");
    }

    return result;
  }

  async function handleSaveProfile(event) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    const cleanName = formData.name.trim();
    const cleanUsername = normalizeUsername(formData.username);
    const cleanPhone = formData.phone.trim();

    if (!cleanName) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!cleanUsername) {
      setError("Username wajib diisi.");
      return;
    }

    if (!cleanPhone) {
      setError("Nomor WhatsApp wajib diisi.");
      return;
    }

    const oldPhoto = {
      photoProvider: formData.photoProvider,
      photoBucket: formData.photoBucket,
      photoPath: formData.photoPath,
    };

    let uploadedPhotoForRollback = null;

    setIsSaving(true);

    try {
      let nextPhotoURL = formData.photoURL;
      let nextPhotoPath = formData.photoPath;
      let nextPhotoBucket = formData.photoBucket;
      let nextPhotoProvider = formData.photoProvider || "default";
      let nextPhotoOriginalName = formData.photoOriginalName || "";
      let nextPhotoContentType = formData.photoContentType || "";
      let nextPhotoSize = Number(formData.photoSize || 0);

      if (selectedPhotoFile) {
        setMessage({
          type: "success",
          text: "Mengupload foto profil...",
        });

        const uploadResult = await uploadProfilePhoto(selectedPhotoFile);

        uploadedPhotoForRollback = {
          photoProvider: uploadResult.photoProvider || "supabase",
          photoBucket: uploadResult.photoBucket || KRU_PROFILE_BUCKET,
          photoPath: uploadResult.photoPath || "",
        };

        nextPhotoURL = uploadResult.photoURL;
        nextPhotoPath = uploadResult.photoPath || "";
        nextPhotoBucket = uploadResult.photoBucket || KRU_PROFILE_BUCKET;
        nextPhotoProvider = uploadResult.photoProvider || "supabase";
        nextPhotoOriginalName = uploadResult.photoOriginalName || "";
        nextPhotoContentType = uploadResult.photoContentType || "";
        nextPhotoSize = Number(uploadResult.photoSize || 0);
      }

      const result = await updateKruVocalisProfile({
        name: cleanName,
        username: cleanUsername,
        phone: cleanPhone,
        bio: formData.bio,
        photoURL: nextPhotoURL,
        photoPath: nextPhotoPath,
        photoBucket: nextPhotoBucket,
        photoProvider: nextPhotoProvider,
        photoOriginalName: nextPhotoOriginalName,
        photoContentType: nextPhotoContentType,
        photoSize: nextPhotoSize,
      });

      const latestProfile = result?.profile;

      uploadedPhotoForRollback = null;

      let cleanupMessage = "";

      if (shouldDeleteOldSupabasePhoto(oldPhoto, nextPhotoPath)) {
        try {
          await deleteOldProfilePhoto(oldPhoto);
        } catch (cleanupError) {
          console.error("Foto profil lama gagal dibersihkan:", cleanupError);
          cleanupMessage =
            " Namun foto lama gagal dibersihkan otomatis dari Supabase.";
        }
      }

      if (selectedPhotoPreviewUrl) {
        URL.revokeObjectURL(selectedPhotoPreviewUrl);
      }

      setSelectedPhotoFile(null);
      setSelectedPhotoPreviewUrl("");

      if (photoFileInputRef.current) {
        photoFileInputRef.current.value = "";
      }

      setFormData((current) => ({
        ...current,
        name: latestProfile?.name || cleanName,
        username: latestProfile?.username || cleanUsername,
        phone: latestProfile?.phone || cleanPhone,
        bio: latestProfile?.bio || current.bio,
        photoURL: latestProfile?.photoURL || nextPhotoURL,
        photoPath: latestProfile?.photoPath || nextPhotoPath,
        photoBucket: latestProfile?.photoBucket || nextPhotoBucket,
        photoProvider: latestProfile?.photoProvider || nextPhotoProvider,
        photoOriginalName:
          latestProfile?.photoOriginalName || nextPhotoOriginalName,
        photoContentType:
          latestProfile?.photoContentType || nextPhotoContentType,
        photoSize: Number(latestProfile?.photoSize || nextPhotoSize || 0),
        linkedProviders: Array.isArray(latestProfile?.linkedProviders)
          ? latestProfile.linkedProviders
          : current.linkedProviders,
      }));

      setSuccess(`Profil Kru/Vocalis berhasil diperbarui.${cleanupMessage}`);
    } catch (error) {
      if (uploadedPhotoForRollback?.photoPath) {
        try {
          await deleteOldProfilePhoto(uploadedPhotoForRollback);
        } catch (rollbackError) {
          console.error(
            "Foto profil baru gagal dibersihkan setelah update gagal:",
            rollbackError
          );
        }
      }

      console.error("Gagal menyimpan profil Kru/Vocalis:", error);
      setError(error?.message || "Gagal menyimpan profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLinkGoogle() {
    if (isLinkingGoogle) {
      return;
    }

    setIsLinkingGoogle(true);
    clearMessage();

    try {
      const result = await linkGoogleToCurrentKruAccount({
        useGooglePhoto: useGooglePhotoOnLink,
      });

      const latestProfile = result?.profile;
      const latestUser = result?.user;

      if (selectedPhotoPreviewUrl) {
        URL.revokeObjectURL(selectedPhotoPreviewUrl);
      }

      setSelectedPhotoFile(null);
      setSelectedPhotoPreviewUrl("");

      if (photoFileInputRef.current) {
        photoFileInputRef.current.value = "";
      }

      setAuthState({
        user: latestUser || authState.user,
        profile: latestProfile || authState.profile,
      });

      setFormData((current) => ({
        ...current,
        photoURL: latestProfile?.photoURL || current.photoURL,
        photoPath: latestProfile?.photoPath || current.photoPath,
        photoBucket: latestProfile?.photoBucket || current.photoBucket,
        photoProvider: latestProfile?.photoProvider || current.photoProvider,
        photoOriginalName:
          latestProfile?.photoOriginalName || current.photoOriginalName,
        photoContentType:
          latestProfile?.photoContentType || current.photoContentType,
        photoSize: Number(latestProfile?.photoSize || current.photoSize || 0),
        googlePhotoURL: latestProfile?.googlePhotoURL || current.googlePhotoURL,
        linkedProviders: Array.isArray(latestProfile?.linkedProviders)
          ? latestProfile.linkedProviders
          : latestUser?.providerIds || current.linkedProviders,
      }));

      setSuccess(
        useGooglePhotoOnLink
          ? "Google berhasil dihubungkan dan foto Google dipakai sebagai foto profil."
          : "Google berhasil dihubungkan ke akun Kru/Vocalis."
      );
    } catch (error) {
      console.error("Gagal menghubungkan Google:", error);
      setError(
        error?.message || "Gagal menghubungkan Google. Silakan coba lagi."
      );
    } finally {
      setIsLinkingGoogle(false);
    }
  }

  function handleUseGooglePhoto() {
    if (!formData.googlePhotoURL) {
      setError("Foto Google belum tersedia. Hubungkan Google terlebih dahulu.");
      return;
    }

    if (selectedPhotoPreviewUrl) {
      URL.revokeObjectURL(selectedPhotoPreviewUrl);
    }

    setSelectedPhotoFile(null);
    setSelectedPhotoPreviewUrl("");

    if (photoFileInputRef.current) {
      photoFileInputRef.current.value = "";
    }

    setFormData((current) => ({
      ...current,
      photoURL: current.googlePhotoURL,
      photoPath: "",
      photoBucket: "",
      photoProvider: "google",
      photoOriginalName: "",
      photoContentType: "",
      photoSize: 0,
    }));

    setSuccess("Foto Google siap dipakai. Klik Simpan Perubahan untuk menyimpan.");
  }

  function handleUseDefaultPhoto() {
    if (selectedPhotoPreviewUrl) {
      URL.revokeObjectURL(selectedPhotoPreviewUrl);
    }

    setSelectedPhotoFile(null);
    setSelectedPhotoPreviewUrl("");

    if (photoFileInputRef.current) {
      photoFileInputRef.current.value = "";
    }

    setFormData((current) => ({
      ...current,
      photoURL: "",
      photoPath: "",
      photoBucket: "",
      photoProvider: "default",
      photoOriginalName: "",
      photoContentType: "",
      photoSize: 0,
    }));

    setSuccess(
      "Foto profil dikembalikan ke default. Klik Simpan Perubahan untuk menyimpan."
    );
  }

  if (isLoading) {
    return (
      <PageContainer className="pb-28 pt-7">
        <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />

          <div className="relative z-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
              <img
                src={INITIAL_KRU_PROFILE.avatarUrl}
                alt="Khoirunnada"
                className="h-full w-full rounded-full object-contain"
              />
            </div>

            <p className="mt-6 text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
              Memuat Profil
            </p>

            <h1 className="mt-3 text-2xl font-black tracking-[-0.06em] text-white">
              Mengecek akses Kru/Vocalis
            </h1>
          </div>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Akun Kru
          </p>

          <h1 className="mt-3 text-[1.95rem] font-black leading-none tracking-[-0.07em] text-white">
            Edit Profil
          </h1>

          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-slate-400">
            Lengkapi identitas anggota Kru/Vocalis Khoirunnada.
          </p>

          <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <img
              src={avatarUrl}
              alt={formData.name || "Kru/Vocalis Khoirunnada"}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <input
            ref={photoFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoFileChange}
            className="hidden"
            aria-label="Pilih foto profil Kru/Vocalis"
          />

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={handleOpenPhotoPicker}
              disabled={isSaving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300/14 bg-black/30 px-4 text-xs font-black uppercase tracking-[0.14em] text-amber-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <CameraIcon className="h-4 w-4" />
              Pilih Foto
            </button>

            <button
              type="button"
              onClick={handleUseGooglePhoto}
              disabled={!formData.googlePhotoURL || isSaving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-emerald-300/14 bg-emerald-400/10 px-4 text-xs font-black uppercase tracking-[0.14em] text-emerald-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <GoogleIcon className="h-4 w-4" />
              Foto Google
            </button>
          </div>

          {selectedPhotoFile ? (
            <p className="mx-auto mt-4 max-w-[18rem] rounded-2xl border border-amber-300/12 bg-amber-300/[0.055] px-4 py-3 text-xs font-bold leading-6 text-amber-100">
              Foto dipilih: {selectedPhotoFile.name}. Klik Simpan Perubahan
              agar tersimpan permanen.
            </p>
          ) : null}
        </div>
      </section>

      <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
        <section className="rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
              <UserIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
                Data Anggota
              </p>
              <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
                Identitas Profil
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <Field label="Nama Lengkap">
              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Nama anggota"
                className={inputClassName}
              />
            </Field>

            <Field label="Username">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-amber-300/70">
                  @
                </span>

                <input
                  type="text"
                  value={formData.username}
                  onChange={(event) =>
                    updateField(
                      "username",
                      normalizeUsername(event.target.value)
                    )
                  }
                  placeholder="username"
                  className={`${inputClassName} pl-8`}
                />
              </div>
            </Field>

            <Field label="Email">
              <input
                type="email"
                value={formData.email}
                readOnly
                className={`${inputClassName} cursor-not-allowed text-slate-400`}
              />
            </Field>

            <Field label="Role Utama">
              <input
                type="text"
                value={formData.mainRole}
                readOnly
                className={`${inputClassName} cursor-not-allowed text-amber-100`}
              />
            </Field>

            <Field label="Nomor WhatsApp">
              <input
                type="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Contoh: 62812xxxx"
                className={inputClassName}
              />
            </Field>

            <Field label="Catatan Singkat">
              <textarea
                value={formData.bio}
                onChange={(event) => updateField("bio", event.target.value)}
                placeholder="Contoh: Vocalis qosidah, aktif latihan malam Jumat."
                rows={4}
                className={`${inputClassName} resize-none py-4 leading-6`}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-300/12 bg-black/30 p-5 shadow-xl shadow-black/25">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-[#121009] text-amber-200">
              <LinkIcon className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.26em] text-amber-300">
                Akun Terhubung
              </p>
              <h2 className="mt-1 text-lg font-black tracking-[-0.045em] text-white">
                Google Account
              </h2>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-amber-300/10 bg-black/28 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <GoogleIcon className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-white">
                  {isGoogleLinked ? "Google Terhubung" : "Belum Terhubung"}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                  {isGoogleLinked
                    ? "Akun ini sudah bisa memakai akses Google."
                    : "Hubungkan Google agar akun email/password punya foto Google dan login Google."}
                </p>
              </div>

              {isGoogleLinked ? (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-300/16 bg-emerald-400/10 text-emerald-200">
                  <CheckIcon className="h-4 w-4" />
                </span>
              ) : null}
            </div>

            {!isGoogleLinked ? (
              <label className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-300/10 bg-amber-300/[0.045] px-4 py-3">
                <input
                  type="checkbox"
                  checked={useGooglePhotoOnLink}
                  onChange={(event) =>
                    setUseGooglePhotoOnLink(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-amber-300"
                />

                <span className="text-xs font-semibold leading-6 text-amber-100/90">
                  Langsung gunakan foto Google sebagai foto profil setelah akun
                  berhasil terhubung.
                </span>
              </label>
            ) : null}

            <button
              type="button"
              onClick={handleLinkGoogle}
              disabled={isGoogleLinked || isLinkingGoogle || isSaving}
              className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/16 bg-emerald-400/10 px-5 text-xs font-black uppercase tracking-[0.16em] text-emerald-100 shadow-lg shadow-black/20 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <GoogleIcon className="h-4 w-4" />
              {isGoogleLinked
                ? "Google Sudah Terhubung"
                : isLinkingGoogle
                  ? "Menghubungkan..."
                  : "Hubungkan Google"}
            </button>

            <button
              type="button"
              onClick={handleUseDefaultPhoto}
              disabled={isSaving}
              className="mt-3 flex min-h-11 w-full items-center justify-center rounded-2xl border border-amber-300/12 bg-black/30 px-5 text-xs font-black uppercase tracking-[0.16em] text-amber-100 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-55"
            >
              Gunakan Foto Default
            </button>
          </div>
        </section>

        {message.text ? (
          <p
            className={`rounded-2xl border px-4 py-3 text-center text-xs font-bold leading-6 ${
              message.type === "error"
                ? "border-red-400/18 bg-red-500/10 text-red-100"
                : "border-emerald-300/16 bg-emerald-400/10 text-emerald-100"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <div className="grid gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SaveIcon className="h-4 w-4" />
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          <Link
            href="/kru-vocalis"
            className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-amber-300/12 bg-black/30 px-5 text-sm font-black text-amber-100 active:scale-[0.985]"
          >
            Kembali ke Profil
          </Link>
        </div>
      </form>
    </PageContainer>
  );
}