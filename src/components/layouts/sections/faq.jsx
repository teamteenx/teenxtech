import { FaqYou } from "@/components/ui/faq-you";

const DEMO_FAQS = [
  {
    question: "Apa aja jenis perangkat yang bisa kami servis",
    answer:
      " Kami melayani perbaikan laptop, PC desktop, perangkat periferal (kayak keyboard, mouse), dan perangkat lunak (software troubleshooting, install ulang, optimasi, dll).",
  },
  {
    question: "Berapa lama waktu pengerjaannya?",
    answer:
      "Tergantung tingkat kerusakan dan antrian. Umumnya: servis ringan 1 hari; sedang–berat 2–5 hari. Ada opsi express service jika butuh cepat.",
  },
  {
    question: "Apa jaminannya setelah perangkat diperbaiki?",
    answer:
      "Garansi pengerjaan hingga 7 hari. Kami dokumentasikan hasil servis; jika ada kendala lanjutan, siap bantu tanpa ribet.",
  },
  {
    question: "Apakah harus datang langsung untuk servis?",
    answer:
      " Tidak harus. Kita bisa atur penjemputan dan pengantaran perangkat tanpa ribet.",
  },
  {
    question: "Apakah TEENX juga jual produk atau cuma jasa servis aja?",
    answer:
      "Kami juga punya program reseller & affiliate untuk produk digital maupun hardware. Bisa gabung untuk komisi atau beli produk terpercaya lewat kami.",
  },
  {
    question: "Kenapa harus pilih TEENX?",
    answer:
      "Kami cari akar masalah dan perbaiki tuntas supaya tidak kambuh. Harga tetap ramah dan layanan digital-friendly.",
  },
];

export function FAQSection() {
  return (
    <FaqYou
      badgeText="FAQ"
      title="Pertanyaan yang Sering Diajukan"
      description="Informasi singkat seputar layanan TEENX. Hubungi kami jika masih ada yang ingin ditanyakan."
      items={DEMO_FAQS}
      contactInfo={{
        title: "Ingin tahu lebih lanjut?",
        description: "Kami siap membantu kamu.",
        buttonText: "Hubungi Kami",
      }}
    />
  );
}
