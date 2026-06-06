"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAllowedAdminEmail } from "@/constants/admin";
import { listenAuthState, logoutAdmin } from "@/services/authService";

export default function useAuthGuard({
  redirectTo = "/login",
  redirectIfDenied = true,
} = {}) {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    isAllowed: false,
    isRejected: false,
  });

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = listenAuthState(async (currentUser) => {
      if (!isMounted) {
        return;
      }

      if (!currentUser) {
        setAuthState({
          user: null,
          loading: false,
          isAllowed: false,
          isRejected: false,
        });

        if (redirectIfDenied) {
          router.replace(redirectTo);
        }

        return;
      }

      const allowed = isAllowedAdminEmail(currentUser.email);

      if (!allowed) {
        setAuthState({
          user: currentUser,
          loading: false,
          isAllowed: false,
          isRejected: true,
        });

        try {
          await logoutAdmin();
        } catch (error) {
          console.error("Gagal logout user yang tidak diizinkan:", error);
        }

        if (redirectIfDenied) {
          router.replace(`${redirectTo}?error=not-authorized`);
        }

        return;
      }

      setAuthState({
        user: currentUser,
        loading: false,
        isAllowed: true,
        isRejected: false,
      });
    });

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [redirectIfDenied, redirectTo, router]);

  return authState;
}