"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import React, { useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function ScrollParallax() {
  const { camera } = useThree();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!m.matches);
    const handler = () => setEnabled(!m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  useFrame(() => {
    if (!enabled) return;
    const y = window.scrollY || 0;
    camera.position.y = -y * 0.0008;
    camera.rotation.z = y * 0.00005;
  });

  return null;
}

function PointerEffect() {
  const { camera } = useThree();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!m.matches);
    const handler = () => setEnabled(!m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  useFrame((state) => {
    if (!enabled) return;
    const x = state.pointer.x;
    const y = state.pointer.y;

    // Subtle camera tilt based on pointer position
    camera.rotation.x += (y * 0.02 - camera.rotation.x) * 0.02;
    camera.rotation.y += (x * 0.02 - camera.rotation.y) * 0.02;
  });

  return null;
}

export default function ThreeBackground() {
  const pathname = usePathname();

  const dpr = useMemo(
    () =>
      typeof window !== "undefined" && window.devicePixelRatio > 1 ? 1.2 : 1,
    []
  );

  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const handler = () => setReduce(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  // Don't render on certain pages
  if (pathname === "/resume" || pathname === "/login" || pathname === "/admin")
    return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas dpr={dpr} camera={{ position: [0, 0, 6], fov: 75 }}>
        <ScrollParallax />
        <PointerEffect />

        {/* Ambient lighting for subtle atmosphere */}
        <ambientLight intensity={0.4} />

        {/* Colored point lights for depth */}
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#f472b6" />
        <pointLight position={[0, 5, -10]} intensity={0.3} color="#a78bfa" />

        {/* Floating particle effects */}
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
          {/* Sparkles - elegant floating particles */}
          <Sparkles
            count={reduce ? 150 : 400}
            scale={reduce ? 10 : 15}
            size={reduce ? 1.2 : 2}
            speed={reduce ? 0.3 : 0.6}
            color="#4cc9f0"
            opacity={0.6}
          />

          {/* Stars - distant star field */}
          <Stars
            radius={reduce ? 50 : 80}
            depth={reduce ? 30 : 50}
            count={reduce ? 800 : 1500}
            factor={reduce ? 2 : 3}
            saturation={0}
            fade
            speed={reduce ? 0.5 : 1}
          />
        </Float>

        {/* Additional sparkle layer for depth */}
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <Sparkles
            count={reduce ? 100 : 250}
            scale={reduce ? 12 : 18}
            size={reduce ? 1.5 : 2.5}
            speed={reduce ? 0.2 : 0.4}
            color="#a78bfa"
            opacity={0.4}
          />
        </Float>
      </Canvas>
    </div>
  );
}
