"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Portfolio Website",
    image: "/port.png",
    description:
      "A modern, interactive portfolio built with Next.js, React, and Tailwind CSS, featuring glassmorphism and scroll effects.",
    link: "https://adeshina-pf.netlify.app/",
  },
  {
    title: "E-Commerce Platform",
    image: "/ecom.png",
    description:
      "A full-featured e-commerce web app with product search, cart, and secure checkout, using React, Node.js, and MongoDB.",
    link: "https://www.figma.com/design/klemxcEJQOJXDOynSqZAi5/UI-kit---Ecommerce-Mobile-App--Community-?node-id=244-2&p=f&t=8pHwmsja0sLYZpqN-0",
  },
  {
    title: "SaaS template",
    image: "/cms.png",
    description:
      "A modern SaaS template/boilerplate built with SvelteKit, Tailwind, and Supabase.",
    link: "https://saasstarter.work/",
  },
  {
    title: "NGO design",
    image: "/NGO.png",
    description: "A Figma prototype to display UI/UX of a NGO website",
    link: "https://www.figma.com/proto/1ZNb7QZSm3qcbtPTVp4Mdp/NGO?node-id=8-2&t=RxWhyXD82HtBDnHT-1&starting-point-node-id=8%3A2",
  },
  {
    title: "AI Chat Bot",
    image: "/AI.png",
    description:
      "A conversational AI chat bot with context memory, tool usage, and streaming responses, built with Next.js, OpenAI, and WebSockets.",
    link: "https://best-gold.vercel.app/",
  },
  {
    title: "Handyman Mobile App",
    image: "/HM.png",
    description:
      "A React Native app connecting homeowners with vetted handymen, featuring real-time chat, booking, and payments.",
    link: "https://your-handyman-app.com",
  },
  {
    title: "School Management System",
    image: "/sms.png",
    description:
      "End-to-end web platform for schools: admissions, attendance, grading, timetables, and analytics using Next.js and PostgreSQL.",
    link: "https://pageland-three.vercel.app/",
  },
  {
    title: "Real estate website",
    image: "/RTB.png",
    description:
      "A real estate website built with HTML, TailwindCSS, and JavaScript.",
    link: "https://realtimebricks.com/",
  },
  {
    title: "Pastry Shop Website",
    image: "/pastry.png",
    description:
      "A pastry shop website built with HTML, TailwindCSS, and JavaScript.",
    link: "https://pastry-smoky.vercel.app/",
  },
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

export default function ProjectsClient() {
  const projectsRef = useScrollFade();
  return (
    <div
      ref={projectsRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 scroll-fade"
    >
      <div className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl max-w-6xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 glow-icon">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col h-full items-center p-6 rounded-xl glass shadow-lg hover:scale-105 transition-transform"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={192}
                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 img-effect"
              />
              <h2 className="text-2xl font-bold mb-2 glow-icon">{project.title}</h2>
              <p className="text-gray-300 text-center mb-4 text-sm sm:text-base px-1">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn mt-auto"
              >
                View Project
              </a>
            </div>
          ))}
        </div>

        {/* Project Technologies Section */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">Technologies Used in Projects</h3>
          <div className="flex gap-4 sm:gap-7 flex-wrap justify-center">
            <div className="glow-icon-animated delay-1">
              <i className="bi bi-filetype-jsx"></i>
            </div>
            <div className="glow-icon-animated delay-2">
              <i className="bi bi-filetype-tsx"></i>
            </div>
            <div className="glow-icon-animated delay-3">
              <i className="bi bi-filetype-html"></i>
            </div>
            <div className="glow-icon-animated delay-4">
              <i className="bi bi-filetype-css"></i>
            </div>
            <div className="glow-icon-animated delay-5">
              <i className="bi bi-filetype-sql"></i>
            </div>
            <div className="glow-icon-animated delay-5">
              <i className="bi bi-filetype-php"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
