'use client';

import React from 'react';
import { 
  Building2, ShieldCheck, Clock, Landmark, Gift, CheckCircle2
} from 'lucide-react';

export const GovernmentEcosystemHero: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 relative overflow-hidden space-y-6">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          {/* Emblem Circle Badge */}
          <div className="w-10 h-10 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-center shrink-0 shadow-2xs">
            <span className="text-amber-800 font-extrabold text-lg">म</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-900 tracking-wider">
              <span>महाराष्ट्र शासन</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium">Government of Maharashtra</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Maharashtra Single Window Gateway
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Gateway Active</span>
        </div>
      </div>

      {/* 4 Core Simple Pillars */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 mb-2">
            <Landmark className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">40+ Departments</div>
          <div className="text-[10px] text-slate-500">Single Digital Filing Point</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">14-Day SLA</div>
          <div className="text-[10px] text-slate-500">Time-Bound Statutory Clearance</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">DigiLocker Verified</div>
          <div className="text-[10px] text-slate-500">100% Paperless Approval</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 mb-2">
            <Gift className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">PSI 2026 Incentives</div>
          <div className="text-[10px] text-slate-500">Automated Subsidy Mapping</div>
        </div>
      </div>

      {/* Key Stats Bar */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-extrabold text-amber-700">45,000+</div>
          <div className="text-[10px] text-slate-500">Approvals Issued</div>
        </div>
        <div>
          <div className="text-sm font-extrabold text-emerald-700">₹1.2L Cr+</div>
          <div className="text-[10px] text-slate-500">Investments Mapped</div>
        </div>
        <div>
          <div className="text-sm font-extrabold text-blue-700">100%</div>
          <div className="text-[10px] text-slate-500">Statutory SLA Rate</div>
        </div>
      </div>

    </div>
  );
};
