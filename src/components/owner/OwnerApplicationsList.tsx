'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { OwnerApplicationDetails } from '@/components/owner/OwnerApplicationDetails';
import { NewApplicationModal } from '@/components/owner/NewApplicationModal';
import { 
  FileText, Search, Plus, Filter, ChevronRight, AlertTriangle, 
  Clock, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { Application } from '@/types';

export const OwnerApplicationsList: React.FC = () => {
  const { applications } = useApp();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.approvalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesDept = deptFilter === 'ALL' || app.department === deptFilter;
    const matchesPriority = priorityFilter === 'ALL' || app.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesDept && matchesPriority;
  });

  if (selectedApp) {
    return (
      <OwnerApplicationDetails
        app={selectedApp}
        onBack={() => setSelectedApp(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Investor Applications Portal</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">My Applications & Statutory Clearances</h2>
          <p className="text-xs text-slate-500 font-medium">Track real-time departmental progress, upload annexures, and respond to queries</p>
        </div>

        <button
          onClick={() => setIsNewAppModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Initiate New Application</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Application #, Approval Service Name, Department..."
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Clearances Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Query Raised">Query Raised</option>
              <option value="Inspection Scheduled">Inspection Scheduled</option>
              <option value="Approved">Approved</option>
              <option value="Delayed">Delayed</option>
            </select>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Nodal Departments</option>
              <option value="Industries Department">Industries Department</option>
              <option value="Environment Department">Environment Department</option>
              <option value="Fire Department">Fire Department</option>
              <option value="Labour Department">Labour Department</option>
              <option value="Pollution Control">Pollution Control (MPCB)</option>
              <option value="Revenue Department">Revenue Department</option>
              <option value="Municipal Authority">Municipal Authority</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="Normal">Normal</option>
              <option value="High">High Priority</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Approval Type</th>
                <th className="py-3 px-4">Nodal Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">SLA Clock</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    No matching clearance applications found.
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="hover:bg-amber-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 font-bold text-amber-900 font-mono group-hover:text-amber-700">
                      #{app.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {app.approvalType}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {app.department}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      <span className={app.daysRemaining < 0 ? 'text-red-600 font-bold' : app.daysRemaining <= 3 ? 'text-amber-700' : 'text-slate-700'}>
                        {app.daysRemaining < 0 ? `Breached (${Math.abs(app.daysRemaining)}d)` : `${app.daysRemaining} days remaining`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.priority === 'Urgent' ? 'bg-red-100 text-red-800' : app.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {app.lastUpdated}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(app);
                        }}
                        className="inline-flex items-center space-x-1 bg-white hover:bg-slate-100 text-amber-800 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                      >
                        <span>Workspace</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] flex justify-between items-center">
          <span>Showing {filteredApps.length} of {applications.length} applications</span>
          <span>Click any row to open the full application workspace</span>
        </div>
      </div>

      <NewApplicationModal
        isOpen={isNewAppModalOpen}
        onClose={() => setIsNewAppModalOpen(false)}
      />

    </div>
  );
};
