"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
      name: 'Sachin Pawar',
      role: 'Founder, Ajinkya Social Foundation',
      company: 'Ajinkya Scial Foundation',
      quote: 'Nirmaan delivered our non-profit organisation website ahead of schedule and under budget. Their attention to design, UI and compliance was exceptional.',
      rating: 5,
      project: 'Ajinkya Social Foundation (ajinkyasocialfoundation.org)'
    },
    {
      name: 'Anonymous',
      role: 'Design Department Head, Zenova',
      company: 'Zenova',
      quote: 'The animations and User Interface they developed was just what I needed. Highly recommended for your projects.',
      rating: 5,
      project: 'Zenova (zenova-nine.vercel.app)'
    },
    {
      name: 'Saurabh Gawade',
      role: 'Founder, Shreya E-Motors App',
      company: 'Shreya E-Motors',
      quote: 'Our logistics improved significantly since we started using the app. The team was professional, responsive, and truly understood our business.',
      rating: 5,
      project: 'Shreya E-Motors App'
    },
    {
      name: 'Tuba',
      role: 'Marketing Department, WeConnect Overseas',
      company: 'WeConnect Overseas',
      quote: 'Our website attracted more students and worked as a means to gain trust. The team performed well and really improved the experience.',
      rating: 5,
      project: 'WeConnect Overseas (weconnectoverseas.info)'
    }
];

const Clients = () => {
  return (
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

                <p className="text-muted-foreground mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>

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
  );
};

export default Clients;


