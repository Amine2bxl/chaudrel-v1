import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Résidence Uccle",
    type: "Rénovation Complète",
    image: "/images/apres.jpg",
    span: "col-span-1 lg:col-span-2",
    aspect: "aspect-[3/2]",
  },
  {
    title: "Villa Tervuren — Intérieur",
    type: "Architecture Intérieure",
    image: "/images/apres.jpg",
    span: "col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Terrasse Woluwe",
    type: "Aménagement Extérieur",
    image: "/images/avant.jpg",
    span: "col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Cuisine Ixelles",
    type: "Cuisine Sur Mesure",
    image: "/images/apres.jpg",
    span: "col-span-1 lg:col-span-2",
    aspect: "aspect-[3/2]",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#8C764E]" aria-hidden="true" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-medium">
                Nos Réalisations
              </p>
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Chaque Projet,
              <br />
              <span className="italic text-[#8C764E]">Une Histoire Unique</span>
            </h2>
          </div>
          <p className="text-sm text-[#1A1A1A]/50 font-light leading-relaxed max-w-md">
            Découvrez une sélection de nos rénovations réalisées à Bruxelles et
            ses environs. Chaque chantier est mené avec rigueur, passion et un
            souci du détail absolu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={`${project.span} group relative overflow-hidden cursor-pointer`}
            >
              <div className={`${project.aspect} overflow-hidden`}>
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.type}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8C764E] font-medium mb-2">
                    {project.type}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-xl lg:text-2xl font-light text-white">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-white/60" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
