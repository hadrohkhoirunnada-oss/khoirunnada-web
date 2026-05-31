"use client";

import { useEffect, useState } from "react";

export default function useFloatingPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimeout;

    const showPopup = () => {
      setIsVisible(true);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const firstPopup = setTimeout(showPopup, 1500);
    const interval = setInterval(showPopup, 6000);

    return () => {
      clearTimeout(firstPopup);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, []);

  return isVisible;
}