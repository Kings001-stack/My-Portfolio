"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`w-full ${className}`}>
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-primary">
        Client Testimonials
      </h3>

      <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6">
        {/* Testimonial Content */}
        <div className="flex flex-col items-center">
          <div className="mb-4 relative">
            <Image
              src={testimonials[activeIndex].image}
              alt={testimonials[activeIndex].name}
              width={80}
              height={80}
              className="rounded-full border-2 border-primary img-effect"
            />
          </div>

          <div className="text-center">
            <p className="text-gray-300 italic mb-4 max-w-2xl">
              &ldquo;{testimonials[activeIndex].text}&rdquo;
            </p>
            <h4 className="font-bold text-white">
              {testimonials[activeIndex].name}
            </h4>
            <p className="text-primary text-sm">
              {testimonials[activeIndex].role},{" "}
              {testimonials[activeIndex].company}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-primary w-4" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
