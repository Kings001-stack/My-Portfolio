"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

function RotatingShape() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial | null>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(t) * 0.25;
    }

    if (materialRef.current) {
      const pulse = 0.5 + Math.sin(t * 2) * 0.5; // 0 -> 1
      materialRef.current.emissiveIntensity = 0.7 + pulse * 0.9;
      materialRef.current.color.setHSL(
        0.58 + Math.sin(t * 0.4) * 0.03,
        0.8,
        0.6
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 160, 24]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#60a5fa"
        metalness={1}
        roughness={0.1}
        emissive="#1d4ed8"
        emissiveIntensity={1}
        wireframe={false}
      />
    </mesh>
  );
}

export default function About3DObject() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[8, 10, 10]} intensity={1.8} color="#60a5fa" />
        <pointLight
          position={[-8, -10, -8]}
          intensity={1.1}
          color="#f472b6"
        />
        <pointLight position={[0, -5, 5]} intensity={1.2} color="#22c55e" />
        <RotatingShape />
      </Canvas>
    </div>
  );
}
