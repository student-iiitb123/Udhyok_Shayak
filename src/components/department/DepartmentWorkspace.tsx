'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DepartmentDecisionModal } from '@/components/department/DepartmentDecisionModal';
import { 
  ArrowLeft, FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
  Calendar, Clock, ShieldAlert, FolderArchive, Activity, User, Building2, Send
} from 'lucide-react';
import { Application } from '@/types';

interface DepartmentWorkspaceProps {
  app: Application;
  onBack: () => void;
}

export const DepartmentWorkspace: React.FC<DepartmentWorkspaceProps> = ({ app, onBack }) => {
  const { documents, inspections, verifyDocument, auditLogs, scheduleInspection } = useApp();
  const [activeTab, setActiveTab] = useState<'scrutiny' | 'documents' | 'risk' | 'decision' | 'inspection' | 'audit'>('scrutiny');
  const [decisionAction, setDecisionAction] = useState<'Approved' | 'Query Raised' | 'Rejected' | 'Inspection Scheduled' | null>(null);

  // Filter app documents
  const appDocs = documents.filter(d => d.applicationId === app.id);
  const appInsp = inspections.find(i => i.applicationId === app.id);
  const appLogs = auditLogs.filter(l => l.applicationId === app.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Workspace Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors mt-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono">#{app.id}</span>
              <StatusBadge status={app.status} size="md" />
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold">
                {app.priority} Priority
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{app.approvalType}</h2>
            <p className="text-xs text-slate-500 font-medium">
              Applicant: <strong className="text-slate-800">{app.businessName}</strong> • District: {app.location}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDecisionAction('Approved')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded shadow-xs transition-colors flex items-center space-x-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve Application</span>
          </button>
          <button
            onClick={() => setDecisionAction('Query Raised')}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded shadow-xs transition-colors flex items-center space-x-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Raise Query</span>
          </button>
          <button
            onClick={() => setDecisionAction('Rejected')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded shadow-xs transition-colors flex items-center space-x-1"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>
        </div>
      </div>

      {/* WORKSPACE NAVIGATION TABS */}
      <div className="border-b border-slate-200 flex space-x-2 overflow-x-auto pb-px">
        {[
          { id: 'scrutiny', label: 'Document Scrutiny', icon: <FileText className="w-4 h-4" /> },
          { id: 'risk', label: 'Risk Assessment Panel', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'inspection', label: 'Inspection Desk', icon: <Calendar className="w-4 h-4" /> },
          { id: 'decision', label: 'Final Officer Decision', icon: <CheckCircle2 className="w-4 h-4" /> },
          { id: 'audit', label: `Audit Trail (${appLogs.length})`, icon: <Activity className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-amber-600 text-amber-900 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: SCRUTINY */}
      {activeTab === 'scrutiny' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Mandatory Document Verification Scrutiny</h3>
                <p className="text-xs text-slate-500">Verify statutory compliance of uploaded annexures</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                {appDocs.filter(d => d.status === 'Verified').length} / {appDocs.length} Verified
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {appDocs.length === 0 ? (
                <p className="text-slate-400 py-4 italic">No documents attached.</p>
              ) : (
                appDocs.map(doc => (
                  <div key={doc.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">{doc.name}</span>
                        <p className="text-[11px] text-slate-500">{doc.category} • Size: {doc.size}</p>
                        {doc.rejectionReason && (
                          <p className="text-[11px] text-red-600 font-medium mt-0.5">Reason: {doc.rejectionReason}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <StatusBadge status={doc.status} />
                      
                      <button
                        onClick={() => verifyDocument(doc.id, 'Verified')}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                      >
                        ✓ Verify
                      </button>
                      
                      <button
                        onClick={() => verifyDocument(doc.id, 'Needs Clarification', 'Document incomplete or expired')}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                      >
                        Query
                      </button>

                      <button
                        onClick={() => verifyDocument(doc.id, 'Rejected', 'Invalid certificate format')}
                        className="bg-red-50 hover:bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded text-[11px] font-bold transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: RISK ASSESSMENT */}
      {activeTab === 'risk' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Statutory Risk Engine</span>
              <h3 className="text-base font-bold text-slate-900">Application Risk Assessment Panel</h3>
            </div>
            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded text-xs font-bold border border-amber-300">
              Prototype Risk Assessment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-amber-50/60 p-4 rounded-lg border border-amber-200">
              <span className="text-xs font-bold text-amber-900">Overall Risk Score</span>
              <h4 className="text-2xl font-extrabold text-amber-800 mt-1">MEDIUM</h4>
              <p className="text-[11px] text-amber-700 mt-0.5">Automated Risk Weighting</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-600">Business Credit Risk</span>
              <h4 className="text-lg font-bold text-emerald-600 mt-1">LOW RISK</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Clean MCA21 History</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-600">Environmental Risk</span>
              <h4 className="text-lg font-bold text-amber-600 mt-1">MEDIUM RISK</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Red Category Zone B</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-600">Document Authenticity</span>
              <h4 className="text-lg font-bold text-emerald-600 mt-1">HIGH ACCURACY</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">DigiLocker Verified</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INSPECTION */}
      {activeTab === 'inspection' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Site Inspection & Field Audit</h3>
            <button
              onClick={() => scheduleInspection(app.id, '2026-09-28', '10:30 AM', 'Amit Sharma')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-1.5 rounded transition-all shadow-xs"
            >
              + Schedule Inspection
            </button>
          </div>

          {appInsp ? (
            <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold text-slate-900">Assigned Inspector: {appInsp.inspectorName}</span>
                  <p className="text-slate-500">Scheduled: {appInsp.inspectionDate} at {appInsp.inspectionTime}</p>
                </div>
                <StatusBadge status={appInsp.status} size="md" />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No inspection assigned yet. Click button above to schedule.</p>
          )}
        </div>
      )}

      {/* TAB CONTENT: DECISION */}
      {activeTab === 'decision' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Department Final Decision Checkpoint</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center">
              <span className="font-bold text-emerald-900 block">Documents</span>
              <span className="text-emerald-700 font-bold text-lg">✓ Verified</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center">
              <span className="font-bold text-emerald-900 block">Scrutiny</span>
              <span className="text-emerald-700 font-bold text-lg">✓ Passed</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-center">
              <span className="font-bold text-amber-900 block">Inspection</span>
              <span className="text-amber-700 font-bold text-lg">○ Pending</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center">
              <span className="font-bold text-emerald-900 block">Compliance</span>
              <span className="text-emerald-700 font-bold text-lg">✓ Compliant</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              onClick={() => setDecisionAction('Query Raised')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded shadow-xs"
            >
              Request Clarification
            </button>
            <button
              onClick={() => setDecisionAction('Approved')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded shadow-xs"
            >
              Approve License
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-white p-5 rounded-lg border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">Audit Logs</h3>
          <div className="space-y-2 text-xs">
            {appLogs.map(log => (
              <div key={log.id} className="p-3 bg-slate-50 rounded border border-slate-100 flex justify-between">
                <div>
                  <span className="font-bold text-slate-900">{log.action}</span> — <span className="text-slate-600">{log.user} ({log.role})</span>
                  <p className="text-slate-500 mt-0.5">{log.details}</p>
                </div>
                <span className="text-[10px] text-slate-400">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision Modal */}
      {decisionAction && (
        <DepartmentDecisionModal
          appId={app.id}
          actionType={decisionAction}
          isOpen={!!decisionAction}
          onClose={() => setDecisionAction(null)}
        />
      )}

    </div>
  );
};
