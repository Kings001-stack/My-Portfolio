"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

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

export default function About() {
  const aboutRef = useScrollFade();
  return (
    <div
      ref={aboutRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 scroll-fade"
    >
      <div className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 glow-icon text-center">
          About Me
        </h1>
        <Image
          src="/my pic.jpg"
          alt="My Photo"
          width={160}
          height={160}
          className="w-24 h-24 sm:w-32 sm:h-32 40:h-40 rounded-full mb-4 sm:mb-6 border-4 border-white shadow-lg img-effect"
        />
        <p className="w-full text-center text-sm sm:text-base lg:text-lg mb-4 px-4 sm:px-6 lg:px-8">
          Hi, I&apos;m{" "}
          <span className="text-primary font-bold">Emmanuel King Ugwu</span>, a
          passionate Software Designer and Full Stack Developer. I specialize in
          building beautiful, functional digital experiences for web and mobile
          platforms.
          <br />
          <br />
          <span className="text-primary">Expertise:</span> React, Next.js,
          Node.js, Python, PHP, MySQL, MongoDB, and more.
          <br />
          <span className="text-primary">Strengths:</span> UI/UX design,
          performance optimization, clean code, and creative problem-solving.
          <br />
          <span className="text-primary">Interests:</span> 3D web, animation,
          open source, and AI-driven interfaces.
        </p>
        <div className="flex gap-3 sm:gap-4 lg:gap-6 mt-4">
          <a
            href="https://github.com/Kings001-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-icon-animated delay-1"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/emmanuel-king-ugwu/"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-icon-animated delay-2"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        {/* About Icons Section */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-300 text-center">
            What I Do
          </h3>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 flex-wrap justify-center">
            <div className="glow-icon-animated delay-1">
              <i className="bi bi-laptop"></i>
            </div>
            <div className="glow-icon-animated delay-2">
              <i className="bi bi-phone"></i>
            </div>
            <div className="glow-icon-animated delay-3">
              <i className="bi bi-palette"></i>
            </div>
            <div className="glow-icon-animated delay-4">
              <i className="bi bi-gear"></i>
            </div>
            <div className="glow-icon-animated delay-5">
              <i className="bi bi-lightbulb"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
