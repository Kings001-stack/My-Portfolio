"use client";

import React, { useState } from "react";

// Types
export type Experience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  start?: string;
  end?: string;
  details?: string[];
};

export type ResumeData = {
  name: string;
  title?: string;
  summary?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  certifications?: string[];
};

// Data (from user's snippet)
const data: ResumeData = {
  name: "Emmanuel King Ugwu",
  title: "Software Developer",
  summary:
    "Self-driven Software developer with 5+ years experience building responsive applications using frontend technologies, backend tools, and UI/UX for cleaner code and performance optimization.",
  email: "e93521365@gmail.com",
  phone: "+234 9071906688",
  location: "Abuja, Nigeria",
  website: "https://emmanuelking-pf.netlify.app",
  skills: [
    "React JS",
    "Next JS",
    "MongoDB",
    "React Native",
    "MySQL",
    "Laravel",
    "Firebase",
    "UI/UX",
    "Node JS",
    "Git",
    "Python",
    "JavaScript",
    "PHP",
    "NoSQL",
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Lincoln College of Science Management and Technology",
      start: "Nov 2024",
      end: "Jun 2025",
      bullets: [
        "Collaborated with design teams to create user-friendly interfaces.",
        "Created a modern and responsive website using the latest frontend frameworks and backend technologies.",
        "Integrated RESTful APIs to enhance functionality.",
      ],
    },
    {
      role: "Full Stack Developer (Internship)",
      company: "Realtime Bricks LTD",
      start: "Mar 2024",
      end: "Nov 2024",
      bullets: [
        "Developed a maintainable web application using modern frameworks.",
        "Conducted testing and debugging to ensure high-quality software.",
        "Worked in an internship-based role to gain industry experience.",
      ],
    },
    {
      role: "UI/UX Designer (Internship)",
      company: "HNG Tech",
      start: "Jan 2020",
      end: "Aug 2023",
      bullets: [
        "Supported UI/UX projects to design and improve web applications.",
      ],
    },
  ],
  education: [
    {
      school: "Lincoln College of Science Management and Technology",
      degree: "Diploma in Computer Software Engineering",
      start: "Mar 2022",
      end: "Present",
    },
    {
      school: "HNG Tech",
      degree: "Diploma in Computer Application Packages",
      start: "Aug 2015",
      end: "Aug 2019",
    },
  ],
};

// Simple Tabs implementation
function Tabs({
  tabs,
  current,
  onChange,
}: {
  tabs: { value: string; label: string }[];
  current: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-2 bg-black/40 border border-gray-800 rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`rounded-lg py-2 text-sm font-medium transition-colors ${
              current === t.value
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:text-white"
            }`}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AdvancedResume({ pdfPath = "/cv.pdf" }: { pdfPath?: string }) {
  const [tab, setTab] = useState("resume");

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{data.name}</h1>
            {data.title && (
              <p className="text-base md:text-lg text-gray-300">{data.title}</p>
            )}
            {data.location && (
              <p className="mt-1 inline-flex items-center gap-2 text-sm text-gray-400">
                <i className="bi bi-geo-alt" /> {data.location}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 no-print">
            <a href={pdfPath} target="_blank" rel="noreferrer" className="glow-btn rounded-2xl">
              <i className="bi bi-download" /> Download CV
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {data.email && (
            <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
              <i className="bi bi-envelope" /> {data.email}
            </a>
          )}
          {data.phone && (
            <span className="inline-flex items-center gap-2">
              <i className="bi bi-telephone" /> {data.phone}
            </span>
          )}
          {data.website && (
            <span className="inline-flex items-center gap-2">
              <i className="bi bi-link-45deg" />
              <a className="underline-offset-4 hover:underline" href={data.website} target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Tabs */}
      <Tabs
        tabs={[
          { value: "resume", label: "Web Resume" },
          { value: "pdf", label: "View PDF" },
        ]}
        current={tab}
        onChange={setTab}
      />

      {/* Web-native resume */}
      {tab === "resume" && (
        <div className="mt-4">
          {data.summary && (
            <div className="glass mb-6 rounded-2xl">
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-lg font-semibold">Summary</h3>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-gray-300">{data.summary}</p>
              </div>
            </div>
          )}

          {!!data.skills?.length && (
            <div className="glass mb-6 rounded-2xl">
              <div className="p-5 border-b border-gray-800">
                <h3 className="text-lg font-semibold">Skills</h3>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {data.skills!.map((s) => (
                    <span key={s} className="rounded-full px-3 py-1 text-sm bg-white/10 text-white border border-gray-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!!data.experience?.length && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
              <div className="w-full h-px bg-gray-800 my-2" />
              <div className="mt-4 space-y-4">
                {data.experience!.map((ex, idx) => (
                  <div key={idx} className="glass rounded-2xl">
                    <div className="p-5 border-b border-gray-800">
                      <h3 className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <span>
                          <span className="font-semibold">{ex.role}</span>
                          <span className="text-gray-400"> · {ex.company}</span>
                        </span>
                        <span className="text-sm text-gray-400">
                          {ex.start} — {ex.end}
                        </span>
                      </h3>
                    </div>
                    <div className="p-5">
                      <ul className="list-disc pl-5 space-y-2">
                        {ex.bullets.map((b, i) => (
                          <li key={i} className="text-sm leading-6">{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {!!data.education?.length && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight">Education</h2>
              <div className="w-full h-px bg-gray-800 my-2" />
              <div className="mt-4 grid gap-4">
                {data.education!.map((ed, idx) => (
                  <div key={idx} className="glass rounded-2xl">
                    <div className="p-5 border-b border-gray-800">
                      <h3 className="text-base sm:text-lg font-semibold flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <span>
                          <span className="font-semibold">{ed.degree}</span>
                          <span className="text-gray-400"> · {ed.school}</span>
                        </span>
                        {(ed.start || ed.end) && (
                          <span className="text-sm text-gray-400">
                            {ed.start ?? ""}
                            {ed.start && ed.end ? " — " : ""}
                            {ed.end ?? ""}
                          </span>
                        )}
                      </h3>
                    </div>
                    {ed.details?.length ? (
                      <div className="p-5">
                        <ul className="list-disc pl-5 space-y-2">
                          {ed.details.map((d, i) => (
                            <li key={i} className="text-sm leading-6">{d}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* PDF viewer */}
      {tab === "pdf" && (
        <div className="mt-4 glass rounded-2xl">
          <div className="p-2 sm:p-4">
            <object
              data={pdfPath}
              type="application/pdf"
              className="w-full h-[80vh] rounded-xl shadow-sm bg-white"
              aria-label="Embedded resume PDF"
            >
              <p className="p-4 text-sm">
                Your browser couldn&apos;t display the PDF. {""}
                <a className="underline" href={pdfPath} target="_blank" rel="noreferrer">
                  Open it in a new tab
                </a>{" "}
                or download it.
              </p>
            </object>
          </div>
        </div>
      )}
    </div>
  );
}
