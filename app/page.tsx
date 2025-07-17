"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Skills from "./skills/page";
import About from "./about/page";
import Contact from "./contact/page";
import Projects from "./projects/page";
import Link from "next/link";

const sections = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "About Me", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function useScrollFade() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        node.classList.add("visible");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return ref;
}

export default function Home() {
  const homeRef = useScrollFade();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-0">
      <div className="w-full flex flex-col items-center justify-center min-h-screen pt-8 pb-32">
        <div
          ref={homeRef}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 pb-24 scroll-fade glass"
        >
          <div className="mb-8 flex flex-col items-center">
            <Image
              src={"/profile.png"}
              alt="My Logo"
              width={120}
              height={120}
              className="glow-icon img-effect rounded-full"
            />
            <span className="mt-2 text-xl font-mono text-primary">
              @EmmanuelKing
            </span>
          </div>
          <div className="bg-[#181818bb] rounded-lg p-8 shadow-lg max-w-4xl w-full glass">
            <pre className="mt-3 text-lg font-mono text-white leading-relaxed select-none">
              {`function FocusMode() {
  disable('distractions');

  while (energy.level > 80) {

    if (productivity.rate < optimal) {
      productivity.boost('💡');
    }
    create(awesomeProjects);
    debug(life);
    
  }
  deploy(portfolio);
}

// Powered by Next.js, React ⚛️, and dangerously high caffeine levels ☕️
`}
            </pre>
          </div>
          <h1 className="mt-8 text-4xl font-extrabold text-center glow-icon">
            Software Designer & Full Stack Developer
          </h1>
          <p className="mt-4 text-lg text-center max-w-lg">
            Welcome! I build beautiful, performant digital experiences with code
            and creativity.
            <br />
            <span className="flex flex-row justify-center gap-8 mt-6">
              <span
                className="inline-flex flex-col items-center px-8 py-6 rounded-2xl font-semibold text-white shadow-xl border border-blue-900/40 bg-opacity-80 backdrop-blur-md glass-card transition-transform duration-200 cursor-pointer hover:-translate-y-2 hover:shadow-blue-500/40"
                style={{
                  background:
                    "linear-gradient(90deg, #1e293b 80%, #2563eb 100%)",
                }}
              >
                <span className="text-3xl font-bold mb-3 flex items-center gap-2">
                  {/* UI/UX Icon */}
                  <svg
                    className="w-7 h-7 text-blue-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  UI/UX Design
                </span>
                <span className="text-base font-normal text-blue-100 text-center mt-2">
                  Intuitive, beautiful interfaces and seamless user journeys for
                  web and mobile.
                </span>
              </span>
              <span
                className="inline-flex flex-col items-center px-8 py-6 rounded-2xl font-semibold text-white shadow-xl border border-purple-900/40 bg-opacity-80 backdrop-blur-md glass-card transition-transform duration-200 cursor-pointer hover:-translate-y-2 hover:shadow-purple-500/40"
                style={{
                  background:
                    "linear-gradient(90deg, #2a183b 80%, #a21caf 100%)",
                }}
              >
                <span className="text-3xl font-bold mb-3 flex items-center gap-2">
                  {/* Web Icon */}
                  <svg
                    className="w-7 h-7 text-purple-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                    />
                  </svg>
                  Web Development
                </span>
                <span className="text-base font-normal text-purple-100 text-center mt-2">
                  Modern, scalable websites and web apps built for performance
                  and impact.
                </span>
              </span>
              <span
                className="inline-flex flex-col items-center px-8 py-6 rounded-2xl font-semibold text-white shadow-xl border border-red-900/40 bg-opacity-80 backdrop-blur-md glass-card transition-transform duration-200 cursor-pointer hover:-translate-y-2 hover:shadow-red-500/40"
                style={{
                  background:
                    "linear-gradient(90deg, #3b1e1e 80%, #dc2626 100%)",
                }}
              >
                <span className="text-3xl font-bold mb-3 flex items-center gap-2">
                  {/* Mobile Icon */}
                  <svg
                    className="w-7 h-7 text-red-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <circle cx="12" cy="18" r="1" />
                  </svg>
                  Mobile Development
                </span>
                <span className="text-base font-normal text-red-100 text-center mt-2">
                  Cross-platform mobile apps with native feel and great design.
                </span>
              </span>
            </span>
          </p>
          <div className="mt-8 flex gap-6">
            <Link href="/projects" className="glow-btn">
              View Projects
            </Link>
            <Link href="/skills" className="glow-btn">
              Explore Skills
            </Link>
            <Link href="/contact" className="glow-btn">
              Contact Me
            </Link>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <span className="text-sm text-gray-400">
              Am also a level 5 hacker{" "}
              <span className="animate-bounce">🤫</span>
            </span>
          </div>

          {/* Glowing Tech Icons Section */}
          <div className="mt-16 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">
              Technologies I Work With
            </h3>
            <div className="flex gap-6 flex-wrap justify-center">
              <div className="glow-icon-animated delay-1">
                <i className="bi bi-code-slash"></i>
              </div>
              <div className="glow-icon-animated delay-2">
                <i className="bi bi-braces"></i>
              </div>
              <div className="glow-icon-animated delay-3">
                <i className="bi bi-database"></i>
              </div>
              <div className="glow-icon-animated delay-4">
                <i className="bi bi-phone"></i>
              </div>
              <div className="glow-icon-animated delay-5">
                <i className="bi bi-palette"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
