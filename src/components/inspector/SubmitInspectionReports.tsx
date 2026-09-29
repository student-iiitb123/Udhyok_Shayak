'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  FileText, Send, CheckCircle2, ShieldCheck, AlertTriangle, 
  Calendar, Building2, ShieldAlert, Award
} from 'lucide-react';
import { Inspection } from '@/types';

export const SubmitInspectionReports: React.FC = () => {
  const { inspections, submitInspectionReport } = useApp();
  
  const pendingReports = inspections.filter(i => i.status === 'Scheduled' || i.status === 'In Progress' || i.status === 'Report Pending');
  const completedReports = inspections.filter(i => i.status === 'Completed' || i.status === 'Closed');

  const [selectedInspId, setSelectedInspId] = useState<string>(inspections[0]?.id || 'INSP-2026-092');
  const [overallResult, setOverallResult] = useState<'Compliant' | 'Conditionally Compliant' | 'Non-Compliant' | 'Requires Re-inspection'>('Conditionally Compliant');
  const [remarks, setRemarks] = useState('Site safety parameters verified. Issued conditional clearance pending tag placement on Sub-Station Panel B earth pit within 7 calendar days.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedInsp = inspections.find(i => i.id === selectedInspId) || inspections[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInsp) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitInspectionReport(selectedInsp.id, overallResult, remarks);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Field Audit Directorate</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">Submit Inspection Reports & Signoff</h2>
          <p className="text-xs text-slate-500 font-medium">Finalize field audit findings, issue statutory recommendations, and digitally sign reports</p>
        </div>

        <span className="bg-purple-100 text-purple-900 font-bold px-3 py-1.5 rounded text-xs border border-purple-200 shrink-0">
          {pendingReports.length} Pending Signoffs
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Select Audit Task */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Select Inspection Task to Report</h3>
          
          <div className="space-y-2">
            {inspections.map(insp => (
              <div
                key={insp.id}
                onClick={() => {
                  setSelectedInspId(insp.id);
                  if (insp.overallResult) setOverallResult(insp.overallResult);
                  if (insp.remarks) setRemarks(insp.remarks);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedInspId === insp.id 
                    ? 'bg-purple-50 border-purple-500 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold font-mono text-purple-900 bg-purple-100 px-1.5 py-0.5 rounded">
                    #{insp.id}
                  </span>
                  <StatusBadge status={insp.status} size="sm" />
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-2">{insp.approvalType}</h4>
                <p className="text-[11px] text-slate-600 font-medium">{insp.businessName}</p>

                <div className="mt-2 text-[10px] text-slate-500 flex justify-between pt-2 border-t border-slate-100">
                  <span>Date: {insp.inspectionDate}</span>
                  <span className="font-bold text-slate-700">{insp.checklistItems.length} Checklist Items</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Report Signoff Workspace Form */}
        <div className="lg:col-span-2">
          {selectedInsp ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-5">
              
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded font-mono">
                    Task #{selectedInsp.id} • App #{selectedInsp.applicationId}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">{selectedInsp.approvalType}</h3>
                  <p className="text-xs text-slate-500 font-medium">Enterprise: <strong className="text-slate-800">{selectedInsp.businessName}</strong> ({selectedInsp.location})</p>
                </div>
                <StatusBadge status={selectedInsp.status} size="md" />
              </div>

              {/* Checklist Parameters Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-2">Audit Checklist Outcome Summary:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedInsp.checklistItems.map((item, idx) => (
                    <div key={item.id} className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center text-[11px]">
                      <span className="text-slate-700 font-medium truncate max-w-[200px]">{idx + 1}. {item.label}</span>
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Input: Overall Result */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Overall Inspection Recommendation <span className="text-red-500">*</span>
                </label>
                <select
                  value={overallResult}
                  onChange={(e) => setOverallResult(e.target.value as any)}
                  className="w-full rounded border border-slate-300 p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Compliant">Compliant (Pass & Recommend Full License Clearance)</option>
                  <option value="Conditionally Compliant">Conditionally Compliant (Pass with 14-day Rectification)</option>
                  <option value="Non-Compliant">Non-Compliant (Fail Audit & Raise Objections)</option>
                  <option value="Requires Re-inspection">Requires Re-inspection (Re-audit Necessary)</option>
                </select>
              </div>

              {/* Form Input: Remarks */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Inspector Remarks & Directive <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Provide clear technical findings, machinery safety notes, and statutory instructions..."
                  className="w-full rounded border border-slate-300 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500 leading-relaxed"
                />
              </div>

              {/* Digital Signature Badge */}
              <div className="p-3 bg-purple-50 rounded border border-purple-200 flex items-center justify-between text-xs text-purple-900">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-700 shrink-0" />
                  <div>
                    <span className="font-bold block">Digital Signature Cryptographic Token</span>
                    <span className="text-[10px] font-mono text-purple-700">Token ID: #INSP-SIG-88092 • Inspector: Amit Sharma</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded">VERIFIED</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !remarks.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-3 rounded shadow-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Report...' : 'Submit Inspection Report'}</span>
              </button>

            </form>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-slate-200 text-center text-slate-400">
              Select an inspection task from the left list.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
