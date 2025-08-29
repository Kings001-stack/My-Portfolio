"use client";

import React, { useRef, useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import Testimonials from "../components/Testimonials";

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

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Mr. Charles onah",
      role: "CEO",
      company: "Realtime bricks LTD.",
      image: "/charle.jpg", // Using existing image as placeholder
      text: "Emmanuel delivered an exceptional website that perfectly captured our brand's essence. His attention to detail and technical expertise made the entire process smooth and enjoyable.",
    },
    {
      id: 2,
      name: "Dr. Ifeoma Umeh",
      role: "Product Manager",
      company: "Immaculate heart Intl.",
      image: "/ifeoma.png", // Using existing image as placeholder
      text: "Working with Emmanuel was a game-changer for our startup. He not only built a beautiful platform but also provided valuable insights that improved our user experience significantly.",
    },
    {
      id: 3,
      name: "Mr Lukman",
      role: "HR",
      company: "Lincoln college of science, management and technology",
      image: "/Picture1.png", // Using existing image as placeholder
      text: "Emmanuel's work exceeded our expectations. His ability to translate our vision into a functional, elegant website while maintaining excellent communication throughout the project was impressive.",
    },
    {
      id: 4,
      name: "Mrs Augusta Ugwu",
      role: "Forensics officer",
      company: "EFCC",
      image: "/augusta.png", // Using existing image as placeholder
      text: "Emmanuel King is a very hardworking and dedicated person. He is a very good developer and he is always willing to help others. He is a very good team player and he is always willing to learn new things. He is a very good problem solver and he is always willing to help others. He is a very good communicator and he is always willing to help others. He is a very good leader and he is always willing to help others. He is a very good problem solver and he is always willing to help others. He is a very good communicator and he is always willing to help others. He is a very good leader and he is always willing to help others. He is a very good problem solver and he is always willing to help others. He is a very good communicator and he is always willing to help others. He is a very good leader and he is always willing to help others.",
    },
  ];

  return (
    <div
      ref={aboutRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 scroll-fade"
    >
      <div className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 glow-icon text-center">
          About Me
        </h1>
        <ImageCarousel
          images={["/mypic.jpg", "/dp 2.jpg", "/profile.png"]}
          width={240}
          height={240}
          autoPlayMs={3500}
          roundedClass="rounded-[40px]"
          fit="contain"
          className="mb-6 sm:mb-8 shadow-lg"
        />
        <p className="w-full text-center text-sm sm:text-base lg:text-lg mb-6 px-4 sm:px-6 lg:px-8">
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

        {/* Testimonials Section */}
        <div className="mt-12 sm:mt-16 w-full">
          <Testimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}
