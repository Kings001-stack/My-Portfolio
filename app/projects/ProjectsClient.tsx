"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/supabase/types";

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch("/api/projects", { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to load projects");
        return r.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <div
      ref={projectsRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 scroll-fade"
    >
      <div className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl max-w-6xl w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 glow-icon">Projects</h1>

        {loading && <div className="text-gray-300">Loading projects...</div>}
        {error && <div className="text-red-400">Error: {error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col h-full items-center p-6 rounded-xl glass shadow-lg hover:scale-105 transition-transform"
              >
                <Image
                  src={project.cover_image || "/port.png"}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 img-effect"
                />
                <h2 className="text-2xl font-bold mb-2 glow-icon">{project.title}</h2>
                <p className="text-gray-300 text-center mb-4 text-sm sm:text-base px-1">{project.description}</p>
                <div className="flex gap-2 mt-auto">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-btn"
                    >
                      Live
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-btn"
                    >
                      Code
                    </a>
                  )}
                  <Link href={`/projects/${project.slug}`} className="glow-btn">
                    Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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
