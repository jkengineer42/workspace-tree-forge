import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUp } from "lucide-react";

const PLACEHOLDER_PHRASES: Record<string, string[]> = {
  Medicine: [
    "Find the most sustainable dental implant material…",
    "Compare biocompatible polymers for orthopedic use…",
    "What's the most carbon-efficient surgical steel?",
  ],
  Architecture: [
    "Find eco-friendly insulation for passive houses…",
    "Compare carbon footprint of timber vs concrete…",
    "What's the most sustainable roofing material?",
  ],
  Mechanics: [
    "Find heat-resistant alloys for turbine blades…",
    "Compare lightweight composites for robotics…",
    "What's the most efficient thermal conductor?",
  ],
  Aerospace: [
    "Find radiation-resistant materials for satellites…",
    "Compare carbon fiber grades for fuselage panels…",
    "What's the lightest flame-retardant composite?",
  ],
};

interface AnimatedChatBoxProps {
  field: string;
}

const AnimatedChatBox = ({ field }: AnimatedChatBoxProps) => {
  const navigate = useNavigate();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = PLACEHOLDER_PHRASES[field] || PLACEHOLDER_PHRASES.Medicine;

  useEffect(() => {
    setPhraseIndex(0);
  }, [field]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div
      onClick={() => navigate("/dashboard")}
      className="w-full max-w-2xl mx-auto cursor-pointer group"
    >
      <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm px-5 py-4 transition-all duration-200 hover:shadow-md hover:border-forest/30">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-h-[28px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${field}-${phraseIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-muted-foreground text-base"
              >
                {phrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ArrowUp className="h-4 w-4 text-background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedChatBox;
