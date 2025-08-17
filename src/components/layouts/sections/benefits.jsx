"use client";

import { CheckCircle, Clock, DollarSign, Smartphone } from "lucide-react";
export function BenefitsSection() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-title"
      className="relative overflow-hidden bg-white text-black"
    >
      {/* Decorative shapes (skip on small screens) */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden="true"
      >
        <div className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-black/5" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-black/3" />
      </div>

      <div className="container relative mx-auto px-6 py-16 sm:py-24 lg:py-32">
        <header className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/10 px-4 py-1.5 text-sm font-medium text-black/80">
            <span className="inline-block size-1.5 rounded-full bg-black/60" />
            Benefits
          </div>

          <h2
            id="benefits-title"
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Kenapa Harus <span className="text-black/70">TEENX?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-relaxed text-black/75 sm:text-lg">
            Kami bukan cuma sekadar jasa service, kami adalah solusi IT lengkap
            untuk kamu. Dari perbaikan hardware hingga software, kami siap
            membantu kamu dengan cepat dan profesional.
          </p>
        </header>

        {/* Responsive grid: 1col → 2col → 4col */}
        <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4 group-[&:hover]:">
          <BenefitCard
            number="01"
            icon={CheckCircle}
            title="Fix Sekali, Tenang Terus"
            description="Kami nggak cuma beresin permukaan, tapi tuntas sampai akar, bikin masalah sulit balik lagi."
          />
          <BenefitCard
            number="02"
            icon={Clock}
            title="Pengen cepat? Bisa banget"
            description="Kapan pun lo butuh, kami hadir. Cepat, tepat, dan selalu siap tempur."
          />
          <BenefitCard
            number="03"
            icon={DollarSign}
            title="Harga terjangkau"
            description="Service berkualitas enggak harus mahal. Kita bikin semua affordable tapi tetap premium."
          />
          <BenefitCard
            number="04"
            icon={Smartphone}
            title="Konsultasi tanpa biaya"
            description="Mulai dengan konsultasi gratis untuk menemukan solusi IT yang tepat buat kebutuhan lo."
          />
        </ul>
      </div>
    </section>
  );
}

function BenefitCard({ number, icon: Icon, title, description }) {
  return (
    <li className="group relative rounded-2xl border border-black/10 bg-black/5 p-6 transition-colors duration-200 hover:border-black/20 hover:bg-black/8">
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xl font-bold text-black/45 sm:text-2xl">
            {number}
          </span>
          <span className="flex size-8 items-center justify-center rounded-lg border border-black/20 bg-black lg:bg-black/10 text-white/80 lg:group-hover:bg-black transition-colors duration-200">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold sm:text-xl">{title}</h3>
        <p className="text-sm leading-relaxed text-black/75 sm:text-base">
          {description}
        </p>
      </div>
    </li>
  );
}
