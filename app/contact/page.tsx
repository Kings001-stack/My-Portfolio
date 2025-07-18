"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

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

export default function Contact() {
  const contactRef = useScrollFade();
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(input);
  };

  return (
    <div
      ref={contactRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 scroll-fade"
    >
      <div className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 glow-icon text-center">
          Contact Me
        </h1>
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <p className="mb-2 text-sm sm:text-base">
            Phone: <span className="font-semibold">+(234) 9071906688</span>
          </p>
          <p className="mb-2 text-sm sm:text-base">
            Email:{" "}
            <a
              className="font-semibold hover:text-primary transition-colors"
              href="mailto:e93521365@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              e93521365@gmail.com
            </a>
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="https://wa.link/vpsub2"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-icon-animated delay-1"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              href="https://github.com/Kings001-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-icon-animated delay-2"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuel-king-ugwu/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-icon-animated delay-3"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full max-w-lg bg-[#181818cc] p-4 sm:p-6 rounded-lg shadow-lg flex flex-col gap-3 glass"
        >
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={input.name}
            placeholder="Your Name"
            className="p-2 sm:p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={input.email}
            placeholder="Your Email"
            className="p-2 sm:p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary transition-colors"
          />
          <textarea
            placeholder="Your Message"
            onChange={handleChange}
            name="message"
            value={input.message}
            className="p-2 sm:p-3 rounded bg-black text-white border border-gray-700 focus:outline-none focus:border-primary transition-colors resize-none"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="glow-btn flex justify-center items-center mt-2"
          >
            Send Message
          </button>
        </form>
        <div className="mt-6 sm:mt-8 text-center text-gray-50 text-xs sm:text-sm px-4">
          I&apos;m always open to new opportunities, collaborations, and
          creative projects.
          <br />
          Let&apos;s build something amazing together!
        </div>
      </div>
    </div>
  );
}
