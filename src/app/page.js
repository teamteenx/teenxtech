"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { NavFuckingBar } from "@/components/layouts/navbar";
import ScrollSection from "@/components/ui/ScrollSection";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const AboutSection = dynamic(
  () =>
    import("@/components/layouts/sections/about").then((m) => m.AboutSection),
  { ssr: true, loading: () => <SectionSkeleton minH={700} /> }
);
const BenefitsSection = dynamic(
  () =>
    import("@/components/layouts/sections/benefits").then(
      (m) => m.BenefitsSection
    ),
  { ssr: true, loading: () => <SectionSkeleton minH={700} /> }
);
const ServicesSection = dynamic(
  () =>
    import("@/components/layouts/sections/services").then(
      (m) => m.ServicesSection
    ),
  { ssr: true, loading: () => <SectionSkeleton minH={800} /> }
);
const FAQSection = dynamic(
  () => import("@/components/layouts/sections/faq").then((m) => m.FAQSection),
  { ssr: true, loading: () => <SectionSkeleton minH={700} /> }
);
const ContactSection = dynamic(
  () =>
    import("@/components/layouts/sections/contact").then(
      (m) => m.ContactSection
    ),
  { ssr: true, loading: () => <SectionSkeleton minH={800} /> }
);
const CtaConsult = dynamic(
  () =>
    import("@/components/layouts/sections/cta-consult").then(
      (m) => m.CtaConsult
    ),
  { ssr: true, loading: () => <SectionSkeleton minH={300} /> }
);
const Hero = dynamic(
  () => import("@/components/layouts/sections/hero").then((m) => m.Hero),
  { ssr: true }
);
const Footer = dynamic(
  () => import("@/components/layouts/footer").then((m) => m.Footer),
  { ssr: true }
);

function SectionSkeleton({ minH = 600 }) {
  return (
    <div
      className="mx-auto w-full max-w-6xl animate-pulse rounded-2xl border border-white/10 bg-white/5 dark:bg-neutral-900/60"
      style={{ minHeight: minH }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const activeId = useScrollSpy({ selector: "section[id]", heroId: "hero" });

  useEffect(() => {
    if (!activeId) return;
    const newHash = activeId === "hero" ? "" : `#${activeId}`;
    const targetUrl = newHash
      ? `${location.pathname}${newHash}`
      : location.pathname;
    const currentUrl = location.pathname + location.hash;
    if (targetUrl !== currentUrl) history.replaceState(null, "", targetUrl);
  }, [activeId]);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    const nav = document.querySelector("[data-navbar]");
    const navH = nav ? nav.getBoundingClientRect().height : 0;
    if (target) {
      const y = window.scrollY + target.getBoundingClientRect().top - navH - 8;
      window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
    }
  }, []);

  return (
    <>
      <NavFuckingBar />

      <ScrollSection id="hero" className="scroll-section">
        <div aria-label="Hero" className="relative">
          <Hero />
        </div>
      </ScrollSection>

      <ScrollSection id="about">
        <AboutSection />
      </ScrollSection>

      <ScrollSection id="benefits">
        <BenefitsSection />
      </ScrollSection>

      <ScrollSection id="services">
        <ServicesSection />
      </ScrollSection>

      <CtaConsult />

      <ScrollSection id="faq">
        <FAQSection />
      </ScrollSection>

      <ScrollSection id="contact">
        <ContactSection />
      </ScrollSection>

      <Footer />
    </>
  );
}
