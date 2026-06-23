import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quels types de rénovations réalisez-vous ?",
    a: "Nous intervenons sur tous types de rénovations intérieures et extérieures : cuisines, salles de bain, toitures, jardins, terrasses, piscines, façades et rénovations complètes.",
  },
  {
    q: "Proposez-vous des devis gratuits ?",
    a: "Oui, consultation gratuite et sans engagement. Nous nous déplaçons chez vous, évaluons votre projet et vous fournissons un devis détaillé et personnalisé.",
  },
  {
    q: "Quels matériaux utilisez-vous ?",
    a: "Exclusivement des matériaux haut de gamme — marbre, pierre naturelle, ardoise, bois massif, cuivre, laiton. La qualité et la durabilité sont nos priorités absolues.",
  },
  {
    q: "Quelle est votre zone d'intervention ?",
    a: "Nous intervenons partout en Belgique — Bruxelles, Anvers, Gand, Liège, Namur, Charleroi et toute la périphérie. Aucune limite géographique pour vos projets.",
  },
  {
    q: "Combien de temps dure une rénovation ?",
    a: "Une cuisine prend 3 à 6 semaines, une rénovation complète 2 à 4 mois. Nous établissons un planning précis dès le départ et respectons nos délais.",
  },
  {
    q: "Comment se passe le suivi de chantier ?",
    a: "Un interlocuteur dédié gère votre projet de A à Z. Vous êtes informé à chaque étape, aucune décision n'est prise sans votre accord. Zéro surprise.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#F7F5F2]">
      <div className="max-w-3xl mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-semibold mb-3">
            Questions Fréquentes
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
            Tout Ce Que Vous
            <br />
            <span className="italic text-[#8C764E]">Devez Savoir</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-[#8C764E]/10 overflow-hidden shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-[#8C764E]/8 last:border-0"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-body text-[15px] font-medium text-[#1A1A1A] hover:text-[#8C764E] hover:no-underline transition-colors duration-200">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-[14px] text-[#1A1A1A]/55 font-light leading-[1.8]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
