import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import { INITIAL_KRU_PROFILE, KRU_ROLE_OPTIONS } from "@/data/initialKruVocalis";

export const metadata = {
  title: "Kru/Vocalis | Khoirunnada",
  description:
    "Halaman profil dan area internal Kru/Vocalis Khoirunnada Majelis Sholawat.",
};

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 6.75 15.25 12l-5.5 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function RoleIcon({ className = "" }) {
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
        strokeWidth="1.8"
      />
      <path
        d="M6.75 10.25a5.25 5.25 0 0 0 10.5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 15.5v3.75M9.25 19.25h5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12 4.25 2.15 4.36 4.81.7-3.48 3.39.82 4.79L12 15.23l-4.3 2.26.82-4.79-3.48-3.39 4.81-.7L12 4.25Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function SettingsIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M18.75 12a7.2 7.2 0 0 0-.08-1.03l1.68-1.32-1.75-3.02-2.02.82a7.08 7.08 0 0 0-1.77-1.02l-.3-2.18h-3.5l-.3 2.18a7.08 7.08 0 0 0-1.77 1.02l-2.02-.82-1.75 3.02 1.68 1.32a7.2 7.2 0 0 0 0 2.06l-1.68 1.32 1.75 3.02 2.02-.82c.54.43 1.14.78 1.77 1.02l.3 2.18h3.5l.3-2.18c.63-.24 1.23-.59 1.77-1.02l2.02.82 1.75-3.02-1.68-1.32c.05-.34.08-.68.08-1.03Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ACCOUNT_MENUS = [
  {
    title: "Edit Profil",
    description: "Lengkapi nama, foto, dan identitas anggota.",
    icon: UserIcon,
    status: "Disiapkan",
    href: "/kru-vocalis/edit-profil",
  },
  {
    title: "Role Kru/Vocalis",
    description: "Atur peran seperti vocalis, terbang, bass, dan lainnya.",
    icon: RoleIcon,
    status: "Disiapkan",
    href: "/kru-vocalis/role",
  },
];

const FAVORITE_MENUS = [
  {
    title: "Qosidah Favorit",
    description: "Bacaan qosidah yang sering dibuka atau disimpan.",
    icon: StarIcon,
    status: "0 Bacaan",
    href: "/kru-vocalis/favorit/qosidah",
  },
  {
    title: "Wirid Favorit",
    description: "Wirid pilihan untuk latihan dan amalan rutin.",
    icon: StarIcon,
    status: "0 Bacaan",
    href: "/kru-vocalis/favorit/wirid",
  },
  {
    title: "Maulid Favorit",
    description: "Bacaan maulid yang ingin disimpan anggota.",
    icon: StarIcon,
    status: "0 Bacaan",
    href: "/kru-vocalis/favorit/maulid",
  },
];

const INTERNAL_MENUS = [
  {
    title: "Catatan Latihan",
    description: "Simpan catatan nada, tugas, dan kebutuhan latihan.",
    icon: NoteIcon,
    status: "Segera",
    href: "/kru-vocalis/catatan",
  },
  {
    title: "Pengaturan Akun",
    description: "Kelola akses dan preferensi akun internal.",
    icon: SettingsIcon,
    status: "Segera",
    href: "/kru-vocalis/pengaturan",
  },
];

function MenuItem({ title, description, status, icon: Icon, href }) {
  const content = (
    <div className="group flex min-h-[4.9rem] items-center justify-between gap-4 rounded-[1.55rem] border border-amber-300/10 bg-black/30 px-4 py-3 shadow-lg shadow-black/20 active:scale-[0.99]">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/12 bg-[#121009] text-amber-200">
          <Icon className="h-5 w-5" />
        </span>

        <div className="min-w-0">
          <h3 className="truncate text-[0.95rem] font-black tracking-[-0.04em] text-white">
            {title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500">
            {description}
          </p>
          {status ? (
            <p className="mt-1.5 text-[0.58rem] font-black uppercase tracking-[0.18em] text-amber-300/75">
              {status}
            </p>
          ) : null}
        </div>
      </div>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300/10 bg-[#070706] text-amber-300">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export default function KruVocalisPage() {
  return (
    <PageContainer className="pb-28 pt-7">
      <section className="relative overflow-hidden rounded-[2.2rem] border border-amber-300/14 bg-black/36 px-5 pb-6 pt-7 shadow-[0_24px_80px_rgba(0,0,0,0.44)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.18),transparent_44%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_45%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.34em] text-amber-300">
            Profil Anggota
          </p>

          <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border border-amber-300/20 bg-black/34 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <img
              src={INITIAL_KRU_PROFILE.avatarUrl}
              alt={INITIAL_KRU_PROFILE.name}
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <h1 className="mt-5 text-[1.85rem] font-black leading-none tracking-[-0.065em] text-white">
            {INITIAL_KRU_PROFILE.name}
          </h1>

          <p className="mt-2 text-sm font-bold text-slate-500">
            @{INITIAL_KRU_PROFILE.username}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-amber-300/16 bg-amber-300/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-amber-200">
              {INITIAL_KRU_PROFILE.role}
            </span>

            <span className="rounded-full border border-emerald-300/16 bg-emerald-400/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-emerald-200">
              {INITIAL_KRU_PROFILE.status}
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-[17rem] text-xs font-semibold leading-6 text-slate-400">
            {INITIAL_KRU_PROFILE.note}
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-[1.8rem] border border-amber-300/10 bg-black/24 p-3 shadow-lg shadow-black/20">
        <div className="grid grid-cols-3 gap-2">
          {KRU_ROLE_OPTIONS.slice(0, 3).map((role) => (
            <div
              key={role.id}
              className="rounded-[1.3rem] border border-amber-300/10 bg-black/32 px-2 py-3 text-center"
            >
              <p className="truncate text-[0.68rem] font-black text-white">
                {role.label}
              </p>
              <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.14em] text-amber-300/70">
                Role
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Akun Kru
          </p>
        </div>

        <div className="space-y-3">
          {ACCOUNT_MENUS.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Bacaan Favorit
          </p>
        </div>

        <div className="space-y-3">
          {FAVORITE_MENUS.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-3 px-1">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-amber-300">
            Lainnya
          </p>
        </div>

        <div className="space-y-3">
          {INTERNAL_MENUS.map((item) => (
            <MenuItem key={item.title} {...item} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}