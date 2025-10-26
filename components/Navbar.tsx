"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { themeConfig } from '@/config/theme';
import { Button } from './ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Clients', path: '/clients' },
  { name: 'Technologies', path: '/technologies' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white/5 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {themeConfig.company.name}
              {/* <Image src={themeConfig.company.logo} alt={themeConfig.company.name} width={200} height={200} /> */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-secondary ${
                  pathname === link.path ? 'text-secondary' : 'text-foreground'
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="default" size="sm">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 backdrop-blur-md bg-white/10 border-t border-white/20 mt-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors ${
                  pathname === link.path
                    ? 'bg-secondary/10 text-secondary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full mt-4">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
