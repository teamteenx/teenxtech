"use client";
import { NavFuckingBar } from "@/components/layouts/navbar";
import { Hero } from "@/components/layouts/sections/hero";
import { AboutSection } from "@/components/layouts/sections/about";
import { BenefitsSection } from "@/components/layouts/sections/benefits";
import { ServicesSection } from "@/components/layouts/sections/services";
import { FAQSection } from "@/components/layouts/sections/faq";
import { CtaConsult } from "@/components/layouts/sections/cta-consult";
import { ContactSection } from "@/components/layouts/sections/contact";

import { useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ScrollSection } from "@/components/ui/ScrollSection";

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
    </>
  );
}
