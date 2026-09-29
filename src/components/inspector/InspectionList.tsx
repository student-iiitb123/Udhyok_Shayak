'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConductInspectionWorkspace } from '@/components/inspector/ConductInspectionWorkspace';
import { 
  ClipboardCheck, Search, Filter, Eye, Calendar, MapPin, 
  UserCheck, Plus, CheckCircle2, Clock
} from 'lucide-react';
import { Inspection } from '@/types';

export const InspectionList: React.FC = () => {
  const { inspections } = useApp();
  const [selectedInsp, setSelectedInsp] = useState<Inspection | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');

  const filteredInspections = inspections.filter(insp => {
    const matchesSearch = 
      insp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insp.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insp.approvalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insp.inspectorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || insp.status === statusFilter;
    const matchesLocation = locationFilter === 'ALL' || insp.location.includes(locationFilter);

    return matchesSearch && matchesStatus && matchesLocation;
  });

  if (selectedInsp) {
    return (
      <ConductInspectionWorkspace
        inspection={selectedInsp}
        onBack={() => setSelectedInsp(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Field Audit Directorate</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">My Assigned Inspections & Audits</h2>
          <p className="text-xs text-slate-500 font-medium">Manage, conduct, and sign off site inspection tasks assigned across Maharashtra MIDC zones</p>
        </div>

        <span className="bg-purple-100 text-purple-900 font-bold px-3 py-1.5 rounded text-xs border border-purple-200 shrink-0">
          {inspections.length} Assigned Inspections
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Inspection ID, Business Name, Audit Type, Inspector..."
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Inspection Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Report Pending">Report Pending</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Districts / MIDC</option>
              <option value="Pune">Pune (Chakan MIDC)</option>
              <option value="Navi Mumbai">Navi Mumbai (Taloja)</option>
              <option value="Thane">Thane (Bhiwandi)</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Inspections Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Inspection ID</th>
                <th className="py-3 px-4">Application Reference</th>
                <th className="py-3 px-4">Enterprise Business</th>
                <th className="py-3 px-4">Audit Service Type</th>
                <th className="py-3 px-4">Site Location</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredInspections.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-400">
                    No assigned inspection tasks found.
                  </td>
                </tr>
              ) : (
                filteredInspections.map(insp => (
                  <tr
                    key={insp.id}
                    onClick={() => setSelectedInsp(insp)}
                    className="hover:bg-purple-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-bold text-purple-900 font-mono group-hover:text-purple-700">
                      #{insp.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {insp.applicationId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {insp.businessName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {insp.approvalType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 truncate max-w-xs">
                      {insp.location}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{insp.inspectionDate}</span>
                      <span className="text-[10px] text-slate-500">{insp.inspectionTime}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={insp.status} size="md" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInsp(insp);
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded transition-all inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Conduct Audit</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] flex justify-between items-center">
          <span>Showing {filteredInspections.length} of {inspections.length} inspection tasks</span>
          <span>Click any row to open the full site audit workspace</span>
        </div>
      </div>

    </div>
  );
};
