import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#111111] relative overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8C764E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-semibold mb-4">
              Démarrer Votre Projet
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-white leading-tight mb-5">
              Prêt à Transformer
              <br />
              <span className="italic text-[#C4A96B]">Votre Espace ?</span>
            </h2>
            <p className="text-[15px] text-white/45 font-light leading-[1.8] mb-10 max-w-sm">
              Consultation gratuite et sans engagement. Nous nous déplaçons chez vous pour évaluer votre projet et vous accompagner de A à Z.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "Alberto", value: "+32 477 27 31 18", href: "tel:+32477273118" },
                { icon: Phone, label: "Matteo", value: "+32 493 97 25 17", href: "tel:+32493972517" },
                { icon: Mail, label: "Email", value: "Info@chaudrel.be", href: "mailto:Info@chaudrel.be" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group p-4 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-[#8C764E]/30 rounded-2xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8C764E]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8C764E]/30 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-[#8C764E]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium">{label}</p>
                    <p className="text-white font-light mt-0.5">{value}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#8C764E] group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/8 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#8C764E]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#8C764E]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium">Zone d'intervention</p>
                  <p className="text-white font-light mt-0.5">Bruxelles & Périphérie</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const fd = new FormData(e.target);
    const prenom = fd.get("prenom");
    const nom = fd.get("nom");
    const email = fd.get("email");
    const tel = fd.get("telephone");
    const projet = fd.get("projet");
    const message = fd.get("message");

    try {
      await db.integrations.Core.SendEmail({
        to: "Info@chaudrel.be",
        subject: `Nouveau contact — ${projet || "Projet"} — ${prenom} ${nom}`,
        body: `Nom : ${prenom} ${nom}\nEmail : ${email}\nTéléphone : ${tel}\nType de projet : ${projet}\n\nMessage :\n${message}`,
      });
      setSent(true);
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center h-full text-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#8C764E]/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <p className="font-display text-2xl font-light text-white mb-3">Merci !</p>
          <p className="text-white/45 font-light text-sm">
            Votre demande a été envoyée. Nous vous recontacterons sous 24 heures.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-2">Prénom</label>
          <input
            name="prenom"
            type="text"
            required
            placeholder="Votre prénom"
            className="w-full bg-[#1C1C1C] border border-white/12 rounded-xl px-4 py-3 text-white text-[14px] font-light placeholder:text-white/20 outline-none focus:border-[#8C764E]/50 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-2">Nom</label>
          <input
            name="nom"
            type="text"
            required
            placeholder="Votre nom"
            className="w-full bg-[#1C1C1C] border border-white/12 rounded-xl px-4 py-3 text-white text-[14px] font-light placeholder:text-white/20 outline-none focus:border-[#8C764E]/50 transition-all duration-200"
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="votre@email.com"
          className="w-full bg-[#1C1C1C] border border-white/12 rounded-xl px-4 py-3 text-white text-[14px] font-light placeholder:text-white/20 outline-none focus:border-[#8C764E]/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-2">Téléphone</label>
        <input
          name="telephone"
          type="tel"
          placeholder="+32 ..."
          className="w-full bg-[#1C1C1C] border border-white/12 rounded-xl px-4 py-3 text-white text-[14px] font-light placeholder:text-white/20 outline-none focus:border-[#8C764E]/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-2">Type de projet</label>
        <select
          name="projet"
          required
          className="w-full bg-[#1C1C1C] border border-white/12 rounded-xl px-4 py-3 text-white/70 text-[14px] font-light outline-none focus:border-[#8C764E]/50 transition-all duration-200 appearance-none"
        >
          <option value="">Sélectionnez</option>
          <option value="cuisine">Cuisine</option>
          <option value="salle-de-bain">Salle de Bain</option>
          <option value="jardin">Jardin & Extérieur</option>
          <option value="toiture">Toiture</option>
          <option value="piscine">Piscine</option>
          <option value="renovation-complete">Rénovation Complète</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-2">Votre projet</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Décrivez votre vision..."
          className="w-full bg-[#1C1C1C] border border-white/12 rounded-xl px-4 py-3 text-white text-[14px] font-light placeholder:text-white/20 outline-none focus:border-[#8C764E]/50 transition-all duration-200 resize-none"
        />
      </div>
      {error && (
        <p className="text-red-400 text-[13px] text-center bg-red-500/10 rounded-xl px-4 py-3">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="w-full py-4 bg-[#8C764E] hover:bg-[#C4A96B] text-white text-[13px] tracking-[0.15em] uppercase font-semibold rounded-2xl disabled:opacity-60 transition-all duration-300 shadow-lg shadow-[#8C764E]/20"
      >
        {sending ? "Envoi en cours..." : "Envoyer ma demande →"}
      </button>
      <p className="text-center text-[11px] text-white/25">
        Consultation gratuite · Réponse sous 24h · Sans engagement
      </p>
    </form>
  );
}
