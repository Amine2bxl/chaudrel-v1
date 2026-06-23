import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveHorizontal, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const projects = [
  {
    id: "facade-moderne",
    label: "Façade Moderne",
    type: "Brique & Extension",
    location: "Bruxelles",
    before: "/images/avant-facade.jpg",
    after:  "/images/apres-facade.jpg",
  },
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
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const calcPos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => { dragging.current = true; calcPos(e.clientX); };
  const onMouseMove = (e) => { if (dragging.current) calcPos(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };
  const onTouchStart = (e) => { dragging.current = true; calcPos(e.touches[0].clientX); };
  const onTouchMove  = (e) => { if (dragging.current) { e.preventDefault(); calcPos(e.touches[0].clientX); } };
  const onTouchEnd   = () => { dragging.current = false; };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden cursor-ew-resize select-none rounded-xl sm:rounded-2xl group"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => { onMouseUp(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="img"
      aria-label="Glissez pour voir la transformation avant/après"
    >
      {/* After (full) */}
      <img
        src={after}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="eager"
      />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${10000 / Math.max(pos, 0.1)}%`, maxWidth: "none" }}
          draggable={false}
          loading="eager"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md text-white text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full">
          Avant
        </div>
      </div>
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 pointer-events-none">
        <div className="bg-[#8C764E] backdrop-blur-md text-white text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg shadow-[#8C764E]/30">
          Après
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none z-10"
        style={{ left: `${pos}%`, transform: "translateX(-1px)" }}
      />

      {/* Handle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none transition-transform duration-200 ${hovered ? "scale-110" : "scale-100"}`}
        style={{ left: `${pos}%` }}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-2xl flex items-center justify-center ring-2 ring-[#8C764E]/40 ring-offset-2">
          <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C764E]" strokeWidth={2} />
        </div>
      </div>

      {/* Subtle hint at first load */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:hidden z-10 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm text-white text-[9px] tracking-wider px-2.5 py-1 rounded-full animate-pulse">
          ← Glissez →
        </div>
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
    <section className="py-14 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header — compact, asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-3 mb-6 sm:mb-8"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <div className="w-6 h-px bg-[#8C764E]" />
              <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C764E] font-semibold">
                Avant / Après
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-[1.1]">
              La métamorphose
              <span className="block italic text-[#8C764E]">de votre habitat</span>
            </h2>
          </div>

          {/* Counter — desktop only */}
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-[#1A1A1A]/40 font-light shrink-0 pb-1">
            <span className="text-[#1A1A1A] font-medium tabular-nums">{String(current + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span className="tabular-nums">{String(projects.length).padStart(2, "0")}</span>
          </div>
        </motion.div>

        {/* Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Slider
              before={project.before}
              after={project.after}
              beforeAlt={`Avant — ${project.label}`}
              afterAlt={`Après — ${project.label}`}
            />

            {/* Project meta + nav — tight, professional */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 px-1">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg sm:text-xl font-medium text-[#1A1A1A] leading-tight truncate">
                    {project.label}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-0.5 text-[11px] sm:text-[12px] text-[#1A1A1A]/55 font-light">
                    <span className="truncate">{project.type}</span>
                    <span className="w-1 h-1 rounded-full bg-[#8C764E]/40 shrink-0" />
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 shrink-0" strokeWidth={1.5} />
                      {project.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrows + dots */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                {/* Dots — mobile only inline */}
                <div className="flex gap-1.5 sm:hidden">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current ? "w-6 bg-[#8C764E]" : "w-1.5 bg-[#8C764E]/25"
                      }`}
                      aria-label={`Projet ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-white text-[#1A1A1A]/60 transition-all duration-300 active:scale-95"
                    aria-label="Projet précédent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-white text-[#1A1A1A]/60 transition-all duration-300 active:scale-95"
                    aria-label="Projet suivant"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
