export function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email || "");
}

export function normalizePhoneForWa(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return "62" + digits;
}

export function buildWaMessage(form) {
  const lines = [
    "Halo TEENX, saya ingin menghubungi via WhatsApp.",
    "",
    `Nama: ${(form.firstName || "").trim()} ${(
      form.lastName || ""
    ).trim()}`.trim(),
    `Email: ${form.email || "-"}`,
    `Subjek: ${form.subject || "-"}`,
    "Pesan:",
    form.message || "-",
  ];
  return encodeURIComponent(lines.join("\n"));
}
