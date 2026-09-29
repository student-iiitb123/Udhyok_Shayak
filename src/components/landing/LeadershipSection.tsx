'use client';

import React from 'react';
import { Landmark, Quote, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-12 sm:py-16 border-y border-slate-800 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LEADERSHIP VISION & GOVERNANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Pioneering Industrial Transformation & Ease of Doing Business
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Under the visionary leadership of our national & state dignitaries, Maharashtra drives India's economic growth through digital governance.
          </p>
        </div>

        {/* Dignitaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Prime Minister Card */}
          <div className="bg-slate-800/90 border-2 border-amber-500/40 rounded-2xl p-6 relative flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl hover:border-amber-400 transition-all group">
            
            {/* Image / Portrait Frame */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg bg-slate-950 flex items-center justify-center relative group-hover:scale-105 transition-transform">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Official_Photograph_of_Prime_Minister_Narendra_Modi_2024.jpg" 
                  alt="Shri Narendra Modi - Hon'ble Prime Minister of India"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback visual if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-2 pointer-events-none">
                  <span className="text-[10px] font-extrabold text-amber-300 tracking-wider">PM INDIA</span>
                </div>
              </div>
              {/* National Emblem Badge */}
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full border-2 border-slate-900 shadow-md">
                <Award className="w-4 h-4" />
              </div>
            </div>

            {/* Quote & Details */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">GOVERNMENT OF INDIA</span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  Shri Narendra Modi
                </h3>
                <p className="text-xs font-semibold text-slate-300">Hon'ble Prime Minister of India</p>
              </div>

              <div className="relative pt-2">
                <Quote className="w-5 h-5 text-amber-500/40 absolute -top-1 -left-2 rotate-180" />
                <p className="text-xs text-slate-300 italic leading-relaxed pl-3 border-l-2 border-amber-500/40">
                  "Reform, Perform, and Transform. Our mission is to make business setup seamless, transparent, and digitally empowered for global & domestic investors."
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] font-bold">
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">Viksit Bharat 2047</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Make in India</span>
              </div>
            </div>

          </div>

          {/* Maharashtra Chief Minister Card */}
          <div className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-2xl p-6 relative flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl hover:border-emerald-400 transition-all group">
            
            {/* Image / Portrait Frame */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-lg bg-slate-950 flex items-center justify-center relative group-hover:scale-105 transition-transform">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eknath_Shinde_official_portrait.jpg/640px-Eknath_Shinde_official_portrait.jpg" 
                  alt="Hon'ble Chief Minister of Maharashtra"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback visual if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-2 pointer-events-none">
                  <span className="text-[10px] font-extrabold text-emerald-300 tracking-wider">CM MAHARASHTRA</span>
                </div>
              </div>
              {/* State Seal Badge */}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full border-2 border-slate-900 shadow-md">
                <Landmark className="w-4 h-4" />
              </div>
            </div>

            {/* Quote & Details */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">GOVERNMENT OF MAHARASHTRA</span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  Shri Eknath Shinde
                </h3>
                <p className="text-xs font-semibold text-slate-300">Hon'ble Chief Minister of Maharashtra</p>
              </div>

              <div className="relative pt-2">
                <Quote className="w-5 h-5 text-emerald-500/40 absolute -top-1 -left-2 rotate-180" />
                <p className="text-xs text-slate-300 italic leading-relaxed pl-3 border-l-2 border-emerald-500/40">
                  "Maharashtra is the industrial engine of India. Through Maitri Single Window Clearance, we guarantee 100% digital approvals and time-bound statutory clearances."
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] font-bold">
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Maitri Gateway</span>
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">1 Trillion Economy Target</span>
              </div>
            </div>

          </div>

        </div>

        {/* State Guarantee Strip */}
        <div className="mt-10 bg-slate-950/80 border border-slate-800 rounded-xl p-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">Maharashtra Right to Public Services Act (RTS 2015)</div>
              <div className="text-[11px] text-slate-400">Statutory time-bound guarantee for all 40+ department clearance applications.</div>
            </div>
          </div>
          <div className="bg-amber-600 text-white font-extrabold text-xs px-4 py-2 rounded-lg shrink-0 shadow-md">
            Guaranteed SLA Protection
          </div>
        </div>

      </div>
    </section>
  );
};
