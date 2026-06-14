"use client";

import Link from "next/link";
import { Scissors } from "lucide-react";
import { useUser } from "@/firebase";

export default function Navbar() {
  const { user, loading } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B1120] sticky top-0 z-50 backdrop-blur-md">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/20">
          <Scissors className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Atomize PDF
        </h1>
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        {!loading && user && (
          <Link href="/dashboard" className="hover:text-white transition-colors font-medium text-primary">Dashboard</Link>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-9 w-20 animate-pulse bg-white/5 rounded-lg" />
        ) : !user ? (
          <>
            <Link
              href="/signin"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-all text-sm shadow-lg shadow-blue-500/20"
            >
              Start Free Trial 🚀
            </Link>
          </>
        ) : (
          <Link 
            href="/dashboard" 
            className="bg-primary/10 text-primary border border-primary/20 px-5 py-2 rounded-lg font-semibold hover:bg-primary/20 transition-all text-sm"
          >
            Open App
          </Link>
        )}
      </div>
    </nav>
  );
}
