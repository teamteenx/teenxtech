"use client";
import React from "react";
import {
  validateEmail,
  normalizePhoneForWa,
  buildWaMessage,
} from "@/components/ui/contact/utils";

export function useContactForm({ phone }) {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState({});
  const [choiceOpen, setChoiceOpen] = React.useState(false);
  const [sendingEmail, setSendingEmail] = React.useState(false);
  const [resultMsg, setResultMsg] = React.useState("");
  const botRef = React.useRef("");

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "botField") {
      botRef.current = value;
      return;
    }
    setForm((f) => ({ ...f, [id]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Wajib diisi";
    if (!validateEmail(form.email)) e.email = "Email tidak valid";
    if (!form.subject.trim()) e.subject = "Wajib diisi";
    if (!form.message.trim()) e.message = "Wajib diisi";
    if (botRef.current) e._spam = "Spam terdeteksi";
    setErrors(e);
    return (
      Object.keys(e).filter((k) => k !== "_spam").length === 0 &&
      !botRef.current
    );
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setResultMsg("");
    if (!validate()) return;
    setChoiceOpen(true);
  };

  const contactViaWhatsApp = () => {
    const waNumber = normalizePhoneForWa(phone || "0878-1251-4126");
    const url = `https://wa.me/${waNumber}?text=${buildWaMessage(form)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setChoiceOpen(false);
  };

  const contactViaEmail = async () => {
    try {
      setSendingEmail(true);
      setResultMsg("");
      const res = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Gagal mengirim email");
      setResultMsg("Pesan terkirim. Kami akan segera membalas.");
      setChoiceOpen(false);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setResultMsg(err.message || "Terjadi kesalahan saat mengirim.");
    } finally {
      setSendingEmail(false);
    }
  };

  return {
    form,
    errors,
    resultMsg,
    choiceOpen,
    sendingEmail,
    setChoiceOpen,
    onChange,
    onSubmit,
    contactViaWhatsApp,
    contactViaEmail,
  };
}
