"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (topic: str) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSearch(topic.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          What do you want to <span className="gradient-text">research?</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered deep research with multi-agent intelligence
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Search anything (e.g., AI in healthcare trends 2026)"
          className="w-full pl-14 pr-32 py-5 text-lg rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/50 shadow-2xl"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className="absolute right-3 inset-y-3 px-6 rounded-xl gradient-bg text-white font-medium flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
        >
          {isLoading ? "Researching..." : "Start Research"}
          <ArrowRight size={18} />
        </button>
      </form>
    </motion.div>
  );
}
