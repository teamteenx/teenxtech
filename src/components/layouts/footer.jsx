import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Instagram, Music2 } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const getFuckingDate = new Date().getFullYear();

  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full p-8">
            <Icons.logo className="icon-class w-24" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <Link href="#hero" className="hover:text-primary">
              Home
            </Link>
            <Link href="#about" className="hover:text-primary">
              About
            </Link>
            <Link href="#benefits" className="hover:text-primary">
              Benefits
            </Link>
            <Link href="#services" className="hover:text-primary">
              Services
            </Link>
            <Link href="#faq" className="hover:text-primary">
              Faq
            </Link>
            <Link href="#contact" className="hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Link
              href="https://www.instagram.com/teenx.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link
              href="https://www.tiktok.com/@teen.x.team"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Music2 className="h-4 w-4" />
                <span className="sr-only">Tiktok</span>
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {getFuckingDate} TEENX TECH. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
