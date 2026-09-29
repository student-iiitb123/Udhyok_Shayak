'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Calendar, Clock, MapPin, UserCheck, ShieldCheck, ClipboardCheck } from 'lucide-react';

export const OwnerInspections: React.FC = () => {
  const { inspections } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Site Assessments</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Factory & Safety Inspections</h2>
        <p className="text-xs text-slate-500 font-medium">Scheduled field visits by Maharashtra state inspectors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inspections.map(insp => (
          <div key={insp.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono">#{insp.id}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{insp.approvalType}</h3>
                <p className="text-xs text-slate-600 font-medium">{insp.businessName}</p>
              </div>
              <StatusBadge status={insp.status} size="md" />
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Date: <strong className="text-slate-900">{insp.inspectionDate}</strong> at {insp.inspectionTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Assigned Inspector: <strong className="text-slate-900">{insp.inspectorName}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate">Location: {insp.location}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-bold text-slate-800">Checklist Summary ({insp.checklistItems.length} items):</h4>
              {insp.checklistItems.slice(0, 3).map(item => (
                <div key={item.id} className="flex justify-between items-center text-[11px] p-2 bg-slate-50/70 rounded">
                  <span className="text-slate-700">{item.label}</span>
                  <StatusBadge status={item.status} size="sm" />
                </div>
              ))}
            </div>

            {insp.overallResult && (
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Final Audit Result:</span>
                <StatusBadge status={insp.overallResult} size="md" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
