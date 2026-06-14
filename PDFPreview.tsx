"use client";

import { motion } from "framer-motion";

export default function PDFPreview() {
  return (
    <div className="relative w-[280px] h-[220px] mx-auto group">
      {/* الورقة الخلفية (Bottom Paper) */}
      <div className="absolute top-6 left-8 w-full h-full bg-white/80 rounded-xl shadow-md rotate-[-8deg] transition-transform group-hover:rotate-[-10deg]" />

      {/* الورقة الوسطى (Middle Paper) */}
      <div className="absolute top-3 left-4 w-full h-full bg-white/90 rounded-xl shadow-lg rotate-[-4deg] transition-transform group-hover:rotate-[-6deg]" />

      {/* الورقة الأمامية (Front Paper) */}
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 w-full h-full bg-white rounded-xl shadow-2xl p-5 flex flex-col justify-between cursor-pointer border border-white/20"
      >
        <button className="absolute top-3 right-3 bg-primary text-white text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity">
          Upload
        </button>
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tighter">
            PDF
          </div>
          <span className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">document.pdf</span>
        </div>

        {/* Mock content lines */}
        <div className="space-y-3 mt-6">
          <div className="h-2 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
          <div className="h-2 bg-slate-100 rounded-full w-full"></div>
          <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
          <div className="h-2 bg-slate-100 rounded-full w-2/3"></div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-50">
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Page 1 of 12</div>
        </div>

        {/* AI Bubble */}
        <div className="absolute -bottom-5 -right-5 bg-[#0B1120] text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 ring-4 ring-[#0B1120] border border-white/10">
          <span className="shrink-0 text-primary">⚡</span>
          AI Summary
        </div>
      </motion.div>
    </div>
  );
}