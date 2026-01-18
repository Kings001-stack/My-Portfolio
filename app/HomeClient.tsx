"use client";
import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import EnhancedCodeEditor from "./components/EnhancedCodeEditor";
import TypedText from "./components/TypedText";
import Testimonials from "./components/Testimonials";
import type { Project } from "@/lib/supabase/types";
import type { Profile } from "@/lib/supabase/types";

const About3DObject = dynamic(() => import("./components/About3DObject"), {
  ssr: false,
});



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

export default function HomeClient() {
  const homeRef = useScrollFade();
  const [featured, setFeatured] = useState<Project[]>([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState<false | "ok" | "err">(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const sampleCode = String.raw`const dev = {
  name: 'Emmanuel King',
  role: 'Full Stack Developer',
  hobby: ['Music','Coding', 'Eating', 'Gaming','Football']
};

console.log(dev.name);`;

  const typewriterTexts = useMemo(
    () => [
      "Full Stack Developer",
      "Software Designer",
      "UI/UX Designer",
      "Baller",
    ],
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/projects", { signal: controller.signal })
      .then(async (r) => (r.ok ? r.json() : []))
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setFeatured(arr);
      })
      .catch(() => { });
    fetch("/api/profile", { signal: controller.signal })
      .then(async (r) => (r.ok ? r.json() : null))
      .then((data) => {
        setProfile(data);
      })
      .catch(() => { });
    return () => controller.abort();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      setSent("ok");
      setInput({ name: "", email: "", message: "" });
    } catch {
      setSent("err");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      suppressHydrationWarning
      className="flex flex-col items-center justify-center text-white relative"
    >
      {/* HERO SECTION - Full Screen */}
      <section className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:py-0 relative">
        <div
          ref={homeRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 w-full max-w-7xl scroll-fade"
        >
          {/* Right Column - Typewriter */}
          <div className="order-2 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-10">
            {/* Main Typewriter Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4 drop-shadow-sm">
                I&apos;m a
              </span>
              <TypedText
                strings={typewriterTexts}
                typeSpeed={50}
                backSpeed={60}
                backDelay={1500}
                loop
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                cursorChar="|"
              />
            </h1>

            {/* Code Editor */}
            <div className="w-full max-w-xl shadow-2xl rounded-lg overflow-hidden border border-white/10">
              <EnhancedCodeEditor
                code={sampleCode}
                language="JS"
                fileName="dev.js"
                theme="macbook"
                highlightSyntax={true}
              />
            </div>
          </div>
          {/* Left Column - Profile & Code Editor */}
          <div className="order-1 lg:order-1 flex flex-col items-center w-full lg:w-1/2 space-y-8 mt-10 lg:mt-20">
            {/* Profile Image - Centered */}
            <div className="flex flex-col items-center">
              <Image
                src={"/mypic-enhanced.png"}  //profile?.avatar_url
                alt="Profile"
                width={500}
                height={500}
                priority
                className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] glow-icon img-effect rounded-[3rem] mb-6 object-cover"
              />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-mono text-primary font-bold">
                {profile?.name
                  ? `@${profile.name.replace(/\s+/g, "")}`
                  : "@EmmanuelKing"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="glass p-10 sm:p-12 rounded-2xl max-w-7xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-white text-center">
            About Me
          </h3>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - 3D Object */}
            <div className="w-full lg:w-2/5">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <About3DObject />
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full lg:w-3/5">
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-300">
                  <span className="text-3xl text-blue-500 font-bold text-primary">
                    I&apos;m Emmanuel King
                  </span>
                  <span className="text-gray-300">
                    , a passionate Full Stack Developer and Software Designer
                    with over 4 years of experience crafting digital experiences
                    that make a difference.
                  </span>
                </p>

                <p className="text-gray-300">
                  My journey in tech began with a simple curiosity about how
                  things work on the web, and it has evolved into a deep passion
                  for creating elegant, scalable solutions that solve real-world
                  problems. I specialize in building modern web applications,
                  mobile apps, and designing intuitive user interfaces that
                  users love.
                </p>

                <p className="text-gray-300">
                  I believe in the power of clean code, thoughtful design, and
                  continuous learning. Whether it&apos;s architecting a complex
                  backend system, crafting a pixel-perfect frontend, or
                  designing a seamless user experience, I approach every project
                  with dedication and attention to detail.
                </p>

                <p className="text-gray-300">
                  When I&apos;m not coding, you&apos;ll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community. I&apos;m always excited to
                  take on new challenges and collaborate on projects that push
                  the boundaries of what&apos;s possible.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-sm font-semibold">
                    Problem Solver
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-300 text-sm font-semibold">
                    Creative Thinker
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full text-green-300 text-sm font-semibold">
                    Team Player
                  </span>
                  <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-300 text-sm font-semibold">
                    Fast Learner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="glass p-6 rounded-2xl">
              <div className="text-5xl font-extrabold text-primary mb-2">
                5+
              </div>
              <div className="text-lg text-gray-300">Years of Experience</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-5xl font-extrabold text-primary mb-2">
                40+
              </div>
              <div className="text-lg text-gray-300">Completed Projects</div>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="text-5xl font-extrabold text-primary mb-2">
                35+
              </div>
              <div className="text-lg text-gray-300">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - New Design */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-black/30 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.95), rgba(15,23,42,0.7))",
            borderTop: "1px solid rgba(148,163,184,0.35)",
            borderBottom: "1px solid rgba(148,163,184,0.35)",
          }}
        />
        <div className="relative max-w-7xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-white text-center">
            My Skills
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Development */}
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-blue-400 mb-6">
                Frontend Development
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="data:image/jpeg;base64,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"
                    alt="Tailwind icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Tailwind</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"
                    alt="3js icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Three JS</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                    alt="TypeScript icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">TypeScript</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                    alt="VUE icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Vue</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                    alt="React Native icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">React Native</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                    alt="Next.js icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Next.js</div>
                </div>
              </div>
            </div>

            {/* Backend Development */}
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-green-400 mb-6">
                Backend Development
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                    alt="Node.js icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Node.js</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="data:image/png;base64,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"
                    alt="MongoDB icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">MongoDB</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                    alt="PostgreSQL icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">PostgreSQL</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
                    alt="Firebase icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Firebase</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
                    alt="PHP icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">PHP</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                    alt="Python icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Python</div>
                </div>
              </div>
            </div>

            {/* Frameworks */}
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-orange-400 mb-6">
                Frameworks
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                    alt="Next.js icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Next.js</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                    alt="React icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">React</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                    alt="Vue icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Vue</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                    alt="Express icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain invert"
                  />
                  <div className="font-semibold text-white">Express</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
                    alt="Laravel icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Laravel</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
                    alt="Django icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain invert"
                  />
                  <div className="font-semibold text-white">Django</div>
                </div>
              </div>
            </div>

            {/* UI/UX */}
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-purple-400 mb-6">UI/UX</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                    alt="Figma icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Figma</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg"
                    alt="Sketch icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Sketch</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg"
                    alt="XD icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">XD</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg"
                    alt="Blender icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Blender</div>
                </div>
              </div>
            </div>

            {/* AI/ML */}
            <div className="glass p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-cyan-400 mb-6">AI/ML</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="data:image/png;base64,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"
                    alt="DeepSeek icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">DeepSeek</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="data:image/png;base64,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"
                    alt="ChatGPT icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">ChatGPT</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="data:image/jpeg;base64,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"
                    alt="Gemini icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">Gemini</div>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="data:image/png;base64,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"
                    alt="Audio (TTS/STT) icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <div className="font-semibold text-white">
                    Audio (TTS/STT)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* UI/UX Design - Blue */}
            <div className="service-card group">
              <div className="service-orb orb-blue"></div>
              <div className="service-icon-absolute">
                <i className="bi bi-brush text-2xl text-white"></i>
              </div>
              <div className="service-content">
                <h3 className="service-title">UI/UX Design</h3>
                <p className="service-description">
                  Crafting visually stunning and user-centric designs that ensure seamless user experiences. From wireframes to high-fidelity prototypes, I focus on creating intuitive interfaces that blend creativity and functionality, enhancing engagement and usability.
                </p>
                <div className="service-footer">
                  <Link href="https://github.com/Kings001-stack" target="_blank" className="social-icon-btn hover-glow-blue" aria-label="GitHub"><i className="bi bi-github"></i></Link>
                  <Link href="https://www.linkedin.com/in/emmanuel-king-ugwu/" target="_blank" className="social-icon-btn hover-glow-blue" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></Link>
                  <Link href="#" className="social-icon-btn hover-glow-blue" aria-label="YouTube"><i className="bi bi-youtube"></i></Link>
                </div>
              </div>
            </div>

            {/* Web Development - Red */}
            <div className="service-card group">
              <div className="service-orb orb-red"></div>
              <div className="service-icon-absolute">
                <i className="bi bi-arrow-repeat text-2xl text-white"></i>
              </div>
              <div className="service-content">
                <h3 className="service-title">Web Development</h3>
                <p className="service-description">
                  Building responsive, dynamic, and high-performance websites tailored to your needs. Using modern technologies like React, Node.js, and more, I ensure your site is optimized for speed, scalability, and accessibility, delivering a robust online presence.
                </p>
                <div className="service-footer">
                  <Link href="https://github.com/Kings001-stack" target="_blank" className="social-icon-btn hover-glow-red" aria-label="GitHub"><i className="bi bi-github"></i></Link>
                  <Link href="https://www.linkedin.com/in/emmanuel-king-ugwu/" target="_blank" className="social-icon-btn hover-glow-red" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></Link>
                  <Link href="#" className="social-icon-btn hover-glow-red" aria-label="YouTube"><i className="bi bi-youtube"></i></Link>
                </div>
              </div>
            </div>

            {/* Mobile Development - Green */}
            <div className="service-card group">
              <div className="service-orb orb-green"></div>
              <div className="service-icon-absolute">
                <i className="bi bi-android2 text-2xl text-white"></i>
              </div>
              <div className="service-content">
                <h3 className="service-title">Mobile Development</h3>
                <p className="service-description">
                  Producing compelling digital content that resonates with your audience. From blogs and technical documentation to engaging website copy, I ensure your brand&apos;s message is clear, impactful, and aligned with your business goals.
                </p>
                <div className="service-footer">
                  <Link href="https://github.com/Kings001-stack" target="_blank" className="social-icon-btn hover-glow-green" aria-label="GitHub"><i className="bi bi-github"></i></Link>
                  <Link href="https://www.linkedin.com/in/emmanuel-king-ugwu/" target="_blank" className="social-icon-btn hover-glow-green" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></Link>
                  <Link href="#" className="social-icon-btn hover-glow-green" aria-label="YouTube"><i className="bi bi-youtube"></i></Link>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="glow-btn px-8 py-3">View Projects</Link>
            <Link href="/skills" className="glow-btn px-8 py-3">Explore Skills</Link>
            <Link href="/contact" className="glow-btn px-8 py-3">Contact Me</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-300 text-center">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(showAllProjects ? featured : featured.slice(0, 3)).map((p) => (
              <div
                key={p.id}
                className="glass p-4 rounded-xl hover:scale-105 transition-transform"
              >
                <Image
                  src={p.cover_image || "/port.png"}
                  alt={p.title}
                  width={400}
                  height={192}
                  className="w-full h-40 object-cover rounded-lg mb-3 img-effect"
                />
                <div className="font-bold mb-2 glow-icon">{p.title}</div>
                <div className="text-sm text-gray-300 mb-3">
                  {p.description}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="glow-btn text-sm"
                  >
                    Case Study
                  </Link>
                  {p.live_url && (
                    <a
                      href={p.live_url}
                      className="glow-btn text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
            {!featured.length && (
              <div className="text-gray-300 col-span-3 text-center">
                No featured projects yet.
              </div>
            )}
          </div>
          {featured.length > 3 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="glow-btn px-8 py-3 flex items-center gap-2"
              >
                {showAllProjects ? (
                  <>
                    <i className="bi bi-chevron-up"></i>
                    Show Less
                  </>
                ) : (
                  <>
                    <i className="bi bi-chevron-down"></i>
                    Show More Projects
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <Testimonials
            testimonials={[
              {
                id: 1,
                name: "Mr. Charles onah",
                role: "CEO",
                company: "Realtime bricks LTD.",
                image: "/charle.jpg",
                text: "Emmanuel delivered an exceptional website that perfectly captured our brand's essence. His attention to detail and technical expertise made the entire process smooth and enjoyable.",
              },
              {
                id: 2,
                name: "Dr. Ifeoma Umeh",
                role: "Product Manager",
                company: "Immaculate heart Intl.",
                image: "/ifeoma.png",
                text: "Working with Emmanuel was a game-changer for our startup. He not only built a beautiful platform but also provided valuable insights that improved our user experience significantly.",
              },
              {
                id: 3,
                name: "Mr Lukman",
                role: "HR",
                company:
                  "Lincoln college of science, management and technology",
                image: "/Picture1.png",
                text: "Emmanuel's work exceeded our expectations. His ability to translate our vision into a functional, elegant website while maintaining excellent communication throughout the project was impressive.",
              },
            ]}
          />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-300 text-center">
            Contact
          </h3>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://wa.link/vpsub2"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-icon-animated delay-1 text-2xl hover:text-green-400 transition-colors"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              href="https://github.com/Kings001-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-icon-animated delay-2 text-2xl hover:text-purple-400 transition-colors"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-king-ugwu/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-icon-animated delay-3 text-2xl hover:text-blue-400 transition-colors"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
          <form
            onSubmit={submit}
            className="glass p-6 sm:p-8 rounded-lg shadow-lg flex flex-col gap-4"
          >
            <input
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              placeholder="Your Name"
              className="p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              placeholder="Your Email"
              className="p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              value={input.message}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              placeholder="Your Message"
              className="p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary transition-colors resize-none"
              rows={5}
            />
            <button
              type="submit"
              className="glow-btn text-lg-center py-3"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
            {sent === "ok" && (
              <div className="text-primary mt-2 text-center">
                Message received. Thank you!
              </div>
            )}
            {sent === "err" && (
              <div className="text-red-400 mt-2 text-center">
                Failed to send. Try again.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 text-center text-gray-400 border-t border-gray-800">
        <p className="text-lg">
          Made with next.js and extreme levels of caffeine ☕☕☕
        </p>
      </footer>
    </div>
  );
}
