import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "TeenX";
const SITE_DESCRIPTION =
  "TEENX TECH — Partner IT Support masa kini. Servis hardware & software, pembuatan website, serta program reseller & affiliate. Cepat, transparan, profesional.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://teenxtech.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | " + SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "TEENX TECH",
    "IT Support",
    "Servis Laptop",
    "Servis Komputer",
    "Install Ulang",
    "Troubleshooting",
    "Pembuatan Website",
    "Affiliate",
    "Reseller",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/opium.svg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/images/opium.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/opium.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico" },
    ],
    shortcut: [{ url: "/images/opium.svg", type: "image/svg+xml" }],
    other: [{ rel: "mask-icon", url: "/images/opium.svg", color: "#000000" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "color-scheme": "dark",
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: "/images/opium.svg",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return (
    <html
      lang="id"
      dir="ltr"
      className={cn("dark", geistSans.variable, geistMono.variable)}
    >
      <head>
        {/* Preload LCP hero image */}
        <link rel="preload" as="image" href="/images/teenx.jpg" />
        {/* Structured data for SEO */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen overflow-x-hidden bg-neutral-950 text-gray-100 antialiased"
        )}
      >
        <a
          href="#content"
          className={cn(
            "sr-only focus:not-sr-only",
            "absolute left-3 top-3 z-50 rounded-md px-3 py-2",
            "bg-black text-white dark:bg-white dark:text-black"
          )}
        >
          Skip to content
        </a>
        <main id="content" role="main" className="min-h-svh">
          {children}
        </main>
      </body>
    </html>
  );
}
