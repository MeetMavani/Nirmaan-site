"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { themeConfig } from '@/config/theme';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: themeConfig.company.email,
    link: `mailto:${themeConfig.company.email}`
  },
  {
    icon: Phone,
    label: 'Phone',
    value: themeConfig.company.phone,
    link: `tel:${themeConfig.company.phone}`
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pune, Maharashtra',
    link: '#'
  }
];

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let&apos;s discuss your project and see how we can help
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Have a question or ready to start your project? We&apos;re here to help. 
                Reach out through any of these channels or fill out the form.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                      <info.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{info.label}</p>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <Card className="p-6 bg-gradient-accent text-muted-foreground">
                <h3 className="text-xl font-bold mb-2">Quick Response Time</h3>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-medium mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="project"
                      placeholder="Tell us about your project, timeline, and budget..."
                      required
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full group">
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Card>
            </motion.div>
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
            <h2 className="text-4xl text-primary font-bold mb-6">Prefer to Schedule a Call?</h2>
            <p className="text-xl text-primary mb-8 opacity-90 max-w-2xl mx-auto">
              Book a free 30-minute consultation to discuss your project
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-background text-foreground rounded-full border border-primary font-semibold hover:scale-105 transition-transform">
                Schedule a Call
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
