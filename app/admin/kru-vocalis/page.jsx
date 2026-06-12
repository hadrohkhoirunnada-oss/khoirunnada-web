"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import {
  getKruVocalisMembers,
  updateKruVocalisMemberStatus,
} from "@/services/kruVocalisAdminService";

const statusOptions = [
  {
    label: "Semua Status",
    shortLabel: "Semua",
    value: "all",
    description: "Tampilkan semua akses",
  },
  {
    label: "Menunggu Approval",
    shortLabel: "Pending",
    value: "pending",
    description: "Pendaftaran baru",
  },
  {
    label: "Akses Aktif",
    shortLabel: "Approved",
    value: "approved",
    description: "Sudah disetujui",
  },
  {
    label: "Ditolak",
    shortLabel: "Rejected",
    value: "rejected",
    description: "Akses tidak disetujui",
  },
  {
    label: "Nonaktif",
    shortLabel: "Inactive",
    value: "inactive",
    description: "Akses sementara dimatikan",
  },
];

function MembersIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8.75 11.75a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.75 19.25a5 5 0 0 1 10 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M16.75 10.25a2.75 2.75 0 1 0 0-5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M15.75 14.25a4.5 4.5 0 0 1 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M10.75 17.25a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m15.5 15.5 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m7.75 10 4.25 4.25L16.25 10"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ApproveIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m7.9 12.35 2.65 2.65 5.55-6.05"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RejectIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m8.75 8.75 6.5 6.5M15.25 8.75l-6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InactiveIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9.5 8.25v7.5M14.5 8.25v7.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function getInitials(nameOrEmail) {
  const cleanValue = String(nameOrEmail || "").trim();

  if (!cleanValue) {
    return "KV";
  }

  const parts = cleanValue.split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return cleanValue.slice(0, 2).toUpperCase();
  }

  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

function getStatusLabel(status) {
  const cleanStatus = normalizeText(status);

  if (cleanStatus === "approved") return "Approved";
  if (cleanStatus === "rejected") return "Rejected";
  if (cleanStatus === "inactive") return "Inactive";

  return "Pending";
}

function getStatusDescription(status) {
  const cleanStatus = normalizeText(status);

  if (cleanStatus === "approved") return "Akses Kru/Vocalis aktif";
  if (cleanStatus === "rejected") return "Pendaftaran ditolak";
  if (cleanStatus === "inactive") return "Akses sedang nonaktif";

  return "Menunggu persetujuan admin";
}

function getStatusClass(status) {
  const cleanStatus = normalizeText(status);

  if (cleanStatus === "approved") {
    return "border-emerald-300/18 bg-emerald-500/10 text-emerald-100 shadow-[0_0_22px_rgba(16,185,129,0.12)]";
  }

  if (cleanStatus === "rejected") {
    return "border-red-300/18 bg-red-500/10 text-red-100 shadow-[0_0_22px_rgba(248,113,113,0.1)]";
  }

  if (cleanStatus === "inactive") {
    return "border-slate-300/12 bg-slate-500/10 text-slate-200";
  }

  return "border-amber-300/18 bg-amber-300/10 text-amber-100 shadow-[0_0_22px_rgba(245,197,66,0.12)]";
}

function countByStatus(items, status) {
  return items.filter((item) => normalizeText(item.status) === status).length;
}

function StatusFilterDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    statusOptions.find((option) => option.value === value) || statusOptions[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-30">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`group relative flex min-h-[3.25rem] w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border px-4 text-left shadow-lg shadow-black/20 transition active:scale-[0.99] md:min-w-[215px] ${
          isOpen
            ? "border-amber-300/34 bg-amber-300/[0.075] text-amber-100"
            : "border-amber-300/12 bg-black/35 text-white hover:border-amber-300/22 hover:bg-white/[0.04]"
        }`}
        aria-expanded={isOpen}
      >
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)_48%,rgba(0,0,0,0.22))]" />
        <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/35 to-transparent opacity-70" />

        <span className="relative z-10 min-w-0">
          <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-amber-300/80">
            Filter
          </span>
          <span className="mt-0.5 block truncate text-sm font-black uppercase tracking-[0.14em]">
            {selectedOption.shortLabel}
          </span>
        </span>

        <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-100">
          <ChevronIcon
            className={`h-4 w-4 transition duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+0.7rem)] z-50 w-full min-w-[250px] overflow-hidden rounded-[1.35rem] border border-amber-300/18 bg-[#05070d]/98 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.62)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.12),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.28))]" />
          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/45 to-transparent" />

          <div className="relative z-10 space-y-1">
            {statusOptions.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition active:scale-[0.99] ${
                    isSelected
                      ? "border-amber-300/22 bg-amber-300/10 text-amber-100"
                      : "border-transparent text-slate-300 hover:border-amber-300/12 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-black">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[0.68rem] font-semibold text-slate-500">
                      {option.description}
                    </span>
                  </span>

                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      isSelected ? "bg-amber-300" : "bg-slate-700"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MemberActionButton({
  type = "button",
  children,
  icon,
  onClick,
  disabled,
  variant = "neutral",
}) {
  const variantClass = {
    approve:
      "border-emerald-300/16 bg-emerald-500/12 text-emerald-100 hover:border-emerald-300/28 hover:bg-emerald-500/16",
    reject:
      "border-red-300/16 bg-red-500/10 text-red-100 hover:border-red-300/28 hover:bg-red-500/14",
    inactive:
      "border-slate-300/12 bg-slate-500/10 text-slate-100 hover:border-slate-300/20 hover:bg-slate-500/14",
    neutral:
      "border-amber-300/14 bg-amber-300/10 text-amber-100 hover:border-amber-300/24 hover:bg-amber-300/14",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl border px-3 text-[0.68rem] font-black uppercase tracking-[0.14em] shadow-lg shadow-black/20 transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]}`}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_45%,rgba(0,0,0,0.18))]" />
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
      <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current/15 bg-black/18">
        {icon}
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default function Page() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    let isMounted = true;

    async function loadMembers() {
      setLoading(true);
      setMessage("");

      try {
        const data = await getKruVocalisMembers();

        if (!isMounted) return;

        setMembers(data);
      } catch (error) {
        console.error("Gagal memuat data Kru/Vocalis:", error);

        if (!isMounted) return;

        setMessageType("error");
        setMessage(error?.message || "Gagal memuat data Kru/Vocalis.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMembers = useMemo(() => {
    const keyword = normalizeText(query);

    return members.filter((member) => {
      const memberStatus = normalizeText(member.status);
      const matchesStatus =
        statusFilter === "all" || memberStatus === statusFilter;

      const searchableText = [
        member.name,
        member.email,
        member.phone,
        member.mainRole,
        member.status,
      ]
        .map(normalizeText)
        .join(" ");

      const matchesKeyword = !keyword || searchableText.includes(keyword);

      return matchesStatus && matchesKeyword;
    });
  }, [members, query, statusFilter]);

  async function handleStatusChange(member, nextStatus) {
    const memberId = String(member?.id || "").trim();

    if (!memberId) {
      setMessageType("error");
      setMessage("ID anggota tidak valid.");
      return;
    }

    let note = "";

    if (nextStatus === "rejected") {
      const promptedNote = window.prompt(
        `Alasan menolak akses ${member?.name || "anggota"}?`,
        member?.approvalNote || ""
      );

      if (promptedNote === null) return;

      note = promptedNote;
    }

    if (nextStatus === "inactive") {
      const promptedNote = window.prompt(
        `Catatan nonaktif untuk ${member?.name || "anggota"}?`,
        member?.approvalNote || "Akses dinonaktifkan oleh admin."
      );

      if (promptedNote === null) return;

      note = promptedNote;
    }

    setProcessingId(memberId);
    setMessageType("info");
    setMessage("Memperbarui status akses...");

    try {
      const updatedData = await updateKruVocalisMemberStatus({
        memberId,
        status: nextStatus,
        approvalNote: note,
      });

      setMembers((currentMembers) =>
        currentMembers.map((currentMember) =>
          currentMember.id === memberId
            ? {
                ...currentMember,
                ...updatedData,
              }
            : currentMember
        )
      );

      setMessageType("success");
      setMessage(
        `Status ${member?.name || "anggota"} berhasil diubah menjadi ${getStatusLabel(
          nextStatus
        )}.`
      );
    } catch (error) {
      console.error("Gagal memperbarui status:", error);

      setMessageType("error");
      setMessage(error?.message || "Gagal memperbarui status akses.");
    } finally {
      setProcessingId("");
    }
  }

  return (
    <AdminShell>
      <section className="space-y-5">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,197,66,0.1),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/14 bg-black/35 text-amber-200 shadow-inner shadow-black/25">
                <MembersIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
                  Admin Kru/Vocalis
                </p>

                <h1 className="mt-2 text-[1.7rem] font-black leading-tight tracking-[-0.06em] text-white">
                  Kelola Akses Kru/Vocalis
                </h1>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                  Tinjau pendaftaran anggota internal, setujui akses, tolak,
                  nonaktifkan, atau aktifkan kembali akses Kru/Vocalis
                  Khoirunnada.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Total
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {members.length}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Pending
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {countByStatus(members, "pending")}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Approved
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {countByStatus(members, "approved")}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-3">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-amber-300/85">
                  Inactive
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {countByStatus(members, "inactive")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-visible rounded-[1.75rem] border border-amber-300/14 bg-black/34 p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_44%,rgba(0,0,0,0.2))]" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />

          <div className="relative z-10 space-y-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300">
                Data Akses
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Daftar akun yang mengajukan atau memiliki akses Kru/Vocalis.
              </p>
            </div>

            {message ? (
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
                  {message}
                </p>
              </div>
            ) : null}

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div className="relative overflow-hidden rounded-2xl border border-amber-300/12 bg-black/35 shadow-lg shadow-black/20">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.008)_48%,rgba(0,0,0,0.16))]" />

                <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/12 bg-black/35 text-amber-100/80">
                  <SearchIcon className="h-4 w-4" />
                </span>

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari nama, email, WhatsApp..."
                  className="relative z-10 min-h-[3.25rem] w-full bg-transparent px-4 pr-14 text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <StatusFilterDropdown
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>

            {loading ? (
              <div className="rounded-2xl border border-amber-300/12 bg-black/30 px-4 py-5 text-center">
                <p className="text-sm font-bold text-slate-300">
                  Memuat data Kru/Vocalis...
                </p>
              </div>
            ) : filteredMembers.length > 0 ? (
              <div className="space-y-3">
                {filteredMembers.map((member) => {
                  const isProcessing = processingId === member.id;
                  const status = normalizeText(member.status);

                  const isPending = status === "pending";
                  const isApproved = status === "approved";
                  const isInactive = status === "inactive";
                  const isRejected = status === "rejected";

                  const canApprove = isPending || isInactive || isRejected;
                  const canReject = isPending;
                  const canInactive = isApproved;

                  return (
                    <article
                      key={member.id}
                      className="group relative overflow-hidden rounded-[1.55rem] border border-amber-300/12 bg-black/32 p-4 shadow-lg shadow-black/20"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,197,66,0.08),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012)_46%,rgba(0,0,0,0.24))]" />
                      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/35 to-transparent" />

                      <div className="relative z-10">
                        <div className="flex items-start gap-3">
                          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/16 bg-black/38 text-base font-black text-amber-100 shadow-inner shadow-black/30">
                            {member.photoURL ? (
                              <img
                                src={member.photoURL}
                                alt={member.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              getInitials(member.name || member.email)
                            )}

                            <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <h2 className="truncate text-base font-black leading-tight tracking-[-0.04em] text-white">
                                  {member.name}
                                </h2>

                                <p className="mt-1 truncate text-xs font-semibold text-slate-400">
                                  {member.email}
                                </p>
                              </div>

                              <span
                                className={`w-fit shrink-0 rounded-full border px-3 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.16em] ${getStatusClass(
                                  status
                                )}`}
                              >
                                {getStatusLabel(status)}
                              </span>
                            </div>

                            <p className="mt-2 text-[0.72rem] font-semibold leading-5 text-slate-500">
                              {getStatusDescription(status)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-2 sm:grid-cols-3">
                          <div className="rounded-2xl border border-amber-300/10 bg-black/28 px-3 py-3">
                            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/80">
                              Role
                            </p>
                            <p className="mt-1 text-sm font-black leading-5 text-white">
                              {member.mainRole || "Belum ada"}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-amber-300/10 bg-black/28 px-3 py-3">
                            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/80">
                              WhatsApp
                            </p>
                            <p className="mt-1 text-sm font-black leading-5 text-white">
                              {member.phone || "-"}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-amber-300/10 bg-black/28 px-3 py-3">
                            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-amber-300/80">
                              Source
                            </p>
                            <p className="mt-1 break-words text-sm font-black leading-5 text-white">
                              {member.source || "-"}
                            </p>
                          </div>
                        </div>

                        {member.approvalNote ? (
                          <p className="mt-3 rounded-2xl border border-amber-300/10 bg-amber-300/[0.055] px-3 py-2 text-xs font-semibold leading-6 text-amber-100">
                            {member.approvalNote}
                          </p>
                        ) : null}

                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {canApprove ? (
                            <MemberActionButton
                              onClick={() =>
                                handleStatusChange(member, "approved")
                              }
                              disabled={isProcessing}
                              variant="approve"
                              icon={<ApproveIcon className="h-3.5 w-3.5" />}
                            >
                              {isInactive ? "Aktifkan" : "Approve"}
                            </MemberActionButton>
                          ) : null}

                          {canReject ? (
                            <MemberActionButton
                              onClick={() =>
                                handleStatusChange(member, "rejected")
                              }
                              disabled={isProcessing}
                              variant="reject"
                              icon={<RejectIcon className="h-3.5 w-3.5" />}
                            >
                              Reject
                            </MemberActionButton>
                          ) : null}

                          {canInactive ? (
                            <MemberActionButton
                              onClick={() =>
                                handleStatusChange(member, "inactive")
                              }
                              disabled={isProcessing}
                              variant="inactive"
                              icon={<InactiveIcon className="h-3.5 w-3.5" />}
                            >
                              Nonaktifkan
                            </MemberActionButton>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <AdminEmptyState
                title="Data Tidak Ditemukan"
                description="Belum ada pendaftaran Kru/Vocalis atau kata kunci pencarian tidak cocok."
              />
            )}
          </div>
        </section>
      </section>
    </AdminShell>
  );
}