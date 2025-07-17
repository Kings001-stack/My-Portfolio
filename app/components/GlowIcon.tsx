import React from "react";
import Image from "next/image";

interface GlowIconProps {
  src: string;
  alt: string;
  color: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function GlowIcon({
  src,
  alt,
  color,
  className = "",
  width = 100,
  height = 100,
}: GlowIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className + " glow-icon"}
      style={{
        filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color})`,
      }}
    />
  );
}
