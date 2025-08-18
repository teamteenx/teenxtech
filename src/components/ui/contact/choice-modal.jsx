"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export function ContactChoiceModal({
  open,
  onClose,
  onWhatsApp,
  onEmail,
  sendingEmail,
}) {
  const firstBtnRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      firstBtnRef.current?.focus();
      const onKey = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={() => !sendingEmail && onClose?.()}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-[101] w-[92%] max-w-md rounded-xl border bg-background p-6 text-foreground shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-lg font-semibold">Kirim pesan via</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Pilih metode kontak. WhatsApp akan membuka chat baru dengan data Anda.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            ref={firstBtnRef}
            variant="secondary"
            onClick={onWhatsApp}
            disabled={sendingEmail}
            className="w-full"
          >
            WhatsApp
          </Button>
          <Button onClick={onEmail} disabled={sendingEmail} className="w-full">
            {sendingEmail ? "Mengirim..." : "Email"}
          </Button>
        </div>
        <button
          className="mt-4 w-full text-center text-sm text-muted-foreground underline"
          onClick={() => !sendingEmail && onClose?.()}
        >
          Batal
        </button>
      </div>
    </div>
  );
}
