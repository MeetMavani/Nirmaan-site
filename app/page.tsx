"use client";

import { motion } from 'framer-motion';
import TeamSection from '@/components/TeamSection/TeamSection';
import Hero from '@/components/Home/Hero';
import Technologies from '@/components/Home/Technologies';
import Clients from '@/components/Home/Clients';
import Services from '@/components/Home/Services';

const Home = () => {

  return (
    <div className="min-h-screen">
      <Hero />

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
      <Technologies />

      {/* 5. What Our Clients Say */}
      <Clients />

      {/* 6. Team Members */}
      <TeamSection />
    </div>
  );
};

export default Home;
