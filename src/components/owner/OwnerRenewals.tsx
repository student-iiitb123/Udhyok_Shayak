'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RefreshCw, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export const OwnerRenewals: React.FC = () => {
  const { addToast } = useApp();

  const renewals = [
    {
      license: 'Consent to Operate (CTO - Air & Water)',
      dept: 'Pollution Control (MPCB)',
      expiry: '2026-10-18',
      daysLeft: 24,
      status: 'Renewal Due Soon',
      urgency: 'high',
    },
    {
      license: 'Contract Labour Registration License',
      dept: 'Labour Department',
      expiry: '2026-11-05',
      daysLeft: 42,
      status: 'Upcoming Renewal',
      urgency: 'medium',
    },
    {
      license: 'Factory Operating License Renewal',
      dept: 'Industries Department',
      expiry: '2027-12-31',
      daysLeft: 463,
      status: 'Compliant & Active',
      urgency: 'low',
    },
    {
      license: 'Fire Safety NOC Form B Audit',
      dept: 'Fire Department',
      expiry: '2026-12-12',
      daysLeft: 79,
      status: 'Upcoming Renewal',
      urgency: 'medium',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Automated Renewal Desk</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Statutory License Renewals</h2>
        <p className="text-xs text-slate-500 font-medium">Prevent industrial disruption with automated state renewal tracking</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">License / Permit</th>
              <th className="py-3 px-4">Issuing Department</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-4">Days Remaining</th>
              <th className="py-3 px-4">Renewal Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {renewals.map((item, idx) => (
              <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900">{item.license}</td>
                <td className="py-3 px-4 text-slate-600">{item.dept}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{item.expiry}</td>
                <td className="py-3 px-4">
                  <span className={`font-bold ${item.daysLeft <= 30 ? 'text-amber-700' : 'text-slate-700'}`}>
                    {item.daysLeft} days
                  </span>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => addToast('success', 'Renewal Initiated', `Auto-filled renewal form for ${item.license}`)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-1 rounded transition-colors inline-flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Renew Now</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
