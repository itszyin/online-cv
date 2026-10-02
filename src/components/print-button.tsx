"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return (
    <button
      type="button"
      className="print-button"
      onClick={() => window.print()}
    >
      <Printer size={14} aria-hidden="true" />
      Print / Save PDF
    </button>
  );
}
