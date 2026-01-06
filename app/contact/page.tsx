// Save this file as: Contact.tsx or page.tsx
// This is a TypeScript React component (.tsx)

"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { themeConfig } from '@/config/theme';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaWhatsapp } from "react-icons/fa";



interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  link: string;
}

// Format phone number for WhatsApp (remove spaces, +, etc.)
const formatPhoneForWhatsApp = (phone: string) => {
  return phone.replace(/\D/g, '');
};

const contactInfo: ContactInfo[] = [
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
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: themeConfig.company.phone,
    link: `https://wa.me/${formatPhoneForWhatsApp(themeConfig.company.phone)}?text=Hi%20Nirmaan!%20I%20came%20across%20your%20website%20and%20would%20like%20to%20connect.`
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pune, Maharashtra',
    link: 'https://maps.google.com/?q=Pune,Maharashtra'
  }
];  



const Contact: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };
  
  const contactSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(10, "Enter a valid phone number"),
    projectType: z.string().min(1, "Select a project type"),
    budget: z.string().min(1, "Select a budget range"),
    timeline: z.string().optional(),
    message: z.string().trim().min(20, "Message must be at least 20 characters"),
  });
  
  
  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  
  

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
                {contactInfo.map((info, index) => {
                  const isWhatsApp = info.label === "WhatsApp";
                  const isExternal = info.label === "WhatsApp" || info.label === "Location";
                  
                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      aria-label={`Contact via ${info.label}`}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-4 group rounded-xl p-4 transition-all
                        ${isWhatsApp
                          ? "bg-green-500/10 border border-green-500/30 hover:bg-green-500/20"
                          : ""
                        }
                      `}
                    >
                      <div className={`p-3 rounded-lg transition-colors
                          ${isWhatsApp
                            ? "bg-green-500/20 text-green-600"
                            : "bg-secondary/10 group-hover:bg-secondary/20"
                          }
                        `}
                      >
                        <info.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{info.label}</p>
                        <p className="text-muted-foreground">{info.value}</p>

                        {isWhatsApp && (
                          <p className="text-sm text-green-600 font-medium mt-1">
                            Fastest response on WhatsApp
                          </p>
                        )}
                      </div>
                    </motion.a>
                )})}
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
                <form
                  action="https://formspree.io/f/mjgkejga"
                  method="POST"
                  onSubmit={handleSubmit(() => handleFormSubmit())}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      {...register("name")}
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      {...register("email")}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      {...register("phone")}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your phone number"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                      Project Type *
                    </label>
                    <select
                      {...register("projectType")}
                      className="w-full rounded-md border bg-background px-3 py-2"
                    >
                      <option value="">Select project type</option>
                      <option value="Website">Website</option>
                      <option value="Web App">Web App</option>
                      <option value="Branding">Branding</option>
                      <option value="UI/UX">UI/UX Design</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="text-sm text-red-500 mt-1">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range *
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full rounded-md border bg-background px-3 py-2"
                    >
                      <option value="">Select budget range</option>
                      <option value="25k-50k"> less than ₹25k</option>
                      <option value="25k-50k">₹25k – ₹50k</option>
                      <option value="50k-1L">₹50k – ₹1L</option>
                      <option value="1L-3L">₹1L – ₹3L</option>
                      <option value="3L+">₹3L+</option>
                    </select>
                    {errors.budget && (
                      <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                      Timeline
                    </label>
                    <select
                      {...register("timeline")}
                      className="w-full rounded-md border bg-background px-3 py-2"
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="2-4 weeks">2–4 weeks</option>
                      <option value="1-2 months">1–2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="project" className="block text-sm font-medium mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      {...register("message")}
                      name="message"
                      autoComplete="off"
                      rows={6}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && (
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    )}
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
              Email us to schedule a free 30-minute consultation about your project
            </p>
            <a 
              href={`mailto:${themeConfig.company.email}?subject=Schedule%20a%20Call%20with%20Nirmaan`}
              className="inline-block px-8 py-4 bg-background text-foreground rounded-full border border-primary font-semibold hover:scale-105 transition-transform"
            >
              Email Us to Schedule a Call
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;