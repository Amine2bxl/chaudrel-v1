import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";

const AccordionContext = createContext({ value: undefined, onValueChange: () => {}, type: "single", collapsible: false });

const ItemContext = createContext({ value: undefined, open: false });

export function Accordion({ type = "single", collapsible = false, value, defaultValue, onValueChange, className = "", children }) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  const set = (v) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <AccordionContext.Provider value={{ value: current, setValue: set, type, collapsible }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className = "", children }) {
  const ctx = useContext(AccordionContext);
  const open = ctx.type === "single"
    ? ctx.value === value
    : Array.isArray(ctx.value) && ctx.value.includes(value);

  const toggle = () => {
    if (ctx.type === "single") {
      if (open && ctx.collapsible) ctx.setValue(undefined);
      else ctx.setValue(value);
    }
  };

  return (
    <ItemContext.Provider value={{ value, open, toggle }}>
      <div className={className}>{children}</div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({ className = "", children }) {
  const item = useContext(ItemContext);
  return (
    <button
      type="button"
      onClick={item.toggle}
      aria-expanded={item.open}
      className={`w-full flex items-center justify-between gap-4 ${className}`}
    >
      <span className="flex-1">{children}</span>
      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${item.open ? "rotate-180" : ""}`} />
    </button>
  );
}

export function AccordionContent({ className = "", children }) {
  const item = useContext(ItemContext);
  if (!item.open) return null;
  return <div className={className}>{children}</div>;
}
