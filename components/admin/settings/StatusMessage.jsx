"use client";

export default function StatusMessage({ status }) {
  if (!status?.message) {
    return null;
  }

  const isSuccess = status.type === "success";

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-bold leading-6 ${
        isSuccess
          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
          : "border-red-400/20 bg-red-500/10 text-red-100"
      }`}
    >
      {status.message}
    </div>
  );
}