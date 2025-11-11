"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Card } from '@/components/ui/card';

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
  const tlRefs = useRef([]);
  const listenersRef = useRef([]);

  useEffect(() => {
    tlRefs.current.forEach((t) => t.kill());
    tlRefs.current = [];

    const sections = Array.from(document.querySelectorAll(".tech-scroll"));

    sections.forEach((section, index) => {
      const row = section.querySelector(".tech-row");
      if (!row) return;

      requestAnimationFrame(() => {
        const singleWidth = row.scrollWidth / 3;
        const dir = index % 2 === 0 ? -1 : 1;
        const speed = 40;

        gsap.set(row, { x: dir === -1 ? 0 : -singleWidth });

        const tween = gsap.to(row, {
          x: dir === -1 ? -singleWidth : 0,
          duration: speed,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x) => {
              const parsed = parseFloat(x);
              const wrapped = gsap.utils.wrap(-singleWidth, 0, parsed);
              return `${wrapped}px`;
            },
          },
        });

        tlRefs.current.push(tween);

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
      listenersRef.current.forEach(({ el, type, handler }) => el.removeEventListener(type, handler));
      listenersRef.current = [];
    };
  }, []);

  const itemsPerRow = 6;
  const rows = [];
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

        <div className="space-y-16 mb-20">
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
              <div className="flex gap-6 tech-row will-change-transform">
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
      </div>
    </section>
  );
};

export default Technologies;


