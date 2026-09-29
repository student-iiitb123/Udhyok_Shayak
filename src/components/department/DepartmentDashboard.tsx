'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { ApplicationQueue } from '@/components/department/ApplicationQueue';
import { FileText, Clock, AlertTriangle, CheckCircle2, ShieldAlert, BarChart3 } from 'lucide-react';

export const DepartmentDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Officer Greeting Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">State Executive Desk</span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Department Officer Dashboard — Sanjay Deshmukh
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Industries & Environment Clearance Directorate • Government of Maharashtra
        </p>
      </div>

      {/* DEPARTMENT KPIs GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <KpiCard title="Total Applications" value="1,248" subtitle="YTD Submissions" icon={<FileText className="w-4 h-4" />} accentColor="navy" />
        <KpiCard title="Pending Queue" value="267" subtitle="Awaiting Action" icon={<Clock className="w-4 h-4" />} accentColor="saffron" />
        <KpiCard title="Under Scrutiny" value="184" subtitle="Document Phase" icon={<FileText className="w-4 h-4" />} accentColor="saffron" />
        <KpiCard title="Inspection Pending" value="52" subtitle="Site Visit Scheduled" icon={<AlertTriangle className="w-4 h-4" />} accentColor="purple" />
        <KpiCard title="SLA Breached" value="31" subtitle="Requires Action" icon={<ShieldAlert className="w-4 h-4" />} accentColor="red" />
        <KpiCard title="Approved Licenses" value="721" subtitle="Issued Certificates" icon={<CheckCircle2 className="w-4 h-4" />} accentColor="green" />
      </div>

      {/* Queue View */}
      <ApplicationQueue />

    </div>
  );
};
