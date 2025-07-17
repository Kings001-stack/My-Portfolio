"use client";
"use client";

import React, { useRef, useEffect } from "react";

const projects = [
  {
    title: "Portfolio Website",
    image: "/portfolio-preview.jpg",
    description:
      "A modern, interactive portfolio built with Next.js, React, and Tailwind CSS, featuring glassmorphism and scroll effects.",
    link: "https://yourportfolio.com",
  },
  {
    title: "E-Commerce Platform",
    image: "/ecommerce-preview.jpg",
    description:
      "A full-featured e-commerce web app with product search, cart, and secure checkout, using React, Node.js, and MongoDB.",
    link: "https://yourecommerce.com",
  },
  {
    title: "Blog CMS",
    image: "/blogcms-preview.jpg",
    description:
      "A content management system for blogs, supporting markdown, user roles, and analytics, built with Next.js and MySQL.",
    link: "https://yourblogcms.com",
  },
];

function useScrollFade() {
  const ref = useRef(null);
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

export default function Projects() {
  const projectsRef = useScrollFade();
  return (
    <div
      ref={projectsRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 scroll-fade"
    >
      <div className="glass p-10 rounded-2xl shadow-2xl max-w-6xl w-full">
        <h1 className="text-4xl font-extrabold mb-8 glow-icon">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col items-center p-6 rounded-xl glass shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4 img-effect"
              />
              <h2 className="text-2xl font-bold mb-2 glow-icon">
                {project.title}
              </h2>
              <p className="text-gray-300 text-center mb-4">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
        
        {/* Project Technologies Section */}
        <div className="mt-16 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">Technologies Used in Projects</h3>
          <div className="flex gap-7 flex-wrap justify-center">
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
