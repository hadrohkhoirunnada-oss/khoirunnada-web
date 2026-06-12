"use client";

import { useEffect } from "react";

function canRegisterServiceWorker() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!("serviceWorker" in navigator)) {
    return false;
  }

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return window.location.protocol === "https:" || isLocalhost;
}

export default function PwaRegister() {
  useEffect(() => {
    if (!canRegisterServiceWorker()) {
      return;
    }

    function registerServiceWorker() {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          registration.update();
        })
        .catch((error) => {
          console.error("Gagal mendaftarkan service worker PWA:", error);
        });
    }

    window.addEventListener("load", registerServiceWorker);

    return () => {
      window.removeEventListener("load", registerServiceWorker);
    };
  }, []);

  return null;
}