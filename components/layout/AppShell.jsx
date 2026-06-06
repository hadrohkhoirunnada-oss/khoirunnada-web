"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileFrame from "@/components/layout/MobileFrame";
import FloatingBookingButton from "@/components/shared/FloatingBookingButton";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const safePathname = pathname || "";

  const isBookingPage = safePathname === "/booking";
  const isAdminPage = safePathname.startsWith("/admin");
  const isLoginPage = safePathname === "/login";

  const showHeader = !isAdminPage && !isLoginPage;
  const showFooter = !isAdminPage && !isLoginPage;
  const showFloatingBooking =
    hasMounted && !isBookingPage && !isAdminPage && !isLoginPage;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020617] text-white">
      <div className="no-scrollbar h-dvh w-full overflow-y-auto overflow-x-hidden">
        <MobileFrame>
          {showHeader ? <Header /> : null}
          {children}
          {showFooter ? <Footer /> : null}
          {showFloatingBooking ? <FloatingBookingButton /> : null}
        </MobileFrame>
      </div>
    </div>
  );
}