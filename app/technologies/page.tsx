"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import gsap from "gsap";

// Flattened tech list
export const techList = [
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
        // Get all items in the row
        const items = Array.from(row.children);
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
        const slowDown = () => tween.timeScale(1);

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

  // Split technologies into rows (6 per row) - you can change this number
  const itemsPerRow = 6;
  const rows: string[][] = [];
  for (let i = 0; i < techList.length; i += itemsPerRow) {
    rows.push(techList.slice(i, i + itemsPerRow));
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Technologies & Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We work with modern, battle-tested technologies to build robust
              solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Continuous Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-16">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="relative overflow-hidden tech-scroll"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: rowIndex * 0.15, // Stagger delay between rows
                ease: "easeOut"
              }}
            >
              <div className="flex gap-6 tech-row will-change-transform">
                {/* Render each row 3 times for seamless looping */}
                {[...Array(3)].flatMap((_, setIndex) =>
                  row.map((tech, techIndex) => (
                    <motion.div
                      key={`${tech}-set${setIndex}-${techIndex}`}
                      whileHover={{ scale: 1.1 }}
                      className="flex-shrink-0"
                    >
                      <Card className="p-6 flex items-center justify-center bg-transparent shadow-none border-none transition-all cursor-pointer group w-32 h-32 md:w-36 md:h-36">
                        <div className="group-hover:scale-110 transition-transform">
                          <img
                            src={`/icons/${tech}.svg`}
                            alt={tech}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Note Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Not Just Tools, Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              We don't just use these technologies — we master them. Our team
              stays updated with the latest best practices and contributes to open
              source communities, ensuring high-quality, scalable solutions.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Technologies;