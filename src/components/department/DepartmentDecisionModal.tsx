'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, CheckCircle2, AlertTriangle, ShieldAlert, Calendar } from 'lucide-react';

interface DepartmentDecisionModalProps {
  appId: string;
  actionType: 'Approved' | 'Query Raised' | 'Rejected' | 'Inspection Scheduled';
  isOpen: boolean;
  onClose: () => void;
}

export const DepartmentDecisionModal: React.FC<DepartmentDecisionModalProps> = ({
  appId,
  actionType,
  isOpen,
  onClose,
}) => {
  const { submitOfficerDecision } = useApp();
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    submitOfficerDecision(appId, actionType, remarks);
    onClose();
  };

  let title = 'Confirm Application Approval';
  let desc = 'Issuing digital license certificate for this application.';
  let icon = <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
  let btnClass = 'bg-emerald-600 hover:bg-emerald-700 text-white';

  if (actionType === 'Query Raised') {
    title = 'Request Clarification / Raise Query';
    desc = 'Application will return to applicant for mandatory document submission.';
    icon = <AlertTriangle className="w-6 h-6 text-amber-600" />;
    btnClass = 'bg-amber-600 hover:bg-amber-700 text-white';
  } else if (actionType === 'Rejected') {
    title = 'Reject Clearance Application';
    desc = 'Formal rejection letter will be transmitted to investor with statutory reasons.';
    icon = <ShieldAlert className="w-6 h-6 text-red-600" />;
    btnClass = 'bg-red-600 hover:bg-red-700 text-white';
  } else if (actionType === 'Inspection Scheduled') {
    title = 'Initiate Field Inspection Task';
    desc = 'Assign state safety inspector for site audit.';
    icon = <Calendar className="w-6 h-6 text-purple-600" />;
    btnClass = 'bg-purple-600 hover:bg-purple-700 text-white';
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 relative">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            {icon}
            <div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="text-[11px] text-slate-500 font-mono">App #{appId}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">{desc}</p>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Officer Remarks / Justification Note
          </label>
          <textarea
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter official departmental order note..."
            className="w-full rounded border border-slate-300 p-2 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="bg-slate-50 p-2.5 rounded text-[11px] text-slate-500 mb-4 border border-slate-200">
          ℹ️ <strong>Prototype Action:</strong> State will update immediately across all dashboards and append to permanent audit trail.
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`font-bold text-xs px-4 py-2 rounded shadow-xs transition-all ${btnClass}`}
          >
            Confirm Decision
          </button>
        </div>

      </div>
    </div>
  );
};
