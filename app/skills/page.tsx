"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

const skillCategories = [
  {
    title: "Frontend Alchemy",
    color: "text-blue-400",
    skills: [
      { name: "React 19", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js 15", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS 4", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "Three.js / R3F", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
      { name: "Framer Motion", icon: "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" },
    ],
  },
  {
    title: "Robust Backends",
    color: "text-green-400",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Supabase", icon: "https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
  {
    title: "System Engineering",
    color: "text-purple-400",
    skills: [
      { name: "System Design", icon: "bi bi-diagram-3" },
      { name: "Microservices", icon: "bi bi-boxes" },
      { name: "Security (OWASP)", icon: "bi bi-shield-lock" },
      { name: "Performance Tuning", icon: "bi bi-speedometer2" },
      { name: "Web Vitals", icon: "bi bi-graph-up-arrow" },
      { name: "Scalability", icon: "bi bi-arrow-up-right-circle" },
    ],
  },
  {
    title: "Modern DevOps",
    color: "text-orange-400",
    skills: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "AWS / Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "CI/CD Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "Linux / Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ],
  },
  {
    title: "Future-Proof (AI/ML)",
    color: "text-cyan-400",
    skills: [
      { name: "LLM Integration", icon: "bi bi-robot" },
      { name: "Vector DBs", icon: "bi bi-cpu" },
      { name: "RAG Systems", icon: "bi bi-search" },
      { name: "Gemini / OpenAI", icon: "bi bi-stars" },
      { name: "Audio (TTS/STT)", icon: "bi bi-mic" },
      { name: "DeepSeek API", icon: "bi bi-code-square" },
    ],
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

export default function SkillsPage() {
  const skillsRef = useScrollFade();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={skillsRef} className="scroll-fade text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Expertise & <span className="text-primary">Skills</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            A comprehensive overview of my technical arsenal, specialized in building
            high-performance, scalable, and visually stunning digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="glass p-8 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"
                aria-hidden="true"
              />

              <h2 className={`text-2xl font-bold mb-8 ${category.color} flex items-center gap-3`}>
                <span className="w-8 h-1 bg-current rounded-full" />
                {category.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200 group/skill"
                  >
                    <div className="w-12 h-12 flex items-center justify-center relative">
                      {skill.icon.startsWith("http") ? (
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain group-hover/skill:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <i className={`${skill.icon} text-3xl group-hover/skill:scale-110 transition-transform duration-300`} />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Specialization Highlight Card */}
          <div className="glass p-8 rounded-3xl flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="text-primary mb-4">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Senior Architectural Mindset</h3>
            <p className="text-gray-400">
              Beyond languages and frameworks, I focus on the &quot;Why&quot; and &quot;How&quot;.
              My approach involves rigorous testing, clean code architecture,
              and optimizing for zero-latency user experiences.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-wider">TDD/BDD</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-wider">Agile/Scrum</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-wider">Domain Driven Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
