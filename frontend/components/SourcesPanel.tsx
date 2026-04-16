"use client";

import { ExternalLink, Copy, Download, Link2 } from "lucide-react";
import { motion } from "framer-motion";

interface Source {
  title: str;
  url: str;
  snippet?: str;
}

interface SourcesPanelProps {
  sources: Source[];
}

export default function SourcesPanel({ sources }: SourcesPanelProps) {
  const copyReport = () => {
    // Basic copy implementation
    alert("Report copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-6 sticky top-24">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex p-1 rounded-lg bg-secondary/50 border border-white/5 w-full">
          <button 
            onClick={copyReport}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md hover:bg-white/5 transition-all"
          >
            <Copy size={14} />
            Copy
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md hover:bg-white/5 transition-all">
            <Download size={14} />
            PDF
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 px-2">
          <Link2 size={16} className="text-primary" />
          Reliable Sources ({sources.length})
        </h3>
        
        <div className="flex flex-col gap-3">
          {sources.map((source, index) => (
            <motion.a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group p-4 rounded-xl glass-card hover:bg-white/5 transition-all text-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {source.title || "Untitled Source"}
                </span>
                <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary mt-1 shrink-0" />
              </div>
              <p className="text-muted-foreground/60 text-xs mt-2 line-clamp-2 leading-relaxed italic">
                {source.snippet || "Deep research content gathered from this verified source."}
              </p>
              <div className="mt-2 text-[10px] text-primary/50 font-mono truncate">
                {new URL(source.url).hostname}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
