'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Gift, Calendar, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const OwnerSchemes: React.FC = () => {
  const { schemes, addToast } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Government Subsidies & Grants</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Incentives & Scheme Discovery Portal</h2>
        <p className="text-xs text-slate-500 font-medium">Explore state subsidies, capital incentives, and industrial policy benefits for Maharashtra businesses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map(sch => (
          <div key={sch.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{sch.department}</span>
                <StatusBadge status={sch.status} size="md" />
              </div>
              
              <h3 className="text-sm font-bold text-slate-900 mt-2 leading-snug">{sch.name}</h3>
              
              <div className="mt-3 space-y-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <strong className="text-slate-900 block font-semibold">Incentive Benefits:</strong>
                  <p className="text-slate-700 mt-0.5">{sch.benefits}</p>
                </div>

                <div>
                  <strong className="text-slate-800 font-semibold">Eligibility Criteria:</strong>
                  <p className="text-slate-600 mt-0.5 leading-normal">{sch.eligibility}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Deadline: <strong className="text-slate-700 font-mono">{sch.deadline}</strong></span>
              <button
                onClick={() => addToast('success', 'Scheme Application Initiated', `Started claim for ${sch.name}`)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-1.5 rounded transition-colors flex items-center space-x-1"
              >
                <span>Claim Incentive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
