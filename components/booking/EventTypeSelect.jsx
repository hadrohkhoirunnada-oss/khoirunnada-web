"use client";

import { useState } from "react";
import { EVENT_TYPES } from "@/constants/booking";

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m7 9.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EventTypeSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = value || "Pilih jenis acara";

  const handleSelect = (eventType) => {
    onChange(eventType);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label
        htmlFor="event-type"
        className="text-xs font-extrabold uppercase tracking-[0.28em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
      >
        Jenis Acara
      </label>

      <button
        id="event-type"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`mt-3 flex min-h-13 w-full items-center justify-between gap-3 rounded-2xl border bg-black/38 px-4 text-left text-sm font-extrabold shadow-lg shadow-black/20 outline-none backdrop-blur-xl transition ${
          isOpen
            ? "border-amber-300/45 bg-black/48 text-white shadow-[0_0_0_3px_rgba(245,197,66,0.08)]"
            : "border-amber-300/14 text-white"
        }`}
        aria-expanded={isOpen}
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            value ? "text-white" : "text-slate-500"
          }`}
        >
          {selectedLabel}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/14 bg-black/30 text-amber-200 transition duration-300 ${
            isOpen ? "rotate-180 border-amber-300/35 bg-amber-300/10" : ""
          }`}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-amber-300/18 bg-[#070910]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_44%,rgba(0,0,0,0.22))]" />
          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />

          <div className="relative z-10 space-y-1">
            <button
              type="button"
              onClick={() => handleSelect("")}
              className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-sm font-bold transition active:scale-[0.99] ${
                !value
                  ? "bg-amber-300/13 text-amber-100"
                  : "text-slate-300 hover:bg-white/[0.04]"
              }`}
            >
              <span>Pilih jenis acara</span>

              {!value ? (
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(245,197,66,0.75)]" />
              ) : null}
            </button>

            {EVENT_TYPES.map((eventType) => {
              const isSelected = eventType === value;

              return (
                <button
                  key={eventType}
                  type="button"
                  onClick={() => handleSelect(eventType)}
                  className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-sm font-bold transition active:scale-[0.99] ${
                    isSelected
                      ? "bg-amber-300/13 text-amber-100"
                      : "text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">{eventType}</span>

                  {isSelected ? (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(245,197,66,0.75)]" />
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