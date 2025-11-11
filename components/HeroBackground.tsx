"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedPoints() {
  const ref = useRef<THREE.Points>(null);
  const [particles] = useState<Float32Array>(() => {
    // Generate particles only on client to prevent hydration mismatch
    if (typeof window === 'undefined') {
      return new Float32Array(2000 * 3);
    }
    const arr = new Float32Array(2000 * 3);
    // Use a seed or generate in a way that's consistent
    // Since this only runs on client after mount, it's safe
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
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4CAF50"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export const HeroBackground = () => {
  const [mounted, setMounted] = useState(false);

  // Only render Canvas on client to prevent hydration mismatch
  // This is a valid pattern for client-only rendering in Next.js
  useEffect(() => {
    // @ts-expect-error - Valid pattern for client-only rendering
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {mounted && (
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AnimatedPoints />
        </Canvas>
      )}
    </div>
  );
};
