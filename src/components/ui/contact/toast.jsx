"use client";
import React from "react";
import { X } from "lucide-react";

export function ContactToast({
  open,
  onOpenChange,
  message,
  type = "success",
}) {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <div
        role="status"
        aria-live="polite"
        className={[
          "flex max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition",
          isSuccess
            ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
            : "border-red-500/30 bg-red-500/15 text-red-200",
          "backdrop-blur",
        ].join(" ")}
      >
        <div
          className={[
            "mt-0.5 size-2 rounded-full",
            isSuccess ? "bg-emerald-400" : "bg-red-400",
          ].join(" ")}
        />
        <div className="flex-1 text-sm leading-relaxed">{message}</div>
        <button
          aria-label="Close notification"
          onClick={() => onOpenChange?.(false)}
          className="ml-2 rounded p-1 text-white/70 hover:text-white"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
