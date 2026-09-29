'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConductInspectionWorkspace } from '@/components/inspector/ConductInspectionWorkspace';
import { ClipboardCheck, Calendar, Clock, CheckCircle2, AlertTriangle, Eye, MapPin } from 'lucide-react';
import { Inspection } from '@/types';

export const InspectorDashboard: React.FC = () => {
  const { inspections } = useApp();
  const [selectedInsp, setSelectedInsp] = useState<Inspection | null>(null);

  if (selectedInsp) {
    return (
      <ConductInspectionWorkspace
        inspection={selectedInsp}
        onBack={() => setSelectedInsp(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Field Audit Directorate</span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Inspector Portal — Amit Sharma
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Industrial Safety & Fire Directorate • Government of Maharashtra
        </p>
      </div>

      {/* INSPECTOR KPIs GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <KpiCard title="Assigned Visits" value="4" subtitle="Active Assignments" icon={<ClipboardCheck className="w-4 h-4" />} accentColor="purple" />
        <KpiCard title="Today's Schedule" value="1" subtitle="28 Sept 2026" icon={<Calendar className="w-4 h-4" />} accentColor="saffron" />
        <KpiCard title="Upcoming Visits" value="2" subtitle="This Week" icon={<Clock className="w-4 h-4" />} accentColor="navy" />
        <KpiCard title="Pending Reports" value="1" subtitle="Awaiting Signoff" icon={<AlertTriangle className="w-4 h-4" />} accentColor="saffron" />
        <KpiCard title="Completed Audits" value="8" subtitle="YTD Inspections" icon={<CheckCircle2 className="w-4 h-4" />} accentColor="green" />
        <KpiCard title="Overdue Audits" value="0" subtitle="100% On Schedule" icon={<CheckCircle2 className="w-4 h-4" />} accentColor="green" />
      </div>

      {/* Inspection List Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Assigned Inspection Tasks</h3>
          <span className="text-xs text-slate-500">Click any row to conduct site audit</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Inspection ID</th>
                <th className="py-3 px-4">Application</th>
                <th className="py-3 px-4">Business</th>
                <th className="py-3 px-4">Audit Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {inspections.map(insp => (
                <tr
                  key={insp.id}
                  onClick={() => setSelectedInsp(insp)}
                  className="hover:bg-purple-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-purple-900 font-mono">#{insp.id}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{insp.applicationId}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{insp.businessName}</td>
                  <td className="py-3 px-4 text-slate-700">{insp.approvalType}</td>
                  <td className="py-3 px-4 text-slate-600 truncate max-w-xs">{insp.location}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{insp.inspectionDate}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={insp.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInsp(insp);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] px-3 py-1 rounded transition-colors inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Conduct</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
