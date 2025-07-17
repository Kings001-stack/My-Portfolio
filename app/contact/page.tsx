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
    console.log(input);
  };

  return (
    <div
      ref={contactRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 scroll-fade"
    >
      <div className="glass p-10 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 glow-icon">Contact Me</h1>
        <div className="flex flex-col items-center mb-8">
          <p className="mb-2">
            Phone: <span className="font-semibold">+(234) 9071906688</span>
          </p>
          <p className="mb-2">
            Email:{" "}
            <a
              className="font-semibold"
              href="e93521365@gmail.com"
              target="_blank"
            >
              e93521365@gmail.com
            </a>
          </p>
          <div className="flex gap-4 mt-2">
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
          className="w-full max-w-lg bg-[#181818cc] p-6 rounded-lg shadow-lg flex flex-col gap-4 glass"
        >
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={input.name}
            placeholder="Your Name"
            className="p-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={input.email}
            placeholder="Your Email"
            className="p-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            onChange={handleChange}
            name="message"
            value={input.message}
            className="p-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="glow-btn flex justify-center items-center"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            I&apos;m always open to new opportunities, collaborations, and
            creative projects.
            <br />
            Let&apos;s build something amazing together!
          </p>
        </div>
      </div>
    </div>
  );
}
