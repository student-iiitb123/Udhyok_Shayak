'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, Search, Plus, FileText, CheckCircle2 } from 'lucide-react';

export const RegulatoryKnowledgeBase: React.FC = () => {
  const { regulations } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRegs = regulations.filter(r => 
    r.actName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Statutory Rules Repository</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Regulatory Knowledge Base</h2>
          <p className="text-xs text-slate-500 font-medium">Maharashtra industrial acts, Gazetted notifications, and sector-wise compliance rules</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search acts, sections, rules..."
            className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredRegs.map(reg => (
          <div key={reg.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{reg.category}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{reg.actName}</h3>
                <span className="text-xs font-semibold text-amber-700">{reg.section}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Updated: {reg.lastUpdated}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pt-1">{reg.description}</p>
            
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Applicability: <strong className="text-slate-800">{reg.applicability}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
