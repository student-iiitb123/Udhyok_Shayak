'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { KpiCard } from '@/components/ui/KpiCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { OwnerApplicationDetails } from '@/components/owner/OwnerApplicationDetails';
import { NewApplicationModal } from '@/components/owner/NewApplicationModal';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, Plus, Search, 
  Filter, Eye, ArrowUpDown, ChevronRight, Building2
} from 'lucide-react';
import { Application } from '@/types';

export const OwnerDashboard: React.FC = () => {
  const { applications, currentUser } = useApp();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // KPI Calculations
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'Under Review' || a.status === 'Submitted' || a.status === 'Inspection Scheduled').length;
  const approvedApps = applications.filter(a => a.status === 'Approved').length;
  const actionRequiredApps = applications.filter(a => a.status === 'Query Raised' || a.status === 'Delayed').length;

  const queryRaisedApp = applications.find(a => a.status === 'Query Raised');

  // Filtered List
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.approvalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
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
      
      {/* Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Investor Portal</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Good Morning, {currentUser.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Here&apos;s an overview of your business clearance applications and compliance status.
          </p>
        </div>

        <button
          onClick={() => setIsNewAppModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Applications"
          value={totalApps}
          subtitle="Across all departments"
          icon={<FileText className="w-5 h-5" />}
          accentColor="saffron"
        />
        <KpiCard
          title="Pending Approvals"
          value={pendingApps}
          subtitle="In active scrutiny or inspection"
          icon={<Clock className="w-5 h-5" />}
          accentColor="navy"
        />
        <KpiCard
          title="Approved Licenses"
          value={approvedApps}
          subtitle="Valid digital certificates"
          icon={<CheckCircle2 className="w-5 h-5" />}
          accentColor="green"
        />
        <KpiCard
          title="Action Required"
          value={actionRequiredApps}
          subtitle="Queries or SLA delays"
          icon={<AlertTriangle className="w-5 h-5" />}
          accentColor="red"
        />
      </div>

      {/* ACTION REQUIRED BANNER HIGHLIGHT */}
      {queryRaisedApp && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wide">
                ACTION REQUIRED — #{queryRaisedApp.id}
              </span>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">
                Department has requested clarification for <strong className="text-amber-900">{queryRaisedApp.approvalType}</strong>
              </p>
              <p className="text-xs text-slate-600 mt-0.5 truncate max-w-2xl">{queryRaisedApp.queryText}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedApp(queryRaisedApp)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-1.5 rounded transition-all shrink-0"
          >
            Respond Now →
          </button>
        </div>
      )}

      {/* OWNER APPLICATIONS TABLE CONTAINER */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Table Controls Header */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">My Applications & Approvals</h3>
            <p className="text-xs text-slate-500">Track real-time statutory progress and SLA compliance</p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by ID, service..."
                className="w-full bg-white border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Query Raised">Query Raised</option>
              <option value="Inspection Scheduled">Inspection Scheduled</option>
              <option value="Approved">Approved</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Approval Type</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">SLA Clock</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    <p className="text-xs">No matching applications found.</p>
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
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${app.daysRemaining < 0 ? 'text-red-600 font-bold' : app.daysRemaining <= 3 ? 'text-amber-700' : 'text-slate-700'}`}>
                        {app.daysRemaining < 0 ? `Breached (${Math.abs(app.daysRemaining)}d overdue)` : `${app.daysRemaining} days left`}
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
                        className="inline-flex items-center space-x-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                      >
                        <span>View</span>
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
          <span>Click any row to open application details workspace</span>
        </div>

      </div>

      {/* New Application Modal */}
      <NewApplicationModal
        isOpen={isNewAppModalOpen}
        onClose={() => setIsNewAppModalOpen(false)}
      />

    </div>
  );
};
