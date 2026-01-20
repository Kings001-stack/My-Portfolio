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
        {/* Initial theme to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const s = localStorage.getItem('theme'); const t = s || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); document.documentElement.setAttribute('data-theme', t); } catch (e) {} })();`,
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
        <nav className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[96%] max-w-[400px]">
          <div className="flex items-center justify-between bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-1 py-1 shadow-2xl">

            <div className="flex items-center gap-0 flex-1 min-w-0 overflow-hidden">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.href}
                  className="flex flex-1 min-w-0 flex-col items-center gap-0 p-0.5 rounded-md transition-all duration-200 hover:bg-white/5 group text-center"
                >
                  <i
                    className={`${section.icon} text-[12px] group-hover:text-primary transition-colors`}
                  ></i>
                  <span className="text-[8px] font-medium group-hover:text-primary transition-colors whitespace-nowrap truncate w-full px-0.5">
                    {section.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex items-center flex-shrink-0 pl-1.5">
              <Link
                href="/contact"
                className="hire-animate px-3 py-1.5 text-white font-bold rounded-xl border border-white/10 flex items-center justify-center gap-1.5 text-[11px] whitespace-nowrap shadow-xl"
                aria-label="Hire me"
              >
                <i className="bi bi-briefcase-fill text-[11px]"></i>
                <span className="tracking-tight">Hire Me</span>
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
