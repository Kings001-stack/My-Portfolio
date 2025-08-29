"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  width: number;
  height: number;
  className?: string;
  autoPlayMs?: number; // set to 0 to disable
  roundedClass?: string; // e.g. "rounded-[40px]"
  fit?: "cover" | "contain"; // object-fit behavior
};

export default function ImageCarousel({
  images,
  width,
  height,
  className = "",
  autoPlayMs = 3000,
  roundedClass = "rounded-[40px]",
  fit = "cover",
}: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const goTo = (i: number) => setIndex(((i % images.length) + images.length) % images.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay
  useEffect(() => {
    if (!autoPlayMs) return;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, autoPlayMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlayMs, images.length]);

  // swipe handlers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let endX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const delta = endX - startX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) next();
        else prev();
      }
      startX = 0;
      endX = 0;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ width, height }}
    >
      {/* Slider viewport */}
      <div className={`overflow-hidden ${roundedClass}`} style={{ width, height }}>
        {/* Slider track */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src + i} className="min-w-full h-full flex-shrink-0 relative">
              <Image
                src={src}
                alt={`slide-${i}`}
                width={width}
                height={height}
                priority={i === index}
                className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"} img-effect ${roundedClass}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
        type="button"
      >
        <i className="bi bi-chevron-left" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
        type="button"
      >
        <i className="bi bi-chevron-right" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full border border-white ${
              i === index ? "bg-white" : "bg-transparent"
            }`}
            type="button"
          />)
        )}
      </div>
    </div>
  );
}
