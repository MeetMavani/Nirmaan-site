"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

const techList = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Express",
  "React Native",
  "Flutter",
  "Bubble",
  "AWS",
  "Google Cloud",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "MySQL",
  "PyTorch",
  "OpenCV",
  "GitHub",
];

const Technologies = () => {
  // Hover state for popup - tracks which technology is currently hovered
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderFlag, setRenderFlag] = useState(0);

  // Technologies animation refs
  const tlRefs = useRef<gsap.core.Tween[]>([]);
  const listenersRef = useRef<
    { el: Element; type: string; handler: EventListenerOrEventListenerObject }[]
  >([]);

  useEffect(() => {
    // Kill any previous tweens
    tlRefs.current.forEach((t) => t.kill());
    tlRefs.current = [];

    const sections = Array.from(document.querySelectorAll(".tech-scroll"));

    sections.forEach((section, index) => {
      const row = section.querySelector<HTMLElement>(".tech-row");
      if (!row) return;

      requestAnimationFrame(() => {
        // Width of one set (1/3 since we render 3 sets)
        const singleWidth = row.scrollWidth / 3;

        // Alternate direction per row
        const dir = index % 2 === 0 ? -1 : 1;
        const speed = 40; // seconds for one full loop

        // Start at 0 for left-moving, -singleWidth for right-moving
        gsap.set(row, { x: dir === -1 ? 0 : -singleWidth });

        // Create seamless loop animation
        const tween = gsap.to(row, {
          x: dir === -1 ? -singleWidth : 0,
          duration: speed,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x: string) => {
              const parsed = parseFloat(x);
              // Wrap the value to create infinite loop
              const wrapped = gsap.utils.wrap(-singleWidth, 0, parsed);
              return `${wrapped}px`;
            },
          },
        });

        tlRefs.current.push(tween);

        // Interaction handlers
        const speedUp = () => tween.timeScale(2);
        const slowDown = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });


        section.addEventListener("wheel", speedUp, { passive: true });
        section.addEventListener("mouseleave", slowDown);

        listenersRef.current.push({ el: section, type: "wheel", handler: speedUp });
        listenersRef.current.push({ el: section, type: "mouseleave", handler: slowDown });
      });
    });

    return () => {
      tlRefs.current.forEach((t) => t.kill());
      tlRefs.current = [];
      listenersRef.current.forEach(({ el, type, handler }) =>
        el.removeEventListener(type, handler)
      );
      listenersRef.current = [];
    };
  }, []);

  const itemsPerRow = 6;
  const rows: string[][] = [];
  for (let i = 0; i < techList.length; i += itemsPerRow) {
    rows.push(techList.slice(i, i + itemsPerRow));
  }


  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technologies & Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We work with modern, battle-tested technologies to build robust
            solutions
          </p>
        </motion.div>

        <div className="space-y-16">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="relative overflow-hidden tech-scroll"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: rowIndex * 0.15,
                ease: "easeOut"
              }}
            >
              <div className="flex gap-3 sm:gap-4 md:gap-6 tech-row will-change-transform">
                {[...Array(3)].flatMap((_, setIndex) =>
                  row.map((tech, techIndex) => (
                    <motion.div
                      key={`${tech}-set${setIndex}-${techIndex}`}
                      whileHover={{ scale: 1.1 }}
                      className="flex-shrink-0"
                      onMouseEnter={(e) => {
                        if (window.innerWidth < 768) return;
                      
                        mousePosRef.current = { x: e.clientX, y: e.clientY };
                        setHoveredTech(tech);
                        setRenderFlag((r) => r + 1);  // trigger ONE re-render
                      }}
                      
                      onMouseMove={(e) => {
                        if (window.innerWidth < 768) return;
                      
                        if (hoveredTech === tech) {
                          mousePosRef.current = { x: e.clientX, y: e.clientY };
                        }
                      }}
                      
                      onMouseLeave={() => {
                        setHoveredTech(null);
                        setRenderFlag((r) => r + 1);  // trigger re-render to hide popup
                      }}
                      
                    >
                      <div className="p-6 flex items-center justify-center bg-transparent shadow-none border-none transition-all cursor-pointer group 
w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                        <div className="group-hover:scale-110 transition-transform">
                          <Image
                            src={`/icons/${tech}.svg`}
                            alt={tech}
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          />
                        </div>
                      </div>

                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glass blur popup - shows technology name on hover */}
      {/* eslint-disable react-hooks/refs */}
      {hoveredTech && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosRef.current.x + 15}px`,
            top: `${mousePosRef.current.y - 45}px`,
            transform: "translate(0, -100%)",
          }}          
          
        >
          <div
            className="px-4 py-2 text-sm font-medium text-foreground whitespace-nowrap"
            style={{
              // CORNER ROUNDNESS: Change 'rounded-lg' class to adjust corner roundness
              // Options: rounded-none, rounded-sm, rounded, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-full
              // Or use inline: borderRadius: '8px' (adjust px value for custom roundness)
              borderRadius: '4px', // Change this value (e.g., 4px, 12px, 16px) to adjust corner roundness
              
              // BLUR DENSITY: Change the blur value (e.g., 8px, 12px, 16px, 20px) for more/less blur
              backdropFilter: 'blur(2px) saturate(180%)', // Adjust blur(12px) - higher = more blur
              WebkitBackdropFilter: 'blur(2px) saturate(180%)', // Same for Safari support
              
              // BACKGROUND OPACITY: Change rgba alpha value (0.0 to 1.0) to adjust transparency
              // Lower value (e.g., 0.5) = more transparent, higher (e.g., 0.9) = more opaque
              backgroundColor: 'rgba(255, 255, 255, 0.75)', // Change 0.75 to adjust background opacity
              
              // BORDER OPACITY: Change rgba alpha value to adjust border visibility
              border: '1px solid rgba(255, 255, 255, 0.3)', // Change 0.3 to adjust border opacity
              
              // SHADOW: Adjust boxShadow values for different shadow effects
              // Format: '0 [vertical]px [blur]px [spread]px rgba(color, opacity)'
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Adjust for shadow intensity
            }}
          >
            {hoveredTech}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Technologies;


