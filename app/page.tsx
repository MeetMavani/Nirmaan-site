"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Code, Users, Trophy } from 'lucide-react';
import Link from 'next/link';
import { HeroBackground } from '@/components/HeroBackground';
import TeamSection from '@/components/TeamSection/TeamSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// import heroBg from '@/public/assets/hero-bg.jpg';

const stats = [
  { icon: Trophy, label: 'Years Experience', value: '10+' },
  { icon: Code, label: 'Projects Delivered', value: '200+' },
  { icon: Users, label: 'Happy Clients', value: '150+' },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <h3 className="text-4xl font-bold mb-2 text-primary">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
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
              {['Healthcare', 'FinTech', 'E-commerce', 'SaaS', 'Education'].map((industry) => (
                <span key={industry} className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  {industry}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section (formerly /create) */}
      <TeamSection />
    </div>
  );
};

export default Home;
