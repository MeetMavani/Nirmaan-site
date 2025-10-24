"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

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

const clientLogos = [
  'HealthTech Solutions',
  'FinCorp',
  'ShopSmart Retail',
  'TechStartup',
  'EduLearn Institute',
  'Enterprise Corp',
  'DataFlow Systems',
  'CloudVentures',
  'AI Innovations',
  'SecureBank',
  'MediCare Plus',
  'LogiTech Solutions'
];

const Clients = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Clients</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by leading companies across industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Trusted By</h2>
            <p className="text-muted-foreground">Companies we've had the pleasure of working with</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 flex items-center justify-center h-32 hover:shadow-lg transition-shadow">
                  <span className="text-lg font-semibold text-muted-foreground text-center">
                    {client}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
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

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '150+', label: 'Happy Clients' },
              { value: '200+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '10+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-5xl font-bold text-secondary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
