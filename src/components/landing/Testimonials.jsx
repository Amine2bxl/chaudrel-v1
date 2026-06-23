import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alexandre Vandenberghe",
    location: "Uccle, Bruxelles",
    rating: 5,
    date: "Mars 2025",
    project: "Rénovation complète",
    quote: "Chaudrel a transformé notre villa de fond en comble. La qualité des matériaux, la précision des finitions et le sérieux de l'équipe sont sans égal. Alberto et Matteo ont su réaliser notre vision à la perfection.",
    initials: "AV",
  },
  {
    name: "Sophie & Laurent Dubois",
    location: "Ixelles, Bruxelles",
    rating: 5,
    date: "Fév. 2025",
    project: "Cuisine & Salle de Bain",
    quote: "Notre cuisine est désormais le cœur de notre maison. Le marbre sélectionné par Chaudrel, les finitions en laiton brossé, tout respire le luxe. Délais respectés à la lettre. Expérience client irréprochable.",
    initials: "SD",
  },
  {
    name: "Marc Willems",
    location: "Tervuren",
    rating: 5,
    date: "Jan. 2025",
    project: "Toiture & Jardin",
    quote: "Deux chantiers menés en parallèle avec une organisation impeccable. Le résultat dépasse toutes nos attentes. Notre propriété a pris une valeur considérable. Merci à toute l'équipe Chaudrel.",
    initials: "MW",
  },
  {
    name: "Catherine Lejeune",
    location: "Woluwe-Saint-Pierre",
    rating: 5,
    date: "Déc. 2024",
    project: "Allée extérieure",
    quote: "La transformation de notre allée est spectaculaire. De la vieille dalle détériorée à l'asphalte premium — le changement est total. Propre, rapide, et un résultat magnifique. Toute notre rue nous fait des compliments !",
    initials: "CL",
  },
  {
    name: "Philippe Maes",
    location: "Waterloo",
    rating: 5,
    date: "Nov. 2024",
    project: "Rénovation complète",
    quote: "Chaudrel a pris en charge la rénovation intégrale de notre maison. Un seul interlocuteur pour tout gérer, c'est un luxe en soi. Aucune surprise, aucune déception. Exactement ce que j'attendais.",
    initials: "PM",
  },
  {
    name: "Isabelle & Thomas Renard",
    location: "Uccle, Bruxelles",
    rating: 5,
    date: "Oct. 2024",
    project: "Piscine & Terrasse",
    quote: "La création de notre piscine et la rénovation de notre terrasse ont été réalisées avec un soin exceptionnel. L'intégration paysagère est parfaite. Nous avons enfin l'espace extérieur dont nous rêvions.",
    initials: "IR",
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#8C764E] text-[#8C764E]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-semibold mb-3">
              Avis Clients
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Ce Que Disent
              <br />
              <span className="italic text-[#8C764E]">Nos Clients</span>
            </h2>
          </motion.div>

          {/* Aggregate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-5 bg-[#F7F5F2] rounded-2xl px-6 py-5 border border-[#8C764E]/10"
          >
            <div className="text-center">
              <p className="font-display text-4xl font-light text-[#1A1A1A]">5.0</p>
              <Stars />
              <p className="text-[10px] tracking-[0.12em] uppercase text-[#1A1A1A]/40 font-medium mt-1.5">
                Note moyenne
              </p>
            </div>
            <div className="w-px h-14 bg-[#8C764E]/15" />
            <div className="text-center">
              <p className="font-display text-4xl font-light text-[#1A1A1A]">150+</p>
              <p className="text-[10px] tracking-[0.12em] uppercase text-[#1A1A1A]/40 font-medium mt-1.5">
                Projets réalisés
              </p>
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className="bg-[#F7F5F2] hover:bg-white border border-[#8C764E]/0 hover:border-[#8C764E]/12 hover:shadow-lg rounded-2xl p-6 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.rating} />
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#1A1A1A]/30 font-medium">
                  {t.date}
                </span>
              </div>

              <p className="text-[14px] text-[#1A1A1A]/65 font-light leading-[1.8] mb-6 italic">
                « {t.quote} »
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[#8C764E]/8">
                <div className="w-9 h-9 rounded-full bg-[#8C764E] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[11px] font-semibold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-display text-[14px] font-light text-[#1A1A1A] leading-tight">{t.name}</p>
                  <p className="text-[11px] text-[#8C764E] font-medium mt-0.5">{t.location}</p>
                </div>
                <span className="ml-auto text-[10px] bg-[#8C764E]/8 text-[#8C764E] font-medium px-2.5 py-1 rounded-full">
                  {t.project}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A1A1A] text-white text-[13px] tracking-[0.1em] uppercase font-semibold rounded-full hover:bg-[#8C764E] transition-all duration-300"
          >
            Rejoignez nos clients satisfaits
          </a>
        </motion.div>
      </div>
    </section>
  );
}
