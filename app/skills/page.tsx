"use client";

import React, { useRef, useEffect } from "react";

const skills = [
  {
    name: "HTML",
    icon: "bi bi-filetype-html",
    desc: "Semantic, accessible, SEO-friendly markup.",
  },
  {
    name: "CSS",
    icon: "bi bi-filetype-css",
    desc: "Modern layouts, animations, and responsive design.",
  },
  {
    name: "JavaScript",
    icon: "bi bi-filetype-js",
    desc: "ES6+, TypeScript, async patterns, and frameworks.",
  },
  {
    name: "PHP",
    icon: "bi bi-filetype-php",
    desc: "Backend APIs, CMS, and server-side logic.",
  },
  {
    name: "MySQL",
    icon: "bi bi-filetype-sql",
    desc: "Relational data modeling and performant queries.",
  },
  {
    name: "ReactJS",
    icon: "bi bi-filetype-jsx",
    desc: "Component-driven UIs, hooks, and state management.",
  },
  {
    name: "Next.js",
    icon: "bi bi-lightning",
    desc: "SSR, SSG, API routes, and full-stack apps.",
  },
  {
    name: "MongoDB",
    icon: "bi bi-database",
    desc: "NoSQL, aggregation, and scalable data storage.",
  },
  {
    name: "Python",
    icon: "bi bi-filetype-py",
    desc: "Automation, scripting, and data analysis.",
  },
  {
    name: "React Native/Expo CLI",
    icon: "bi bi-phone",
    desc: "Cross-platform mobile apps with native feel.",
  },
  {
    name: "UI/UX design",
    icon: "bi bi-palette",
    desc: "Design application/software for the best experience of a user",
  },
  // Security & Best Practices
  {
    name: "Web Security",
    icon: "bi bi-shield-check",
    desc: "OWASP Top 10, JWT authentication, secure coding practices.",
  },
  {
    name: "Secure Dev Practices",
    icon: "bi bi-shield-lock",
    desc: "Static code analysis, encryption basics, security testing.",
  },
  {
    name: "Auth & Identity",
    icon: "bi bi-person-check",
    desc: "OAuth2, OpenID Connect, SSO integrations, identity management.",
  },
  // Data & AI
  {
    name: "PostgreSQL",
    icon: "bi bi-database",
    desc: "Advanced relational database management and optimization.",
  },
  {
    name: "Redis",
    icon: "bi bi-lightning-charge",
    desc: "In-memory data structure store, caching, and session management.",
  },
  {
    name: "Data Engineering",
    icon: "bi bi-gear-wide-connected",
    desc: "ETL pipelines, Apache Kafka, data processing workflows.",
  },
  {
    name: "Machine Learning",
    icon: "bi bi-cpu",
    desc: "TensorFlow, PyTorch, model development and deployment.",
  },
  {
    name: "LLM Integration",
    icon: "bi bi-robot",
    desc: "OpenAI API, large language model integration and fine-tuning.",
  },
  {
    name: "Vector Databases",
    icon: "bi bi-diagram-3",
    desc: "Pinecone, Weaviate, FAISS for AI-powered search and retrieval.",
  },
  // Cloud & DevOps
  {
    name: "AWS",
    icon: "bi bi-cloud",
    desc: "Cloud infrastructure, services, and scalable deployments.",
  },
  {
    name: "Azure",
    icon: "bi bi-cloud-arrow-up",
    desc: "Microsoft cloud platform and enterprise solutions.",
  },
  {
    name: "Google Cloud",
    icon: "bi bi-cloud-check",
    desc: "GCP services, AI/ML tools, and cloud-native development.",
  },
  {
    name: "CI/CD Pipelines",
    icon: "bi bi-arrow-repeat",
    desc: "GitHub Actions, GitLab CI, Jenkins automation workflows.",
  },
  {
    name: "Docker",
    icon: "bi bi-box",
    desc: "Containerization, microservices, and deployment consistency.",
  },
  {
    name: "Kubernetes",
    icon: "bi bi-diagram-2",
    desc: "Container orchestration, scaling, and cluster management.",
  },
  {
    name: "Infrastructure as Code",
    icon: "bi bi-code-square",
    desc: "Terraform, Pulumi, automated infrastructure provisioning.",
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

export default function Skills() {
  const skillsRef = useScrollFade();
  return (
    <div
      ref={skillsRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white scroll-fade"
    >
      <div className="glass p-10 rounded-2xl shadow-2xl max-w-6xl w-full">
        <h1 className="text-4xl font-extrabold mb-8 glow-icon">My Skill Set</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-4 rounded-xl glass shadow-lg hover:scale-105 transition-transform"
            >
              <div className={`glow-image-icon delay-${(index % 5) + 1} mb-2`}>
                <i className={`${skill.icon} text-4xl`}></i>
              </div>
              <span className="text-lg font-semibold mt-2 mb-1">
                {skill.name}
              </span>
              <span className="text-sm text-gray-300 text-center">
                {skill.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
