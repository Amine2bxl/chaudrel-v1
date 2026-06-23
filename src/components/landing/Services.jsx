import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "cuisine",
    title: "Cuisine",
    subtitle: "L'Art Culinaire",
    description:
      "Modernisation complète de votre cuisine avec des matériaux nobles — marbre, bois massif, laiton. Chaque espace est conçu sur mesure pour allier esthétique et fonctionnalité.",
    image: "/images/apres.jpg",
  },
  {
    id: "salle-de-bain",
    title: "Salle de Bain",
    subtitle: "Sanctuaire Privé",
    description:
      "Transformation de votre salle de bain en un espace spa personnel. Pierre naturelle, robinetterie haut de gamme, éclairage d'ambiance — le luxe au quotidien.",
    image: "/images/apres.jpg",
  },
  {
    id: "jardin",
    title: "Jardin & Extérieur",
    subtitle: "Paysage d'Exception",
    description:
      "Aménagement paysager et entretien d'espaces extérieurs d'exception. Terrasses, allées en pierre naturelle, éclairage architectural et espaces de vie en plein air.",
    image: "/images/avant.jpg",
  },
  {
    id: "toiture",
    title: "Toiture",
    subtitle: "Couronnement",
    description:
      "Rénovation et entretien de toitures avec des matériaux de première qualité — ardoise naturelle, zinc, cuivre. Protection durable et esthétique irréprochable.",
    image: "/images/apres.jpg",
  },
  {
    id: "piscine",
    title: "Piscine",
    subtitle: "Oasis Privée",
    description:
      "Création et rénovation de piscines d'exception. Design contemporain, matériaux premium, intégration harmonieuse dans votre espace extérieur.",
    image: "/images/apres.jpg",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#8C764E]" aria-hidden="true" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-medium">
              Nos Prestations
            </p>
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-light text-[#1A1A1A] leading-tight max-w-2xl">
            Un Savoir-Faire
            <br />
            <span className="italic text-[#8C764E]">Sans Compromis</span>
          </h2>
        </motion.div>

        {/* Desktop layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Left: service list */}
          <div className="col-span-5 space-y-1">
            {services.map((service, i) => (
              <motion.button
                key={service.id}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`w-full text-left p-6 transition-all duration-500 group border-l-2 ${
                  active === i
                    ? "border-[#8C764E] bg-white/80"
                    : "border-transparent hover:border-[#8C764E]/30 hover:bg-white/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`font-display text-2xl font-light transition-colors duration-300 ${
                      active === i ? "text-[#1A1A1A]" : "text-[#1A1A1A]/50 group-hover:text-[#1A1A1A]/80"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      active === i
                        ? "text-[#8C764E] translate-x-0 opacity-100"
                        : "text-[#8C764E]/0 -translate-x-2 opacity-0 group-hover:opacity-50 group-hover:translate-x-0"
                    }`}
                  />
                </div>
                <p
                  className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                    active === i ? "text-[#8C764E]" : "text-[#1A1A1A]/30"
                  }`}
                >
                  {service.subtitle}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Right: active image + description */}
          <div className="col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="sticky top-28"
              >
                <div className="aspect-[4/3] overflow-hidden mb-8">
                  <img
                    src={services[active].image}
                    alt={services[active].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-base text-[#1A1A1A]/70 font-light leading-relaxed max-w-lg">
                  {services[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="aspect-[4/3] overflow-hidden mb-5">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C764E] font-medium mb-2">
                {service.subtitle}
              </p>
              <h3 className="font-display text-2xl font-light text-[#1A1A1A] mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-[#1A1A1A]/60 font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
