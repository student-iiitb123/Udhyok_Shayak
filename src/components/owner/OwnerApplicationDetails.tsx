'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { QueryResponseModal } from '@/components/owner/QueryResponseModal';
import { 
  ArrowLeft, FileText, FolderArchive, Clock, MessageSquare, 
  ClipboardCheck, Activity, AlertTriangle, CheckCircle2, Circle, Send, Download
} from 'lucide-react';
import { Application } from '@/types';

interface OwnerApplicationDetailsProps {
  app: Application;
  onBack: () => void;
}

export const OwnerApplicationDetails: React.FC<OwnerApplicationDetailsProps> = ({ app, onBack }) => {
  const { documents, inspections, auditLogs } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'queries' | 'inspection' | 'activity'>('overview');
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const appDocs = documents.filter(d => d.applicationId === app.id);
  const appInsp = inspections.find(i => i.applicationId === app.id || i.applicationNo === app.id);
  const appLogs = auditLogs.filter(l => l.applicationId === app.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Navigation Bar & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex items-start space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors mt-0.5"
            title="Back to Applications Table"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
                #{app.id}
              </span>
              <StatusBadge status={app.status} size="md" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{app.approvalType}</h2>
            <p className="text-xs text-slate-500 font-medium">
              {app.department} • Business: <strong className="text-slate-800">{app.businessName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Statutory SLA</span>
            <span className="text-xs font-bold text-slate-800">{app.daysRemaining} days remaining ({app.slaDays}d SLA)</span>
          </div>
        </div>
      </div>

      {/* ACTION REQUIRED BANNER (IF QUERY RAISED) */}
      {app.status === 'Query Raised' && (
        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wide bg-amber-200/60 px-2 py-0.5 rounded">
                ACTION REQUIRED
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1">Department has requested clarification</h4>
              <p className="text-xs text-slate-700 mt-0.5">{app.queryText || 'Please upload required Environmental Compliance Certificate (Form III).'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsQueryModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all shrink-0 flex items-center space-x-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Respond to Query</span>
          </button>
        </div>
      )}

      {/* WORKSPACE NAVIGATION TABS */}
      <div className="border-b border-slate-200 flex space-x-2 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
          { id: 'documents', label: `Documents (${appDocs.length})`, icon: <FolderArchive className="w-4 h-4" /> },
          { id: 'timeline', label: 'Timeline', icon: <Clock className="w-4 h-4" /> },
          { id: 'queries', label: 'Queries & Responses', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'inspection', label: 'Inspection', icon: <ClipboardCheck className="w-4 h-4" /> },
          { id: 'activity', label: `Audit Log (${appLogs.length})`, icon: <Activity className="w-4 h-4" /> },
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

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Application Metadata</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Application Number</span>
                  <span className="font-bold text-slate-900">{app.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Sector / Industry</span>
                  <span className="font-bold text-slate-900">{app.sector}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">District / Location</span>
                  <span className="font-bold text-slate-900">{app.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Date Submitted</span>
                  <span className="font-bold text-slate-900">{app.createdDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Risk Category</span>
                  <span className="font-bold text-amber-700">{app.riskLevel} Risk</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Priority</span>
                  <span className="font-bold text-slate-900">{app.priority}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">Statutory Declarations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The applicant declares that all manufacturing equipment, factory layout plans, and safety equipment comply with Section 6 of the Maharashtra Factories Rules 1963. Effluent treatment unit operates within prescribed MPCB discharge limits.
              </p>
            </div>
          </div>

          {/* Side Summary Panel */}
          <div className="space-y-4">
            <div className="bg-slate-900 text-white p-5 rounded-lg space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Department Desk Info</h4>
              <div className="text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Assigned Officer:</span>
                  <span className="font-bold text-white">Sanjay Deshmukh</span>
                </div>
                <div className="flex justify-between">
                  <span>Department:</span>
                  <span className="font-bold text-white">Industries Dept</span>
                </div>
                <div className="flex justify-between">
                  <span>Verification Status:</span>
                  <span className="font-bold text-amber-300">Phase 3 Scrutiny</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-6">Vertical Application Progress Timeline</h3>
          
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pl-6">
            
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-emerald-600 text-white rounded-full p-1">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Application Submitted</h4>
                <p className="text-[11px] text-slate-500">20 Sept 2026 • Gateway Reference #MH-IND-1024</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-emerald-600 text-white rounded-full p-1">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Documents Scrutinized & Verified</h4>
                <p className="text-[11px] text-slate-500">21 Sept 2026 • 4 Mandatory annexures validated</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-emerald-600 text-white rounded-full p-1">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Department Senior Officer Review</h4>
                <p className="text-[11px] text-slate-500">22 Sept 2026 • Evaluated by Senior Inspector Deshmukh</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-amber-500 text-white rounded-full p-1">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-amber-900">Department Query Raised</h4>
                <p className="text-[11px] text-slate-500">23 Sept 2026 • Awaiting Environmental Certificate</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-slate-200 text-slate-400 rounded-full p-1">
                <Circle className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-medium text-slate-400">Site Inspection & Audit</h4>
                <p className="text-[11px] text-slate-400">Scheduled upon query clearance</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 bg-slate-200 text-slate-400 rounded-full p-1">
                <Circle className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-medium text-slate-400">Final Digital Clearance License Issuance</h4>
                <p className="text-[11px] text-slate-400">Pending final officer approval</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Attached Annexures & Documents</h3>
            <span className="text-xs text-slate-500">{appDocs.length} files attached</span>
          </div>

          <div className="divide-y divide-slate-100">
            {appDocs.map(doc => (
              <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <div>
                    <h4 className="font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-[11px] text-slate-500">{doc.category} • Uploaded {doc.uploadedDate} • {doc.size}</p>
                    {doc.rejectionReason && (
                      <p className="text-[11px] text-red-600 mt-0.5 font-medium">⚠️ Note: {doc.rejectionReason}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={doc.status} />
                  <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: QUERIES */}
      {activeTab === 'queries' && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Query Communication History</h3>
          
          {app.queryText ? (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex justify-between text-xs text-amber-900 font-bold mb-1">
                  <span>Department Query</span>
                  <span>{app.queryDate || app.createdDate}</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">{app.queryText}</p>
              </div>

              {app.queryResponse ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 ml-6">
                  <div className="flex justify-between text-xs text-emerald-900 font-bold mb-1">
                    <span>Applicant Response</span>
                    <span>{app.queryResponseDate || '2026-09-24'}</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">{app.queryResponse}</p>
                </div>
              ) : (
                <div className="text-right">
                  <button
                    onClick={() => setIsQueryModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded shadow-xs"
                  >
                    Submit Response
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No department queries raised for this application.</p>
          )}
        </div>
      )}

      {/* TAB CONTENT: INSPECTION */}
      {activeTab === 'inspection' && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Inspection Status & Field Observations</h3>
          
          {appInsp ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900">{appInsp.approvalType}</span>
                  <p className="text-slate-500">Scheduled: {appInsp.inspectionDate} at {appInsp.inspectionTime}</p>
                  <p className="text-slate-500">Inspector: {appInsp.inspectorName}</p>
                </div>
                <StatusBadge status={appInsp.status} size="md" />
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">Audit Checklist Items ({appInsp.checklistItems.length}):</h4>
                <div className="space-y-1.5">
                  {appInsp.checklistItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border border-slate-100 text-xs">
                      <span className="text-slate-700">{item.label}</span>
                      <StatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No inspection assigned yet.</p>
          )}
        </div>
      )}

      {/* TAB CONTENT: ACTIVITY LOG */}
      {activeTab === 'activity' && (
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

      {/* Query Response Modal */}
      <QueryResponseModal
        appId={app.id}
        queryText={app.queryText || 'Please provide updated Form III environmental clearance certificate.'}
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
      />

    </div>
  );
};
