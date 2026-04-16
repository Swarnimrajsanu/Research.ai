"use client";

import Link from "next/link";
import { Search, History, CreditCard, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
          R
        </div>
        <span className="text-xl font-bold tracking-tight">Research.ai</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1.5">
          <Search size={16} />
          Home
        </Link>
        <Link href="/history" className="hover:text-foreground transition-colors flex items-center gap-1.5">
          <History size={16} />
          History
        </Link>
        <Link href="/pricing" className="hover:text-foreground transition-colors flex items-center gap-1.5">
          <CreditCard size={16} />
          Pricing
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-white/10 hover:border-white/20 transition-all cursor-pointer">
          <User size={16} className="text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
}
