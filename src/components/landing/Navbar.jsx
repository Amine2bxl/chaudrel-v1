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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-10">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <img
                src="/images/logo.jpg"
                alt="Chaudrel Rénovation"
                className="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-lg"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-base sm:text-lg tracking-[0.1em] font-semibold text-[#1A1A1A]">
                  CHAUDREL
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8C764E] font-medium">
                  Rénovation
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 rounded-full text-[13px] font-medium tracking-wide text-[#1A1A1A]/70 transition-all duration-200 hover:bg-[#8C764E]/8 hover:text-[#8C764E]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+32477273118"
                className="flex items-center gap-1.5 text-[13px] font-medium text-[#1A1A1A]/60 transition-colors duration-200 hover:text-[#8C764E]"
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

            {/* Mobile: phone + burger */}
            <div className="flex lg:hidden items-center gap-1">
              <a
                href="tel:+32477273118"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#1A1A1A]/70 active:bg-gray-100"
                aria-label="Appeler"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#1A1A1A] active:bg-gray-100"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-4 sm:px-5 h-14 sm:h-16 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <img
                  src="/images/logo.jpg"
                  alt="Chaudrel Rénovation"
                  className="h-8 w-8 object-contain rounded-lg"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-base tracking-wide text-[#1A1A1A] font-semibold">
                    CHAUDREL
                  </span>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-[#8C764E] font-medium">
                    Rénovation
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                  className="flex items-center justify-between font-display text-2xl sm:text-3xl font-light text-[#1A1A1A] py-4 sm:py-5 border-b border-gray-100 active:text-[#8C764E] transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-[#8C764E] text-sm font-light tabular-nums">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="px-6 sm:px-8 pb-8 pt-4 space-y-3 border-t border-gray-100 shrink-0">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-4 bg-[#8C764E] text-white text-[13px] tracking-[0.15em] uppercase font-semibold rounded-full active:bg-[#5E4F34] shadow-lg shadow-[#8C764E]/20"
              >
                Consultation gratuite
              </a>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href="tel:+32477273118"
                  className="flex items-center justify-center gap-1.5 py-3 text-[12px] text-[#1A1A1A]/70 border border-gray-200 rounded-full active:bg-gray-50"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Alberto
                </a>
                <a
                  href="tel:+32493972517"
                  className="flex items-center justify-center gap-1.5 py-3 text-[12px] text-[#1A1A1A]/70 border border-gray-200 rounded-full active:bg-gray-50"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Matteo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
