'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DepartmentWorkspace } from '@/components/department/DepartmentWorkspace';
import { Search, Filter, ChevronRight, Eye, AlertTriangle } from 'lucide-react';
import { Application } from '@/types';

export const ApplicationQueue: React.FC = () => {
  const { applications } = useApp();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.approvalType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || app.priority === priorityFilter;
    const matchesRisk = riskFilter === 'ALL' || app.riskLevel === riskFilter;
    const matchesLocation = locationFilter === 'ALL' || app.location === locationFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesRisk && matchesLocation;
  });

  if (selectedApp) {
    return (
      <DepartmentWorkspace
        app={selectedApp}
        onBack={() => setSelectedApp(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Department Officer Console</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Statutory Application Queue</h2>
          <p className="text-xs text-slate-500 font-medium">Scrutinize incoming business clearance filings and issue decisions</p>
        </div>
        <span className="bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded text-xs">
          {applications.length} Total Applications
        </span>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by App ID, Business Name, Approval Service..."
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Query Raised">Query Raised</option>
              <option value="Inspection Scheduled">Inspection Scheduled</option>
              <option value="Approved">Approved</option>
              <option value="Delayed">Delayed</option>
            </select>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            {/* Risk */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Application</th>
                <th className="py-3 px-4">Business Name</th>
                <th className="py-3 px-4">Approval Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">SLA Clock</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Risk</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredApps.map(app => (
                <tr
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-bold text-blue-900 font-mono group-hover:text-blue-700">
                    #{app.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {app.businessName}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {app.approvalType}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    <span className={app.daysRemaining < 0 ? 'text-red-600 font-bold' : app.daysRemaining <= 3 ? 'text-amber-700' : 'text-slate-700'}>
                      {app.daysRemaining < 0 ? `Breached (${Math.abs(app.daysRemaining)}d)` : `${app.daysRemaining} days left`}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      app.priority === 'Urgent' ? 'bg-red-100 text-red-800' : app.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {app.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${app.riskLevel === 'High' ? 'text-red-600' : app.riskLevel === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {app.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {app.location}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApp(app);
                      }}
                      className="inline-flex items-center space-x-1 bg-white hover:bg-slate-100 text-blue-800 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                    >
                      <span>Scrutinize</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
