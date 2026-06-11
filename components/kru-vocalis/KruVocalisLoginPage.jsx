"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import {
  loginKruWithEmailPassword,
  loginKruWithGoogle,
  registerKruWithEmailPassword,
  registerKruWithGoogle,
} from "@/services/kruVocalisAuthService";

const KRU_ROLES = [
  "Vocalis",
  "Pemain Terbang",
  "Pemain Bass",
  "Multimedia",
  "Perlengkapan",
  "Lainnya",
];

function UserIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 12.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.75 19.25c.8-3.15 3.08-5 6.25-5s5.45 1.85 6.25 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KeyIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M9.75 14.25a4 4 0 1 1 3.14-6.48 4 4 0 0 1 .72 3.98l5.64 5.64v2.36h-2.5v-2.1h-2.1v-2.1h-2.1l-1.02-1.02a4 4 0 0 1-1.78-.28Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 9.25h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M3.75 12s2.85-5.25 8.25-5.25S20.25 12 20.25 12 17.4 17.25 12 17.25 3.75 12 3.75 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function EyeOffIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m4.75 4.75 14.5 14.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9.2 6.95A8.08 8.08 0 0 1 12 6.75c5.4 0 8.25 5.25 8.25 5.25a13.67 13.67 0 0 1-2.22 2.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.15 14.15A2.25 2.25 0 0 1 9.85 9.85"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.5 8.35A13.86 13.86 0 0 0 3.75 12S6.6 17.25 12 17.25c1.04 0 1.99-.19 2.84-.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VocalistIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 13.25a3.25 3.25 0 0 0 3.25-3.25V6.75a3.25 3.25 0 0 0-6.5 0V10A3.25 3.25 0 0 0 12 13.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6.75 10.25a5.25 5.25 0 0 0 10.5 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5v3.75M9.25 19.25h5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.73-.07-1.43-.19-2.1H12v3.98h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.31 2.98-7.41Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.89 6.62-2.36l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.96A6 6 0 0 1 6.09 12c0-.68.12-1.34.32-1.96V7.45H3.08A10 10 0 0 0 2 12c0 1.61.39 3.13 1.08 4.55l3.33-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.92c1.47 0 2.79.51 3.83 1.5l2.86-2.86C16.96 2.95 14.69 2 12 2a10 10 0 0 0-8.92 5.45l3.33 2.59C7.2 7.68 9.4 5.92 12 5.92Z"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8.35 4.75 10 8.4a1.45 1.45 0 0 1-.33 1.62l-1.15 1.15a10.55 10.55 0 0 0 4.31 4.31l1.15-1.15A1.45 1.45 0 0 1 15.6 14l3.65 1.65a1.45 1.45 0 0 1 .85 1.47l-.35 2.32a1.45 1.45 0 0 1-1.44 1.22A15.05 15.05 0 0 1 3.34 5.69a1.45 1.45 0 0 1 1.22-1.44l2.32-.35a1.45 1.45 0 0 1 1.47.85Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m7.25 9.75 4.75 4.75 4.75-4.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getStatusMessage(status) {
  if (status === "approved") {
    return "Akses disetujui. Mengarahkan ke halaman Kru/Vocalis...";
  }

  if (status === "pending") {
    return "Pendaftaran berhasil. Mohon tunggu persetujuan admin Khoirunnada.";
  }

  if (status === "rejected") {
    return "Pendaftaran belum dapat disetujui. Silakan hubungi admin jika ada kekeliruan.";
  }

  if (status === "inactive") {
    return "Akses Kru/Vocalis sedang dinonaktifkan oleh admin.";
  }

  return "Akun belum memiliki akses Kru/Vocalis.";
}

function getFirebaseErrorMessage(error) {
  if (error?.message && !String(error.message).startsWith("Firebase:")) {
    return error.message;
  }

  if (error?.code === "auth/popup-closed-by-user") {
    return "Login dibatalkan. Silakan coba lagi.";
  }

  if (error?.code === "auth/email-already-in-use") {
    return "Email ini sudah terdaftar. Silakan login.";
  }

  if (error?.code === "auth/invalid-email") {
    return "Format email belum benar.";
  }

  if (error?.code === "auth/weak-password") {
    return "Password minimal 6 karakter.";
  }

  if (
    error?.code === "auth/invalid-credential" ||
    error?.code === "auth/user-not-found" ||
    error?.code === "auth/wrong-password"
  ) {
    return "Email atau password tidak sesuai.";
  }

  if (error?.code === "auth/too-many-requests") {
    return "Terlalu banyak percobaan. Coba lagi beberapa saat lagi.";
  }

  if (String(error?.message || "").includes("Missing or insufficient permissions")) {
    return "Izin Firestore belum sesuai. Cek rules untuk koleksi Kru/Vocalis.";
  }

  return "Proses gagal. Silakan coba beberapa saat lagi.";
}

export default function KruVocalisLoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageType, setMessageType] = useState("info");
  const [message, setMessage] = useState("");
  const [statusCard, setStatusCard] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    mainRole: "",
  });

  const isRegisterMode = mode === "register";

  function setField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
    setStatusCard(null);
  }

  function showInfo(nextMessage) {
    setMessageType("info");
    setMessage(nextMessage);
  }

  function showSuccess(nextMessage) {
    setMessageType("success");
    setMessage(nextMessage);
  }

  function showError(nextMessage) {
    setMessageType("error");
    setMessage(nextMessage);
  }

  function handleAccessResult(result) {
    const profile = result?.profile || null;
    const status = String(profile?.status || "").toLowerCase();

    if (status === "approved") {
      showSuccess(getStatusMessage("approved"));

      window.setTimeout(() => {
        router.replace("/kru-vocalis");
      }, 450);

      return;
    }

    setStatusCard(profile);
    showInfo(getStatusMessage(status));
  }

  async function handleEmailSubmit(event) {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setMessage("");
    setStatusCard(null);

    try {
      if (isRegisterMode) {
        const result = await registerKruWithEmailPassword(formData);

        handleAccessResult(result);
        return;
      }

      const result = await loginKruWithEmailPassword({
        email: formData.email,
        password: formData.password,
      });

      handleAccessResult(result);
    } catch (error) {
      console.error("Gagal proses Kru/Vocalis:", error);
      showError(getFirebaseErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleGoogleProcess() {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setMessage("");
    setStatusCard(null);

    try {
      const result = isRegisterMode
        ? await registerKruWithGoogle({
            phone: formData.phone,
            mainRole: formData.mainRole,
          })
        : await loginKruWithGoogle();

      handleAccessResult(result);
    } catch (error) {
      console.error("Gagal proses Google Kru/Vocalis:", error);
      showError(getFirebaseErrorMessage(error));
    } finally {
      setIsProcessing(false);
    }
  }

  function switchMode(nextMode) {
    if (isProcessing) {
      return;
    }

    setMode(nextMode);
    setMessage("");
    setStatusCard(null);
    setShowPassword(false);
    setIsRoleDropdownOpen(false);
  }

  function selectRole(role) {
    setField("mainRole", role);
    setIsRoleDropdownOpen(false);
  }

  return (
    <PageContainer className="flex min-h-dvh items-center justify-center px-5 py-8">
      <div className="w-full max-w-[360px]">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/42 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.014)_42%,rgba(0,0,0,0.22)_100%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.045)]" />

          <div className="relative z-10">
            <p className="mb-2 text-center text-[1.55rem] font-black leading-none tracking-[-0.055em] text-amber-300 drop-shadow-[0_10px_28px_rgba(0,0,0,0.72)]">
              {isRegisterMode ? "Daftar Kru/Vocalis" : "Login Kru/Vocalis"}
            </p>

            <p className="mx-auto mb-5 max-w-[16rem] text-center text-xs font-semibold leading-5 text-slate-500">
              {isRegisterMode
                ? "Ajukan akses anggota internal Khoirunnada."
                : "Masuk ke akses khusus anggota internal Khoirunnada."}
            </p>

            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src="/logo/khoirunnada-logo.png"
                  alt="Khoirunnada"
                  className="h-[4.25rem] w-[4.25rem] rounded-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
                />

                <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/18 bg-[#15120b] text-amber-200 shadow-lg shadow-black/35">
                  <VocalistIcon className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-5 h-px w-32 bg-gradient-to-r from-transparent via-amber-300/45 to-transparent" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-amber-300/12 bg-black/30 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                disabled={isProcessing}
                className={`min-h-10 rounded-xl text-xs font-black uppercase tracking-[0.18em] transition active:scale-[0.98] disabled:cursor-not-allowed ${
                  !isRegisterMode
                    ? "bg-amber-300/15 text-amber-100"
                    : "text-slate-500"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => switchMode("register")}
                disabled={isProcessing}
                className={`min-h-10 rounded-xl text-xs font-black uppercase tracking-[0.18em] transition active:scale-[0.98] disabled:cursor-not-allowed ${
                  isRegisterMode
                    ? "bg-amber-300/15 text-amber-100"
                    : "text-slate-500"
                }`}
              >
                Daftar
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleEmailSubmit}>
              {isRegisterMode ? (
                <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/40 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                  <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
                    <UserIcon className="h-4 w-4" />
                  </span>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => setField("name", event.target.value)}
                    placeholder="Nama lengkap"
                    autoComplete="name"
                    disabled={isProcessing}
                    className="relative z-10 min-h-[3.2rem] w-full bg-transparent px-4 pl-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>
              ) : null}

              <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/40 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
                  <UserIcon className="h-4 w-4" />
                </span>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setField("email", event.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  disabled={isProcessing}
                  className="relative z-10 min-h-[3.2rem] w-full bg-transparent px-4 pl-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/40 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
                  <KeyIcon className="h-4 w-4" />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(event) => setField("password", event.target.value)}
                  placeholder={
                    isRegisterMode ? "Password minimal 6 karakter" : "Password"
                  }
                  autoComplete={isRegisterMode ? "new-password" : "current-password"}
                  disabled={isProcessing}
                  className="relative z-10 min-h-[3.2rem] w-full bg-transparent px-4 pl-14 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  disabled={isProcessing}
                  className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-white/85 shadow-inner shadow-black/20 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {isRegisterMode ? (
                <>
                  <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/40 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                    <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
                      <PhoneIcon className="h-4 w-4" />
                    </span>

                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      placeholder="Nomor WhatsApp"
                      autoComplete="tel"
                      disabled={isProcessing}
                      className="relative z-10 min-h-[3.2rem] w-full bg-transparent px-4 pl-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
                    />
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() =>
                        setIsRoleDropdownOpen((current) => !current)
                      }
                      className={`relative flex min-h-[3.2rem] w-full items-center justify-between overflow-hidden rounded-2xl border px-4 text-left text-sm font-semibold outline-none shadow-lg shadow-black/20 backdrop-blur-xl transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${
                        isRoleDropdownOpen
                          ? "border-amber-300/45 bg-black/45 shadow-[0_0_0_3px_rgba(245,197,66,0.07)]"
                          : "border-amber-300/12 bg-black/34"
                      }`}
                    >
                      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                      <span
                        className={`relative z-10 ${
                          formData.mainRole ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {formData.mainRole || "Pilih role yang diajukan"}
                      </span>

                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/80">
                        <ChevronDownIcon
                          className={`h-4 w-4 transition ${
                            isRoleDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {isRoleDropdownOpen ? (
                      <div className="mt-2 overflow-hidden rounded-2xl border border-amber-300/18 bg-[#050507]/98 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.62)] backdrop-blur-2xl">
                        <div className="relative z-10 max-h-64 overflow-y-auto py-1">
                          {KRU_ROLES.map((role) => {
                            const isSelected = formData.mainRole === role;

                            return (
                              <button
                                key={role}
                                type="button"
                                onClick={() => selectRole(role)}
                                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition active:scale-[0.99] ${
                                  isSelected
                                    ? "bg-amber-300/14 text-amber-100"
                                    : "text-slate-300 hover:bg-white/[0.04]"
                                }`}
                              >
                                <span>{role}</span>

                                {isSelected ? (
                                  <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(245,197,66,0.65)]" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}

              {message ? (
                <div
                  className={`rounded-2xl px-4 py-3 text-center text-xs font-semibold leading-5 ${
                    messageType === "error"
                      ? "border border-red-400/20 bg-red-500/10 text-red-100"
                      : messageType === "success"
                        ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                        : "border border-amber-300/18 bg-amber-300/10 text-amber-100"
                  }`}
                >
                  {message}
                </div>
              ) : null}

              {statusCard ? (
                <div className="rounded-2xl border border-amber-300/12 bg-black/32 px-4 py-3 text-left">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-amber-300">
                    Status Akses
                  </p>

                  <p className="mt-2 text-sm font-black text-white">
                    {String(statusCard.status || "pending").toUpperCase()}
                  </p>

                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">
                    {getStatusMessage(
                      String(statusCard.status || "pending").toLowerCase()
                    )}
                  </p>
                </div>
              ) : null}

              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="relative flex min-h-[2.95rem] w-[76%] items-center justify-center overflow-hidden rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber-100/35" />
                  <span className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-black/35" />

                  {isProcessing
                    ? "Memproses..."
                    : isRegisterMode
                      ? "Daftar Akses"
                      : "Masuk"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-slate-500">
                {isRegisterMode ? "Atau Daftar Dengan" : "Login Dengan"}
              </p>

              <div className="mt-3 flex items-center justify-center">
                <button
                  type="button"
                  aria-label={
                    isRegisterMode ? "Daftar dengan Google" : "Login dengan Google"
                  }
                  onClick={handleGoogleProcess}
                  disabled={isProcessing}
                  className="flex h-11 min-w-44 items-center justify-center gap-2 rounded-2xl border border-amber-300/10 bg-black/32 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-200 shadow-lg shadow-black/20 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Google
                </button>
              </div>

              <p className="mx-auto mt-5 max-w-[17rem] text-xs font-semibold leading-5 text-slate-500">
                {isRegisterMode ? "Sudah punya akun?" : "Belum punya akses?"}{" "}
                <button
                  type="button"
                  onClick={() =>
                    switchMode(isRegisterMode ? "login" : "register")
                  }
                  disabled={isProcessing}
                  style={{ color: "#f5c542" }}
                  className="font-extrabold decoration-[#f5c542]/35 underline-offset-4 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isRegisterMode ? "Login di sini" : "Daftar dahulu"}
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}