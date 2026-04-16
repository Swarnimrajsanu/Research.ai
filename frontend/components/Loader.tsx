"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Brain, PenTool, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { id: "search", label: "Searching sources...", icon: Search },
  { id: "scrape", label: "Scraping content...", icon: Globe },
  { id: "analyze", label: "Analyzing data...", icon: Brain },
  { id: "write", label: "Writing report...", icon: PenTool },
  { id: "review", label: "Reviewing...", icon: CheckCircle2 },
];

export default function Loader() {
  const [currentStep, setCurrentStep] = useState(0);

  // Simple auto-progress for the UI feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 4500); // Average time per step
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-2 border-r-2 border-primary/40 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full border-b-2 border-l-2 border-primary" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <Brain size={32} />
        </div>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.3, x: -10 }}
              animate={{ 
                opacity: isActive ? 1 : isCompleted ? 0.8 : 0.3,
                x: isActive ? 0 : 0
              }}
              className="flex items-center gap-4 group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isActive ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : 
                isCompleted ? "bg-green-500/10 text-green-500" : "bg-white/5 text-muted-foreground"
              }`}>
                {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              </div>
              <span className={`font-medium transition-colors ${
                isActive ? "text-foreground" : isCompleted ? "text-muted-foreground" : "text-muted-foreground/40"
              }`}>
                {step.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-dot"
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
