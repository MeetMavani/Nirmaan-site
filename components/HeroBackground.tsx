"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedPoints() {
  const ref = useRef<THREE.Points>(null);

  const [particles] = useState<Float32Array>(() => {
    const arr = new Float32Array(2000 * 3);

    let seed = 12345;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      arr[i3] = (random() - 0.5) * 10;
      arr[i3 + 1] = (random() - 0.5) * 10;
      arr[i3 + 2] = (random() - 0.5) * 10;
    }

    return arr;
  });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.05;
    ref.current.rotation.y = t * 0.075;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4CAF50"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <AnimatedPoints />
      </Canvas>
    </div>
  );
}
