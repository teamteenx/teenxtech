"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizeable-navbar";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export function NavFuckingBar() {
  const navItems = useMemo(
    () => [
      { name: "Home", link: "#hero" },
      { name: "About", link: "#about" },
      { name: "Benefits", link: "#benefits" },
      { name: "Services", link: "#services" },
      { name: "FAQ", link: "#faq" },
      { name: "Contact", link: "#contact" },
    ],
    []
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((link) => {
    try {
      if (!link) return;
      if (link.startsWith("#")) {
        const id = link.slice(1);
        const el = document.getElementById(id);
        if (el) {
          // offset by navbar height var
          el.style.scrollMarginTop = "calc(var(--nav-h, 0px) + 8px)";
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        window.location.href = link;
      }
    } finally {
      setIsMobileMenuOpen(false);
    }
  }, []);

  const onMobileItemClick = useCallback(
    (e) => {
      e.preventDefault();
      const link = e.currentTarget.getAttribute("href");
      if (link) handleNavClick(link);
    },
    [handleNavClick]
  );

  return (
    <div className="relative w-full z-50">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={handleNavClick} />
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="relative text-black font-bold text-md bg-white p-2 rounded-lg hover:bg-transparent hover:text-white hover:border-[1px] hover:underline border-white transition-colors duration-200"
            >
              Konsultasi
            </Link>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              controlsId="mobile-menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            />
          </MobileNavHeader>

          <MobileNavMenu id="mobile-menu" isOpen={isMobileMenuOpen}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={onMobileItemClick}
                className="relative text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                href="#contact"
                className="relative text-black font-bold text-md bg-white p-3 rounded-lg hover:bg-transparent hover:text-white hover:border-[1px] border-white transition-colors duration-300"
              >
                Konsultasi
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
