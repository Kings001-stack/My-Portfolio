"use client";

import Link from "next/link";

export default function ResumeActions() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="flex gap-3 no-print">
      <a
        href="/resume.pdf"
        download
        className="glow-btn"
        aria-label="Download static PDF resume"
      >
        Download PDF
      </a>
      <button onClick={handlePrint} className="glow-btn" aria-label="Print resume to PDF">
        Print
      </button>
      <Link href="/contact" className="glow-btn" aria-label="Go to contact page">
        Contact
      </Link>
    </div>
  );
}
