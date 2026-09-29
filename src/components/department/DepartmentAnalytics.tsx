'use client';

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';

export const DepartmentAnalytics: React.FC = () => {
  const statusData = [
    { name: 'Approved', value: 721, color: '#16a34a' },
    { name: 'Under Scrutiny', value: 184, color: '#d97706' },
    { name: 'Query Raised', value: 83, color: '#b45309' },
    { name: 'Inspection Pending', value: 52, color: '#9333ea' },
    { name: 'SLA Breached', value: 31, color: '#dc2626' },
  ];

  const deptData = [
    { dept: 'Industries', applications: 412, approved: 328 },
    { dept: 'Environment', applications: 295, approved: 233 },
    { dept: 'Fire', applications: 310, approved: 265 },
    { dept: 'Labour', applications: 180, approved: 155 },
    { dept: 'MPCB', applications: 380, approved: 309 },
    { dept: 'Revenue', applications: 210, approved: 120 },
    { dept: 'Municipal', applications: 520, approved: 400 },
  ];

  const trendData = [
    { month: 'Apr', submissions: 320, approvals: 290, avgDays: 14 },
    { month: 'May', submissions: 380, approvals: 340, avgDays: 13 },
    { month: 'Jun', submissions: 410, approvals: 385, avgDays: 12 },
    { month: 'Jul', submissions: 450, approvals: 415, avgDays: 11 },
    { month: 'Aug', submissions: 490, approvals: 460, avgDays: 10 },
    { month: 'Sep', submissions: 520, approvals: 490, avgDays: 9 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Business Intelligence</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Department Performance & Processing Analytics</h2>
        <p className="text-xs text-slate-500 font-medium">Data metrics on clearance volume, approval speeds, and statutory SLA compliance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Applications by Status Pie */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Applications Volume by Clearance Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications by Department Bar */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Applications vs Approvals by Nodal Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#1e293b" name="Received" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="#16a34a" name="Approved" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend Line */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Monthly Submissions, Approvals & Average SLA Processing Time (Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="submissions" stroke="#d97706" strokeWidth={2} name="Submissions" />
                <Line yAxisId="left" type="monotone" dataKey="approvals" stroke="#16a34a" strokeWidth={2} name="Approvals" />
                <Line yAxisId="right" type="monotone" dataKey="avgDays" stroke="#0f172a" strokeWidth={2} strokeDasharray="5 5" name="Avg SLA Days" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
