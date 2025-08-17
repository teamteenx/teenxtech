import dynamic from "next/dynamic";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Link from "next/link";

export const LavaLamp = dynamic(
  () => import("@/components/fluid-blob").then((m) => m.LavaLamp),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-black" /> }
);

export function CtaConsult() {
  return (
    <section className="overflow-hidden">
      <div className="relative flex h-[500px] w-screen flex-col items-center justify-center ">
        <LavaLamp />
        <h1 className="whitespace-nowrap text-4xl font-bold tracking-tight text-white mix-blend-exclusion lg:text-8xl">
          Konsultasi Gratis
        </h1>
        <p className="max-w-2xl text-center text-lg text-white mix-blend-exclusion lg:text-2xl leading-relaxed">
          Gimana kalo kamu coba konsultasi gratis dari kami ? iya beneran
          gratis! Mulai dari nanya masalah teknis, tips, sampai rekomendasi
          produk.
        </p>
        <div className="relative h-[200px] w-[800px]">
          <Link href="#contact">
            <LiquidButton className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion text-xl">
              Konsultasi Gratis
            </LiquidButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
