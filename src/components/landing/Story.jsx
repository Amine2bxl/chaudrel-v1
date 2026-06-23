import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const timeline = [
  { year: "2009", event: "Fondation à Bruxelles par Alberto & Matteo" },
  { year: "2018", event: "100 projets réalisés, équipe élargie" },
  { year: "2025", event: "150+ projets, référence du luxe en Belgique" },
];

export default function Story() {
  return (
    <section id="story" className="py-24 lg:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/apres.jpg"
                alt="Intérieur rénové par Chaudrel"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl p-5 shadow-xl border border-[#8C764E]/10"
            >
              <p className="font-display text-4xl font-light text-[#8C764E]">100%</p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/50 font-medium mt-1">
                Engagement Qualité
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-semibold mb-4">
              Notre Histoire
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight mb-6">
              Bâtir avec
              <br />
              <span className="italic text-[#8C764E]">Passion & Rigueur</span>
            </h2>

            <p className="text-[15px] text-[#1A1A1A]/60 font-light leading-[1.85] mb-6">
              Chaudrel Rénovation est née d'une conviction profonde : la rénovation ne se limite pas à refaire des murs — c'est l'art de réinventer un espace pour qu'il reflète qui vous êtes.
            </p>
            <p className="text-[15px] text-[#1A1A1A]/60 font-light leading-[1.85] mb-10">
              Fondée par <strong className="text-[#1A1A1A]/80 font-medium">Alberto et Matteo</strong>, deux artisans passionnés, notre entreprise s'est forgée une réputation d'excellence en alliant savoir-faire artisanal et vision contemporaine. Chaque projet est un engagement personnel.
            </p>

            {/* Timeline */}
            <div className="space-y-4 mb-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#8C764E]/8"
                >
                  <span className="font-display text-lg font-semibold text-[#8C764E] w-12 flex-shrink-0">{t.year}</span>
                  <span className="text-[13px] text-[#1A1A1A]/65 font-light">{t.event}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#8C764E] tracking-wide hover:gap-4 transition-all duration-300"
            >
              Discutons de votre projet
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
