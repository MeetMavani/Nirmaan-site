"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { themeConfig } from "@/config/theme";
import { Button } from "./ui/button";
import { Barlow_Condensed } from "next/font/google";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
];

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const pathname = usePathname();
  const lastScroll = useRef(0);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current + 5) {
        setShrink(true); // scroll down
      } else if (current < lastScroll.current - 5) {
        setShrink(false); // scroll up
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          shrink
            ? "bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-white/5 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

          {/* ---------------- LEFT: LOGO ---------------- */}
          <Link
            href="/"
            className={`text-2xl font-bold transition-all duration-500 ${
              shrink ? "translate-x-[560px]" : "translate-x-0"
            }`}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {themeConfig.company.name}
            </span>
          </Link>

          {/* ---------------- RIGHT GROUP ---------------- */}
          <div className="hidden md:flex items-center gap-8">

            {/* HOME + PORTFOLIO (fade only) */}
            <div
              className={`flex items-center gap-8 transition-all duration-500 ${
                shrink ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm font-medium transition-colors hover:text-secondary ${
                    pathname === link.path
                      ? "text-secondary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* BUTTON — slides toward center */}
            <Link
              href="/contact"
              className={`transition-all duration-500 ${
                shrink ? "-translate-x-[560px]" : "translate-x-0"
              }`}
            >
              <Button variant="default" size="sm">Get In Touch</Button>
            </Link>

          </div>

            {/* ---------------- MOBILE MENU BUTTON ---------------- */}
            <motion.button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              whileTap={{ scale: 0.92 }}
              className={`md:hidden relative flex items-center justify-center w-12 h-12 rounded-full border border-white/25 shadow-lg transition-all duration-300 ${
                isOpen
                  ? "bg-secondary text-background"
                  : "bg-white/10 text-foreground"
              }`}
            >
              <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
              <span className="relative w-6 h-6">
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "top-1/2 rotate-45" : "top-1.5 -translate-y-1/2"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "top-1/2 -rotate-45" : "bottom-1.5 translate-y-1/2"
                  }`}
                />
              </span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ---------------- MOBILE MENU OVERLAY ---------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white/10 backdrop-blur-xl md:hidden border-b border-white/10 transition-all duration-300"
          >
            <div className="relative flex h-full flex-col justify-between px-8 pb-12 pt-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute inset-x-0 top-12 mx-auto w-64 h-64 bg-gradient-to-br from-white/5 to-white/0 blur-3xl" />
                
              </motion.div>

              {/* Close button */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="ml-auto mb-auto flex flex-col items-end gap-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-white"
              >
                <span className="relative block h-12 w-20">
                  <span className="absolute inset-0 bg-[#93B896] rounded-sm rotate-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]" />
                  <span className="absolute inset-0 bg-[#F1F8F2] rounded-sm -rotate-6 translate-y-1 border border-black/10" />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#4B864C] mt-3">
                    Close
                  </span>
                </span>
              </motion.button>

              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
                className="space-y-6"
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.path}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`${barlow.className} flex flex-col text-4xl font-black uppercase tracking-wide transition-colors ${
                        pathname === link.path
                          ? "text-[#19601e]"
                          : "text-[#5d925f]"
                      }`}
                    >
                      <span
                        className={`text-base text-[#6a8e69] font-light italic lowercase tracking-[0.4em] mb-1 ${
                          pathname === link.path ? "text-secondary" : "text-[#F1F8F2]"
                        }`}
                      >
                        {link.name.toLowerCase()}
                      </span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 text-[#134611] text-sm tracking-[0.4em] uppercase">
                  <span className="h-px flex-1 bg-[#7ab888]" />
                  Menu
                  <span className="h-px flex-1 bg-[#7ab888]" />
                </div>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#a5c5a7] text-[#134611] hover:bg-white/90">
                    Get In Touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
