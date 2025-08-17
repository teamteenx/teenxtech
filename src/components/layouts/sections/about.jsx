import { Monitor, Shield, Zap } from "lucide-react";

export function AboutSection() {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Minimal geometric background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white/[0.02]" />
        <div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-white/[0.01]" />
      </div>

      <div className="container relative mx-auto px-6 py-32">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-20 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border  px-4 py-2 text-sm font-medium border-white/10 bg-white/5 text-white/70">
              <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Tentang Kami
            </div>

            <h2 className="mx-auto mb-6 max-w-3xl text-5xl tracking-tight text-white lg:text-6xl font-bold">
              Partner IT Support
              <span className="block text-white/60">Masa Kini</span>
            </h2>

            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent  to-transparent via-white/20" />
          </div>

          {/* Description */}
          <div className="mb-20 text-center">
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/80">
              TEENX TECH hadir sebagai partner IT Support masa kini —
              menyediakan layanan perbaikan hardware, software, pengelolaan
              sistem, hingga program reseller & afiliasi.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              Dengan kecepatan, transparansi, dan solusi yang relevan, kami
              hadir untuk mendukung mereka yang tumbuh di tengah arus teknologi.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border  transition-all duration-300  border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10">
                <Zap className="h-7 w-7 transition-colors  text-white/70 group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Solusi Cepat
              </h3>
              <p className="text-white/60">
                Response time yang optimal dengan solusi tepat sasaran
              </p>
            </div>

            <div className="group text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300  border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10">
                <Shield className="h-7 w-7 transition-colors text-white/70 group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Transparan
              </h3>
              <p className="text-white/60">
                Komunikasi yang jelas dan harga yang fair
              </p>
            </div>

            <div className="group text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border  transition-all duration-300  border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10">
                <Monitor className="h-7 w-7  transition-colors  text-white/70 group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Ramah</h3>
              <p className="text-white/60">
                Pelayanan yang personal dan mudah dipahami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
