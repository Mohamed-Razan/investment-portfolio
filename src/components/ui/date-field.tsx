"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

// Native <input type="date"> always renders in the browser/OS locale format,
// which can't be forced to dd/mm/yyyy via CSS or the `lang` attribute in Chrome.
// This renders a masked text field for display/entry while submitting an ISO
// (yyyy-mm-dd) value under `name`, which is what the rest of the app expects.

function isoToDisplay(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  const [, y, m, d] = match;
  return `${d}/${m}/${y}`;
}

function displayToIso(display: string): string {
  const match = display.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  const [, d, m, y] = match;
  return `${y}-${m}-${d}`;
}

function maskDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join("/");
}

export function DateField({
  id,
  name,
  defaultValue,
  required,
}: {
  id?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [display, setDisplay] = useState(isoToDisplay(defaultValue ?? ""));

  return (
    <>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder="dd/mm/yyyy"
        pattern="\d{2}/\d{2}/\d{4}"
        maxLength={10}
        required={required}
        value={display}
        onChange={(e) => setDisplay(maskDigits(e.target.value))}
      />
      <input type="hidden" name={name} value={displayToIso(display)} />
    </>
  );
}
