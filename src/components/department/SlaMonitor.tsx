'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Clock, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SlaMonitor: React.FC = () => {
  const { applications } = useApp();
  const breachedApps = applications.filter(a => a.daysRemaining < 0 || a.status === 'Delayed');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Statutory Timelines</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">State SLA Compliance & Escalation Monitor</h2>
        <p className="text-xs text-slate-500 font-medium">Real-time surveillance of processing speeds against Maharashtra Right to Services Act guidelines</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="On Track" value="1,920" subtitle="Within Statutory SLA" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="green" />
        <KpiCard title="Due Soon" value="267" subtitle="Critical SLA <= 3 Days" icon={<AlertTriangle className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="SLA Breached" value="127" subtitle="Escalated to HOD" icon={<ShieldAlert className="w-5 h-5" />} accentColor="red" />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Escalated & SLA Breached Applications</h3>
          <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded">
            Immediate Intervention Required
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Approval Type</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Days Overdue</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4 text-right">Escalate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {breachedApps.map(app => (
                <tr key={app.id} className="hover:bg-red-50/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-red-900 font-mono">#{app.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{app.approvalType}</td>
                  <td className="py-3 px-4 text-slate-600">{app.department}</td>
                  <td className="py-3 px-4 font-bold text-red-600">
                    {Math.abs(app.daysRemaining)} Days Overdue
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {app.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">Deputy Comm. Wagh</td>
                  <td className="py-3 px-4 text-right">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-3 py-1 rounded transition-colors">
                      Fast-Track Notice
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
