"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="w-full flex flex-col items-center justify-center min-h-screen pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24">
        <div
          ref={homeRef}
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 pb-16 sm:pb-20 lg:pb-24 scroll-fade glass w-full max-w-6xl"
        >
          <div className="mb-6 sm:mb-8 flex flex-col items-center">
            <Image
              src={"/profile.png"}
              alt="My Logo"
              width={120}
              height={120}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 glow-icon img-effect rounded-full"
            />
            <span className="mt-2 text-lg sm:text-xl lg:text-2xl font-mono text-primary">
              @EmmanuelKing
            </span>
          </div>
          <div className="bg-[#181818bb] rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg w-full max-w-4xl glass">
            <pre className="mt-3 text-sm sm:text-base lg:text-lg font-mono text-white leading-relaxed select-none overflow-x-auto">
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
          <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center glow-icon px-4">
            Software Designer & Full Stack Developer
          </h1>
          <p className="mt-4 text-base sm:text-lg text-center max-w-lg px-4">
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
                <span className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-2">
                  {/* UI/UX Icon */}
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-blue-200"
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
                <span className="text-sm sm:text-base font-normal text-blue-100 text-center mt-2">
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
                <span className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-2">
                  {/* Web Icon */}
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-purple-200"
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
                <span className="text-sm sm:text-base font-normal text-purple-100 text-center mt-2">
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
                <span className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-2">
                  {/* Mobile Icon */}
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-red-200"
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
                <span className="text-sm sm:text-base font-normal text-red-100 text-center mt-2">
                  Cross-platform mobile apps with native feel and great design.
                </span>
              </span>
            </span>
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
            <Link href="/projects" className="glow-btn text-center">
              View Projects
            </Link>
            <Link href="/skills" className="glow-btn text-center">
              Explore Skills
            </Link>
            <Link href="/contact" className="glow-btn text-center">
              Contact Me
            </Link>
          </div>
          <div className="mt-8 sm:mt-12 flex flex-col items-center px-4">
            <span className="text-xs sm:text-sm text-gray-400">
              Am also a level 5 hacker{" "}
              <span className="animate-bounce">🤫</span>
            </span>
          </div>

          {/* Glowing Tech Icons Section */}
          <div className="mt-12 sm:mt-16 flex flex-col items-center px-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-300">
              Technologies I Work With
            </h3>
            <div className="flex gap-3 sm:gap-4 lg:gap-6 flex-wrap justify-center">
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
