"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizeable-navbar";
import Link from "next/link";
import { useCallback, useState } from "react";

export function NavFuckingBar() {
  const navItems = [
    {
      name: "Home",
      link: "#hero",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Benefits",
      link: "#benefits",
    },
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((link) => {
    try {
      if (!link) return;
      if (link.startsWith("#")) {
        const id = link.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const nav = document.querySelector("[data-navbar]");
          const navH = nav ? nav.getBoundingClientRect().height : 0;
          const top =
            window.scrollY + el.getBoundingClientRect().top - navH - 8;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      } else {
        window.location.href = link;
      }
    } finally {
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <div className="relative w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={handleNavClick} />
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="relative text-black font-bold text-md bg-white p-1 rounded-lg hover:bg-transparent hover:text-white hover:border-[1px] border-white transition-colors duration-300"
            >
              Konsultasi
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.link);
                }}
                className="relative text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="#contact"
                className="relative text-black font-bold text-md bg-white p-3 rounded-lg hover:bg-transparent hover:text-white hover:border-[1px] border-white transition-colors duration-300"
              >
                Konsultasi
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}
