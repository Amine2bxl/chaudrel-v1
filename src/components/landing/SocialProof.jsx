import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const badges = [
  "Matériaux haut de gamme",
  "Devis gratuit & sans engagement",
  "Respect des délais garanti",
  "Accompagnement de A à Z",
  "Toute la Belgique",
  "Fondé en 2009",
];

export default function SocialProof() {
  return (
    <section className="py-10 bg-[#F7F5F2] border-b border-[#8C764E]/8">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white border border-[#8C764E]/10 rounded-full px-4 py-2 shadow-sm flex-shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8C764E]" strokeWidth={2} />
              <span className="text-[12px] font-medium text-[#1A1A1A]/70 tracking-wide">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
