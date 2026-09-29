'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AddObservationModal } from '@/components/inspector/AddObservationModal';
import { 
  ClipboardCheck, CheckCircle2, AlertTriangle, AlertOctagon, 
  MapPin, Calendar, User, FileText, Send, ArrowLeft
} from 'lucide-react';
import { Inspection } from '@/types';

interface ConductInspectionWorkspaceProps {
  inspection?: Inspection;
  onBack?: () => void;
}

export const ConductInspectionWorkspace: React.FC<ConductInspectionWorkspaceProps> = ({ inspection, onBack }) => {
  const { inspections, updateChecklistItem, submitInspectionReport } = useApp();
  
  const currentInsp = inspection || inspections[0];
  const [isObsModalOpen, setIsObsModalOpen] = useState(false);
  const [overallResult, setOverallResult] = useState<'Compliant' | 'Conditionally Compliant' | 'Non-Compliant' | 'Requires Re-inspection'>('Conditionally Compliant');
  const [remarks, setRemarks] = useState('Factory safety standards generally compliant. Issued conditional approval pending earth pit resistance tag upload within 7 days.');

  if (!currentInsp) return <div>No inspection loaded</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInspectionReport(currentInsp.id, overallResult, remarks);
    if (onBack) onBack();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          {onBack && (
            <button onClick={onBack} className="p-2 border border-slate-200 rounded hover:bg-slate-100 mt-0.5">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </button>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded font-mono">#{currentInsp.id}</span>
              <StatusBadge status={currentInsp.status} size="md" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{currentInsp.approvalType}</h2>
            <p className="text-xs text-slate-500 font-medium">
              Target Site: <strong className="text-slate-800">{currentInsp.businessName}</strong> ({currentInsp.location})
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-3 rounded text-xs space-y-1">
          <div className="flex items-center space-x-2 text-purple-900 font-bold">
            <Calendar className="w-3.5 h-3.5 text-purple-700" />
            <span>Inspection Date: {currentInsp.inspectionDate} at {currentInsp.inspectionTime}</span>
          </div>
          <p className="text-purple-800 text-[11px]">Inspector: {currentInsp.inspectorName}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Checklist & Observations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Statutory Safety Audit Checklist */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">On-Site Safety & Compliance Checklist</h3>
                <p className="text-xs text-slate-500">Record verification outcome for each mandated parameter</p>
              </div>
              <span className="text-xs font-bold text-purple-700">
                {currentInsp.checklistItems.length} Checklist Parameters
              </span>
            </div>

            <div className="space-y-3">
              {currentInsp.checklistItems.map((item, idx) => (
                <div key={item.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-bold text-slate-400 font-mono">{idx + 1}.</span>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.label}</h4>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                      {item.notes && <p className="text-[11px] text-amber-700 mt-0.5">Note: {item.notes}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    {(['Compliant', 'Partially Compliant', 'Non-Compliant', 'Not Applicable'] as const).map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => updateChecklistItem(currentInsp.id, item.id, st)}
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                          item.status === st
                            ? st === 'Compliant' 
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : st === 'Partially Compliant'
                              ? 'bg-amber-500 text-white border-amber-600'
                              : st === 'Non-Compliant'
                              ? 'bg-red-600 text-white border-red-700'
                              : 'bg-slate-700 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observations & Evidence */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recorded Field Observations & Defect Notes</h3>
                <p className="text-xs text-slate-500">Attach photos, non-conformities, and corrective action deadlines</p>
              </div>
              <button
                type="button"
                onClick={() => setIsObsModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-1.5 rounded transition-all shadow-xs"
              >
                + Log Observation
              </button>
            </div>

            {currentInsp.observations.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">No observations logged yet.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {currentInsp.observations.map(obs => (
                  <div key={obs.id} className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{obs.category}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        obs.severity === 'High' || obs.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {obs.severity} Severity
                      </span>
                    </div>
                    <p className="text-slate-800">{obs.description}</p>
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-amber-200/60 flex justify-between">
                      <span>Action: <strong>{obs.correctiveAction}</strong></span>
                      <span>Deadline: <strong className="font-mono text-slate-800">{obs.deadline}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Submit Final Inspection Report */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Final Inspection Report & Signoff</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Overall Inspection Outcome</label>
              <select
                value={overallResult}
                onChange={(e) => setOverallResult(e.target.value as any)}
                className="w-full rounded border border-slate-300 p-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
              >
                <option value="Compliant">Compliant (Pass & Recommend License)</option>
                <option value="Conditionally Compliant">Conditionally Compliant (Pass with 14-day Fixes)</option>
                <option value="Non-Compliant">Non-Compliant (Fail & Raise Objections)</option>
                <option value="Requires Re-inspection">Requires Re-inspection (Re-audit Required)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Inspector Final Remarks</label>
              <textarea
                rows={4}
                required
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter official site visit conclusion and statutory recommendations..."
                className="w-full rounded border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="p-3 bg-purple-50 rounded border border-purple-200 text-[11px] text-purple-900">
              ✓ Digital signature token <strong className="font-mono">#INSP-SIG-88092</strong> will be attached to report.
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-2.5 rounded shadow-xs transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inspection Report</span>
            </button>
          </form>
        </div>

      </div>

      {/* Observation Modal */}
      <AddObservationModal
        inspectionId={currentInsp.id}
        isOpen={isObsModalOpen}
        onClose={() => setIsObsModalOpen(false)}
      />

    </div>
  );
};
