"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const techStack = {
  frontend: [
    { name: "React" },
    { name: "Next.js" },
    { name: "TypeScript" },
    { name: "Tailwind CSS" },
    { name: "Motion" },
  ],
  backend: [
    { name: "Node.js" },
    { name: "Python" },
    { name: "Django" },
    { name: "Flask" },
    { name: "Express" },
  ],
  mobile: [
    { name: "React Native" },
    { name: "Flutter" },
    { name: "Bubble"}
  ],
  cloud: [
    { name: "AWS" },
    { name: "Google Cloud" },
    { name: "Kubernetes" },
  ],
  database: [
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "Redis" },
    { name: "MySQL" },
  ],
  aiml: [
    { name: "PyTorch" },
    { name: "OpenCV" },

  ],
  devops: [
    { name: "GitHub" },
  ],
};

const Technologies = () => {
  const tlRefs = useRef<gsap.core.Tween[]>([]);
  const listenersRef = useRef<
    { el: Element; type: string; handler: EventListenerOrEventListenerObject }[]
  >([]);

  useEffect(() => {
    // clear any previous (just in case)
    tlRefs.current.forEach((t) => t.kill());
    tlRefs.current = [];

    const sections = Array.from(document.querySelectorAll(".tech-scroll"));

    sections.forEach((section, index) => {
      const row = section.querySelector<HTMLElement>(".tech-row");
      if (!row) return;

      // Clone child nodes (safer for React) to create the seamless loop
      const children = Array.from(row.children);
      children.forEach((child) => {
        const clone = child.cloneNode(true) as HTMLElement;
        row.appendChild(clone);
      });

      // Now measure single-pass width (half of the total because we duplicated)
      const totalWidth = row.scrollWidth;
      const singleWidth = totalWidth / 2;

      // Alternate direction: even index = left (0 -> -singleWidth), odd = right (-singleWidth -> 0)
      const dir = index % 2 === 0 ? -1 : 1;
      const speed = 40; // seconds for one full loop (adjust as needed)

      // If odd (dir === 1) start at -singleWidth so animation moves right to 0
      if (dir === 1) {
        gsap.set(row, { x: -singleWidth });
      } else {
        gsap.set(row, { x: 0 });
      }

      // Create seamless looping tween using modifiers + wrap
      const tween = gsap.to(row, {
        x: dir === -1 ? -singleWidth : 0,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x: string) => {
            const parsed = parseFloat(x);
            // wrap between -singleWidth and 0 for a seamless effect
            const wrapped = gsap.utils.wrap(-singleWidth, 0, parsed);
            return `${wrapped}px`;
          },
        },
      });

      tlRefs.current.push(tween);

      // Interaction: wheel speeds up temporarily, mouseleave resets
      const speedUp = () => tween.timeScale(2);
      const slowDown = () => tween.timeScale(1);

      section.addEventListener("wheel", speedUp, { passive: true });
      section.addEventListener("mouseleave", slowDown);

      listenersRef.current.push({ el: section, type: "wheel", handler: speedUp });
      listenersRef.current.push({ el: section, type: "mouseleave", handler: slowDown });
    });

    // cleanup on unmount
    return () => {
      tlRefs.current.forEach((t) => t.kill());
      tlRefs.current = [];
      listenersRef.current.forEach(({ el, type, handler }) =>
        el.removeEventListener(type, handler)
      );
      listenersRef.current = [];
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

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

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-24">
          {Object.entries(techStack).map(([category, technologies], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8 capitalize">
                {category === "frontend" && "🎨 Frontend"}
                {category === "backend" && "⚙️ Backend"}
                {category === "mobile" && "📱 Mobile"}
                {category === "cloud" && "☁️ Cloud & Infrastructure"}
                {category === "database" && "💾 Databases"}
                {category === "aiml" && "🤖 AI/ML"}
                {category === "devops" && "🔧 DevOps & CI/CD"}
              </h2>

              {/* Horizontal Scroll (one per section) */}
              <div className="relative overflow-hidden w-full tech-scroll">
                <div className="flex gap-6 tech-row whitespace-nowrap">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={`${tech.name}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <Card className="p-6 text-center bg-transparent shadow-none border-none transition-all cursor-pointer group w-40 md:w-48 inline-block">
                        <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center">
                          <img
                            src={`/icons/${tech.name}.svg`}
                            alt={tech.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <p className="font-semibold text-sm">{tech.name}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Note Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Not Just Tools, Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              We don't just use these technologies—we master them. Our team stays
              updated with the latest best practices, attends conferences, and
              contributes to open source. This ensures we deliver solutions using
              the right tool for your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                Continuous Learning
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                Open Source Contributors
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                Industry Certifications
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                Tech Community Leaders
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modification Guide */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              📝 Easy Modification Guide
            </h3>
            <p className="text-muted-foreground mb-4">
              To add or remove technologies, simply edit the{" "}
              <code className="bg-muted px-2 py-1 rounded">techStack</code> object
              at the top of{" "}
              <code className="bg-muted px-2 py-1 rounded">
                src/pages/Technologies.tsx
              </code>
            </p>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
              <pre className="text-muted-foreground overflow-x-auto">
                {`frontend: [
  { name: 'React' },
  { name: 'Next.js' },
  // Add more here...
]`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Each technology entry needs a{" "}
              <code className="bg-muted px-1 rounded">name</code>. The SVG icon with
              the same name should be saved in{" "}
              <code className="bg-muted px-1 rounded">/public/icons/</code>.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Technologies;
