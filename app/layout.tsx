import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import ThreeBackground from "./components/ThreeBackground";
import AnalyticsClient from "./components/AnalyticsClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sections = [
  { name: "Home", href: "/", icon: "bi-house" },
  { name: "Projects", href: "/projects", icon: "bi-folder" },
  { name: "Skills", href: "/skills", icon: "bi-code-slash" },
  { name: "About Me", href: "/about", icon: "bi-person" },
  { name: "Resume", href: "/resume", icon: "bi-file-earmark-text" },
];

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.example"
  ),
  title: "Emmanuel King Ugwu - Software Designer & Full Stack Developer",
  description:
    "Portfolio of Emmanuel King Ugwu, a passionate Software Designer and Full Stack Developer specializing in React, Next.js, and modern web technologies.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Emmanuel King Ugwu",
    "Full Stack Developer",
    "Software Designer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "UI/UX",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Emmanuel King Ugwu - Software Designer & Full Stack Developer",
    description:
      "Portfolio of Emmanuel King Ugwu, a passionate Software Designer and Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    url: "/",
    siteName: "Emmanuel King Ugwu",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Emmanuel King Ugwu Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel King Ugwu - Software Designer & Full Stack Developer",
    description:
      "Portfolio of Emmanuel King Ugwu, a passionate Software Designer and Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    images: ["/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.example";
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Theme is permanently set to dark, avoiding flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { document.documentElement.setAttribute('data-theme', 'dark'); })();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <ThreeBackground />
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 items-center justify-between gap-8 z-[1000] max-w-4xl w-full">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Logo"
              width={90}
              height={90}
              className="rounded-lg group-hover:scale-110 transition-transform duration-200"
            />
          </Link>
          <div className="flex gap-8">
            {sections.map((section) => (
              <Link
                key={section.name}
                href={section.href}
                className="flex items-center group focus:outline-none whitespace-nowrap"
              >
                <span className="glow-icon text-lg font-bold group-hover:text-primary transition-colors duration-200">
                  {section.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="glow-btn flex items-center gap-2 whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 7.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v.75m9 0v.75m0-.75h1.125A2.25 2.25 0 0120.25 9v7.5A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5V9A2.25 2.25 0 015.875 7.5H7.5m9 0h-9"
                />
              </svg>
              Hire Me
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] w-[95%] max-w-[400px]">
          <div className="flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-full p-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-evenly flex-1 px-1">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:bg-white/10 group relative"
                  title={section.name}
                >
                  <i
                    className={`${section.icon} text-[22px] text-gray-400 group-hover:text-white group-hover:scale-110 transition-all`}
                  ></i>
                  <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] py-1 px-2 rounded-lg border border-white/10 pointer-events-none whitespace-nowrap">
                    {section.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="pl-2 border-l border-white/10 flex-shrink-0">
              <Link
                href="/contact"
                className="flex items-center justify-center h-12 px-5 bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-400 hover:to-blue-200 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] transform hover:scale-105"
                aria-label="Hire me"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile floating controls removed; consolidated into bottom nav */}

        <div className="pb-28 sm:pb-28 lg:pb-32">
          <AnalyticsClient />
          {children}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Emmanuel King Ugwu",
              url: baseUrl,
              sameAs: [
                "https://github.com/Kings001-stack",
                "https://www.linkedin.com/in/emmanuel-king-ugwu/",
              ],
              jobTitle: "Full Stack Developer",
              knowsAbout: ["React", "Next.js", "TypeScript", "UI/UX"],
            }),
          }}
        />
      </body>
    </html>
  );
}
