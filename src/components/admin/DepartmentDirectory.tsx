'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Landmark, Users, Clock, FileText } from 'lucide-react';

export const DepartmentDirectory: React.FC = () => {
  const { departments } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Inter-Departmental Network</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Maharashtra Nodal Department Directory</h2>
        <p className="text-xs text-slate-500 font-medium">Performance oversight across all line departments integrated into Maitri Single Window Clearance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-[11px] text-slate-500">Head: <strong className="text-slate-800">{dept.head}</strong></p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="bg-slate-50 p-2 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Officers</span>
                <span className="font-bold text-slate-900">{dept.officersCount} Officers</span>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Filings</span>
                <span className="font-bold text-slate-900">{dept.totalApplications}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending</span>
                <span className="font-bold text-amber-700">{dept.pendingApplications}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Avg SLA Speed</span>
                <span className="font-bold text-emerald-700 font-mono">{dept.avgSlaDays} Days</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
