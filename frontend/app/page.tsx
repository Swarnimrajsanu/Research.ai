"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import ReportView from "@/components/ReportView";
import SourcesPanel from "@/components/SourcesPanel";

const API_BASE = "http://localhost:8000/api/v1";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<str | null>(null);
  const [researchData, setResearchData] = useState<{
    report: str;
    sources: any[];
    feedback: str;
  } | null>(null);

  const startResearch = async (topic: str) => {
    setIsLoading(true);
    setError(null);
    setResearchData(null);

    try {
      const response = await axios.post(`${API_BASE}/research`, { topic });
      setResearchData(response.data);
    } catch (err: any) {
      console.error("Research failed:", err);
      setError(
        err.response?.data?.detail || 
        "Research failed. Please ensure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!isLoading && !researchData && (
            <div key="search-view" className="py-20 flex items-center justify-center min-h-[70vh]">
              <SearchBar onSearch={startResearch} isLoading={isLoading} />
            </div>
          )}

          {isLoading && (
            <motion.div
              key="loader-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-10"
            >
              <Loader />
            </motion.div>
          )}

          {researchData && (
            <motion.div
              key="results-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10"
            >
              <div className="lg:col-span-8">
                <ReportView 
                  report={researchData.report} 
                  feedback={researchData.feedback} 
                />
              </div>
              <div className="lg:col-span-4 lg:block hidden">
                <SourcesPanel sources={researchData.sources} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm glass-card flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-4 text-xs font-bold uppercase hover:underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
