"use client";

import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((current) => !current);
  const open = () => setValue(true);
  const close = () => setValue(false);

  return { value, toggle, open, close, setValue };
}
