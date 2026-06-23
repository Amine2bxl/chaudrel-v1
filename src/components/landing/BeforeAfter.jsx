import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "allee",
    label: "Allée Extérieure",
    type: "Asphalte Premium",
    location: "Uccle, Bruxelles",
    before: "/images/avant.jpg",
    after:  "/images/apres.jpg",
  },
  {
    id: "allee2",
    label: "Allée Pavée",
    type: "Pierre Naturelle",
    location: "Woluwe-Saint-Pierre",
    before: "/images/avant.jpg",
    after:  "/images/apres.jpg",
  },
  {
    id: "facade",
    label: "Façade & Entrée",
    type: "Rénovation Extérieure",
    location: "Ixelles, Bruxelles",
    before: "/images/avant.jpg",
    after:  "/images/apres.jpg",
  },
];

function Slider({ before, after, beforeAlt, afterAlt }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const calcPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => { dragging.current = true; calcPos(e.clientX); };
  const onMouseMove = (e) => { if (dragging.current) calcPos(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };
  const onTouchStart = (e) => { dragging.current = true; calcPos(e.touches[0].clientX); };
  const onTouchMove  = (e) => { if (dragging.current) { e.preventDefault(); calcPos(e.touches[0].clientX); } };
  const onTouchEnd   = () => { dragging.current = false; };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden cursor-ew-resize select-none rounded-2xl"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="img"
      aria-label="Glissez pour voir la transformation avant/après"
    >
      <img src={after} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${10000 / pos}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full pointer-events-none">
        Avant
      </div>
      <div className="absolute top-4 right-4 bg-[#8C764E] text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full pointer-events-none">
        Après
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)] pointer-events-none" style={{ left: `${pos}%` }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none ring-2 ring-[#8C764E]/30"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="w-5 h-5 text-[#8C764E]" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const project = projects[current];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-semibold mb-3">
              Transformation Réelle
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
              Avant & Après —
              <br />
              <span className="italic text-[#8C764E]">La Différence Chaudrel</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#8C764E]/20 flex items-center justify-center hover:bg-[#8C764E] hover:border-[#8C764E] hover:text-white text-[#1A1A1A]/50 transition-all duration-300"
              aria-label="Projet précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[13px] text-[#1A1A1A]/40 font-light min-w-[60px] text-center">
              {current + 1} / {projects.length}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#8C764E]/20 flex items-center justify-center hover:bg-[#8C764E] hover:border-[#8C764E] hover:text-white text-[#1A1A1A]/50 transition-all duration-300"
              aria-label="Projet suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Slider
              before={project.before}
              after={project.after}
              beforeAlt={`Avant — ${project.label}`}
              afterAlt={`Après — ${project.label}`}
            />

            {/* Project meta */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-[#F7F5F2] rounded-2xl px-6 py-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8C764E] font-semibold mb-0.5">Projet</p>
                  <p className="font-display text-[15px] font-light text-[#1A1A1A]">{project.label}</p>
                </div>
                <div className="w-px h-8 bg-[#8C764E]/15" />
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8C764E] font-semibold mb-0.5">Matériau</p>
                  <p className="font-display text-[15px] font-light text-[#1A1A1A]">{project.type}</p>
                </div>
                <div className="w-px h-8 bg-[#8C764E]/15" />
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8C764E] font-semibold mb-0.5">Lieu</p>
                  <p className="font-display text-[15px] font-light text-[#1A1A1A]">{project.location}</p>
                </div>
              </div>
              {/* Dots */}
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-[#8C764E] w-5" : "bg-[#8C764E]/25"}`}
                    aria-label={`Projet ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-[12px] text-[#1A1A1A]/30 font-light mt-5">
          Glissez le curseur pour révéler la transformation complète
        </p>
      </div>
    </section>
  );
}
