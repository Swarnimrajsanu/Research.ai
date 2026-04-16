"use client";

import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

interface ReportViewProps {
  report: str;
  feedback: str;
}

export default function ReportView({ report, feedback }: ReportViewProps) {
  const [followUp, setFollowUp] = useState("");

  return (
    <div className="flex flex-col gap-10 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 shadow-2xl"
      >
        <div className="prose prose-invert prose-headings:gradient-text prose-a:text-primary prose-strong:text-foreground max-w-none">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
        
        {feedback && (
          <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Critic Feedback</h3>
            <div className="text-muted-foreground whitespace-pre-wrap text-sm italic">
              {feedback}
            </div>
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Refine Research</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        <div className="relative">
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Ask follow-up question or refine analysis..."
            className="w-full pl-6 pr-16 py-4 rounded-xl bg-secondary/30 border border-white/5 focus:border-primary/30 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] outline-none transition-all placeholder:text-muted-foreground/30"
          />
          <button className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center justify-center">
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
