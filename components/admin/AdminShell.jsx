"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-dvh bg-[#030712] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,66,0.11),transparent_34%),radial-gradient(circle_at_100%_0%,rgba(245,197,66,0.045),transparent_32%),linear-gradient(180deg,#090b10_0%,#040711_48%,#02040b_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1440px]">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <section className="min-w-0 flex-1">
          <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

          <div className="mx-auto w-full max-w-[1120px] px-4 pb-10 pt-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}