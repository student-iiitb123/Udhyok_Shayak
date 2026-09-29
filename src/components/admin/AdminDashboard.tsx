'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { BottleneckAnalysis } from '@/components/admin/BottleneckAnalysis';
import { AuditLogsTable } from '@/components/admin/AuditLogsTable';
import { 
  FileText, CheckCircle2, Clock, ShieldAlert, Landmark, Building2, 
  MessageSquareWarning, Layers, Users, BarChart3 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Admin Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Apex State Executive Portal</span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Government Administrator Console — Priya Kulkarni
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Industries & Ease of Doing Business Directorate • Government of Maharashtra
        </p>
      </div>

      {/* ADMIN KPIs GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Applications" value="2,450" subtitle="Statewide Filings" icon={<FileText className="w-5 h-5" />} accentColor="navy" />
        <KpiCard title="Total Approvals" value="1,820" subtitle="Certificates Issued" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="green" />
        <KpiCard title="Pending Applications" value="630" subtitle="Active Processing" icon={<Clock className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="SLA Breached" value="31" subtitle="High Escalation" icon={<ShieldAlert className="w-5 h-5" />} accentColor="red" />
        <KpiCard title="Active Departments" value="7" subtitle="Integrated Nodal Offices" icon={<Landmark className="w-5 h-5" />} accentColor="navy" />
        <KpiCard title="Registered Businesses" value="1,150" subtitle="State Investors" icon={<Building2 className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="Active Licenses" value="3,400" subtitle="Digital Vault Records" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="green" />
        <KpiCard title="Open Grievances" value="12" subtitle="Redressal Tickets" icon={<MessageSquareWarning className="w-5 h-5" />} accentColor="red" />
      </div>

      {/* Bottleneck Analysis Section */}
      <BottleneckAnalysis />

      {/* Audit Logs Summary */}
      <AuditLogsTable />

    </div>
  );
};
