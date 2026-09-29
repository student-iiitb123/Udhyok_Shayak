'use client';

import React from 'react';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldCheck, Calendar, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const OwnerCompliance: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Statutory Obligations</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Industrial Compliance Hub</h2>
        <p className="text-xs text-slate-500 font-medium">Real-time status of licenses, returns, and environmental filings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Licenses" value="5" subtitle="100% Valid" icon={<ShieldCheck className="w-5 h-5" />} accentColor="green" />
        <KpiCard title="Upcoming Renewals" value="2" subtitle="Within 60 days" icon={<RefreshCw className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="Pending Filings" value="1" subtitle="Annual Returns" icon={<Calendar className="w-5 h-5" />} accentColor="navy" />
        <KpiCard title="Overdue Items" value="0" subtitle="Fully Compliant" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="green" />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Active License & Compliance Status</h3>
        
        <div className="divide-y divide-slate-100 text-xs">
          
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Factory Operating License</h4>
                <p className="text-[11px] text-slate-500">Industries Department • Valid until 31 Dec 2027</p>
              </div>
            </div>
            <StatusBadge status="Compliant" size="md" />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Consent to Operate (CTO - MPCB Air & Water)</h4>
                <p className="text-[11px] text-slate-500">Pollution Control Board • Renewal due in 24 days</p>
              </div>
            </div>
            <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded text-xs">
              Renewal Due Soon
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Fire Safety NOC (Form B Bi-annual Audit)</h4>
                <p className="text-[11px] text-slate-500">Fire Department • Valid until 12 Dec 2026</p>
              </div>
            </div>
            <StatusBadge status="Compliant" size="md" />
          </div>

        </div>
      </div>
    </div>
  );
};
