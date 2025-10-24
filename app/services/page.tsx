"use client";

import { motion } from 'framer-motion';
import { Code2, Smartphone, Cloud, Database, Cpu, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    summary: 'Build powerful, responsive web applications that scale with your business',
    tools: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS'],
    example: 'Built a real-time collaboration platform serving 50K+ users with 99.9% uptime'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    summary: 'Native and cross-platform mobile apps for iOS and Android',
    tools: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    example: 'Delivered a fintech app with biometric authentication and offline capabilities'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    summary: 'Scalable cloud infrastructure and migration services',
    tools: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes'],
    example: 'Migrated legacy monolith to microservices, reducing costs by 40%'
  },
  {
    icon: Database,
    title: 'Backend Development',
    summary: 'Robust APIs and server-side logic for complex business requirements',
    tools: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'],
    example: 'Created high-performance API handling 10M+ requests daily'
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    summary: 'Integrate AI/ML capabilities into your applications',
    tools: ['TensorFlow', 'PyTorch', 'OpenAI', 'Langchain'],
    example: 'Implemented AI chatbot reducing customer support tickets by 60%'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    summary: 'Beautiful, intuitive interfaces that users love',
    tools: ['Figma', 'Adobe XD', 'Framer', 'Design Systems'],
    example: 'Redesigned e-commerce platform, increasing conversions by 35%'
  }
];

const Services = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              End-to-end software development services tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <service.icon className="w-12 h-12 text-secondary mb-4" />
                  
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  
                  <p className="text-muted-foreground mb-6">{service.summary}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-2 text-primary">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h4 className="font-semibold text-sm mb-2">Example Project</h4>
                    <p className="text-sm text-muted-foreground">{service.example}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how we can help turn your vision into reality
            </p>
            <a href="/contact">
              <button className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:scale-105 transition-transform">
                Get in Touch
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
