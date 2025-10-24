import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { themeConfig } from '@/config/theme';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">{themeConfig.company.name}</h3>
            <p className="text-sm opacity-90 mb-4">{themeConfig.company.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-secondary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>Cloud Solutions</li>
              <li>AI Integration</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${themeConfig.company.email}`} className="hover:text-secondary transition-colors">
                  {themeConfig.company.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                {themeConfig.company.phone}
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href={themeConfig.company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={themeConfig.company.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={themeConfig.company.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>© {new Date().getFullYear()} {themeConfig.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
