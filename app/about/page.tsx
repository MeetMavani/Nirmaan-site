"use client";

import { motion } from 'framer-motion';
import { Target, Heart, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

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

const team = [
  { name: 'Kashyap Mavani', role: 'Founder & CEO', expertise: 'Full-Stack Architecture' },
  { name: 'Disha Raskar', role: 'CTO', expertise: 'Cloud & DevOps' },
  { name: 'Shubhankar Patil', role: 'Lead Frontend', expertise: 'React & UX' },
  { name: 'Meet Mavani', role: 'Lead Backend', expertise: 'Node.js & Python' },
];

const About = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Nirmaan</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building software that makes a difference
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded in 2014, Nirmaan started with a simple vision: to help businesses leverage 
                  technology to solve real-world problems. What began as a small team of passionate 
                  engineers has grown into a full-service software development agency.
                </p>
                <p>
                  Over the years, we've worked with startups building their MVP, mid-sized companies 
                  scaling their platforms, and enterprises modernizing their legacy systems. Each 
                  project has taught us valuable lessons about what truly matters: clean code, 
                  scalable architecture, and user-centric design.
                </p>
                <p>
                  Today, we're proud to have delivered over 200 projects across various industries, 
                  maintaining long-term relationships with our clients who trust us as their 
                  technology partner.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <value.icon className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced engineers passionate about building great software
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-accent" />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.expertise}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Philosophy */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-center">Our Tech Philosophy</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Clean Code</h3>
                  <p>
                    We write code that's maintainable, testable, and well-documented. Your codebase 
                    should be an asset, not a liability.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Scalability</h3>
                  <p>
                    We build systems that grow with your business. From day one, we architect 
                    solutions with scale in mind.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Cloud-Native</h3>
                  <p>
                    Leveraging modern cloud platforms (AWS, GCP, Azure) to deliver reliable, 
                    cost-effective solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Security First</h3>
                  <p>
                    Security isn't an afterthought. We follow industry best practices and conduct 
                    regular security audits.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
