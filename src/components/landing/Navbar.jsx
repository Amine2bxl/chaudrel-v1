import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#portfolio" },
  { label: "Notre Histoire", href: "#story" },
  { label: "Avis Clients", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < 60 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <motion.header
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-[#8C764E]/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <img
                src="/images/logo.jpg"
                alt="Chaudrel Rénovation"
                className="h-9 w-9 object-contain rounded-lg"
              />
              <div className="flex flex-col leading-none">
                <span className={`font-display text-base lg:text-lg tracking-[0.1em] font-semibold transition-colors duration-300 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}>
                  CHAUDREL
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#8C764E] font-medium">
                  Rénovation
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 hover:bg-[#8C764E]/10 hover:text-[#8C764E] ${
                    scrolled ? "text-[#1A1A1A]/70" : "text-white/75"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+32477273118"
                className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 hover:text-[#8C764E] ${scrolled ? "text-[#1A1A1A]/60" : "text-white/65"}`}
              >
                <Phone className="w-3.5 h-3.5" />
                +32 477 27 31 18
              </a>
              <a
                href="#contact"
                className="ml-1 px-5 py-2.5 bg-[#8C764E] text-white text-[12px] tracking-[0.12em] uppercase font-semibold rounded-full hover:bg-[#5E4F34] transition-all duration-300 shadow-lg shadow-[#8C764E]/20"
              >
                Consultation gratuite
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logo.jpg"
                  alt="Chaudrel Rénovation"
                  className="h-8 w-8 object-contain rounded-lg"
                />
                <span className="font-display text-lg tracking-wide text-[#1A1A1A] font-semibold">
                  CHAUDREL
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-display text-2xl font-light text-[#1A1A1A] py-4 border-b border-gray-100 hover:text-[#8C764E] transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-8 pb-10 space-y-3">
              <a href="tel:+32477273118" className="block text-sm text-[#1A1A1A]/50">
                Alberto — +32 477 27 31 18
              </a>
              <a href="tel:+32493972517" className="block text-sm text-[#1A1A1A]/50">
                Matteo — +32 493 97 25 17
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-4 bg-[#8C764E] text-white text-[13px] tracking-[0.15em] uppercase font-semibold rounded-2xl"
              >
                Consultation gratuite
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
