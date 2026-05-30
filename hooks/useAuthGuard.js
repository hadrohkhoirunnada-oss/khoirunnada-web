"use client";

export default function useAuthGuard() {
  return {
    user: null,
    loading: false,
    isAllowed: false,
  };
}
