"use client";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Gpu, Code, AppWindow, User } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "Servis Hardware",
    content:
      "Perbaikan PC, laptop, dan berbagai aksesoris dengan pendekatan mendalam. Kami nggak cuma menambal masalah di permukaan, tapi nyelam sampai akar penyebabnya. Dengan metode ini, potensi masalah berulang bisa ditekan seminimal mungkin. Hasilnya? Perangkat lo kembali optimal dan tahan lama.",
    icon: Gpu,
    relatedIds: [2],
    relatedService: ["PC", "Laptop", "Mouse", "Keyboard", "Printer"],
    status: "hardware",
  },
  {
    id: 2,
    title: "Servis Software",
    content:
      "Mulai dari install ulang, optimasi performa, troubleshooting error, hingga setup sistem yang lebih efisien. Kami memastikan software lo berjalan mulus tanpa hambatan yang bikin produktivitas terganggu. Pendekatan kami fokus pada stabilitas jangka panjang, bukan cuma perbaikan instan. Semua dilakukan dengan proses yang rapi, transparan, dan aman.",
    icon: AppWindow,
    relatedIds: [1, 3],
    relatedService: [
      "OS",
      "Software",
      "Aplikasi",
      "Driver",
      "Antivirus",
      "Firewall",
      "Malware",
      "Backup",
    ],
    status: "software",
  },
  {
    id: 3,
    title: "Marketing & Reseller Program",
    content:
      "Bergabunglah sebagai affiliate untuk produk digital maupun hardware pilihan kami. Dapatkan komisi dari setiap penjualan melalui sistem yang jelas dan transparan. Program ini dirancang agar mudah diikuti, bahkan untuk yang baru memulai. Cocok untuk menambah penghasilan tanpa harus memikirkan stok atau pengiriman.",
    icon: User,
    relatedIds: [2, 4],
    relatedService: ["Reseller", "Affiliate", "Program", "Produk"],
    status: "marketing",
  },
  {
    id: 4,
    title: "Jasa Pembuatan Website",
    content:
      " Kami menyediakan layanan pembuatan website profesional, mulai dari konsep, desain, hingga pengembangan. Fokus kami adalah menciptakan tampilan yang menarik dan pengalaman pengguna yang nyaman. Website yang kami buat tidak hanya indah, tapi juga fungsional dan cepat diakses. Dukungan penuh kami pastikan agar website lo siap pakai dan mudah dikelola.",
    icon: Code,
    relatedIds: [3],
    relatedService: [
      "Web Development",
      "UI/UX Design",
      "Company Profile",
      "Portfolio",
      "Maintenance",
    ],
    status: "Website & Design",
  },
];

export const ServicesSection = () => {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
};
