"use client";

import { useState } from "react";

export default function useBookingForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const updateValue = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return { values, setValues, updateValue };
}
