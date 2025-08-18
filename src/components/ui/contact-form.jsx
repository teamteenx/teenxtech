"use client";

import React from "react";
import { ContactFormFields } from "@/components/ui/contact/form-fields";
import { ContactChoiceModal } from "@/components/ui/contact/choice-modal";
import { useContactForm } from "@/hooks/useContactForm";
import { ContactToast } from "@/components/ui/contact/toast";

export const ContactForm = ({
  title = "Hubungi Kami",
  description = "Kami siap membantu Anda dengan segala kebutuhan IT. Apakah Anda memiliki pertanyaan, ingin memesan layanan, atau hanya ingin berbincang? Jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau melalui informasi kontak yang tersedia.",
  phone = "0878-1251-4126",
  email = "teamteenx@gmail.com",
  web = { label: "shadcnblocks.com", url: "https://shadcnblocks.com" },
}) => {
  const {
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
  } = useContactForm({ phone });

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastType, setToastType] = React.useState("success");

  React.useEffect(() => {
    if (!resultMsg) return;
    const lower = resultMsg.toLowerCase();
    const isError =
      lower.includes("gagal") ||
      lower.includes("kesalahan") ||
      lower.includes("failed") ||
      lower.includes("error");
    setToastType(isError ? "error" : "success");
    setToastOpen(true);
    const t = setTimeout(() => setToastOpen(false), 3500);
    return () => clearTimeout(t);
  }, [resultMsg]);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          {/* Left: info */}
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="underline"
                  >
                    {phone}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a
                    href={web.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {web.label}
                  </a>
                </li>
              </ul>
              {resultMsg && (
                <p
                  className="mt-4 text-sm text-foreground/80"
                  role="status"
                  aria-live="polite"
                >
                  {resultMsg}
                </p>
              )}
            </div>
          </div>

          {/* Right: form */}
          <ContactFormFields
            form={form}
            errors={errors}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      {/* Choice modal */}
      <ContactChoiceModal
        open={choiceOpen}
        onClose={() => !sendingEmail && setChoiceOpen(false)}
        onWhatsApp={contactViaWhatsApp}
        onEmail={contactViaEmail}
        sendingEmail={sendingEmail}
      />

      {/* Toast notification */}
      <ContactToast
        open={toastOpen}
        onOpenChange={setToastOpen}
        message={resultMsg}
        type={toastType}
      />
    </section>
  );
};
