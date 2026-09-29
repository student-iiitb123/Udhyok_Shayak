'use client';

import React from 'react';
import { KpiCard } from '@/components/ui/KpiCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Clock, AlertTriangle, TrendingDown, Layers } from 'lucide-react';

export const BottleneckAnalysis: React.FC = () => {
  const bottleneckCategories = [
    { name: 'Document Scrutiny Delay', value: 35, color: '#dc2626' },
    { name: 'Site Inspection Scheduling', value: 28, color: '#d97706' },
    { name: 'Inter-department Coordination', value: 20, color: '#1e293b' },
    { name: 'Applicant Response Lag', value: 12, color: '#9333ea' },
    { name: 'Payment Gateway Reconciliation', value: 5, color: '#64748b' },
  ];

  const cycleTimeByDept = [
    { department: 'Industries', avgDays: 11.2, target: 15 },
    { department: 'Environment', avgDays: 22.4, target: 30 },
    { department: 'Fire Safety', avgDays: 8.5, target: 10 },
    { department: 'Labour', avgDays: 5.8, target: 7 },
    { department: 'MPCB', avgDays: 16.9, target: 20 },
    { department: 'Revenue (NA)', avgDays: 31.0, target: 45 },
    { department: 'Municipal', avgDays: 14.2, target: 14 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Process Optimization</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Full Cycle Performance & Bottleneck Diagnosis</h2>
        <p className="text-xs text-slate-500 font-medium">Identify systemic delays, friction points, and departmental clearance lag</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Avg Approval Cycle" value="12.4 Days" subtitle="Target <= 15 Days" icon={<Clock className="w-5 h-5" />} accentColor="green" />
        <KpiCard title="Average Clearance Delay" value="3.2 Days" subtitle="Over Standard SLA" icon={<TrendingDown className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="Total Approvals Issued" value="1,820" subtitle="FY 2026-27" icon={<Clock className="w-5 h-5" />} accentColor="navy" />
        <KpiCard title="Pending Applications" value="630" subtitle="Active Workflows" icon={<AlertTriangle className="w-5 h-5" />} accentColor="saffron" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown Pie */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Primary Sources of Approval Delays (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bottleneckCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                >
                  {bottleneckCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Processing Time vs SLA Target Bar */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Actual Avg Cycle Days vs Statutory SLA Limit</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cycleTimeByDept}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="department" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgDays" fill="#d97706" name="Actual Avg Days" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#16a34a" name="SLA Limit" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
