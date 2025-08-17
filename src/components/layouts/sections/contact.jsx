import { ContactForm } from "@/components/ui/contact-form";

export const ContactSection = () => {
  return (
    <ContactForm
      title="Hubungi Kami"
      description="Kami siap membantu Anda dengan segala kebutuhan IT. Apakah Anda memiliki pertanyaan, ingin memesan layanan, atau hanya ingin berbincang? Jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau melalui informasi kontak yang tersedia."
      phone="0878-1251-4126"
      email="teamteenx@gmail.com"
      web={{ label: "shadcnblocks.com", url: "https://shadcnblocks.com" }}
    />
  );
};
