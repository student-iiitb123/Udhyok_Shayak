'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { KpiCard } from '@/components/ui/KpiCard';
import { AddObservationModal } from '@/components/inspector/AddObservationModal';
import { 
  AlertOctagon, Plus, Search, Filter, Calendar, MapPin, 
  Building2, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { InspectionObservation } from '@/types';

export const FieldObservationsList: React.FC = () => {
  const { inspections } = useApp();
  const [isObsModalOpen, setIsObsModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Collect all observations from all inspections
  const allObservations: (InspectionObservation & { companyName: string; location: string; inspectionId: string })[] = [];
  
  inspections.forEach(insp => {
    insp.observations.forEach(obs => {
      allObservations.push({
        ...obs,
        companyName: insp.businessName,
        location: insp.location,
        inspectionId: insp.id,
      });
    });
  });

  const filteredObservations = allObservations.filter(obs => {
    const matchesSearch = 
      obs.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.companyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || obs.severity === severityFilter;
    const matchesCategory = categoryFilter === 'ALL' || obs.category === categoryFilter;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const highCriticalCount = allObservations.filter(o => o.severity === 'High' || o.severity === 'Critical').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Field Defect Surveillance</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">Field Observations & Defect Log</h2>
          <p className="text-xs text-slate-500 font-medium">Record physical non-conformities, safety hazards, and mandated corrective action deadlines</p>
        </div>

        <button
          onClick={() => setIsObsModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Observation</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Observations" value={allObservations.length} subtitle="Logged Non-Conformities" icon={<AlertOctagon className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="High / Critical Defects" value={highCriticalCount} subtitle="Requires Stop Work" icon={<ShieldAlert className="w-5 h-5" />} accentColor="red" />
        <KpiCard title="Pending Rectification" value={allObservations.length} subtitle="Active Deadlines" icon={<Calendar className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="Rectified Defect Logs" value="0" subtitle="Compliance Verified" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="green" />
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
              placeholder="Search by defect description, category, or company name..."
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Severities</option>
              <option value="Low">Low Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="High">High Severity</option>
              <option value="Critical">Critical Severity</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Electrical Safety">Electrical Safety</option>
              <option value="Effluent Line">Effluent Line</option>
              <option value="Fire Hazards & Egress">Fire Hazards & Egress</option>
              <option value="Machinery Safeguards">Machinery Safeguards</option>
            </select>
          </div>
        </div>
      </div>

      {/* Observations Grid */}
      <div className="space-y-4">
        {filteredObservations.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center text-slate-400 text-xs">
            No matching field observations found.
          </div>
        ) : (
          filteredObservations.map(obs => (
            <div key={obs.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-amber-50 text-amber-700 rounded border border-amber-200">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-slate-900">{obs.category}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        obs.severity === 'High' || obs.severity === 'Critical' 
                          ? 'bg-red-100 text-red-800 border border-red-300' 
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {obs.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Company: <strong className="text-slate-800">{obs.companyName}</strong> ({obs.location}) • Task #{obs.inspectionId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-800">
                <strong className="block text-slate-900 mb-0.5">Field Physical Defect Observation:</strong>
                <p className="leading-relaxed">{obs.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-2">
                <span className="text-slate-700">
                  Mandatory Action: <strong className="text-amber-900">{obs.correctiveAction}</strong>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Rectification Deadline: <strong className="text-slate-900 font-bold">{obs.deadline}</strong>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <AddObservationModal
        inspectionId="INSP-2026-092"
        isOpen={isObsModalOpen}
        onClose={() => setIsObsModalOpen(false)}
      />

    </div>
  );
};
