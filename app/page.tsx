"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Heart, Zap, Shield, Star, Quote } from 'lucide-react';
import Link from 'next/link';
import { HeroBackground } from '@/components/HeroBackground';
import TeamSection from '@/components/TeamSection/TeamSection';
import Services from '@/components/Services';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import gsap from 'gsap';

// Values data
const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'We never compromise on code quality, testing, or security standards.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Staying ahead with the latest technologies and best practices.'
  },
  {
    icon: Heart,
    title: 'Client Focus',
    description: 'Your success is our success. We build lasting partnerships.'
  },
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Clear communication, honest timelines, and no hidden surprises.'
  }
];

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, HealthTech Solutions',
    company: 'HealthTech Solutions',
    quote: 'Nirmaan delivered our healthcare platform ahead of schedule and under budget. Their attention to security and compliance was exceptional.',
    rating: 5,
    project: 'HealthTrack Pro'
  },
  {
    name: 'Michael Chen',
    role: 'VP of Technology, FinCorp',
    company: 'FinCorp',
    quote: 'The AI-powered features they built have transformed how we serve our clients. Highly recommended for fintech projects.',
    rating: 5,
    project: 'FinFlow Platform'
  },
  {
    name: 'Priya Sharma',
    role: 'CEO, ShopSmart Retail',
    company: 'ShopSmart Retail',
    quote: 'Our online revenue tripled within 6 months of launching the new platform. The team was professional, responsive, and truly understood our business.',
    rating: 5,
    project: 'E-commerce Platform'
  },
  {
    name: 'David Kim',
    role: 'Founder, TechStartup',
    company: 'TechStartup',
    quote: 'From MVP to Series A, Nirmaan has been our trusted technology partner. They scale with us and always deliver quality work.',
    rating: 5,
    project: 'SaaS Platform'
  },
  {
    name: 'Anita Kumar',
    role: 'Director, EduLearn',
    company: 'EduLearn Institute',
    quote: 'The online learning platform they built has enabled us to reach students globally. Student engagement has never been higher.',
    rating: 5,
    project: 'Learning Management System'
  },
  {
    name: 'James Wilson',
    role: 'CIO, Enterprise Corp',
    company: 'Enterprise Corp',
    quote: 'They successfully migrated our legacy systems to the cloud with zero downtime. Impressive technical expertise and project management.',
    rating: 5,
    project: 'Cloud Migration'
  }
];

// Technologies data
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

const Home = () => {
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

  // Split technologies into rows (6 per row)
  const itemsPerRow = 6;
  const rows: string[][] = [];
  for (let i = 0; i < techList.length; i += itemsPerRow) {
    rows.push(techList.slice(i, i + itemsPerRow));
  }

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}
        />
        
        {/* 3D Background */}
        <HeroBackground />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 p-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Building Tomorrow&apos;s Software Today
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We are a team of software engineers helping startups and enterprises turn ideas into robust, scalable products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Who Are We */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Who Are We</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nirmaan is a full-service software development agency specializing in building 
              cutting-edge web and mobile applications. We combine technical excellence with 
              industry insights to deliver solutions that drive business growth. From startups 
              to enterprises, we&apos;ve helped organizations across various industries transform 
              their digital presence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Machine Learning', 'AI Agents', 'E-commerce', 'SaaS', 'Education'].map((industry) => (
                <span key={industry} className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  {industry}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      
      {/* 3. Services */}
      <Services />


      {/* 4. Technologies and Tools */}
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

          {/* <div className="bg-card rounded-lg p-12 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">Not Just Tools, Expertise</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We don't just use these technologies — we master them. Our team
                stays updated with the latest best practices and contributes to open
                source communities, ensuring high-quality, scalable solutions.
              </p>
            </motion.div>
          </div> */}
        </div>
      </section>

      {/* 5. What Our Clients Say */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">Real feedback from real projects</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow relative">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>

                  <div className="mt-auto">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-secondary mt-2">
                      Project: {testimonial.project}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Team Members */}
      <TeamSection />
    </div>
  );
};

export default Home;
