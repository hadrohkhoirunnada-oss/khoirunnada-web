"use client";

import { useEffect, useState } from "react";

export default function useFloatingPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    let firstPopupTimeout;
    let hideTimeout;
    let interval;

    const hidePopup = () => {
      setIsVisible(false);
    };

    const showPopup = () => {
      if (document.hidden) {
        return;
      }

      setIsVisible(true);

      window.clearTimeout(hideTimeout);

      hideTimeout = window.setTimeout(hidePopup, 1800);
    };

    const startPopupSchedule = () => {
      window.clearTimeout(firstPopupTimeout);
      window.clearInterval(interval);

      firstPopupTimeout = window.setTimeout(showPopup, 2200);
      interval = window.setInterval(showPopup, 11000);
    };

    const stopPopupSchedule = () => {
      window.clearTimeout(firstPopupTimeout);
      window.clearTimeout(hideTimeout);
      window.clearInterval(interval);
      setIsVisible(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPopupSchedule();
        return;
      }

      startPopupSchedule();
    };

    startPopupSchedule();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPopupSchedule();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}