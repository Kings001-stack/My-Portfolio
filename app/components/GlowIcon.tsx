import React from "react";

interface GlowIconProps {
  src: string;
  alt: string;
  color: string;
  className?: string;
}

export default function GlowIcon({ src, alt, color, className = "" }: GlowIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className + " glow-icon"}
      style={{ filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color})` }}
    />
  );
}