"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";

const KRU_WHATSAPP_URL =
  "https://wa.me/6285173057576?text=Assalamu%27alaikum%20admin%2C%20saya%20ingin%20bertanya%20akun%20login%20Kru%2FVocalis%20Khoirunnada.";

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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
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

function FacebookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#1877F2"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.56v1.91h2.76l-.44 2.91h-2.32V22C18.34 21.25 22 17.08 22 12.06Z"
      />
      <path
        fill="#fff"
        d="m15.89 14.97.44-2.91h-2.76v-1.91c0-.79.39-1.56 1.62-1.56h1.25V6.13s-1.14-.2-2.23-.2c-2.28 0-3.77 1.39-3.77 3.91v2.22H7.9v2.91h2.54V22a10.13 10.13 0 0 0 3.13 0v-7.03h2.32Z"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

export default function KruVocalisLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (loginLoading) {
      return;
    }

    if (!identifier.trim() || !password.trim()) {
      setMessage("Mohon isi username/email dan password terlebih dahulu.");
      return;
    }

    setLoginLoading(true);
    setMessage("");

    window.setTimeout(() => {
      setLoginLoading(false);
      setMessage(
        "Frontend login Kru/Vocalis sudah siap. Sistem akses internal akan disambungkan pada tahap backend berikutnya."
      );
    }, 450);
  }

  function handleSocialLogin(providerName) {
    if (loginLoading) {
      return;
    }

    setMessage(
      `Login menggunakan ${providerName} belum diaktifkan. Sistem akses internal akan disambungkan pada tahap backend berikutnya.`
    );
  }

  return (
    <PageContainer className="flex min-h-[calc(100dvh-5.5rem)] items-center justify-center px-5 py-8">
      <div className="w-full max-w-[350px]">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-300/14 bg-black/42 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.014)_42%,rgba(0,0,0,0.22)_100%)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(245,197,66,0.045)]" />

          <div className="relative z-10">
            <p className="mb-2 text-center text-[1.55rem] font-black leading-none tracking-[-0.055em] text-amber-300 drop-shadow-[0_10px_28px_rgba(0,0,0,0.72)]">
              Login Kru/Vocalis
            </p>

            <p className="mx-auto mb-5 max-w-[15rem] text-center text-xs font-semibold leading-5 text-slate-500">
              Akses khusus anggota internal Khoirunnada.
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

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/34 shadow-lg shadow-black/20 backdrop-blur-xl transition focus-within:border-amber-300/40 focus-within:shadow-[0_0_0_3px_rgba(245,197,66,0.07)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-amber-100/75">
                  <UserIcon className="h-4 w-4" />
                </span>

                <input
                  type="text"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Username / Email"
                  autoComplete="username"
                  disabled={loginLoading}
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
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Password"
                  autoComplete="current-password"
                  disabled={loginLoading}
                  className="relative z-10 min-h-[3.2rem] w-full bg-transparent px-4 pl-14 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  disabled={loginLoading}
                  className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 bg-black/35 text-white/85 shadow-inner shadow-black/20 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {message ? (
                <div className="rounded-2xl border border-amber-300/18 bg-amber-300/10 px-4 py-3 text-center text-xs font-semibold leading-5 text-amber-100">
                  {message}
                </div>
              ) : null}

              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="relative flex min-h-[2.95rem] w-[68%] items-center justify-center overflow-hidden rounded-2xl border border-amber-300/18 bg-[linear-gradient(180deg,#8f6418_0%,#5f3b08_50%,#2f1d05_100%)] px-5 text-sm font-black text-amber-50 shadow-[0_14px_30px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,236,178,0.28)] transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-amber-100/35" />
                  <span className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-black/35" />
                  {loginLoading ? "Memproses..." : "Masuk"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-slate-500">
                Login Dengan
              </p>

              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Login dengan Google"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={loginLoading}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/10 bg-black/32 shadow-lg shadow-black/20 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleIcon className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  aria-label="Login dengan Facebook"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={loginLoading}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/10 bg-black/32 shadow-lg shadow-black/20 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FacebookIcon className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  aria-label="Login dengan nomor HP"
                  onClick={() => handleSocialLogin("Nomor HP")}
                  disabled={loginLoading}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/10 bg-black/32 text-amber-200 shadow-lg shadow-black/20 transition active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PhoneIcon className="h-5 w-5" />
                </button>
              </div>

              <p className="mx-auto mt-5 max-w-[15rem] text-xs font-semibold leading-5 text-slate-500">
                Belum punya akun?{" "}
                <a
                  href={KRU_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#f5c542" }}
                  className="font-extrabold decoration-[#f5c542]/35 underline-offset-4 transition hover:opacity-90"
                >
                  Tanya Admin
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}