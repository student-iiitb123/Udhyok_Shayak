'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileText, Search, Download } from 'lucide-react';

export const AuditLogsTable: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.applicationId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Immutable Security Logs</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Government System Audit Trail</h2>
          <p className="text-xs text-slate-500 font-medium">Tamper-evident log of all user logins, document scrutinies, and officer approval decisions</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit trail by user, action, or app ID..."
            className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action Recorded</th>
              <th className="py-3 px-4">Module</th>
              <th className="py-3 px-4">Application</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900">{log.user}</td>
                <td className="py-3 px-4 text-slate-600">{log.role}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">
                  {log.action}
                  <p className="text-[10px] text-slate-400 font-normal">{log.details}</p>
                </td>
                <td className="py-3 px-4 text-slate-600">{log.module}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-amber-900 font-bold">{log.applicationId}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
