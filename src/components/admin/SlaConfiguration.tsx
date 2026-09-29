'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Clock, Edit2, CheckCircle2 } from 'lucide-react';

export const SlaConfiguration: React.FC = () => {
  const { slaConfigs, updateSLAConfig } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDays, setEditDays] = useState(15);
  const [editWarning, setEditWarning] = useState(10);

  const handleSave = (id: string) => {
    updateSLAConfig(id, editDays, editWarning, editDays + 3);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Timeline Parameters</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Statutory SLA Duration Manager</h2>
        <p className="text-xs text-slate-500 font-medium">Set SLA duration, warning threshold, and automatic escalation trigger days under Maharashtra Right to Services Act</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Approval Service</th>
              <th className="py-3 px-4">Nodal Department</th>
              <th className="py-3 px-4">SLA Duration</th>
              <th className="py-3 px-4">Warning Trigger</th>
              <th className="py-3 px-4">Escalation Trigger</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {slaConfigs.map(cfg => (
              <tr key={cfg.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900">{cfg.approvalType}</td>
                <td className="py-3 px-4 text-slate-600">{cfg.department}</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  {editingId === cfg.id ? (
                    <input
                      type="number"
                      value={editDays}
                      onChange={(e) => setEditDays(Number(e.target.value))}
                      className="w-16 border rounded p-1 text-xs"
                    />
                  ) : (
                    `${cfg.slaDays} Days`
                  )}
                </td>
                <td className="py-3 px-4 font-mono text-amber-700">
                  {editingId === cfg.id ? (
                    <input
                      type="number"
                      value={editWarning}
                      onChange={(e) => setEditWarning(Number(e.target.value))}
                      className="w-16 border rounded p-1 text-xs"
                    />
                  ) : (
                    `Day ${cfg.warningDays}`
                  )}
                </td>
                <td className="py-3 px-4 font-mono text-red-600 font-bold">
                  Day {cfg.escalationDays}
                </td>
                <td className="py-3 px-4 text-right">
                  {editingId === cfg.id ? (
                    <button
                      onClick={() => handleSave(cfg.id)}
                      className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded text-[11px]"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(cfg.id);
                        setEditDays(cfg.slaDays);
                        setEditWarning(cfg.warningDays);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded text-[11px]"
                    >
                      Edit SLA
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
